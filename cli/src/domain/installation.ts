/**
 * Installation domain concepts.
 *
 * See company-os/DECISIONS.md DECISION-016 (no framework-mandated directory name for the
 * customer's own code) and DECISION-017 (Framework layer packaging: `.kenovis/`
 * hidden directory) — this module encodes the rules those decisions established,
 * so they are enforced in code, not just described in docs.
 */

import { createHash } from "node:crypto";

export const FRAMEWORK_DIR_NAME = ".kenovis";
export const CLAUDE_STUB_FILENAME = "CLAUDE.md";
export const TARGET_README_FILENAME = "README.md";
export const SETUP_PENDING_FILENAME = ".setup-pending";
export const CLAUDE_MD_HASH_FILENAME = ".claude-md.sha256";
export const FRAMEWORK_VERSION_FILENAME = ".framework-version";
export const TOOL_ADAPTERS_DIRNAME = "tool-adapters";
export const TOOL_ADAPTER_MANIFEST_FILENAME = "adapter.json";
export const TOOL_ADAPTER_COMMANDS_DIRNAME = "commands";
export const TOOLS_MARKER_FILENAME = ".tools";

/**
 * Selected when `init`/`add` receive no `--tools` flag. Matches DECISION-010
 * (Claude Code named primary) and today's actual behavior — every prior
 * Installation already got the CLAUDE.md stub unconditionally, so this
 * changes nothing for an existing customer while completing what
 * `company-os/ENGINEERING/ARCHITECTURE.md` Hard Rules already claimed shipped.
 * See DECISION-046, `PRODUCT/ROADMAP.md` item 45.
 */
export const DEFAULT_TOOLS: readonly string[] = ["claude"];

/**
 * Entries that do not count as evidence of a real, pre-existing implementation:
 * either trivial (nothing to adopt) or written by this CLI itself (so a re-run,
 * e.g. with --force, does not mistake its own prior install for the customer's code).
 */
const NON_EVIDENCE_ENTRIES = new Set([
  ".git",
  ".gitignore",
  ".gitattributes",
  ".DS_Store",
  "README.md",
  "LICENSE",
  "LICENSE.md",
  FRAMEWORK_DIR_NAME,
  CLAUDE_STUB_FILENAME,
  ".claude",
  "company-os",
]);

export type InstallationKind = "greenfield" | "brownfield";

export interface DetectionResult {
  kind: InstallationKind;
  /** Target directory entries that count as evidence, empty when greenfield. */
  evidence: string[];
}

/**
 * Distinguishes an empty/near-empty target repository (greenfield — no real
 * implementation to adopt) from one that already holds real code (brownfield).
 * Filesystem-only: never inspects file contents or executes anything found in
 * the target repository (company-os/ENGINEERING/ARCHITECTURE.md Hard Rules).
 */
export function detectInstallationKind(targetDirEntries: string[]): DetectionResult {
  const evidence = targetDirEntries
    .filter((entry) => !NON_EVIDENCE_ENTRIES.has(entry))
    .sort();

  return {
    kind: evidence.length > 0 ? "brownfield" : "greenfield",
    evidence,
  };
}

export class AlreadyInstalledError extends Error {
  constructor(public readonly frameworkDir: string) {
    super(
      `${frameworkDir} already exists. Re-run with --force to overwrite the Framework layer, ` +
        `or use the sync command to update it in place.`,
    );
    this.name = "AlreadyInstalledError";
  }
}

export class NotInstalledError extends Error {
  constructor(public readonly frameworkDir: string) {
    super(`${frameworkDir} does not exist. Run \`kenovis init\` first.`);
    this.name = "NotInstalledError";
  }
}

/**
 * Thrown when `kenovis init` targets a directory that already holds a real,
 * pre-existing implementation. `init` assumes greenfield; a brownfield
 * target means the customer wants `kenovis add` (the adopt-project path)
 * instead, unless they explicitly pass --force. See DECISION-018.
 */
export class BrownfieldDetectedError extends Error {
  constructor(public readonly evidence: string[]) {
    super(
      `This directory already has real content (${evidence.join(", ")}) — ` +
        `looks like an existing product, not an empty one. Run \`kenovis add\` ` +
        `instead, or re-run with --force to install anyway.`,
    );
    this.name = "BrownfieldDetectedError";
  }
}

/**
 * Thrown when `kenovis add` targets a directory with no real pre-existing
 * implementation to adopt. `add` assumes brownfield; an empty target means
 * the customer wants `kenovis init` (the init-project path) instead, unless
 * they explicitly pass --force. See DECISION-018.
 */
export class GreenfieldDetectedError extends Error {
  constructor() {
    super(
      "This directory has no existing implementation to adopt. Run `kenovis init` " +
        "instead, or re-run with --force to install anyway.",
    );
    this.name = "GreenfieldDetectedError";
  }
}

/**
 * The exact first line of every CLAUDE.md stub this CLI has ever written
 * (pending or steady-state — see `claudeStubContent`). Used to tell "a
 * Kenovis-managed stub, safe to overwrite" apart from a customer's own
 * pre-existing CLAUDE.md, which install must never silently discard: the
 * target segment (company-os/COMPANY_OS.md — developers "already fluent in agentic
 * tooling") is likely to already have one before adopting Kenovis.
 */
const CLAUDE_STUB_MARKER = "# Kenovis AI-OS";

export function isKenovisManagedClaudeStub(existingClaudeMdContent: string): boolean {
  return existingClaudeMdContent.startsWith(CLAUDE_STUB_MARKER);
}

/**
 * Marks the boundary in a coexistence CLAUDE.md between a customer's own
 * preserved content (above) and the Kenovis-managed block this CLI wrote
 * (below, starting with `CLAUDE_STUB_MARKER`) — see `buildCoexistingClaudeMdContent`
 * and `resolveClaudeMdWrite`. Distinct from `CLAUDE_STUB_MARKER`: that line
 * marks where the Kenovis block itself starts; this one marks that a split
 * happened at all, so a plain stub (starts on line 1, no delimiter anywhere)
 * is never mistaken for a coexistence file with an empty preserved section.
 */
const COEXISTENCE_DELIMITER =
  "<!-- kenovis:end-of-your-content, kenovis-managed block below -->";

export interface CoexistingClaudeMdParts {
  /** The customer's own content, exactly as it read before this CLI ever touched the file. */
  preserved: string;
  /** The Kenovis-managed block: everything from `CLAUDE_STUB_MARKER` onward. */
  kenovisBlock: string;
}

/**
 * Splits a CLAUDE.md this CLI may have previously written in coexistence
 * form back into the two parts `buildCoexistingClaudeMdContent` joined.
 * Returns `null` when `COEXISTENCE_DELIMITER` isn't present at all — either
 * a plain Kenovis-only stub (no split ever happened) or a foreign file this
 * CLI has never touched.
 */
export function splitCoexistingClaudeMd(content: string): CoexistingClaudeMdParts | null {
  const delimiterIndex = content.indexOf(COEXISTENCE_DELIMITER);
  if (delimiterIndex === -1) return null;

  return {
    preserved: content.slice(0, delimiterIndex).replace(/\n+$/, ""),
    kenovisBlock: content.slice(delimiterIndex + COEXISTENCE_DELIMITER.length).replace(/^\n+/, ""),
  };
}

/**
 * Inverse of `splitCoexistingClaudeMd`: combines a customer's preserved
 * content with a Kenovis stub into one coexistence CLAUDE.md — the
 * customer's own content first, the Kenovis block appended below it, since
 * this CLI is a guest appending to a file it did not create, never the
 * reverse. Round-trips through `splitCoexistingClaudeMd` byte-stable on
 * repeated calls (both sides are trimmed of the boundary's own blank lines
 * before rejoining), so a second sync never grows stray whitespace.
 */
export function buildCoexistingClaudeMdContent(
  preservedContent: string,
  kenovisStubContent: string,
): string {
  return `${preservedContent.replace(/\n+$/, "")}\n\n${COEXISTENCE_DELIMITER}\n\n${kenovisStubContent}`;
}

/**
 * The exact first line of every tool-adapter command wrapper this CLI has
 * ever written (`command-wrapper.md.tmpl`, rendered at bundle time — see
 * `scripts/bundle-framework-assets.mjs`). Same purpose as `CLAUDE_STUB_MARKER`,
 * scoped to a single generated file rather than the whole install: a customer
 * may already have their own file at the same path inside a shared directory
 * like `.claude/commands/` (unlike `.kenovis/`, not a namespace Kenovis owns
 * outright), so each file is checked and skipped individually rather than the
 * directory being mirror-replaced wholesale. See DECISION-046.
 */
const COMMAND_WRAPPER_MARKER = "<!-- kenovis:managed-command-wrapper -->";

export function isKenovisManagedCommandWrapper(existingContent: string): boolean {
  return existingContent.startsWith(COMMAND_WRAPPER_MARKER);
}

/**
 * Hex-encoded SHA-256 of a CLAUDE.md stub's exact content, recorded to
 * `${FRAMEWORK_DIR_NAME}/${CLAUDE_MD_HASH_FILENAME}` every time this CLI
 * writes the stub. Comparing against it on the next run answers "is this
 * file byte-for-byte what we last wrote" — a stricter question than
 * `isKenovisManagedClaudeStub`'s "does it start with our marker line", which
 * cannot see content appended below an otherwise-untouched stub. See
 * company-os/AI/memory/learnings.md Learning-007.
 */
export function hashClaudeMdContent(content: string): string {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

/**
 * Whether an existing root CLAUDE.md is safe to overwrite without discarding
 * something the customer wrote.
 *
 * `recordedHash` is the content of this Installation's
 * `${CLAUDE_MD_HASH_FILENAME}` sidecar, if any: present, it means a prior
 * install/sync by this same Installation recorded exactly what it wrote, so
 * an exact hash match is both necessary and sufficient — it also correctly
 * catches content appended below the marker line, which a prefix check
 * cannot. `null` means no sidecar was ever recorded (an Installation created
 * before this check existed, or a CLAUDE.md that predates Kenovis entirely)
 * — falls back to the older, weaker `isKenovisManagedClaudeStub` prefix
 * check so upgrading from a pre-fix Installation does not spuriously refuse.
 */
export function isClaudeMdSafeToOverwrite(
  existingClaudeMdContent: string,
  recordedHash: string | null,
): boolean {
  if (recordedHash !== null) {
    return hashClaudeMdContent(existingClaudeMdContent) === recordedHash;
  }
  return isKenovisManagedClaudeStub(existingClaudeMdContent);
}

/**
 * Thrown only when the Kenovis-managed block of a coexistence CLAUDE.md
 * (per `resolveClaudeMdWrite`/`splitCoexistingClaudeMd`) was hand-edited
 * since this CLI last wrote it — the one case still worth refusing on,
 * since a silent re-merge would erase an edit the customer made on purpose
 * inside content they had no reason to think was theirs to keep. Every
 * other "existing CLAUDE.md" case — a plain foreign file, or one already in
 * coexistence form with its Kenovis block untouched — no longer refuses at
 * all: `resolveClaudeMdWrite` coexists with it instead of aborting the
 * whole install/sync over it (see PRODUCT/ROADMAP.md OF-94). Bypassable
 * with --force, same escape hatch as AlreadyInstalledError/
 * BrownfieldDetectedError/GreenfieldDetectedError.
 */
export class ExistingClaudeMdError extends Error {
  constructor(public readonly claudeMdPath: string) {
    super(
      `${claudeMdPath} has a Kenovis-managed section that was edited since it was last ` +
        `written — refusing to silently overwrite your edit. Restore that section, or ` +
        `re-run with --force to overwrite the whole file anyway.`,
    );
    this.name = "ExistingClaudeMdError";
  }
}

/**
 * What this run did with the target's root CLAUDE.md — reported back so the
 * non-interactive CLI can tell the customer what happened, since it never
 * asks first. `"written"` covers both a fresh install (no prior file) and a
 * plain overwrite (the existing file was already exactly a Kenovis-managed
 * stub, or --force was passed) — either way, the file that now exists is a
 * pure Kenovis stub with nothing else in it. `"coexisted"` means a
 * customer's own content was preserved and the Kenovis block merged in
 * alongside it, per `resolveClaudeMdWrite`.
 */
export type ClaudeMdAction = "written" | "coexisted";

export type ClaudeMdWriteResolution =
  | { action: "written" | "coexisted"; content: string; hashedBlock: string }
  | { action: "refused" };

/**
 * Decides what a run should do with an *existing* root CLAUDE.md, given its
 * current content, the hash sidecar recorded by the prior install/sync (if
 * any), and the fresh stub content this run wants to write. Callers only
 * reach this when the file exists and `--force` was not passed — a missing
 * file or a `--force` run always just writes `newStubContent` directly, no
 * resolution needed (see `runInit`/`runSync`).
 *
 * Three outcomes:
 * - The existing file is already exactly a Kenovis-managed stub
 *   (`isClaudeMdSafeToOverwrite`): overwrite it with the fresh stub,
 *   `action: "written"` — unchanged from this CLI's original behaviour.
 * - The existing file is a coexistence file this CLI previously wrote
 *   (`splitCoexistingClaudeMd` finds the boundary, and the Kenovis block on
 *   the far side of it still matches `recordedHash`): carry the customer's
 *   preserved content forward untouched and replace only the Kenovis block,
 *   `action: "coexisted"`.
 * - Anything else: a foreign file this CLI has never seen (no boundary
 *   found at all), or a coexistence file whose Kenovis block was hand-edited
 *   since it was written (boundary found, but the block no longer matches
 *   `recordedHash`). The first case coexists with it now rather than
 *   aborting the whole install/sync the way this CLI used to (OF-94) — the
 *   customer's content is never discarded either way, only whether it ends
 *   up merged automatically or the run refuses so a human looks first
 *   depends on whether this CLI has a reason to trust it already reconciled
 *   this exact file before. The second case still refuses
 *   (`action: "refused"`, caller throws `ExistingClaudeMdError`): the
 *   customer edited content inside the region this CLI owns, and only a
 *   human can say whether that edit or the incoming stub should win.
 */
export function resolveClaudeMdWrite(
  existingContent: string,
  recordedHash: string | null,
  newStubContent: string,
): ClaudeMdWriteResolution {
  if (isClaudeMdSafeToOverwrite(existingContent, recordedHash)) {
    return {
      action: "written",
      content: newStubContent,
      hashedBlock: hashClaudeMdContent(newStubContent),
    };
  }

  const split = splitCoexistingClaudeMd(existingContent);
  if (split === null) {
    return {
      action: "coexisted",
      content: buildCoexistingClaudeMdContent(existingContent, newStubContent),
      hashedBlock: hashClaudeMdContent(newStubContent),
    };
  }

  if (!isClaudeMdSafeToOverwrite(split.kenovisBlock, recordedHash)) {
    return { action: "refused" };
  }

  return {
    action: "coexisted",
    content: buildCoexistingClaudeMdContent(split.preserved, newStubContent),
    hashedBlock: hashClaudeMdContent(newStubContent),
  };
}

/**
 * The AI command a pending first session must run, keyed by the
 * installation kind the CLI already detected at install time — embedded so
 * no agent has to re-detect it. See DECISION-018.
 */
export function setupPendingContent(kind: InstallationKind): string {
  return kind === "brownfield" ? "adopt-project" : "init-project";
}

/**
 * Inverse of `setupPendingContent`: recovers the installation kind recorded in
 * an existing `.setup-pending` marker, so `sync` can re-emit the pending stub
 * for the same command install time already chose. Returns null for anything
 * this CLI did not write — the caller must then re-detect rather than guess.
 */
export function installationKindFromSetupPending(
  markerContent: string,
): InstallationKind | null {
  const trimmed = markerContent.trim();
  if (trimmed === setupPendingContent("brownfield")) return "brownfield";
  if (trimmed === setupPendingContent("greenfield")) return "greenfield";
  return null;
}

/**
 * Files this CLI writes *inside* `${FRAMEWORK_DIR_NAME}/` that the Framework
 * bundle itself never ships. `sync` mirror-replaces that directory
 * (removeTree + copyTree), so every entry here is destroyed on each sync
 * unless it is explicitly handled — and silently, since nothing fails.
 *
 * Each entry therefore needs one of two rules, stated here rather than left
 * as an accident of statement order in runSync (see company-os/AI/memory/learnings.md
 * Learning-010, where `.setup-pending` had neither and `.claude-md.sha256`
 * survived only because sync happened to rewrite it afterwards):
 *
 * - `preserved`: read before the mirror, re-established after it.
 * - `rewritten`: recomputed from what this run wrote, after the mirror.
 *
 * Any future install-time-owned file must be added to one of these lists.
 *
 * `${FRAMEWORK_VERSION_FILENAME}` deliberately does NOT belong here: the
 * Framework bundle ships it (scripts/bundle-framework-assets.mjs writes it at
 * build time), so the mirror-replace installs and updates it by construction.
 * Adding it would create exactly the parallel bookkeeping Learning-010 and
 * Learning-011 identify as this codebase's recurring defect — one mechanism
 * writing state another silently invalidates.
 */
export const INSTALL_TIME_OWNED_ENTRIES = {
  preserved: [SETUP_PENDING_FILENAME, TOOLS_MARKER_FILENAME],
  rewritten: [CLAUDE_MD_HASH_FILENAME],
} as const;

/**
 * The tool ids selected at install time (DECISION-046), one per line. Written
 * to `${FRAMEWORK_DIR_NAME}/${TOOLS_MARKER_FILENAME}` so `sync` can re-apply
 * the same selection without requiring `--tools` again on every run — the
 * same reason `.setup-pending` exists (see `INSTALL_TIME_OWNED_ENTRIES`).
 */
export function toolsMarkerContent(tools: readonly string[]): string {
  return `${tools.join("\n")}\n`;
}

/**
 * Inverse of `toolsMarkerContent`. Returns `null` for a blank/missing marker
 * (an Installation that predates this mechanism) so the caller falls back to
 * `DEFAULT_TOOLS` rather than installing nothing.
 */
export function parseToolsMarker(markerContent: string): string[] | null {
  const tools = markerContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  return tools.length > 0 ? tools : null;
}

/**
 * The Framework Release an Installation currently tracks
 * (company-os/DOMAIN/DOMAIN_MODEL.md → Installation, "framework version installed").
 *
 * The value is whatever `${FRAMEWORK_VERSION_FILENAME}` holds, trimmed. It is
 * never derived from the running CLI's own version: an Installation's
 * `.kenovis/` was written by whichever Framework bundle it was last synced
 * from, which is not necessarily the one running now — the same distinction
 * `isClaudeMdSafeToOverwrite` already draws between "what we'd write today"
 * and "what was actually left there" (see company-os/AI/memory/learnings.md Learning-008).
 *
 * Returns null for a missing or blank stamp — a bundle predating this
 * mechanism, or a hand-assembled `--source` directory. Unknown is reported as
 * unknown; it is never guessed at.
 */
export function parseFrameworkVersion(stampContent: string | null): string | null {
  if (stampContent === null) return null;
  const trimmed = stampContent.trim();
  return trimmed === "" ? null : trimmed;
}

/**
 * Top-level entries a legitimate Framework-layer source directory may
 * contain, mirroring scripts/bundle-framework-assets.mjs's own output shape
 * (AI/ minus memory/, plus README.md) — the one shape Kenovis itself defines
 * for a Framework bundle. This is deliberately an allowlist of that known
 * shape, not a blocklist of Product-layer-looking names: --source is a local,
 * operator-supplied path (the bundled package assets, or a custom directory
 * for local testing per cli/README.md), never the target repository — which
 * may legitimately contain files or directories with any name at all
 * (DECISION-016), so no name-based rule may ever be applied to the target.
 */
const FRAMEWORK_SOURCE_ALLOWED_ENTRIES = new Set([
  "AI",
  TARGET_README_FILENAME,
  TOOL_ADAPTERS_DIRNAME,
]);

export class InvalidFrameworkSourceError extends Error {
  constructor(
    public readonly sourceDir: string,
    public readonly unexpectedEntries: string[],
  ) {
    super(
      `${sourceDir} does not look like a Framework-layer bundle: found ` +
        `${unexpectedEntries.join(", ")} at its top level. A Framework source ` +
        `directory must contain only AI/, README.md and tool-adapters/ (see ` +
        `scripts/bundle-framework-assets.mjs). Pointing --source at something wider ` +
        `— e.g. a full product repository — would copy its Product-layer content ` +
        `into the target's ${FRAMEWORK_DIR_NAME}/.`,
    );
    this.name = "InvalidFrameworkSourceError";
  }
}

/**
 * Entries in a --source directory that fall outside the known Framework
 * bundle shape. Dotfiles/dot-directories (.git, .DS_Store, .github, ...) are
 * ignored — harmless local artifacts, never Product-layer content.
 */
export function invalidFrameworkSourceEntries(sourceDirEntries: string[]): string[] {
  return sourceDirEntries
    .filter((entry) => !entry.startsWith(".") && !FRAMEWORK_SOURCE_ALLOWED_ENTRIES.has(entry))
    .sort();
}

/**
 * State the CLAUDE.md stub is written for. `pending: true` means
 * `.kenovis/.setup-pending` was just written alongside it — the stub must
 * open with an imperative directive so the very next agent turn runs
 * init-project/adopt-project without a manual slash command (DECISION-018).
 * `pending: false` is the steady state, after that command has completed.
 */
export type ClaudeStubState = { pending: true; kind: InstallationKind } | { pending: false };

/**
 * The stub written to the target repository's root CLAUDE.md. Kept minimal —
 * Claude Code requires CLAUDE.md at repo root to autoload it (DECISION-010),
 * but everything it needs is in .kenovis/AI/SYSTEM.md.
 */
export function claudeStubContent(state: ClaudeStubState): string {
  const pendingDirective = state.pending
    ? `Before doing anything else this session, run \`${FRAMEWORK_DIR_NAME}/AI/commands/${setupPendingContent(state.kind)}.md\`.\n\n`
    : "";

  // Before setup runs, none of the destinations below exist -- company-os/PRODUCT/,
  // company-os/DOMAIN/, company-os/ENGINEERING/, company-os/DECISIONS.md and
  // company-os/AI/memory/ are authored by init-project.md / adopt-project.md, not
  // by the CLI (DECISION-021). Naming them unconditionally told a pre-setup
  // session to route findings to paths that were not there yet.
  const routing = state.pending
    ? `None of the destinations below exist yet. \`${setupPendingContent(state.kind)}.md\` creates
them as it runs — hold anything you notice until the step that authors the relevant one, then
write it there. That command's own closing step disposes of anything still unwritten once every
destination exists.`
    : `- Improvement, technical debt, a bug you are not fixing now, any candidate work → \`company-os/PRODUCT/ROADMAP.md\`
- A decision made, or an option rejected → \`company-os/DECISIONS.md\`, body and index line together
- A reusable lesson → \`company-os/AI/memory/learnings.md\`
- A business or domain rule → \`company-os/DOMAIN/\`
- An architectural consequence → \`company-os/ENGINEERING/\`
- An open question you cannot answer → \`company-os/PRODUCT/ROADMAP.md\`, naming who decides it and what they need`;

  return `# Kenovis AI-OS

${pendingDirective}This repository uses the Kenovis AI-OS. Its Framework layer lives in \`${FRAMEWORK_DIR_NAME}/\`.

Read \`${FRAMEWORK_DIR_NAME}/AI/SYSTEM.md\` first — it is the entry point for how AI agents should
operate in this repository. Everything under \`${FRAMEWORK_DIR_NAME}/\` is reusable framework;
this repository's own product context lives under \`company-os/\` (COMPANY_OS.md, DECISIONS.md,
PRODUCT/, DOMAIN/, ENGINEERING/, AUTOMATIONS/, AI/memory/, all inside that directory, plus this
repository's own code).

## Nothing stays in the thread

Everything you find while working is written into a Product-layer file, in the session you found
it — improvements, bugs, technical debt, decisions, learnings, open questions. All of it. A thread
ends and takes with it whatever was only spoken in it.

${routing}

Telling the human is not recording it. This applies in every session, including ones that run no
command and close no item. Full rules: \`${FRAMEWORK_DIR_NAME}/AI/policies/documentation.md\`.
`;
}
