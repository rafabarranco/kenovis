#!/usr/bin/env node
// Build-time only: assembles the CLI's default --source directory at
// dist/framework-assets/ by copying this repository's own .kenovis/AI/ plus the
// hand-authored customer-facing README from assets/framework/README.md.
//
// Since DECISION-020 this repository stores its own Framework layer exactly the
// way every Installation gets it — under .kenovis/AI/ — so there is nothing to
// exclude here: AI/memory/ is Product layer and stays at the repository root,
// outside .kenovis/.
//
// This script reaches outside cli/'s own package boundary (reads ../.kenovis/AI)
// on purpose, and only at build time in this monorepo checkout. The published npm
// package ships the frozen dist/framework-assets/ output — it never re-reads
// ../.kenovis/AI at install time on a customer's machine, and cannot: that path
// does not exist outside this repository.
//
// See PRODUCT/ROADMAP.md Phase 0 item 3 and DECISIONS.md DECISION-017/DECISION-020.

import { cp, mkdir, rm, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const cliDir = dirname(scriptDir); // cli/
const repoRoot = dirname(cliDir);
const sourceAiDir = join(repoRoot, ".kenovis", "AI");
const authoredReadme = join(cliDir, "assets", "framework", "README.md");
const outDir = join(cliDir, "dist", "framework-assets");

async function main() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(join(outDir, "AI"), { recursive: true });

  const entries = await readdir(sourceAiDir, { withFileTypes: true });
  for (const entry of entries) {
    await cp(join(sourceAiDir, entry.name), join(outDir, "AI", entry.name), {
      recursive: true,
    });
  }

  await cp(authoredReadme, join(outDir, "README.md"));

  console.log(`Bundled Framework layer assets into ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
