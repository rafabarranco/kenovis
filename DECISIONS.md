<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

# DECISIONS.md

Company Decision Log

Version: 2.5

Last updated: —

---

# Document Layers

Most decisions in this log are product-specific and must be removed when starting a new product.

Seven are framework-level and should be carried over:

- DECISION-001 — AI-Native Company Operating Model.
- DECISION-009 — Documentation As Company Memory.
- DECISION-010 — AI Tooling Strategy.
- DECISION-011 — Framework Contribution & Memory Discipline.
- DECISION-012 — Graphify Exception To Tool-Agnosticism.
- DECISION-014 — Brownfield Adoption Path: adopt-project Command.
- DECISION-016 — No Framework-Mandated Directory Name For Customer Code (supersedes DECISION-015).

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

An `/analyze` pass on "how to integrate graphify with Kenovis to save tokens" found that `AI/commands/bootstrap.md` mandates a full read of `PRODUCT/`, `DOMAIN/`, `ENGINEERING/`, `AI/memory/*`, and `cli/` at the start of every session — roughly 14k tokens of doc corpus alone today, before `cli/` holds any real implementation. [graphify](https://graphify.net/) (MIT, `Graphify-Labs/graphify`) turns a repo into a queryable knowledge graph (Tree-sitter AST locally for code, LLM semantic extraction for docs/PDF/images) and claims 70-90% token reduction when agents query the graph instead of reading raw files.

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

- Bootstrap and workflow context loading drop from full-file reads (~14k tokens for the current doc corpus, growing as `cli/` fills in) to scoped graph queries (~200 tokens per the tool's own benchmark claim), compounding every session.
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

This repository carried example/placeholder product-layer content (COMPANY_OS.md, DECISIONS.md, DOMAIN/, PRODUCT/, ENGINEERING/, AUTOMATIONS/, AI/memory/, cli/). Per `AI/commands/init-project.md`, that content had to be replaced with a real company's context before any product work continues.

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
- cli/ for this product will eventually hold the CLI installer's implementation — itself subject to the framework's own architecture and security policies, which is unusual for a product-layer codebase.

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
- The CLI installer that will eventually live in `cli/` has no precedent elsewhere in this framework's example content; its architecture must be designed from scratch in Phase 0/1 of `PRODUCT/ROADMAP.md`, not copied from a typical SaaS CRUD app shape.

---

# DECISION-014

# Brownfield Adoption Path: adopt-project Command

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

`AI/commands/init-project.md` assumes a blank slate: it asks the human to decide a stack, empties `cli/` (Step 10), and forces fresh decisions on things a running codebase may have already settled (Step 6). That assumption breaks the moment a team wants to adopt the Kenovis AI-OS on top of a repository that already has a real, half-built or fully-built product in `cli/` — a very likely path for the actual target segment (COMPANY_OS.md → software development teams), most of whom are not starting from zero.

Running `/init-project` unmodified against such a repository would: delete real code (Step 10), force the human to re-decide a stack and tenancy model the code already implements (Step 6), and leave `PRODUCT/USER_RESEARCH.md` / `COMPETITIVE_LANDSCAPE.md` empty even where real, undocumented team knowledge exists — losing context instead of capturing it.

---

## Options Considered

### Option A

Extend `/init-project` itself with a brownfield branch (detect `cli/` is non-empty, skip Step 10, ask fewer questions).

Advantages:

- One command instead of two.

Disadvantages:

- Conflates two different epistemics in one document: "nothing exists, decide" vs "something exists, discover." The steps that make sense for one actively harm the other (Step 10's deletion, Step 6's "decide explicitly").
- Makes `init-project.md` longer and more conditional, harder to follow correctly under either scenario.

---

### Option B

Add a distinct command, `AI/commands/adopt-project.md`, mirroring `init-project.md`'s structure but built around auditing `cli/` first (with confidence-tagged findings) and never touching `cli/` beyond its README.

Advantages:

- Each command stays a single, coherent epistemic model: `init-project` decides, `adopt-project` discovers-then-confirms.
- `init-project.md` stays simple for the true-greenfield case it was designed for; a one-line pointer in its Trigger section routes brownfield repositories to the new command instead of silently mishandling them.
- Matches how the framework already treats reconstructed vs. decided context elsewhere (e.g. DECISION-012's confidence framing).

Disadvantages:

- A second command to maintain and keep in sync with `init-project.md` when the shared parts (Steps 3, 6 vision/strategy, memory reset) change.

---

## Decision

Adopt Option B.

- New command: `AI/commands/adopt-project.md` (v1.0). Audits `cli/` before touching any product-layer document, tags every reconstructed fact with a confidence level (High/Medium/Low) and a file/line citation, never empties or rewrites `cli/` beyond its README, and verifies completion by contrast against the code rather than by absence of example terms.
- `AI/commands/init-project.md` Trigger section (1.1 → 1.2) now explicitly routes repositories where `cli/` already holds a real implementation to `adopt-project.md` instead.
- `AI/SYSTEM.md` (1.0 → 1.1) lists `/adopt-project` alongside `/init-project` as one of the two possible first commands in a repository.
- `README.md` gains an "Adopting an existing product" section and the repository map lists the new command.
- `PRODUCT/ROADMAP.md` (1.0 → 1.1) Phase 0 CLI install command is scoped to detect greenfield vs. brownfield target repositories and route accordingly, rather than always assuming a blank slate.

---

## Reason

The framework's own source-of-truth hierarchy (`AI/SYSTEM.md`) ranks real business rules and domain models above AI suggestions and above implementation code for conflicts — but a command that deletes the code before anyone reads it never gives that hierarchy a chance to apply. Kenovis's own target segment (small dev teams, COMPANY_OS.md) will disproportionately already have code. A framework that only knows how to onboard empty repositories doesn't fit the segment it says it's for.

---

## Consequences

Positive:

- Brownfield adoption no longer risks destroying real code or forcing redundant re-decisions on a running stack.
- Reconstructed facts carry confidence markers and citations, so the resulting `ENGINEERING/`/`DOMAIN/` documents are verifiable against the code instead of merely plausible.
- Phase 0's CLI installer (not yet built) has an explicit requirement to route correctly instead of discovering the gap after ship.

Negative:

- Two command documents now share structure (vision/strategy steps, memory-reset review process) that must be kept consistent by hand — a future framework-review pass (`AI/workflows/framework-review.md`) should check both stay in sync when either changes.

---

# DECISION-015

# Adoption Never Relocates Customer Code Into A Kenovis-Chosen Directory

Date:

2026-08-05

Status:

Superseded by DECISION-016 (same day — the founder's follow-up question exposed that this decision's own "the directory may contain nothing but README.md" resolution still assumed a dedicated directory concept that shouldn't exist generically). Kept below for the reasoning trail; do not follow "a dedicated README.md is the fixed pointer" from this entry — see DECISION-016.

Owner:

Founder

Review Date:

2027-02-05

---

## Context

A founder-driven `/analyze` on distribution friction ("cómo podríamos hacer este producto usable por todo el mundo") found that `/adopt-project`'s Trigger and detection logic ("How To Recognise Adoption Is Needed") required a specific directory to already be non-empty — read literally, this meant a customer adopting Kenovis into an existing repository had to first copy their own real code into a Kenovis-chosen folder inside a clone of this repository, before the command would even apply.

Tracing the root cause further found the assumption was not local to `adopt-project.md`: `AI/commands/bootstrap.md` stated flatly that "Product and platform implementation lives under a dedicated directory" one line above instructing the opposite — "do not assume a monorepo, a single app, or any particular directory layout." `AI/SYSTEM.md` and `README.md` repeated the same literal-directory phrasing. The contradiction was already latent in the framework; the founder's complaint was the first time it produced a concrete, blocking symptom.

---

## Options Considered

### Option A

Leave a literal, mandatory top-level directory name in place for every Installation, greenfield or brownfield. `/adopt-project` (and, eventually, the CLI's install command — PRODUCT/ROADMAP.md Phase 0) would be responsible for physically moving a customer's existing implementation into it as part of installation.

Advantages:

- One consistent physical convention across every Installation, no branching logic.

Disadvantages:

- Forces every brownfield customer's repository to be restructured just to adopt the framework — the exact friction the founder flagged as making the product unusable for real teams. A tool that reorganizes a running codebase's file layout on install is a much larger, riskier promise than a documentation framework should be making.

---

### Option B

A dedicated `README.md` is the only fixed element: a pointer file that documents where the real implementation actually lives. For greenfield Installations (`/init-project` scaffolding from nothing), a literal top-level directory (this repository's own product uses `cli/`) remains Kenovis's own suggested default layout — nothing to reorganize because nothing exists yet. For brownfield Installations (`/adopt-project`), the customer's implementation stays exactly where it already is; that directory may contain nothing but `README.md`, describing the real location.

Advantages:

- Resolves the founder's reported blocker directly: adopting Kenovis, even by hand-copying just `AI/` and `CLAUDE.md` into an existing repository today (ahead of the CLI), never requires touching the customer's own code layout.
- Removes the standing self-contradiction between `bootstrap.md`'s two adjacent lines instead of leaving it to resurface elsewhere.
- No change to `DOMAIN/DOMAIN_MODEL.md` or `DOMAIN/BUSINESS_RULES.md` RULE-INST-01/02 — both already only require that the code (whatever path it lives at) belongs to the Product layer and is never silently overwritten; neither mandates a physical layout.

Disadvantages:

- A dedicated directory stops being a reliable physical signal of "where the code is" by itself — every agent must actually read its README.md rather than assuming the directory contents. This was already true in practice (`bootstrap.md` already instructed reading the README first) but is now the documented rule rather than an inconsistency.

---

## Decision

Adopt Option B.

- `AI/commands/bootstrap.md` (2.1 → 2.2): removed the flat "implementation lives under a dedicated directory" statement; replaced with the greenfield/brownfield distinction above.
- `AI/commands/adopt-project.md` (1.0 → 1.1): Purpose, Trigger, and "How To Recognise Adoption Is Needed" no longer require a non-empty literal folder with any specific name — they require a real implementation somewhere in the target repository.
- `AI/SYSTEM.md` (1.1 → 1.2): commands overview updated to match.
- `README.md`: "Adopting an existing product" section updated to match.
- `PRODUCT/ROADMAP.md`'s Phase 0 "Immediate Priority" item 3 (CLI installer) must apply this rule when implemented: the CLI installs the Framework layer into the target repository without moving or renaming any of the customer's existing code.

---

## Reason

DOMAIN/BUSINESS_RULES.md's Core Principle states the stakes plainly: "What is at stake if Kenovis gets this wrong is customer trust in adopting an AI system inside their own codebase." A framework that requires restructuring a running codebase's directory layout before it can even audit that codebase asks for exactly the kind of trust it cannot yet have earned. The lower-risk, lower-promise option is also the one that matches how `bootstrap.md` already told agents to behave in practice (read the README, don't assume a layout) — Option B makes the documented rule match the behavior the framework already relied on.

---

## Consequences

Positive:

- Manual adoption (copying `AI/` and `CLAUDE.md` into an existing repository by hand) is usable today, without waiting on the Phase 0 CLI, and without asking the customer to touch their own code.
- The `bootstrap.md` self-contradiction is resolved at its source instead of papered over locally in `adopt-project.md`.

Negative:

- The Phase 0 CLI installer (not yet built) now carries an explicit, testable requirement — "never move or rename customer code" — that must be verified once it exists, not merely assumed from the docs.

---

# DECISION-016

# No Framework-Mandated Directory Name For Customer Code

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

Immediately after DECISION-015 shipped, the founder asked the natural follow-up: once `npx kenovis (init-project|adopt-project)` is real (PRODUCT/ROADMAP.md Phase 0), the CLI runs inside the customer's own repository and Kenovis "just works there" — so why would any particular directory name need to exist at all for a customer Installation?

DECISION-015 had only gone half the distance: it stopped adoption from *relocating* a customer's code into a Kenovis-chosen directory, but kept a dedicated per-implementation `README.md` as a fixed, framework-mandated pointer file every Installation was assumed to have. Re-reading the framework with that question in mind found the deeper source of the original confusion: `ENGINEERING/ARCHITECTURE.md` already has a "Suggested Project Structure" section whose entire job is to document where a product's code lives and how it's organized. That dedicated README.md was a second, redundant file trying to answer the same question, and it was the redundancy — two files claiming to be the pointer — that produced the original contradiction DECISION-015 only partly resolved.

Separately, this repository's own `cli/` (where Kenovis's own CLI implementation lives, per `cli/README.md` and `ENGINEERING/ARCHITECTURE.md`'s "Suggested Project Structure") is legitimate and unaffected by this decision — Kenovis-the-product chose that layout for itself, the same way any product's `ENGINEERING/ARCHITECTURE.md` gets to choose its own layout. What was wrong was treating that one product's choice as a generic requirement every future Installation inherits.

---

## Options Considered

### Option A

Keep DECISION-015: a dedicated per-implementation `README.md` remains a fixed, always-present file across every Installation, greenfield or brownfield, pointing at wherever the real code is.

Advantages:

- Smaller change; DECISION-015 already shipped.

Disadvantages:

- Leaves a redundant concept in the framework: `ENGINEERING/ARCHITECTURE.md` → "Suggested Project Structure" and a dedicated per-implementation `README.md` would both exist to answer the same question, for every Installation forever. Every future customer with, say, a Next.js app at their repo root would have a mandatory empty directory containing only a README that says "see repo root" — dead weight with no purpose beyond convention.

---

### Option B

Retire a dedicated per-implementation `README.md` as a framework concept entirely. `ENGINEERING/ARCHITECTURE.md` → "Suggested Project Structure" is the single, sufficient place every product (including Kenovis's own) documents where its code lives and how it's organized. No Installation is required to have a directory with any specific name. A product may still choose one — Kenovis's own product uses `cli/`, decided in its own `ENGINEERING/ARCHITECTURE.md` — but that is a per-product choice made in Step 6 of `/init-project` or reconstructed in Step 7 of `/adopt-project`, never a framework default.

Advantages:

- One canonical place for "where's the code," not two — removes the redundancy that caused DECISION-015's problem in the first place.
- Matches the real target distribution model precisely: `npx kenovis init-project` (or `adopt-project`) runs inside the customer's own repository and writes Product-layer docs there; the customer's code — wherever it already is, or wherever they choose to put it going forward — is never wrapped in a Kenovis-invented directory.
- This repository's own `cli/` is unaffected: it remains exactly what `cli/README.md` already says it is, now correctly framed as this product's own architectural choice rather than a framework rule.

Disadvantages:

- Touches more files than DECISION-015 did: `AI/SYSTEM.md`, `AI/commands/bootstrap.md`, `AI/commands/adopt-project.md`, `AI/commands/init-project.md`, `AI/workflows/architecture.md`, `AI/workflows/roadmap.md`, `AI/workflows/feature.md`, `AI/workflows/bugfix.md`, `AI/workflows/review.md`, `AI/policies/coding.md`, `AI/policies/documentation.md`, `README.md`, `DOMAIN/DOMAIN_MODEL.md`, `DOMAIN/BUSINESS_RULES.md`. All are wording/pointer changes (swap the dedicated per-implementation README.md for "`ENGINEERING/ARCHITECTURE.md`," or drop a directory-name-specific assumption) — no phase renumbering, no mechanic redesign.

---

## Decision

Adopt Option B. Supersede DECISION-015.

- A dedicated per-implementation `README.md` is no longer a framework-referenced concept. Every place that pointed to it for "where's the code" now points to `ENGINEERING/ARCHITECTURE.md` → "Suggested Project Structure" instead.
- `DOMAIN/DOMAIN_MODEL.md`'s Installation entity and `DOMAIN/BUSINESS_RULES.md` RULE-INST-01 no longer list a specific directory name as a fixed Product-layer path; they protect "the customer's own existing code, wherever it lives" instead.
- `AI/commands/init-project.md` Step 10 is renamed "Clear Any Leftover Implementation" — it only applies to a same-repository product pivot, not first-time installs, and it no longer instructs creating or emptying a specifically-named directory.
- `AI/commands/adopt-project.md` Step 11 is renamed "Do Not Touch The Customer's Existing Code" and rewrites `ENGINEERING/ARCHITECTURE.md`, not a dedicated per-implementation `README.md`.
- This repository's own `cli/` directory, and `cli/README.md`'s content, are unchanged — they remain accurate as this product's own architectural choice.
- `PRODUCT/ROADMAP.md`'s Phase 0 CLI installer requirement (never relocate or rename customer code) carries forward unchanged from DECISION-015; this decision only removes the now-redundant dedicated-README.md half of that resolution.

---

## Reason

`AI/policies/architecture.md` → "Single Responsibility" and "Reuse" argue against two things existing to do one job. A dedicated per-implementation `README.md` and `ENGINEERING/ARCHITECTURE.md` → "Suggested Project Structure" were exactly that: two pointers to the same fact. Collapsing to one removes the redundancy that made DECISION-015 necessary in the first place, and matches the founder's stated target precisely — a customer runs the CLI inside their own repository and it "just works there," with nothing Kenovis-specific imposed on how their code is organized.

---

## Consequences

Positive:

- No customer Installation is ever expected to have an empty, purposeless dedicated-code folder.
- One canonical file (`ENGINEERING/ARCHITECTURE.md`) answers "where's the code" for every product, including this one — consistent with how every other structural question in the framework already resolves to a single Product-layer document.
- Closes the loop DECISION-015 opened without fully resolving.

Negative:

- Two decisions (DECISION-015, then DECISION-016) on the same day, on the same underlying question, is a visible sign the first pass under-scoped the problem. Recorded here rather than silently rewriting DECISION-015, per DECISION-009's discipline — the trail is the point.

---

# DECISION-017

# Framework Layer Packaging: `.kenovis/` Hidden Directory

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

PRODUCT/ROADMAP.md's Phase 0 "Immediate Priority" item 1 required an ADR before the CLI installer (item 3) could be built: how does the Framework layer (`AI/` minus `memory/`, `CLAUDE.md`, `.claude/`, `README.md`) get packaged inside a target repository so it stays out of the customer's way, while the Product layer (`COMPANY_OS.md`, `DECISIONS.md`, `PRODUCT/`, `DOMAIN/`, `ENGINEERING/`, `AUTOMATIONS/`, `AI/memory/`) plus the customer's own code (DECISION-016) stays fully visible at repo root — the founder's original framing from the `/analyze` that started this whole thread: "la infra kenovis-specific sea invisible al usuario, sin embargo la infra product-specific debe estar visible al usuario."

Run via `/architect` (`AI/commands/architect.md`). Hard constraints going in: `CLAUDE.md` must stay at repo root (Claude Code autoload, DECISION-010); `.claude/` likewise (same reason, already the case for `graphify`'s install per DECISION-012); any sync must remain reversible/diffable through normal git (RULE-INST-01/02); this must be decided before the CLI (item 3) starts writing real installs, since retrofitting a directory move afterward breaks RULE-INST-02.

---

## Options Considered

### Option A

Status quo: Framework layer stays at target repo root exactly as it does in this repository today (`AI/`, `CLAUDE.md`, `README.md` at top level, alongside Product-layer folders and the customer's own code).

Advantages: zero migration cost, zero cross-reference risk, matches every existing doc link as-is.

Disadvantages: does not satisfy the founder's explicit ask. A customer's repo root listing mixes 20+ framework files (12 agent definitions, workflows, policies, commands, templates) with their own project — exactly the visual clutter flagged as a blocker to adoption.

---

### Option B

Move the entire Framework layer into a single hidden top-level directory, `.kenovis/`, mirroring the existing developer convention for tool-owned config (`.github/`, `.vscode/`, `.husky/` — directories developers already read as "tooling, not my code," typically collapsed or ignored in file-tree UIs). `CLAUDE.md` stays at repo root (forced, minimal) and points into `.kenovis/AI/SYSTEM.md`. `.claude/` stays at repo root (forced, same as today's `graphify` install).

This reopens a concrete sub-problem: `README.md` currently doubles as Kenovis's own explanatory document (two-layer model, repository map, source-of-truth hierarchy). A customer with an existing repository already has their own `README.md` describing their own product — the CLI can never silently overwrite it (RULE-INST-01). Two sub-resolutions were considered:

- **B1**: Kenovis's explanatory README content moves to `.kenovis/README.md`. The customer's own root `README.md`, if one exists, is never touched by install or sync.
- **B2**: the CLI appends a small "Powered by Kenovis AI-OS — see `.kenovis/README.md`" section to whatever `README.md` already exists (or creates a minimal one if none exists), rather than relocating Kenovis's explanation entirely.

Advantages: satisfies the founder's ask precisely — a customer's root listing shows their own project, the visible Product-layer docs, and one clearly-named, ignorable `.kenovis/` entry.

Disadvantages: real migration cost — every relative link inside `AI/commands/*.md`, `AI/workflows/*.md`, etc. (hundreds, across this very repository alone) needs re-pathing once this repository itself adopts the convention; `CLAUDE.md` needs to actually load correctly from a dot-directory, which needs verifying once built, not assumed from documentation; B2 specifically risks writing into a file that is 100% the customer's own content, which cuts against RULE-INST-01's spirit even as an append.

---

### Option C

Keep `AI/` at target repo root, uppercase, unhidden — the founder's "invisible" complaint could instead be addressed by trusting that an uppercase top-level folder already reads as "not my code" the way `docs/` often does, and by reducing file count rather than hiding the directory.

Advantages: zero migration cost, ships alongside item 3 immediately, no README-collision problem to solve.

Disadvantages: does not actually satisfy "invisible" — `AI/` still appears prominently, unhidden, in every file-tree view and directory listing a customer opens.

---

## Decision

Adopt Option B, resolved as **B1**.

- The CLI (PRODUCT/ROADMAP.md Phase 0 item 3, `install`/`init`/`sync` commands) writes the Framework layer under a `.kenovis/` directory in the target repository: `.kenovis/AI/{agents,workflows,policies,commands,templates}/`, `.kenovis/AI/SYSTEM.md`, `.kenovis/README.md` (Kenovis's own explanatory doc, moved from root).
- `CLAUDE.md` (repo root, forced by Claude Code autoload) becomes a minimal stub that loads `.kenovis/AI/SYSTEM.md` as its entry point.
- `.claude/` (repo root, forced, per DECISION-012) is unaffected — same placement as today.
- The customer's own `README.md`, if one already exists, is never overwritten, appended to, or otherwise touched by install or sync. If none exists, the CLI does not fabricate one — an empty root README is the customer's decision, not Kenovis's to make for them.
- `ENGINEERING/ARCHITECTURE.md` → "Hard Rules (No Exceptions)" is updated to state this packaging rule explicitly, so it is enforceable, not just described here.
- This repository's own migration to `.kenovis/` (dogfooding the real end-state on itself, per DECISION-013's maximal-dogfooding stance) is Phase 2 of the implementation strategy below — not part of this ADR's immediate scope, since it requires re-pathing every relative link this repository's own framework files currently use, and is better validated by first building and using the CLI's own sync mechanism (Phase 1) than by a manual mass find-replace.

---

## Reason

B1 was chosen over B2 specifically because RULE-INST-01/02 exist to protect customer trust — DOMAIN/BUSINESS_RULES.md's Core Principle states the stakes as "customer trust in adopting an AI system inside their own codebase." B2's append-to-existing-README, even done carefully, is still a write to a file that is entirely the customer's own content and was never a Kenovis-owned artifact. B1 avoids that class of risk entirely: `.kenovis/README.md` is unambiguously Kenovis's own file from the first commit, with the same clean ownership boundary the rest of the Framework layer already has.

---

## Consequences

Positive:

- Directly satisfies the founder's original ask: framework infrastructure becomes visually invisible (one dot-directory), product infrastructure stays fully visible at repo root.
- Removes any ambiguity about whether the CLI is allowed to touch a customer's existing README — it categorically is not, under either sub-option, but B1 removes the temptation to even consider it.
- `ENGINEERING/ARCHITECTURE.md`'s Hard Rules section now has an explicit, checkable packaging rule for the CLI to be built against and reviewed against.

Negative:

- Real engineering cost lands on PRODUCT/ROADMAP.md Phase 0 item 3 (the CLI build), not resolved by this ADR alone — this decision unblocks item 3, it does not complete it.
- This repository's own Framework layer stays at root (unmigrated) until Phase 2 of the implementation strategy — meaning this repository does not yet dogfood the exact packaging it now prescribes for customers, a temporary and explicitly tracked inconsistency, not an oversight.

---

## Implementation Strategy

Phase 1 (with PRODUCT/ROADMAP.md Phase 0 item 3): CLI `install`/`init` writes the Framework layer under `.kenovis/` in the target repository; resolves the README question per B1; wires the target repository's `CLAUDE.md` to `.kenovis/AI/SYSTEM.md`.

Phase 2: this repository migrates its own Framework layer from root into `.kenovis/`, re-pathing its internal cross-references, using the CLI's own sync mechanism on itself — the dogfooding validation that the mechanism works, not just that the documentation describes it.

Phase 3: CLI sync gains diff-preview before applying (already scoped in PRODUCT/ROADMAP.md Phase 2 — Product Market Fit).

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
