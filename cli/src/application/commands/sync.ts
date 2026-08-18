import { join } from "node:path";
import {
  CLAUDE_MD_HASH_FILENAME,
  CLAUDE_STUB_FILENAME,
  claudeStubContent,
  detectInstallationKind,
  ExistingClaudeMdError,
  FRAMEWORK_DIR_NAME,
  hashClaudeMdContent,
  installationKindFromSetupPending,
  InvalidFrameworkSourceError,
  invalidFrameworkSourceEntries,
  isClaudeMdSafeToOverwrite,
  NotInstalledError,
  SETUP_PENDING_FILENAME,
  setupPendingContent,
} from "../../domain/installation.js";
import { readFrameworkVersion } from "../frameworkVersion.js";
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
 * Also guards the CLAUDE.md stub the same way runInit does: refuses with
 * ExistingClaudeMdError (bypassable with --force) if the target's existing
 * CLAUDE.md isn't already a Kenovis-managed stub, instead of silently
 * discarding a customer's own edits on every sync. See company-os/AI/memory/learnings.md
 * Learning-006, which found and fixed this exact asymmetry for init's
 * --force path but never carried the fix over to sync.
 *
 * The guard compares against a recorded content hash
 * (`${FRAMEWORK_DIR_NAME}/${CLAUDE_MD_HASH_FILENAME}`, written by the prior
 * install/sync) rather than only a marker-prefix check, so content appended
 * below the stub is caught too, not just a CLAUDE.md that isn't Kenovis's at
 * all — see isClaudeMdSafeToOverwrite and company-os/AI/memory/learnings.md Learning-007.
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
  if (!options.force && (await fs.exists(claudeStubPath))) {
    const existingClaudeMd = await fs.readFile(claudeStubPath);
    const recordedHash = (await fs.exists(hashPath)) ? await fs.readFile(hashPath) : null;
    if (!isClaudeMdSafeToOverwrite(existingClaudeMd, recordedHash)) {
      throw new ExistingClaudeMdError(claudeStubPath);
    }
  }

  // Read install-time-owned state before the mirror destroys it.
  const setupPendingPath = join(frameworkDir, SETUP_PENDING_FILENAME);
  const pendingMarker = (await fs.exists(setupPendingPath))
    ? await fs.readFile(setupPendingPath)
    : null;

  // Read for reporting only, also before the mirror. Unlike the entries in
  // INSTALL_TIME_OWNED_ENTRIES, the stamp needs no preserve/rewrite rule — the
  // incoming bundle carries its own, so the mirror replaces it correctly.
  const previousFrameworkVersion = await readFrameworkVersion(fs, frameworkDir);
  const frameworkVersion = await readFrameworkVersion(fs, options.frameworkSourceDir);

  await fs.removeTree(frameworkDir);
  await fs.copyTree(options.frameworkSourceDir, frameworkDir);

  let newClaudeMdContent = claudeStubContent({ pending: false });

  if (pendingMarker !== null) {
    // A marker this CLI wrote names the command directly. Anything else is
    // re-detected from the target rather than guessed at, the same way install
    // time chose it — and rewritten in its canonical form, so the marker and
    // the stub's directive can never name different commands.
    const kind =
      installationKindFromSetupPending(pendingMarker) ??
      detectInstallationKind(await fs.listDir(options.targetDir)).kind;

    await fs.writeFile(setupPendingPath, setupPendingContent(kind));
    newClaudeMdContent = claudeStubContent({ pending: true, kind });
  }

  await fs.writeFile(claudeStubPath, newClaudeMdContent);
  await fs.writeFile(hashPath, hashClaudeMdContent(newClaudeMdContent));

  return {
    frameworkSyncedTo: frameworkDir,
    claudeStubWrittenTo: claudeStubPath,
    setupStillPending: pendingMarker !== null,
    previousFrameworkVersion,
    frameworkVersion,
  };
}
