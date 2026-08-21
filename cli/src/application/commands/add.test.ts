import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { runAdd } from "./add.js";
import { InMemoryFileSystem } from "../../infrastructure/filesystem/InMemoryFileSystem.js";
import { GreenfieldDetectedError } from "../../domain/installation.js";

test("runAdd installs on a detected-brownfield target, naming adopt-project in the stub", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", "package.json"), "{}");
  fs.seed(join("/repo", "src", "index.ts"), "// real code");

  const result = await runAdd(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo" });

  assert.equal(result.detectedKind, "brownfield");
  assert.deepEqual(result.detectionEvidence, ["package.json", "src"]);
  assert.equal(fs.files.get(result.setupPendingWrittenTo), "adopt-project");
  assert.match(fs.files.get(result.claudeStubWrittenTo) ?? "", /adopt-project\.md/);
});

test("runAdd refuses a detected-greenfield target without --force, copying nothing", async () => {
  const fs = new InMemoryFileSystem();

  await assert.rejects(
    () => runAdd(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo" }),
    GreenfieldDetectedError,
  );
  assert.equal(fs.copiedTrees.length, 0);
});

test("runAdd installs on a detected-greenfield target when --force is passed", async () => {
  const fs = new InMemoryFileSystem();

  const result = await runAdd(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    force: true,
  });

  assert.equal(result.detectedKind, "greenfield");
  assert.equal(fs.copiedTrees.length, 1);
});

test("runAdd preserves a customer's own pre-existing CLAUDE.md rather than refusing the install over it (OF-94)", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", "package.json"), "{}");
  fs.seed(join("/repo", "CLAUDE.md"), "# My Project\n\nCustom instructions.\n");

  const result = await runAdd(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo" });

  assert.equal(result.claudeMdAction, "coexisted");
  const written = fs.files.get(result.claudeStubWrittenTo) ?? "";
  assert.match(written, /# My Project\n\nCustom instructions\./);
  assert.match(written, /# Kenovis AI-OS/);
  assert.equal(fs.copiedTrees.length, 1);
});
