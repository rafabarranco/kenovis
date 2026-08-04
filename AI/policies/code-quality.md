# Code Quality Policy

Version: 1.0

---

# Purpose

This document defines the mechanical, checkable quality bar every AI agent must enforce on every piece of code it writes or reviews.

`AI/policies/coding.md` defines philosophy: how to think about code.

This document defines mechanics: what to check, item by item, before code is considered done.

Philosophy without mechanics gets interpreted loosely. Mechanics without philosophy produces code that passes checks but still reads badly. Both are mandatory.

---

# Core Philosophy

A senior engineering team does not rely on memory or good intentions to keep code clean.

It relies on a fixed, exhaustive, boring checklist that gets run on every single change, without exception, until it becomes invisible.

This document is that checklist. It is deliberately language-agnostic: the categories below are universal software engineering failure modes. Every mainstream static analysis tool (SonarQube, ESLint, Ruff, Pylint, Bandit, golangci-lint, RuboCop, Checkstyle, PMD, SpotBugs, Clippy, PHPStan, Roslyn analyzers...) encodes some version of them for its language.

This document does not replace those tools. It is the baseline they must all satisfy, and the fallback for whatever they cannot check automatically or cannot be run during this session.

---

# Who Must Consult This Document

- `frontend` — before finishing any UI or client-side code. All categories except 9, 10, and 12 apply; Category 7 (Accessibility) applies to every change this agent makes.
- `backend` — before finishing any server-side or application code. All categories apply, especially 3, 9, 10, 11, and 12.
- `database` — for the categories that apply to migrations and queries: 1 (Correctness), 3 (Security Vulnerabilities), 6 (Complexity), and 10 (Concurrency & Data Integrity).
- `security` — as the concrete companion to its own principle-based checklist in `AI/policies/security.md`, specifically Categories 3 and 4.
- `reviewer` — as part of Code Quality Review, on every change under review, across whichever categories the change touches.

Agents that do not produce or review code (`ceo`, `product-manager`, `designer`, `marketing`, `finance`, `legal`) do not need this document.

---

# When To Apply It

Before declaring any code task complete, and again during review. See `AI/policies/coding.md` → "Definition of Done — Mechanical Gate" for how this document is wired into the actual workflow.

---

# Category 1 — Correctness

- No unreachable code (code after an unconditional return/throw/break).
- No empty blocks (`if`, `catch`, function bodies) without an explicit reason.
- No identical branches in a conditional — if two branches do the same thing, the condition is fake.
- No self-comparison, self-assignment, or comparing a value to itself.
- No accidental use of assignment (`=`) where comparison (`==`/`===`) was intended, and vice versa.
- Loop counters and indices must move in the direction that terminates the loop.
- Collection/array mutating methods (map, filter, reduce, sort...) must not be used for side effects only, and must not silently drop the return value when the return value is the point of calling them.
- A function advertised as returning a value must return one on every path.
- Reactive/state primitives (hooks, signals, observables, computed properties) must be declared unconditionally, at a fixed position, never inside a conditional, loop, or nested function.
- Numeric comparisons must never rely on `NaN` equality; use the language's dedicated NaN check.

---

# Category 2 — Reliability & Error Handling

- Every promise/future/task is awaited, returned, or has its rejection handled. No floating async work.
- `catch` blocks must do more than rethrow with no added value — either handle, add context, or don't catch.
- Exceptions are never swallowed silently. A caught error with no logging and no rethrow is a bug waiting to be invisible.
- Errors thrown must be actual error objects, never plain strings or literals.
- External calls (network, disk, external process) must have a defined failure path — timeout, retry policy, or explicit "fails loud" decision. Never assume success.
- Resources that must be closed/released (connections, file handles, locks) are released on every exit path, including error paths.

---

# Category 3 — Security Vulnerabilities

These are never acceptable, in any project, in any language:

- Building SQL, NoSQL, OS-command, LDAP, or XPath queries by string concatenation or interpolation with untrusted input. Use parameterized queries / prepared statements / query builders exclusively.
- Passing untrusted input to a shell, `eval`, dynamic `require`/`import`, or any dynamic code execution mechanism.
- Constructing file paths from untrusted input without normalizing and validating they stay within an allowed root (path traversal, including encoded variants like `%2e%2e`, `%252e%252e`).
- Fetching a URL built from untrusted input without an allowlist of hosts/schemes (SSRF).
- Rendering untrusted content into HTML/DOM without escaping or a vetted sanitizer (XSS).
- Redirecting to a URL built from untrusted input without an allowlist (open redirect).
- Extracting archive contents without validating entry paths stay inside the target directory (zip slip) or without limiting decompressed size (zip bomb / resource exhaustion).
- Parsing XML with external entity resolution enabled when the source is untrusted (XXE).
- Using outdated or weak TLS/SSL protocol versions, or disabling certificate/hostname verification.
- Using broken or weak cryptographic primitives (MD5/SHA1 for security purposes, ECB mode, custom-rolled crypto) instead of the platform's current recommended algorithm.
- Using a non-cryptographic random generator (`Math.random()` and equivalents) for tokens, session IDs, passwords, or anything security-sensitive.
- Hardcoding credentials, API keys, tokens, or connection strings in source, config committed to the repo, or comments.
- Signing or verifying tokens (JWT and equivalents) with a weak algorithm, `none`, or a hardcoded/guessable secret.
- Creating a new session identifier only on privilege change (login, MFA) — never reuse a pre-auth session ID after authentication (session fixation).

---

# Category 4 — Security Hotspots (Judgment Required)

Not automatically wrong, but must be a deliberate, reviewed decision — never a default:

- Logging data that could contain secrets, tokens, or personal information.
- Cookies without `Secure` and `HttpOnly` flags on anything session-related.
- Permissive CORS (`*` or reflecting `Origin` unconditionally) on endpoints that carry credentials.
- Disabling CSRF protection on any state-changing endpoint.
- Debug endpoints, verbose error pages, or profiling tools reachable in production.
- Disabling a templating engine's or framework's auto-escaping/sanitization.
- Regular expressions with nested quantifiers over untrusted input (ReDoS risk).
- Using remote scripts/assets without a subresource-integrity or checksum guarantee.
- Forwarding the client's IP or other identifying headers without a documented reason.
- File uploads accepted without restricting type, size, and (when the content is later served) without preventing execution.

---

# Category 5 — Maintainability

- No duplicated string literal appearing 3+ times — extract a named constant.
- No magic number other than 0, 1, or -1 used without a named constant explaining what it represents.
- Every reassignable-looking variable that is never reassigned should be declared as immutable (`const` or the language's equivalent).
- No unused imports, variables, parameters, or private members.
- `if/else if` chains should end with a final `else` (or an explicit comment on why not) when the condition space is meant to be exhaustive.
- `switch`/`match` statements should have a `default`/exhaustive case.
- Every branch of a switch must terminate (`break`/`return`) — no accidental fallthrough.
- Single-statement conditionals always use braces, even when the language allows omitting them.
- No commented-out code left in the codebase. Delete it — history lives in git.
- `TODO`/`FIXME` left in code must reference why it's deferred, not just that it is.
- No use of an untyped escape hatch (`any`, `object`, unchecked casts, `# type: ignore` without reason) without a one-line justification.
- Deprecated APIs are not used in new code.
- No wildcard/star imports that pull in an unbounded namespace.

---

# Category 6 — Complexity Limits

- Cyclomatic complexity: if a function needs more than roughly 10 independent paths to explain, split it.
- Nesting depth: more than 3-4 levels of nested `if`/`for`/`try` is a signal to extract a function or invert the condition with early returns.
- Function length: if understanding the function requires scrolling, it is doing too much (see `coding.md` → Function Size).
- Function parameter count: more than 4-5 positional parameters should become an options object (see `coding.md` → Parameters).
- Expressions: a boolean or arithmetic expression that needs a comment to explain what it computes should be broken into named intermediate variables.

---

# Category 7 — Accessibility (UI-bearing code only)

Applies only when the change touches user-facing interface code.

- Interactive elements (buttons, links, form controls) are reachable and operable by keyboard alone.
- Images and icons that carry meaning have accessible text; purely decorative ones are hidden from assistive tech.
- Form fields have an associated, visible label — not only a placeholder.
- Custom interactive components expose the correct ARIA role and required ARIA properties for that role — and only those.
- Focus is managed explicitly on route changes, modal open/close, and dynamic content insertion.
- Color is never the only signal for state (error, success, required) — pair it with text or an icon.
- Lists rendered from dynamic data have a stable, unique key — never the array index when the list can reorder, filter, or grow.

---

# Category 8 — Testing Hygiene

- Every test file contains at least one real assertion — a test with no assertion always passes and protects nothing.
- Tests assert on behaviour, not on internal implementation details (see `AI/policies/testing.md`).
- No test is skipped or marked exclusive (`.only`/`.skip` equivalents) when committed.
- Tests that expect an exception assert on which exception, not just that "something" threw.
- No test depends on execution order or leftover state from a previous test.

---

# Category 9 — API & Contract Design

Applies when the change adds or modifies an endpoint, RPC method, event schema, or any contract another service or client depends on.

- Resource/action naming is consistent with the rest of the API — no mixing `POST /updateThing` with `POST /things/{id}`.
- Every error response uses the project's standard error shape. No endpoint invents its own ad hoc error format.
- Breaking changes to a contract (removing a field, changing a type, tightening validation) are versioned or explicitly flagged — never shipped silently on an existing endpoint.
- Pagination, filtering, and sorting on list endpoints follow the project's existing convention, not a new one invented for this endpoint.
- Idempotent operations (retryable writes, payment-like actions) accept an idempotency key or are naturally idempotent — a retry must never double-execute.
- Inputs are validated against a schema at the boundary, not only checked ad hoc in application code.
- Nothing internal leaks through the contract: stack traces, ORM/database error messages, internal IDs that were meant to stay internal, debug fields.

---

# Category 10 — Concurrency & Data Integrity

Applies when the change touches shared state, background jobs, financial values, or anything that must not happen twice.

- Operations that must be atomic (multi-step writes, balance changes, state transitions) run inside a transaction — not as separate calls hoping nothing fails in between.
- Uniqueness that matters (one active session, one payment per order, one signup per email) is enforced by a database constraint, not only checked in application code first — a check-then-act without a constraint is a race condition.
- Concurrent/duplicate requests for the same operation are handled explicitly (locking, unique constraint, idempotency key) — never assumed away.
- Background jobs are safe to retry: a job that runs twice (crash after partial completion, at-least-once delivery) must not corrupt data or double-apply an effect.
- Values that affect money, permissions, or ownership are recomputed/verified server-side even if the client also sent them — never trusted from the request.
- No long-running operation holds a lock or transaction open longer than the work that actually needs it.

---

# Category 11 — Dependency & Build Hygiene

Applies whenever the change adds, removes, or upgrades a dependency, or touches build/CI configuration.

- New dependencies are pinned to a specific, intentional version — not left on an open range that can silently pull in a breaking or compromised release.
- The dependency is actually used after adding it — no leftover install from an abandoned approach.
- A dependency added to solve a problem the standard library already solves is questioned before being kept (see `AI/policies/coding.md` → Dependencies).
- Lockfiles are committed and consistent with the manifest — no manifest change without a matching lockfile update.
- Dev-only tooling does not leak into the production dependency set.
- If the project has a dependency audit command (`npm audit`, `pip-audit`, `govulncheck`, `cargo audit`, `bundler-audit`...), it has been run and reports nothing new above the project's accepted severity threshold.

---

# Category 12 — Observability & Logging

Applies to backend, service, and background-job code.

- Every log line answers what happened and why — not just "error" or "done" with no context (see `AI/policies/coding.md` → Logging).
- Logs never contain secrets, tokens, passwords, or personal data — this is a security requirement, not a style preference (see Category 3/4 above and `AI/policies/security.md`).
- Errors that reach a catch-all handler are logged with enough context to investigate — silent failure in production is the same as no error handling at all.
- Critical business actions (state changes, permission changes, financial operations) produce a traceable record, not only a log line that scrolls away.
- A request/operation that spans multiple services or steps carries a correlation/trace ID through all of them, when the project has that mechanism.

---

# Post-Code Self-Check Sequence

Run this sequence, in order, before declaring any code task done. It is deliberately short — the categories above are the reference; this is the fast pass.

1. Run the project's real linter/formatter/type-checker (see `AI/policies/coding.md` → Definition of Done). Fix everything it reports.
2. Re-read every changed function once, checking it against Category 1 (Correctness) and Category 2 (Reliability).
3. Grep the diff for string literals and numeric literals — anything repeated or unexplained becomes a constant.
4. Grep the diff for anything that touches untrusted input (request bodies, query params, file content, third-party responses) — walk it against Category 3.
5. If the change touches UI, walk it against Category 7.
6. If the change adds or edits tests, walk it against Category 8.
7. If the change adds or modifies an API/contract, walk it against Category 9.
8. If the change touches shared state, money, or anything that must not run twice, walk it against Category 10.
9. If the change adds, removes, or upgrades a dependency, walk it against Category 11.
10. If the change is backend/service code, confirm logging follows Category 12.
11. Confirm nothing in Category 5 (unused imports, dead code, missing braces) survived.

---

# Mapping To Real Tools

This document is the baseline. Prefer running the project's actual tool over manual self-review whenever the tool is runnable in this session — a real tool is always more accurate and more current than any static checklist.

Typical tool families, by language (read `ENGINEERING/ARCHITECTURE.md` for what this project actually uses — never assume):

- JavaScript/TypeScript: ESLint (+ `typescript-eslint`, plus the relevant framework plugin), `tsc --noEmit`.
- Python: Ruff or Pylint, Mypy or Pyright, Bandit for security.
- Go: `go vet`, `staticcheck`, `golangci-lint`.
- Java/Kotlin: Checkstyle, PMD, SpotBugs.
- C#: Roslyn analyzers.
- Rust: `clippy`.
- Ruby: RuboCop, Brakeman for security.
- Any language: SonarQube/Semgrep if the project has it configured.
- Dependency auditing: `npm audit`/`pnpm audit`, `pip-audit`, `govulncheck`, `cargo audit`, `bundler-audit`, or whatever the project's package manager provides — for Category 11.
- API/contract linting: Spectral for OpenAPI, `buf lint` for protobuf, or the project's schema validator — for Category 9.

Running the real tool satisfies Categories 1, 2, 5, and 6 far more reliably than manual reading. Categories 3, 4, 9, 10, and 12 still deserve a manual pass even when a linter runs — most linters catch only a subset of injection/crypto/secrets issues, and none of them understand your business's concurrency, contract, or logging intent.

---

# When The Gate Only Exists In CI (External Tools)

Some quality gates (SonarQube behind a build server, DAST scanners, license/SBOM scanners) cannot be invoked from inside a coding session — they only run in CI/CD.

When that is the case for this project:

- Do not skip the self-check because "CI will catch it." CI feedback arrives too late to be useful during implementation.
- If the project maintains an export of its active ruleset (e.g. `ENGINEERING/CODE_QUALITY.md`, generated from the real tool's configuration — never hand-written from memory), self-review against that export before declaring work done, in addition to the categories above.
- Keep that export machine-generated and regenerated whenever the tool's active ruleset changes. A stale hand-maintained rule list is worse than no list — it creates false confidence.

---

# AI Responsibilities

AI must:

- Treat every category above as mandatory, not aspirational.
- Run the project's real tooling whenever it is runnable in-session, and treat this document as the fallback, not a replacement.
- Flag when a violation is found but fixing it is out of scope for the current change, rather than silently ignoring it.
- Never disable a lint rule, type check, or test to make a change pass without a one-line justification of why the underlying issue does not apply.

AI must never:

- Claim a task is done without having run the Post-Code Self-Check Sequence.
- Add a suppression comment (`eslint-disable`, `# noqa`, `# type: ignore`, `@SuppressWarnings`...) without naming which rule and why.
- Treat this document as optional for "small" changes. Small changes are exactly where checklists get skipped and debt accumulates.

---

# Final Principle

Senior engineering output is not a different vocabulary. It is the same principles, checked mechanically, every single time, without fatigue.

This document exists so an AI agent — which never gets tired of checklists — has no excuse to skip them.
