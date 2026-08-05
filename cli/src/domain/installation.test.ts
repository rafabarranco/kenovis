import { test } from "node:test";
import assert from "node:assert/strict";
import {
  AlreadyInstalledError,
  claudeStubContent,
  detectInstallationKind,
  FRAMEWORK_DIR_NAME,
} from "./installation.js";

test("claudeStubContent points at .kenovis/AI/SYSTEM.md", () => {
  const content = claudeStubContent();
  assert.match(content, /\.kenovis\/AI\/SYSTEM\.md/);
});

test("claudeStubContent references the actual framework directory name", () => {
  const content = claudeStubContent();
  assert.ok(content.includes(FRAMEWORK_DIR_NAME));
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
