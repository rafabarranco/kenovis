import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { installSelectedToolAdapters } from "./toolAdapters.js";
import { InMemoryFileSystem } from "../infrastructure/filesystem/InMemoryFileSystem.js";

const SOURCE = "/source/framework";

function seedClaudeAdapter(fs: InMemoryFileSystem): void {
  fs.seed(
    join(SOURCE, "tool-adapters", "claude", "adapter.json"),
    JSON.stringify({ id: "claude", commandsDir: ".claude/commands" }),
  );
  fs.seed(
    join(SOURCE, "tool-adapters", "claude", "commands", "next.md"),
    "<!-- kenovis:managed-command-wrapper -->\nRead `.kenovis/AI/commands/next.md`...\n",
  );
  fs.seed(
    join(SOURCE, "tool-adapters", "claude", "commands", "bug.md"),
    "<!-- kenovis:managed-command-wrapper -->\nRead `.kenovis/AI/commands/bug.md`...\n",
  );
}

test("installSelectedToolAdapters writes every command wrapper for a selected, available adapter", async () => {
  const fs = new InMemoryFileSystem();
  seedClaudeAdapter(fs);

  const result = await installSelectedToolAdapters(fs, {
    frameworkSourceDir: SOURCE,
    targetDir: "/repo",
    tools: ["claude"],
  });

  assert.deepEqual(result, { installed: ["claude"], unknown: [], skipped: [] });
  assert.equal(
    fs.files.get(join("/repo", ".claude", "commands", "next.md")),
    "<!-- kenovis:managed-command-wrapper -->\nRead `.kenovis/AI/commands/next.md`...\n",
  );
  assert.ok(fs.files.has(join("/repo", ".claude", "commands", "bug.md")));
});

test("installSelectedToolAdapters reports a requested tool id the bundle ships no adapter for", async () => {
  const fs = new InMemoryFileSystem();
  seedClaudeAdapter(fs);

  const result = await installSelectedToolAdapters(fs, {
    frameworkSourceDir: SOURCE,
    targetDir: "/repo",
    tools: ["claude", "grok"],
  });

  assert.deepEqual(result.installed, ["claude"]);
  assert.deepEqual(result.unknown, ["grok"]);
});

test("installSelectedToolAdapters never overwrites a customer's own pre-existing file at the same path", async () => {
  const fs = new InMemoryFileSystem();
  seedClaudeAdapter(fs);
  const customerOwnPath = join("/repo", ".claude", "commands", "next.md");
  fs.seed(customerOwnPath, "# My own custom /next command, unrelated to Kenovis\n");

  const result = await installSelectedToolAdapters(fs, {
    frameworkSourceDir: SOURCE,
    targetDir: "/repo",
    tools: ["claude"],
  });

  assert.deepEqual(result.skipped, [join(".claude", "commands", "next.md")]);
  assert.equal(fs.files.get(customerOwnPath), "# My own custom /next command, unrelated to Kenovis\n");
  // The other, uncontested wrapper still gets written.
  assert.ok(fs.files.has(join("/repo", ".claude", "commands", "bug.md")));
});

test("installSelectedToolAdapters refreshes a wrapper it wrote before (re-sync, newer Framework Release)", async () => {
  const fs = new InMemoryFileSystem();
  seedClaudeAdapter(fs);
  const path = join("/repo", ".claude", "commands", "next.md");
  fs.seed(path, "<!-- kenovis:managed-command-wrapper -->\nAn older rendering.\n");

  const result = await installSelectedToolAdapters(fs, {
    frameworkSourceDir: SOURCE,
    targetDir: "/repo",
    tools: ["claude"],
  });

  assert.deepEqual(result.skipped, []);
  assert.equal(fs.files.get(path), "<!-- kenovis:managed-command-wrapper -->\nRead `.kenovis/AI/commands/next.md`...\n");
});

test("installSelectedToolAdapters is a no-op when the bundle ships no tool-adapters/ at all", async () => {
  const fs = new InMemoryFileSystem();

  const result = await installSelectedToolAdapters(fs, {
    frameworkSourceDir: SOURCE,
    targetDir: "/repo",
    tools: ["claude"],
  });

  assert.deepEqual(result, { installed: [], unknown: ["claude"], skipped: [] });
});
