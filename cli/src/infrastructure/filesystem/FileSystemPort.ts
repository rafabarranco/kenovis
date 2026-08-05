/**
 * Filesystem access, isolated behind a port so the application layer never
 * imports node:fs directly (AI/policies/architecture.md — Persistence is an
 * implementation detail; Dependency Direction points inward).
 */
export interface FileSystemPort {
  exists(targetPath: string): Promise<boolean>;
  writeFile(targetPath: string, contents: string): Promise<void>;
  copyTree(sourceDir: string, targetDir: string): Promise<void>;
  /** Recursively deletes targetPath. No-op if it does not exist. */
  removeTree(targetPath: string): Promise<void>;
  /** Top-level entry names directly inside dirPath. Empty array if dirPath does not exist. */
  listDir(dirPath: string): Promise<string[]>;
}
