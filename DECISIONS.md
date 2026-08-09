<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

# DECISIONS.md

Company Decision Log

Version: 2.9

Last updated: —

---

# Document Layers

A decision log is product-specific. A customer Installation's log starts empty and accumulates that company's own decisions — see DECISION-021 and `.kenovis/AI/templates/product-layer/DECISIONS.md`.

This repository is the exception, for the same reason DECISION-020 gives: its product *is* the framework, so decisions about how the framework behaves are genuinely this company's own product decisions. Eight of them are framework-level in effect — framework-layer files cite them by ID, and they would survive a repurposing of this repository:

- DECISION-001 — AI-Native Company Operating Model.
- DECISION-009 — Documentation As Company Memory.
- DECISION-010 — AI Tooling Strategy.
- DECISION-011 — Framework Contribution & Memory Discipline.
- DECISION-012 — Graphify Exception To Tool-Agnosticism.
- DECISION-014 — Brownfield Adoption Path: adopt-project Command.
- DECISION-016 — No Framework-Mandated Directory Name For Customer Code (supersedes DECISION-015).
- DECISION-019 — Collision Guard Against Silent Product-Layer Overwrite In init-project/adopt-project.

Everything else is product-specific and should be recorded as real decisions get made. See .kenovis/AI/commands/init-project.md.

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

# DECISION-018

# Auto-Trigger init-project/adopt-project Without A Manual Slash Command

Date:

2026-08-06

Status:

Accepted

Owner:

Founder

Review Date:

2027-02-06

---

## Context

PRODUCT/ROADMAP.md's Phase 0 "Immediate Priority" item 4 (added 2026-08-06, from `/analyze` on install-flow friction) required an ADR before implementation: today `npx kenovis init` scaffolds `.kenovis/` correctly but only prints a suggestion ("Next: run /init-project") — the customer must still manually type the slash command in a separate step, which the founder flagged as backwards for "usable by anyone."

`/analyze` traced the root cause: this repository's own root `CLAUDE.md` carries a "Session Initialization Protocol" precondition — placeholder product layer → stop → run `/init-project` — that makes this repository self-trigger, without a manual command, because Claude Code autoloads `CLAUDE.md` every session (DECISION-010). But `cli/scripts/bundle-framework-assets.mjs` only bundles `AI/` (minus `memory/`) into the package a customer installs — it never bundles this repository's own root `CLAUDE.md`. The stub `CLAUDE.md` a customer's install actually gets (`claudeStubContent()`, `cli/src/domain/installation.ts`) is minimal and passive: it only points at `.kenovis/AI/SYSTEM.md`, which carries no equivalent trigger.

Hard constraints going in: must not shell out to any AI CLI binary at install time — DECISION-010 explicitly commits the AI-OS to remaining "plain, tool-agnostic markdown, readable and followable by any AI tool," and `cli/assets/framework/README.md` → "Tool compatibility" already makes that same promise to customers. `init-project.md` and `adopt-project.md` are conversational — both refuse to continue without human answers ("Do not continue without answers," "Never invent a company") — so no non-interactive process can complete them on a customer's behalf. Must also fold in the rest of Phase 0 item 4's scope: a new `kenovis add` command (adopt-project's counterpart to `init`), cross-detection errors (`init` on a detected-brownfield target refuses and points at `add`; `add` on a detected-greenfield target refuses and points at `init`), and a bare `npx kenovis` (no subcommand) that autodetects and dispatches.

---

## Options Considered

### Option A

Shell out to an AI CLI binary (`claude -p "/init-project"` or similar) at the end of `kenovis init`/`kenovis add`, if found on `PATH`.

Advantages: closest to literal "auto-runs the command," no changes needed to `AI/commands/*.md` or `AI/SYSTEM.md`.

Disadvantages: directly breaks DECISION-010 — couples the CLI to one AI tool's binary being installed and authenticated on the customer's machine, with no fallback for any other tool. `init-project`/`adopt-project` are conversational (ask the human, refuse to invent answers); a headless, non-interactive invocation either hangs waiting for input it can't receive, or is forced to invent answers, which both commands' Rules explicitly forbid. Silent dependency on an external, unversioned runtime the CLI does not control.

---

### Option B

Marker file only: write `.kenovis/.setup-pending` (contents: `init-project` or `adopt-project`) at install time. Add an instruction to `AI/SYSTEM.md` → "Context Loading Rules" telling any agent to check for it and act on it. Leave the `CLAUDE.md` stub unchanged (passive, points at `AI/SYSTEM.md`).

Advantages: keeps the stub simple; the trigger logic lives in one tool-agnostic place (`AI/SYSTEM.md`), consumable identically regardless of which AI tool eventually reads it.

Disadvantages: `AI/SYSTEM.md` is not itself autoloaded by anything — DECISION-010 already established that only root `CLAUDE.md` gets automatic loading (Claude Code) and every other tool must be manually pointed at `AI/SYSTEM.md`. A marker only `AI/SYSTEM.md` knows to check is invisible until an agent already decided, on its own, to open that file — the exact manual step this decision exists to remove.

---

### Option C

Combine a marker file with an imperative directive in the `CLAUDE.md` stub itself. `claudeStubContent()` (`cli/src/domain/installation.ts`) becomes parametrized by `InstallationKind`: while `.kenovis/.setup-pending` exists, the stub's first instruction is "Before doing anything else this session, run `AI/commands/init-project.md`" (or `adopt-project.md` for brownfield) — with the detection result the CLI already computed at install time (`detectInstallationKind`) baked in, so the agent never has to re-detect. The marker file itself carries the same information in structured form, so `AI/SYSTEM.md` → "Context Loading Rules" can also point at it for any tool that loads `AI/SYSTEM.md` manually (DECISION-010's existing path for non-Claude-Code tools). `init-project.md` Step 12 and `adopt-project.md` Step 13 ("Record the Initialization/Adoption") gain a closing sub-step: delete `.kenovis/.setup-pending` and rewrite the `CLAUDE.md` stub back to its passive, steady-state form.

Advantages: uses the one channel DECISION-010 already guarantees autoloads (root `CLAUDE.md`, for the primary tool) instead of inventing a new one; degrades gracefully for other tools via the existing manual-`AI/SYSTEM.md` path, unchanged from today; self-clearing (survives an interrupted first session — the marker persists until the command's own completion criteria remove it, so a cut-short session correctly re-triggers next time instead of silently going stale); no new runtime dependency, no code execution, filesystem-only (`ENGINEERING/ARCHITECTURE.md` Hard Rules).

Disadvantages: `claudeStubContent()` and its call sites (`init.ts`, the new `add.ts`) need a second parameter (`InstallationKind`, pending/steady-state) and a second write path (the completion-time rewrite), a little more surface than Option B alone. Still no guaranteed autoload for tools other than Claude Code — that gap is pre-existing (DECISION-010's already-accepted negative consequence), not created or worsened by this decision.

---

## Decision

Adopt Option C, plus the rest of Phase 0 item 4's scope:

- `claudeStubContent()` takes the `InstallationKind` (`greenfield` | `brownfield`) and a `pending: boolean` flag. When `pending` is true, the stub opens with an imperative first-session directive naming the exact command to run (`AI/commands/init-project.md` or `AI/commands/adopt-project.md`) before anything else. When `pending` is false (steady state, post-completion), the stub is exactly today's passive text.
- `kenovis init`/`kenovis add` write `.kenovis/.setup-pending` alongside the stub, containing the resolved command name.
- `AI/commands/init-project.md` Step 12 and `AI/commands/adopt-project.md` Step 13 gain a closing sub-step: delete `.kenovis/.setup-pending` and rewrite `CLAUDE.md` via `claudeStubContent()` with `pending: false`.
- `AI/SYSTEM.md` → "Context Loading Rules" gains one line: if `.kenovis/.setup-pending` exists, run the command it names before any other action, regardless of how the session was entered.
- New `kenovis add <targetDir>` command: same install engine as `init` (`runInit`, `cli/src/application/commands/init.ts` — reused, not duplicated, since the only difference is which command the stub/marker point at), wired to the `adopt-project` outcome.
- Cross-detection becomes a hard refusal, not just a printed suggestion: `init` on a target `detectInstallationKind` reports as `brownfield` throws a new `BrownfieldDetectedError` (nothing is written) unless `--force` is passed; `add` on a target reported `greenfield` throws a new `GreenfieldDetectedError` symmetrically. Both errors name the correct command to run instead, matching the existing `AlreadyInstalledError`/`NotInstalledError` pattern in `cli/src/domain/installation.ts`.
- Bare `npx kenovis` (no subcommand) runs `detectInstallationKind` against the target directory itself and dispatches internally to the `init` or `add` path — it never throws the cross-detection error, since it is the one caller that decides for itself.

---

## Reason

Option A was rejected outright: it is the one option that actually contradicts an existing Accepted decision (DECISION-010) rather than trading off against it, and it cannot honor `init-project.md`/`adopt-project.md`'s own Rules ("Never invent a company," "Do not continue without answers") in a non-interactive invocation. Between B and C, C was chosen because DECISION-010 already draws the exact line this decision needs to reuse: `CLAUDE.md` is the one file the primary tool autoloads, everything else is manual-load. A trigger that only lives in the manual-load file (`AI/SYSTEM.md`, Option B) does not remove the manual step for Claude Code, the tool that matters for the customer segment PRODUCT/ROADMAP.md Phase 1 targets today (COMPANY_OS.md → Initial Market Strategy). Paying the small extra surface of a parametrized stub plus a marker (Option C) is justified because it actually achieves the founder's ask for the tool that is used by essentially all of today's target customers, while leaving the non-Claude-Code path exactly as capable as DECISION-010 already left it.

---

## Consequences

Positive:

- `npx kenovis init`/`npx kenovis add` in Claude Code go from "scaffold + printed suggestion the human must act on" to "scaffold + the very next agent turn runs the correct command" — no typed slash command required.
- Self-clearing via the marker: an interrupted first session does not leave the repository in a state that silently skips initialization/adoption forever, and does not keep re-prompting after real completion either.
- Reuses `detectInstallationKind` and the existing `AlreadyInstalledError`/`NotInstalledError` error-shape convention rather than inventing new patterns — consistent with `cli/src/domain/installation.ts` as it stands today.
- Does not weaken DECISION-010: no AI-tool-specific syntax enters `AI/`, `CLAUDE.md` remains the only tool-specific file, exactly as that decision already scoped it.

Negative:

- `init` now refuses to install on a detected-brownfield target without `--force` — a breaking change from today's always-install-plus-suggest behavior. Anyone currently scripting `kenovis init` against a non-empty directory on purpose needs `--force` after this ships; `CHANGELOG.md` must call this out explicitly as breaking, not additive.
- Two additional errors (`BrownfieldDetectedError`, `GreenfieldDetectedError`) and a second stub-write path (completion-time rewrite) add surface to `cli/src/domain/installation.ts` and to `init-project.md`/`adopt-project.md`'s own completion steps — small, but real maintenance cost.
- Still does not solve auto-trigger for AI tools other than Claude Code — unchanged from DECISION-010's already-accepted gap, but worth restating so it isn't mistaken for newly solved here.
- Needs a real end-to-end smoke test inside actual Claude Code (not just unit tests against `InMemoryFileSystem`) before publish, since the mechanism's entire value depends on Claude Code's autoload behavior working exactly as assumed — the same discipline Learning-004 already established for `--source`.

---

## Implementation Strategy

Phase 1: `cli/src/domain/installation.ts` — parametrize `claudeStubContent()`, add `.kenovis/.setup-pending` read/write helpers, add `BrownfieldDetectedError`/`GreenfieldDetectedError`. `cli/src/application/commands/init.ts` — apply the cross-detection refusal and the pending-marker write; extract the shared install engine so `add.ts` can reuse it. `cli/src/application/commands/add.ts` — new, thin wrapper around the shared engine pointed at `adopt-project`. `cli/src/cli/bin.ts` — wire the `add` subcommand and the bare (no-subcommand) autodetect-and-dispatch path.

Phase 2: `AI/commands/init-project.md` Step 12 and `AI/commands/adopt-project.md` Step 13 — add the marker-deletion and stub-rewrite closing sub-step. `AI/SYSTEM.md` → "Context Loading Rules" — add the one-line marker check. These are framework-layer files; per both commands' own Rules ("Never modify anything under AI/agents/... or AI/commands/ during initialization/adoption" is about *not touching them mid-run* — this is a separate, deliberate framework change, made and reasoned here, not silently during a run).

Phase 3: manual end-to-end smoke test in real Claude Code — `npx kenovis init` against an empty scratch directory, confirm the very next agent turn runs `/init-project` unprompted; `npx kenovis add` against a seeded scratch directory, confirm `/adopt-project` runs unprompted; confirm an interrupted session followed by a fresh session still triggers; confirm post-completion the stub reverts to passive and does not re-trigger. `CHANGELOG.md` documents the `init`-on-brownfield breaking change.

---

# DECISION-019

# Collision Guard Against Silent Product-Layer Overwrite In init-project/adopt-project

Date:

2026-08-06

Status:

Accepted

Owner:

Founder

Review Date:

2027-02-06

---

## Context

PRODUCT/ROADMAP.md's Phase 0 "Immediate Priority" item 5 (flagged 2026-08-06, from `/analyze` on file/directory name collisions between Kenovis and a target repository) found a gap: `cli/src/domain/installation.ts` guards exactly one file it writes — root `CLAUDE.md` (`ExistingClaudeMdError`, `isKenovisManagedClaudeStub`) — against silently discarding a customer's own pre-existing content there (AI/memory/learnings.md Learning-006). No equivalent guard exists for the Product-layer files `/init-project` and `/adopt-project` write (`COMPANY_OS.md`, `DECISIONS.md`, `DOMAIN/*.md`, `PRODUCT/*.md`, `ENGINEERING/*.md`, `AUTOMATIONS/*.md`): protection was textual only ("How To Recognise The Product Layer" — grep the `PROJECT-SPECIFIC` marker), never an enforced gate before writing. A target repository with its own unrelated file at one of those exact paths could be silently overwritten while the agent followed the command's own instructions correctly.

---

## Options Considered

### Option A

Rename the files Kenovis injects, so a collision at a customer's exact path becomes structurally impossible.

Advantages:

- Removes the collision class entirely rather than gating it.

Disadvantages:

- Infeasible for `CLAUDE.md` — Claude Code only autoloads that literal filename at repo root (DECISION-010).
- For the rest, requires a persisted name-mapping manifest nothing in the system has today, plus updating the 23+ framework files that already reference these paths by hardcoded name — disproportionate to the problem.

---

### Option B

Add a `Collision Guard` section to both commands (placed after their existing "How To Recognise..." section), referenced by every Step that rewrites a Product-layer file: before writing, check the file's first line for the `PROJECT-SPECIFIC` marker; if absent, stop and ask the human to confirm overwrite or move the file aside first. Mirrors `ExistingClaudeMdError`'s resolution, expressed as command prose instead of code since these are conversational commands with no CLI code path of their own.

Advantages:

- Matches the existing, already-proven pattern (`ExistingClaudeMdError`) instead of inventing a new resolution shape.
- A single shared section referenced seven-plus times per command avoids repeating the same paragraph in every Step (`AI/policies/architecture.md` → Single Responsibility / Reuse, the same reasoning DECISION-016 already applied to collapse a different redundancy).
- No ADR-level architecture change — no code, no new CLI mechanism, purely a stronger instruction gate on an already-conversational, human-confirms process.

Disadvantages:

- Enforcement depends on the agent actually following the instruction — unlike `ExistingClaudeMdError`, there is no code path to make the check unconditional. Acceptable because `/init-project` and `/adopt-project` are already fully conversational and human-gated end to end (both commands' Rules already say "do not continue without answers").

---

## Decision

Adopt Option B.

- `AI/commands/init-project.md` (1.5 → 1.6): new "Collision Guard" section; referenced by Steps 2-7 (every step rewriting a Product-layer file); Completion Criteria gained "No unmarked pre-existing file was overwritten without the human confirming."
- `AI/commands/adopt-project.md` (1.4 → 1.5): same shape — new "Collision Guard" section referenced by Steps 3-8; same Completion Criteria addition.
- `PRODUCT/ROADMAP.md` (1.10 → 1.11): Phase 0 item 5 marked DONE.

---

## Reason

`AI/policies/architecture.md`'s Single Responsibility / Reuse principles argue against duplicating the same check seven times per command when one referenced section does the job — the same reasoning DECISION-016 already used to collapse a different redundancy in this framework. Option A was rejected because it solves a smaller problem (Kenovis's own path names) at a much larger cost (a mapping manifest and 23+ file updates) than the actual risk (an unmarked file silently overwritten) justifies.

---

## Consequences

Positive:

- `/init-project` and `/adopt-project` now carry the same "don't discard what might not be ours" discipline `ExistingClaudeMdError` already gives `CLAUDE.md` installs, closing the gap Learning-006 identified for the CLI's own code.
- The guard is documented once and referenced, not repeated — consistent with how the framework already resolved an analogous redundancy in DECISION-016.

Negative:

- The guard's enforcement is instruction-only, not code-enforced — an agent that skips reading the "Collision Guard" section could still overwrite a file. No CLI code path exists for these two commands to make this unconditional; the same conversational, human-gated nature that makes the commands safe by design (they already refuse to continue without human answers) is also why this can't be a hard code guarantee today.

---

# DECISION-020

# Kenovis's Own Root README.md and CLAUDE.md Are Exempt From The `.kenovis/` Self-Migration

Date:

2026-08-06

Status:

Accepted

Owner:

Founder

Review Date:

2027-02-06

---

## Context

PRODUCT/ROADMAP.md's DECISION-017 Implementation Strategy scoped a Phase 2: "this repository migrates its own Framework layer from root into `.kenovis/`, re-pathing its internal cross-references, using the CLI's own sync mechanism on itself — the dogfooding validation that the mechanism works, not just that the documentation describes it." That Phase 2 work was never started; DECISION-017's own Consequences already flagged it as "a temporary and explicitly tracked inconsistency, not an oversight."

Starting that migration via `/next` (this session) surfaced a gap DECISION-017 explicitly left out of scope: DECISION-017's B1 resolution — Kenovis's own explanatory README moves to `.kenovis/README.md`; the *customer's* pre-existing root `README.md` is never touched — was designed for a third-party Installation, where "Kenovis's explanation" and "the customer's own project" are two different documents. This repository has no such split: its root `README.md` *is* Kenovis's own project's public landing page (GitHub, npm package page) *and* the explanatory document DECISION-017 was talking about, at once. Applying B1 literally here would move that content into `.kenovis/README.md`, which GitHub does not auto-render — the repository's public landing page would go effectively blank. COMPANY_OS.md → Distribution Strategy names this exact repository, unprompted, as part of the product's distribution channel: "Kenovis's own dogfooded repository as a public reference implementation of the product working on itself." Hiding the README contradicts a stated business asset, not just an internal convention.

The same shape of gap applies to root `CLAUDE.md`. The CLI's `claudeStubContent()` (`cli/src/domain/installation.ts`) generates a minimal, generic stub for a customer Installation. This repository's actual root `CLAUDE.md` is hand-authored and carries content the generic stub does not: Role, Repository Layers, Session Initialization Protocol, Source Of Truth Hierarchy, and a `## graphify` section wiring this repository's own `graphify` hook-guard rules (DECISION-012). Replacing it with the generic stub during a self-migration would be a real, functional regression to this team's own daily-driver instructions, not a neutral packaging change.

Both gaps share a root cause: DECISION-017 assumed every Installation (including Kenovis's own) has a clean split between "the framework's explanation" and "the Installation's own pre-existing content." Kenovis's own repository is the one Installation where that split does not exist — it is simultaneously the framework's origin and its own dogfooded product.

---

## Options Considered

### Option A

Apply DECISION-017's B1 resolution to this repository exactly as written for any customer Installation: move all Kenovis-explanatory README content into `.kenovis/README.md`, reduce (or remove) the root `README.md`, and replace root `CLAUDE.md` with the generic `claudeStubContent()` output.

Advantages:

- Perfect mechanical parity with a customer install — the self-migration exercises the exact same code path (`kenovis init`/`kenovis sync`) with zero special-casing, the cleanest possible proof that "dogfooding validates the mechanism."

Disadvantages:

- Directly undermines COMPANY_OS.md's own stated Distribution Strategy, which relies on this repository's root README functioning as a real public landing page and reference implementation.
- Discards this team's own richer, hand-authored `CLAUDE.md` (Role, Layers, Source Of Truth, graphify wiring) in favor of a generic template built for a different audience (a fresh customer Installation with no prior context), degrading this team's own daily Claude Code sessions for the sake of symbolic purity.

---

### Option B

Treat Kenovis's own root `README.md` and root `CLAUDE.md` as a standing, documented exception to the self-migration: they stay at repo root, hand-authored, with their own content — not generated or overwritten by the CLI's `init`/`sync` mechanism. Everything else that DECISION-017 scoped to move — `AI/agents/`, `AI/workflows/`, `AI/policies/`, `AI/commands/`, `AI/templates/`, `AI/SYSTEM.md` — relocates into `.kenovis/AI/` as originally planned. `AI/memory/` stays at root, unaffected (already Product-layer per DECISION-013/016). Every internal cross-reference inside README.md, CLAUDE.md, and the moved files themselves that currently points at `AI/...` is repointed to `.kenovis/AI/...`. The "dogfooding validates the sync mechanism" goal DECISION-017 Phase 2 was chasing is satisfied by the existing scratch-repository smoke-test pattern (`AI/memory/learnings.md` Learning-004, already run against a disposable clone) rather than by running `init`/`sync` unmodified against this repository's own root.

Advantages:

- Preserves the actual, real value of this repository's public presence — matches COMPANY_OS.md's explicit naming of this repo as a distribution channel.
- Does not force a real, valuable, hand-authored document to be replaced by a lossier generic template just to make a mechanical proof marginally cleaner — the proof already exists via scratch-repo smoke testing.
- Still achieves DECISION-017's actual stated goal — "framework infra invisible, product infra visible" — for the part of the Framework layer that actually clutters a repo listing (12 agent files, workflows, policies, commands, templates): those genuinely move under `.kenovis/`.

Disadvantages:

- This repository's root `CLAUDE.md`/`README.md` permanently diverge from exactly what a customer's `init`/`sync` would generate — a maintainer's own daily-use files are never byte-identical to what a new customer sees on first install. Slightly weakens the literal "maximal dogfooding" framing of DECISION-013, though only for these two specific files.
- `isKenovisManagedClaudeStub`/`isClaudeMdSafeToOverwrite` (the CLI's own guard logic) would, if `kenovis sync` were ever accidentally run against this repository's own root, correctly refuse to overwrite this hand-authored `CLAUDE.md` — expected and desired, but worth naming explicitly so it is never mistaken for a bug.

---

### Option C

Hybrid: keep root `README.md` mostly as-is (preserve the public landing page), but replace root `CLAUDE.md` with the actual generic stub, relocating its current repo-specific prose (Role, Layers, Source Of Truth, graphify wiring) into `AI/SYSTEM.md` (tool-agnostic, framework-layer) or a new Kenovis-specific product-layer document, so a real Claude Code session still gets equivalent guidance, sourced through the same mechanism a customer's install uses.

Advantages:

- Achieves true dogfooding of the specific mechanism DECISION-018 built machinery around (the pending-marker stub, the content-hash guard) without touching the public README.

Disadvantages:

- Much of `CLAUDE.md`'s current prose already duplicates `AI/SYSTEM.md`'s Core Philosophy in different words — merging them cleanly is a real, separate content-consolidation problem, unrelated in scope to "where does the Framework layer physically live," and risks silently losing the graphify hook-guard section's specific, load-bearing rules (`.claude/settings.json`'s `PreToolUse` hooks depend on agents actually reading and following that section every session).
- Solves a cosmetic-parity goal (this repo's `CLAUDE.md` "looks like" a generated stub) at real risk to something that already works correctly today.

---

## Decision

Adopt Option B.

- Root `README.md` and root `CLAUDE.md` are a standing, documented exception: they remain hand-authored, at repo root, and are never written or overwritten by `kenovis init`/`kenovis add`/`kenovis sync` run against this repository's own working tree. (Running those commands here at all would be unusual — this repository is the framework's origin, not an Installation of it — but the exception is recorded explicitly in case it is ever attempted, e.g. accidentally.)
- `AI/agents/`, `AI/workflows/`, `AI/policies/`, `AI/commands/`, `AI/templates/`, `AI/SYSTEM.md` relocate to `.kenovis/AI/` as DECISION-017 originally scoped. `AI/memory/` stays at root.
- Every reference to the old `AI/...` paths inside `README.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `.claude/commands/*.md`, `.github/scripts/check_changelog.py`, `.github/scripts/check_markers.py`, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/ISSUE_TEMPLATE/*.md`, and every file under the relocated `AI/` tree itself is repointed to `.kenovis/AI/...` as part of implementing this decision.
- `ENGINEERING/ARCHITECTURE.md` → "Hard Rules" gains a line stating this repository-specific exception explicitly, so it reads as a documented carve-out rather than an unexplained inconsistency with the rule it otherwise enforces for every Installation.
- The dogfooding validation DECISION-017 Phase 2 asked for is satisfied by re-running the existing scratch-repository smoke test (`AI/memory/learnings.md` Learning-004's pattern) against the post-migration bundled framework assets, not by running `init`/`sync` against this repository's own root.

---

## Reason

COMPANY_OS.md's Distribution Strategy is not incidental — it explicitly names this repository as a distribution asset ("word of mouth among developers... Kenovis's own dogfooded repository as a public reference implementation of the product working on itself"). Option A would sacrifice that real, stated business value for a mechanical purity that a disposable scratch-repo test already provides equally well. Option C was rejected as scope creep: it tries to solve a pre-existing content-duplication problem (`CLAUDE.md` vs. `AI/SYSTEM.md`) that this migration did not create and does not need to fix, at real risk to a rule (`.claude/`'s graphify hook-guard) that already works. Option B is the option that actually finishes what DECISION-017 named as its goal — "framework infra invisible, product infra visible" — for the files that create real clutter (12 agent definitions, workflows, policies, commands, templates), without regressing the two files whose current, repo-specific content has independent value DECISION-017 never intended to discard.

---

## Consequences

Positive:

- This repository's root listing gets the same visual cleanup DECISION-017 already gives every customer Installation — the Framework layer's bulk (`AI/agents/`, `AI/workflows/`, `AI/policies/`, `AI/commands/`, `AI/templates/`) stops cluttering the root, without costing the project its own GitHub/npm-facing landing page.
- Closes the "temporary and explicitly tracked inconsistency" DECISION-017 flagged, for the part of it that was genuinely just deferred work (the file relocation), while giving the part that turned out to need its own judgment call (README/CLAUDE.md treatment) an actual documented decision instead of leaving it to be improvised silently during implementation.

Negative:

- This repository's root `CLAUDE.md`/`README.md` are now permanently, deliberately not what `kenovis init`/`sync` would generate — a fact that must stay documented here (and in `ENGINEERING/ARCHITECTURE.md`) so a future contributor does not "fix" the divergence by mistake.
- The relocation of `AI/{agents,workflows,policies,commands,templates}/` plus `AI/SYSTEM.md` still requires re-pathing every internal and external cross-reference to those files — real mechanical work, not reduced in size by this decision, only scoped correctly around it.

---

## Implementation Strategy

Phase 1 (this decision): record the exception, no files moved yet.

Phase 2 (separate `/next` or `/feature` execution): move `AI/{agents,workflows,policies,commands,templates}/` and `AI/SYSTEM.md` into `.kenovis/AI/`; repoint every cross-reference listed under Decision above; update `ENGINEERING/ARCHITECTURE.md` → Hard Rules; re-run the scratch-repository smoke test against the resulting bundled assets; update `CHANGELOG.md` (this touches `AI/**`, `CLAUDE.md`, `README.md` — CI's changelog gate applies) and `PRODUCT/ROADMAP.md`'s DECISION-017 Phase 2 line to DONE.

---

# DECISION-021

# An Installation Receives Its Product Layer From Framework Templates, Authored By `/init-project`, Not Written By The CLI

Date:

2026-08-07

Status:

Accepted

Owner:

Founder

Review Date:

2027-02-07

---

## Context

`kenovis init`/`kenovis add` write exactly three things into a target repository: `.kenovis/` (a mirror of the bundled Framework layer), the root `CLAUDE.md` stub, and `.kenovis/.claude-md.sha256` (`cli/src/application/commands/init.ts`). The bundle itself is `.kenovis/AI/` plus a customer-facing `README.md` (`cli/scripts/bundle-framework-assets.mjs`). No Product-layer file is ever created — no `COMPANY_OS.md`, no `DECISIONS.md`, no `DOMAIN/`, `PRODUCT/`, `ENGINEERING/`, `AUTOMATIONS/`, and no `AI/memory/`.

`.kenovis/AI/commands/init-project.md` (and `adopt-project.md`, which shares its structure) is written against a different world. Its Trigger says "Starting a new product in a fresh clone of this repository." Its Core Principle is "The example content is not a suggestion to follow. It is a shape to replace." Its pre-flight verification is `grep -rl "PROJECT-SPECIFIC" .`, which in a real CLI Installation matches nothing at all. Steps 2-8 instruct the agent to *rewrite* files that do not exist: "Keep the section structure. Replace every sentence about the example company" (Step 2), "Keep the decision format... DECISION-001, DECISION-009, DECISION-010. Delete every other decision" (Step 3), "Replace the Domain Terms section... Leave the Framework Terms section untouched" (Step 8).

Both commands predate the CLI. When the only way to adopt Kenovis was to clone or fork this repository, every one of those instructions was literally true — the placeholder product layer was physically present, and "rewrite it" was the correct verb. The CLI changed the distribution mechanism (DECISION-017, DECISION-018) without either command being revisited against what an Installation now actually contains.

Two consequences follow, and the second is the more damaging one.

First, a customer's `/init-project` run has no shape to replace. The agent must invent each document's structure, so two Installations of the same framework end up with different section skeletons for the same document — and every framework file that reads a Product-layer document by section name (`.kenovis/AI/policies/database.md` and `.kenovis/AI/agents/database.md` deliberately look up the tenancy model in `ENGINEERING/DATABASE.md` rather than assuming one; `.kenovis/AI/commands/bootstrap.md` reads `ENGINEERING/ARCHITECTURE.md` → "Suggested Project Structure") is reading a section that may or may not exist under that name.

Second, `AI/memory/` is not distributed at all, and part of it is framework content, not product content. `AI/memory/learnings.md` states this about itself on line 1: "The rules in this document are framework-level and reusable. The learnings recorded by the AI while working on a product are project-specific and must be cleared." Those rules — the Learning Philosophy, the learning format, the categories, the priority levels, the Review Process that promotes a learning into `.kenovis/AI/policies/` — are referenced by 20 framework files, including `.kenovis/AI/commands/next.md` Step 14, eight workflows, three policies and three templates. `AI/memory/glossary.md` has the same split: a Framework Terms section (framework) and a Domain Terms section (product). Today a customer Installation receives neither, so every framework instruction to "record the learning in `AI/memory/learnings.md`" points at a file that does not exist and whose format is defined nowhere the customer can see.

This sits directly on PRODUCT/ROADMAP.md Phase 0's own Success Criteria: "A team outside Kenovis can install the CLI, get the Framework layer into their repository, and complete `/init-project` (greenfield) or `/adopt-project` (brownfield, existing codebase) with their own real answers — end to end, without help."

---

## Problem Statement

An Installation needs the Product layer's *shape* — section structure for each document, plus the framework-level rules that live inside `AI/memory/` — without the CLI writing Product-layer files into a repository whose owner has not yet decided to have them. DECISION-017 deliberately minimised the install footprint (`.kenovis/` plus the one file Claude Code forces at root); RULE-INST-01 forbids Framework updates from touching Product-layer files. Whatever carries the shape must not violate either.

---

## Options Considered

### Option A

The CLI writes the Product layer at install time: `init`/`add` create `COMPANY_OS.md`, `DECISIONS.md`, `DOMAIN/`, `PRODUCT/`, `ENGINEERING/`, `AUTOMATIONS/` and `AI/memory/` as placeholder files carrying the `PROJECT-SPECIFIC` marker. `init-project.md`/`adopt-project.md` keep their current "rewrite the placeholder" wording unchanged.

Advantages:

- Both commands work exactly as written today — no rewrite of Steps 2-8, and the `grep -rl "PROJECT-SPECIFIC"` pre-flight check becomes true again.
- Reproduces, mechanically, the pre-CLI clone-a-fork experience the commands were designed for.

Disadvantages:

- Adds seventeen visible placeholder files to the target repository's root before the customer has agreed to anything — the exact clutter DECISION-017 chose `.kenovis/` to avoid, now reintroduced at the layer DECISION-017 could not hide.
- Every one of those seventeen paths needs its own collision check against a file the customer may already own (`README.md` is already protected; `DECISIONS.md`, `PRODUCT/`, `ENGINEERING/` are plausible names in any repository). That is DECISION-019's Collision Guard problem multiplied by seventeen, and moved from a conversational command — which can ask the human — into a non-interactive CLI that cannot.
- Worst in the brownfield case, which `kenovis add` exists specifically to serve: the more real the target repository, the higher the chance of collision.

---

### Option B

The Framework bundle carries the Product layer as templates under `.kenovis/AI/templates/product-layer/`. `init`/`add` write nothing new into the target — the templates arrive inside `.kenovis/`, because the bundler already copies `.kenovis/AI/` wholesale. `init-project.md`/`adopt-project.md` change verb: each Step reads its template and *authors* the real file from the human's answers, instead of rewriting a placeholder that was assumed to be there.

Advantages:

- Install footprint is unchanged — DECISION-017's `.kenovis/`-only rule holds without a carve-out, and `kenovis add` on a real brownfield repository still creates nothing at root but `CLAUDE.md`.
- No new collision surface at install time. The collision question moves to the moment a file is actually authored, which is inside a conversational command that can ask the human — exactly where DECISION-019 already put it.
- The templates are Framework layer, so `kenovis sync` updates them like any other framework file, and RULE-INST-01 is satisfied by construction: sync touches the template, never the customer's authored document.
- The framework-level content inside `AI/memory/learnings.md` and `glossary.md` finally ships to customers, closing the gap where 20 framework files reference rules no Installation has.

Disadvantages:

- Steps 2-8 of both commands must be rewritten from "rewrite this file" to "author this file from its template," and the pre-flight `grep -rl "PROJECT-SPECIFIC"` check no longer describes a fresh Installation. Real documentation work, and it must be done carefully enough that this repository's own (already-real) product layer keeps working under the new wording.
- Two sources now describe each Product-layer document's shape: the template, and this repository's own copy of the same document. They can drift. Mitigated by making the template the single authored artifact and this repository's own file the instance — but nothing enforces it mechanically.

---

### Option C

Ship only the framework-level half of `AI/memory/` (the rules inside `learnings.md`, `conventions.md`, and `glossary.md`'s Framework Terms), and leave `init-project.md`/`adopt-project.md`'s "fresh clone" framing alone.

Advantages:

- Smallest possible change, and it closes the most concrete defect — the 20 framework files that reference `AI/memory/` rules an Installation never receives.

Disadvantages:

- Leaves the larger defect untouched: `/init-project` still instructs the agent to rewrite twelve files that do not exist, so the command's own Completion Criteria remain unreachable in a real Installation, and Phase 0's Success Criteria stay unmet.
- Guarantees a second round on the same gap, at which point the `AI/memory/` templates would have to be re-homed anyway to sit alongside the rest.

---

## Decision

Adopt Option B.

- A new Framework-layer directory `.kenovis/AI/templates/product-layer/` holds one template per Product-layer document: `COMPANY_OS.md`, `DECISIONS.md`, `DOMAIN/DOMAIN_MODEL.md`, `DOMAIN/BUSINESS_RULES.md`, `PRODUCT/{ROADMAP,FEATURES,USER_RESEARCH,COMPETITIVE_LANDSCAPE}.md`, `ENGINEERING/{ARCHITECTURE,DATABASE,SECURITY}.md`, `AUTOMATIONS/{customer-onboarding,release-process,user-feedback}.md`, `AI/memory/{glossary,conventions,learnings}.md`.
- Each template carries the framework-level content of that document verbatim — the parts every product needs identically (purpose, philosophy, formats, rules for AI agents, final principle) — and replaces the product-specific sections with a short statement of what must be answered there. A template never contains invented answers, and never contains Kenovis's own.
- Every template's first line is the `PROJECT-SPECIFIC` marker, so a file authored from one is recognisable as Product layer from the moment it is written, and DECISION-019's Collision Guard keeps working unchanged.
- No CLI change. The bundler already copies `.kenovis/AI/` entry by entry, so the new directory ships with no code, no test and no `INSTALL_TIME_OWNED_ENTRIES` member — the template is part of the artifact being mirrored, which is the structural property `AI/memory/learnings.md` Learning-013 identified as the way to avoid a second writer.
- `init-project.md` and `adopt-project.md` change from "rewrite the placeholder" to "author from the template," and their pre-flight step stops assuming placeholder files are present. Both must work in an Installation that has no Product layer at all *and* in this repository, whose Product layer is real.
- `ENGINEERING/ARCHITECTURE.md` → "Hard Rules" gains a line stating that the CLI never writes Product-layer files, so the rule is enforceable rather than incidental.

---

## Reason

The install footprint was decided once, deliberately, in DECISION-017, and the argument that produced it has not changed: a tool that scatters files across someone else's repository before they have agreed to anything is harder to trust and harder to remove. Option A would have reversed that decision for the layer where the cost is highest — the repository root, in the brownfield case the product explicitly targets — in exchange for not editing two markdown files.

The deeper reason is where the collision question belongs. A non-interactive CLI cannot ask "is this `DECISIONS.md` yours or ours?"; it can only guess or refuse. A conversational command can simply ask, and DECISION-019 already built that gate. Option B keeps the question where an answer is available.

Option C was rejected on the same grounds Phase 0 item 6's deferred half was: it fixes the symptom that is easiest to point at and leaves the command's own Completion Criteria unreachable, guaranteeing a second round on the same gap.

---

## Consequences

Positive:

- `/init-project` and `/adopt-project` become executable as written in a real CLI Installation, closing the gap between PRODUCT/ROADMAP.md Phase 0's Success Criteria and what an Installation actually contains.
- The framework-level rules inside `AI/memory/` reach every Installation, so the 20 framework files that instruct agents to record learnings, promote them into policies, or look up a term now point at content the customer has.
- Product-layer documents gain a stable section structure across Installations, which is what makes the framework's own "look it up in `ENGINEERING/DATABASE.md`" indirection reliable rather than hopeful.
- Zero CLI code change, so the change carries no new failure mode in `init`/`add`/`sync` and needs no new test in `cli/`.

Negative:

- Template drift is a real, unenforced risk: this repository's own `COMPANY_OS.md` and the template that describes its shape are two files that can diverge silently. No CI check catches it today. Accepted for now, and named here so it is not rediscovered as a surprise — a marker/structure check is a candidate for `.github/scripts/` if drift actually occurs.
- The Framework bundle grows by seventeen documents. Immaterial for a filesystem-only, npm-distributed package, but it does mean `kenovis sync` will show template updates in a customer's `git diff` that do not affect any file they authored — worth stating in `cli/README.md` so it does not read as sync overstepping RULE-INST-01.

---

## Implementation Details

Framework layer:

- Add `.kenovis/AI/templates/product-layer/` with the seventeen templates named under Decision above.
- `.kenovis/AI/commands/init-project.md`: Trigger, Core Principle, "How To Recognise The Product Layer", Collision Guard and Steps 2-8 rewritten for author-from-template; Completion Criteria updated.
- `.kenovis/AI/commands/adopt-project.md`: the same change to its Steps 3-8.
- `ENGINEERING/ARCHITECTURE.md` → Hard Rules: the CLI never writes Product-layer files into a target repository.

No change to `cli/src/**`, `cli/scripts/bundle-framework-assets.mjs`, or any test: the bundler copies `.kenovis/AI/` entry by entry, so a new subdirectory of `templates/` ships automatically.

---

## Affected Areas

```
DOCUMENTATION
```

---

## Validation

- `node cli/scripts/bundle-framework-assets.mjs` produces `dist/framework-assets/AI/templates/product-layer/` with all seventeen templates.
- The existing `cli/` test suite and typecheck pass unchanged — this decision must not require a code change to be correct.
- `.github/scripts/check_links.py` and `check_markers.py` pass.
- A scratch-repository smoke test (`AI/memory/learnings.md` Learning-004's pattern): `kenovis add` against a brownfield scratch repo puts the templates on disk under `.kenovis/`, and creates no Product-layer file at the target's root.

That smoke test found one real defect in this decision's own implementation, worth recording because it is a direct consequence of the choice made here: the templates carry the `PROJECT-SPECIFIC` marker (deliberately — that is what makes an authored file recognisable as Product layer), and they live inside `.kenovis/`, so both commands' pre-flight `grep -rl "PROJECT-SPECIFIC"` matched all seventeen of them instead of returning nothing. Any marker-based check run from a target repository's root must pass `--exclude-dir=.kenovis`; both commands now do.

---

## Related Documentation

```
PRODUCT/ROADMAP.md — Phase 0 Success Criteria; Phase 1 Immediate Priority
DOMAIN/BUSINESS_RULES.md — RULE-INST-01
ENGINEERING/ARCHITECTURE.md — Hard Rules
DECISIONS.md — DECISION-017, DECISION-018, DECISION-019
```

---

# DECISION-022

# `[ANSWER: ...]` Is The Only Bracket Form That Means "Unanswered Question"

Date:

2026-08-09

Status:

Accepted

Owner:

Founder

Review Date:

2027-02-09

---

## Context

Executing `/init-project` end to end against a real `npx kenovis@0.6.0` Installation (`PRODUCT/ROADMAP.md` Phase 1 item 6) found that both commands' Verify step is broken in both directions.

The check was `grep -rn "^\[" COMPANY_OS.md DECISIONS.md DOMAIN/ PRODUCT/ ENGINEERING/ AUTOMATIONS/ AI/memory/`, followed by "Every match is a question that was never answered."

Run against this repository's own completed, five-releases-reviewed Product layer it returned **29 matches, none of them real**: `DOMAIN/BUSINESS_RULES.md`'s "Rule Format" specification, `PRODUCT/FEATURES.md`'s FEATURE-NNN shape, `AUTOMATIONS/release-process.md`'s markdown `[ ]` checkboxes, `ENGINEERING/DATABASE.md`'s `[tenant_key]` sample, and the deliberate "No competitors recorded yet" / "No decisions recorded yet" statements that `init-project.md` Step 5 explicitly mandates. An agent obeying the instruction literally would delete or mangle all of them.

At the same time it missed **8 real questions** that were not at column 0 — including the whole `### [Entity]` / `Definition:` / `Attributes (conceptually):` / `Relationships:` block in `DOMAIN/DOMAIN_MODEL.md`, the layer `init-project.md` Step 4 itself calls "where a guess does the most damage, because a generic-sounding entity looks correct in every review afterwards". A ninth case had no bracket at all: `ENGINEERING/ARCHITECTURE.md`'s six required Technology Stack lines shipped as bare labels.

Both commands' Completion Criteria said "No bracketed template instruction survives in any product-layer file." That was unsatisfiable: this repository's own Product layer violates it, and always did.

The root cause is that a bracket in a template means three different things — a question for the human, a format specification or illustrative sample, and a deliberate "nothing here yet" statement. The first must never survive; the other two must. No pattern over bracket syntax can separate them.

---

## Options Considered

### Option A

Keep plain brackets and give the Verify step an allowlist of sections and files to ignore.

Advantages:

- No template changes.

Disadvantages:

- The allowlist grows with every template edit and is itself unverifiable — a question added inside an allowlisted section becomes permanently invisible. It encodes the current contents of 17 documents into a check that is supposed to outlive them.

---

### Option B

Drop the mechanical check and make Verify a prose judgement call ("read each document and confirm nothing unanswered survived").

Advantages:

- Zero implementation cost, no false positives.

Disadvantages:

- Abandons the gate exactly where DECISION-011 argued gates matter: "mechanics without verification gets skipped under fatigue." Verify is the last step of a long conversational command — the point at which an agent and a human are least likely to re-read seventeen documents carefully.

---

### Option C

Give unanswered questions their own marker, `[ANSWER: ...]`, and reserve plain brackets for content that survives. Verify greps the marker, unanchored.

Advantages:

- Exact in both directions: zero false positives on documents authored from templates (verified against a real Installation and against this repository's own Product layer, where the only matches are this decision's own prose — see Consequences), and mid-line questions are caught because the pattern needs no `^` anchor.
- The distinction is visible to a human reading the template, not just to a script. `[ANSWER: the engine, or "none".]` states its own obligation.
- Makes the previously-unwritable case writable: `ENGINEERING/ARCHITECTURE.md`'s bare stack labels now carry a real placeholder.

Disadvantages:

- Touches 15 of the 17 templates (110 instructions) plus both commands.
- Nothing mechanically enforces that a *future* template author picks `[ANSWER:` over a plain bracket for a genuine question. The convention is documented in the templates' own `README.md`, but a check for it would have to distinguish the same three meanings the marker exists to distinguish — so it cannot exist. This is an accepted, named limitation, not an oversight.

---

## Decision

Adopt Option C.

- `[ANSWER: ...]` marks a question for the human. It must never survive into a written Product-layer document.
- Every other bracket form is content: a format specification, an illustrative example, a placeholder inside a code or tree sample, or a deliberate "nothing recorded yet" statement. These survive.
- Both commands' Verify step greps `\[ANSWER:` without a line anchor. Both Completion Criteria are reworded to match.
- `.kenovis/AI/templates/product-layer/README.md` documents which form to use when, and states the limitation above.

---

## Reason

DECISION-011 established that this framework holds itself to the mechanical discipline it sells. A gate that produces 29 false positives and 0 true positives on the framework's own documents is worse than no gate — it trains its reader to ignore it, and the one time it fires correctly it will be ignored too. Option C is the only one of the three that leaves a check which is both mechanical and true.

---

## Consequences

Positive:

- The Verify step reports something meaningful for the first time. The Completion Criterion it backs is satisfiable, and verified true against this repository's own Product layer.
- The nine questions that were structurally invisible — the entire domain-entity block and the Technology Stack lines — are now catchable, in the two documents the framework's own commands identify as highest-damage-if-guessed.
- Both commands' Verify steps now behave identically, so the two documents stay in sync on this mechanic rather than drifting (the standing risk DECISION-014 → Consequences names).

Negative:

- A future template author can still add a plain-bracket question that Verify will never see. Documented in the templates' `README.md`; not mechanically preventable, for the reason given in Option C.
- Existing Installations authored under the old convention are unaffected and need no migration — they contain no `[ANSWER:` markers, so the new check passes trivially. It only gains force for documents authored from templates at this release or later.
- This repository is the one Installation where the check reports matches that are not defects: its Product layer includes this decision record and `PRODUCT/ROADMAP.md`'s entry for the work, both of which quote the marker in prose while explaining it. Ten such matches exist at the time of writing and none is an unanswered question. That is the same self-referential carve-out DECISION-020 and DECISION-021 already established — this company's product *is* the framework, so its product documentation legitimately discusses framework mechanics. A customer Installation has no such prose and returns zero. When running Verify here, read the matches; when running it in a customer Installation, zero is the bar.

---

# DECISION-023

# The PROJECT-SPECIFIC Marker States Layer, Not State

Date:

2026-08-09

Status:

Accepted

Owner:

Founder

Review Date:

2027-02-09

---

## Context

`/adopt-project`'s first end-to-end run (PRODUCT/ROADMAP.md Phase 1 item 8) left two findings as backlog rather than fixing them inside that item's scope. This is the first.

Every Product-layer file's first line read:

```
<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See .kenovis/AI/commands/init-project.md -->
```

Two things are wrong with that sentence, and they compound. It says the file is *placeholder content* — false the moment `/init-project` or `/adopt-project` authors it, which is to say false for the entire life of every real Installation. And it names `init-project` as the thing that will write it, which in an adoption is the wrong command.

The consequence is not cosmetic. This is line 1 of `COMPANY_OS.md`, the top of the Source Of Truth Hierarchy (`.kenovis/AI/SYSTEM.md`), read at the start of every session by every agent. An agent that believes it is looking at placeholder content has been told, by the framework itself, that a company's real strategy is disposable. The marker is also what the Collision Guard (DECISION-019) reads to decide whether a file may be overwritten without asking — so the one line whose job is to protect authored content was describing that content as scaffolding.

The root cause is a conflation the framework had already fixed once, elsewhere. DECISION-022 separated "this is an unanswered question" (`[ANSWER: ...]`) from "this is a bracket" precisely because one marker carrying two meanings cannot be checked. The `PROJECT-SPECIFIC` line carried two meanings too — *which layer this file belongs to* and *whether it has been filled in* — and only the first is stable over a file's life. That round fixed the bracket convention and did not revisit this one.

Item 8's own backlog note estimated the cost as touching "seventeen templates, every authored document and `check_markers.py`", on the belief that the full sentence was what the Collision Guard matched on. That belief was wrong, and checking it is what made this item cheap: `check_markers.py` greps the bare token `PROJECT-SPECIFIC` within a file's first three lines, the Collision Guard's `head -1` looks for the same token, and no `.py`, `.ts` or `.mjs` file in the repository matches any part of the sentence. The explanatory prose after the token has no consumer but the reader.

---

## Options Considered

### Option A

Leave the marker alone and fix the problem at the reading end — instruct agents, in `SYSTEM.md` and both commands, that "placeholder content" on line 1 of an authored document should be disregarded.

Advantages:

- Zero files changed beyond the instruction itself.

Disadvantages:

- Adds a standing exception an agent must remember, to counteract a sentence that is simply false. The framework's own `code-quality.md` argues against exactly this shape: prose telling a reader to ignore what another document says is what a correction looks like when nobody wants to make the correction.
- Does nothing for a human reading the file.

---

### Option B

Rewrite the marker so it states which layer the file belongs to and nothing about whether it has been filled in — true of a template nobody has answered and of a document a company has owned for a year. Keep `PROJECT-SPECIFIC` as the first token so every existing mechanism is untouched. Let `[ANSWER: ...]` remain the sole carrier of "unanswered", as DECISION-022 established.

Advantages:

- Makes line 1 true in every state a Product-layer file can be in, which is the only property that makes it safe to read.
- Applies DECISION-022's own resolution to the one marker that round did not reach: one marker, one meaning.
- Costs nothing in mechanism. The token the Collision Guard and `check_markers.py` read is unchanged, so existing Installations keep working — their authored files carry whichever wording they were written with, and the guard matches both.
- The new line can carry something genuinely useful in its place: that `kenovis sync` never overwrites the file. That is the fact a reader most needs about a Product-layer document, and nothing was saying it at the point of use.

Disadvantages:

- Touches 37 files (17 templates, this repository's own 17 Product-layer documents, `README.md`, `cli/README.md`, and the one literal example inside `init-project.md`) — mechanical, but a large diff for a one-line change.
- Two wordings now exist in the wild. An Installation authored before this release keeps the old sentence on its files, and `sync` will not update them (it never touches Product-layer files — RULE-INST-01). The old text stays wrong in those repositories until the customer edits it by hand.

---

### Option C

Retire the marker entirely and have the Collision Guard detect Product-layer files some other way — a manifest, or a path list.

Advantages:

- No per-file marker to keep accurate.

Disadvantages:

- A manifest is state written by one mechanism and invalidated by another, which is this codebase's documented recurring defect (`AI/memory/learnings.md` Learning-010, Learning-011). A path list cannot work: DECISION-016 established that no Installation is required to have any particular layout, and a customer may legitimately have their own file at a Product-layer path — which is the entire reason the Collision Guard exists.
- Discards a working mechanism to fix a sentence next to it.

---

## Decision

Adopt Option B.

Three wordings, matching the three kinds of Product-layer file the framework already distinguished:

```
<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->
```

```
<!-- PROJECT-SPECIFIC: this product's own recorded knowledge; the rules around it are framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->
```

```
<!-- PROJECT-SPECIFIC: the Domain Terms section is this product's own; the Framework Terms are framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->
```

The second applies to `AI/memory/conventions.md` and `AI/memory/learnings.md`, whose rules are framework-level while their recorded entries are not. The third applies to `AI/memory/glossary.md`, which splits within a single file. Both distinctions existed before this decision and are preserved.

`PROJECT-SPECIFIC` stays the first token after `<!--`. `check_markers.py` and the Collision Guard are unchanged and were re-run against the result.

Both commands and the templates' `README.md` now state the layer/state distinction explicitly, and `init-project.md` Step "Where The Shape Comes From" item 4 says to carry the line through unchanged rather than rewording it on completion — the natural mistake once a line describes state.

---

## Reason

A marker read at the start of every session, on the highest document in the Source Of Truth Hierarchy, has to be true in every state the file can be in. "Placeholder content" is true of a template for the few minutes between install and `/init-project`, and false for every day after. That ratio is the argument.

DECISION-022 already established the principle and the vocabulary — one marker, one meaning; `[ANSWER: ...]` carries state. This decision finishes applying it. That the two rounds are three days apart, on the same underlying confusion in two adjacent markers, is itself the finding: the fix was scoped to where the symptom appeared rather than to the pattern.

---

## Consequences

Positive:

- Line 1 of every Product-layer document is now true whether or not the document has been authored, so an agent reading it reaches the right conclusion in both cases.
- The marker gained a fact worth carrying — `kenovis sync` never overwrites this file — stated where a reader is standing when they need it, rather than only in `cli/README.md`.
- No mechanism changed, so no Installation broke and no migration is required.

Negative:

- Installations created before this release keep the old sentence on their authored Product-layer files. `sync` cannot fix it, by design (RULE-INST-01) — Kenovis never edits a customer's Product layer. Those files stay wrong until the customer chooses to update them, and the release notes say so rather than implying the upgrade is complete.
- Two wordings are now in circulation. The Collision Guard reads the token, so both work; but a grep written against the *sentence* — by a customer, or by a future round of this framework — will match only one. The lesson is already recorded (`AI/memory/learnings.md` Learning-018): match the token, and state a check's scope in the command rather than in prose.

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
