import { mkdir, cp, rm, writeFile as fsWriteFile, access, readdir } from "node:fs/promises";
import { dirname } from "node:path";
import type { FileSystemPort } from "./FileSystemPort.js";

export class NodeFileSystem implements FileSystemPort {
  async exists(targetPath: string): Promise<boolean> {
    try {
      await access(targetPath);
      return true;
    } catch {
      return false;
    }
  }

  async listDir(dirPath: string): Promise<string[]> {
    try {
      return await readdir(dirPath);
    } catch {
      return [];
    }
  }

  async writeFile(targetPath: string, contents: string): Promise<void> {
    await mkdir(dirname(targetPath), { recursive: true });
    await fsWriteFile(targetPath, contents, "utf8");
  }

  async copyTree(sourceDir: string, targetDir: string): Promise<void> {
    await mkdir(targetDir, { recursive: true });
    await cp(sourceDir, targetDir, { recursive: true, errorOnExist: false });
  }

  async removeTree(targetPath: string): Promise<void> {
    await rm(targetPath, { recursive: true, force: true });
  }
}
