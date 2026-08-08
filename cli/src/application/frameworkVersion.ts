import { join } from "node:path";
import {
  FRAMEWORK_VERSION_FILENAME,
  parseFrameworkVersion,
} from "../domain/installation.js";
import type { FileSystemPort } from "../infrastructure/filesystem/FileSystemPort.js";

/**
 * Reads the Framework Release stamp out of a directory holding a Framework
 * layer — either a `--source` bundle (the release about to be installed) or an
 * existing Installation's `.kenovis/` (the release it currently tracks).
 *
 * Shared by init and sync because both answer the same question about the same
 * artifact. Returns null when the directory carries no stamp: a bundle built
 * before this mechanism existed, or a hand-assembled `--source` directory used
 * for local development (cli/README.md → "Running it locally"). Absence is
 * reported as unknown, never inferred from the running CLI's own version.
 */
export async function readFrameworkVersion(
  fs: FileSystemPort,
  frameworkDir: string,
): Promise<string | null> {
  const stampPath = join(frameworkDir, FRAMEWORK_VERSION_FILENAME);
  if (!(await fs.exists(stampPath))) return null;
  return parseFrameworkVersion(await fs.readFile(stampPath));
}
