import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, readFile, writeFile, mkdir, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NodeFileSystem } from "./NodeFileSystem.js";
import { runInit } from "../../application/commands/init.js";
import { runSync } from "../../application/commands/sync.js";
import { ExistingClaudeMdError } from "../../domain/installation.js";

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
    const result = await runInit(fs, { frameworkSourceDir: sourceDir, targetDir, invokedAs: "init" });

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

    await runInit(fs, { frameworkSourceDir: sourceDir, targetDir, invokedAs: "init" });

    await assert.rejects(() => runInit(fs, { frameworkSourceDir: sourceDir, targetDir, invokedAs: "init" }));
  });
});

test("runInit against a real filesystem detects brownfield from real pre-existing files", async () => {
  await withTempDirs(async (sourceDir, targetDir) => {
    await writeFile(join(sourceDir, "README.md"), "# Framework explanation\n");
    await writeFile(join(targetDir, "package.json"), "{}");
    await mkdir(join(targetDir, "src"), { recursive: true });

    const fs = new NodeFileSystem();
    const result = await runInit(fs, {
      frameworkSourceDir: sourceDir,
      targetDir,
      invokedAs: "init",
      force: true,
    });

    assert.equal(result.detectedKind, "brownfield");
    assert.deepEqual(result.detectionEvidence, ["package.json", "src"]);
  });
});

test("runInit against a real filesystem detects greenfield for an empty target", async () => {
  await withTempDirs(async (sourceDir, targetDir) => {
    await writeFile(join(sourceDir, "README.md"), "# Framework explanation\n");

    const fs = new NodeFileSystem();
    const result = await runInit(fs, { frameworkSourceDir: sourceDir, targetDir, invokedAs: "init" });

    assert.equal(result.detectedKind, "greenfield");
    assert.deepEqual(result.detectionEvidence, []);
  });
});

test("runInit against a real filesystem refuses to overwrite a customer's own pre-existing CLAUDE.md", async () => {
  await withTempDirs(async (sourceDir, targetDir) => {
    await writeFile(join(sourceDir, "README.md"), "# Framework explanation\n");
    await writeFile(join(targetDir, "CLAUDE.md"), "# My Project\n\nMy own instructions.\n");

    const fs = new NodeFileSystem();

    await assert.rejects(
      () => runInit(fs, { frameworkSourceDir: sourceDir, targetDir, invokedAs: "init" }),
      ExistingClaudeMdError,
    );

    const claudeMd = await readFile(join(targetDir, "CLAUDE.md"), "utf8");
    assert.equal(claudeMd, "# My Project\n\nMy own instructions.\n");
    await assert.rejects(() => access(join(targetDir, ".kenovis")));
  });
});

test("runInit against a real filesystem overwrites a customer's own CLAUDE.md when --force is passed", async () => {
  await withTempDirs(async (sourceDir, targetDir) => {
    await writeFile(join(sourceDir, "README.md"), "# Framework explanation\n");
    await writeFile(join(targetDir, "CLAUDE.md"), "# My Project\n\nMy own instructions.\n");

    const fs = new NodeFileSystem();
    const result = await runInit(fs, {
      frameworkSourceDir: sourceDir,
      targetDir,
      invokedAs: "init",
      force: true,
    });

    const claudeMd = await readFile(result.claudeStubWrittenTo, "utf8");
    assert.match(claudeMd, /Kenovis AI-OS/);
  });
});

test("runInit --force against a real filesystem mirror-replaces .kenovis/, removing stale files from an older install", async () => {
  await withTempDirs(async (sourceDir, targetDir) => {
    await mkdir(join(sourceDir, "AI"), { recursive: true });
    await writeFile(join(sourceDir, "AI", "SYSTEM.md"), "# System v2\n");
    await writeFile(join(sourceDir, "README.md"), "# Framework explanation v2\n");

    const fs = new NodeFileSystem();
    await runInit(fs, { frameworkSourceDir: sourceDir, targetDir, invokedAs: "init" });

    // Simulate a file retired in the new Framework Release, left over from
    // the first install — this must be gone after a --force reinstall.
    await writeFile(join(targetDir, ".kenovis", "AI", "old-agent.md"), "# Retired\n");

    await runInit(fs, { frameworkSourceDir: sourceDir, targetDir, invokedAs: "init", force: true });

    await assert.rejects(() => access(join(targetDir, ".kenovis", "AI", "old-agent.md")));
    const systemMd = await readFile(join(targetDir, ".kenovis", "AI", "SYSTEM.md"), "utf8");
    assert.equal(systemMd, "# System v2\n");
  });
});

test("runSync against a real filesystem refuses to overwrite a CLAUDE.md the customer edited by hand, leaving .kenovis/ untouched", async () => {
  await withTempDirs(async (sourceDir, targetDir) => {
    await mkdir(join(sourceDir, "AI"), { recursive: true });
    await writeFile(join(sourceDir, "AI", "SYSTEM.md"), "# System\n");
    await writeFile(join(sourceDir, "README.md"), "# Framework explanation\n");

    const fs = new NodeFileSystem();
    await runInit(fs, { frameworkSourceDir: sourceDir, targetDir, invokedAs: "init" });

    await writeFile(join(targetDir, "CLAUDE.md"), "# My Project\n\nMy own added notes.\n");

    await assert.rejects(
      () => runSync(fs, { frameworkSourceDir: sourceDir, targetDir }),
      ExistingClaudeMdError,
    );

    const claudeMd = await readFile(join(targetDir, "CLAUDE.md"), "utf8");
    assert.equal(claudeMd, "# My Project\n\nMy own added notes.\n");
  });
});

test("runSync against a real filesystem overwrites a customer-edited CLAUDE.md when --force is passed", async () => {
  await withTempDirs(async (sourceDir, targetDir) => {
    await mkdir(join(sourceDir, "AI"), { recursive: true });
    await writeFile(join(sourceDir, "AI", "SYSTEM.md"), "# System v2\n");
    await writeFile(join(sourceDir, "README.md"), "# Framework explanation v2\n");

    const fs = new NodeFileSystem();
    await runInit(fs, { frameworkSourceDir: sourceDir, targetDir, invokedAs: "init" });
    await writeFile(join(targetDir, "CLAUDE.md"), "# My own hand-edited stub\n");

    await runSync(fs, { frameworkSourceDir: sourceDir, targetDir, force: true });

    const claudeMd = await readFile(join(targetDir, "CLAUDE.md"), "utf8");
    assert.match(claudeMd, /Kenovis AI-OS/);
  });
});
