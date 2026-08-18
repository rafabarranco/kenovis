/**
 * Filesystem access, isolated behind a port so the application layer never
 * imports node:fs directly (.kenovis/AI/policies/architecture.md — Persistence is an
 * implementation detail; Dependency Direction points inward).
 */
export interface FileSystemPort {
  exists(targetPath: string): Promise<boolean>;
  /** Reads a file's full contents. Only call after confirming it exists. */
  readFile(targetPath: string): Promise<string>;
  writeFile(targetPath: string, contents: string): Promise<void>;
  copyTree(sourceDir: string, targetDir: string): Promise<void>;
  /** Recursively deletes targetPath. No-op if it does not exist. */
  removeTree(targetPath: string): Promise<void>;
  /** Top-level entry names directly inside dirPath. Empty array if dirPath does not exist. */
  listDir(dirPath: string): Promise<string[]>;
  /**
   * Every file's path relative to dirPath, recursively, posix-separated
   * regardless of platform. Directories are not included. Empty array if
   * dirPath does not exist.
   */
  walkFiles(dirPath: string): Promise<string[]>;
}
