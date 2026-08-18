import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { runContext } from "./context.js";
import { InMemoryFileSystem } from "../../infrastructure/filesystem/InMemoryFileSystem.js";

test("runContext finds a paragraph match and reports its line range", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(
    join("/repo", "company-os", "DOMAIN", "BUSINESS_RULES.md"),
    ["# Rules", "", "Outbound webhooks are exempt from the request rate limiter.", ""].join("\n"),
  );

  const result = await runContext(fs, { targetDir: "/repo", query: "rate limiter" });

  assert.deepEqual(result.searchedRoots, ["company-os"]);
  assert.equal(result.matches.length, 1);
  assert.equal(result.matches[0].path, "company-os/DOMAIN/BUSINESS_RULES.md");
  assert.equal(result.matches[0].startLine, 3);
  assert.equal(result.matches[0].endLine, 3);
});

test("runContext treats adjacent findings-table rows as separate matches, not one merged block", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(
    join("/repo", "company-os", "PRODUCT", "ROADMAP.md"),
    [
      "| Id | Finding | Source | Disposition |",
      "|---|---|---|---|",
      "| OF-01 | A rate limiter bug in the middleware. | session | Open |",
      "| OF-02 | An unrelated documentation typo. | session | Open |",
    ].join("\n"),
  );

  const result = await runContext(fs, { targetDir: "/repo", query: "rate limiter" });

  assert.equal(result.matches.length, 1);
  assert.equal(result.matches[0].startLine, 3);
  assert.equal(result.matches[0].endLine, 3);
  assert.match(result.matches[0].excerpt, /OF-01/);
});

test("runContext ranks a chunk with more query-token occurrences above one with fewer", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(
    join("/repo", "company-os", "COMPANY_OS.md"),
    [
      "Security review is mentioned here once.",
      "",
      "Security, security, security: this paragraph repeats the word security four times.",
      "",
    ].join("\n"),
  );

  const result = await runContext(fs, { targetDir: "/repo", query: "security" });

  assert.equal(result.matches.length, 2);
  assert.ok(result.matches[0].score > result.matches[1].score);
  assert.match(result.matches[0].excerpt, /four times/);
});

test("runContext respects the limit option", async () => {
  const fs = new InMemoryFileSystem();
  const paragraphs = Array.from({ length: 5 }, (_, i) => `Paragraph ${i} mentions widgets.`);
  fs.seed(join("/repo", "company-os", "NOTES.md"), paragraphs.join("\n\n"));

  const result = await runContext(fs, { targetDir: "/repo", query: "widgets", limit: 2 });

  assert.equal(result.matches.length, 2);
});

test("runContext does not search .kenovis/AI by default, but does with includeFramework", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", "company-os", "COMPANY_OS.md"), "No relevant content here.");
  fs.seed(join("/repo", ".kenovis", "AI", "policies", "security.md"), "Widgets must be encrypted.");

  const withoutFramework = await runContext(fs, { targetDir: "/repo", query: "widgets" });
  assert.equal(withoutFramework.matches.length, 0);
  assert.deepEqual(withoutFramework.searchedRoots, ["company-os"]);

  const withFramework = await runContext(fs, {
    targetDir: "/repo",
    query: "widgets",
    includeFramework: true,
  });
  assert.equal(withFramework.matches.length, 1);
  assert.equal(withFramework.matches[0].path, ".kenovis/AI/policies/security.md");
  assert.deepEqual(withFramework.searchedRoots, ["company-os", ".kenovis/AI"]);
});

test("runContext reports no searched roots when company-os/ does not exist under targetDir", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", "package.json"), "{}");

  const result = await runContext(fs, { targetDir: "/repo", query: "anything" });

  assert.deepEqual(result.searchedRoots, []);
  assert.equal(result.matches.length, 0);
});

test("runContext returns no matches, but a populated searchedRoots, for a query with no hits", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", "company-os", "COMPANY_OS.md"), "Some ordinary content.");

  const result = await runContext(fs, { targetDir: "/repo", query: "zzz_no_such_token" });

  assert.deepEqual(result.searchedRoots, ["company-os"]);
  assert.equal(result.matches.length, 0);
});

test("runContext ignores non-markdown files under company-os/", async () => {
  const fs = new InMemoryFileSystem();
  fs.seed(join("/repo", "company-os", "widgets.json"), '{"widgets": true}');

  const result = await runContext(fs, { targetDir: "/repo", query: "widgets" });

  assert.equal(result.matches.length, 0);
});
