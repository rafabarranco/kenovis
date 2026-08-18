import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs, parseContextArgs, defaultFrameworkSourceDir, main, cliVersion } from "./bin.js";

test("parseArgs reads command, positional targetDir, --source, and --force", () => {
  const args = parseArgs(["init", "/repo", "--source", "/assets", "--force"]);
  assert.deepEqual(args, {
    command: "init",
    targetDir: "/repo",
    sourceDir: "/assets",
    force: true,
    tools: undefined,
  });
});

test("parseArgs defaults targetDir to '.' and force to false when omitted", () => {
  const args = parseArgs(["init"]);
  assert.deepEqual(args, {
    command: "init",
    targetDir: ".",
    sourceDir: undefined,
    force: false,
    tools: undefined,
  });
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
    tools: undefined,
  });
});

test("parseArgs reads the add command with its own targetDir and --force", () => {
  const args = parseArgs(["add", "/repo", "--force"]);
  assert.deepEqual(args, {
    command: "add",
    targetDir: "/repo",
    sourceDir: undefined,
    force: true,
    tools: undefined,
  });
});

test("parseArgs treats a bare targetDir (no recognized subcommand) as the autodetect dispatch", () => {
  const args = parseArgs(["/repo", "--source", "/assets"]);
  assert.deepEqual(args, {
    command: "",
    targetDir: "/repo",
    sourceDir: "/assets",
    force: false,
    tools: undefined,
  });
});

test("parseArgs with no arguments at all is the autodetect dispatch against '.'", () => {
  const args = parseArgs([]);
  assert.deepEqual(args, {
    command: "",
    targetDir: ".",
    sourceDir: undefined,
    force: false,
    tools: undefined,
  });
});

test("parseArgs reads --tools as a comma-separated list", () => {
  const args = parseArgs(["init", "/repo", "--tools", "claude,cursor"]);
  assert.deepEqual(args.tools, ["claude", "cursor"]);
});

test("parseArgs trims whitespace and drops empty entries in --tools", () => {
  const args = parseArgs(["init", "/repo", "--tools", " claude, , cursor "]);
  assert.deepEqual(args.tools, ["claude", "cursor"]);
});

test("parseContextArgs reads the query, an optional targetDir, --limit and --include-framework", () => {
  const args = parseContextArgs(["rate limiting", "/repo", "--limit", "5", "--include-framework"]);
  assert.deepEqual(args, {
    query: "rate limiting",
    targetDir: "/repo",
    limit: 5,
    includeFramework: true,
  });
});

test("parseContextArgs defaults targetDir to '.', limit to 15, includeFramework to false", () => {
  const args = parseContextArgs(["rate limiting"]);
  assert.deepEqual(args, {
    query: "rate limiting",
    targetDir: ".",
    limit: 15,
    includeFramework: false,
  });
});

test("parseContextArgs leaves query undefined when no positional is given", () => {
  const args = parseContextArgs(["--include-framework"]);
  assert.equal(args.query, undefined);
});

test("parseContextArgs ignores a non-numeric or non-positive --limit value, keeping the default", () => {
  assert.equal(parseContextArgs(["q", "--limit", "not-a-number"]).limit, 15);
  assert.equal(parseContextArgs(["q", "--limit", "0"]).limit, 15);
  assert.equal(parseContextArgs(["q", "--limit", "-3"]).limit, 15);
});

test("main(['context']) with no query prints an error and exits 1", async () => {
  const exitCode = await main(["context"]);
  assert.equal(exitCode, 1);
});

test("main(['context', '--help']) prints usage and exits 0 without running a search", async () => {
  const exitCode = await main(["context", "--help"]);
  assert.equal(exitCode, 0);
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

test("main(['--version']) prints the CLI version and exits 0 without touching the filesystem", async () => {
  const printed: string[] = [];
  const originalLog = console.log;
  console.log = (message?: unknown) => {
    printed.push(String(message));
  };

  try {
    const exitCode = await main(["--version"]);
    assert.equal(exitCode, 0);
    assert.deepEqual(printed, [cliVersion()]);
  } finally {
    console.log = originalLog;
  }
});

test("cliVersion matches the version in this package's own package.json", async () => {
  const packageJsonPath = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "package.json");
  const pkg = JSON.parse(await readFile(packageJsonPath, "utf8")) as { version: string };
  assert.equal(cliVersion(), pkg.version);
});
