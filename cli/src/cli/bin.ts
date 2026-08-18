import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { runInit, type InitResult } from "../application/commands/init.js";
import { runAdd } from "../application/commands/add.js";
import { runSync } from "../application/commands/sync.js";
import { NodeFileSystem } from "../infrastructure/filesystem/NodeFileSystem.js";
import {
  AlreadyInstalledError,
  BrownfieldDetectedError,
  detectInstallationKind,
  ExistingClaudeMdError,
  GreenfieldDetectedError,
  InvalidFrameworkSourceError,
  NotInstalledError,
} from "../domain/installation.js";

const KNOWN_COMMANDS = new Set(["init", "add", "sync"]);

export interface ParsedArgs {
  /** "" means no recognized subcommand — dispatched via autodetection. */
  command: string;
  targetDir: string;
  sourceDir?: string;
  force: boolean;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const isKnownCommand = argv.length > 0 && KNOWN_COMMANDS.has(argv[0]);
  const command = isKnownCommand ? argv[0] : "";
  const rest = isKnownCommand ? argv.slice(1) : argv;

  let targetDir: string | undefined;
  let sourceDir: string | undefined;
  let force = false;

  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (arg === "--source") {
      sourceDir = rest[++i];
    } else if (arg === "--force") {
      force = true;
    } else if (!arg.startsWith("--") && targetDir === undefined) {
      targetDir = arg;
    }
  }

  return { command, targetDir: targetDir ?? ".", sourceDir, force };
}

/**
 * dist/cli/bin.js -> dist/framework-assets, bundled at build time by
 * scripts/bundle-framework-assets.mjs from this repository's own .kenovis/AI/.
 * Never re-reads ../AI at runtime — only this frozen, already-copied output.
 */
export function defaultFrameworkSourceDir(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  return join(here, "..", "framework-assets");
}

/**
 * This CLI's own version, from its package.json — the same number the bundled
 * Framework Release is stamped with at build time
 * (scripts/bundle-framework-assets.mjs), since CHANGELOG.md aligns the two.
 * Resolves identically from src/cli/ and dist/cli/, both one directory below
 * the package root.
 */
export function cliVersion(): string {
  const require = createRequire(import.meta.url);
  const pkg = require("../../package.json") as { version: string };
  return pkg.version;
}

function printUsage(): void {
  console.log(`kenovis <targetDir> [--source <frameworkSourceDir>] [--force]
kenovis init <targetDir> [--source <frameworkSourceDir>] [--force]
kenovis add <targetDir> [--source <frameworkSourceDir>] [--force]
kenovis sync <targetDir> [--source <frameworkSourceDir>] [--force]

The bare form (no subcommand) detects whether <targetDir> already holds a
real implementation and dispatches to init or add accordingly — it never
refuses.

init installs the Kenovis AI-OS Framework layer into an empty <targetDir>
under .kenovis/, and writes a CLAUDE.md stub at <targetDir>'s root. Refuses
on a target that already has real content unless --force is passed — use
\`add\` there instead. Never touches an existing README.md in <targetDir>
(DECISION-017).

add is init's counterpart for a <targetDir> that already holds a real
implementation to adopt. Refuses on an empty target unless --force is
passed — use \`init\` there instead.

Either way, the CLAUDE.md stub carries a first-session directive naming the
right command (init-project or adopt-project) so the next AI session runs it
automatically, no manual slash command required (DECISION-018). If a CLAUDE.md
already exists at <targetDir> and wasn't written by this CLI, both commands
refuse to overwrite it unless --force is passed.

Re-running init/add with --force over an existing .kenovis/ mirror-replaces
it (removes then reinstalls) — never a merge that could leave files retired
from an older Framework Release behind.

sync updates an existing <targetDir>/.kenovis/ to a newer Framework Release
in place. Only .kenovis/ and the CLAUDE.md stub are touched — Product-layer
files and your own code are never read or written. Review the change with
\`git diff\` before committing (RULE-INST-02). If a CLAUDE.md already exists
at <targetDir> and wasn't written by this CLI, sync refuses to overwrite it
unless --force is passed, same as init/add.

--source defaults to this package's own bundled Framework layer. Pass it
explicitly to install or sync a different or custom Framework layer instead.

--help/-h prints this message and exits, regardless of other arguments.
--version/-v prints this CLI's version — the same version as the Framework
Release it bundles. To see which Framework Release an existing Installation
currently tracks, read its \`.kenovis/.framework-version\`; init/add/sync all
print it too.`);
}

/**
 * How an absent Framework Release stamp reads on stdout. A bundle built before
 * the stamp existed, or a hand-assembled --source directory, genuinely does not
 * say which release it is — better said plainly than guessed at.
 */
const UNKNOWN_VERSION = "unknown";

function printInstallResult(result: InitResult): void {
  console.log(`Framework layer installed to ${result.frameworkInstalledTo}`);
  console.log(`Framework Release: ${result.frameworkVersion ?? UNKNOWN_VERSION}`);
  console.log(`CLAUDE.md stub written to ${result.claudeStubWrittenTo}`);
  console.log(
    result.targetReadmeUntouched
      ? "Existing README.md left untouched."
      : "No README.md found — none was created; that stays your decision.",
  );

  const command = result.detectedKind === "brownfield" ? "adopt-project" : "init-project";
  const evidence =
    result.detectionEvidence.length > 0 ? ` (${result.detectionEvidence.join(", ")})` : "";
  console.log(
    `\nDetected ${result.detectedKind}${evidence}. The next AI session in this repository ` +
      `will run ${command} automatically — no manual slash command needed.`,
  );
}

async function resolveFrameworkSourceDir(
  fs: NodeFileSystem,
  sourceDir: string | undefined,
): Promise<string | null> {
  const frameworkSourceDir = resolve(sourceDir ?? defaultFrameworkSourceDir());

  if (!sourceDir && !(await fs.exists(frameworkSourceDir))) {
    console.error(
      `Error: bundled Framework layer assets not found at ${frameworkSourceDir}.\n` +
        "Run `npm run build` first (it bundles them), or pass --source explicitly.",
    );
    return null;
  }

  return frameworkSourceDir;
}

async function runInitCommand(fs: NodeFileSystem, args: ParsedArgs): Promise<number> {
  const frameworkSourceDir = await resolveFrameworkSourceDir(fs, args.sourceDir);
  if (frameworkSourceDir === null) return 1;

  try {
    const result = await runInit(fs, {
      targetDir: resolve(args.targetDir),
      frameworkSourceDir,
      force: args.force,
      invokedAs: "init",
    });
    printInstallResult(result);
    return 0;
  } catch (error) {
    if (
      error instanceof AlreadyInstalledError ||
      error instanceof InvalidFrameworkSourceError ||
      error instanceof BrownfieldDetectedError ||
      error instanceof ExistingClaudeMdError
    ) {
      console.error(`Error: ${error.message}`);
      return 1;
    }
    throw error;
  }
}

async function runAddCommand(fs: NodeFileSystem, args: ParsedArgs): Promise<number> {
  const frameworkSourceDir = await resolveFrameworkSourceDir(fs, args.sourceDir);
  if (frameworkSourceDir === null) return 1;

  try {
    const result = await runAdd(fs, {
      targetDir: resolve(args.targetDir),
      frameworkSourceDir,
      force: args.force,
    });
    printInstallResult(result);
    return 0;
  } catch (error) {
    if (
      error instanceof AlreadyInstalledError ||
      error instanceof InvalidFrameworkSourceError ||
      error instanceof GreenfieldDetectedError ||
      error instanceof ExistingClaudeMdError
    ) {
      console.error(`Error: ${error.message}`);
      return 1;
    }
    throw error;
  }
}

async function runAutoCommand(fs: NodeFileSystem, args: ParsedArgs): Promise<number> {
  const frameworkSourceDir = await resolveFrameworkSourceDir(fs, args.sourceDir);
  if (frameworkSourceDir === null) return 1;

  const targetDir = resolve(args.targetDir);
  const targetDirEntries = (await fs.exists(targetDir)) ? await fs.listDir(targetDir) : [];
  const detection = detectInstallationKind(targetDirEntries);

  try {
    const result =
      detection.kind === "brownfield"
        ? await runAdd(fs, { targetDir, frameworkSourceDir, force: args.force })
        : await runInit(fs, { targetDir, frameworkSourceDir, force: args.force, invokedAs: "init" });
    printInstallResult(result);
    return 0;
  } catch (error) {
    if (
      error instanceof AlreadyInstalledError ||
      error instanceof InvalidFrameworkSourceError ||
      error instanceof ExistingClaudeMdError
    ) {
      console.error(`Error: ${error.message}`);
      return 1;
    }
    throw error;
  }
}

async function runSyncCommand(fs: NodeFileSystem, args: ParsedArgs): Promise<number> {
  const frameworkSourceDir = await resolveFrameworkSourceDir(fs, args.sourceDir);
  if (frameworkSourceDir === null) return 1;

  try {
    const result = await runSync(fs, {
      targetDir: resolve(args.targetDir),
      frameworkSourceDir,
      force: args.force,
    });

    console.log(`Framework layer synced to ${result.frameworkSyncedTo}`);
    console.log(
      `Framework Release: ${result.previousFrameworkVersion ?? UNKNOWN_VERSION} -> ` +
        `${result.frameworkVersion ?? UNKNOWN_VERSION}` +
        (result.previousFrameworkVersion !== null &&
        result.previousFrameworkVersion === result.frameworkVersion
          ? " (already up to date)"
          : ""),
    );
    console.log(`CLAUDE.md stub rewritten at ${result.claudeStubWrittenTo}`);
    if (result.setupStillPending) {
      console.log(
        "\nSetup is still pending — kept. The next AI session in this repository " +
          "will run init-project/adopt-project automatically, as it would have before this sync.",
      );
    }
    console.log("\nReview the change with `git diff` before committing.");
    return 0;
  } catch (error) {
    if (
      error instanceof NotInstalledError ||
      error instanceof InvalidFrameworkSourceError ||
      error instanceof ExistingClaudeMdError
    ) {
      console.error(`Error: ${error.message}`);
      return 1;
    }
    throw error;
  }
}

export async function main(argv: string[]): Promise<number> {
  // Checked before any dispatch, same as --help: an unrecognized flag would
  // otherwise fall through to the bare autodetect path and run a real install
  // against cwd (company-os/AI/memory/learnings.md Learning-005).
  if (argv.includes("--help") || argv.includes("-h")) {
    printUsage();
    return 0;
  }

  if (argv.includes("--version") || argv.includes("-v")) {
    console.log(cliVersion());
    return 0;
  }

  const args = parseArgs(argv);
  const fs = new NodeFileSystem();

  if (args.command === "init") return runInitCommand(fs, args);
  if (args.command === "add") return runAddCommand(fs, args);
  if (args.command === "sync") return runSyncCommand(fs, args);
  if (args.command === "") return runAutoCommand(fs, args);

  printUsage();
  return 1;
}
