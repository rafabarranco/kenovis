import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, readFile, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NodeFileSystem } from "./NodeFileSystem.js";
import { runInit } from "../../application/commands/init.js";

async function withTempDirs(
  run: (sourceDir: string, targetDir: string) => Promise<void>,
): Promise<void> {
  const root = await mkdtemp(join(tmpdir(), "kenovis-init-test-"));
  const sourceDir = join(root, "source");
  const targetDir = join(root, "target");
  await mkdir(sourceDir, { recursive: true });
  await mkdir(targetDir, { recursive: true });
  try {
    await run(sourceDir, targetDir);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test("runInit against a real filesystem copies files and never touches an existing README", async () => {
  await withTempDirs(async (sourceDir, targetDir) => {
    await mkdir(join(sourceDir, "AI"), { recursive: true });
    await writeFile(join(sourceDir, "AI", "SYSTEM.md"), "# System\n");
    await writeFile(join(sourceDir, "README.md"), "# Framework explanation\n");

    await writeFile(join(targetDir, "README.md"), "# Customer's real product\n");

    const fs = new NodeFileSystem();
    const result = await runInit(fs, { frameworkSourceDir: sourceDir, targetDir });

    const copiedSystemMd = await readFile(
      join(targetDir, ".kenovis", "AI", "SYSTEM.md"),
      "utf8",
    );
    assert.equal(copiedSystemMd, "# System\n");

    const claudeStub = await readFile(result.claudeStubWrittenTo, "utf8");
    assert.match(claudeStub, /\.kenovis\/AI\/SYSTEM\.md/);

    const customerReadme = await readFile(join(targetDir, "README.md"), "utf8");
    assert.equal(customerReadme, "# Customer's real product\n");
    assert.equal(result.targetReadmeUntouched, true);
  });
});

test("runInit against a real filesystem refuses a second install without --force", async () => {
  await withTempDirs(async (sourceDir, targetDir) => {
    await writeFile(join(sourceDir, "README.md"), "# Framework explanation\n");
    const fs = new NodeFileSystem();

    await runInit(fs, { frameworkSourceDir: sourceDir, targetDir });

    await assert.rejects(() => runInit(fs, { frameworkSourceDir: sourceDir, targetDir }));
  });
});
