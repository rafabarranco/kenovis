<!-- PROJECT-SPECIFIC: accumulates per-product knowledge. Reset the recorded entries when starting a new product, keep the rules. See AI/commands/init-project.md -->

AI Learnings

Version: 1.2
---
Scope

The rules in this document are framework-level and reusable.

The learnings recorded by the AI while working on a product are project-specific and must be cleared when starting a new product.
---
Purpose

This document stores accumulated organizational knowledge.

The purpose is to capture:

- Important lessons.
- Repeated mistakes.
- Successful patterns.
- Process improvements.
- Technical discoveries.
- Product insights.

This file represents the experience gained by the organization over time.
---
Learning Philosophy

A learning is not a record of what happened.

A learning explains:

What happened

↓

Why it happened

↓

What was learned

↓

What should change in the future

---
What Should Be Stored

Store learnings about:

- Architecture decisions.
- Development processes.
- Product discovery.
- User behaviour.
- Technical limitations.
- Failed approaches.
- Successful approaches.
---
What Should NOT Be Stored

Do not store:

- Temporary tasks.
- Daily progress updates.
- Completed tickets.
- Meeting notes.
- Personal opinions without evidence.
- Project-specific details that have no future value.
---
Learning Format

Every learning should follow this structure:

## Learning ID

Date:

Category:

Context:

Problem:

What happened:

Root cause:

Learning:

Future action:

---
Categories

Use one of these categories:

Architecture

Engineering

Product

Business

Security

Process

User Experience

Performance

Operations

---
Learning Examples

Example: Architecture

## Learning-001

Date:
2026-01-01

Category:
Architecture

Context:
Introducing a new external service.

Problem:
The service was integrated directly inside business logic.

What happened:
Changing the provider required modifying multiple modules.

Root cause:
The external dependency was not isolated.

Learning:
External services should be hidden behind interfaces.

Future action:
Use adapters for external integrations.

---
Example: Project — a startsWith check only proves "not a foreign file," not "nothing appended"

## Learning-007

Date:
2026-08-06

Category:
Engineering

Context:
End-to-end smoke test of the real v0.1.0/v0.2.0 → dev-build upgrade path (PRODUCT/ROADMAP.md Phase 0 item 6): installed a real published `kenovis@0.2.0` into a scratch repository, then ran `kenovis sync` — first with the CLAUDE.md stub untouched (should pass), then again after appending a line of "customer" content below the stub's existing marker line (should now be caught by the new `ExistingClaudeMdError` guard just added to `sync`).

Problem:
The append case was not caught. `sync` silently overwrote the CLAUDE.md and discarded the appended line, even though the new guard (this same round of work) was built specifically to stop `sync` from silently discarding customer content.

What happened:
`isKenovisManagedClaudeStub` (`cli/src/domain/installation.ts`) checks `content.startsWith(CLAUDE_STUB_MARKER)` — true for "this file's first line is Kenovis's own," which is also true for "Kenovis's stub plus anything appended after it." The check answers "did Kenovis originate this file," not "is everything currently in this file Kenovis's own content." `init`/`add` have carried this same gap since Learning-006 introduced the check; `sync` just inherited it by reusing the identical function, so the smoke test exposed a pre-existing limitation, not a new regression from this round's change.

Root cause:
A prefix check is the right tool for "was this file ever touched by us at all" but the wrong tool for "is this file's current content entirely ours" — those are different questions, and the guard was written to answer the first while being relied on (by this session, in cli/README.md's first draft of the Upgrading section) to answer the second.

Learning:
When a "did we write this" check is a prefix/marker match rather than a full-content hash or diff, its guarantee stops at "we wrote the beginning" — appended content downstream of the marker is invisible to it. Before documenting a guard's coverage (e.g. "sync won't lose your notes"), test the specific case of *appending* to an otherwise-recognized file, not just replacing it outright — the two produce different, easily-conflated results against a prefix check.

Future action:
Closing this gap properly (e.g. hashing/diffing the stub's own known content against what's on disk, or requiring customer notes to live in a separate file) is scoped as a real backlog item, not silently fixed inside this round's work — see PRODUCT/ROADMAP.md Phase 0 item 6 follow-up. Until then, `cli/README.md` documents the limitation explicitly instead of overstating the guard's coverage.

---
Example: Project — a "forced" file-write path was never audited against a file the CLI doesn't fully own

## Learning-006

Date:
2026-08-06

Category:
Architecture

Context:
`/analyze` immediately after DECISION-018 shipped (auto-trigger `init-project`/`adopt-project` via a `.kenovis/.setup-pending` marker and a parametrized `CLAUDE.md` stub), asking specifically whether `kenovis init --force` on an existing project would overwrite the customer's own files.

Problem:
`runInit` always wrote the root `CLAUDE.md` stub via an unconditional `writeFile`, with no check for whether a file already existed there — and if it did, whether it was Kenovis's own. `kenovis add`, the *correct, documented, non-force* command for an existing project, silently discarded a customer's own pre-existing `CLAUDE.md` on every normal run.

What happened:
DECISION-017 established `CLAUDE.md` as "the one file Kenovis is forced to write at repo root" (Claude Code's autoload requirement) and reasoned carefully about never touching the customer's `README.md` — but never asked the symmetric question about `CLAUDE.md` itself: what if the customer already has one, unrelated to Kenovis? COMPANY_OS.md's own Ideal Customer Profile — developers "already fluent in agentic tooling" — makes a pre-existing `CLAUDE.md` a realistic case, not a hypothetical one. Separately, the same audit found `init --force` re-installing over an existing `.kenovis/` merged instead of mirror-replaced (Node's `fs.cp` defaults to overwrite-in-place, not wipe-then-copy) — `sync` already did this correctly (`removeTree` then `copyTree`) but `init`'s `--force` path never reused that pattern.

Root cause:
A file being "forced"/owned by the tool (CLAUDE.md) was treated as equivalent to "safe to always overwrite," collapsing two different questions: *whose file is the CLI allowed to write to* (yes, CLAUDE.md, by design) vs. *whose content is currently sitting there* (unknown, never checked). The `--force` reinstall path was implemented by a different code path than `sync`'s mirror-replace, so the two silently drifted even though they solve the same problem.

Learning:
"This tool is allowed to own this file" and "this tool may discard whatever's already in this file" are different guarantees — the first doesn't imply the second. When a file is forced to a fixed path for tooling reasons (autoload, convention, etc.), still check what's already there before overwriting, the same way an already-established pattern (README.md protection) already does elsewhere in the same codebase. Also: when two code paths solve the same underlying problem (`sync`'s mirror-replace, `init --force`'s reinstall), a divergence between them is itself a bug waiting to be found, even if neither path is wrong in isolation.

Future action:
When adding a new "CLI writes to a fixed, tool-owned path" pattern in the future, explicitly design the "what if something is already there and it isn't ours" case up front — do not let it wait for a follow-up `/analyze`. Cross-check new `--force`/overwrite code paths against existing ones (`sync`) for behavioral parity before shipping.

---
Example: Project — an unrecognized CLI flag silently fell through to a real install against cwd

## Learning-005

Date:
2026-08-06

Category:
Engineering

Context:
Manual end-to-end smoke test of the `kenovis add` / bare-autodetect mechanism built for DECISIONS.md DECISION-018 (auto-trigger `init-project`/`adopt-project` without a manual slash command), run per that decision's own Phase 3 verification step, before considering the CLI implementation done.

Problem:
Testing `kenovis --help` (a plausible first thing a real user tries) actually ran a full install against the current working directory instead of printing usage.

What happened:
`--help` isn't `init`/`add`/`sync`, so `parseArgs` treated it as a bare invocation (DECISION-018's autodetect dispatch, which "never refuses" by design). Its own arg-parsing loop then skipped `--help` because it starts with `--`, leaving `targetDir` at its default of `.` — so the bare path ran a real `runAdd`/`runInit` against the shell's cwd, which happened to be this repository's own `cli/` directory during testing, writing a stray `.kenovis/` and `CLAUDE.md` into a real, git-tracked source tree.

Root cause:
The bare-dispatch design (any invocation without a recognized subcommand + a chosen target, "never refuses") was correct for its intended case (`kenovis <targetDir>`) but had no reserved space for flag-only invocations that aren't asking for an install at all.

Learning:
A catch-all "no subcommand means bare mode" dispatch needs its flag/help handling checked *before* it, not folded into the same fallback path — otherwise every not-yet-implemented flag silently becomes "install here." Same root shape as Learning-004's `--source` footgun: an intentionally permissive path (mirror whatever `--source` says / install wherever bare mode is pointed) has no safeguard against a caller who didn't mean to trigger it at all.

Future action:
When adding new bare-dispatch or mirror-whatever-you're-given CLI paths in the future, explicitly enumerate what should NOT reach that path (here: `--help`/`-h`) before wiring the fallback, rather than discovering the gap via smoke testing after the fact. `cli/src/cli/bin.ts`'s `main()` now checks `--help`/`-h` first, unconditionally.

---
Example: Project — `sync --source` mirrors whatever directory it's pointed at, unfiltered

## Learning-004

Date:
2026-08-05

Category:
Engineering

Context:
End-to-end smoke test of the published `kenovis@0.1.0` package against a scratch external-like repository, verifying `init`/`sync` behave as newly documented in README.md's "Getting started" section.

Problem:
Testing `sync --source <dir>` by pointing it at this repository's own root (instead of a real Framework-only bundle) silently mirrored this repository's own Product-layer content (COMPANY_OS.md, DECISIONS.md, DOMAIN/, PRODUCT/, ENGINEERING/, cli/, .github/, LICENSE, ...) into the target's `.kenovis/` — content that describes Kenovis-the-company, never meant to leave this repository.

What happened:
`runInit`/`runSync` perform a full, unfiltered mirror of whatever `--source` points at; there is no allowlist or validation that the source directory actually contains only Framework-layer content. Default zero-flag usage (`npx kenovis sync`, what README.md documents to real customers) is safe because the published package's bundled `dist/framework-assets/` is already filtered at build time (`bundle-framework-assets.mjs`). The risk is specific to `--source` pointed at an unbundled directory.

Root cause:
`--source` was designed as a local-dev/testing escape hatch (see cli/README.md "Running it locally") and trusts the caller completely — reasonable for that use case, but has no safeguard against accidental misuse.

Learning:
An unvalidated "mirror this directory" flag will faithfully reproduce whatever layer-mixing mistake the caller makes. Default (filtered, bundled) paths and advanced/raw-directory paths need different trust assumptions documented explicitly, not just implied by which flag is used.

Future action:
DECISIONS.md DECISION-017's Phase 2 (this repository migrates its own Framework layer into `.kenovis/` using the CLI's own sync mechanism on itself) must run `sync` against the built `dist/framework-assets/` bundle, never against the raw repo root — otherwise it will self-pollute `.kenovis/` with this repository's own Product-layer content. Consider adding a lightweight source-directory validation (e.g., reject a `--source` whose top level contains recognizably Product-layer names) before Phase 2 executes.

---

Example: Project — sync's reversibility comes from the target's own git, not the CLI

## Learning-003

Date:
2026-08-05

Category:
Architecture

Context:
Building the `sync` command (PRODUCT/ROADMAP.md Phase 0 item 3, slice 4) to satisfy DOMAIN/BUSINESS_RULES.md RULE-INST-02 ("a sync must never perform an in-place, non-version-controlled rewrite").

Problem:
Read literally, "never perform an in-place rewrite" could be misread as requiring the CLI itself to compute and present a diff before touching disk — a much bigger feature than this slice needed.

What happened:
Re-reading RULE-INST-02's own text closely: "the customer's own git history and PR review are the rollback mechanism." `.kenovis/` is git-tracked inside the customer's repository from the `init` commit onward. `runSync` mirror-replaces `.kenovis/` in place (`removeTree` + `copyTree`); the customer's `git diff`/`git checkout` then IS the review-and-revert mechanism the rule requires. No CLI-side diff engine was needed for RULE-INST-02 to be satisfied — that ergonomic improvement is separately, explicitly scoped to Phase 2 ("richer CLI update ergonomics — diff preview before sync") in PRODUCT/ROADMAP.md, confirming this reading.

Root cause:
"Reversible" and "diff-previewed-by-the-tool-itself" are not the same requirement; the business rule only demands the former for v1.

Learning:
When a business rule's own prose names the actual rollback mechanism (here: the customer's git), build against that mechanism instead of assuming the CLI must reimplement it. Check PRODUCT/ROADMAP.md for whether a fancier version of the same capability is already deliberately deferred — that's a strong signal the leaner reading is correct.

Future action:
When Phase 2's diff-preview work starts, treat it as a UX/ergonomics layer on top of the existing mirror-replace `runSync`, not a rewrite of its core reversibility guarantee.

---
Example: Product

## Learning-002

Date:
2026-01-01

Category:
Product

Context:
Testing a new workflow.

Problem:
Users ignored a complex configuration screen.

What happened:
The feature adoption was lower than expected.

Root cause:
The workflow required too much setup before providing value.

Learning:
Users should reach the first valuable action as quickly as possible.

Future action:
Prioritize simple onboarding flows.

---
Learning Validation

Before adding a learning, verify:

✓ Is this based on a real experience?

✓ Does this change future behaviour?

✓ Can another project benefit from this?

✓ Is this more than a simple observation?

If the answer is no, do not store it.
---
Priority Levels

Each learning can have a priority:

Critical

Important

Useful

---
Critical

Must influence future decisions.

Examples:

- Security failures.
- Data loss prevention.
- Architecture mistakes.
---
Important

Should be considered regularly.

Examples:

- Development patterns.
- Product lessons.
---
Useful

Helpful but not mandatory.

Examples:

- Minor improvements.
- Optimizations.
---
Review Process

Periodically review learnings.

The AI should identify:

- Repeated problems.
- Patterns.
- Opportunities to improve policies.

If a learning becomes a permanent rule:

Move it to:

AI/policies/

If a learning becomes a naming rule:

Move it to:

AI/memory/conventions.md

If a learning becomes domain knowledge:

Move it to:

DOMAIN/

---
Evolution Rules

The AI should improve the organization over time.

When a recurring problem appears:

Do not only fix the issue.

Improve the system that allowed the issue.

Example:

Bad:

Fix bug.

Good:

Fix bug.

Understand why it happened.

Update policy.

Prevent future repetition.

---
Cross-Project Knowledge

The AI-OS may be reused across different products.

Therefore:

Store only reusable knowledge.

Avoid:

This product uses React.

Prefer:

Technology choices should be documented explicitly per project.

---
Relationship With Other Memory Files

conventions.md

Stores:

"What rules do we follow?"
---
glossary.md

Stores:

"What do concepts mean?"
---
learnings.md

Stores:

"What have we learned?"
---
Final Principle

A strong organization does not only accumulate code.

It accumulates experience.

This document is the mechanism through which the AI organization becomes better over time.