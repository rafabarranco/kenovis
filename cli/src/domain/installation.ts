/**
 * Installation domain concepts.
 *
 * See DECISIONS.md DECISION-016 (no framework-mandated directory name for the
 * customer's own code) and DECISION-017 (Framework layer packaging: `.kenovis/`
 * hidden directory) — this module encodes the rules those decisions established,
 * so they are enforced in code, not just described in docs.
 */

export const FRAMEWORK_DIR_NAME = ".kenovis";
export const CLAUDE_STUB_FILENAME = "CLAUDE.md";
export const TARGET_README_FILENAME = "README.md";
export const SETUP_PENDING_FILENAME = ".setup-pending";

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
 * the target repository (ENGINEERING/ARCHITECTURE.md Hard Rules).
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
 * target segment (COMPANY_OS.md — developers "already fluent in agentic
 * tooling") is likely to already have one before adopting Kenovis.
 */
const CLAUDE_STUB_MARKER = "# Kenovis AI-OS";

export function isKenovisManagedClaudeStub(existingClaudeMdContent: string): boolean {
  return existingClaudeMdContent.startsWith(CLAUDE_STUB_MARKER);
}

/**
 * Thrown when a target's existing root CLAUDE.md was not written by this
 * CLI (per `isKenovisManagedClaudeStub`). Install must not silently discard
 * a customer's own CLAUDE.md content — bypassable with --force, same escape
 * hatch as AlreadyInstalledError/BrownfieldDetectedError/GreenfieldDetectedError.
 */
export class ExistingClaudeMdError extends Error {
  constructor(public readonly claudeMdPath: string) {
    super(
      `${claudeMdPath} already exists and doesn't look like a Kenovis-managed stub — ` +
        `refusing to overwrite it. Move your existing CLAUDE.md aside first, or ` +
        `re-run with --force to overwrite it anyway.`,
    );
    this.name = "ExistingClaudeMdError";
  }
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
const FRAMEWORK_SOURCE_ALLOWED_ENTRIES = new Set(["AI", TARGET_README_FILENAME]);

export class InvalidFrameworkSourceError extends Error {
  constructor(
    public readonly sourceDir: string,
    public readonly unexpectedEntries: string[],
  ) {
    super(
      `${sourceDir} does not look like a Framework-layer bundle: found ` +
        `${unexpectedEntries.join(", ")} at its top level. A Framework source ` +
        `directory must contain only AI/ and README.md (see ` +
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

  return `# Kenovis AI-OS

${pendingDirective}This repository uses the Kenovis AI-OS. Its Framework layer lives in \`${FRAMEWORK_DIR_NAME}/\`.

Read \`${FRAMEWORK_DIR_NAME}/AI/SYSTEM.md\` first — it is the entry point for how AI agents should
operate in this repository. Everything under \`${FRAMEWORK_DIR_NAME}/\` is reusable framework;
this repository's own product context lives at the repository root (COMPANY_OS.md, DECISIONS.md,
PRODUCT/, DOMAIN/, ENGINEERING/, AUTOMATIONS/, and this repository's own code).
`;
}
