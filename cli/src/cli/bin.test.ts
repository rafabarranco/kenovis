import { test } from "node:test";
import assert from "node:assert/strict";
import { parseArgs, defaultFrameworkSourceDir, main } from "./bin.js";

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

test("parseArgs reads the sync command with its own targetDir and --source", () => {
  const args = parseArgs(["sync", "/repo", "--source", "/assets"]);
  assert.deepEqual(args, {
    command: "sync",
    targetDir: "/repo",
    sourceDir: "/assets",
    force: false,
  });
});

test("parseArgs reads the add command with its own targetDir and --force", () => {
  const args = parseArgs(["add", "/repo", "--force"]);
  assert.deepEqual(args, { command: "add", targetDir: "/repo", sourceDir: undefined, force: true });
});

test("parseArgs treats a bare targetDir (no recognized subcommand) as the autodetect dispatch", () => {
  const args = parseArgs(["/repo", "--source", "/assets"]);
  assert.deepEqual(args, { command: "", targetDir: "/repo", sourceDir: "/assets", force: false });
});

test("parseArgs with no arguments at all is the autodetect dispatch against '.'", () => {
  const args = parseArgs([]);
  assert.deepEqual(args, { command: "", targetDir: ".", sourceDir: undefined, force: false });
});

test("main(['--help']) prints usage and exits 0 without touching the filesystem (never falls into bare autodetect against cwd)", async () => {
  const exitCode = await main(["--help"]);
  assert.equal(exitCode, 0);
});

test("main(['-h']) prints usage and exits 0 without touching the filesystem", async () => {
  const exitCode = await main(["-h"]);
  assert.equal(exitCode, 0);
});

test("defaultFrameworkSourceDir resolves to a framework-assets sibling of dist/cli", () => {
  const dir = defaultFrameworkSourceDir();
  assert.match(dir, /dist[\\/]framework-assets$/);
});
