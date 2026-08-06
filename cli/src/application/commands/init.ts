import { join } from "node:path";
import {
  AlreadyInstalledError,
  claudeStubContent,
  CLAUDE_STUB_FILENAME,
  detectInstallationKind,
  FRAMEWORK_DIR_NAME,
  InvalidFrameworkSourceError,
  invalidFrameworkSourceEntries,
  TARGET_README_FILENAME,
  type InstallationKind,
} from "../../domain/installation.js";
import type { FileSystemPort } from "../../infrastructure/filesystem/FileSystemPort.js";

export interface InitOptions {
  /** Directory containing the Framework layer content to install. */
  frameworkSourceDir: string;
  /** Repository to install into. */
  targetDir: string;
  /** Overwrite an existing .kenovis/ instead of failing. */
  force?: boolean;
}

export interface InitResult {
  frameworkInstalledTo: string;
  claudeStubWrittenTo: string;
  /** True when the target already had its own README.md — left untouched either way. */
  targetReadmeUntouched: boolean;
  /** Whether the target repository already held a real implementation before this install. */
  detectedKind: InstallationKind;
  /** Target directory entries that count as evidence of a real implementation, empty when greenfield. */
  detectionEvidence: string[];
}

/**
 * Installs the Framework layer into a target repository.
 *
 * Enforces DECISION-016/017 and DOMAIN/BUSINESS_RULES.md RULE-INST-01: the
 * target repository's own README.md is never read, written, or overwritten —
 * this function does not even open it, only checks whether it exists so the
 * result can report that it was left alone.
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

  await fs.copyTree(options.frameworkSourceDir, frameworkDir);

  const claudeStubPath = join(options.targetDir, CLAUDE_STUB_FILENAME);
  await fs.writeFile(claudeStubPath, claudeStubContent());

  const targetReadmePath = join(options.targetDir, TARGET_README_FILENAME);
  const targetReadmeUntouched = await fs.exists(targetReadmePath);

  return {
    frameworkInstalledTo: frameworkDir,
    claudeStubWrittenTo: claudeStubPath,
    targetReadmeUntouched,
    detectedKind: detection.kind,
    detectionEvidence: detection.evidence,
  };
}
