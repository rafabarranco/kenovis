import { join } from "node:path";
import {
  AlreadyInstalledError,
  BrownfieldDetectedError,
  claudeStubContent,
  CLAUDE_MD_HASH_FILENAME,
  CLAUDE_STUB_FILENAME,
  detectInstallationKind,
  ExistingClaudeMdError,
  FRAMEWORK_DIR_NAME,
  GreenfieldDetectedError,
  hashClaudeMdContent,
  InvalidFrameworkSourceError,
  invalidFrameworkSourceEntries,
  isClaudeMdSafeToOverwrite,
  SETUP_PENDING_FILENAME,
  setupPendingContent,
  TARGET_README_FILENAME,
  type InstallationKind,
} from "../../domain/installation.js";
import { readFrameworkVersion } from "../frameworkVersion.js";
import type { FileSystemPort } from "../../infrastructure/filesystem/FileSystemPort.js";

export interface InitOptions {
  /** Directory containing the Framework layer content to install. */
  frameworkSourceDir: string;
  /** Repository to install into. */
  targetDir: string;
  /** Overwrite an existing .kenovis/ instead of failing. */
  force?: boolean;
  /**
   * Which command the caller ran: "init" assumes greenfield and refuses on a
   * detected brownfield target (points at `add`); "add" assumes brownfield
   * and refuses on a detected greenfield target (points at `init`). Either
   * refusal is bypassed by `force`. See DECISION-018.
   */
  invokedAs: "init" | "add";
}

export interface InitResult {
  frameworkInstalledTo: string;
  claudeStubWrittenTo: string;
  setupPendingWrittenTo: string;
  /** True when the target already had its own README.md — left untouched either way. */
  targetReadmeUntouched: boolean;
  /** Whether the target repository already held a real implementation before this install. */
  detectedKind: InstallationKind;
  /** Target directory entries that count as evidence of a real implementation, empty when greenfield. */
  detectionEvidence: string[];
  /**
   * The Framework Release this Installation now tracks, read from the bundle
   * that was installed. Null when that bundle carries no stamp — see
   * readFrameworkVersion.
   */
  frameworkVersion: string | null;
}

/**
 * Installs the Framework layer into a target repository.
 *
 * Enforces DECISION-016/017 and DOMAIN/BUSINESS_RULES.md RULE-INST-01: the
 * target repository's own README.md is never read, written, or overwritten —
 * this function does not even open it, only checks whether it exists so the
 * result can report that it was left alone. The same protection extends to
 * an existing CLAUDE.md that isn't safe to overwrite (checked via
 * `isClaudeMdSafeToOverwrite` — a recorded content hash when available,
 * falling back to the `isKenovisManagedClaudeStub` marker-prefix check
 * otherwise) — refuses with ExistingClaudeMdError instead of silently
 * discarding a customer's own file, unless --force is passed.
 *
 * A --force re-install always mirror-replaces .kenovis/ (removeTree then
 * copyTree), matching runSync's semantics — never a merge that could leave
 * files retired from an older Framework Release behind.
 *
 * The Framework Release the Installation ends up tracking is read from the
 * bundle rather than written by this function: the bundle ships its own
 * `.framework-version` stamp, so copyTree installs it along with everything
 * else. Reading it from the source (not from the target after the copy) is the
 * same value by construction, and keeps this function free of a second source
 * of truth for it.
 *
 * Also validates frameworkSourceDir itself before copying anything: it must
 * match the known Framework-bundle shape (AI/, README.md), or this throws
 * InvalidFrameworkSourceError. This never inspects targetDir — a customer's
 * own repository may contain any file or directory name at all (DECISION-016)
 * — only the operator-supplied --source path, which Kenovis's own bundling
 * process defines the shape of.
 */
export async function runInit(
  fs: FileSystemPort,
  options: InitOptions,
): Promise<InitResult> {
  const sourceEntries = await fs.listDir(options.frameworkSourceDir);
  const unexpected = invalidFrameworkSourceEntries(sourceEntries);
  if (unexpected.length > 0) {
    throw new InvalidFrameworkSourceError(options.frameworkSourceDir, unexpected);
  }

  const frameworkDir = join(options.targetDir, FRAMEWORK_DIR_NAME);

  if (!options.force && (await fs.exists(frameworkDir))) {
    throw new AlreadyInstalledError(frameworkDir);
  }

  const targetDirEntries = await fs.listDir(options.targetDir);
  const detection = detectInstallationKind(targetDirEntries);

  if (!options.force) {
    if (options.invokedAs === "init" && detection.kind === "brownfield") {
      throw new BrownfieldDetectedError(detection.evidence);
    }
    if (options.invokedAs === "add" && detection.kind === "greenfield") {
      throw new GreenfieldDetectedError();
    }
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

  // Mirror-replace, not merge: a --force re-run over an existing .kenovis/
  // must not leave files retired from an older Framework Release behind.
  // removeTree is a no-op when frameworkDir doesn't exist yet (fresh install).
  await fs.removeTree(frameworkDir);
  await fs.copyTree(options.frameworkSourceDir, frameworkDir);

  const setupPendingPath = join(frameworkDir, SETUP_PENDING_FILENAME);
  await fs.writeFile(setupPendingPath, setupPendingContent(detection.kind));

  const claudeMdContent = claudeStubContent({ pending: true, kind: detection.kind });
  await fs.writeFile(claudeStubPath, claudeMdContent);
  await fs.writeFile(hashPath, hashClaudeMdContent(claudeMdContent));

  const targetReadmePath = join(options.targetDir, TARGET_README_FILENAME);
  const targetReadmeUntouched = await fs.exists(targetReadmePath);

  return {
    frameworkInstalledTo: frameworkDir,
    claudeStubWrittenTo: claudeStubPath,
    setupPendingWrittenTo: setupPendingPath,
    targetReadmeUntouched,
    detectedKind: detection.kind,
    detectionEvidence: detection.evidence,
    frameworkVersion: await readFrameworkVersion(fs, options.frameworkSourceDir),
  };
}
