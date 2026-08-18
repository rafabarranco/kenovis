#!/usr/bin/env node
// Build-time only: assembles the CLI's default --source directory at
// dist/framework-assets/ by copying this repository's own framework/ plus the
// hand-authored customer-facing README from assets/framework/README.md.
//
// Since DECISION-039 this repository's Framework-layer source lives at
// framework/ (agents/, commands/, policies/, templates/, workflows/,
// SYSTEM.md) — a directory of its own, kept apart from company-os/AI/memory/ (Product
// layer, stays at the repository root) so no directory mixes layers.
// .kenovis/ in this repository is generated, gitignored, never hand-edited:
// after bundling, this script also mirrors dist/framework-assets/ into
// <repoRoot>/.kenovis/ as a local, inspectable copy of what a customer
// Installation would receive — never committed, never required for a session
// to bootstrap (root CLAUDE.md reads framework/SYSTEM.md directly).
//
// This script reaches outside cli/'s own package boundary (reads ../framework
// and writes ../.kenovis/) on purpose, and only at build time in this
// monorepo checkout. The published npm package ships the frozen
// dist/framework-assets/ output — it never re-reads ../framework at install
// time on a customer's machine, and cannot: that path does not exist outside
// this repository.
//
// Also renders each `framework/tool-adapters/<id>/` entry that declares a
// `commandsDir` in its `adapter.json` into `dist/framework-assets/tool-adapters/<id>/commands/`
// — one file per `framework/commands/*.md`, rendered from that adapter's own
// `command-wrapper.md.tmpl`. Generic across adapters and across commands: a
// new adapter is a new directory (this script never names "claude" or any
// other tool id), and a new command is picked up by listing `framework/commands/`
// rather than a maintained name list. See company-os/DECISIONS.md DECISION-046,
// company-os/PRODUCT/ROADMAP.md item 45.
//
// See company-os/PRODUCT/ROADMAP.md Phase 0 item 3, item 43, and company-os/DECISIONS.md
// DECISION-017/DECISION-020/DECISION-039.

import { cp, mkdir, rm, readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const cliDir = dirname(scriptDir); // cli/
const repoRoot = dirname(cliDir);
const sourceFrameworkDir = join(repoRoot, "framework");
const sourceCommandsDir = join(sourceFrameworkDir, "commands");
const sourceToolAdaptersDir = join(sourceFrameworkDir, "tool-adapters");
const authoredReadme = join(cliDir, "assets", "framework", "README.md");
const packageJsonPath = join(cliDir, "package.json");
const outDir = join(cliDir, "dist", "framework-assets");
const localMirrorDir = join(repoRoot, ".kenovis");
const FRAMEWORK_VERSION_FILENAME = ".framework-version";

/** First non-blank line under a command file's own "# Purpose" heading. */
function extractPurpose(commandFileContents) {
  const lines = commandFileContents.split("\n");
  const headingIndex = lines.findIndex((line) => line.trim() === "# Purpose");
  if (headingIndex === -1) return "";
  for (let i = headingIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length > 0) return line;
  }
  return "";
}

function renderTemplate(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key) => values[key] ?? "");
}

/**
 * Renders every `framework/tool-adapters/<id>/` whose `adapter.json` declares
 * a `commandsDir` into `outDir/tool-adapters/<id>/commands/<name>.md`, one
 * file per `framework/commands/*.md`. Never branches on a tool's identity —
 * `commandsDir`/`command-wrapper.md.tmpl` are the adapter's own data.
 */
async function renderToolAdapters() {
  let adapterIds;
  try {
    adapterIds = await readdir(sourceToolAdaptersDir);
  } catch {
    return; // No adapters authored yet.
  }

  const commandFiles = (await readdir(sourceCommandsDir)).filter((name) => name.endsWith(".md"));

  for (const id of adapterIds) {
    const adapterDir = join(sourceToolAdaptersDir, id);
    const manifest = JSON.parse(await readFile(join(adapterDir, "adapter.json"), "utf8"));
    if (!manifest.commandsDir) continue;

    const template = await readFile(join(adapterDir, "command-wrapper.md.tmpl"), "utf8");
    const destCommandsDir = join(outDir, "tool-adapters", id, "commands");
    await mkdir(destCommandsDir, { recursive: true });

    for (const fileName of commandFiles) {
      const name = fileName.replace(/\.md$/, "");
      const description = extractPurpose(await readFile(join(sourceCommandsDir, fileName), "utf8"));
      const rendered = renderTemplate(template, { name, description });
      await writeFile(join(destCommandsDir, `${name}.md`), rendered, "utf8");
    }

    // The manifest itself ships too — a customer install reads `commandsDir`
    // from it rather than the CLI hardcoding a per-adapter destination.
    await cp(join(adapterDir, "adapter.json"), join(outDir, "tool-adapters", id, "adapter.json"));

    console.log(`Rendered ${commandFiles.length} command wrapper(s) for tool adapter "${id}"`);
  }
}

async function main() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(join(outDir, "AI"), { recursive: true });

  const entries = await readdir(sourceFrameworkDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "tool-adapters") continue; // Handled by renderToolAdapters, not mirrored verbatim.
    await cp(join(sourceFrameworkDir, entry.name), join(outDir, "AI", entry.name), {
      recursive: true,
    });
  }

  await renderToolAdapters();

  await cp(authoredReadme, join(outDir, "README.md"));

  // Stamp the bundle with the Framework Release it is. Because it ships inside
  // the bundle, `init`/`add`/`sync`'s mirror-replace installs and updates it
  // for free — the CLI only ever reads it back, never maintains a second copy
  // of the same fact (see INSTALL_TIME_OWNED_ENTRIES' note in
  // src/domain/installation.ts). The version is the npm package's own, which
  // CHANGELOG.md already aligns the Framework Release to.
  const { version } = JSON.parse(await readFile(packageJsonPath, "utf8"));
  await writeFile(join(outDir, FRAMEWORK_VERSION_FILENAME), `${version}\n`, "utf8");

  console.log(`Bundled Framework layer assets (version ${version}) into ${outDir}`);

  // Local-only mirror: what this repository's own .kenovis/ becomes since
  // DECISION-039 — generated, gitignored, inspectable, never a second source.
  await rm(localMirrorDir, { recursive: true, force: true });
  await mkdir(localMirrorDir, { recursive: true });
  await cp(outDir, localMirrorDir, { recursive: true });

  console.log(`Mirrored into ${localMirrorDir} (gitignored, local-only)`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
