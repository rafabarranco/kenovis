import {
  mkdir,
  cp,
  rm,
  writeFile as fsWriteFile,
  readFile as fsReadFile,
  access,
  readdir,
} from "node:fs/promises";
import { dirname, join } from "node:path";
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

  async readFile(targetPath: string): Promise<string> {
    return fsReadFile(targetPath, "utf8");
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

  async walkFiles(dirPath: string): Promise<string[]> {
    const results: string[] = [];
    // Manual recursion over the well-supported non-recursive readdir, rather
    // than readdir's own `recursive: true` option — that option's Dirent
    // parent-path shape changed across recent Node versions, and this port
    // is meant to work wherever this CLI's own engines range does.
    async function walk(currentDir: string, relPrefix: string): Promise<void> {
      let entries;
      try {
        entries = await readdir(currentDir, { withFileTypes: true });
      } catch {
        return;
      }
      for (const entry of entries) {
        const rel = relPrefix ? `${relPrefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
          await walk(join(currentDir, entry.name), rel);
        } else if (entry.isFile()) {
          results.push(rel);
        }
      }
    }
    await walk(dirPath, "");
    return results;
  }
}
