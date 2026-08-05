import { test } from "node:test";
import assert from "node:assert/strict";
import { AlreadyInstalledError, claudeStubContent, FRAMEWORK_DIR_NAME } from "./installation.js";

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
