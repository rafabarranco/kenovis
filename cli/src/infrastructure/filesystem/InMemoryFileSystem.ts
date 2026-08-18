import { join, relative, sep } from "node:path";
import type { FileSystemPort } from "./FileSystemPort.js";

/**
 * Test double for FileSystemPort. Used by application-layer unit tests so
 * they verify orchestration logic without touching a real disk — the real
 * disk behavior is covered separately by NodeFileSystem's integration test.
 */
export class InMemoryFileSystem implements FileSystemPort {
  readonly files = new Map<string, string>();
  readonly copiedTrees: Array<{ sourceDir: string; targetDir: string }> = [];
  readonly removedTrees: string[] = [];

  seed(path: string, contents: string): void {
    this.files.set(path, contents);
  }

  async exists(targetPath: string): Promise<boolean> {
    return this.files.has(targetPath);
  }

  async readFile(targetPath: string): Promise<string> {
    const contents = this.files.get(targetPath);
    if (contents === undefined) {
      throw new Error(`InMemoryFileSystem: no file at ${targetPath}`);
    }
    return contents;
  }

  async writeFile(targetPath: string, contents: string): Promise<void> {
    this.files.set(targetPath, contents);
  }

  async copyTree(sourceDir: string, targetDir: string): Promise<void> {
    this.copiedTrees.push({ sourceDir, targetDir });
    // Copy any real nested files a fixture seeded under sourceDir, keyed by
    // their relative path, so walkFiles(targetDir) reflects them afterwards.
    for (const [filePath, contents] of [...this.files.entries()]) {
      const rel = relative(sourceDir, filePath);
      if (rel.startsWith("..") || rel === "") continue;
      this.files.set(join(targetDir, rel), contents);
    }
    // Directory-existence marker: fixtures that seed only the directory path
    // itself (no real files inside it) still need exists(targetDir) to hold
    // afterwards, and walkFiles excludes this exact-path key from its
    // results the same way it excludes the equivalent seed on sourceDir.
    this.files.set(targetDir, `<copied from ${sourceDir}>`);
  }

  async removeTree(targetPath: string): Promise<void> {
    this.removedTrees.push(targetPath);
    for (const filePath of [...this.files.keys()]) {
      const rel = relative(targetPath, filePath);
      if (rel.startsWith("..")) continue;
      this.files.delete(filePath);
    }
  }

  async listDir(dirPath: string): Promise<string[]> {
    const entries = new Set<string>();
    for (const filePath of this.files.keys()) {
      const rel = relative(dirPath, filePath);
      if (rel.startsWith("..") || rel === "") continue;
      entries.add(rel.split(sep)[0]);
    }
    return [...entries];
  }

  async walkFiles(dirPath: string): Promise<string[]> {
    const results: string[] = [];
    for (const filePath of this.files.keys()) {
      const rel = relative(dirPath, filePath);
      if (rel.startsWith("..") || rel === "") continue;
      results.push(rel.split(sep).join("/"));
    }
    return results;
  }
}
