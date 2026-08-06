import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { runInit } from "./init.js";
import { InMemoryFileSystem } from "../../infrastructure/filesystem/InMemoryFileSystem.js";
import { AlreadyInstalledError, InvalidFrameworkSourceError } from "../../domain/installation.js";

test("runInit copies the framework source into <target>/.kenovis", async () => {
  const fs = new InMemoryFileSystem();

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
  });

  assert.equal(result.frameworkInstalledTo, join("/repo", ".kenovis"));
  assert.deepEqual(fs.copiedTrees, [
    { sourceDir: "/source/framework", targetDir: join("/repo", ".kenovis") },
  ]);
});

test("runInit writes a CLAUDE.md stub at the target root", async () => {
  const fs = new InMemoryFileSystem();

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
  });

  assert.equal(result.claudeStubWrittenTo, join("/repo", "CLAUDE.md"));
  assert.ok(fs.files.has(join("/repo", "CLAUDE.md")));
});

test("runInit never writes to an existing target README.md, only reports it exists", async () => {
  const fs = new InMemoryFileSystem();
  const readmePath = join("/repo", "README.md");
  fs.seed(readmePath, "# My Real Product\n\nDo not touch this.");

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
  });

  assert.equal(result.targetReadmeUntouched, true);
  assert.equal(fs.files.get(readmePath), "# My Real Product\n\nDo not touch this.");
});

test("runInit reports no README.md was found, and does not create one", async () => {
  const fs = new InMemoryFileSystem();

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
  });

  assert.equal(result.targetReadmeUntouched, false);
  assert.equal(fs.files.has(join("/repo", "README.md")), false);
});

test("runInit refuses to overwrite an existing .kenovis/ without --force", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", ".kenovis"), "<existing install>");

  await assert.rejects(
    () => runInit(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo" }),
    AlreadyInstalledError,
  );
  assert.equal(fs.copiedTrees.length, 0);
});

test("runInit overwrites an existing .kenovis/ when --force is passed", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", ".kenovis"), "<existing install>");

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    force: true,
  });

  assert.equal(result.frameworkInstalledTo, join("/repo", ".kenovis"));
  assert.equal(fs.copiedTrees.length, 1);
});

test("runInit detects greenfield when the target has no pre-existing implementation", async () => {
  const fs = new InMemoryFileSystem();

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
  });

  assert.equal(result.detectedKind, "greenfield");
  assert.deepEqual(result.detectionEvidence, []);
});

test("runInit detects brownfield when the target already has real files, citing them as evidence", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", "package.json"), "{}");
  fs.seed(join("/repo", "src", "index.ts"), "// real code");

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
  });

  assert.equal(result.detectedKind, "brownfield");
  assert.deepEqual(result.detectionEvidence, ["package.json", "src"]);
});

test("runInit refuses a --source directory mixed with Product-layer content, without copying anything", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed("/repo-checkout/AI/SYSTEM.md", "# System");
  fs.seed("/repo-checkout/README.md", "# Framework explanation");
  fs.seed("/repo-checkout/COMPANY_OS.md", "# Real company context — never meant to leave this repo");
  fs.seed("/repo-checkout/DECISIONS.md", "# Real decisions");

  await assert.rejects(
    () => runInit(fs, { frameworkSourceDir: "/repo-checkout", targetDir: "/repo" }),
    InvalidFrameworkSourceError,
  );
  assert.equal(fs.copiedTrees.length, 0);
});

test("runInit does not count an existing target README.md as brownfield evidence", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", "README.md"), "# My Real Product");

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
  });

  assert.equal(result.detectedKind, "greenfield");
});
