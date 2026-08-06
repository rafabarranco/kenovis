<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

ROADMAP.md

Product Roadmap

Version: 1.12
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

Paid open-core tier: additional specialized agents, priority support. Lightweight, explicitly opt-in feedback/telemetry loop (no default data collection — see ENGINEERING/SECURITY.md). Richer CLI update ergonomics (diff preview before sync, conflict detection against RULE-INST-01).

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
