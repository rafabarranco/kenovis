import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { runInit } from "../application/commands/init.js";
import { runSync } from "../application/commands/sync.js";
import { NodeFileSystem } from "../infrastructure/filesystem/NodeFileSystem.js";
import {
  AlreadyInstalledError,
  InvalidFrameworkSourceError,
  NotInstalledError,
} from "../domain/installation.js";

export interface ParsedArgs {
  command: string;
  targetDir: string;
  sourceDir?: string;
  force: boolean;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const [command, ...rest] = argv;
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

  return { command: command ?? "", targetDir: targetDir ?? ".", sourceDir, force };
}

/**
 * dist/cli/bin.js -> dist/framework-assets, bundled at build time by
 * scripts/bundle-framework-assets.mjs from this repository's own AI/.
 * Never re-reads ../AI at runtime — only this frozen, already-copied output.
 */
export function defaultFrameworkSourceDir(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  return join(here, "..", "framework-assets");
}

function printUsage(): void {
  console.log(`kenovis init <targetDir> [--source <frameworkSourceDir>] [--force]
kenovis sync <targetDir> [--source <frameworkSourceDir>]

init installs the Kenovis AI-OS Framework layer into <targetDir> under
.kenovis/, and writes a CLAUDE.md stub at <targetDir>'s root. Never touches
an existing README.md in <targetDir> (DECISION-017).

sync updates an existing <targetDir>/.kenovis/ to a newer Framework Release
in place. Only .kenovis/ and the CLAUDE.md stub are touched — Product-layer
files and your own code are never read or written. Review the change with
\`git diff\` before committing (RULE-INST-02).

--source defaults to this package's own bundled Framework layer. Pass it
explicitly to install or sync a different or custom Framework layer instead.`);
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
    });

    console.log(`Framework layer installed to ${result.frameworkInstalledTo}`);
    console.log(`CLAUDE.md stub written to ${result.claudeStubWrittenTo}`);
    console.log(
      result.targetReadmeUntouched
        ? "Existing README.md left untouched."
        : "No README.md found — none was created; that stays your decision.",
    );
    if (result.detectedKind === "brownfield") {
      console.log(
        `\nFound existing content here: ${result.detectionEvidence.join(", ")}\n` +
          "Next: run /adopt-project to reconstruct context from this existing implementation.",
      );
    } else {
      console.log(
        "\nNo existing implementation detected here.\n" +
          "Next: run /init-project to define this product from scratch.",
      );
    }
    return 0;
  } catch (error) {
    if (error instanceof AlreadyInstalledError || error instanceof InvalidFrameworkSourceError) {
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
    });

    console.log(`Framework layer synced to ${result.frameworkSyncedTo}`);
    console.log(`CLAUDE.md stub rewritten at ${result.claudeStubWrittenTo}`);
    console.log("\nReview the change with `git diff` before committing.");
    return 0;
  } catch (error) {
    if (error instanceof NotInstalledError || error instanceof InvalidFrameworkSourceError) {
      console.error(`Error: ${error.message}`);
      return 1;
    }
    throw error;
  }
}

export async function main(argv: string[]): Promise<number> {
  const args = parseArgs(argv);
  const fs = new NodeFileSystem();

  if (args.command === "init") return runInitCommand(fs, args);
  if (args.command === "sync") return runSyncCommand(fs, args);

  printUsage();
  return 1;
}
