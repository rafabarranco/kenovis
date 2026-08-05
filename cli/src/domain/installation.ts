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
 * The stub written to the target repository's root CLAUDE.md. Kept minimal —
 * Claude Code requires CLAUDE.md at repo root to autoload it (DECISION-010),
 * but everything it needs is in .kenovis/AI/SYSTEM.md.
 */
export function claudeStubContent(): string {
  return `# Kenovis AI-OS

This repository uses the Kenovis AI-OS. Its Framework layer lives in \`${FRAMEWORK_DIR_NAME}/\`.

Read \`${FRAMEWORK_DIR_NAME}/AI/SYSTEM.md\` first — it is the entry point for how AI agents should
operate in this repository. Everything under \`${FRAMEWORK_DIR_NAME}/\` is reusable framework;
this repository's own product context lives at the repository root (COMPANY_OS.md, DECISIONS.md,
PRODUCT/, DOMAIN/, ENGINEERING/, AUTOMATIONS/, and this repository's own code).
`;
}
