<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

ROADMAP.md

Product Roadmap

Version: 1.31
---
Purpose

This document defines the strategic product evolution of the platform.

It establishes:

- What we build.
- When we build it.
- Why we build it.
- What we deliberately avoid.

The roadmap exists to protect product focus.
---
Product Vision

Kenovis matures into the default operating system a small team installs the moment it decides to build something real — giving that team, from day one, the specialized roles (product, architecture, security, design) it can't yet afford to hire.
---
Product Strategy

Single-segment-first, then land-and-expand across verticals. Phase 0-1 prove the CLI/template distribution model with software development teams (the only Vertical that exists). Phase 2 proves retention and layers the open-core paid tier. Phase 3 extends the same operating model to adjacent professional practices (legal, accounting). Phase 4 becomes shared infrastructure across verticals (marketplace of Agent Rosters, optional hosted layer).
---
Product Development Principles

Principle 1: Solve workflow problems

We do not build isolated features.

We build solutions to operational workflows.

Example:

Bad:

"Add [isolated feature]."

Good:

"[Reduce the time/friction of the actual workflow the user is trying to complete.]"
---
Principle 2: Build the minimum complete workflow

A feature is not complete when a screen exists.

A workflow is complete when the user can achieve their goal.

Example:

Not complete:

- [Single screen in isolation.]

Complete:

- [Full sequence of steps the user needs, start to finish.]
---
Principle 3: Avoid premature expansion

Do not build for future markets before winning the first market.

The first customer segment provides the learning foundation.
---
Product Phases
---
Phase 0 — Foundation

Objective

Build Kenovis's own Product layer (this document set) and a real CLI installer/sync tool for distributing the Framework layer.

Duration

Not yet estimated.

Users

Internal — Kenovis dogfoods itself on this repository.

Goal

Build the minimum CLI tooling required to install and sync the AI-OS into an external repository.
---
Deliverables

Technical:

- CLI command that scaffolds the Framework layer (AI/, CLAUDE.md, README.md) into a target repository.
- CLI install command detects whether the target repository is greenfield (empty or no real implementation) or brownfield (a real implementation already exists in the target repository) and points the installation at /init-project or AI/commands/adopt-project.md accordingly, instead of always assuming a blank slate.
- CLI command that syncs a newer Framework Release into an existing Installation without touching Product-layer files (RULE-INST-01).
- No database, no authentication, no hosted service (DECISION-013).

Documentation:

- Domain model (done — see DOMAIN/DOMAIN_MODEL.md).
- Architecture (done — see ENGINEERING/ARCHITECTURE.md).
- Development standards (existing AI/policies/, unchanged by this initialization).
---
Success Criteria

A team outside Kenovis can install the CLI, get the Framework layer into their repository, and complete /init-project (greenfield) or /adopt-project (brownfield, existing codebase) with their own real answers — end to end, without help.
---
Phase 0 — Immediate Priority (added 2026-08-05, from /analyze on distribution friction)

Founder-flagged blocker: today, "installing" Kenovis means manually copy-pasting this repo's structure into a target repository, and adopting an existing product means copy-pasting the customer's own code into this repo's own implementation directory to run /adopt-project — backwards from how a real install should work, and not viable for "usable by anyone." This is the highest-priority work in Phase 0, ahead of any other Phase 0/1 item, until all three land.

Execute in this order:

1. DONE (2026-08-05) — Architecture decision: Framework layer physical packaging (visible/invisible footprint).

Ran /architect. Decided: CLI writes the Framework layer under `.kenovis/` in the target repository (hidden, dot-directory convention); `CLAUDE.md` (stub) and `.claude/` stay at repo root, forced by Claude Code autoload; the target repository's own existing `README.md` is never touched by install or sync — Kenovis's explanatory README lives at `.kenovis/README.md` instead. Product layer stays fully visible at repo root, unchanged. See DECISION-017. `ENGINEERING/ARCHITECTURE.md` → "Hard Rules" now states this explicitly for item 3 to build against.

2. DONE (2026-08-05) — Fix /adopt-project's install-direction assumption.

AI/commands/adopt-project.md Trigger/Step 1 assumed the customer's code already sat inside this repo's own implementation directory. Fixed via /next: no Installation is required to have any particular directory name for its code — adoption never relocates the customer's implementation, and ENGINEERING/ARCHITECTURE.md (not a separate per-implementation README) is the single place that documents where it lives. See DECISION-016 (supersedes DECISION-015). Manual adoption (hand-copying AI/ + CLAUDE.md into an existing repo) is unblocked today, without waiting on item 3.

3. IN PROGRESS (2026-08-05) — Build the CLI installer/sync tool.

Per this Phase 0's existing "Deliverables" above and ENGINEERING/ARCHITECTURE.md's already-specified layering (Node.js/TypeScript, npm/npx, filesystem-only, RULE-INST-01/02). Applies the `.kenovis/` packaging decision from item 1 (DECISION-017), and the never-relocate-customer-code / no-mandatory-directory-name rule from item 2 (DECISION-016).

Slice 1 shipped via /next: the `init` command's install engine (cli/src/domain, application, infrastructure, cli — see cli/README.md). `kenovis init <targetDir> --source <frameworkSourceDir>` writes `.kenovis/` + a `CLAUDE.md` stub, never touches an existing target `README.md`, refuses to reinstall over an existing `.kenovis/` without `--force`.

Slice 2 shipped via /next: `cli/scripts/bundle-framework-assets.mjs` bundles this repository's real Framework layer (`AI/` minus `memory/`) plus a newly hand-authored, customer-facing `cli/assets/framework/README.md` (distinct from this repository's own root README.md, which mixes Kenovis-specific detail unsuitable for verbatim distribution) into `dist/framework-assets/` at build time. `kenovis init <targetDir>` now works with zero required flags — `--source` is optional, defaulting to the bundled assets. 15 tests total (unit + real-filesystem integration + CLI arg parsing), manually smoke-tested end to end with and without `--source`.

Slice 3 shipped via /next: greenfield vs. brownfield auto-detection. `runInit` lists the target directory's top-level entries before installing (`FileSystemPort.listDir`, implemented for both `NodeFileSystem` and `InMemoryFileSystem`) and filters out trivial/framework-owned names (`.git`, `README.md`, `LICENSE`, `.kenovis`, `CLAUDE.md`, `.claude`, ...) via `cli/src/domain/installation.ts` → `detectInstallationKind`. Anything left over is cited as evidence and `kenovis init` now prints an evidence-based suggestion — `/adopt-project` with the actual files found, or `/init-project` when nothing real is there — instead of always naming both options. Filesystem-only, never inspects file contents or executes target-repo code (ENGINEERING/ARCHITECTURE.md Hard Rules). 23 tests total, manually smoke-tested end to end against both an empty and a `package.json`+`src/`-seeded scratch directory.

Slice 4 shipped via /next: the `sync` command. `runSync` (`cli/src/application/commands/sync.ts`) requires an existing `.kenovis/` (else `NotInstalledError` pointing at `init`), then mirror-replaces it — `FileSystemPort.removeTree` (new port method, implemented for both `NodeFileSystem` and `InMemoryFileSystem`) followed by `copyTree` — so files removed in a newer Framework Release are actually deleted from the target, not just left stale, and rewrites the `CLAUDE.md` stub. Only `.kenovis/` and the stub are ever touched; RULE-INST-02's reversibility requirement is satisfied by the target's own git history (`.kenovis/` is git-tracked in the customer's repo, so the in-place mirror is reviewable via `git diff` and revertible via `git checkout`) rather than a CLI-side diff preview, which stays deferred to Phase 2's "richer CLI update ergonomics." `kenovis sync <targetDir> [--source <dir>]`, no `--force` (sync's whole point is to overwrite the Framework layer). 33 tests total, manually smoke-tested end to end: init → sync with a different `--source` correctly added a new file, updated a changed file, deleted a stale file, and left the target's `README.md` untouched throughout.

Slice 5 shipped via /next: npm publish wiring. `cli/package.json` gained publish-readiness metadata (`repository`, `homepage`, `bugs`, `keywords`, `prepublishOnly` guard) and `.github/workflows/publish.yml` — triggered by a published GitHub Release, SHA-pinned, builds/tests/typechecks, verifies `cli/package.json`'s version matches the release tag, then `npm publish --provenance --access public` from CI only, per ENGINEERING/SECURITY.md's Supply-Chain Security requirement. `.github/workflows/ci.yml` gained a `cli-tests` job (build/typecheck/test on every push/PR) — previously `cli/` had zero CI coverage. See `cli/README.md` → "Cutting a release" for the tag/release steps.

DONE (2026-08-05) — first publish. `kenovis@0.1.0` is live on the npm registry (published from CI via `.github/workflows/publish.yml`, triggered by the `v0.1.0` GitHub Release on `main`, with provenance). `npx kenovis init` now works for any external repository.

DONE (2026-08-06) — second publish. `kenovis@0.2.0` closes the `--source` footgun found during Learning-004 smoke testing (`init`/`sync` now validate `--source` before touching anything) and documents `npx kenovis init`/`sync` in the root README's "Getting started" section. `CHANGELOG.md` cuts the framework layer's first versioned release, `[0.2.0]`, aligned with the npm package version rather than a separate number — the framework ships embedded inside the `kenovis` package, not through an independent channel.

DONE (2026-08-06) — third publish. `kenovis@0.3.0` ships DECISION-018 (`kenovis add`, auto-trigger `init-project`/`adopt-project`, cross-detection refusal, bare autodetect dispatch) and DECISION-019 (Collision Guard against silent Product-layer overwrite) together — both had landed on `development` since 0.2.0 but not yet been promoted through `preproduction`/`main` or tagged. `CHANGELOG.md` cuts `[0.3.0]`. Also the first release validated end to end by a real external team (see Phase 1 → "Real External Validation" below), not just this repository's own smoke tests.

Dependencies: none remaining. All three Phase 0 "Immediate Priority" items are complete.

4. DONE (2026-08-06) — Architecture decision and CLI implementation, both shipped via /next. (added 2026-08-06, from /analyze on install-flow friction, founder-flagged highest priority — ahead of Phase 1) — Auto-trigger `/init-project` / `/adopt-project` without a manual slash-command step, plus a new `kenovis add` command, cross-detection errors, and a bare `kenovis` autodetect dispatch.

Ran /architect. Decided (DECISION-018): the `CLAUDE.md` stub the CLI writes becomes parametrized by installation kind and a pending/steady-state flag — while a new `.kenovis/.setup-pending` marker file exists, the stub opens with an imperative directive to run `/init-project` or `/adopt-project` before anything else in the session; `init-project.md`/`adopt-project.md` delete the marker and revert the stub on their own completion. No AI-tool binary is ever shelled out to (would have broken DECISION-010's tool-agnosticism). `kenovis init` now refuses (not just suggests) on a detected-brownfield target without `--force`, pointing at the new `kenovis add`; `add` refuses symmetrically on greenfield; bare `kenovis` autodetects and dispatches. See DECISION-018 for the full options analysis and `ENGINEERING/ARCHITECTURE.md` → Hard Rules for the resulting enforceable rule.

Founder-flagged blocker: `npx kenovis init` today scaffolds `.kenovis/` correctly but only prints a suggestion ("Next: run /init-project") — the customer must still manually type the slash command in a separate step. Root cause found by /analyze: this repository's own root `CLAUDE.md` carries a "Session Initialization Protocol" precondition (placeholder product layer → stop → run `/init-project`) that makes this repository self-trigger, tool-agnostically, on any AI agent's first session — but `cli/scripts/bundle-framework-assets.mjs` only bundles `AI/` (minus `memory/`), never this repository's own root `CLAUDE.md`, so the customer's installed `AI/SYSTEM.md` never carries that trigger. Explicitly rejected as a fix: shelling out to a `claude` binary at install time — breaks DECISION-010 tool-agnosticism (this framework is distributed as plain markdown any AI tool can read, per `cli/assets/framework/README.md` → "Tool compatibility"), and both commands are conversational (they ask the human, refuse to invent answers) so no script can execute them without an LLM in the loop anyway.

Target design (needs an ADR via /architect before implementation, same pattern as DECISION-016/017): (a) the `CLAUDE.md` stub `kenovis init`/`kenovis add` writes carries an imperative first-session directive — run init-project or adopt-project now, with the greenfield/brownfield result the CLI already computed (`detectInstallationKind`, `cli/src/domain/installation.ts`) embedded, so no agent re-detection or manual command is needed; (b) new `kenovis add` command, same install engine as `init`, wired to adopt-project instead; (c) cross-detection errors — `init` on a detected-brownfield target refuses to install and points at `kenovis add`; `add` on a detected-greenfield target refuses and points at `kenovis init`; both bypassable with `--force`; (d) bare `npx kenovis` (no subcommand) detects the target directory itself and dispatches to `init` or `add` internally — never errors, since it chooses.

Open risk to resolve in the ADR: `init` refusing to install on brownfield without `--force` is a breaking change from today's always-install-plus-suggest behavior. Resolved: shipped as a documented breaking change in `CHANGELOG.md`'s `[Unreleased]` section, not silently.

CLI implementation shipped: `cli/src/domain/installation.ts` gained `BrownfieldDetectedError`/`GreenfieldDetectedError`, `SETUP_PENDING_FILENAME`, `setupPendingContent`, and `claudeStubContent` became a `{ pending, kind }`-parametrized state machine. `cli/src/application/commands/init.ts` gained `invokedAs: "init" | "add"` and the cross-detection refusal; `add.ts` (new) is a thin `runInit` wrapper. `cli/src/cli/bin.ts` gained the `add` subcommand and a bare-invocation autodetect dispatch. `AI/commands/init-project.md` Step 12 and `adopt-project.md` Step 13 now delete `.kenovis/.setup-pending` and revert the stub on completion; `AI/SYSTEM.md` → "Context Loading Rules" checks for the marker. 25 new/updated tests (58 total in `cli/`), manually smoke-tested end to end (greenfield/brownfield `init`, `add`, `--force` bypass, bare dispatch). Smoke testing itself found and fixed a footgun — an unrecognized flag like `--help` fell through to the bare autodetect path and ran a real install against cwd; `main()` now checks `--help`/`-h` first. Recorded as `AI/memory/learnings.md` Learning-005.

5. DONE (2026-08-06, via /next) — Guard Product-layer files against silent overwrite during /init-project and /adopt-project, mirroring the ExistingClaudeMdError pattern.

Gap found: `CLAUDE.md` is the only file Kenovis writes that has a code-level collision guard (`isKenovisManagedClaudeStub`/`ExistingClaudeMdError`, `cli/src/domain/installation.ts`). The Product-layer files `/init-project` and `/adopt-project` write (`COMPANY_OS.md`, `DECISIONS.md`, `DOMAIN/DOMAIN_MODEL.md`, `DOMAIN/BUSINESS_RULES.md`, `PRODUCT/*.md`, `ENGINEERING/*.md`, `AUTOMATIONS/*.md`) have no equivalent guard — protection is textual only ("How To Recognise The Product Layer": grep the `PROJECT-SPECIFIC` marker), never enforced as a gate before writing. If a target repository already has its own file at one of those exact paths, unrelated to Kenovis, the agent can silently overwrite it while following the command's own instructions.

A rename-the-injected-file approach was considered and rejected: infeasible for `CLAUDE.md` (Claude Code only autoloads that literal filename at repo root — DECISION-010), and for the rest would require a persisted name-mapping manifest that no part of the system has today, plus updating the 23 framework files that reference these paths by hardcoded name — disproportionate to the problem.

Target design (no ADR needed — a command-instruction change, not an architecture decision): each Step in `init-project.md`/`adopt-project.md` that rewrites a Product-layer file first checks whether that file already exists without the `PROJECT-SPECIFIC` marker. If so, stop and ask the human to confirm before overwriting (or move it aside) — the same resolution `ExistingClaudeMdError` already gives for `CLAUDE.md`, applied as an explicit gate instead of an informational aside.

Shipped: `AI/commands/init-project.md` (1.5 → 1.6) and `AI/commands/adopt-project.md` (1.4 → 1.5) each gained a "Collision Guard" section (placed after "How To Recognise..."), referenced by every Step that rewrites a Product-layer file (init-project.md Steps 2-7, adopt-project.md Steps 3-8) instead of repeating the full check seven times per command. Both commands' Completion Criteria gained "No unmarked pre-existing file was overwritten without the human confirming." See DECISION-019.

6. DONE (2026-08-06, via /next) — added 2026-08-06, from /analyze on the v0.1.0/v0.2.0 → v0.3.0 upgrade path, founder-flagged maximum priority — ahead of any other Phase 0/1 item.

Founder-flagged blocker: `/analyze` on "what happens to a customer already running kenovis@0.1.0 or kenovis@0.2.0 when they upgrade to 0.3.0" found the underlying `sync` mechanics are sound (mirror-replace since the 0.3.0 fix, never touches Product-layer or the customer's own code — RULE-INST-01/02), but three real gaps sit around that mechanism:

- No version-discovery path. Nothing in the CLI or the installed `.kenovis/` tells an existing customer a newer Framework Release exists — `sync` works correctly only if someone already knows to run it. `cli/README.md` has no "Upgrading" section documenting the steps (reinstall the CLI, run `kenovis sync <targetDir>`, review with `git diff`).
- `sync.ts` (`runSync`) rewrites the target's root `CLAUDE.md` via an unconditional `writeFile`, with no `isKenovisManagedClaudeStub` check — unlike `init`/`add`, which refuse via `ExistingClaudeMdError` when the existing file isn't Kenovis's own. This is the exact asymmetry `AI/memory/learnings.md` Learning-006 already found and fixed for `init`'s `--force` path, but the fix was never carried over to `sync`. A customer who added their own notes to `CLAUDE.md` (plausible — COMPANY_OS.md's Ideal Customer Profile is developers already fluent in agentic tooling) loses them silently on the next `sync`, protected only by "review your `git diff` before committing," which nothing enforces.
- No end-to-end smoke test exists for the real upgrade path itself. `AI/memory/learnings.md` Learning-004 smoke-tested `kenovis@0.1.0` install/sync same-day against itself; nothing has smoke-tested installing an older published version (`kenovis@0.1.0` or `kenovis@0.2.0`) and then syncing it forward to a newer one — the exact sequence a real upgrading customer runs.

Founder decision (2026-08-06, via /next): `sync`'s `CLAUDE.md` behavior on divergence is reject-like `init`/`add` — refuse with the existing `ExistingClaudeMdError`, bypassable with `--force`. Chosen for symmetry with the already-shipped, already-tested `init`/`add` pattern rather than inventing a new resolution shape.

Shipped: `cli/README.md` gained an "Upgrading" section. `sync.ts` gained a `force?: boolean` option and the same `isKenovisManagedClaudeStub`/`ExistingClaudeMdError` check `runInit` already had, run before the mirror-replace so a rejected sync leaves `.kenovis/` untouched; `bin.ts`'s `sync` command now accepts `--force` and prints the same error shape as `init`/`add`. 8 new tests (in-memory unit + real-filesystem integration), 75 total in `cli/`, all passing, typecheck clean.

Real upgrade-path smoke test run: `npx kenovis@0.2.0 init` against a scratch git repository (own `README.md`, own `src/`) correctly detected brownfield and left both untouched; `kenovis sync` (local dev build as `--source`) then applied the 0.2.0 → dev-build diff cleanly (`AI/SYSTEM.md`, `init-project.md`, `adopt-project.md` picked up DECISION-018/019 content; `README.md`/`src/` untouched; `CLAUDE.md` unchanged, confirming idempotency) — the documented upgrade path works as described.

The smoke test also found a real, previously-undocumented gap, not a regression from this change: `isKenovisManagedClaudeStub` checks only the file's first line, so a customer who *appends* their own notes below Kenovis's existing stub content (marker line untouched) still loses those notes silently on `sync` — the new guard only catches a `CLAUDE.md` that isn't Kenovis-managed at all, e.g. authored independently before adopting Kenovis. `init`/`add` have carried this exact gap since it was introduced (Learning-006); this round didn't introduce it, but did discover and document it via the smoke test that was this item's own scope. Recorded as `AI/memory/learnings.md` Learning-007; `cli/README.md`'s Upgrading section states the limitation explicitly rather than overstating the guard's coverage. Closing it properly (hash/diff the stub's known content instead of a prefix check, or require customer notes live in a separate file) is a follow-up, not done here — out of this item's scope, which was porting the existing guard pattern to `sync`, not redesigning it.

Dependencies: none remaining. All of Phase 0 item 6 is complete except the deferred version-discovery active check, which Phase 2 → New Capabilities already scopes separately (not blocking here — `cli/README.md`'s "Upgrading" section covers the same discovery gap today at near-zero cost, per that Phase 2 note).

7. DONE (2026-08-06, via /next) — close the Learning-007 follow-up: the CLAUDE.md guard's append-content blind spot.

Founder chose this as the next item once Phase 0 items 1-6 were confirmed complete and Phase 1's own success criteria already validated (no other unscheduled roadmap item existed) — see this session's /next run.

Shipped: `cli/src/domain/installation.ts` gained `hashClaudeMdContent`/`isClaudeMdSafeToOverwrite` and the `CLAUDE_MD_HASH_FILENAME` (`.kenovis/.claude-md.sha256`) sidecar, recorded by every `init`/`add`/`sync` alongside the stub it writes. The guard now compares the on-disk CLAUDE.md against that recorded hash — byte-identical or refuse — instead of only checking the marker line's prefix, so content appended below an otherwise-untouched stub is caught too. An Installation with no recorded hash yet (predates this fix) falls back to the old prefix check for its next transition only. 8 new tests (75 → 83 total in `cli/`), typecheck/build clean, real end-to-end smoke test (`kenovis init` → `sync` → append notes → `sync` refuses → `sync --force` overwrites) confirmed the exact Learning-007 scenario is now caught. Recorded as `AI/memory/learnings.md` Learning-008.

8. DONE (2026-08-07, via /next) — DECISION-017's own deferred Phase 2: this repository migrates its own Framework layer (`AI/agents/`, `AI/workflows/`, `AI/policies/`, `AI/commands/`, `AI/templates/`, `AI/SYSTEM.md`) into `.kenovis/AI/`, the same packaging every customer Installation already gets.

Founder chose this as the next item once Phase 0 items 1-7 were confirmed complete and Phase 1/2 had no other unscheduled, unblocked item — see this session's `/next` run. Starting the migration surfaced a gap DECISION-017 never resolved: this repository's root `README.md`/`CLAUDE.md` are simultaneously "Kenovis's own explanation" and "the Installation's pre-existing content" — the same two things DECISION-017's B1 resolution assumed were always different documents. Ran `/architect` before touching any file. See DECISION-020: root `README.md` and root `CLAUDE.md` are a documented exception, staying hand-authored at repo root; only the five `AI/` subdirectories plus `AI/SYSTEM.md` actually relocate. `ENGINEERING/ARCHITECTURE.md` → Hard Rules states the exception.

Migration shipped (2026-08-07, via /next): the six paths relocated into `.kenovis/AI/` with `git mv`; `AI/memory/` stayed at the repository root. Cross-references repointed in `README.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `.gitignore`, `.claude/commands/*.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/ISSUE_TEMPLATE/*.md`, `.github/scripts/check_changelog.py`, `COMPANY_OS.md`, `DOMAIN/`, `PRODUCT/`, `ENGINEERING/`, `AUTOMATIONS/`, `AI/memory/`, `cli/README.md`, two `cli/src` comments, and inside the relocated tree itself. `.github/scripts/check_markers.py` needed no change — every path it guards is Product layer, which did not move.

Scoping rule applied, worth stating because it recurs: navigational references (documents that tell a reader or agent where a file is *now*) were repointed; historical narrative in `DECISIONS.md`, `CHANGELOG.md` and this document's own completed entries was left as written, since those record what was true at the time. The one exception was a markdown *link* in `CHANGELOG.md`'s header — CI's `check_links.py` requires links to resolve, and a header is current-state, not history.

`cli/scripts/bundle-framework-assets.mjs` now sources from `.kenovis/AI/` and dropped its now-meaningless `memory/` exclusion. `.github/scripts/check_changelog.py`'s watched prefix became `.kenovis/AI/` — previously `AI/` also matched Product-layer `AI/memory/`, firing the changelog gate on changes it never covered.

Validated: 83 `cli/` tests pass, typecheck and build clean, `check_links.py` and `check_markers.py` pass, and the Learning-004 scratch-repo smoke test re-run against the post-migration bundle (brownfield `kenovis add` → commit → `kenovis sync`) left the target's own `README.md`, `src/` and `package.json` untouched and produced a byte-identical `.kenovis/AI/` on sync. That smoke test also surfaced a pre-existing gap unrelated to this migration — `sync` deletes `.kenovis/.setup-pending` and reverts the `CLAUDE.md` stub to steady state, disarming DECISION-018's first-session auto-trigger on an Installation that has not completed setup. Recorded as `AI/memory/learnings.md` Learning-010, left as a backlog item rather than fixed inside this item's scope.

Phase 0 is closed. All eight "Immediate Priority" items are DONE, and Phase 0's own Success Criteria were satisfied by the Real External Validation recorded under Phase 1 below. Work continues in the Phase 1 priority block that follows.
---
Phase 1 — Immediate Priority (added 2026-08-07, from /next after Phase 0 closed)

Two items, in this order. Neither is blocked. Ordering matters: item 1 lands a real customer-facing bug fix, item 2 packages it — doing them in this order means one release carries both instead of cutting two.

1. DONE (2026-08-07, via /next) — close Learning-010: `sync` disarms DECISION-018's first-session auto-trigger.

Found 2026-08-07 by the scratch-repo smoke test that closed Phase 0 item 8, not by a customer report. `runSync` mirror-replaces `.kenovis/` from the bundle — which correctly never ships `.kenovis/.setup-pending`, since `runInit`/`runAdd` write that marker at install time — and then rewrites `CLAUDE.md` in its steady-state form unconditionally. Neither step asks whether setup is still pending. A customer who installs and then syncs before their first AI session loses the auto-trigger and is back to typing `/init-project` or `/adopt-project` by hand: exactly the friction DECISION-018 was built to remove.

Pre-existing since `sync` and the pending marker were designed in separate rounds — `sync` predates the marker and was never revisited against it. Not a regression from the `.kenovis/` migration.

Target design (no ADR needed — this restores DECISION-018's already-decided behavior, it does not decide anything new): `runSync` detects `.kenovis/.setup-pending` before the mirror-replace, and if present, re-writes it afterwards and emits the pending-form stub instead of the steady-state one. Sync must never advance an Installation past a setup it has not completed.

Generalize while fixing, per Learning-010's own framing: "mirror-replace" and "local state living inside the mirrored directory" are in direct conflict. `.claude-md.sha256` survives today only because `sync` happens to rewrite it after the mirror. Any future CLI-written file under `.kenovis/` that is not part of the bundle needs an explicit preserve-or-recompute rule in `runSync`, or the next sync erases it silently. Make that rule explicit in code (a single named set of install-time-owned paths) rather than leaving it as two independent coincidences.

Validation: unit tests for both branches (pending present → preserved and pending stub written; pending absent → today's behavior unchanged), plus the smoke-test sequence that found it — `kenovis add` → commit → `kenovis sync` → assert `.setup-pending` still present and `CLAUDE.md` unchanged.

Priority rationale: Customer Pain is real but currently unreported (one external team so far, and it only bites the install-then-sync-before-first-session ordering); Frequency is low today; Implementation Cost is small and the fix is well understood. Scheduled ahead of item 2 because it is cheap and because shipping it first means the next release carries a fix rather than only a repository reorganization.

Shipped: `runSync` reads `.kenovis/.setup-pending` before the mirror-replace and, when present, rewrites it afterwards (canonically, via `setupPendingContent`, so a corrupted marker can never disagree with the stub's directive) and emits the pending-form stub instead of the steady-state one. `SyncResult` gained `setupStillPending`; `bin.ts` says so on stdout. The generalization the item asked for landed as `INSTALL_TIME_OWNED_ENTRIES` in `cli/src/domain/installation.ts` — a single named set of the files the CLI writes inside `.kenovis/` that the bundle never ships, each tagged `preserved` or `rewritten`, so the next such file is not a third silent coincidence. New `installationKindFromSetupPending` is the inverse of `setupPendingContent`; an unrecognised marker falls back to re-detecting the kind from the target rather than guessing. 12 new tests (83 → 95 total), typecheck and build clean.

Adjacent gap found while fixing, and fixed in the same round because it sits in the same pending → steady-state transition: `init-project.md`/`adopt-project.md` revert the `CLAUDE.md` stub on completion but never touched `.kenovis/.claude-md.sha256`, which still recorded the *pending* stub's hash — so the very next `kenovis sync` refused (`ExistingClaudeMdError`) to overwrite a `CLAUDE.md` those commands had just legitimately rewritten. Introduced by Phase 0 item 7's hash sidecar, which never revisited DECISION-018's completion step. Both commands now delete the sidecar alongside the marker; the next install/sync records it again. Recorded as Learning-011.

Validated: 95 `cli/` tests pass, typecheck and build clean, plus the smoke sequence that found the bug — `kenovis add` → commit → `kenovis sync` left `git status` completely clean (marker intact, stub unchanged, target's `README.md`/`src/`/`package.json` untouched) while still updating the Framework layer; and the completed-setup path (marker + sidecar deleted, stub reverted) syncs without refusing and stays in steady state.

2. DONE (2026-08-07, via /next) — promote `development` → `preproduction` → `main` and cut the next release.

`CHANGELOG.md`'s `[Unreleased]` had accumulated DECISION-020 and the `.kenovis/` self-migration since `kenovis@0.4.0`, plus item 1 above once it landed. Followed `AUTOMATIONS/release-process.md` and `cli/README.md` → "Cutting a release": PR through the protected branches, align `cli/package.json`'s version with the release tag, cut the `CHANGELOG.md` section, publish from CI via `.github/workflows/publish.yml` (GitHub Release triggered, provenance, never from a laptop — ENGINEERING/SECURITY.md → Supply-Chain Security).

Version call, decided at cut time: **minor, `kenovis@0.5.0`**, not patch. Patch was defensible on the CLI side alone — item 1 is a bug fix and the `.kenovis/` migration does not change the published package's shape — but this package bundles the framework files themselves, and two of them changed behaviour for customers (`init-project.md`/`adopt-project.md` now delete `.kenovis/.claude-md.sha256` on completion, Learning-011). An Installation syncing to this release gets more than a CLI bug fix, so minor. Reasoning recorded in `CHANGELOG.md`'s `[0.5.0]` header, per this item's own instruction not to decide by habit.

Dependency: item 1 first, so a single release carries both. Satisfied — item 1 merged (PR #37) before the release branch was cut.

Shipped: `cli/package.json`/`package-lock.json` 0.4.0 → 0.5.0, `CHANGELOG.md` `[Unreleased]` cut into `[0.5.0] - 2026-08-07`. Promoted `development` → `preproduction` → `main` (PRs #38, #39, #40) and published `kenovis@0.5.0` from CI with provenance; verified live on the registry (`npm view kenovis version` → `0.5.0`).

Recurring cost found and named: the promotion needed the same content-sync branch procedure used for `kenovis@0.2.0` and `0.4.0`, which each round had treated as a one-off repair of historical drift. It is not — the sync commit that fix creates lives only on the downstream branch, which is exactly what makes the next rebase-replay diverge. The chain is permanently in content-sync mode, and that is acceptable (branches end byte-identical, which is the property that matters). Recorded as `AI/memory/learnings.md` Learning-012 with the exact procedure, so future releases follow it instead of re-investigating.

The two items this block opened with are DONE. The block itself stayed open: items 3, 4 and 5 below were scheduled into it by later `/next` runs, each chosen against this document's own priority formula rather than from Phase 1 MVP / Phase 2.

3. DONE (2026-08-07, via /next) — an Installation records which Framework Release it tracks.

Founder chose this as the next item once Phase 0 and the Phase 1 Immediate Priority block were both confirmed closed and no scheduled, unblocked item remained — see this session's `/next` run. Candidates weighed against this document's own priority formula: this item, a `/framework-review` audit pass of the post-migration Framework layer, and the ADR gating the Phase 2 paid tier (judged premature — Phase 1 has one external team's data, not enough to size it).

Gap found: `DOMAIN/DOMAIN_MODEL.md` defines the Installation entity with "framework version installed" among its attributes and states "an Installation tracks one Framework Release (the one currently synced)" — while `cli/src/domain/installation.ts` contained no notion of a version at all. The central attribute of the domain's central entity existed only in prose. Concretely: a customer could not tell which release they were on without archaeology in their own `git log`, and `sync` could only mirror-replace silently, never say what it had changed.

Shipped: `cli/scripts/bundle-framework-assets.mjs` stamps `dist/framework-assets/.framework-version` from `cli/package.json` at build time. The stamp therefore ships *inside* the bundle, so `init`/`add`/`sync`'s existing mirror-replace installs and updates it by construction — the CLI reads it back (`readFrameworkVersion`, `cli/src/application/frameworkVersion.ts`; `parseFrameworkVersion` in the domain) and never writes a second copy. This is deliberately *not* an `INSTALL_TIME_OWNED_ENTRIES` member, and `installation.ts` says so at that constant: state written by one mechanism and invisibly invalidated by another is precisely the recurring defect Learning-010 and Learning-011 record, and a bundle-shipped fact has no second writer to desynchronise from. `bin.ts` prints the release on install and the transition on sync (`0.3.0 -> 0.5.0`, `(already up to date)`, or `unknown -> …`), and gained `--version`/`-v`, checked before dispatch alongside `--help` (Learning-005).

Scoped out deliberately: the active version-check against the npm registry stays in Phase 2 → New Capabilities, unchanged. That item was deferred on network-dependency cost, which this item does not incur — it is the local half of the same discovery gap, and it is also the prerequisite that check would have needed anyway (nothing to compare against existed before).

Validated: 108 `cli/` tests pass (95 → 108), typecheck and build clean, and a real scratch-repository smoke test — brownfield `kenovis add` (stamp lands on disk, reported), stamp hand-set to `0.3.0`, `kenovis sync` (reports `0.3.0 -> 0.5.0`, stamp updated), sync again (reports `already up to date`), with the target's own `README.md`, `src/` and `package.json` untouched and `.setup-pending` preserved throughout.

Two stale documentation statements were corrected in the same round, both in the sections this item was already rewriting: `cli/assets/framework/README.md` (the file customers receive at `.kenovis/README.md`) still told them `kenovis sync` did not exist yet, and `cli/README.md` → Structure still described the bundler's pre-`.kenovis/` source path.

4. DONE (2026-08-08, via /next) — an Installation receives its Product layer from Framework templates.

Founder chose this as the next item after the Phase 1 Immediate Priority block closed. Candidates weighed against this document's own priority formula: this item, the active npm-registry version check (Phase 2 → New Capabilities, still deferred on network-dependency cost and unvalidated Pain), and the ADR gating the Phase 2 paid tier (still premature — one external team's data).

Gap found: `kenovis init`/`add` write `.kenovis/`, the root `CLAUDE.md` stub and its hash sidecar, and nothing else. No Product-layer file is ever created. But `.kenovis/AI/commands/init-project.md` was written against a fork of this repository — its Trigger said "a fresh clone of this repository", its Core Principle was "the example content ... is a shape to replace", its pre-flight check was `grep -rl "PROJECT-SPECIFIC"` (which matches nothing in a real Installation), and Steps 2-8 instructed the agent to *rewrite* twelve files that do not exist. `adopt-project.md` shared the same framing. Both commands predate the CLI; DECISION-017/018 changed the distribution mechanism without either command being revisited against what an Installation now contains.

Worse, `AI/memory/` was not distributed at all, and part of it is framework content, not product content. `AI/memory/learnings.md` says so on its own first line: the rules are framework-level, the recorded learnings are product-specific. Those rules — the Learning Philosophy, the format, the categories, the Review Process that promotes a learning into `.kenovis/AI/policies/` — are referenced by roughly twenty framework files, including `next.md` Step 14, eight workflows, three policies and three templates. Every one of them pointed at a file no Installation had.

This sat directly on Phase 0's own Success Criteria above ("complete /init-project ... end to end, without help").

Founder decision (2026-08-08, via /next): the Framework bundle carries the Product layer as templates; the CLI's install footprint does not change. Option A — having `init`/`add` write ~17 placeholder files into the target root — was rejected for reintroducing exactly the clutter DECISION-017 chose `.kenovis/` to avoid, and for multiplying DECISION-019's Collision Guard problem by seventeen while moving it from a conversational command (which can ask the human) into a non-interactive CLI (which cannot). See DECISION-021.

Shipped: `.kenovis/AI/templates/product-layer/` — seventeen templates plus a README, one per Product-layer document, at the path each maps to. Every template keeps its document's framework-level content verbatim and replaces the company-specific sections with a bracketed instruction stating what must be answered; none contains an invented answer or Kenovis's own. `init-project.md` (1.7 → 1.8) and `adopt-project.md` (1.6 → 1.7) gained a "Where The Shape Comes From" section and changed verb throughout — author from template, not rewrite a placeholder — with their pre-flight checks, `.gitignore` handling, Verify steps and Completion Criteria updated for an Installation that has no Product layer. `ENGINEERING/ARCHITECTURE.md` → Hard Rules (1.4 → 1.5) now states that the CLI never creates a Product-layer file at all, so the rule is enforceable rather than incidental.

Zero CLI code change, by construction: `cli/scripts/bundle-framework-assets.mjs` copies `.kenovis/AI/` entry by entry, so a new subdirectory of `templates/` ships automatically. This is the same structural property Learning-013 identified — a fact that ships inside the mirrored artifact needs no synchronisation rule, because it has exactly one writer.

Validated: the `cli/` test suite passes unchanged (95 on this item's own branch, 108 after merging item 3's work in), typecheck and build clean, `check_links.py` and `check_markers.py` pass, the bundler ships all eighteen files under `dist/framework-assets/AI/templates/product-layer/` with no script change, and a real scratch-repository smoke test confirmed the end state — brownfield `kenovis add` created no Product-layer file at the target's root, delivered every template under `.kenovis/`, left the target's own `README.md`, `src/` and `package.json` untouched, and a following `kenovis sync` preserved both the templates and `.setup-pending`.

The smoke test also caught a real defect in this item's own work, which is why it exists: the templates carry the `PROJECT-SPECIFIC` marker by design and live inside `.kenovis/`, so both commands' pre-flight `grep -rl "PROJECT-SPECIFIC"` matched all seventeen templates rather than returning nothing — contradicting the "zero matches is expected" sentence this same item had just written. Both greps now pass `--exclude-dir=.kenovis`. Any future marker-based check run from a target repository's root needs the same exclusion.

Two adjacent inconsistencies were found and fixed in the same round, both inside the sections this item was already rewriting. `DECISIONS.md` → "Document Layers" said "Seven are framework-level" while listing eight, and its claim that those eight "should be carried over" contradicted `init-project.md` Step 3, which named only three. Resolved per DECISION-021: a customer's log starts empty, and this repository is the documented exception because its product *is* the framework (the same self-referential carve-out DECISION-020 established). `DOMAIN/BUSINESS_RULES.md` → Edge Case Thinking (1.1 → 1.2) listed "an Installation still holding placeholder content" as the edge case to design for, which has never been true of a CLI Installation — the real edge case is an Installation with no Product layer at all.

5. DONE (2026-08-08, via /next) — promote `development` → `preproduction` → `main` and publish the release carrying items 3 and 4.

Chosen as the next item because items 3 and 4 are both merged to `development` (PRs #42, #43) and reach no customer until published — the same packaging step Phase 1 item 2 performed for `kenovis@0.5.0`, deliberately carrying both items in one release rather than cutting two. No other scheduled, unblocked item exists: Phase 2's active npm-registry version check stays deferred on network-dependency cost and unvalidated Pain, and the paid-tier ADR stays premature on one external team's data.

Version call, decided at cut time: **minor, `kenovis@0.6.0`**, not patch. Both halves of the package gain capability — the CLI records and reports a fact it never tracked (`.kenovis/.framework-version`, plus `--version`), and the bundled framework gains the seventeen Product-layer templates that make `/init-project` and `/adopt-project` executable in a real Installation for the first time (DECISION-021). Nothing breaks for an existing Installation. Reasoning recorded in `CHANGELOG.md`'s `[0.6.0]` header, per Phase 1 item 2's own instruction not to decide this by habit.

Procedure: `AUTOMATIONS/release-process.md` and `cli/README.md` → "Cutting a release", with the content-sync promotion Learning-012 established as this repository's *standard* procedure (verify each downstream branch is a strict older snapshot, `git read-tree -u --reset` from upstream on a `sync/` branch, confirm an empty diff, PR and rebase-merge). Published from CI via `.github/workflows/publish.yml` on a GitHub Release — never from a laptop (ENGINEERING/SECURITY.md → Supply-Chain Security).

Shipped: `cli/package.json`/`package-lock.json` 0.5.0 → 0.6.0, `CHANGELOG.md` `[Unreleased]` cut into `[0.6.0] - 2026-08-08` (PR #44). Both promotions ran exactly as Learning-012 prescribes and needed no investigation this round — each downstream branch verified as a strict older snapshot against the 0.5.0 cut (`52b844f`), tree set with `read-tree -u --reset`, empty diff confirmed before opening the PR (PRs #45, #46). All three branches are byte-identical. `kenovis@0.6.0` published from CI with provenance; `npm view kenovis version` → `0.6.0`, `dist-tags.latest` → `0.6.0`.

Validated against the *published* package, not a local build: `npx kenovis@0.6.0 add` on a scratch brownfield repository reported `Framework Release: 0.6.0`, delivered all eighteen template files under `.kenovis/`, created no Product-layer file at the target's root, and left its `README.md`, `src/` and `package.json` untouched; `npx kenovis@0.6.0 --version` printed `0.6.0`; a following `sync` reported `0.6.0 -> 0.6.0 (already up to date)`, preserved `.setup-pending`, and left `git status` completely clean. No new gap surfaced — nothing recorded as a learning this round.

Solo-maintainer note, unchanged from previous releases: all three PRs came back blocked on the required-review rule, which never counts self-approval, and were merged with `gh pr merge --rebase --admin` after founder confirmation. Not a misconfiguration.

6. DONE (2026-08-09, via /next) — execute `/init-project` end to end against a real published Installation, and fix what breaks.

Founder chose this as the next item once Phase 0 and Phase 1 items 1-5 were confirmed closed and no scheduled, unblocked item remained. Candidates weighed against this document's own priority formula: this item, a `/framework-review` audit pass (a quick check of the post-migration templates came back clean in the same session, lowering its expected yield), the active npm-registry version check (Phase 2, still deferred on network-dependency cost and unvalidated Pain), and the paid-tier ADR (still premature on one external team's data).

Gap found: the seventeen Product-layer templates shipped in `kenovis@0.6.0` (DECISION-021) had been validated for *delivery* only — item 4 and item 5's smoke tests confirmed the files land on disk in a real Installation and that nothing is written to the target's root. Nobody had *run* `/init-project` from one. The single real external validation on record (2026-08-06) predates the template mechanism entirely, so the path this product currently publishes had zero end-to-end validation. Pain is maximal if it breaks (activation is zero), Frequency is every install, Implementation Cost is a scratch-repository dry run.

What the run found, in the step it was always going to find it — Verify. Both commands checked for leftover template questions with `grep -rn "^\["`. Against this repository's own completed Product layer that returns 29 matches and zero real ones, and it misses 8 genuine questions that sit mid-line, including the whole `### [Entity]` block in `DOMAIN/DOMAIN_MODEL.md`. A ninth case had no bracket at all: `ENGINEERING/ARCHITECTURE.md`'s six required Technology Stack lines shipped as bare labels. Both Completion Criteria were unsatisfiable as written. See DECISION-022 and `AI/memory/learnings.md` Learning-015.

Shipped: `[ANSWER: ...]` is now the only bracket form meaning "unanswered question"; plain brackets are reserved for format specifications, illustrative examples and deliberate "nothing recorded yet" statements, which legitimately survive. 110 instructions converted across 13 templates (each bumped a minor version) — the count was written as "15" until item 7's release smoke test counted the changed files, see Learning-016 — both commands' Verify step and Completion Criteria rewritten, and `.kenovis/AI/templates/product-layer/README.md` (1.0 → 1.1) documents which form to use when — including the limitation that nothing mechanically stops a future author choosing the wrong one, for the reason DECISION-022 → Option C gives.

Deliberately not built: a CI guard asserting this repository's own Product layer stays free of `[ANSWER:` markers. It would pass trivially and forever — the real regression risk is a future template question written with a plain bracket, and distinguishing that from a legitimate survivor is precisely what no pattern can do.

Validated: the fixed bundle installed into a fresh scratch Installation delivers all eighteen template files with 113 `[ANSWER:` markers intact; copying them in unanswered makes Verify report 110 questions, including all 13 that the old anchored check could not see; two documents then authored for real from their templates (`DOMAIN/DOMAIN_MODEL.md`, `DOMAIN/BUSINESS_RULES.md`) report zero, while their four format-specification brackets — which the old check would have flagged — are correctly left alone. Against this repository's own Product layer the new check returns ten matches, all of them this decision's and this entry's own prose quoting the marker while explaining it, and none an unanswered question — the DECISION-020/021 self-referential carve-out, noted in DECISION-022 → Consequences. A customer Installation returns zero, so the Completion Criterion is satisfiable where it is enforced. 108 `cli/` tests pass, typecheck and build clean, `check_links.py` and `check_markers.py` pass. No CLI code changed.

7. DONE (2026-08-09, via /next) — promote `development` → `preproduction` → `main` and publish the release carrying item 6.

Chosen as the next item because item 6 is merged to `development` and reaches no customer until published — the same packaging step Phase 1 items 2 and 5 performed for `kenovis@0.5.0` and `0.6.0`. Against this document's own priority formula the case is unusually strong: Customer Pain is maximal (every 0.6.0 Installation that runs `/init-project` today hits a Verify step that reports 29 false positives and misses 13 real questions, with a Completion Criterion that cannot be satisfied), Frequency is every install, Business Impact lands directly on the North Star's activation half (`init-project` completion rate), and Implementation Cost is a documented procedure. No other scheduled, unblocked item exists: the active npm-registry version check stays deferred on network-dependency cost and unvalidated Pain, the paid-tier ADR stays premature on one external team's data, and `/framework-review`'s expected yield is low after item 6's own pass over the templates.

Version call, decided at cut time: **minor, `kenovis@0.7.0`**, not patch. Deliberately, not by habit, per Phase 1 item 2's standing instruction — and this round the habitual answer would have been patch. No CLI code changed at all; the entire release is framework content. But this package bundles those framework files, and fifteen templates changed content while `init-project.md`/`adopt-project.md` changed behaviour: an Installation syncing to this release gets a Verify step that reports something different from what it reported before. That is the same distinction `0.5.0` drew — more than a CLI bug fix, so minor. Reasoning recorded in `CHANGELOG.md`'s `[0.7.0]` header.

Procedure: `AUTOMATIONS/release-process.md` and `cli/README.md` → "Cutting a release", with the content-sync promotion Learning-012 established as this repository's *standard* procedure (verify each downstream branch is a strict older snapshot, `git read-tree -u --reset` from upstream on a `sync/` branch, confirm an empty diff, PR and rebase-merge). Published from CI via `.github/workflows/publish.yml` on a GitHub Release — never from a laptop (ENGINEERING/SECURITY.md → Supply-Chain Security).

Shipped: `cli/package.json`/`package-lock.json` 0.6.0 → 0.7.0, `CHANGELOG.md` `[Unreleased]` cut into `[0.7.0] - 2026-08-09` (PR #49). Both promotions ran exactly as Learning-012 prescribes and needed no investigation — each downstream branch verified as a strict older snapshot against the 0.6.0 cut (`69bae13`, empty diff, byte-identical to each other), tree set with `read-tree -u --reset`, empty diff confirmed before opening (PRs #50, #51). All three branches are byte-identical. `kenovis@0.7.0` published from CI with provenance; `npm view kenovis version` → `0.7.0`, `dist-tags.latest` → `0.7.0`.

Validated against the *published* package, on the path a real customer runs — `npx kenovis@0.6.0 add` on a scratch brownfield repository, then `npx kenovis@0.7.0 sync`. The sync reported `0.6.0 -> 0.7.0`, changed exactly 17 paths inside `.kenovis/` (the version stamp, both commands, thirteen templates and the templates' README), left the target's own `README.md`, `src/` and `package.json` untouched, and preserved `.setup-pending` so an Installation that had not completed setup keeps its first-session auto-trigger. A separate fresh `npx kenovis@0.7.0 add` delivered all eighteen template files with 113 `[ANSWER:` markers intact and created no Product-layer file at the target's root.

The fix itself was measured rather than assumed, per Learning-015's own future action: with every template copied in unanswered, the new check finds **110** real questions; the old anchored `grep -rn "^\["` on the same corpus returns 126 matches, of which **30 are false positives** (the deliberate "nothing recorded yet" statements, format specifications) while **14 real questions are invisible to it** because they sit mid-line. Both numbers reproduce against the published artifact, not a local build.

Correction made in the close: this item's own release prose, and item 6 above, said "110 instructions across 15 templates." The instruction count is exact; the file count was not — thirteen templates changed, plus the templates' `README.md`, which documents the convention rather than being a template. Corrected in `CHANGELOG.md` `[0.7.0]`, in item 6 above, and in the GitHub Release notes. Recorded as `AI/memory/learnings.md` Learning-016: the round that fixed a check nobody executed shipped a count nobody counted.
8. DONE (2026-08-09, via /next) — execute `/adopt-project` end to end against a real published Installation, and fix what breaks.

Founder chose this as the next item once Phase 1 items 1-7 were confirmed closed and no scheduled, unblocked item remained. Candidates weighed against this document's own priority formula: this item, the active npm-registry version check (Phase 2, still deferred on network-dependency cost and unvalidated Pain), the paid-tier ADR (still premature on one external team's data), and a `/framework-review` audit pass (expected yield low after item 6's own pass over the templates).

Gap found: item 6 ran `/init-project` from a real Installation for the first time and found a Verify step that had never been executed. `/adopt-project` had still never been run at all. The two commands share the seventeen templates but not their Steps — audit-first (Step 1), confidence tagging, decision-log reconstruction (Step 4), verify-by-contrast (Step 12), never-touch-the-customer's-code (Step 11) are unique to adoption — and brownfield is the majority path for this product's own segment, which DECISION-014 states explicitly ("most of whom are not starting from zero"). Pain is maximal if it breaks (activation is zero and nobody reports it), Frequency is every brownfield install, Implementation Cost is a scratch-repository dry run.

Method: a real brownfield fixture (a court-booking API — Express, SQLite, JWT auth, `club_id` multi-tenancy, role checks, GitHub Actions deploying to a host), `npx kenovis@0.7.0 add` against it, then Steps 1-13 executed as written, with no patching mid-run. The company answers Step 2 cannot get from code were supplied as a declared test fixture, not as a real Installation. The published bundle was confirmed byte-identical to this repository's own `.kenovis/AI/` before starting, so every finding applies to what customers actually have.

What the run found — and it was not in the Steps, which executed cleanly. Three of the seventeen templates carried Kenovis's own answers as unmarked prose. `ENGINEERING/SECURITY.md` asserted "Authorization Model: not applicable in v1 — no accounts, no shared backend", "Audit System: not applicable in v1 — no backend exists", and described the CLI writing to a customer's filesystem as the product's sensitive operation, citing `RULE-INST-01`/`02` — rule IDs from this repository's log, which no Installation has. `AUTOMATIONS/release-process.md` defined staging as "validate the CLI before publishing" and production as the published npm package. `AUTOMATIONS/user-feedback.md` named GitHub Issues as the feedback system of record. Authored against the fixture, the resulting security document denied that authorization applied to a product with an `admin_only` check — and Step 12's Verify passed it, because both commands grep for `[ANSWER:` and a leftover answer is precisely the thing that carries no marker. See `AI/memory/learnings.md` Learning-017.

Shipped: eleven `[ANSWER: ...]` instructions replace that content across the three templates (each 1.1 → 1.2); `AUTOMATIONS/customer-onboarding.md`, derived in the same original round, was already clean, which is why this is recorded as inconsistent execution of an existing rule rather than a missing one. Both commands' Verify now says to read back what came over verbatim, and `/adopt-project`'s verify-by-contrast extends to `AUTOMATIONS/` — where two of the three were — having previously covered only `ENGINEERING/` and `DOMAIN/` (`init-project.md` 1.8 → 1.9, `adopt-project.md` 1.8 → 1.9). `.kenovis/AI/templates/product-layer/README.md` (1.1 → 1.2) documents what a leftover answer looks like and the two questions that separate it from framework prose.

No ADR: this corrects content and strengthens an existing check. It decides nothing new, the same call Phase 1 item 1 made.

Deliberately not built: a CI guard. No pattern distinguishes an inherited answer from a legitimate one — an answer phrased in generic words is invisible to any check, and the grep the templates' README now carries is documented as a starting point rather than a gate. Claiming otherwise would repeat Learning-015's own failure in a new place.

Validated: the fixed bundle built and installed into a second fresh scratch Installation — the three sections now arrive as questions, and a `SECURITY.md` copied in unanswered reports 9 `[ANSWER:` matches instead of passing clean at 0. 108 `cli/` tests pass, typecheck and build clean, `check_links.py` and `check_markers.py` pass. No CLI code changed. Counts read off the artifact with `git diff --stat` and `grep -c` in the same round, per Learning-016.

Two smaller findings from the same run, left as backlog rather than fixed inside this item's scope, both stated here so they are decisions and not oversights:

- Every template's first line reads "placeholder content. Rewrite when starting a new product. See .kenovis/AI/commands/init-project.md". Once authored, the file is not placeholder content, and in an adoption it was not `init-project` that wrote it. The same string is what the Collision Guard matches on (`head -1`), and this repository's own completed Product layer carries it, so changing the wording touches seventeen templates, every authored document and `check_markers.py`. Worth doing deliberately, not as a side effect.

  **Correction (2026-08-09, item 10):** the cost estimate in the sentence above is wrong, and the error is in its premise. The Collision Guard does not match on that string — it matches on the bare `PROJECT-SPECIFIC` token, as does `check_markers.py`, and no `.py`/`.ts`/`.mjs` file in the repository matches any part of the sentence after it. Changing the wording therefore touched no mechanism at all and needed no change to `check_markers.py`. Left visible rather than rewritten, per this document's own scoping rule, because the mis-estimate is the finding: an unverified cost note nearly deferred a maximal-Pain, low-cost fix indefinitely. See Learning-019.
- The `CLAUDE.md` stub the CLI writes enumerates the Product layer ("COMPANY_OS.md, DECISIONS.md, PRODUCT/, DOMAIN/, ENGINEERING/, AUTOMATIONS/, and this repository's own code") and omits `AI/memory/`, which `/adopt-project` Step 9 and `/init-project` Step 8 both create. A one-line fix in `cli/src/domain/installation.ts`, but it changes the stub and therefore the recorded hash sidecar and its tests — CLI work, which this item had none of.

9. DONE (2026-08-09, via /next) — promote `development` → `preproduction` → `main` and publish the release carrying item 8.

Chosen as the next item because item 8 is merged to `development` and reaches no customer until published — the same packaging step Phase 1 items 2, 5 and 7 performed for `kenovis@0.5.0`, `0.6.0` and `0.7.0`. Against this document's own priority formula the case is the strongest of any release round so far: Customer Pain is maximal and *actively wrong*, not merely missing — every `0.7.0` Installation that runs `/adopt-project` today receives an `ENGINEERING/SECURITY.md` asserting it has no authorization model and no audit system, and Verify passes it clean, because a leftover answer is by construction the one thing that carries no `[ANSWER:` marker. Frequency is every brownfield install, which DECISION-014 states is the majority path for this product's own segment. Business Impact lands on the North Star's activation half. Implementation Cost is a documented procedure. No other scheduled, unblocked item exists: the active npm-registry version check stays deferred on network-dependency cost and unvalidated Pain, and the paid-tier ADR stays premature on one external team's data.

Version call, decided at cut time: **minor, `kenovis@0.8.0`**, not patch. Deliberately, not by habit, per Phase 1 item 2's standing instruction — and for the second release running the habitual answer would have been patch, more strongly than last time: not one line of CLI code changed, and everything in the release is a bug fix. But this package bundles the framework files themselves, and three templates changed content while two commands changed behaviour. An Installation syncing to this release gets templates that ask three questions they previously answered for it. That is the same distinction `0.5.0` and `0.7.0` drew. Reasoning recorded in `CHANGELOG.md`'s `[0.8.0]` header.

Stated in the release notes rather than left implicit, because syncing does not fix it: `sync` never touches a Product-layer file the customer already authored, so an Installation that authored `ENGINEERING/SECURITY.md`, `AUTOMATIONS/release-process.md` or `AUTOMATIONS/user-feedback.md` from the 0.7.0 templates still holds the inherited answers after upgrading. Both `CHANGELOG.md` `[0.8.0]` and the GitHub Release's "Upgrading" section say to read those three documents back.

Procedure: `AUTOMATIONS/release-process.md` and `cli/README.md` → "Cutting a release", with the content-sync promotion Learning-012 established as this repository's *standard* procedure. Published from CI via `.github/workflows/publish.yml` on a GitHub Release — never from a laptop (ENGINEERING/SECURITY.md → Supply-Chain Security).

Shipped: `cli/package.json`/`package-lock.json` 0.7.0 → 0.8.0, `CHANGELOG.md` `[Unreleased]` cut into `[0.8.0] - 2026-08-09` (PR #54). Both promotions ran exactly as Learning-012 prescribes and needed no investigation — `preproduction` verified as a strict older snapshot against the 0.7.0 cut (`2adab43`, empty diff), `main` byte-identical to `preproduction`, and the only commits unique to either were the synthetic sync commits from previous rounds. Tree set with `git read-tree -u --reset`, empty diff confirmed before opening each PR (PRs #55, #56). All three branches are byte-identical. `kenovis@0.8.0` published from CI with provenance (SLSA v1 attestation present on the registry); `npm view kenovis version` → `0.8.0`, `dist-tags.latest` → `0.8.0`.

Validated against the *published* package, on the path a real customer runs — `npx kenovis@0.7.0 add` on a scratch brownfield repository (own `README.md`, `src/`, `package.json`), then `npx kenovis@0.8.0 sync`. The sync reported `0.7.0 -> 0.8.0`, changed exactly 7 paths inside `.kenovis/` (the version stamp, both commands, the three templates and the templates' README), left the target's own files untouched, created no Product-layer file at the target's root, and preserved `.setup-pending` so an Installation that had not completed setup keeps its first-session auto-trigger. The three inherited answers are gone from the installed artifact — `not applicable in v1`, `RULE-INST-01`, `GitHub Issues` and `published npm package` each return zero — and `ENGINEERING/SECURITY.md`'s Authorization Model now arrives as a question that explicitly warns against writing "not applicable" over a product that has roles.

Counts read off the published artifact, per Learning-016: the three templates go 5 → 9, 6 → 11 and 1 → 3 `[ANSWER:` occurrences, net **+11**, matching item 8's own claim. The corpus-wide total goes 113 → 126, and the extra two are the templates' `README.md` (3 → 5) quoting the marker while documenting the convention — not questions.

The one thing this round found, and it was found in its own validation rather than in the framework: the corpus figure was measured first, disagreed with the published "eleven", and read as a defect. A correction to a public release was one step from being issued for a number that was correct. "Eleven across the three files" states its scope in the sentence, not in the artifact, so any later verification has to reconstruct which files were meant — and the obvious command (`grep -rc` over the whole template directory) silently answers a different question. Recorded as `AI/memory/learnings.md` Learning-018, with the reconciliation kept above so the next release does not repeat the investigation. Its future action: state the per-file transitions, which name their own scope, instead of a bare total.

Solo-maintainer note, unchanged from previous releases: all three PRs came back blocked on the required-review rule, which never counts self-approval, and were merged with `gh pr merge --rebase --admin` after founder confirmation. Not a misconfiguration.

The two backlog findings item 8 left (the templates' first-line wording; the `CLAUDE.md` stub omitting `AI/memory/`) were deliberately kept out of this release: neither was merged to `development`, and introducing a CLI change mid-release contradicts `.kenovis/AI/workflows/release.md`'s stability requirement. They are the leading candidates for the next item.

10. DONE (2026-08-09, via /next) — the `PROJECT-SPECIFIC` marker states layer, not state; and the `CLAUDE.md` stub enumerates the whole Product layer.

Founder chose this as the next item once item 9 closed and no scheduled, unblocked item remained. Both of item 8's backlog findings, taken in one round because they are the same defect — a Kenovis-authored artifact that describes the Product layer wrongly — and one release carries both, as items 1+2 and 3+4 did.

Gap found, and the reason it outranked everything else: line 1 of every Product-layer document read `placeholder content. Rewrite when starting a new product. See .kenovis/AI/commands/init-project.md`. That is false from the moment `/init-project` or `/adopt-project` authors the file — which is to say false for the entire life of every real Installation — and in an adoption it names the wrong command. It is the first thing read in `COMPANY_OS.md`, the top of the Source Of Truth Hierarchy, at the start of every session, and it is also what the Collision Guard (DECISION-019) reads to decide whether a file may be overwritten without asking. The one line whose job is to protect authored content was describing that content as scaffolding. Root cause: the marker carried both *which layer* and *what state*, the same conflation DECISION-022 had separated three days earlier in the adjacent `[ANSWER:` marker — that round fixed where the symptom appeared, not the pattern.

Priority against this document's own formula: Customer Pain maximal (an agent that believes line 1 may treat a company's real strategy as disposable), Frequency every session of every document of every Installation, Business Impact on the Source Of Truth Hierarchy itself. Implementation Cost turned out **low**, which is the part item 8's backlog note got wrong — see the correction recorded against that note above, and Learning-019.

Founder decision (2026-08-09, via /next): the marker states layer and adds the fact a reader most needs at that point — `kenovis sync` never overwrites this file. Two alternatives were rejected: instructing agents to disregard line 1 (a standing exception to counteract a false sentence), and retiring the marker for a manifest or path list (parallel bookkeeping, the defect Learning-010/011 record; and DECISION-016 rules out any path-based rule). See DECISION-023.

Shipped: 37 files carry a rewritten marker — 17 templates (each bumped a minor version), this repository's own 17 Product-layer documents, `README.md`, `cli/README.md`, and the one literal example inside `init-project.md`. Three wordings, preserving distinctions that already existed: general, `AI/memory/` recorded knowledge, and `glossary.md`'s split between Domain and Framework Terms. Both commands (1.9 → 1.10) and `.kenovis/AI/templates/product-layer/README.md` (1.2 → 1.3) now state the layer/state distinction explicitly, and `init-project.md` says to carry the line through unchanged rather than reword it on completion — the natural mistake once a line describes state. `DECISIONS.md` 2.8 → 2.9.

Zero mechanism changed, verified rather than assumed: `check_markers.py` greps the bare `PROJECT-SPECIFIC` token within a file's first three lines, the Collision Guard's `head -1` looks for the same token, and no `.py`/`.ts`/`.mjs` file matches any part of the sentence after it.

The CLI half: `claudeStubContent` (`cli/src/domain/installation.ts`) omitted `AI/memory/` from the Product layer it enumerates, while `/init-project` Step 8 and `/adopt-project` Step 9 both create it and roughly twenty framework files instruct agents to record a learning or look up a term there. Present since the stub was introduced. Every existing test compared `claudeStubContent` against its own output, which is tautological for content and cannot catch an omission — so the fix is one line plus a test that pins the enumeration against the list of paths the commands create. That test was confirmed to fail on the old content before being kept; 108 → 109 tests.

Validated: 109 `cli/` tests pass, typecheck and build clean, `check_links.py` and `check_markers.py` pass. Real scratch-repository smoke test — brownfield `kenovis add` delivers all three marker wordings correctly and writes a stub that enumerates `AI/memory/`; a document authored from a template keeps a line 1 that is now true and reports zero unanswered questions; and all three Collision Guard cases behave, including the one that mattered most to check — a file carrying the *old* wording is still recognised as Product layer, so no pre-release Installation breaks. A following `sync` left `git status` completely clean, preserved `.setup-pending`, and left the authored Product-layer files untouched, including the one deliberately seeded with the old wording. That last result is the documented negative consequence made visible: `sync` cannot migrate a Product-layer file, by design (RULE-INST-01), so Installations created before this release keep the old sentence until their owner edits it.

Recorded as `AI/memory/learnings.md` Learning-019: an unverified cost estimate in a backlog note nearly deferred a maximal-Pain fix indefinitely, and the smallest possible check — grep for the string the note claimed was load-bearing — collapsed the estimate from "seventeen templates, every authored document and `check_markers.py`" to a mechanical find-and-replace.

Next: this work reaches no customer until published. The release carrying items 9 and 10 is the leading candidate for the next item, the same packaging step items 2, 5, 7 and 9 performed.

11. DONE (2026-08-09, via /next) — promote `development` → `preproduction` → `main` and publish the release carrying item 10.

Chosen as the next item because item 10 is merged to `development` and reaches no customer until published — the same packaging step items 2, 5, 7 and 9 performed for `kenovis@0.5.0` through `0.8.0`. Against this document's own priority formula nothing competes: every `0.8.0` Installation opens `COMPANY_OS.md` at the start of every session and reads on line 1 that its contents are placeholder content, the fix exists and reaches nobody, and the cost is a documented procedure. The active npm-registry version check stays deferred on network-dependency cost and unvalidated Pain, the paid-tier ADR stays premature on one external team's data, and `/framework-review`'s expected yield is low after items 6, 8 and 10 each swept the same surface.

Version call, decided at cut time: **minor, `kenovis@0.9.0`**. Per Phase 1 item 2's standing instruction this is decided rather than assumed, and unlike the last two rounds it needs no argument — CLI code changed (the stub written on every install), seventeen templates changed content, and both commands changed behaviour. `1.0.0` was considered and rejected: it would signal maturity Phase 1 has not validated, with one external team on record and the MVP Success Metrics below still without a target. Reasoning recorded in `CHANGELOG.md`'s `[0.9.0]` header.

The `[0.9.0]` header and the GitHub Release both **lead with what the upgrade cannot do**, rather than burying it under the fixes: an Installation created before this release keeps the old marker wording on the Product-layer files it already authored, and `sync` will not update them (RULE-INST-01). The release notes carry the three replacement lines so a customer can update by hand, and state plainly that leaving them alone breaks nothing — the `PROJECT-SPECIFIC` token is what every mechanism reads, and only the sentence after it is wrong.

Procedure: `AUTOMATIONS/release-process.md` and `cli/README.md` → "Cutting a release", with the content-sync promotion Learning-012 established as this repository's *standard* procedure. Published from CI via `.github/workflows/publish.yml` on a GitHub Release — never from a laptop (ENGINEERING/SECURITY.md → Supply-Chain Security).

Shipped: `cli/package.json`/`package-lock.json` 0.8.0 → 0.9.0, `CHANGELOG.md` `[Unreleased]` cut into `[0.9.0] - 2026-08-09` (PR #59). Both promotions ran exactly as Learning-012 prescribes and needed no investigation — `preproduction` verified as a strict older snapshot against the 0.8.0 cut (`75ec1f0`, empty diff), `main` byte-identical to `preproduction`, and the only commits unique to either were the synthetic sync commits from previous rounds (PRs #60, #61). All three branches are byte-identical. `kenovis@0.9.0` published from CI with provenance (SLSA v1 attestation on the registry); `npm view kenovis version` → `0.9.0`, `dist-tags.latest` → `0.9.0`.

Validated against the *published* package, on the exact sequence a real upgrader runs — `npx kenovis@0.8.0 add` on a scratch brownfield repository, a `COMPANY_OS.md` authored from the 0.8.0 template (so it carries the old marker line, which is the state that matters), then `npx kenovis@0.9.0 sync`. Baseline first: 0.8.0 reproduces both defects, the old wording on every template and a stub with no `AI/memory/`. After the sync, transition reported `0.8.0 -> 0.9.0`, 22 paths changed inside `.kenovis/` (18 of them under `templates/product-layer/`) plus the root `CLAUDE.md`, the stub enumerates `AI/memory/`, and all three marker forms arrive correctly.

The result the round was really checking: the authored `COMPANY_OS.md` still carries the **old** wording after the upgrade — the documented consequence, reproduced rather than asserted — and `head -1` still matches `PROJECT-SPECIFIC`, so the Collision Guard keeps working and no Installation breaks. The target's own `README.md`, `src/` and `package.json` were untouched throughout and `.setup-pending` was preserved. A separate fresh `npx kenovis@0.9.0 add` delivered all eighteen template files with zero occurrences of the old wording anywhere in the bundle and created no Product-layer file at the target's root.

One number was reconciled before being written down, per Learning-018's own future action: `[ANSWER:` occurrences across the templates go 126 → 127. No template gained or lost a question — item 10 touched the `PROJECT-SPECIFIC` marker, not this one — and the single addition is in the templates' `README.md` (5 → 6), whose new section quotes the marker while explaining the layer/state distinction. Checked before publishing the figure rather than after, which is the difference from item 9.

No new gap surfaced — nothing recorded as a learning this round.

Solo-maintainer note, unchanged from previous releases: all three PRs came back blocked on the required-review rule, which never counts self-approval, and were merged with `gh pr merge --rebase --admin` after founder confirmation. Not a misconfiguration.

12. DONE (2026-08-09, via /next) — execute `/feature` end to end from a real published Installation, and fix what breaks.

Founder chose this as the next item once item 11 closed and no scheduled, unblocked item remained. Candidates weighed against this document's own priority formula: this item, the active npm-registry version check (Phase 2, still deferred on network-dependency cost and unvalidated Pain), the paid-tier ADR (still premature on one external team's data), and a `/framework-review` audit pass (expected yield low after items 6, 8 and 10 each swept the same surface).

Gap found: items 6 and 8 ran the two *setup* commands from a real Installation for the first time and each found a maximal-Pain defect. No *post-setup* workflow ever had been. The one real external `/feature` run on record (2026-08-06) was against `kenovis@0.3.0` — before the `.kenovis/` migration and before the Product-layer templates existed — so the shape this product publishes today had never been exercised past setup. That matters more than activation now: the North Star is defined as an Installation that ran at least one framework workflow, which is exactly the path nobody had run.

Method: a real brownfield fixture (a court-booking API — Express, SQLite, JWT auth, `club_id` multi-tenancy, role checks, a deploy workflow), `npx kenovis@0.9.0 add` against it, its Product layer authored from the shipped templates, then `/feature` Phases 1-13 executed as written with no patching mid-run. The published bundle was confirmed byte-identical to this repository's own `.kenovis/AI/` before starting. Scoped deliberately: `/adopt-project`'s own Steps were not re-validated — item 8 did that — the Product layer was authored from its templates only far enough to give `/feature` real inputs, which covers every document `/feature` reads.

What the run found, and it was not in a step that failed — the workflow executed cleanly and produced a working feature (booking cancellation, six passing tests, first tests that repository ever had). Eleven instructions across five workflows, two commands and one agent name a path under `.kenovis/AI/templates/` as the *output* of an imperative: "Generate: `.kenovis/AI/templates/feature-plan.md`", "Update: `.kenovis/AI/templates/bug-report.md` with final resolution details". A template's path stands where a destination belongs.

Reproduced rather than argued: a feature plan written to `.kenovis/AI/templates/feature-plan.md` and committed in the fixture was deleted by the next `kenovis sync`, which restored the pristine template, reported `0.9.0 -> 0.9.0 (already up to date)`, and never named the file it removed. Followed carefully instead — an agent that declines to overwrite a shipped template — the same instruction gives no destination at all, so the run had to invent a path, and two runs in the same Installation would land in different places.

Two more from the same run. `/feature` Phase 2 reads a `FEATURE-NNN` spec from `PRODUCT/FEATURES.md` that nothing in the framework writes before implementation — `/init-project` and `/adopt-project` seed that file with what already ships, and Phase 13 updates it afterwards, so the workflow's first input is produced by its own last step. And `.kenovis/AI/commands/architect.md` offered `ENGINEERING/ADR/` as an ADR destination: a path appearing exactly once in the framework, created by neither setup command, absent from the seventeen templates, and non-existent in this repository too.

Founder decision (2026-08-09, via /next): ADR first, per the same pattern as DECISION-016/017/020/021. See DECISION-024 — a template is a form, never a destination. Option A (a fixed Product-layer directory per artifact type, created at setup) was rejected for reintroducing exactly what DECISION-021 rejected: directories created for every Installation that most never fill. Every destination now named is a file the framework already requires.

Shipped: 15 framework files — the eleven instruction sites reworded across `workflows/feature.md` (3.2 → 3.3), `bugfix.md` (2.2 → 2.3), `hotfix.md` (2.0 → 2.1), `architecture.md` (2.1 → 2.2), `roadmap.md` (2.1 → 2.2), `release.md` (2.0 → 2.1), `commands/feature.md` (2.0 → 2.1), `commands/architect.md` (2.0 → 2.1) and `agents/designer.md` (1.1 → 1.2); the six working templates each carrying a "this is a form, not a destination" line under their version header, so an agent that reads only the template still gets the rule; and `/feature` Phase 2 now authoring the `FEATURE-NNN` spec when none exists. `DECISIONS.md` 2.9 → 2.10. No CLI code changed and no Product-layer template changed — the `[ANSWER:` corpus stays at 127, verified against both the 0.9.0 install and this build.

Adjacent inconsistency fixed in the same round, in the paragraph DECISION-024 had to be added to: `DECISIONS.md` → "Document Layers" said "Eight of them are framework-level" and claimed framework-layer files cite all eight by ID. Four are not cited, and five decisions that are cited were missing. Now fourteen entries with the nine cited ones marked, counts read off the tree rather than recalled (Learning-016).

Validated: the fixed bundle built and installed into a fresh scratch Installation — all six templates carry the new line, no imperative-plus-template-path site remains anywhere in the installed tree, no Product-layer file is created at the target's root, and `PRODUCT/FEATURES.md`'s spec-authoring instruction arrives intact. 109 `cli/` tests pass, typecheck and build clean, `check_links.py` and `check_markers.py` pass.

Recorded as `AI/memory/learnings.md` Learning-020: both defects are invisible from inside this repository, because here `.kenovis/AI/` is the product's source rather than a synced copy and `sync` never runs against this checkout. The instruction became destructive when the framework started being *installed* — DECISION-017, four releases ago — and nothing re-read it against that change. Three post-setup commands have now been run from a real Installation and all three surfaced a maximal-Pain defect; the learning's future action names the remaining ones (`/bug`, `/review`, `/release`, `/architect`) as the next candidates, one per round.

Backlog finding, left out of this item's scope deliberately and stated so it is a decision rather than an oversight: `kenovis sync` still deletes anything a customer puts under `.kenovis/` without naming what it removed — the smoke test's `already up to date` output mentioned nothing. This round removes every framework instruction that would lead a customer there, which is the cause; making `sync` defensive (report removed paths that the bundle does not ship, or refuse) is a separate change with its own design, and mixing a CLI change into a framework-content round is what `.kenovis/AI/workflows/release.md`'s stability requirement argues against.

Next: this work reaches no customer until published. The release carrying item 12 is the leading candidate for the next item, the same packaging step items 2, 5, 7, 9 and 11 performed.

13. DONE (2026-08-09, via /next) — promote `development` → `preproduction` → `main` and publish the release carrying item 12.

Chosen as the next item because item 12 is merged to `development` and reaches no customer until published — the same packaging step items 2, 5, 7, 9 and 11 performed for `kenovis@0.5.0` through `0.9.0`. Against this document's own priority formula nothing competes: every `0.9.0` Installation that runs `/feature`, `/bug`, `/release`, `/architect` or the roadmap workflow is told to write its output into the one directory `sync` deletes, the fix exists and reaches nobody, and the cost is a documented procedure. The active npm-registry version check stays deferred on network-dependency cost and unvalidated Pain, and the paid-tier ADR stays premature on one external team's data.

Version call, decided at cut time: **minor, `kenovis@0.10.0`**, not patch. Per Phase 1 item 2's standing instruction this is decided rather than assumed, and for the third release running the habitual answer would have been patch — no CLI code changed and everything in the release is a bug fix. But this package bundles the framework files themselves, and fifteen of them changed: nine instruction documents and six templates. An Installation syncing to this release gets workflows that tell an agent to write somewhere different from where they told it before. Same distinction `0.5.0`, `0.7.0` and `0.8.0` drew. `1.0.0` rejected again for `0.9.0`'s reason — one external team on record, MVP Success Metrics still without a target. Reasoning recorded in `CHANGELOG.md`'s `[0.10.0]` header.

The `[0.10.0]` header and the GitHub Release both lead with what the upgrade cannot undo: an Installation that already followed one of the old instructions and wrote a feature plan, design spec, bug report or ADR into `.kenovis/AI/templates/` has already lost it to `sync`, and its own git history is the only copy. Nothing else about the upgrade is lossy.

Procedure: `AUTOMATIONS/release-process.md` and `cli/README.md` → "Cutting a release", with the content-sync promotion Learning-012 established as this repository's *standard* procedure. Published from CI via `.github/workflows/publish.yml` on a GitHub Release — never from a laptop (ENGINEERING/SECURITY.md → Supply-Chain Security).

Shipped: `cli/package.json`/`package-lock.json` 0.9.0 → 0.10.0, `CHANGELOG.md` `[Unreleased]` cut into `[0.10.0] - 2026-08-09` (PR #64). Both promotions ran exactly as Learning-012 prescribes and needed no investigation — `preproduction` verified as a strict older snapshot against the 0.9.0 cut (`f69abfb`, empty diff), `main` byte-identical to `preproduction`, and the only commits unique to either were the synthetic sync commits from previous rounds (PRs #65, #66). All three branches are byte-identical. `kenovis@0.10.0` published from CI with provenance; `npm view kenovis version` → `0.10.0`, `dist-tags.latest` → `0.10.0`.

Validated against the *published* package, on the exact sequence a real upgrader runs — `npx kenovis@0.9.0 add` on a scratch brownfield repository, then `npx kenovis@0.10.0 sync`. Baseline first: 0.9.0 reproduces the defect, eleven instructions naming a template path as their output and zero templates carrying the form rule. After the sync, transition reported `0.9.0 -> 0.10.0`, **16 paths changed inside `.kenovis/`** — the fifteen framework files plus the version stamp, listed off `git status` rather than recalled — defective sites **11 → 0**, all six working templates carrying the rule, `ENGINEERING/ADR/` gone from the tree entirely, the `[ANSWER:` corpus unchanged at 127, the target's own `README.md`, `src/` and `package.json` untouched, and `.setup-pending` preserved so an Installation that had not completed setup keeps its first-session auto-trigger.

One number was reconciled before being written down, per Learning-018's own future action. The first grep run against the installed 0.9.0 tree returned **9** defective sites, not the eleven this release claims. The gap is entirely in the pattern: that grep matched `Generate|Update|Prepare|Create ADR using` and silently excluded `Create:` (`hotfix.md`) and `Before coding create:` (`commands/feature.md`). Re-run with the full verb set it returns eleven, in the eight files item 12 names. This is exactly Learning-018's shape — a count whose scope lives in prose, verified by a command answering a narrower question — caught this time before a correction was drafted rather than after.

No new gap surfaced in the framework this round.

Solo-maintainer note, unchanged from previous releases: all four PRs came back blocked on the required-review rule, which never counts self-approval, and were merged with `gh pr merge --rebase --admin` after founder confirmation. Not a misconfiguration.

14. DONE (2026-08-10, via /next) — execute `/bug` end to end against a real published Installation, and fix what breaks.

Founder chose this as the next item once item 13 closed and no scheduled, unblocked item remained. It is Learning-020's own future action, verbatim: run each remaining post-setup workflow — `/bug`, `/review`, `/release`, `/architect` — from a real published Installation, one per round. Candidates weighed against this document's own priority formula: this item, making `sync` name the paths it removes (item 12's backlog finding), the active npm-registry version check (Phase 2, still deferred on network-dependency cost and unvalidated Pain), and the paid-tier ADR (still premature on one external team's data). This item wins on precedent — three for three previous runs of this kind found a maximal-Pain defect — and on `/bug` being one of the four workflows the North Star is defined in terms of.

Method: a real brownfield fixture (a court-booking API — Node 22, `node:sqlite`, HMAC bearer tokens, `club_id` multi-tenancy, admin role, seven passing tests, a deploy workflow) carrying one genuine defect: an admin of one club could cancel another club's booking, because the cancellation path looked the booking up by id alone while the list and create paths both scoped on `club_id`. `npx kenovis@0.10.0 add` against it, its Product layer authored from the shipped templates, then `/bug` Steps 1-12 executed as written with no patching mid-run. The published bundle was confirmed byte-identical to this repository's own `.kenovis/AI/` before starting. Scoped deliberately: `AUTOMATIONS/*` and `PRODUCT/USER_RESEARCH.md` were left as delivered templates — nothing `/bug` reads — and `/adopt-project`'s own Steps were not re-validated, item 8 did that.

The command's own steps executed cleanly and fixed the bug properly: root cause in the query rather than the caller, the tenant scope moved into the `WHERE` clause per the fixture's own Hard Rules, two regression tests added (one for the cross-club cancel, one asserting a cross-club lookup is byte-identical to a missing one), nine tests passing.

What the run found is one release old. Two sites still carried the pre-DECISION-024 shape: `.kenovis/AI/commands/bug.md` Step 2 ("Create Bug Report / Use: `.kenovis/AI/templates/bug-report.md`") and `.kenovis/AI/commands/release.md` Step 8 ("Generate Release Notes / Use: ..."). Neither names a destination — and item 12 had just added a line to every template saying "fill it in where the workflow that sent you here says to record the artifact", which those two commands never say. Template defers to command, command is silent, and the only path on offer is inside `.kenovis/`. Reproduced against the published package rather than argued: a bug report filled in at the template path and committed was deleted by the next `kenovis sync`, which reported `0.10.0 -> 0.10.0 (already up to date)` and never named the file it reverted.

Why item 12 missed them, which is the more useful half: that round found its eleven sites with a grep over a verb set, and fixed what the pattern returned. Both survivors say "Use:". Item 13's own release note records the pattern being widened mid-round when a recount disagreed — proof it was incomplete, treated as settled once the numbers matched. See `AI/memory/learnings.md` Learning-021.

Shipped: both steps reworded onto the shape their paired workflows already had — `/bug` Step 2 (renamed "Establish The Bug Report") states the report shapes the session rather than becoming a file, and names the regression test and `AI/memory/learnings.md` as what survives it; `/release` Step 8 says to publish notes wherever `AUTOMATIONS/release-process.md` records that this product publishes them. Both commands 2.0 → 2.1.

And the part that makes this the last time: `.github/scripts/check_template_refs.py`, wired into CI's `docs-integrity` job. It enumerates every reference to a working template from anywhere else under `.kenovis/AI/` — fifteen of them — and requires each to state the rule or cite DECISION-024 within a few lines. Enumerating the population rather than pattern-matching imperatives is precisely what item 12's sweep did not do. Confirmed to fail on the pre-fix tree, naming both real defects, before being kept.

Building the guard surfaced five more sites (`workflows/architecture.md`, `bugfix.md`, `feature.md`, `hotfix.md`, `roadmap.md`) that were **correct already** — each names `DECISIONS.md` as the destination and the template only as "Shaped by:" — but carried no citation, so no mechanical check could tell them from the two real defects. They gained a one-line citation. Stated explicitly because the alternative was a check with a heuristic about English, which is the shape item 6 correctly refused to build for a case where no pattern could work; here the population is exact, so the guard is possible and its absence was the gap.

Adjacent fix, in files this round was already validating: five of the six working templates ended with an unmatched code fence. Cosmetic, present since each was written, typo-class so no version bump.

No ADR: this enforces DECISION-024 and decides nothing new — the same call items 1 and 8 made.

Validated: 109 `cli/` tests pass, typecheck and build clean, `check_links.py`, `check_markers.py` and the new `check_template_refs.py` all pass. Measured off the artifacts rather than recalled, per Learning-016 and Learning-018, with the population named alongside the count per Learning-021's own rule: the `kenovis@0.10.0` installed tree holds **15** references to a working template, of which **7** are unmarked — 2 with no destination anywhere (the real defects) and 5 naming `DECISIONS.md` above. A fresh Installation from the fixed bundle holds the same 15 references with **0** unmarked, no unbalanced fences, all 18 Product-layer templates delivered, and the target's own `README.md`, `src/` and `package.json` untouched.

One verification in this round was initially vacuous and is recorded rather than quietly redone: the first check of the fixed bundle invoked `cli/dist/cli/bin.js`, which only exports `main`, so it exited 0 without installing anything and the check reported "0 references, 0 unmarked" against a directory that did not exist. A clean pass on an empty corpus is indistinguishable from a clean pass on a fixed one unless the check asserts the corpus is there — the assertion was added and the run repeated against `cli/bin/kenovis.js`. Same family as Learning-018, caught in the same session rather than after publishing.

Next: this work reaches no customer until published. The release carrying item 14 is the leading candidate for the next item, the same packaging step items 2, 5, 7, 9, 11 and 13 performed.

---
Phase 1 — MVP

Objective

Prove that a real external software team can install Kenovis via CLI, complete /init-project for their own product, and ship at least one real feature through the /feature workflow.

Target users

Software developers and small development teams (COMPANY_OS.md → Initial Market Strategy).
---
Engineering Validation (2026-08-05, via /next)

Smoke-tested end to end against a scratch external-like repository (own README.md, own `src/`): `npx kenovis@0.1.0 init` correctly left the existing README.md and code untouched, wrote `.kenovis/` + `CLAUDE.md` stub, and correctly detected the repository as brownfield (cited `src/` as evidence, suggested `/adopt-project`). `npx kenovis sync` (no `--source`, the real customer path — pulls the published bundle) produced an empty diff on an unchanged version, confirming idempotent mirror-replace with no spurious noise. See AI/memory/learnings.md Learning-004 for a related `--source` footgun found while testing (not customer-facing — only affects the local-dev `--source` escape hatch, not default usage).

This validates the CLI Core Modules below work as documented. Full Success Criteria closed below.
---
Real External Validation (2026-08-06)

An external team (identity not disclosed) completed `/init-project` unassisted and shipped a real feature through the `/feature` workflow the same day, with no help from Kenovis. Nothing noteworthy to record as a learning this round — no framework gap surfaced. This satisfies Phase 0's own Success Criteria above and Phase 1's Objective/Success Criteria below: the first real (non-smoke-test) end-to-end validation of the install → init-project → feature workflow chain.
---
MVP Core Modules

- CLI install command — scaffolds the Framework layer into a target repository.
- CLI sync/update command — pulls a newer Framework Release, Framework-layer files only.
- The Software Development Vertical's Agent Roster — already exists (AI/agents/: CTO, Product Manager, Designer, Frontend, Backend, Security, Database, Reviewer).

See PRODUCT/FEATURES.md for the detailed spec format once each module is speced as a FEATURE-NNN.
---
MVP Non Goals

Do NOT build:

- Hosted dashboard or web UI — no backend exists in v1 (DECISION-013).
- Billing or payment processing — open-core tier boundary is documentation-only until Phase 2.
- Multi-tenant accounts or authentication — there is no shared backend to authenticate against.
- Additional Verticals (Legal, Accounting) — Phase 3, not before Phase 1 validates the model on Software Development.
---
MVP Success Metrics

The MVP is successful when:

Usage

N installations (target not yet set) complete /init-project with real, non-placeholder Product-layer content.

Engagement

Installations run at least one framework workflow (/feature, /bug, /review) after initialization.

Retention

Installations still sync new Framework Releases after 30/90 days.

Value

Customers report the framework caught something — a missed policy, an undocumented decision — that a plain AI coding session would have missed.
---
Phase 2 — Product Market Fit

Objective

Become indispensable for early-adopter software development teams.
---
New Capabilities

Paid open-core tier: additional specialized agents, priority support. Lightweight, explicitly opt-in feedback/telemetry loop (no default data collection — see ENGINEERING/SECURITY.md). Richer CLI update ergonomics (diff preview before sync, conflict detection against RULE-INST-01, an active version-check — e.g. `kenovis --version`/`kenovis init`/`sync` querying the npm registry to tell an installed customer a newer Framework Release exists, allowed under ENGINEERING/ARCHITECTURE.md's Hard Rules since it only touches the npm registry, not a Kenovis-operated server).

Flagged 2026-08-06, via /analyze on the v0.1.0/v0.2.0 → v0.3.0 upgrade path: deliberately not Phase 0 work. Priority formula score is low today (Pain/Frequency/Business Impact unvalidated against ~1 external team so far; Cost is real — first network dependency in the CLI's core logic, new failure modes to handle offline/registry-down/rate-limits). Phase 0 item 6's `cli/README.md` "Upgrading" section covers the same discovery gap at near-zero cost in the meantime. Revisit once Phase 2 has real Frequency/Pain data to size this against.

Prerequisite (flagged 2026-08-06, via /analyze on `.kenovis/` distribution packaging): before this tier ships, run /architect for an ADR on the actual gating mechanism for premium agent content — a real check (backend + license key) at the moment it's built, not cosmetic obfuscation of the free base tier. The base tier's plain, human/AI-readable markdown distribution is an intentional commitment (DECISION-010 tool-agnosticism, DECISION-013 open-core) and should not be reversed to simulate protection it doesn't provide. Blocks "additional specialized agents" until resolved.
---
Phase 2 Success Metrics

Target:

Not yet set — first real number should come from Phase 1 usage data, not invented here.

Metrics:

Retained installations, framework workflow invocations per active installation, paid-tier conversion rate, init-project completion rate.
---
Phase 3 — Expansion

Objective

Expand beyond the initial customer segment.
---
New Verticals

Legal/abogacía and Accounting/gestoría — see COMPANY_OS.md → Long-Term Market Vision. Each requires its own Agent Roster and glossary, authored from that vertical's real domain per DOMAIN/BUSINESS_RULES.md RULE-VERT-01, not copied from the Software Development roster.
---
Product Adaptation

The platform should support:

Different terminology.

Different workflows.

Different organization structures.

Without rewriting the core system.
---
Phase 4 — Platform

Objective

Become the operational infrastructure for the category.
---
Possible capabilities:

A marketplace of Vertical Agent Rosters (community and Kenovis-authored). An optional hosted layer for teams that do want a dashboard (only once justified by real demand, not built preemptively — see COMPANY_OS.md → What The Company Will NOT Become). Integrations with existing developer tooling (GitHub, Linear, Slack).
---
Features Backlog Philosophy

Features are prioritized using:

Customer Pain

How painful is the problem?

Frequency

How often does it happen?

Business Impact

Does it improve retention or revenue?

Implementation Cost

How complex is it?

Priority formula:

Priority =
(Customer Pain × Frequency × Business Impact)
/
Implementation Cost

---
Features That Require Strong Validation

Before building:

- Social features.
- Chat.
- Marketplaces.
- Complex accounting.
- Public communities.
- AI features.
---
Product Metrics

The company tracks:

Acquisition

How organizations discover the product.

Activation

How quickly organizations reach first value.

Retention

Whether organizations continue using the product.

Revenue

Subscription and transaction revenue.

Engagement

Operational usage.
---
North Star Metric

Active Installations — repositories with the Kenovis AI-OS installed that ran at least one framework workflow (/feature, /bug, /review, /next) in the last 30 days.

Supporting metrics:

init-project completion rate (installs that reach a real, non-placeholder Product layer), Framework Release sync rate, workflow invocations per active Installation, paid open-core tier conversion rate.
---
Final Product Principle

The roadmap is not a list of features.

It is a sequence of validated problems.

Build the smallest solution that creates undeniable value.
