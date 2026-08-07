import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, readFile, writeFile, mkdir, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NodeFileSystem } from "./NodeFileSystem.js";
import { runInit } from "../../application/commands/init.js";
import { runSync } from "../../application/commands/sync.js";
import {
  claudeStubContent,
  CLAUDE_MD_HASH_FILENAME,
  InvalidFrameworkSourceError,
  NotInstalledError,
  SETUP_PENDING_FILENAME,
  setupPendingContent,
} from "../../domain/installation.js";

async function withTempDirs(
  run: (sourceDir: string, targetDir: string) => Promise<void>,
): Promise<void> {
  const root = await mkdtemp(join(tmpdir(), "kenovis-sync-test-"));
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

test("runSync against a real filesystem refuses to run before init", async () => {
  await withTempDirs(async (sourceDir, targetDir) => {
    await writeFile(join(sourceDir, "README.md"), "# Framework explanation v2\n");
    const fs = new NodeFileSystem();

    await assert.rejects(
      () => runSync(fs, { frameworkSourceDir: sourceDir, targetDir }),
      NotInstalledError,
    );
  });
});

test("runSync against a real filesystem replaces stale files from an older release", async () => {
  await withTempDirs(async (sourceDir, targetDir) => {
    await mkdir(join(sourceDir, "AI"), { recursive: true });
    await writeFile(join(sourceDir, "AI", "SYSTEM.md"), "# System v1\n");
    await writeFile(join(sourceDir, "AI", "old-agent.md"), "# Retired in v2\n");
    await writeFile(join(sourceDir, "README.md"), "# Framework explanation v1\n");

    const fs = new NodeFileSystem();
    await runInit(fs, { frameworkSourceDir: sourceDir, targetDir, invokedAs: "init" });

    await rm(join(sourceDir, "AI", "old-agent.md"));
    await writeFile(join(sourceDir, "AI", "SYSTEM.md"), "# System v2\n");
    await writeFile(join(sourceDir, "AI", "new-agent.md"), "# Added in v2\n");

    await runSync(fs, { frameworkSourceDir: sourceDir, targetDir });

    const systemMd = await readFile(join(targetDir, ".kenovis", "AI", "SYSTEM.md"), "utf8");
    assert.equal(systemMd, "# System v2\n");

    const newAgent = await readFile(join(targetDir, ".kenovis", "AI", "new-agent.md"), "utf8");
    assert.equal(newAgent, "# Added in v2\n");

    await assert.rejects(() => access(join(targetDir, ".kenovis", "AI", "old-agent.md")));
  });
});

test("runSync against a real filesystem refuses --source pointed at a whole product repo checkout (the found footgun), leaving .kenovis/ untouched", async () => {
  await withTempDirs(async (sourceDir, targetDir) => {
    await writeFile(join(sourceDir, "README.md"), "# Framework explanation v1\n");
    const fs = new NodeFileSystem();
    await runInit(fs, { frameworkSourceDir: sourceDir, targetDir, invokedAs: "init" });

    // Simulate --source pointed at a full repo checkout instead of the bundled
    // dist/framework-assets/ — this reproduces the smoke-test finding recorded
    // in AI/memory/learnings.md Learning-004.
    await mkdir(join(sourceDir, "PRODUCT"), { recursive: true });
    await writeFile(join(sourceDir, "COMPANY_OS.md"), "# Real company context\n");
    await writeFile(join(sourceDir, "PRODUCT", "ROADMAP.md"), "# Real roadmap\n");

    await assert.rejects(
      () => runSync(fs, { frameworkSourceDir: sourceDir, targetDir }),
      InvalidFrameworkSourceError,
    );

    const systemReadme = await readFile(join(targetDir, ".kenovis", "README.md"), "utf8");
    assert.equal(systemReadme, "# Framework explanation v1\n");
    await assert.rejects(() => access(join(targetDir, ".kenovis", "COMPANY_OS.md")));
  });
});

test("runSync against a real filesystem keeps an install-then-sync-before-first-session Installation pending (Learning-010)", async () => {
  await withTempDirs(async (sourceDir, targetDir) => {
    await mkdir(join(sourceDir, "AI"), { recursive: true });
    await writeFile(join(sourceDir, "AI", "SYSTEM.md"), "# System v1\n");
    await writeFile(join(sourceDir, "README.md"), "# Framework explanation v1\n");

    // A real brownfield target: install, then sync before ever opening an AI session.
    await writeFile(join(targetDir, "package.json"), "{}\n");
    const fs = new NodeFileSystem();
    await runInit(fs, { frameworkSourceDir: sourceDir, targetDir, invokedAs: "add" });
    const claudeMdAfterInstall = await readFile(join(targetDir, "CLAUDE.md"), "utf8");

    await writeFile(join(sourceDir, "AI", "SYSTEM.md"), "# System v2\n");
    const result = await runSync(fs, { frameworkSourceDir: sourceDir, targetDir });

    assert.equal(result.setupStillPending, true);
    const marker = await readFile(
      join(targetDir, ".kenovis", SETUP_PENDING_FILENAME),
      "utf8",
    );
    assert.equal(marker, setupPendingContent("brownfield"));

    const claudeMdAfterSync = await readFile(join(targetDir, "CLAUDE.md"), "utf8");
    assert.equal(claudeMdAfterSync, claudeMdAfterInstall);

    // The Framework layer still updated — preserving the marker is not a no-op sync.
    const systemMd = await readFile(join(targetDir, ".kenovis", "AI", "SYSTEM.md"), "utf8");
    assert.equal(systemMd, "# System v2\n");
  });
});

test("runSync against a real filesystem drops to the steady-state stub once setup is done", async () => {
  await withTempDirs(async (sourceDir, targetDir) => {
    await writeFile(join(sourceDir, "README.md"), "# Framework explanation v1\n");
    const fs = new NodeFileSystem();
    await runInit(fs, { frameworkSourceDir: sourceDir, targetDir, invokedAs: "init" });

    // init-project/adopt-project completing, per their own final step: marker
    // deleted, stub reverted, recorded hash dropped (it still described the
    // pending stub, so keeping it would make this sync refuse).
    await rm(join(targetDir, ".kenovis", SETUP_PENDING_FILENAME));
    await rm(join(targetDir, ".kenovis", CLAUDE_MD_HASH_FILENAME));
    await writeFile(join(targetDir, "CLAUDE.md"), claudeStubContent({ pending: false }));

    const result = await runSync(fs, { frameworkSourceDir: sourceDir, targetDir });

    assert.equal(result.setupStillPending, false);
    await assert.rejects(() => access(join(targetDir, ".kenovis", SETUP_PENDING_FILENAME)));
    const claudeMd = await readFile(join(targetDir, "CLAUDE.md"), "utf8");
    assert.equal(claudeMd, claudeStubContent({ pending: false }));
  });
});

test("runSync against a real filesystem never touches the target's own README.md or Product-layer files", async () => {
  await withTempDirs(async (sourceDir, targetDir) => {
    await writeFile(join(sourceDir, "README.md"), "# Framework explanation v1\n");
    const fs = new NodeFileSystem();
    await runInit(fs, { frameworkSourceDir: sourceDir, targetDir, invokedAs: "init" });

    await writeFile(join(targetDir, "README.md"), "# Customer's real product\n");
    await writeFile(join(targetDir, "COMPANY_OS.md"), "# Real company context\n");

    await writeFile(join(sourceDir, "README.md"), "# Framework explanation v2\n");
    await runSync(fs, { frameworkSourceDir: sourceDir, targetDir });

    const customerReadme = await readFile(join(targetDir, "README.md"), "utf8");
    assert.equal(customerReadme, "# Customer's real product\n");

    const companyOs = await readFile(join(targetDir, "COMPANY_OS.md"), "utf8");
    assert.equal(companyOs, "# Real company context\n");
  });
});
