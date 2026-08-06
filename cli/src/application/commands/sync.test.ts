import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { runSync } from "./sync.js";
import { InMemoryFileSystem } from "../../infrastructure/filesystem/InMemoryFileSystem.js";
import {
  claudeStubContent,
  ExistingClaudeMdError,
  InvalidFrameworkSourceError,
  NotInstalledError,
} from "../../domain/installation.js";

test("runSync refuses to run when .kenovis/ does not exist", async () => {
  const fs = new InMemoryFileSystem();

  await assert.rejects(
    () => runSync(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo" }),
    NotInstalledError,
  );
  assert.equal(fs.copiedTrees.length, 0);
});

test("runSync refuses a --source directory mixed with Product-layer content, leaving the existing .kenovis/ untouched", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", ".kenovis"), "<old install>");
  fs.seed("/repo-checkout/AI/SYSTEM.md", "# System");
  fs.seed("/repo-checkout/PRODUCT/ROADMAP.md", "# Real roadmap — never meant to leave this repo");

  await assert.rejects(
    () => runSync(fs, { frameworkSourceDir: "/repo-checkout", targetDir: "/repo" }),
    InvalidFrameworkSourceError,
  );
  assert.equal(fs.removedTrees.length, 0);
  assert.equal(fs.copiedTrees.length, 0);
  assert.ok(fs.files.has(join("/repo", ".kenovis")));
});

test("runSync removes the existing .kenovis/ before copying the new Framework Release in", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", ".kenovis"), "<old install>");

  await runSync(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo" });

  assert.deepEqual(fs.removedTrees, [join("/repo", ".kenovis")]);
  assert.deepEqual(fs.copiedTrees, [
    { sourceDir: "/source/framework", targetDir: join("/repo", ".kenovis") },
  ]);
});

test("runSync rewrites the CLAUDE.md stub at the target root", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", ".kenovis"), "<old install>");

  const result = await runSync(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo" });

  assert.equal(result.claudeStubWrittenTo, join("/repo", "CLAUDE.md"));
  assert.ok(fs.files.has(join("/repo", "CLAUDE.md")));
});

test("runSync never touches the target's own README.md", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", ".kenovis"), "<old install>");
  const readmePath = join("/repo", "README.md");
  fs.seed(readmePath, "# My Real Product\n\nDo not touch this.");

  await runSync(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo" });

  assert.equal(fs.files.get(readmePath), "# My Real Product\n\nDo not touch this.");
});

test("runSync never touches Product-layer files outside .kenovis/", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", ".kenovis"), "<old install>");
  const companyOsPath = join("/repo", "COMPANY_OS.md");
  fs.seed(companyOsPath, "# Real company context");

  await runSync(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo" });

  assert.equal(fs.files.get(companyOsPath), "# Real company context");
});

test("runSync reports the .kenovis/ path it synced", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", ".kenovis"), "<old install>");

  const result = await runSync(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo" });

  assert.equal(result.frameworkSyncedTo, join("/repo", ".kenovis"));
});

test("runSync refuses to overwrite a CLAUDE.md that isn't Kenovis-managed, leaving .kenovis/ untouched", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", ".kenovis"), "<old install>");
  const claudeMdPath = join("/repo", "CLAUDE.md");
  fs.seed(claudeMdPath, "# My own project instructions\n\nDo not touch this.");

  await assert.rejects(
    () => runSync(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo" }),
    ExistingClaudeMdError,
  );
  assert.equal(fs.files.get(claudeMdPath), "# My own project instructions\n\nDo not touch this.");
  assert.equal(fs.removedTrees.length, 0);
  assert.equal(fs.copiedTrees.length, 0);
});

test("runSync --force overwrites a CLAUDE.md that isn't Kenovis-managed", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", ".kenovis"), "<old install>");
  const claudeMdPath = join("/repo", "CLAUDE.md");
  fs.seed(claudeMdPath, "# My own project instructions");

  await runSync(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    force: true,
  });

  assert.notEqual(fs.files.get(claudeMdPath), "# My own project instructions");
});

test("runSync proceeds without --force when the existing CLAUDE.md is already Kenovis-managed", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", ".kenovis"), "<old install>");
  const claudeMdPath = join("/repo", "CLAUDE.md");
  fs.seed(claudeMdPath, claudeStubContent({ pending: false }));

  const result = await runSync(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo" });

  assert.equal(result.claudeStubWrittenTo, claudeMdPath);
});
