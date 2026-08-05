<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

ROADMAP.md

Product Roadmap

Version: 1.8
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

Explicitly NOT done yet:
- The actual first publish. Requires an `NPM_TOKEN` repository secret (npm automation token, scoped to the `kenovis` package name — confirmed available on the registry) that only the founder can create and load, and a GitHub Release to be cut to trigger it.

Dependencies: none remaining for items 1-3. First real publish depends on the `NPM_TOKEN` secret being configured.
---
Phase 1 — MVP

Objective

Prove that a real external software team can install Kenovis via CLI, complete /init-project for their own product, and ship at least one real feature through the /feature workflow.

Target users

Software developers and small development teams (COMPANY_OS.md → Initial Market Strategy).
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
