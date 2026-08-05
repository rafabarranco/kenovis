import { test } from "node:test";
import assert from "node:assert/strict";
import { parseArgs, defaultFrameworkSourceDir } from "./bin.js";

test("parseArgs reads command, positional targetDir, --source, and --force", () => {
  const args = parseArgs(["init", "/repo", "--source", "/assets", "--force"]);
  assert.deepEqual(args, {
    command: "init",
    targetDir: "/repo",
    sourceDir: "/assets",
    force: true,
  });
});

test("parseArgs defaults targetDir to '.' and force to false when omitted", () => {
  const args = parseArgs(["init"]);
  assert.deepEqual(args, { command: "init", targetDir: ".", sourceDir: undefined, force: false });
});

test("parseArgs leaves sourceDir undefined when --source is not passed", () => {
  const args = parseArgs(["init", "/repo"]);
  assert.equal(args.sourceDir, undefined);
});

test("defaultFrameworkSourceDir resolves to a framework-assets sibling of dist/cli", () => {
  const dir = defaultFrameworkSourceDir();
  assert.match(dir, /dist[\\/]framework-assets$/);
});
