import type { FileSystemPort } from "./FileSystemPort.js";

/**
 * Test double for FileSystemPort. Used by application-layer unit tests so
 * they verify orchestration logic without touching a real disk — the real
 * disk behavior is covered separately by NodeFileSystem's integration test.
 */
export class InMemoryFileSystem implements FileSystemPort {
  readonly files = new Map<string, string>();
  readonly copiedTrees: Array<{ sourceDir: string; targetDir: string }> = [];

  seed(path: string, contents: string): void {
    this.files.set(path, contents);
  }

  async exists(targetPath: string): Promise<boolean> {
    return this.files.has(targetPath);
  }

  async writeFile(targetPath: string, contents: string): Promise<void> {
    this.files.set(targetPath, contents);
  }

  async copyTree(sourceDir: string, targetDir: string): Promise<void> {
    this.copiedTrees.push({ sourceDir, targetDir });
    this.files.set(targetDir, `<copied from ${sourceDir}>`);
  }
}
