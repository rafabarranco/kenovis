import { test } from "node:test";
import assert from "node:assert/strict";
import {
  AlreadyInstalledError,
  BrownfieldDetectedError,
  claudeStubContent,
  detectInstallationKind,
  ExistingClaudeMdError,
  FRAMEWORK_DIR_NAME,
  GreenfieldDetectedError,
  hashClaudeMdContent,
  InvalidFrameworkSourceError,
  installationKindFromSetupPending,
  INSTALL_TIME_OWNED_ENTRIES,
  invalidFrameworkSourceEntries,
  isClaudeMdSafeToOverwrite,
  isKenovisManagedClaudeStub,
  CLAUDE_MD_HASH_FILENAME,
  FRAMEWORK_VERSION_FILENAME,
  parseFrameworkVersion,
  SETUP_PENDING_FILENAME,
  setupPendingContent,
} from "./installation.js";

test("claudeStubContent points at .kenovis/AI/SYSTEM.md", () => {
  const content = claudeStubContent({ pending: false });
  assert.match(content, /\.kenovis\/AI\/SYSTEM\.md/);
});

test("claudeStubContent references the actual framework directory name", () => {
  const content = claudeStubContent({ pending: false });
  assert.ok(content.includes(FRAMEWORK_DIR_NAME));
});

test("claudeStubContent, when pending and greenfield, directs the next session to init-project", () => {
  const content = claudeStubContent({ pending: true, kind: "greenfield" });
  assert.match(content, /Before doing anything else this session, run/);
  assert.match(content, /\.kenovis\/AI\/commands\/init-project\.md/);
});

test("claudeStubContent, when pending and brownfield, directs the next session to adopt-project", () => {
  const content = claudeStubContent({ pending: true, kind: "brownfield" });
  assert.match(content, /\.kenovis\/AI\/commands\/adopt-project\.md/);
});

test("setupPendingContent resolves greenfield to init-project and brownfield to adopt-project", () => {
  assert.equal(setupPendingContent("greenfield"), "init-project");
  assert.equal(setupPendingContent("brownfield"), "adopt-project");
});

test("installationKindFromSetupPending round-trips every marker setupPendingContent writes", () => {
  for (const kind of ["greenfield", "brownfield"] as const) {
    assert.equal(installationKindFromSetupPending(setupPendingContent(kind)), kind);
  }
});

test("installationKindFromSetupPending tolerates a trailing newline", () => {
  assert.equal(installationKindFromSetupPending("adopt-project\n"), "brownfield");
});

test("installationKindFromSetupPending returns null for a marker this CLI never wrote", () => {
  assert.equal(installationKindFromSetupPending("something else entirely"), null);
});

test("INSTALL_TIME_OWNED_ENTRIES covers every file the CLI writes inside .kenovis/", () => {
  const covered = [...INSTALL_TIME_OWNED_ENTRIES.preserved, ...INSTALL_TIME_OWNED_ENTRIES.rewritten];
  assert.deepEqual(covered.sort(), [SETUP_PENDING_FILENAME, CLAUDE_MD_HASH_FILENAME].sort());
});

test("BrownfieldDetectedError cites the evidence and points at kenovis add", () => {
  const error = new BrownfieldDetectedError(["package.json", "src"]);
  assert.deepEqual(error.evidence, ["package.json", "src"]);
  assert.match(error.message, /package\.json, src/);
  assert.match(error.message, /kenovis add/);
  assert.match(error.message, /--force/);
  assert.equal(error.name, "BrownfieldDetectedError");
});

test("GreenfieldDetectedError points at kenovis init", () => {
  const error = new GreenfieldDetectedError();
  assert.match(error.message, /kenovis init/);
  assert.match(error.message, /--force/);
  assert.equal(error.name, "GreenfieldDetectedError");
});

test("isKenovisManagedClaudeStub recognizes both pending and steady-state stub content", () => {
  assert.ok(isKenovisManagedClaudeStub(claudeStubContent({ pending: false })));
  assert.ok(isKenovisManagedClaudeStub(claudeStubContent({ pending: true, kind: "greenfield" })));
  assert.ok(isKenovisManagedClaudeStub(claudeStubContent({ pending: true, kind: "brownfield" })));
});

test("isKenovisManagedClaudeStub rejects a customer's own unrelated CLAUDE.md", () => {
  assert.equal(isKenovisManagedClaudeStub("# My Project\n\nDo whatever you want, agent.\n"), false);
  assert.equal(isKenovisManagedClaudeStub(""), false);
});

test("hashClaudeMdContent is deterministic and sensitive to every byte", () => {
  const content = claudeStubContent({ pending: false });
  assert.equal(hashClaudeMdContent(content), hashClaudeMdContent(content));
  assert.notEqual(hashClaudeMdContent(content), hashClaudeMdContent(`${content}\n`));
  assert.match(hashClaudeMdContent(content), /^[0-9a-f]{64}$/);
});

test("isClaudeMdSafeToOverwrite with a recorded hash: only an exact match is safe, even with an intact marker line", () => {
  const content = claudeStubContent({ pending: false });
  const recordedHash = hashClaudeMdContent(content);

  assert.ok(isClaudeMdSafeToOverwrite(content, recordedHash));
  // Marker line untouched, content appended below it — the exact scenario
  // isKenovisManagedClaudeStub cannot catch (Learning-007).
  assert.equal(isClaudeMdSafeToOverwrite(`${content}\nMy own notes.\n`, recordedHash), false);
  assert.equal(isClaudeMdSafeToOverwrite("# My Project\n", recordedHash), false);
});

test("isClaudeMdSafeToOverwrite with no recorded hash falls back to the marker-prefix check", () => {
  const content = claudeStubContent({ pending: false });
  assert.ok(isClaudeMdSafeToOverwrite(content, null));
  // Pre-fix Installation: no hash was ever recorded, so appended content is
  // still invisible here — the documented, intentional fallback behavior.
  assert.ok(isClaudeMdSafeToOverwrite(`${content}\nMy own notes.\n`, null));
  assert.equal(isClaudeMdSafeToOverwrite("# My Project\n", null), false);
});

test("ExistingClaudeMdError names the path and mentions --force", () => {
  const error = new ExistingClaudeMdError("/repo/CLAUDE.md");
  assert.equal(error.claudeMdPath, "/repo/CLAUDE.md");
  assert.match(error.message, /--force/);
  assert.equal(error.name, "ExistingClaudeMdError");
});

test("AlreadyInstalledError carries the conflicting directory and mentions --force", () => {
  const error = new AlreadyInstalledError("/repo/.kenovis");
  assert.equal(error.frameworkDir, "/repo/.kenovis");
  assert.match(error.message, /--force/);
  assert.equal(error.name, "AlreadyInstalledError");
});

test("detectInstallationKind reports greenfield for an empty directory", () => {
  const result = detectInstallationKind([]);
  assert.equal(result.kind, "greenfield");
  assert.deepEqual(result.evidence, []);
});

test("detectInstallationKind reports greenfield when only trivial/framework-owned entries exist", () => {
  const result = detectInstallationKind([
    ".git",
    ".gitignore",
    "README.md",
    "LICENSE",
    FRAMEWORK_DIR_NAME,
    "CLAUDE.md",
    ".claude",
  ]);
  assert.equal(result.kind, "greenfield");
  assert.deepEqual(result.evidence, []);
});

test("detectInstallationKind reports brownfield and cites real implementation entries as evidence", () => {
  const result = detectInstallationKind([".git", "README.md", "package.json", "src"]);
  assert.equal(result.kind, "brownfield");
  assert.deepEqual(result.evidence, ["package.json", "src"]);
});

test("invalidFrameworkSourceEntries accepts a directory containing only AI/ and README.md", () => {
  const unexpected = invalidFrameworkSourceEntries(["AI", "README.md"]);
  assert.deepEqual(unexpected, []);
});

test("invalidFrameworkSourceEntries accepts an empty directory", () => {
  assert.deepEqual(invalidFrameworkSourceEntries([]), []);
});

test("invalidFrameworkSourceEntries ignores dotfiles/dot-directories", () => {
  const unexpected = invalidFrameworkSourceEntries(["AI", "README.md", ".git", ".DS_Store"]);
  assert.deepEqual(unexpected, []);
});

test("invalidFrameworkSourceEntries flags Product-layer content mixed alongside AI/", () => {
  const unexpected = invalidFrameworkSourceEntries([
    "AI",
    "README.md",
    "COMPANY_OS.md",
    "DECISIONS.md",
    "DOMAIN",
    "PRODUCT",
    "ENGINEERING",
    "cli",
  ]);
  assert.deepEqual(
    unexpected,
    ["COMPANY_OS.md", "DECISIONS.md", "DOMAIN", "ENGINEERING", "PRODUCT", "cli"].sort(),
  );
});

test("InvalidFrameworkSourceError names the offending directory and unexpected entries", () => {
  const error = new InvalidFrameworkSourceError("/some/repo", ["DECISIONS.md", "cli"]);
  assert.equal(error.sourceDir, "/some/repo");
  assert.deepEqual(error.unexpectedEntries, ["DECISIONS.md", "cli"]);
  assert.match(error.message, /DECISIONS\.md, cli/);
  assert.equal(error.name, "InvalidFrameworkSourceError");
});

test("parseFrameworkVersion trims the stamp's content", () => {
  assert.equal(parseFrameworkVersion("0.5.0\n"), "0.5.0");
  assert.equal(parseFrameworkVersion("  0.6.0  "), "0.6.0");
});

test("parseFrameworkVersion reports a missing or blank stamp as unknown rather than guessing", () => {
  assert.equal(parseFrameworkVersion(null), null);
  assert.equal(parseFrameworkVersion(""), null);
  assert.equal(parseFrameworkVersion("   \n"), null);
});

test("the Framework Release stamp is not an install-time-owned entry — the bundle ships it", () => {
  const owned: readonly string[] = [
    ...INSTALL_TIME_OWNED_ENTRIES.preserved,
    ...INSTALL_TIME_OWNED_ENTRIES.rewritten,
  ];
  assert.ok(!owned.includes(FRAMEWORK_VERSION_FILENAME));
});

test("the Framework Release stamp is a dotfile, so it never trips the --source shape check", () => {
  assert.deepEqual(
    invalidFrameworkSourceEntries(["AI", "README.md", FRAMEWORK_VERSION_FILENAME]),
    [],
  );
});
