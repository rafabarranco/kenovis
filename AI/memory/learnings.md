<!-- PROJECT-SPECIFIC: accumulates per-product knowledge. Reset the recorded entries when starting a new product, keep the rules. See .kenovis/AI/commands/init-project.md -->

AI Learnings

Version: 1.6
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
Example: Project — a command written for the old distribution mechanism keeps passing review because nobody re-reads it against the new one

## Learning-014

Date:
2026-08-08

Category:
Process

Context:
Giving an Installation its Product layer (`PRODUCT/ROADMAP.md` Phase 1 item 4), via `/next`. Choosing the next roadmap item surfaced that `.kenovis/AI/commands/init-project.md` — the command Phase 0's own Success Criteria are written around — could not execute in a repository created by `kenovis init`.

Problem:
The command's Trigger said "a fresh clone of this repository." Its Core Principle was "the example content is not a suggestion to follow. It is a shape to replace." Its pre-flight verification was `grep -rl "PROJECT-SPECIFIC" .`, and Steps 2-8 said things like "Keep the section structure. Replace every sentence about the example company." All of that was literally true when the only way to adopt Kenovis was to clone or fork this repository. After the CLI shipped, an Installation contains `.kenovis/`, a `CLAUDE.md` stub, and no Product-layer file at all — so the grep matched nothing and twelve Steps instructed an agent to rewrite files that did not exist. `AI/memory/` was not distributed either, though roughly twenty framework files reference the framework-level rules inside it.

What happened:
DECISION-017 and DECISION-018 replaced the distribution mechanism. Neither revisited the two commands that consume it. Both commands stayed internally coherent — they read correctly start to finish, and the reasoning inside each Step is still sound — which is why five releases of review never caught it. Nothing was self-contradictory; the contradiction was between the command and a world that had changed underneath it.

Root cause:
`/init-project` and `/adopt-project` are the only parts of this system whose correctness depends on the state of a repository the framework does not control, and that state is set by a different part of the system (the CLI). No test can reach them — they are markdown, executed by a human plus an LLM — and no CI check compares what the CLI writes against what the commands assume is present. The assumption was made once, in prose, and then became invisible.

Learning:
When a change replaces how an artifact reaches its consumer, the artifact's own instructions are inside the blast radius even when they never mention the mechanism. The question to ask is not "does this document contradict itself" but "does this document still describe the situation its reader will actually be in." A document written against a superseded mechanism reads perfectly and is wrong.

Future action:
When a decision changes the set of paths the CLI writes into a target repository — or stops writing one — walk `init-project.md` and `adopt-project.md` end to end against the resulting layout as part of that decision's own implementation, not as a follow-up. Concretely: after any change to `runInit`/`runAdd`/`runSync`'s written paths, re-read both commands' pre-flight checks, Steps and Completion Criteria and ask which of them assume a file the CLI no longer creates, or never did.

Example: Project — ship the fact inside the artifact instead of tracking it alongside

## Learning-013

Date:
2026-08-07

Category:
Architecture

Context:
Giving an Installation a record of which Framework Release it tracks (`PRODUCT/ROADMAP.md` Phase 1 item 3), via `/next`. `DOMAIN/DOMAIN_MODEL.md` had claimed since initialization that "an Installation tracks one Framework Release"; the code had no notion of a version at all.

Problem:
The obvious implementation was the one this codebase had already reached for twice: have the CLI write the version into `.kenovis/` at install time and add it to `INSTALL_TIME_OWNED_ENTRIES` — the registry of files `sync`'s mirror-replace must explicitly preserve or rewrite. That registry exists *because* two earlier files (`.setup-pending`, `.claude-md.sha256`) were written by one mechanism and silently invalidated by another (Learning-010, Learning-011).

What happened:
The version is a property of the Framework bundle, not of the act of installing it. Stamping it at build time — inside the bundle — means the mirror-replace that already copies the bundle installs and updates it for free. Nothing to preserve, nothing to rewrite, nothing to keep in sync. The CLI only reads it back. The entry that would have been the third member of `INSTALL_TIME_OWNED_ENTRIES` never needed to exist.

Root cause of the near-miss:
`INSTALL_TIME_OWNED_ENTRIES` is a good registry, and having it made adding a third entry feel like the correct, well-trodden path. But a registry of exceptions quietly invites more exceptions: the question it answers ("how does this file survive the mirror?") assumes the file must be written outside the mirror in the first place.

Learning:
Before adding to a registry of special cases, ask whether the new fact belongs to the artifact being copied rather than to the copier. A fact that ships inside a distributed artifact needs no synchronization rule, because it has exactly one writer — the build that produced it. This is the structural fix for the failure mode Learning-010 and Learning-011 each described after the fact: not better bookkeeping, but no second copy to keep books on.

Future action:
When a new file must exist inside a mirrored/replaced directory, first try to make the bundle ship it. Only when the value genuinely cannot be known at build time (it depends on the target, like `.setup-pending`'s greenfield/brownfield result, or on what was written, like `.claude-md.sha256`) does it belong in `INSTALL_TIME_OWNED_ENTRIES`. Record the reasoning at the constant itself, so the next contributor sees why a given file is or is not a member.

---
Example: Project — the fix for branch drift is itself a source of branch drift

## Learning-012

Date:
2026-08-07

Category:
Process

Context:
Promoting `development` → `preproduction` → `main` for the `kenovis@0.5.0` release (`PRODUCT/ROADMAP.md` Phase 1 item 2), via `/next`.

Problem:
The promotion chain had drifted again — `preproduction` and `main` each held commits `development` did not, so a rebase-merge would replay `development`'s 26 commits against content those branches already had under different hashes. The identical situation was hit and fixed during `kenovis@0.2.0` (PRs #23/#24) and again during `0.4.0` (PRs #33/#34), each time believed to be a one-off cleanup of historical drift.

What happened:
Both downstream branches were verified as strict, older snapshots: `git diff origin/main dceece7` (the 0.4.0 cut) was empty, and the same held for `preproduction`. No content divergence at all. The only unique commits on each were the synthetic "Sync X content with Y" commits produced by the previous promotion's own fix.

Root cause:
The content-sync fix creates one commit on the *downstream* branch that the upstream branch will never contain. That commit is precisely what makes the next promotion's rebase-replay diverge. Each application of the fix guarantees the next release needs it again — it is a steady state, not a cleanup. Calling it "a deliberate one-time trade" (as the 0.2.0 round did) was wrong: the trade recurs every release.

Learning:
A promotion chain of protected branches merged with "Rebase and Merge" only cannot stay history-aligned if any step ever introduces a downstream-only commit. Either every promotion is a true fast-forward, or the chain is permanently in content-sync mode. Kenovis is in the second mode, and that is fine — the branches are byte-identical after every promotion, which is the property that actually matters. What is not fine is rediscovering this each release and spending the investigation again.

Future action:
Treat the content-sync branch as the *standard* promotion procedure for this repository, not an exceptional repair. Each release: verify the downstream tree is a strict older snapshot (`git diff origin/<downstream> <last-release-cut-commit>` empty, nothing unique downstream), then `git read-tree -u --reset origin/<upstream>` on a `sync/<downstream>-to-<upstream>-<version>` branch, confirm `git diff origin/<upstream> HEAD` is empty, PR and rebase-merge. `read-tree --reset` is the correct primitive — `git checkout <ref> -- .` does not delete files removed upstream, which matters whenever a release moves or retires paths (as the `.kenovis/` migration did).

---
Example: Project — a guard's own bookkeeping outlives the state it described

## Learning-011

Date:
2026-08-07

Category:
Technical

Context:
Fixing Learning-010 (`sync` must preserve `.setup-pending` and the pending stub) via `/next`, `PRODUCT/ROADMAP.md` Phase 1 item 1.

Problem:
Tracing the pending → steady-state transition end to end surfaced a second, unreported defect: after `/init-project` or `/adopt-project` completed correctly, the very next `kenovis sync` refused with `ExistingClaudeMdError` on a `CLAUDE.md` those commands had just legitimately rewritten.

What happened:
Every install/sync records `.kenovis/.claude-md.sha256` — the hash of the stub the CLI wrote, i.e. the *pending* one. The commands' completion step deletes `.setup-pending` and reverts the stub to steady state, but never touched that sidecar, so the recorded hash described a file that no longer existed. `isClaudeMdSafeToOverwrite` correctly saw a mismatch and correctly refused — on a change Kenovis's own instructions had made.

Root cause:
The hash sidecar (Phase 0 item 7, closing Learning-007) was designed against "the customer edited CLAUDE.md" and never revisited against "a Kenovis command edited CLAUDE.md." Two mechanisms wrote the same file; only one of them maintained the record of what was written.

Learning:
A guard that compares against recorded state has two obligations, not one: detect foreign changes, and stay accurate across every *sanctioned* change. Any other actor allowed to modify the guarded file — including the framework's own markdown commands, which no compiler or test reaches — must update or invalidate that record in the same step. This is the same class of defect as Learning-010: state written by one part of the system, invisibly invalidated by another.

Future action:
When adding a recorded-state guard, enumerate every writer of the guarded file, framework commands included, and give each an explicit update-or-invalidate step. Cheapest correct option is usually invalidate (delete the record) and let the next CLI run re-record it, rather than teaching a markdown command to compute a hash.

---
Example: Project — `sync` silently disarms the first-session auto-trigger it never installed

## Learning-010

Date:
2026-08-07

Category:
Process

Context:
Smoke-testing the `.kenovis/` self-migration (DECISION-020, ROADMAP Phase 0 item 8) against a scratch brownfield repository: `kenovis add` → commit → `kenovis sync`, expecting an empty diff to confirm the relocated Framework layer bundles identically.

Problem:
The diff was not empty. `sync` deleted `.kenovis/.setup-pending` and rewrote `CLAUDE.md` from the pending stub back to the steady-state stub — silently disarming DECISION-018's first-session auto-trigger on an Installation that had never run `/adopt-project` yet.

What happened:
`runSync` mirror-replaces `.kenovis/` from the bundle, which correctly never contains `.setup-pending` (that marker is written by `runInit`, not shipped), then writes the stub unconditionally in its steady-state form. Neither step asks whether setup is still pending. A customer who installs and syncs before their first AI session loses the auto-trigger and is back to needing a manual `/init-project`/`/adopt-project` — the exact friction DECISION-018 existed to remove.

Root cause:
DECISION-018 designed the pending state as an `init`/`add`-time artifact and reasoned about the commands that *set* it. `sync` predates that marker and was never revisited against it — it treats `.kenovis/` as fully bundle-derived, which is true for every file except the two pieces of local state (`.setup-pending`, `.claude-md.sha256`) that install-time writes.

Learning:
Pre-existing, not a regression from this round — but it means "mirror-replace" and "local state living inside the mirrored directory" are in direct conflict. Any state the CLI writes into `.kenovis/` that is *not* part of the bundle needs an explicit preserve-or-recompute rule in `sync`, or the next sync erases it. `.claude-md.sha256` survives only because `sync` rewrites it after the mirror; `.setup-pending` has no such step.

Future action:
Backlog item, not fixed here (out of this migration's scope): `runSync` should preserve `.setup-pending` when it exists, and write the pending-form stub in that case, so syncing never advances an Installation past a setup it hasn't done. Verify against the smoke-test sequence above.

Closed 2026-08-07 via `/next` (ROADMAP Phase 1 item 1): `runSync` now does exactly that, and `INSTALL_TIME_OWNED_ENTRIES` (`cli/src/domain/installation.ts`) makes the general rule explicit — every CLI-written file inside `.kenovis/` is tagged `preserved` or `rewritten`, so the next one is not a third coincidence. Fixing it surfaced Learning-011, the same failure mode one layer up.

---
Example: Project — a packaging rule designed for "customer vs. framework" breaks on the one Installation where they're the same thing

## Learning-009

Date:
2026-08-06

Category:
Architecture

Context:
Starting DECISION-017's own deferred Phase 2 (this repository migrates its own Framework layer into `.kenovis/`, using the packaging rule already decided for every customer Installation) via `/next`.

Problem:
DECISION-017's B1 resolution — Kenovis's own explanatory README moves to `.kenovis/README.md`; the customer's own pre-existing root README is never touched — silently assumed those are always two different documents. Applied literally to this repository, it would hide this project's own GitHub/npm-facing landing page inside a directory GitHub doesn't auto-render, and replace this repository's hand-authored root `CLAUDE.md` (Role, Layers, Source Of Truth, graphify wiring) with the generic customer stub.

What happened:
This repository is the one Installation where "Kenovis's own explanation" and "the Installation's pre-existing content" are the same document — it is simultaneously the framework's origin and its own dogfooded product (DECISION-013). A packaging rule written for the general case (any two Installations have unrelated README/CLAUDE.md content) doesn't have a case for the specific Installation that authored the rule.

Root cause:
DECISION-017 was scoped and reasoned entirely from the perspective of a third-party customer's repository. It never asked "what happens when this rule is applied to the repository that IS the framework" — a blind spot that only surfaces when the self-referential case is actually attempted, not when the rule is merely described.

Learning:
When a packaging/distribution rule is designed by reasoning about "the customer," explicitly check whether the tool's own origin repository is itself a customer of that rule (true here, per DECISION-013's maximal-dogfooding stance) — and if so, walk the rule through that specific case before considering the design complete. A rule that's correct for every *other* Installation can still be wrong for the one that's self-referential.

Future action:
See DECISIONS.md DECISION-020 — root `README.md`/`CLAUDE.md` are now a documented, standing exception for this repository specifically. When designing a future rule that treats "the framework" and "an Installation" as distinct parties, add a checklist item: does this repository's own dual nature (framework origin + dogfooded product) break the assumption?

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

Closed by Learning-008: a recorded content hash replaces the prefix check as the primary signal.

---
Example: Project — a prefix check and a full-content hash answer different questions; know which one a guard actually needs

## Learning-008

Date:
2026-08-06

Category:
Engineering

Context:
Closing the backlog item Learning-007 scoped: replace the `isKenovisManagedClaudeStub` prefix check with something that also catches content appended below an otherwise-untouched CLAUDE.md stub, without breaking the normal upgrade path (a customer syncing across Framework Releases whose stub *wording itself* has changed between versions — DECISION-018 already changed it once).

Problem:
A full-content hash of the *current* version's `claudeStubContent()` output would have made every cross-version upgrade fail the guard — an Installation's on-disk CLAUDE.md was written by whatever version wrote it last, not necessarily the version now running `sync`, so its exact text can legitimately differ from what the current code would generate. Comparing "what's on disk" to "what we'd write today" conflates two different questions.

What was built:
`hashClaudeMdContent` hashes content (SHA-256) as a pure function; `isClaudeMdSafeToOverwrite(existingContent, recordedHash)` compares the on-disk file against a hash *recorded at the time it was written*, not against the current code's output. Every `init`/`add`/`sync` writes `.kenovis/.claude-md.sha256` alongside the CLAUDE.md stub, capturing exactly what that run wrote. The next run reads that sidecar (if present) and requires an exact match — byte-identical, so append is caught — before treating the existing file as safe to overwrite. No sidecar (an Installation from before this fix) falls back to the old prefix check, unchanged from today's behavior, until that Installation's next successful install/sync records one.

Root cause of the near-miss:
The initial instinct — "compare against what the current stub template generates" — reused the same shape of mistake the prefix check itself made: matching against a fixed reference is invisible to legitimate drift the reference itself doesn't yet know about (there, appended content after the marker; here, a stub written by an older code version). A hash *recorded at write time* rather than *computed from current code* sidesteps this because it never claims to know what content should look like — only whether today's file matches what was actually left there last.

Learning:
When replacing a weak "did we write this" check, ask what the new check's reference point is: the *current* code's output (breaks the moment that output legitimately changes across versions) or a *fact recorded at the time of the original write* (survives that same evolution because it never re-derives the expectation, it stores it). The second is more code (a sidecar to write and read) but is the only one that's actually correct across releases — the extra state was the point, not overhead to trim.

Future action:
None — this closes Learning-007. The remaining, explicitly accepted gap: an Installation that has never run install/sync under this fix has no recorded hash yet, so its very next sync still relies on the prefix check for that one transition, same limitation as before. Documented in `cli/README.md`'s Upgrading section rather than silently assumed away.

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

Closed by `kenovis@0.2.0`: `invalidFrameworkSourceEntries`/`InvalidFrameworkSourceError` (`cli/src/domain/installation.ts`) validate `--source` before `init`/`sync` touch anything. Built as an allowlist of the known Framework-bundle shape (`AI/`, `README.md`) rather than the blocklist of Product-layer names suggested above — a blocklist would have been a name-based rule, and no name-based rule may ever apply to a target repository, which may legitimately contain any name at all (DECISION-016). Noted here because the closure was never recorded when it shipped.

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

.kenovis/AI/policies/

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