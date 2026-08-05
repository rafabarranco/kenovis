<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

# DECISIONS.md

Company Decision Log

Version: 2.2

Last updated: —

---

# Document Layers

Most decisions in this log are product-specific and must be removed when starting a new product.

Five are framework-level and should be carried over:

- DECISION-001 — AI-Native Company Operating Model.
- DECISION-009 — Documentation As Company Memory.
- DECISION-010 — AI Tooling Strategy.
- DECISION-011 — Framework Contribution & Memory Discipline.
- DECISION-012 — Graphify Exception To Tool-Agnosticism.

Everything else is product-specific and should be recorded as real decisions get made. See AI/commands/init-project.md.

---

# Purpose

This document records important decisions that shape the company.

The objective is to preserve:

- Context.
- Reasoning.
- Alternatives considered.
- Trade-offs.
- Consequences.

Future decisions should consider previous decisions.

A decision without context is just a preference.

A documented decision becomes organizational knowledge.

---

# Decision Format

Every decision should follow this structure:

---

## DECISION-ID

## Title

Date:

YYYY-MM-DD

Status:

Proposed | Accepted | Deprecated | Superseded | Rejected

Owner:

Person or role responsible for the decision.

Review Date:

When this decision should be reconsidered.

---

## Context

Why this decision was necessary.

What problem or opportunity existed.

---

## Options Considered

Alternative approaches evaluated.

---

## Decision

The chosen approach.

---

## Reason

Why this option was selected.

---

## Consequences

Positive:

Expected benefits.

Negative:

Expected trade-offs or risks.

---

# Decision Status

## Proposed

Under evaluation.

Not yet adopted.

---

## Accepted

Currently active.

---

## Deprecated

No longer recommended.

---

## Superseded

Replaced by another decision.

---

## Rejected

Considered but intentionally discarded.

---

# Strategic Decisions

Company-level decisions that affect the direction of the company.

[No product-specific strategic decisions recorded yet. Add them here as they are made — do not invent decisions to fill this section.]

---

# Product Decisions

Product decisions that affect what the company builds.

[No product-specific product decisions recorded yet.]

---

# Operating Decisions

Decisions about how the company operates.

---

# DECISION-001

# AI-Native Company Operating Model

Date:

2026-01-01

Status:

Accepted

Owner:

Founder

Review Date:

2027-01-01

---

## Context

The company starts with a very small human team.

Building a traditional software company would require significant investment in:

- Engineering.
- Product.
- Design.
- Operations.

The company wants to maximize execution speed while maintaining quality.

---

## Options Considered

### Option A

Build a traditional team immediately.

Advantages:

- More human expertise.
- Established processes.

Disadvantages:

- Higher cost.
- Slower initial execution.
- Larger operational requirements.

---

### Option B

Operate with an AI-native model.

Advantages:

- Lower initial cost.
- Faster experimentation.
- High execution leverage.
- Smaller initial team.

Disadvantages:

- Requires stronger review processes.
- Requires disciplined documentation.
- Requires human strategic ownership.

---

## Decision

Operate using an AI-native company model.

AI agents support:

- Software development.
- Product analysis.
- Documentation.
- Research.
- Marketing.
- Internal operations.

Strategic decisions remain human-controlled.

---

## Reason

The initial company stage requires:

- Speed.
- Validation.
- Low operational cost.
- Maximum learning.

AI provides leverage without replacing business judgment.

---

## Consequences

Positive:

- Faster iteration.
- Lower initial costs.
- Greater execution capacity.

Negative:

- Requires strong quality controls.
- Requires structured knowledge management.

---

# DECISION-009

# Documentation As Company Memory

Date:

2026-01-01

Status:

Accepted

Owner:

Founder

Review Date:

2027-01-01

---

## Context

AI agents require structured knowledge to operate consistently.

Company knowledge cannot exist only in conversations.

---

## Decision

Maintain a structured documentation system:

- COMPANY_OS.md.
- DECISIONS.md.
- PRODUCT/.
- DOMAIN/.
- ENGINEERING/.
- AI/.

---

## Reason

Documentation becomes the long-term memory of the company.

---

## Consequences

Positive:

- Better AI collaboration.
- Easier onboarding.
- More consistent decisions.

Negative:

- Requires maintenance discipline.

---

# DECISION-010

# AI Tooling Strategy: Claude Code Primary, Tool-Agnostic AI-OS

Date:

2026-07-30

Status:

Accepted

Owner:

Founder

Review Date:

2027-01-01

---

## Context

The company operates using an AI-native model (DECISION-001). Day-to-day development happens through Claude Code (VS Code extension, Claude Pro subscription), which automatically loads the root CLAUDE.md file.

The company also needs the operating model to work through other AI tooling, including Maker, without rebuilding it per tool.

---

## Options Considered

### Option A

Write AI instructions using Claude Code-specific mechanisms (Skills, hooks, tool syntax) throughout the AI-OS.

Advantages:

- Deeper integration with Claude Code.

Disadvantages:

- Locks the AI-OS to one tool.
- Breaks if followed from Maker or any future tool.

---

### Option B

Keep the AI-OS (AI/SYSTEM.md, agents, workflows, policies, commands, templates, memory) as plain, tool-agnostic markdown. Keep Claude Code-specific configuration isolated to the root CLAUDE.md file only.

Advantages:

- AI-OS remains portable across tools.
- Claude Code still gets automatic loading via CLAUDE.md without polluting the framework.

Disadvantages:

- Requires discipline to avoid leaking tool-specific syntax into AI/.

---

## Decision

Adopt Option B.

Claude Code (VS Code extension, Claude Pro subscription) is the primary development interface and loads root CLAUDE.md automatically.

The AI-OS under AI/ must remain tool-agnostic plain markdown, readable and followable by any AI tool, including Maker. A tool other than Claude Code should manually load AI/SYSTEM.md as its equivalent entry point.

---

## Reason

The operating model (DECISION-001) depends on AI/SYSTEM.md being reusable. Coupling it to one tool's syntax would contradict that decision and create migration risk.

---

## Consequences

Positive:

- No vendor lock-in on the operating model.
- New tools can be onboarded by pointing them at AI/SYSTEM.md.

Negative:

- Tool-specific optimizations (e.g. Claude Code Skills) must live outside AI/, which may duplicate some setup per tool.

---

# DECISION-011

# Framework Contribution & Memory Discipline

Date:

2026-08-05

Status:

Accepted

Owner:

Founder

Review Date:

2027-01-01

---

## Context

A self-analysis of the framework (`/analyze cómo podría kenovis mejorarse a sí mismo?`) found that the framework mandates documentation-as-memory discipline for products (`AI/policies/documentation.md`, `AI/memory/learnings.md`) but did not apply the same discipline to itself:

- Framework-layer PRs had no mechanical or process requirement to update `CHANGELOG.md` or `DECISIONS.md`, even though both documents state that rule in prose.
- `AI/commands/init-project.md` Step 8 deleted `AI/memory/learnings.md` and `conventions.md` on every reset with no checkpoint to promote reusable learnings first — despite `learnings.md`'s own "Review Process" describing exactly that promotion step.
- CI (`.github/workflows/ci.yml`) checked markdown links and the `PROJECT-SPECIFIC` marker convention, but nothing about changelog or decision discipline.
- Per-file `Version: X.Y` headers under `AI/` had no convention for when to bump, making them unreliable as a signal of what actually changed.

---

## Options Considered

### Option A

Leave the rules as prose-only guidance ("should" without enforcement), same as before.

Advantages:

- Zero implementation cost.

Disadvantages:

- Exactly the failure mode the framework's own `code-quality.md` names: mechanics without verification gets skipped under fatigue, especially on "small" framework PRs.
- The framework does not compound knowledge across products the way `learnings.md` claims it does — reset silently loses anything not proactively promoted.

---

### Option B

Add a mechanical gate: CHANGELOG requirement enforced by CI, a DECISIONS requirement kept as reviewer judgment (not everything checkable by a script), an explicit review-before-delete checkpoint in `init-project.md`, and a lightweight versioning convention.

Advantages:

- Framework holds itself to the same bar it sets for products (mirrors DECISION-009).
- CHANGELOG discipline becomes enforced, not aspirational.
- Cross-product learnings get a real chance to survive a reset instead of depending on someone remembering to promote them.

Disadvantages:

- Minor process overhead on every framework PR (one CHANGELOG bullet, occasionally a DECISIONS entry).
- One more CI script to maintain.

---

## Decision

Adopt Option B:

- `CONTRIBUTING.md` → "Framework Definition of Done": framework-layer PRs (`AI/`, `CLAUDE.md`, `README.md`) require a `CHANGELOG.md` bullet, with a `[skip changelog]` escape for wording/typo-only changes; a `DECISIONS.md` entry when the change alters agent responsibilities, workflow phases, or policy mechanics.
- `.github/scripts/check_changelog.py` + `.github/workflows/ci.yml`: CI fails a PR that touches `AI/**`, `CLAUDE.md`, or `README.md` without also touching `CHANGELOG.md`, unless `[skip changelog]` is present in the PR title/description.
- `AI/commands/init-project.md` Step 8: before deleting `AI/memory/learnings.md` and `conventions.md`, run `learnings.md`'s own Review Process and promote anything Critical/Important and reusable to `AI/policies/` or `conventions.md`'s Framework Terms section first.
- `CONTRIBUTING.md` → "Versioning framework files": bump a file's minor version on any change that also earns a changelog bullet, major version on a breaking restructure, leave unchanged for typo/wording edits.
- `AI/workflows/framework-review.md` (new): a human-triggered, non-per-feature workflow to periodically audit the framework layer for stale cross-references and contradictions as it grows.

---

## Reason

DECISION-009 already established documentation as company memory. This decision closes the gap where that principle applied to every layer except the one enforcing it. A framework cannot credibly demand mechanical rigor from products while exempting its own PRs from the same discipline.

---

## Consequences

Positive:

- Framework-layer changes accumulate an honest history instead of relying on commit messages alone.
- Cross-product learnings compound across `init-project.md` resets instead of resetting to zero every time.
- Version headers become a trustworthy signal again.

Negative:

- Slightly more friction on framework PRs (one changelog bullet minimum).
- `check_changelog.py` needs `fetch-depth: 0` in CI checkout and will need maintenance if GitHub's pull_request event payload shape changes.

---

# DECISION-012

# Graphify Exception To Tool-Agnosticism

Date:

2026-08-05

Status:

Accepted

Owner:

Founder

Review Date:

2026-11-05

---

## Context

An `/analyze` pass on "how to integrate graphify with Kenovis to save tokens" found that `AI/commands/bootstrap.md` mandates a full read of `PRODUCT/`, `DOMAIN/`, `ENGINEERING/`, `AI/memory/*`, and `CODE/` at the start of every session — roughly 14k tokens of doc corpus alone today, before `CODE/` holds any real implementation. [graphify](https://graphify.net/) (MIT, `Graphify-Labs/graphify`) turns a repo into a queryable knowledge graph (Tree-sitter AST locally for code, LLM semantic extraction for docs/PDF/images) and claims 70-90% token reduction when agents query the graph instead of reading raw files.

Graphify's primary integration surface is per-tool: `graphify install --platform claude` writes a Claude Code skill, a `PreToolUse` hook, and a `## graphify` section into root `CLAUDE.md`. Its query commands (`graphify query`, `graphify explain`, `graphify path`, `graphify affected`, `graphify god-nodes`) are plain CLI, usable from any tool with shell access — but naming them explicitly inside `AI/commands/bootstrap.md` and `AI/workflows/*.md` still couples the framework's own instructions to one specific external CLI existing on disk, which [DECISION-010](DECISIONS.md) reserves for `CLAUDE.md` only.

The founder explicitly directed accepting this coupling for graphify, overriding the default DECISION-010 constraint for this one integration.

---

## Options Considered

### Option A

Keep DECISION-010 strict: describe the pattern generically inside `AI/` ("query a knowledge graph if one exists") without naming graphify or its CLI.

Advantages:

- Zero additional tool lock-in. Fully portable to Maker or any future tool.

Disadvantages:

- No concrete tool actually gets wired up. The token savings stay theoretical until every tool independently builds or configures graph tooling.

---

### Option B

Grant a scoped exception: `AI/commands/bootstrap.md` and `AI/workflows/feature.md`, `bugfix.md`, `review.md` reference graphify's CLI commands directly (`graphify query`, `explain`, `affected`, `god-nodes`) as the preferred path before falling back to full reads. Graphify's Claude Code-specific install (skill, `PreToolUse` hook, `.claude/settings.json`) stays exactly where graphify itself puts it — `CLAUDE.md` and `.claude/`, consistent with where DECISION-010 already confines tool-specific mechanisms.

Advantages:

- Real, measurable token reduction starting now, not after some future multi-tool graph abstraction gets built.
- The Claude Code-specific half of the install (skill/hook) already lands outside `AI/`, in `CLAUDE.md`/`.claude/` — only the CLI command names leak into `AI/`.

Disadvantages:

- `AI/commands/bootstrap.md` and `AI/workflows/*.md` now assume a specific external binary (`graphify`) may be present on disk. A tool without an equivalent graph CLI gets no benefit and must fall back to the full-read path (which the wording preserves as a fallback, not a hard requirement).
- Graphify is a young external OSS project (single maintainer at time of writing). If it's abandoned, the graph-query references in `AI/` become dead instructions until reverted or replaced.

---

## Decision

Adopt Option B, scoped strictly to graphify's query CLI referenced from `AI/commands/bootstrap.md` and `AI/workflows/feature.md`, `bugfix.md`, `review.md`. DECISION-010 remains in force for every other tool-specific mechanism — this is a named, single exception, not a reopening of the rule.

`graphify-out/` (the generated graph) is gitignored and regenerated locally per clone; nothing graph-derived is committed.

---

## Reason

Bootstrap fires at the start of every session per its own trigger conditions — the doc-corpus read cost is recurring, not one-time. Waiting for a hypothetical tool-agnostic graph abstraction before capturing that saving was judged not worth the delay, given Claude Code is the primary daily driver today and cross-tool portability (Maker) is not presently being exercised in practice.

---

## Consequences

Positive:

- Bootstrap and workflow context loading drop from full-file reads (~14k tokens for the current doc corpus, growing as `CODE/` fills in) to scoped graph queries (~200 tokens per the tool's own benchmark claim), compounding every session.
- The Claude Code-specific install mechanics stay correctly scoped to `CLAUDE.md`/`.claude/`, so the `AI/` leak is limited to CLI command names, not hooks or skill definitions.

Negative:

- Running the AI-OS from a tool without `graphify` on `PATH` (or an equivalent) loses the token saving and falls back to full reads — acceptable today, a real cost if Maker (or another tool) becomes primary.
- New external runtime dependency (`graphifyy` PyPI package) that isn't part of the product's own stack — must be reassessed at the review date for maintenance health.

---

# DECISION-013

# Kenovis Product Definition & Initial Distribution Model

Date:

2026-08-05

Status:

Accepted

Owner:

Founder

Review Date:

2027-02-05

---

## Context

This repository carried example/placeholder product-layer content (COMPANY_OS.md, DECISIONS.md, DOMAIN/, PRODUCT/, ENGINEERING/, AUTOMATIONS/, AI/memory/, CODE/). Per `AI/commands/init-project.md`, that content had to be replaced with a real company's context before any product work continues.

The founder confirmed: Kenovis's product is not a separate application built on top of this framework — the product IS the Kenovis AI-OS itself (this repository's Framework layer: `AI/agents/`, `AI/workflows/`, `AI/policies/`, `AI/commands/`, `AI/templates/`, `AI/SYSTEM.md`), distributed to other teams. Initial segment: software developers and small dev teams — the segment most likely to adopt agentic tooling with the least friction. The problem solved: a small team lacks a full specialized organization (PM, architect, security reviewer, QA...); Kenovis packages that as a disciplined roster of specialized AI agents. Long-term: the same operating model extends to other professional practices (legal, accounting) beyond software.

---

## Options Considered

### Option A

Build a distinct product on top of the framework (the framework stays purely internal tooling; the product is something else entirely).

Advantages:

- Cleanly separates "tool we use" from "thing we sell."

Disadvantages:

- Not what the founder directed. Would require inventing a product with no basis in the actual conversation.
- Loses the dogfooding advantage that is Kenovis's strongest structural edge.

---

### Option B

The product IS the AI-OS framework itself, distributed to other teams as a CLI/template (no backend, no hosted service in v1), open-core business model, initial customer segment = software development teams.

Advantages:

- Matches the founder's explicit direction.
- Maximal dogfooding: this repository is simultaneously the product's own Installation and its reference implementation.
- No infrastructure required to start — the entire v1 surface is the framework's own markdown plus a CLI installer/sync tool.

Disadvantages:

- Recursive structure requires discipline: agents must distinguish "editing the Framework layer that ships to customers" from "editing Kenovis's own Product layer" (this very document). The two must never be conflated.
- CODE/ for this product will eventually hold the CLI installer's implementation — itself subject to the framework's own architecture and security policies, which is unusual for a product-layer codebase.

---

## Decision

Adopt Option B.

- Company: Kenovis.
- Product: the Kenovis AI-OS (this repository's Framework layer), distributed via CLI/template — no backend, no database, no hosted dashboard in v1.
- Business model: open-core. The base framework is free; advanced agents, support and any future hosted extras are paid.
- Initial customer segment: software developers and small development teams.
- Tenancy model: not applicable in v1 — each Installation lives entirely inside a customer's own repository; Kenovis operates no shared backend.

---

## Reason

Explicit founder direction, and the strongest available product-market fit for a team of this size: building what you already use, for the people most like you, with zero infrastructure to operate before the model is even validated.

---

## Consequences

Positive:

- ENGINEERING/ARCHITECTURE.md, DATABASE.md and SECURITY.md for v1 are dramatically simpler — no server, no multi-tenant data model to secure.
- Every dogfooding session inside this repository (e.g. this initialization itself) is simultaneously real usage of the product.

Negative:

- Every future PR must keep Framework layer changes (which ship to customers) and Product layer changes (Kenovis's own company context) clearly separated — conflating them would corrupt the product being sold.
- The CLI installer that will eventually live in `CODE/` has no precedent elsewhere in this framework's example content; its architecture must be designed from scratch in Phase 0/1 of `PRODUCT/ROADMAP.md`, not copied from a typical SaaS CRUD app shape.

---

# Future Decisions

Future important decisions should be added here.

Examples:

- Technology choices.
- Pricing changes.
- Market expansion.
- Architecture changes.
- Business model changes.
- Partnership decisions.

---

# Final Principle

A decision without context is a preference.

A documented decision becomes company knowledge.
