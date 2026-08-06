import { test } from "node:test";
import assert from "node:assert/strict";
import {
  AlreadyInstalledError,
  BrownfieldDetectedError,
  claudeStubContent,
  detectInstallationKind,
  ExistingClaudeMdError,
  FRAMEWORK_DIR_NAME,
  GreenfieldDetectedError,
  InvalidFrameworkSourceError,
  invalidFrameworkSourceEntries,
  isKenovisManagedClaudeStub,
  setupPendingContent,
} from "./installation.js";

test("claudeStubContent points at .kenovis/AI/SYSTEM.md", () => {
  const content = claudeStubContent({ pending: false });
  assert.match(content, /\.kenovis\/AI\/SYSTEM\.md/);
});

test("claudeStubContent references the actual framework directory name", () => {
  const content = claudeStubContent({ pending: false });
  assert.ok(content.includes(FRAMEWORK_DIR_NAME));
});

test("claudeStubContent, when pending and greenfield, directs the next session to init-project", () => {
  const content = claudeStubContent({ pending: true, kind: "greenfield" });
  assert.match(content, /Before doing anything else this session, run/);
  assert.match(content, /\.kenovis\/AI\/commands\/init-project\.md/);
});

test("claudeStubContent, when pending and brownfield, directs the next session to adopt-project", () => {
  const content = claudeStubContent({ pending: true, kind: "brownfield" });
  assert.match(content, /\.kenovis\/AI\/commands\/adopt-project\.md/);
});

test("setupPendingContent resolves greenfield to init-project and brownfield to adopt-project", () => {
  assert.equal(setupPendingContent("greenfield"), "init-project");
  assert.equal(setupPendingContent("brownfield"), "adopt-project");
});

test("BrownfieldDetectedError cites the evidence and points at kenovis add", () => {
  const error = new BrownfieldDetectedError(["package.json", "src"]);
  assert.deepEqual(error.evidence, ["package.json", "src"]);
  assert.match(error.message, /package\.json, src/);
  assert.match(error.message, /kenovis add/);
  assert.match(error.message, /--force/);
  assert.equal(error.name, "BrownfieldDetectedError");
});

test("GreenfieldDetectedError points at kenovis init", () => {
  const error = new GreenfieldDetectedError();
  assert.match(error.message, /kenovis init/);
  assert.match(error.message, /--force/);
  assert.equal(error.name, "GreenfieldDetectedError");
});

test("isKenovisManagedClaudeStub recognizes both pending and steady-state stub content", () => {
  assert.ok(isKenovisManagedClaudeStub(claudeStubContent({ pending: false })));
  assert.ok(isKenovisManagedClaudeStub(claudeStubContent({ pending: true, kind: "greenfield" })));
  assert.ok(isKenovisManagedClaudeStub(claudeStubContent({ pending: true, kind: "brownfield" })));
});

test("isKenovisManagedClaudeStub rejects a customer's own unrelated CLAUDE.md", () => {
  assert.equal(isKenovisManagedClaudeStub("# My Project\n\nDo whatever you want, agent.\n"), false);
  assert.equal(isKenovisManagedClaudeStub(""), false);
});

test("ExistingClaudeMdError names the path and mentions --force", () => {
  const error = new ExistingClaudeMdError("/repo/CLAUDE.md");
  assert.equal(error.claudeMdPath, "/repo/CLAUDE.md");
  assert.match(error.message, /--force/);
  assert.equal(error.name, "ExistingClaudeMdError");
});

test("AlreadyInstalledError carries the conflicting directory and mentions --force", () => {
  const error = new AlreadyInstalledError("/repo/.kenovis");
  assert.equal(error.frameworkDir, "/repo/.kenovis");
  assert.match(error.message, /--force/);
  assert.equal(error.name, "AlreadyInstalledError");
});

test("detectInstallationKind reports greenfield for an empty directory", () => {
  const result = detectInstallationKind([]);
  assert.equal(result.kind, "greenfield");
  assert.deepEqual(result.evidence, []);
});

test("detectInstallationKind reports greenfield when only trivial/framework-owned entries exist", () => {
  const result = detectInstallationKind([
    ".git",
    ".gitignore",
    "README.md",
    "LICENSE",
    FRAMEWORK_DIR_NAME,
    "CLAUDE.md",
    ".claude",
  ]);
  assert.equal(result.kind, "greenfield");
  assert.deepEqual(result.evidence, []);
});

test("detectInstallationKind reports brownfield and cites real implementation entries as evidence", () => {
  const result = detectInstallationKind([".git", "README.md", "package.json", "src"]);
  assert.equal(result.kind, "brownfield");
  assert.deepEqual(result.evidence, ["package.json", "src"]);
});

test("invalidFrameworkSourceEntries accepts a directory containing only AI/ and README.md", () => {
  const unexpected = invalidFrameworkSourceEntries(["AI", "README.md"]);
  assert.deepEqual(unexpected, []);
});

test("invalidFrameworkSourceEntries accepts an empty directory", () => {
  assert.deepEqual(invalidFrameworkSourceEntries([]), []);
});

test("invalidFrameworkSourceEntries ignores dotfiles/dot-directories", () => {
  const unexpected = invalidFrameworkSourceEntries(["AI", "README.md", ".git", ".DS_Store"]);
  assert.deepEqual(unexpected, []);
});

test("invalidFrameworkSourceEntries flags Product-layer content mixed alongside AI/", () => {
  const unexpected = invalidFrameworkSourceEntries([
    "AI",
    "README.md",
    "COMPANY_OS.md",
    "DECISIONS.md",
    "DOMAIN",
    "PRODUCT",
    "ENGINEERING",
    "cli",
  ]);
  assert.deepEqual(
    unexpected,
    ["COMPANY_OS.md", "DECISIONS.md", "DOMAIN", "ENGINEERING", "PRODUCT", "cli"].sort(),
  );
});

test("InvalidFrameworkSourceError names the offending directory and unexpected entries", () => {
  const error = new InvalidFrameworkSourceError("/some/repo", ["DECISIONS.md", "cli"]);
  assert.equal(error.sourceDir, "/some/repo");
  assert.deepEqual(error.unexpectedEntries, ["DECISIONS.md", "cli"]);
  assert.match(error.message, /DECISIONS\.md, cli/);
  assert.equal(error.name, "InvalidFrameworkSourceError");
});
