import { join } from "node:path";
import {
  CLAUDE_MD_HASH_FILENAME,
  CLAUDE_STUB_FILENAME,
  claudeStubContent,
  DEFAULT_TOOLS,
  detectInstallationKind,
  ExistingClaudeMdError,
  FRAMEWORK_DIR_NAME,
  hashClaudeMdContent,
  installationKindFromSetupPending,
  InvalidFrameworkSourceError,
  invalidFrameworkSourceEntries,
  NotInstalledError,
  parseToolsMarker,
  resolveClaudeMdWrite,
  SETUP_PENDING_FILENAME,
  setupPendingContent,
  toolsMarkerContent,
  TOOLS_MARKER_FILENAME,
  type ClaudeMdAction,
  type InstallationKind,
} from "../../domain/installation.js";
import { readFrameworkVersion } from "../frameworkVersion.js";
import { installSelectedToolAdapters } from "../toolAdapters.js";
import type { FileSystemPort } from "../../infrastructure/filesystem/FileSystemPort.js";

export interface SyncOptions {
  /** Directory containing the newer Framework layer content to sync in. */
  frameworkSourceDir: string;
  /** Repository holding the existing Installation to update. */
  targetDir: string;
  /** Overwrite a CLAUDE.md that isn't already Kenovis-managed instead of refusing. */
  force?: boolean;
}

export interface SyncResult {
  frameworkSyncedTo: string;
  claudeStubWrittenTo: string;
  /** What happened to the target's CLAUDE.md — see `ClaudeMdAction`. */
  claudeMdAction: ClaudeMdAction;
  /**
   * True when this Installation still had `.setup-pending` — the first-session
   * init-project/adopt-project directive was preserved rather than cleared.
   */
  setupStillPending: boolean;
  /**
   * The Framework Release this Installation tracked before the sync, read
   * before the mirror-replace destroyed it. Null when it carried no stamp —
   * an Installation predating the stamp, which every sync from a stamped
   * bundle onwards fixes by itself.
   */
  previousFrameworkVersion: string | null;
  /** The Framework Release it tracks now. Null when the bundle carries no stamp. */
  frameworkVersion: string | null;
  /**
   * Paths under `.kenovis/` (relative to it) that existed before this sync
   * and do not after — closes OF-01: the mirror-replace deleted these either
   * way, silently; this names them instead. Sorted, empty when nothing was
   * removed.
   */
  removedPaths: string[];
  /** Tool ids re-applied this sync (DECISION-046) — from `.kenovis/.tools`, or DEFAULT_TOOLS for an Installation that predates it. */
  toolsInstalled: string[];
  /** Requested tool ids the newly-synced Framework Release ships no adapter for. */
  unknownTools: string[];
  /** Command-wrapper paths left untouched — see `installSelectedToolAdapters`. */
  skippedToolFiles: string[];
}

/**
 * Updates an existing Installation's Framework layer to a newer Framework
 * Release.
 *
 * Enforces company-os/DOMAIN/BUSINESS_RULES.md RULE-INST-01 and RULE-INST-02: only
 * `.kenovis/` (100% Kenovis-owned per DECISION-017) and the CLAUDE.md stub are
 * ever touched — Product-layer files and the customer's own code are never
 * read or written. The overwrite happens in place, but `.kenovis/` lives
 * inside the customer's own git-tracked repository, so `git diff`/`git
 * checkout` are the review-and-revert mechanism RULE-INST-02 requires; a
 * CLI-side diff preview is deferred to a later Framework Release
 * (company-os/PRODUCT/ROADMAP.md Phase 2).
 *
 * Also validates frameworkSourceDir itself before removing/copying anything:
 * it must match the known Framework-bundle shape (AI/, README.md), or this
 * throws InvalidFrameworkSourceError instead of touching the existing
 * .kenovis/ — see runInit's equivalent check for why this only ever inspects
 * the operator-supplied --source path, never the target repository.
 *
 * Also guards the CLAUDE.md stub the same way runInit does: an existing
 * CLAUDE.md that isn't already a Kenovis-managed stub is preserved and
 * merged via `resolveClaudeMdWrite` (OF-94) rather than silently discarded
 * on every sync — see company-os/AI/memory/learnings.md Learning-006, which found and
 * fixed this exact asymmetry for init's --force path but never carried the
 * fix over to sync. ExistingClaudeMdError (bypassable with --force) fires
 * only when a coexistence file's own Kenovis-managed block was hand-edited
 * since it was last written.
 *
 * The guard compares against a recorded content hash
 * (`${FRAMEWORK_DIR_NAME}/${CLAUDE_MD_HASH_FILENAME}`, written by the prior
 * install/sync) rather than only a marker-prefix check, so content appended
 * inside the Kenovis-managed block is caught too, not just a CLAUDE.md that
 * isn't Kenovis's at all — see isClaudeMdSafeToOverwrite and
 * company-os/AI/memory/learnings.md Learning-007.
 *
 * Syncing never advances an Installation past a setup it has not completed:
 * a `.setup-pending` marker is read before the mirror-replace and written back
 * after it, and the CLAUDE.md stub keeps its pending form in that case, so
 * DECISION-018's first-session auto-trigger survives. The bundle itself never
 * ships that marker (install time writes it), so the mirror would otherwise
 * erase it — see INSTALL_TIME_OWNED_ENTRIES for the general rule every
 * install-time-owned file under .kenovis/ must follow, and
 * company-os/AI/memory/learnings.md Learning-010 for how this was found.
 *
 * Reports which Framework Release the Installation moved from and to, read
 * from the existing `.kenovis/` and the incoming bundle before the mirror
 * runs. This is reporting only — the stamp itself ships inside the bundle, so
 * the mirror updates it without any preserve/rewrite rule of its own.
 *
 * Also reports every path under `.kenovis/` that existed before this sync and
 * does not after (`removedPaths`) — closes `PRODUCT/ROADMAP.md` OF-01 / item
 * 38. RULE-INST-03 already settled that removal itself is correct (the AI-OS
 * layer belongs to the AI-OS); what was missing was saying so. Compared
 * before `removeTree` and after every install-time-owned file
 * (`.setup-pending`, the CLAUDE.md hash sidecar, the `.tools` marker) is
 * written back, so none of them show up as falsely "removed" on an ordinary
 * sync.
 *
 * Also re-applies whichever AI tool adapters (DECISION-046) this Installation
 * was set up with — read from `.kenovis/.tools`, the same install-time-owned
 * marker shape as `.setup-pending` — so a customer's `.claude/commands/`
 * (or another selected tool's own scaffolding) picks up whatever the newly
 * synced Framework Release changed, without `--tools` needing to be passed
 * again on every sync. An Installation predating this marker falls back to
 * `DEFAULT_TOOLS`, the same default a fresh `init` would choose.
 */
export async function runSync(
  fs: FileSystemPort,
  options: SyncOptions,
): Promise<SyncResult> {
  const sourceEntries = await fs.listDir(options.frameworkSourceDir);
  const unexpected = invalidFrameworkSourceEntries(sourceEntries);
  if (unexpected.length > 0) {
    throw new InvalidFrameworkSourceError(options.frameworkSourceDir, unexpected);
  }

  const frameworkDir = join(options.targetDir, FRAMEWORK_DIR_NAME);

  if (!(await fs.exists(frameworkDir))) {
    throw new NotInstalledError(frameworkDir);
  }

  const claudeStubPath = join(options.targetDir, CLAUDE_STUB_FILENAME);
  const hashPath = join(frameworkDir, CLAUDE_MD_HASH_FILENAME);

  // Read install-time-owned state before the mirror destroys it.
  const setupPendingPath = join(frameworkDir, SETUP_PENDING_FILENAME);
  const pendingMarker = (await fs.exists(setupPendingPath))
    ? await fs.readFile(setupPendingPath)
    : null;

  // Computed before the mirror runs, purely from reads — the same content
  // this run intends to write regardless of what the CLAUDE.md guard below
  // decides, so resolveClaudeMdWrite always resolves against the real
  // incoming stub rather than a placeholder.
  let pendingKind: InstallationKind | null = null;
  let newClaudeMdContent = claudeStubContent({ pending: false });
  if (pendingMarker !== null) {
    // A marker this CLI wrote names the command directly. Anything else is
    // re-detected from the target rather than guessed at, the same way
    // install time chose it.
    pendingKind =
      installationKindFromSetupPending(pendingMarker) ??
      detectInstallationKind(await fs.listDir(options.targetDir)).kind;
    newClaudeMdContent = claudeStubContent({ pending: true, kind: pendingKind });
  }

  let claudeMdContentToWrite = newClaudeMdContent;
  let claudeMdHashToWrite = hashClaudeMdContent(newClaudeMdContent);
  let claudeMdAction: ClaudeMdAction = "written";

  if (!options.force && (await fs.exists(claudeStubPath))) {
    const existingClaudeMd = await fs.readFile(claudeStubPath);
    const recordedHash = (await fs.exists(hashPath)) ? await fs.readFile(hashPath) : null;
    const resolution = resolveClaudeMdWrite(existingClaudeMd, recordedHash, newClaudeMdContent);
    if (resolution.action === "refused") {
      throw new ExistingClaudeMdError(claudeStubPath);
    }
    claudeMdContentToWrite = resolution.content;
    claudeMdHashToWrite = resolution.hashedBlock;
    claudeMdAction = resolution.action;
  }

  const toolsMarkerPath = join(frameworkDir, TOOLS_MARKER_FILENAME);
  const existingToolsMarker = (await fs.exists(toolsMarkerPath))
    ? await fs.readFile(toolsMarkerPath)
    : null;
  // Missing marker means an Installation from before DECISION-046 — falls
  // back to the same default a fresh `init` would choose, rather than
  // installing nothing on its first sync past this Framework Release.
  const tools = (existingToolsMarker !== null ? parseToolsMarker(existingToolsMarker) : null) ?? [
    ...DEFAULT_TOOLS,
  ];

  // Read for reporting only, also before the mirror. Unlike the entries in
  // INSTALL_TIME_OWNED_ENTRIES, the stamp needs no preserve/rewrite rule — the
  // incoming bundle carries its own, so the mirror replaces it correctly.
  const previousFrameworkVersion = await readFrameworkVersion(fs, frameworkDir);
  const frameworkVersion = await readFrameworkVersion(fs, options.frameworkSourceDir);

  const pathsBefore = await fs.walkFiles(frameworkDir);

  await fs.removeTree(frameworkDir);
  await fs.copyTree(options.frameworkSourceDir, frameworkDir);

  if (pendingMarker !== null && pendingKind !== null) {
    // Rewritten in its canonical form, so the marker and the stub's
    // directive can never name different commands.
    await fs.writeFile(setupPendingPath, setupPendingContent(pendingKind));
  }

  await fs.writeFile(claudeStubPath, claudeMdContentToWrite);
  await fs.writeFile(hashPath, claudeMdHashToWrite);
  await fs.writeFile(toolsMarkerPath, toolsMarkerContent(tools));

  const { installed, unknown, skipped } = await installSelectedToolAdapters(fs, {
    frameworkSourceDir: options.frameworkSourceDir,
    targetDir: options.targetDir,
    tools,
  });

  // Diffed after every install-time-owned file above is written back, so
  // .setup-pending, the hash sidecar and the tools marker never show up as
  // falsely "removed" on an ordinary sync that only touches the mirrored
  // bundle content.
  const pathsAfter = new Set(await fs.walkFiles(frameworkDir));
  const removedPaths = pathsBefore.filter((p) => !pathsAfter.has(p)).sort();

  return {
    frameworkSyncedTo: frameworkDir,
    claudeStubWrittenTo: claudeStubPath,
    claudeMdAction,
    setupStillPending: pendingMarker !== null,
    previousFrameworkVersion,
    frameworkVersion,
    removedPaths,
    toolsInstalled: installed,
    unknownTools: unknown,
    skippedToolFiles: skipped,
  };
}
