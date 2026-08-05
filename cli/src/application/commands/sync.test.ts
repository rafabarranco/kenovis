import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { runSync } from "./sync.js";
import { InMemoryFileSystem } from "../../infrastructure/filesystem/InMemoryFileSystem.js";
import { NotInstalledError } from "../../domain/installation.js";

test("runSync refuses to run when .kenovis/ does not exist", async () => {
  const fs = new InMemoryFileSystem();

  await assert.rejects(
    () => runSync(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo" }),
    NotInstalledError,
  );
  assert.equal(fs.copiedTrees.length, 0);
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
