import { join } from "node:path";
import {
  AlreadyInstalledError,
  claudeStubContent,
  CLAUDE_STUB_FILENAME,
  FRAMEWORK_DIR_NAME,
  TARGET_README_FILENAME,
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
}

/**
 * Installs the Framework layer into a target repository.
 *
 * Enforces DECISION-016/017 and DOMAIN/BUSINESS_RULES.md RULE-INST-01: the
 * target repository's own README.md is never read, written, or overwritten —
 * this function does not even open it, only checks whether it exists so the
 * result can report that it was left alone.
 */
export async function runInit(
  fs: FileSystemPort,
  options: InitOptions,
): Promise<InitResult> {
  const frameworkDir = join(options.targetDir, FRAMEWORK_DIR_NAME);

  if (!options.force && (await fs.exists(frameworkDir))) {
    throw new AlreadyInstalledError(frameworkDir);
  }

  await fs.copyTree(options.frameworkSourceDir, frameworkDir);

  const claudeStubPath = join(options.targetDir, CLAUDE_STUB_FILENAME);
  await fs.writeFile(claudeStubPath, claudeStubContent());

  const targetReadmePath = join(options.targetDir, TARGET_README_FILENAME);
  const targetReadmeUntouched = await fs.exists(targetReadmePath);

  return {
    frameworkInstalledTo: frameworkDir,
    claudeStubWrittenTo: claudeStubPath,
    targetReadmeUntouched,
  };
}
