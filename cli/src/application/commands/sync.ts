import { join } from "node:path";
import {
  CLAUDE_MD_HASH_FILENAME,
  CLAUDE_STUB_FILENAME,
  claudeStubContent,
  ExistingClaudeMdError,
  FRAMEWORK_DIR_NAME,
  hashClaudeMdContent,
  InvalidFrameworkSourceError,
  invalidFrameworkSourceEntries,
  isClaudeMdSafeToOverwrite,
  NotInstalledError,
} from "../../domain/installation.js";
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
 *
 * Also guards the CLAUDE.md stub the same way runInit does: refuses with
 * ExistingClaudeMdError (bypassable with --force) if the target's existing
 * CLAUDE.md isn't already a Kenovis-managed stub, instead of silently
 * discarding a customer's own edits on every sync. See AI/memory/learnings.md
 * Learning-006, which found and fixed this exact asymmetry for init's
 * --force path but never carried the fix over to sync.
 *
 * The guard compares against a recorded content hash
 * (`${FRAMEWORK_DIR_NAME}/${CLAUDE_MD_HASH_FILENAME}`, written by the prior
 * install/sync) rather than only a marker-prefix check, so content appended
 * below the stub is caught too, not just a CLAUDE.md that isn't Kenovis's at
 * all — see isClaudeMdSafeToOverwrite and AI/memory/learnings.md Learning-007.
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

  await fs.removeTree(frameworkDir);
  await fs.copyTree(options.frameworkSourceDir, frameworkDir);

  const newClaudeMdContent = claudeStubContent({ pending: false });
  await fs.writeFile(claudeStubPath, newClaudeMdContent);
  await fs.writeFile(hashPath, hashClaudeMdContent(newClaudeMdContent));

  return {
    frameworkSyncedTo: frameworkDir,
    claudeStubWrittenTo: claudeStubPath,
  };
}
