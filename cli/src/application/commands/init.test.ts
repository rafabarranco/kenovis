import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { runInit } from "./init.js";
import { InMemoryFileSystem } from "../../infrastructure/filesystem/InMemoryFileSystem.js";
import {
  AlreadyInstalledError,
  BrownfieldDetectedError,
  claudeStubContent,
  ExistingClaudeMdError,
  InvalidFrameworkSourceError,
  FRAMEWORK_VERSION_FILENAME,
} from "../../domain/installation.js";

test("runInit copies the framework source into <target>/.kenovis", async () => {
  const fs = new InMemoryFileSystem();

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    invokedAs: "init",
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
    invokedAs: "init",
  });

  assert.equal(result.claudeStubWrittenTo, join("/repo", "CLAUDE.md"));
  assert.ok(fs.files.has(join("/repo", "CLAUDE.md")));
});

test("runInit writes a pending CLAUDE.md stub directing the next session to init-project", async () => {
  const fs = new InMemoryFileSystem();

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    invokedAs: "init",
  });

  const stub = fs.files.get(result.claudeStubWrittenTo);
  assert.match(stub ?? "", /Before doing anything else this session, run/);
  assert.match(stub ?? "", /init-project\.md/);
});

test("runInit writes .kenovis/.setup-pending naming init-project for a greenfield target", async () => {
  const fs = new InMemoryFileSystem();

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    invokedAs: "init",
  });

  assert.equal(result.setupPendingWrittenTo, join("/repo", ".kenovis", ".setup-pending"));
  assert.equal(fs.files.get(result.setupPendingWrittenTo), "init-project");
});

test("runInit never writes to an existing target README.md, only reports it exists", async () => {
  const fs = new InMemoryFileSystem();
  const readmePath = join("/repo", "README.md");
  fs.seed(readmePath, "# My Real Product\n\nDo not touch this.");

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    invokedAs: "init",
  });

  assert.equal(result.targetReadmeUntouched, true);
  assert.equal(fs.files.get(readmePath), "# My Real Product\n\nDo not touch this.");
});

test("runInit reports no README.md was found, and does not create one", async () => {
  const fs = new InMemoryFileSystem();

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    invokedAs: "init",
  });

  assert.equal(result.targetReadmeUntouched, false);
  assert.equal(fs.files.has(join("/repo", "README.md")), false);
});

test("runInit refuses to overwrite an existing .kenovis/ without --force", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", ".kenovis"), "<existing install>");

  await assert.rejects(
    () => runInit(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo", invokedAs: "init" }),
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
    invokedAs: "init",
  });

  assert.equal(result.frameworkInstalledTo, join("/repo", ".kenovis"));
  assert.equal(fs.copiedTrees.length, 1);
});

test("runInit detects greenfield when the target has no pre-existing implementation", async () => {
  const fs = new InMemoryFileSystem();

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    invokedAs: "init",
  });

  assert.equal(result.detectedKind, "greenfield");
  assert.deepEqual(result.detectionEvidence, []);
});

test("runInit refuses a detected-brownfield target without --force, copying nothing", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", "package.json"), "{}");
  fs.seed(join("/repo", "src", "index.ts"), "// real code");

  await assert.rejects(
    () =>
      runInit(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo", invokedAs: "init" }),
    (error: unknown) => {
      assert.ok(error instanceof BrownfieldDetectedError);
      assert.deepEqual(error.evidence, ["package.json", "src"]);
      return true;
    },
  );
  assert.equal(fs.copiedTrees.length, 0);
});

test("runInit installs on a detected-brownfield target when --force is passed", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", "package.json"), "{}");

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    force: true,
    invokedAs: "init",
  });

  assert.equal(result.detectedKind, "brownfield");
  assert.equal(fs.copiedTrees.length, 1);
});

test("runInit writes .kenovis/.setup-pending naming adopt-project for a brownfield target installed with --force", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", "package.json"), "{}");

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    force: true,
    invokedAs: "init",
  });

  assert.equal(fs.files.get(result.setupPendingWrittenTo), "adopt-project");
  const stub = fs.files.get(result.claudeStubWrittenTo);
  assert.match(stub ?? "", /adopt-project\.md/);
});

test("runInit refuses a --source directory mixed with Product-layer content, without copying anything", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed("/repo-checkout/AI/SYSTEM.md", "# System");
  fs.seed("/repo-checkout/README.md", "# Framework explanation");
  fs.seed("/repo-checkout/COMPANY_OS.md", "# Real company context — never meant to leave this repo");
  fs.seed("/repo-checkout/DECISIONS.md", "# Real decisions");

  await assert.rejects(
    () => runInit(fs, { frameworkSourceDir: "/repo-checkout", targetDir: "/repo", invokedAs: "init" }),
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
    invokedAs: "init",
  });

  assert.equal(result.detectedKind, "greenfield");
});

test("runInit refuses to overwrite a customer's own pre-existing CLAUDE.md, copying nothing", async () => {
  const fs = new InMemoryFileSystem();
  const claudeMdPath = join("/repo", "CLAUDE.md");
  fs.seed(claudeMdPath, "# My Project\n\nCustom instructions the customer wrote themselves.\n");

  await assert.rejects(
    () => runInit(fs, { frameworkSourceDir: "/source/framework", targetDir: "/repo", invokedAs: "init" }),
    ExistingClaudeMdError,
  );
  assert.equal(fs.copiedTrees.length, 0);
  assert.equal(
    fs.files.get(claudeMdPath),
    "# My Project\n\nCustom instructions the customer wrote themselves.\n",
  );
});

test("runInit overwrites a customer's own pre-existing CLAUDE.md when --force is passed", async () => {
  const fs = new InMemoryFileSystem();
  const claudeMdPath = join("/repo", "CLAUDE.md");
  fs.seed(claudeMdPath, "# My Project\n\nCustom instructions.\n");

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    force: true,
    invokedAs: "init",
  });

  assert.match(fs.files.get(result.claudeStubWrittenTo) ?? "", /Kenovis AI-OS/);
});

test("runInit silently overwrites an already Kenovis-managed CLAUDE.md, no --force needed", async () => {
  const fs = new InMemoryFileSystem();
  const claudeMdPath = join("/repo", "CLAUDE.md");
  fs.seed(claudeMdPath, claudeStubContent({ pending: false }));

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    invokedAs: "init",
  });

  assert.match(fs.files.get(result.claudeStubWrittenTo) ?? "", /Before doing anything else/);
});

test("runInit mirror-replaces an existing .kenovis/ under --force, not a merge (removeTree before copyTree)", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", ".kenovis"), "<stale install from an older Framework Release>");

  await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    force: true,
    invokedAs: "init",
  });

  assert.deepEqual(fs.removedTrees, [join("/repo", ".kenovis")]);
  assert.deepEqual(fs.copiedTrees, [
    { sourceDir: "/source/framework", targetDir: join("/repo", ".kenovis") },
  ]);
});

test("runInit under --force on a brownfield target still never touches README.md", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", "package.json"), "{}");
  const readmePath = join("/repo", "README.md");
  fs.seed(readmePath, "# My Real Product\n\nDo not touch this.");

  await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    force: true,
    invokedAs: "init",
  });

  assert.equal(fs.files.get(readmePath), "# My Real Product\n\nDo not touch this.");
});

test("runInit reports the Framework Release stamped on the bundle it installed", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/source/framework", FRAMEWORK_VERSION_FILENAME), "0.6.0\n");

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    invokedAs: "init",
  });

  assert.equal(result.frameworkVersion, "0.6.0");
});

test("runInit reports an unstamped bundle as unknown instead of inferring a version", async () => {
  const fs = new InMemoryFileSystem();

  const result = await runInit(fs, {
    frameworkSourceDir: "/source/framework",
    targetDir: "/repo",
    invokedAs: "init",
  });

  assert.equal(result.frameworkVersion, null);
});
