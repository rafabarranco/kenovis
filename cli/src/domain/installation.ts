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

export class AlreadyInstalledError extends Error {
  constructor(public readonly frameworkDir: string) {
    super(
      `${frameworkDir} already exists. Re-run with --force to overwrite the Framework layer, ` +
        `or use the sync command once it exists to update in place.`,
    );
    this.name = "AlreadyInstalledError";
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
