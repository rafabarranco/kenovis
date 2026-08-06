import { join } from "node:path";
import {
  CLAUDE_STUB_FILENAME,
  claudeStubContent,
  FRAMEWORK_DIR_NAME,
  InvalidFrameworkSourceError,
  invalidFrameworkSourceEntries,
  NotInstalledError,
} from "../../domain/installation.js";
import type { FileSystemPort } from "../../infrastructure/filesystem/FileSystemPort.js";

export interface SyncOptions {
  /** Directory containing the newer Framework layer content to sync in. */
  frameworkSourceDir: string;
  /** Repository holding the existing Installation to update. */
  targetDir: string;
}

export interface SyncResult {
  frameworkSyncedTo: string;
  claudeStubWrittenTo: string;
}

/**
 * Updates an existing Installation's Framework layer to a newer Framework
 * Release.
 *
 * Enforces DOMAIN/BUSINESS_RULES.md RULE-INST-01 and RULE-INST-02: only
 * `.kenovis/` (100% Kenovis-owned per DECISION-017) and the CLAUDE.md stub are
 * ever touched — Product-layer files and the customer's own code are never
 * read or written. The overwrite happens in place, but `.kenovis/` lives
 * inside the customer's own git-tracked repository, so `git diff`/`git
 * checkout` are the review-and-revert mechanism RULE-INST-02 requires; a
 * CLI-side diff preview is deferred to a later Framework Release
 * (PRODUCT/ROADMAP.md Phase 2).
 *
 * Also validates frameworkSourceDir itself before removing/copying anything:
 * it must match the known Framework-bundle shape (AI/, README.md), or this
 * throws InvalidFrameworkSourceError instead of touching the existing
 * .kenovis/ — see runInit's equivalent check for why this only ever inspects
 * the operator-supplied --source path, never the target repository.
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

  await fs.removeTree(frameworkDir);
  await fs.copyTree(options.frameworkSourceDir, frameworkDir);

  const claudeStubPath = join(options.targetDir, CLAUDE_STUB_FILENAME);
  await fs.writeFile(claudeStubPath, claudeStubContent({ pending: false }));

  return {
    frameworkSyncedTo: frameworkDir,
    claudeStubWrittenTo: claudeStubPath,
  };
}
