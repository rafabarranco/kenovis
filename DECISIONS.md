<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

# DECISIONS.md

Company Decision Log

Version: 2.16

Last updated: —

---

# Decision Index

This index is what a session reads. The bodies below are not on the session-initialization path — see `.kenovis/AI/SYSTEM.md` → "Context Loading Rules" and `.kenovis/AI/commands/bootstrap.md` Step 2.

Open a decision's body before citing it. The index states what a decision settled, never why it was settled that way, and a citation without the reasoning behind it is a preference wearing a decision's ID.

Every decision recorded below has exactly one line here, added in the same change that records the decision. `.github/scripts/check_decision_index.py` fails CI when a body has no index line, or an index line no body.

`‡` marks a decision that is framework-level in effect — it governs how the framework behaves for every Installation and would survive a repurposing of this repository. `★` marks one also cited by ID from inside `.kenovis/AI/`.

- **DECISION-001** ‡★ — AI-Native Company Operating Model. AI agents carry execution across engineering, product, documentation and research; strategic decisions stay human-controlled.
- **DECISION-009** ‡ — Documentation As Company Memory. Company knowledge lives in a fixed document set (COMPANY_OS.md, DECISIONS.md, PRODUCT/, DOMAIN/, ENGINEERING/, AI/), not in chat history.
- **DECISION-010** ‡ — AI Tooling Strategy. Claude Code is the primary interface and autoloads root CLAUDE.md; everything under `AI/` stays tool-agnostic plain markdown, entered through SYSTEM.md by any other tool.
- **DECISION-011** ‡ — Framework Contribution & Memory Discipline. A framework-layer PR requires a CHANGELOG bullet (CI-enforced, `[skip changelog]` for typos) and a DECISIONS entry when it changes agent responsibilities, workflow phases or policy mechanics.
- **DECISION-012** ‡★ — Graphify Exception To Tool-Agnosticism. One named exception to DECISION-010, scoped to graphify's query CLI in `bootstrap.md` and three workflows; the generated graph stays gitignored.
- **DECISION-013** — Kenovis Product Definition & Initial Distribution Model. CLI/template distribution, open-core, and no backend, database or hosted dashboard in v1 — so no tenancy model exists to design against.
- **DECISION-014** ‡ — Brownfield Adoption Path. `/adopt-project` audits an existing implementation first, tags every reconstructed fact with a confidence level and a file citation, and never rewrites the customer's code.
- **DECISION-015** — Adoption Never Relocates Customer Code. **Superseded by DECISION-016** the same day. Do not follow its "a dedicated README.md is the fixed pointer" resolution; the body stays for the reasoning trail.
- **DECISION-016** ‡★ — No Framework-Mandated Directory Name For Customer Code. `ENGINEERING/ARCHITECTURE.md` is the single place recording where an implementation lives, and adoption never moves it.
- **DECISION-017** ‡★ — Framework Layer Packaging. The CLI writes the Framework layer under `.kenovis/`; root `CLAUDE.md` becomes a stub, and the target's own `README.md` is never touched.
- **DECISION-018** ‡★ — Auto-Trigger init-project/adopt-project. `.kenovis/.setup-pending` plus a kind-parametrized `CLAUDE.md` stub make the first session run setup with no manual slash command; no AI binary is ever shelled out to.
- **DECISION-019** ‡★ — Collision Guard Against Silent Product-Layer Overwrite. Both setup commands stop and ask the human before overwriting a pre-existing file that carries no `PROJECT-SPECIFIC` marker.
- **DECISION-020** — Kenovis's Own Root README.md and CLAUDE.md Are Exempt From The `.kenovis/` Self-Migration. Those two files stay hand-authored at repo root; only the five `AI/` subdirectories and `AI/SYSTEM.md` relocated.
- **DECISION-021** ‡★ — An Installation Receives Its Product Layer From Framework Templates. The bundle ships one template per Product-layer document, authored by the setup commands; the CLI never creates a Product-layer file.
- **DECISION-022** ‡ — `[ANSWER: ...]` Is The Only Bracket Form That Means "Unanswered Question". Every other bracket form is content — a format specification, an example, a deliberate "nothing recorded yet" — and legitimately survives into an authored document.
- **DECISION-023** ‡★ — The PROJECT-SPECIFIC Marker States Layer, Not State. Line 1 of a Product-layer file says which layer it belongs to and that `sync` never overwrites it, never that its content is placeholder.
- **DECISION-024** ‡★ — A Template Is A Form, Never A Destination. No framework instruction may name a path under `.kenovis/` as a place to write, because `sync` mirror-replaces that directory wholesale.
- **DECISION-026** ‡★ — An Improvement Lands In The Framework Layer, Because That Is The Product. Rules go into `.kenovis/AI/`, which agents load on every task and `sync` delivers to every Installation; `.github/` is local scaffolding and never the deliverable, and `kenovis check` is rejected because an on-demand command is not an AI-OS operating on a repository.
- **DECISION-025** ‡★ — A Finding Is Fixed, Scheduled, Or Rejected. A finding a round does not fix carries one of three dispositions, prose is not one of them, and `PRODUCT/ROADMAP.md` gains an `Open Findings` queue that `/next` Step 3 reads alongside the scheduled items.
- **DECISION-027** ‡★ — Nothing Stays In The Thread. Everything a session finds — improvement, bug, technical debt, decision, learning, open question — is written to a Product-layer file in that session, routed by kind; the rule and its routing table live in the `CLAUDE.md` stub every Installation autoloads, not behind a command.
- **DECISION-028** ‡★ — Kenovis Replaces The Conventional Development Team, Not The Human Who Owns The Product. `PRODUCT/OPERATING_MODEL.md` §1 wins over `SYSTEM.md`'s "the objective is not to replace engineering teams", which is deleted; the operating model outranks the constitution wherever they conflict.
- **DECISION-029** ‡ — A Finding Is Checked Against The Roadmap, And An Open Finding Is Dimensioned. Before a finding is dispositioned it cites the roadmap id that already covers it or takes a new one; an `Open` row carries Pain, Frequency and Cost, writing `unknown` where a term is unknown; promotion to a scheduled item is a separate act.
- **DECISION-030** ‡ — `/next` Starts From The Pointer, And Stops Rather Than Descends. Step 3 reads three inputs including the `Next` pointer the previous round wrote, and a departure from it is recorded; when the highest-ranked objective needs a human, the round presents the decision with the input already named, records that it stopped and on what, and stops — descending the priority order to find something executable is forbidden.
- **DECISION-031** ‡★ — One Source Of Truth Hierarchy, In `SYSTEM.md`, With The Operating Model At Rank 1. `CLAUDE.md` cites it and states no ordering of its own; a business rule outranks a recorded decision; `PRODUCT/OPERATING_MODEL.md` is rank 1 and joins the session-initialization path. Rank 1's "conditional on the owner having authored one" clause was removed by DECISION-032.
- **DECISION-032** ‡★ — Every Installation Authors Its Operating Model At Setup, And The Conformance Table Lives In It. Both setup commands ask the owner four questions and write `PRODUCT/OPERATING_MODEL.md` before `COMPANY_OS.md`, from a template the AI may never answer itself; the conformance table moves there from the roadmap, a closing round states which section its work served, and `COMPANY_OS.md` stops carrying a third Source Of Truth ordering.
- **DECISION-033** ‡ — The Closing Round Builds The Conformance Table, And Declares The Two Lines Whose Absence Is Otherwise Invisible. The first closing round in an Installation writes one row per operating-model section with `unmeasured` where it did not verify; `Operating model section served:` and `Next:` become required lines that must say `none` rather than be omitted; the population instruction moves out of the setup commands and the template into `commands/next.md` Step 13, the only place a round loads it.
- **DECISION-034** ‡★ — One Item Per Round Is The Framework Default, And An Installation's Operating Model Is Where A Different Cadence Is Stated. `commands/next.md` → "Autonomous Mode" stops asserting that a round may continue through multiple roadmap items and defers to the Installation's own `PRODUCT/OPERATING_MODEL.md`, which is rank 1; the default is one item ending with the thread, on the mechanics of context and of a shared disposition pass rather than on one founder's preference.
- **DECISION-035** ‡★ — Findings Route By Role As Well As By Destination File, And This Repository's Own CTO Owns Its Framework Layer. `policies/documentation.md` requires an `Open` finding to name its owning role from the existing Agent Roster, loaded once rather than copied into twelve agent files; which role owns which kind of finding is a product-specific fact and stays out of the framework layer entirely — this repository's own instance (CTO owns `.kenovis/AI/`) lives in `ENGINEERING/ARCHITECTURE.md`, never in `.kenovis/AI/agents/cto.md`.
- **DECISION-036** ‡★ — An `Open` Finding Is Refined By Age Order, Not By Whichever Round Reopens It. `commands/next.md` Step 3 and `policies/documentation.md` require every round to refine the lowest-id `Open` row in the findings queue as a second action alongside its own objective; row id order substitutes for a persisted age counter, and no CI guard is added while item 37 stays mid-flight.
- **DECISION-037** — "Impossible" Is Not Architecturally Achievable For The Core Invariant; "Difficult" Is Partial, And Its Two Gaps Stay Separately Tracked. `PRODUCT/OPERATING_MODEL.md` §15 cannot be satisfied by "impossible" under DECISION-010 (tool-agnostic) and DECISION-013 (no backend/runtime); "difficult" is partially achieved by the required-line pattern (DECISION-033), with two gaps — CI reach (item 37) and admin-merge bypass (OF-19) — that stay open on their own terms rather than being folded into this decision.
- **DECISION-038** ‡★ — "Continuous" Observation Is Not Achievable; A Bounded Step Inside The Command That Already Runs Is. `PRODUCT/OPERATING_MODEL.md` §1/§16 cannot be satisfied by a scheduler under DECISION-010/DECISION-013, the same architectural reasoning DECISION-037 already applied to §15; `commands/next.md` Step 3 gains a required, bounded `Observe` subsection instead of a new standalone command (`/framework-review`'s zero-invocation record is the evidence against that shape), first instance scoped to document-weight drift with the remaining breadth queued as OF-87.

---

# Document Layers

A decision log is product-specific. A customer Installation's log starts empty and accumulates that company's own decisions — see DECISION-021 and `.kenovis/AI/templates/product-layer/DECISIONS.md`. The index above is the structural exception: it ships in that template as an empty section, because a log without one cannot be read without being read whole.

This repository is the other exception, for the same reason DECISION-020 gives: its product *is* the framework, so decisions about how the framework behaves are genuinely this company's own product decisions. Which ones is carried by the index above and only by it: **`‡` marks a decision that is framework-level in effect, `★` one that is cited by ID from inside `.kenovis/AI/`.** No count is stated here.

**The counts used to be, and this paragraph is where OF-68 was fixed** (2026-08-14, in the round that added DECISION-032). It read "Eight" and was corrected to "Fifteen"/"ten", then to "Nineteen"/"thirteen", then to "Twenty-one"/"fourteen" — three corrections in eleven decisions, each one made by a round that had to edit the paragraph anyway, each one stale before the next decision landed. The defect was never the arithmetic. A number restating what the marks already carry has to be re-derived on every append and is wrong the moment someone forgets, and `check_decision_index.py` verifies body↔index pairing and has no view of a figure in a neighbouring paragraph. A reader who needs a count produces it in one command:

```
grep -c "‡" DECISIONS.md
grep -rho "DECISION-0[0-9][0-9]" .kenovis/AI | sort -u | wc -l
```

The first over-counts by the marks in this paragraph, which is the last reason not to have written the number down as a fact. See `AI/memory/learnings.md` Learning-016 and Learning-023.

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

# DECISION-024

# A Template Is A Form, Never A Destination

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

Executing `/feature` end to end from a real `npx kenovis@0.9.0` Installation for the first time (`PRODUCT/ROADMAP.md` Phase 1 item 12) found that eleven instructions across five workflows, two commands and one agent name a path under `.kenovis/AI/templates/` as the *output* of an imperative — "Generate: `.kenovis/AI/templates/feature-plan.md`", "Update: `.kenovis/AI/templates/bug-report.md` with final resolution details", "Create: `.kenovis/AI/templates/decision.md`". A template's path is given where a destination belongs, so the same path names both the blank form and the filled-in document.

Followed literally by an agent inside a customer's Installation, this writes the produced artifact into `.kenovis/` — the one directory `kenovis sync` mirror-replaces. Reproduced against the published package rather than argued: a feature plan written to `.kenovis/AI/templates/feature-plan.md` and committed was deleted by the next `kenovis sync`, which restored the pristine template, reported only `0.9.0 -> 0.9.0 (already up to date)`, and never mentioned the file it had removed.

Followed carefully — an agent that declines to overwrite a shipped template — the instruction gives no destination at all, so each agent invents its own path and two runs in the same Installation land in different places.

The framework already contains the correct shape in one place. `.kenovis/AI/commands/architect.md` Step 8 says "Create: `DECISIONS.md` … Using: `.kenovis/AI/templates/adr.md`" — destination and form, separately named. That site had its own defect: the alternative destination it offers, `ENGINEERING/ADR/`, appears exactly once in the entire framework, is created by neither `/init-project` nor `/adopt-project`, is absent from the seventeen Product-layer templates, and does not exist in this repository either, which has always recorded ADRs in `DECISIONS.md`.

A second, related gap surfaced in the same run. `/feature` Phase 2 reads `PRODUCT/FEATURES.md` for the feature's objective, user problem and acceptance criteria — but nothing in the framework writes a `FEATURE-NNN` spec before implementation. `/init-project` and `/adopt-project` seed that file with what already ships, and `/feature`'s own Phase 13 updates it afterwards. The workflow's first input is produced by its own last step, so the first feature in any Installation begins with a step that cannot be satisfied.

---

## Options Considered

### Option A

Give each artifact type a fixed Product-layer directory — `PRODUCT/features/`, `ENGINEERING/ADR/`, `ENGINEERING/bugs/` — created at setup by `/init-project` and `/adopt-project`.

Advantages:

- Unambiguous. Two agents in the same Installation land in the same place without the product having decided anything.

Disadvantages:

- Reintroduces exactly what DECISION-021 rejected: directories created at setup that most Installations never fill. A product that records its decisions in `DECISIONS.md` and its feature specs in `PRODUCT/FEATURES.md` — which is how this repository has operated for every one of the twelve roadmap items it has shipped — would carry three empty directories forever.
- Mandates repository layout, which DECISION-016 removed from this framework on the grounds that a documentation framework should not be reorganising a customer's repository.

---

### Option B

Leave the destination unstated and rely on the agent's judgement, fixing only the destructive half by saying "do not write into `.kenovis/`".

Advantages:

- Smallest possible change.

Disadvantages:

- Preserves the half of the defect that produces silent divergence rather than data loss. "Somewhere sensible" is what the instructions already effectively say, and it is why the run had to invent a path.

---

### Option C

State the rule the framework already follows in its best-shaped site, and apply it everywhere: a template is a form, never a destination. Every instruction that produces an artifact names three things — what is produced, the Product-layer document where its durable residue is recorded, and the template that gives it shape. Working artifacts with no durable residue (a feature plan, a design spec, a bug report) are session artifacts by default; a product that wants to persist them records where in `AI/memory/conventions.md`, which every Installation has and which exists for exactly this kind of operating habit.

Advantages:

- Every named destination is a file the framework already requires an Installation to have — `PRODUCT/FEATURES.md`, `DECISIONS.md`, `AI/memory/learnings.md`, `AUTOMATIONS/release-process.md`. Nothing new is created, at setup or ever.
- Matches this repository's own twelve-item history, which is the only long-run evidence available: not one of those rounds persisted a feature plan or a design spec as a file, and every one of them recorded its residue in `PRODUCT/ROADMAP.md`, `DECISIONS.md`, `CHANGELOG.md` and `AI/memory/learnings.md`.
- Fixes the `/feature` Phase 2 gap in the same grammar: the `FEATURE-NNN` spec is Phase 2's *output*, written into `PRODUCT/FEATURES.md` using the Feature Specification Template that file already carries, rather than an input nobody produces.

Disadvantages:

- A product that genuinely wants durable feature plans has to decide where they go and record it. That is one sentence in `conventions.md`, but it is a decision the framework declines to make for them.
- Nothing mechanically prevents a future framework instruction from naming a template path as a destination again. The same limitation DECISION-022 accepted for its own marker convention, and for the same reason: no pattern separates "a path cited as a form" from "a path cited as a destination".

---

## Decision

Adopt Option C.

- No framework instruction names a path under `.kenovis/AI/templates/` as a place to write. Eleven sites reworded across `workflows/feature.md`, `bugfix.md`, `hotfix.md`, `architecture.md`, `roadmap.md`, `release.md`, `commands/feature.md` and `agents/designer.md`.
- Each of the six working templates carries a line under its version header stating that it is a form, that the workflow which sent the reader there names the destination, and that `kenovis sync` replaces this directory wholesale.
- Durable destinations, all already-mandated files: an ADR or a hotfix decision record goes in `DECISIONS.md`; a `FEATURE-NNN` spec goes in `PRODUCT/FEATURES.md`; a bug's reusable residue goes in `AI/memory/learnings.md`; release notes go wherever `AUTOMATIONS/release-process.md` says this product publishes them.
- `.kenovis/AI/commands/architect.md` no longer offers `ENGINEERING/ADR/`. `DECISIONS.md` is the destination; a product that prefers separate ADR files records that in `AI/memory/conventions.md`.
- `/feature` Phase 2 authors the `FEATURE-NNN` spec into `PRODUCT/FEATURES.md` when none exists, using that file's own Feature Specification Template. Phase 13 updates the same entry against what actually shipped.

---

## Reason

The defect is a grammar problem, not a layout problem: one path was being used for two jobs, so the destructive reading and the ambiguous reading are the same sentence read by two different agents. DECISION-023 separated *layer* from *state* in the `PROJECT-SPECIFIC` marker for the same reason four days earlier, and DECISION-022 separated *unanswered question* from *format specification* three days before that. This is the third instance of one marker or path carrying two meanings, and the fix is the same each time: give each meaning its own carrier and say so where an agent reads it.

Choosing destinations the framework already mandates, rather than new directories, follows DECISION-021's reasoning directly — that round rejected writing seventeen files into a customer's repository at install time for the same cost it would impose here on three directories most Installations would never use.

---

## Consequences

Positive:

- An agent following any workflow inside a customer Installation can no longer be instructed into `.kenovis/`, so no produced artifact can be silently deleted by the next `sync`.
- `/feature` becomes executable from its first phase in a fresh Installation, which it was not: its Phase 2 input had no producer.
- The rule is stated at both ends — in the instruction that sends an agent to a template, and in the template it arrives at — so an agent that reads only one of the two still gets it.

Negative:

- Nothing enforces this. A future instruction can name a template path as a destination again, and no check distinguishes that from a legitimate citation. Stated rather than papered over, per DECISION-022's own precedent.
- `kenovis sync` still deletes anything a customer chooses to put under `.kenovis/` without naming what it removed. This decision removes every framework instruction that would lead them there; it does not make `sync` defensive, which is a separate change with its own design — recorded as a backlog finding in `PRODUCT/ROADMAP.md` Phase 1 item 12 rather than folded in here.
- An Installation that already followed the old instruction has lost that artifact and cannot recover it from Kenovis. Its own `git history` is the only copy, which is the same recovery path RULE-INST-02 relies on elsewhere.

---

# DECISION-025

# A Finding Is Fixed, Scheduled, Or Rejected — And The Roadmap Carries A Queue

Date:

2026-08-12

Status:

Accepted

Owner:

Founder

Review Date:

When the Open Findings queue has run for a full phase, or when it exceeds the size at which it stops being read — whichever comes first.

---

## Context

The founder's observation, 2026-08-12: the AI-OS detects gaps and then leaves them in prose, so they are never planned and never resolved.

Measured across this repository before the change: 13 findings parked in `PRODUCT/ROADMAP.md` narrative ("Backlog finding, left out of this item's scope", "Deliberately not built", "stays deferred"), 23 `Future action:` entries in `AI/memory/learnings.md` of which 5 named the roadmap, and the oldest open finding — `kenovis sync` never naming the paths it deletes — repeated in four consecutive rounds' closing paragraphs since 2026-08-09 without ever becoming an item.

The structural cause: the framework has three sinks for knowledge — `DECISIONS.md` records *why*, `learnings.md` records the *lesson*, `PRODUCT/ROADMAP.md` records *what and when* — and every command routed findings to the first two. Only the third is read to decide what to do next. `commands/review.md` and `workflows/review.md` explicitly sent a deferred improvement to `DECISIONS.md`, which is correct for its reasoning and wrong as a queue: a well-documented deferral reads as closed.

`commands/analyze.md` made it worse by contradicting itself — Step 9 required recording the residue in the roadmap while "AI Responsibilities" forbade modifying files, so the one command whose entire purpose is detection could not record what it detected.

---

## Options Considered

**Option A — leave it to discipline.** Each round is already expected to write good closing prose. Rejected: four rounds of evidence say prose is where findings go to die, and the failure is invisible precisely because the prose is good.

**Option B — every finding becomes a scheduled roadmap item.** Rejected: it turns the roadmap into a dumping ground and makes the priority order meaningless. Most findings should not become work; what they need is a recorded decision that they will not.

**Option C — three dispositions, and a queue that is not the item list.** A finding is fixed, scheduled with an id, or rejected with a reason. Findings that are neither fixed nor rejected live in an `Open Findings` queue — separate from scheduled items, because a scheduled item is dimensioned work and a finding is not — and `/next` reads both when choosing an objective.

---

## Decision

Adopt Option C.

- `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected" states the rule once. **Being described in prose is not a disposition.** Rejection is first-class.
- The rule is cited from every instruction that can produce a finding: `commands/analyze.md`, `bug.md`, `review.md`, `feature.md`, `next.md`, `architect.md`, `workflows/review.md`, `workflows/hotfix.md`.
- `PRODUCT/ROADMAP.md` gains an `Open Findings` section, shipped in the Product-layer template so every Installation starts with it. `commands/next.md` Step 3 reads it alongside the scheduled items.
- `AI/memory/learnings.md`: every `Future action:` cites an id or states that no work is implied. `.github/scripts/check_future_actions.py` enforces it in CI.
- `commands/analyze.md`'s prohibition is corrected to forbid implementing rather than recording.

---

## Reason

The queue is the smallest structure that makes the failure impossible to reach by accident. A finding with an id and a disposition can be wrong, deprioritised or rejected — all recoverable states. A finding in prose has no state at all.

Separating the queue from the item list preserves what the roadmap is for. Items stay dimensioned work in priority order; the queue holds candidates that have not earned that yet, and the priority formula decides when one graduates.

---

## Consequences

Positive:

Every round can be asked a question it previously could not answer: what happened to each thing you found? The queue makes an unresolved finding visible at the moment `/next` chooses work, rather than at the moment someone happens to re-read a closed item's narrative. Rejection being first-class means the queue does not grow monotonically.

Negative:

The queue is another append-only document in a repository whose per-session context is already the subject of this priority block — it must stay a table of one-line entries, and it falls under whatever lifecycle rule item 21 writes. The disposition rule is also mostly unenforceable: only the `Future action:` half has a mechanical guard, because detecting a finding inside prose has no pattern (Learning-015). And that guard, like every other, runs in this repository's CI and not in any Installation. (Deleted 2026-08-13, founder instruction: this sentence named `kenovis check` / item 25 as the work that would close that gap. Item 25 was rejected on 2026-08-12 — see DECISION-026. Item 37 carries it: each guard's rule gets a Framework-layer home that `sync` delivers.)

---

# DECISION-026

# An Improvement Lands In The Framework Layer, Because That Is The Product

Date:

2026-08-12

Status:

Accepted

Owner:

Founder

Review Date:

When a rule is proposed that genuinely cannot live in `.kenovis/AI/` — the first real counter-example is the test of this decision.

---

## Context

Founder, 2026-08-12, after reviewing four consecutive rounds of work:

> *"Tu misión es que todo lo que hagas y mejores y arregles y TODO, se haga en la propia infraestructura de Kenovis, NO EN UNA PUTA BUILD... la gente va a inyectar el AI-OS en sus productos para tener un equipo que desarrolle el producto, no es un paquete a utilizar en X momento o no. Esto será un AI-OS que trabaje SOBRE EL PRODUCTO QUE SE INYECTE."*

Measured, not asserted: `ls .github/scripts/check_*.py | wc -l` → **9** mechanical guards in this repository. Number of them a customer Installation runs: **0**. `cli/scripts/bundle-framework-assets.mjs` ships `.kenovis/AI/` plus the customer README; `.github/` is not in the bundle, verified in Phase 1 item 17. Every round added enforcement to the repository and none to the product, and each round recorded the gap as a caveat while widening it — item 25's own text says the margin "grows every round", which it did, including in the round that quoted it.

The proposed remedy made it worse rather than better. `kenovis check` (item 25) would have moved the rules into the shipped package as a **CLI subcommand a human runs on purpose**. That is a linter next to the AI-OS, not the AI-OS. It fails the product definition: an Installation is not a package invoked at a moment of someone's choosing, it is a team that operates on the repository it was injected into, on every task, whether or not anyone remembers it exists.

---

## Options Considered

**Option A — CI guards in `.github/`.** What was actually being built. Rejected: not in the bundle, so it protects this repository and no customer. It also fires at merge time, after the work and the decision are already done, and this repository merges with `gh pr merge --admin`, which bypasses it.

**Option B — `kenovis check`, a CLI subcommand (item 25 as written).** Rejected by the founder. On-demand invocation is the defect, not the delivery mechanism: a rule that only holds when someone runs a command is a rule that holds when it is least needed. It also splits every rule across two implementations — the ADR for it named "where the rule definitions live so Python and TypeScript cannot drift apart" as an open question, which is a cost created entirely by choosing this option.

**Option C — the Framework layer is the enforcement.** A rule goes into the policy, command, workflow, agent or template that the AI already loads to do the work. `sync` delivers it to every Installation. It is in force on the next task, in every repository that has the AI-OS injected, with nothing to invoke.

---

## Decision

Adopt Option C.

- **Every improvement — a rule learned, a defect found, a decision taken — lands in `.kenovis/AI/`.** That is the product. In this repository the product *is* the Framework layer, so "improve the product" and "improve the infrastructure under `.kenovis/AI/`" are the same sentence, and work that lands anywhere else has not improved the product.
- **`.github/` is this repository's own scaffolding and is never the deliverable.** A guard there is allowed as a local net over this repository's own dogfooding. It may never be the answer to "how is this enforced", and a round that adds one states what the framework-layer half is.
- **Item 25 (`kenovis check`) is rejected** in its current form. See `PRODUCT/ROADMAP.md`.
- **The CLI's job stays delivery.** `init`, `add`, `sync` install and update the Framework layer. Behaviour belongs to the layer they deliver, not to new subcommands.

---

## Reason

The product's value proposition is a team that operates on the customer's repository continuously. Enforcement that requires invocation contradicts it at the mechanism level, not the packaging level — which is why moving the guards into the npm package would not have fixed anything.

There is also a simple test this decision makes available and the previous approach did not: *does this change reach a customer's next task without anyone doing anything?* A CI script fails it. A CLI subcommand fails it. A rule in a policy the agents already load passes it.

---

## Consequences

Positive:

The dogfooding gap closes by construction rather than by an item that keeps being deferred: there is no longer a place to put a rule where a customer will not get it. `sync` is already the distribution mechanism, so no new machinery is required.

Negative:

The Framework layer's enforcement is instructions read by an agent, not code that fails a build — weaker than a mechanical check, and honest about it. Some rules genuinely have no framework-layer form; those go without a guard rather than into `.github/` with a caveat that reads as a plan. The nine existing guards stay where they are and are not migrated wholesale: each one's rule needs its framework-layer home decided individually, which is `PRODUCT/ROADMAP.md` item 37.

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

---

# DECISION-027

# Nothing Stays In The Thread

Date:

2026-08-13

Status:

Accepted

Owner:

Founder

Review Date:

When a session produces a finding that genuinely belongs in none of the six destinations — that is the test of the routing table, not of the rule.

---

## Context

The founder, on the fourth consecutive day of raising it: *"TODO LO QUE SE ENCUENTRA YA SEA MEJORA, BUG, DEUDA TECNICA, DECISIONES, APRENDIZAJES, DUDAS, TODO DEBE METERSE EN LOS PUTOS ARCHIVOS CORRESPONDIENTES EN KENOVIS."*

This is the product's purpose, not a feature of it. An AI-OS that finds a defect and says nothing is not a development team.

The rule existed. Its reach did not. Counted on 2026-08-13 with `grep -ci "Open Findings\|disposition" .kenovis/AI/commands/*.md .kenovis/AI/workflows/*.md`: named in **5 of 19** commands and workflows, and its one checkable form in **1 of 19**. Every one of those five is a door you have to already have decided to walk through. A session that ran no command was governed by nothing, and an Installation's root `CLAUDE.md` is a minimal stub that points at `SYSTEM.md` rather than carrying any rule itself — so the rule sat two hops from the only file that autoloads.

DECISION-025 established the dispositions. DECISION-026 established that a rule belongs where the work is loaded. This decision is where those two meet a rule that was written in neither place.

## Decision

Everything a session finds is written into a Product-layer file, in that session, routed by kind: candidate work to `PRODUCT/ROADMAP.md`, decisions to `DECISIONS.md`, lessons to `AI/memory/learnings.md`, domain rules to `DOMAIN/`, architectural consequences to `ENGINEERING/`, and questions the AI cannot answer to the findings queue naming who decides and what input they need.

The rule and its routing table live in three places, in descending order of what a session can skip: the `CLAUDE.md` stub the CLI writes into every Installation (autoloaded, no command, no hop), `.kenovis/AI/SYSTEM.md` → "Nothing Stays In The Thread", and `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected", whose population widens from closed roadmap items to sessions.

Telling the human is not recording it. Neither is describing it in the narrative of whatever item was open.

## Alternatives Considered

**Add a terminal step to all 19 commands and workflows.** Rejected as the primary mechanism. It is nineteen copies of one rule — the divergence OF-24 records — and it still misses the case that produced this decision, a session that invokes no command at all.

**A Claude Code hook firing at session end.** Already rejected as OF-20: it is one client's configuration, and everything under `.kenovis/` stays tool-agnostic markdown.

**A CI guard over sessions.** There is no artifact. A session that wrote nothing leaves nothing to check, which is the whole shape of the problem; DECISION-026 and OF-21 also hold the eleventh guard until item 37 completes.

## Consequences

The rule now reaches a customer's next session with nobody doing anything, which is DECISION-026's test. A CLI test fixes it in the stub so a future edit cannot quietly drop it.

What this does not do is detect a violation. Compliance rests on the rule being loaded, unmissable, and stated in the first file read — the same footing as every other instruction in this AI-OS. The detection half stays OF-21, deliberately unbuilt for now.

---

# DECISION-028

# Kenovis Replaces The Conventional Development Team, Not The Human Who Owns The Product

Date:

2026-08-13

Status:

Accepted

Owner:

Founder

Review Date:

When an external team's run (item 33) produces evidence about which claim customers actually buy.

---

## Context

Two documents that every session loads stated opposite missions, and neither knew about the other.

`.kenovis/AI/SYSTEM.md` → "Final Principle", present since initialization, read in full at the start of every session and shipped by `sync` to every Installation:

> The AI-OS exists to amplify human creativity and decision making.
>
> The objective is not to replace engineering teams.

`PRODUCT/OPERATING_MODEL.md` §1, authored by the founder and recorded on 2026-08-13:

> Its primary mission is to enable products to be developed, maintained, evolved, and supported **without requiring a conventional human development team**.

`grep -rn "not to replace engineering teams" PRODUCT/ DECISIONS.md AI/memory/` → **0** before this decision. Four consecutive `/analyze` rounds ran on the question of whether this AI-OS still served its purpose, and none found the sentence in which the constitution denies it — because the constitution is loaded as authoritative and read for instruction, not audited against a specification that until that day did not exist on disk (OF-36, `AI/memory/learnings.md` Learning-028).

`COMPANY_OS.md` → Company Vision carried the same weaker claim by omission ("gives any small, ambitious team the execution capacity of a full specialized organization"). That was already recorded as OF-36's open half. This decision settles both.

## Decision

**§1 wins.** Kenovis's mission is to let a product be built, maintained, evolved and supported without a conventional human development team.

The negation is deleted rather than softened: `SYSTEM.md`'s "The objective is not to replace engineering teams" and its paired "amplify human creativity" framing are removed, and `COMPANY_OS.md` → Company Vision is restated against §1. A sentence that contradicts the specification is not improved by qualification; it is the thing the specification exists to overrule.

What is *not* claimed, and the boundary matters because it is the difference between a product and a fantasy: Kenovis does not replace the human who owns the product. `PRODUCT/OPERATING_MODEL.md` §4 assigns the founder product direction, strategy, business decisions, approval and prioritisation, and assigns Kenovis engineering awareness, technical debt tracking, architectural consistency, technical planning, discovery tracking and roadmap completeness. The replaced party is the *conventional development team* — the roles, the process, and the institutional memory. The retained party is the owner.

Ranking, stated because OF-39 has not settled the general hierarchy and this conflict could not wait for it: **where `PRODUCT/OPERATING_MODEL.md` and any framework document conflict, the operating model wins.** It is the founder's statement of what the product is for; the framework describes how it is built. This is a specific ruling on a specific conflict, not the general hierarchy — OF-39 still has to reconcile `CLAUDE.md`'s and `SYSTEM.md`'s two disagreeing Source Of Truth Hierarchies, neither of which lists the operating model at any rank.

## Alternatives Considered

**`SYSTEM.md` wins — augmentation.** Rejected by the founder. It is the more defensible commercial position and the one `COMPANY_OS.md` already held, and that is precisely what made it dangerous: it was never chosen, it was inherited from the template and never compared to what the founder actually wanted. Keeping it would have meant every round continued to optimise against a mission the owner does not hold.

**Scope both — "replaces the conventional team, does not replace the responsible human".** Rejected as the *resolution*, retained as the *content* of this decision's second half. As a resolution it would have left both sentences standing and required every future reader to reconcile them; the boundary is better stated once, here, than implied by two surviving sentences that appear to disagree.

**Wait for OF-39.** Rejected. OF-39 asks which of two hierarchies governs in general; this is a flat contradiction between two named sentences, and it does not need the general rule to be settled. Sequencing it behind OF-39 would have left the constitution denying the specification for another N rounds, which is the parking that `PRODUCT/ROADMAP.md` item 27 exists to forbid.

## Consequences

`SYSTEM.md`'s Final Principle changes for every Installation on its next `sync`. That is the intended blast radius: an Installation whose agents read "do not aim to replace an engineering team" before every task was being told the opposite of the product's mission.

`COMPANY_OS.md` → Company Vision, Company Thesis and the Ideal Customer Profile now make a stronger claim than the market has validated. One external team has run this product, on 2026-08-06, against `kenovis@0.3.0` (OF-12, item 33). The claim is the founder's to make and the evidence to support it does not exist yet — recorded here so that gap is visible rather than discovered later.

`PRODUCT/OPERATING_MODEL.md` is now cited by a decision, which does not by itself put it on any session-initialization path — that is OF-50 and stays open.

The unscoped "The AI is not an autonomous decision maker" in `SYSTEM.md` and `CLAUDE.md` is **not** settled here. It is a scoping defect rather than a contradiction of mission, it survives this decision unchanged, and it stays OF-58 — separated deliberately so that a ruling on replacement does not silently also rule on autonomy.

---

# DECISION-029

# A Finding Is Checked Against The Roadmap, And An Open Finding Is Dimensioned

Date:

2026-08-13

Status:

Accepted

Owner:

Founder

Review Date:

When item 41 step 2's conformance table has one closing round's worth of evidence on whether the comparison is actually being performed.

---

## Context

Founder instruction, given in this session and quoted so the rule stays traceable to what was asked: *"quiero que TRAS CADA analisis, ejecucion, aprendizaje, decision tomada, hallazgo encontrado... revises SIEMPRE si eso esta planificado en el roadmap, y si no lo esta, que lo añadas y lo planifiques"*.

DECISION-025 requires a finding to carry a disposition. DECISION-027 requires it to be written to a Product-layer file in the session that found it. Neither requires the finding to be **compared against what is already planned**, and neither requires a queued finding to be **comparable to the others** once it is there. Both are the difference between a record and a plan.

Measured 2026-08-13, each read off the tree:

- `grep -rni "already scheduled\|already covered\|duplicate finding\|existing item covers" .kenovis/AI/` → **0**. Nothing anywhere in the framework tells an agent to look at the roadmap before writing a finding into it.
- `grep -rn "Pain" .kenovis/AI/policies/ .kenovis/AI/commands/` → **0**. The formula the queue is ranked by — `(Customer Pain × Frequency × Business Impact)` — lives at `.kenovis/AI/templates/product-layer/PRODUCT/ROADMAP.md:246`, a product-layer template, and nowhere an agent loads per task.
- Of **47** `Open` rows in this repository's queue, **41** carry Pain, Frequency and Cost and **6** do not — OF-02, OF-03, OF-04, OF-10, OF-11, OF-14.

That last figure is the shape of the problem rather than its size: dimensioning is already the habit *here*, after forty rounds of it. A habit is exactly what a fresh Installation does not have, and the framework was shipping the practice as an example inside a form the customer owns. Same state §2 of the operating model was in before item 39 — the rule was real, and it was not anywhere an agent reads.

## Decision

Two rules, added to `.kenovis/AI/policies/documentation.md` (3.4 → 3.5) → "A Finding Is Fixed, Scheduled, Or Rejected":

**Check before writing.** A finding is compared against `PRODUCT/ROADMAP.md` before it is dispositioned. Two outcomes, never zero: it cites the id that already covers it and adds what this session learned to that entry, or it takes a new id. Writing without looking gives one defect three ids; looking without writing concludes "already known" about something that is on no document at all.

**Dimension the row, not the item.** An `Open` row states **Pain, Frequency and Cost** in one line, and writes `unknown` where a term is unknown — an unknown term ranks and names the first output of picking the finding up, while an omitted one drops the finding out of every subsequent selection, which is indistinguishable from never recording it. Promotion to a scheduled item — problem, target, validation — is a separate act, performed by the round that picks the finding up.

And the sentence the instruction turns on, stated in the policy in those words: **recording is not planning.** A finding on disk and absent from the roadmap has been remembered, not scheduled.

## Alternatives Considered

**Every finding becomes a `SCHEDULED` item immediately.** Presented to the founder and rejected. It would close OF-32 by construction, and it puts the highest cost at the exact moment the round is least able to pay it — discovery is usually late in a session, which is when a round takes the cheap path and writes prose instead. It also accelerates the one document this framework currently cannot bound: `PRODUCT/ROADMAP.md` is **143,904 bytes** against a 60 KB threshold with the archive rule already run to its limit (OF-62).

**Per-finding judgement — item if executable now, row if not.** Rejected. The criterion would be applied by the same agent whose lapse produced the finding, and nothing checks the application. That is the shape of every failure this policy section already exists to catch.

**A CI guard on the comparison.** Not proposed, and recorded so it is not proposed again. DECISION-026 and OF-21 hold the eleventh guard until item 37 completes, and an unmade comparison leaves no artifact to classify — Learning-015's point exactly.

**Keep it as this repository's behaviour only.** Presented and rejected by the founder. It fails DECISION-026's test outright: no Installation would receive it, and the Installations are where the habit does not exist.

## Consequences

The rule reaches a customer's next task through `sync` with nobody invoking anything, because `policies/documentation.md` is loaded per task. DECISION-026's test, passed.

It names terms defined in a file it does not ship alongside. The priority formula lives in the product-layer template, which an Installation owns and may edit or delete, so a customer can end up holding a policy that cites a formula their roadmap no longer contains. Recorded as **OF-67**, not fixed here.

Six `Open` rows in this repository do not meet the rule on the day it is written. Backfilled as **OF-66**, so the exception is a queued row rather than a silence.

This does not settle **OF-38** — when a session ends is still an event nothing detects — and it does not settle **OF-32**, which is about findings being *resolved* rather than dimensioned. It makes both smaller and neither disappears.

---

# DECISION-030

# `/next` Starts From The Pointer, And Stops Rather Than Descends

Date:

2026-08-13

Status:

Accepted

Owner:

Founder — `PRODUCT/ROADMAP.md` item 42 parts 2-3, from the founder-supplied usage model in `PRODUCT/OPERATING_MODEL.md` → Addendum A.

Review Date:

After the first round that actually reaches a founder-call item and stops, which is expected to be the very next one.

---

## Context

Addendum A states the cadence this product is actually used under: **one thread per `/next`**. A fresh thread inherits no conversation, so everything a round needs has to be on disk and has to be pointed at.

Two defects, both measured, both firing on the next round:

**The pointer is written and never read.** Step 15 has said since 2.4 that the recommended next action goes in `PRODUCT/ROADMAP.md` *"so the next `/next` run reads it instead of re-deriving it"*. Step 3 named exactly two inputs — the scheduled items and the `Open Findings` queue — and never the pointer. `awk '/^# Step 3/,/^# Step 4/' .kenovis/AI/commands/next.md | grep -c 'Next` pointer'` → **0** before this change. So every round re-derived the ordering from the priority formula over a **153,375-byte** document while the previous round's four paragraphs of sequencing reasoning sat unread a few hundred lines away. (OF-46's own row anchored that document at 131 KB, which was already stale when this round read it — the fourth instance of OF-04.)

**A human-only objective has no defined behaviour.** `grep -cin "founder\|human decision\|cannot execute\|who executes" .kenovis/AI/commands/next.md` → **0** before this change. `policies/documentation.md` requires an `Open` finding the AI cannot execute to name who executes it and what input they need — the write side shipped, and nothing consumed it. The top of the board is item 41 step 1, a founder call on OF-39; items 32 and 33 are the same shape. Step 9's *"do not continue blindly, update plan"* is the only thing that speaks to it, and it speaks to neither outcome.

## Decision

Both rules go in **Step 3**, `.kenovis/AI/commands/next.md` 2.5 → 2.6.

**Three inputs, and the round starts from the pointer.** A round may depart from it, and when it does it says why in `PRODUCT/ROADMAP.md` in the same round. A departure that is not written down is indistinguishable from never having read the pointer. When no pointer exists, rank from the other two inputs and write one in Step 15.

**When the objective is not the AI's to execute: present, record, stop.** Present the decision with the input the item already names; record in `PRODUCT/ROADMAP.md` that the round reached that item and stopped, and on what; stop. If the human answers in the same session, continue from Step 4.

**Descending the priority order to find something executable is forbidden**, in those words.

## Alternatives Considered

**Leave the pointer implicit — Step 15 already says the next run reads it.** Rejected. An instruction whose reader is never told to read it is not a weak instruction, it is an absent one; `policies/documentation.md` → "An Instruction Is Reachable, And Its Sink Is Read" names exactly this failure, and it was happening inside the command that ships that policy's workflow.

**Descend to the next executable item when the top one needs a human.** Rejected explicitly, and written into the command as a prohibition rather than left unstated. It is the most natural thing for a round to do and it is invisible: skipping leaves no artifact, so a board whose top item needs a decision silently becomes a board of whatever the AI could do alone, every individual round defensible. That is item 40's drift with a fresh mechanism.

**Put the human-call branch in Step 9 (Check Dependencies).** Rejected. Step 9 runs after Steps 4-8 have activated agents and built a plan, so the round pays the full planning cost for work it cannot execute. And Step 9's existing text is what already failed to cover this — moving the rule there would put it where it had demonstrably not been read.

**Make stopping conditional on the human being present.** Rejected as unknowable. A command cannot detect whether anyone is reading, and a rule that depends on that would resolve to "descend" in exactly the unattended case where the trace matters most.

## Consequences

A board whose top item is a founder call now produces a **stopped round with a written record** instead of lateral work. That will read as less output, and it is the intended behaviour: the alternative was output that misrepresented the state of the board.

The pointer becomes load-bearing. A round that writes a careless one now misdirects the next round rather than being ignored — which is a real cost, and the reason a departure has to be recorded rather than merely permitted.

This does not implement observation (OF-33) or the empty-roadmap terminal behaviour (OF-49). Both stay where they are, in item 42 part 5 and item 41 §16.

---

# DECISION-031

# One Source Of Truth Hierarchy, In `SYSTEM.md`, With The Operating Model At Rank 1

Date:

2026-08-14

Status:

Accepted

Owner:

Founder — answered in session, closing `PRODUCT/ROADMAP.md` item 41 step 1 (OF-39, OF-50).

Review Date:

When OF-72 settles whether every Installation authors an operating model, since that decides whether rank 1 is generally reachable.

---

## Context

Two Source Of Truth Hierarchies, in the two documents every session loads, disagreeing on the pair that collides most often. Read off the tree before this change:

`CLAUDE.md` → COMPANY_OS.md, DECISIONS.md, DOMAIN/, PRODUCT/, ENGINEERING/, code.

`.kenovis/AI/SYSTEM.md` → Business Rules, Domain Model, Architecture Decisions, Product Requirements, Implementation Code, AI Suggestions.

When a recorded decision contradicts a business rule, `CLAUDE.md` gave the decision the win (2 over 3) and `SYSTEM.md` gave the business rule the win (1 over 3). **The rule that resolves every other conflict was itself in conflict**, and neither reader opened the other file because both are loaded as authoritative — OF-24's duplication failure at the one altitude where it cannot be tolerated.

Neither listed `PRODUCT/OPERATING_MODEL.md` at any rank, and `grep -n "OPERATING_MODEL" CLAUDE.md .kenovis/AI/SYSTEM.md .kenovis/AI/commands/bootstrap.md` → **0**: the founder's statement of what the product is for was on no session-initialization path at all, reached only incidentally as one file inside `PRODUCT/` (OF-50). DECISION-028 had already ruled it outranks a framework document *for one conflict*, deliberately leaving the general hierarchy open — this is that opening closed.

The two were taken as one decision because ranking a document and loading it are the same act: a rank nothing reads is not a rank.

## Decision

**One hierarchy, in `.kenovis/AI/SYSTEM.md`.** `CLAUDE.md` cites that section and no longer states an ordering. `SYSTEM.md` is what `sync` delivers to every Installation; the generated `CLAUDE.md` stub carries neither copy (OF-27), so the version that had been living in this repository's `CLAUDE.md` was never reaching a customer in the first place.

The order:

1. `PRODUCT/OPERATING_MODEL.md` — the owner's statement of purpose, where one has been authored.
2. `COMPANY_OS.md`
3. `DOMAIN/` — business rules and the domain model.
4. `DECISIONS.md`
5. `PRODUCT/`
6. `ENGINEERING/`
7. Implementation code.
8. AI suggestions.

**A business rule outranks a decision** (3 over 4), settling the inversion. A decision is an engineering choice made at a point in time; a business rule is what the product must be true of, so a decision contradicting one is a defect in the decision rather than a licence to bend the rule.

**Rank 1 goes on the session-initialization path** — `CLAUDE.md` → "Session Initialization Protocol", `SYSTEM.md` → "Context Loading Rules", and `commands/bootstrap.md` (2.7 → 2.8) Step 2, which now names it rather than reaching it as one file inside `PRODUCT/`. That closes OF-50's this-repository half.

One slot was not put to the founder and is flagged rather than buried: **`COMPANY_OS.md` at rank 2**. It was rank 1 in `CLAUDE.md`'s list and absent from `SYSTEM.md`'s, so placing it directly under the operating model preserves its previous standing and inserts only what was decided. It is the one position in the list derived rather than answered.

## Alternatives Considered

**Keep the hierarchy in `CLAUDE.md`.** Rejected. `CLAUDE.md` is autoloaded first in *this* repository, which is exactly the reasoning [[Learning-026]] records as false about Installations: the generated stub is a pointer to `SYSTEM.md`, so the conflict-resolution rule would have lived where no customer could read it.

**Author a third hierarchy in its own document, cited by both.** Rejected. It resolves the divergence by adding a third place for it to recur, and this framework has no mechanism that detects a rule restated in a new file — OF-24's detection half is still open.

**Classify business rules, so invariants always win and product rules yield to a later decision.** Rejected. It is more faithful to reality and it requires someone to maintain a classification, in prose, which is the shape this repository has already rejected twice (Learning-015, and the two guards built on classifying prose).

**Wait for item 41 step 2's conformance table.** Rejected. Step 1 exists precisely because nothing below it can be checked against a specification whose rank is undefined.

## Consequences

`SYSTEM.md` changes for every Installation on its next `sync`, and the change is in what its agents obey when documents disagree.

**Rank 1 is conditional, and the condition is written into the hierarchy rather than assumed away.** No Installation has `PRODUCT/OPERATING_MODEL.md`: `grep -c "OPERATING_MODEL" .kenovis/AI/commands/init-project.md .kenovis/AI/commands/adopt-project.md` → **0**, and no template exists. A hierarchy whose top entry is absent for every customer would be OF-25 exactly — the shipped framework naming something the reader does not have — so the section states the condition and names **OF-72**, which is the founder's call on whether every Installation authors one.

OF-58 is untouched. "The AI is not an autonomous decision maker" is still unscoped in both documents; this decision ranks documents and does not scope autonomy.

**Rank 1's condition was removed by DECISION-032** (2026-08-14), which is this decision's Review Date firing rather than a supersession: OF-72 settled that every Installation authors an operating model at setup. The body above stays as written, including its "rank 1 is conditional" paragraph, because the trail is the point.

---

# DECISION-032

# Every Installation Authors Its Operating Model At Setup, And The Conformance Table Lives In It

Date:

2026-08-14

Status:

Accepted

Owner:

Founder — answered in session (OF-72), closing `PRODUCT/ROADMAP.md` item 41 step 2 and OF-73.

Review Date:

After the first external Installation runs `/init-project` under this requirement (`PRODUCT/ROADMAP.md` item 33), which is the first evidence of what asking four more questions at setup actually costs an owner.

---

## Context

DECISION-031 put `PRODUCT/OPERATING_MODEL.md` at rank 1 of the only Source Of Truth Hierarchy and shipped that hierarchy to every Installation. No Installation had the document: `grep -c "OPERATING_MODEL" .kenovis/AI/commands/init-project.md .kenovis/AI/commands/adopt-project.md` → **0** on 2026-08-14, and `ls .kenovis/AI/templates/product-layer/PRODUCT/` returned four templates, none of them an operating model. So every customer received a conflict-resolution rule whose top entry described a document their setup never asked them for — OF-25's shape, in the rule that resolves every other conflict.

Three things are settled here as one decision because they are one mechanism, and separating them would ship a third of it:

- **OF-72** — whether an Installation has a rank 1 at all.
- **`PRODUCT/ROADMAP.md` item 41 step 2** — where the conformance table lives. It can only live in a document that exists.
- **OF-73** — `COMPANY_OS.md` → "Knowledge Hierarchy", a **third** Source Of Truth ordering that inverted DOMAIN/ and PRODUCT/ against DECISION-031 and omitted `DECISIONS.md`. It survived DECISION-031 because a duplicate is found by comparing the copies you already suspect, and nothing enumerates them ([[Learning-034]]).

The reason the table needs a home other than the roadmap is the failure `PRODUCT/ROADMAP.md` item 40 measures: a round can be checked against a guard's exit code, a byte count or a document's structure, and could be checked against nothing else. Instrumentation wins every ranking because its cost is exactly knowable. The objective was not written anywhere a round could be checked against it.

## Decision

**1. Every Installation authors `PRODUCT/OPERATING_MODEL.md` at setup, before `COMPANY_OS.md`.** `/init-project` Step 1 and `/adopt-project` Step 2 ask four questions — what the product is for, what the AI-OS owns, what the owner owns, what rules are non-negotiable — and Step 2 / Step 3 write the document from the answers, from `.kenovis/AI/templates/product-layer/PRODUCT/OPERATING_MODEL.md`, a form and not a destination. Where the owner supplies a written statement it is recorded **verbatim**.

**The AI never authors this document on the owner's behalf.** It is the one Product-layer file that is not the AI's to write, because it is the file the AI is measured against, and an operating model the AI wrote is the AI grading its own work.

Rank 1 therefore stops being conditional. `SYSTEM.md` (1.8 → 1.9) states one transition case instead: a repository set up before this requirement may hold no such file, and there the gap is work to raise with the owner, not a permitted state.

**2. The conformance table's home is `PRODUCT/OPERATING_MODEL.md` → "Conformance",** appended below the owner's text and never interleaved with it, and it **moved** from `PRODUCT/ROADMAP.md` item 41 rather than being copied. The roadmap records what will be built and when; it cannot state whether the product does what it is for, because the criterion lives in the specification.

With it, the standing criterion: **a closing round states which section of the operating model its work served and updates that row, or states that it served none.** Carried by `commands/next.md` (2.6 → 2.7) Step 13, which every task loads and `sync` delivers — DECISION-026's test. Restated in Step 15's summary so the human reads it without opening the table.

**3. `COMPANY_OS.md` states what each document defines and no ordering.** The "Knowledge Hierarchy" section becomes "What Each Document Defines", keeps the per-document descriptions, adds `PRODUCT/OPERATING_MODEL.md` and `DECISIONS.md`, and cites `SYSTEM.md` for precedence. The template gets the same change plus an explicit instruction not to add an ordering back.

## Alternatives Considered

**Leave the operating model optional, with the hierarchy accommodating its absence** — the status quo DECISION-031 shipped. Rejected by the founder. It costs nothing today and it means every Installation repeats the diagnosis this repository spent five rounds on: items 40 and 41 exist in their entirety because the document was missing here, and the whole of that cost is what a customer would pay again.

**Offer it at setup and let the owner decline, recording "none authored".** Rejected. It is honest and it makes the absence visible, but it prices a required artifact as optional at the exact moment an owner has the least context to judge whether they need it — and the answer to "do you want to write a statement of purpose" during setup is predictably no.

**Ship the conformance table in the roadmap template instead**, so it reaches Installations without an operating model. Rejected. It puts the report on the specification into a document that ranks below it, and it is the arrangement that produced item 40 in the first place.

**Renumber the setup commands to give the operating model its own Step 1.** Rejected on blast radius, not on merit. `init-project.md` Step 8, Step 11 and Step 12 and `adopt-project.md` Step 13 are cited by id from `AI/memory/learnings.md`, DECISION-018 and DECISION-022, and renumbering breaks every one of those citations silently. The existing step is titled "the top of the hierarchy" and was writing rank 2 while rank 1 did not exist; extending it is what the title already claimed.

**Delete `COMPANY_OS.md`'s section outright** rather than rewriting it. Rejected. The per-document descriptions are genuinely useful and are the half that was never wrong — what was wrong is the arrows between them.

## Consequences

Setup gets longer, and it gets longer at its most fragile moment. Both commands already refuse to invent answers, so four more questions is four more places a setup can stall on a human who does not have an answer ready. That cost is real and is the reason for this decision's Review Date.

**Existing Installations do not migrate.** `sync` mirror-replaces `.kenovis/` and never writes the Product layer (RULE-INST-01), so an Installation created before this change receives the new templates and setup commands and still has no `PRODUCT/OPERATING_MODEL.md`. `SYSTEM.md` names that state and routes it to the owner; nothing detects it. Same shape as item 22's migration problem and recorded here so it is not discovered as a surprise.

**OF-73's fix reaches future Installations only.** The template change lands for anyone setting up from here; an Installation that already authored its `COMPANY_OS.md` holds its own copy of the third ordering, in the Product layer, where no sync will ever reach it. [[Learning-034]]'s second half is exactly this — a rule with one framework home can have as many Product-layer contradictions as there are customers — and this decision does not solve it.

**The conformance table can now go stale in a new way.** It has seventeen rows, each carrying a measurement, and nothing re-runs them. The mitigation is in the rule (a row's state is read off the tree with the command in the row, never carried over) and it is an instruction, not a mechanism.

---

# DECISION-033

# The Closing Round Builds The Conformance Table, And Declares The Two Lines Whose Absence Is Otherwise Invisible

Date:

2026-08-14

Status:

Accepted

Owner:

AI — engineering, closing `PRODUCT/ROADMAP.md` OF-76, OF-77's declaration half and OF-70, all three created by DECISION-032's own round.

Review Date:

After OF-79 is dispositioned. If the answer there is that the table is re-verified on a cadence rather than per round, the population rule below is the natural place that cadence attaches, and this decision is where to record it.

---

## Context

DECISION-032 shipped a criterion — a closing round states which section of the operating model its work served and updates that row — and shipped it with two holes its own round found and queued.

**The table has no rows.** `grep -c "^| [0-9]" .kenovis/AI/templates/product-layer/PRODUCT/OPERATING_MODEL.md` → **1** on 2026-08-14: one placeholder. Setup deliberately leaves it unfilled, and both setup commands say why — setup is the session least equipped to measure conformance. So the first closing round in an Installation is told to update the row for the section it served, and there is no row. This repository has seventeen rows only because a round built them by hand before the rule existed.

**Nothing holds a round to either declaration.** The criterion permits "none" as an answer, and a round that served none and stayed silent is indistinguishable from a round that forgot. The `Next` pointer has the identical shape one step earlier: `commands/next.md` 2.7 Step 3 falls back to re-deriving the ordering when no pointer exists, which is correct for a first round and makes a skipped Step 15 read as intended behaviour.

The population instruction did exist, and where it existed is the part worth recording. `init-project.md` line 190 said the table is *"filled the first time a round reads the document end to end against the framework"*, and the template repeated it. Both true, neither executable: a setup command is read once, by the session running setup, and never again by any round it describes. That is [[Learning-036]]'s third failure mode — an instruction whose sink is never read — with the sink being a command a round does not load.

## Decision

**1. The closing round builds the conformance table when it is still the form.** `commands/next.md` (2.7 → 2.8) Step 13: write one row per numbered section of `PRODUCT/OPERATING_MODEL.md`, with `unmeasured` in the State column of every row this round did not verify itself. It is a one-time step per Installation; from then on the step only updates rows.

`unmeasured` is defined in the template (1.0 → 1.1) as the state a row is born in, and it is deliberately **not** a fourth grade alongside `Present` / `Partial` / `Absent`: it carries no claim about the product, and a row that stays `unmeasured` across rounds is itself the finding.

**2. Two required lines, in `PRODUCT/ROADMAP.md`, next to the item the round closed.** `Operating model section served:` naming the section or the word `none`; `Next:` carrying the ranked objectives and the reasoning, or `none` with why there is nothing to point at.

Both are the inversion `.kenovis/AI/policies/documentation.md` → "A closed item declares what it left behind" already uses for findings, applied to the two other rules in the same command that had become load-bearing without it. A round that means `none` writes `none` on the record; a round that forgot leaves an absence, and an absence is exact in a way a judgement about prose is not.

**3. The population instruction moves rather than multiplying.** The template names `next.md` Step 13 as the owner instead of restating the requirement, so the rule has one home and it is the one every round loads.

## Alternatives Considered

**Setup builds the rows, every state written as `unmeasured`.** This was the cheaper of the two shapes OF-76 named, and it is the one this decision rejects. It is honest — `unmeasured` claims nothing — and it puts the work in the session that already has the document open. It was rejected because it re-opens a boundary DECISION-032 had just settled: `PRODUCT/OPERATING_MODEL.md` is the one Product-layer document the AI never authors, both setup commands say in their own words that filling the table during setup records states nobody measured, and a setup that writes seventeen rows is doing something an owner reading the output cannot distinguish from the AI having assessed itself. The round that closes work is the session that has actually read the tree.

**Leave the population to the template's existing sentence.** Rejected on the evidence that produced this finding: the sentence has existed since the template shipped and its executor never loads the file it is in. Repeating a rule in a place nobody reads is how OF-76 happened.

**Make the two declarations a CI guard rather than a required line.** Rejected, and not on merit — a missing line is exactly the kind of absence a guard can detect. DECISION-026 and OF-21 both forbid an eleventh guard before item 37 completes, and a guard in this repository reaches **0** Installations, which is the same reason the rule went into `next.md` and not into `.github/`.

**Fix OF-77 whole, staleness half included.** Rejected as scope, recorded as **OF-79**. Re-verifying seventeen rows costs seventeen commands per round, paid by every Installation forever, for a document read a few times a week — and the shapes that avoid that price (a cadence, a per-row `as of` date, accepting decay and saying so) are a design question, not a clause. Splitting a finding at the point where its cost changes character is preferable to closing half of it silently.

## Consequences

**The criterion becomes reachable in an Installation for the first time.** Between DECISION-032 and this decision it existed and could not be executed anywhere but here.

**A first closing round now does more work than a later one**, and in a fresh Installation that round is also the one with the least context about the product. `unmeasured` is what makes that acceptable — the round is not asked to grade seventeen sections, only to create the rows a later round can move.

**Three required lines is the ceiling for this shape.** The inversion works because an absence is exact and a reader can check it in one look; a closing block with a dozen ceremonial lines stops being read, and the lines stop being written. Anything further of this kind should replace one of the three rather than add a fourth.

**Neither declaration is enforced.** They are instructions in a command, like every other rule in this framework, which is `PRODUCT/OPERATING_MODEL.md` §15 and OF-44 — and this decision does not change that, it only widens the one enforcement shape the framework actually has from one rule to three.

---

# DECISION-034

# One Item Per Round Is The Framework Default, And An Installation's Operating Model Is Where A Different Cadence Is Stated

Date:

2026-08-14

Status:

Accepted

Owner:

AI — engineering, closing `PRODUCT/ROADMAP.md` OF-54, inside item 42 part 4.

Review Date:

When a second Installation exists and has stated a cadence of its own. Until then this decision has one data point, and the per-Installation half of it has never been exercised.

---

## Context

`.kenovis/AI/commands/next.md` → "Autonomous Mode" said *"Claude may continue through multiple roadmap items"*. `PRODUCT/OPERATING_MODEL.md` → Addendum A §1 says one thread executes one `/next`.

Both were in force. One is a framework command, the other is rank 1 of the Source Of Truth Hierarchy in the Installation that had written it (DECISION-031). The conflict is not academic and it is not rare: it resolves at the exact moment a round finishes early and decides whether to continue, and the document the round has open at that moment is the command.

OF-54's row named the honest first output — is the cadence a framework default or a per-Installation setting — and noted that it is the same question item 41 step 1 asked about the specification's rank. That question is now answered, which is why this decision was cheap to make and was not available to the round that queued the finding.

## Decision

**The framework default is one roadmap item per round, ending with the thread.**

**An Installation may state a different cadence in its own `PRODUCT/OPERATING_MODEL.md`, and that statement outranks the default.** The command now says so and defers, rather than asserting a cadence of its own.

## Reasoning

**DECISION-031 already decided this, one level up.** Rank 1 is the owner's statement of what the product is for and how it is developed; everything below it describes how the product is built. A framework command asserting a cadence over an Installation that has written one is a rank-7 artifact overruling a rank-1 document. The fix is not to copy this founder's cadence into the framework — that would hardcode one Installation's answer into a product-agnostic layer, which `.kenovis/AI/SYSTEM.md` → "Project Context" forbids in those words.

**The default is one item rather than many, on the mechanics rather than on this founder's preference.** A second item in the same thread spends the context window that the first item's Steps 13-15 are the last thing to need, and it makes two items' findings share one disposition pass — which is precisely where a second item's findings get folded into the first item's narrative and lose their ids. That is the failure `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected" exists to prevent, and it arrives through the mechanism that looks like efficiency.

**Deference is written at the site, not only here.** An agent deciding whether to continue is reading `next.md`, not this file. Per `.kenovis/AI/policies/documentation.md` → "An Instruction That Produces An Artifact Names Where It Goes", the sentence that makes the rule complete lives where the rule applies.

## Alternatives Considered

**Delete "Autonomous Mode" outright.** Tempting, and rejected. An Installation may legitimately want multi-item rounds — a small board of trivial items, a maintenance sweep — and deleting the section removes the confirmation gates it carries (architecture, security, migrations, large refactors, external costs) along with the cadence claim. Deleting a section to fix one sentence in it destroys the rest.

**Copy Addendum A's cadence into the framework as law.** Rejected. It is this founder's cadence, arrived at for this product, and the framework layer must never hardcode one product's answer. It would also be unfalsifiable in the direction that matters: an Installation that wanted otherwise would have no place to say so.

**Leave it and rely on rank 1 resolving the conflict at read time.** Rejected on how the conflict is actually encountered. The hierarchy resolves conflicts a session *notices*; a session that has `next.md` open and `OPERATING_MODEL.md` in a summary does not experience this as a conflict at all, it experiences it as an instruction. A contradiction only resolves if someone sees both sides.

## Consequences

**`next.md` now names `PRODUCT/OPERATING_MODEL.md` as a place an Installation writes something the command obeys.** That is a new direction of dependency for a command — previously the operating model was read by the session-initialization protocol and by Step 13's conformance rule, both of which report on it rather than take instruction from it.

**Nothing checks that an Installation's stated cadence is honoured**, and nothing checks the default either. This is `PRODUCT/OPERATING_MODEL.md` §15 and OF-44 again, unchanged by this decision.

**The template does not yet prompt for a cadence.** `.kenovis/AI/templates/product-layer/PRODUCT/OPERATING_MODEL.md` asks the owner four questions and none of them is "how many roadmap items per session". An Installation therefore gets the default and no invitation to change it, which is the right failure direction and is still a gap — recorded as `PRODUCT/ROADMAP.md` OF-83.

---

# DECISION-035

# Findings Route By Role As Well As By Destination File, And This Repository's Own CTO Owns Its Framework Layer

Date:

2026-08-14

Status:

Accepted

Owner:

AI — engineering, closing `PRODUCT/ROADMAP.md` OF-31 and OF-55, inside item 41 §12.

Review Date:

When the Agent Roster itself changes, or when a role other than `cto` is picked for a framework-layer finding and the fit is wrong often enough to notice.

---

## Context

`PRODUCT/OPERATING_MODEL.md` §12 states the role that owns a responsibility processes the discovery. What item 39 shipped routes a finding by *destination file* — `PRODUCT/ROADMAP.md`, `DECISIONS.md`, `AI/memory/learnings.md`, `DOMAIN/`, `ENGINEERING/` — never by *responsibility*. `grep -rn "Open Findings\|disposition" .kenovis/AI/agents/*.md` returned **0** across twelve agent files on 2026-08-13: not one of them knows findings exist. A security finding, an architectural finding and a typo receive identical treatment from whichever role happened to be active in the thread (OF-31).

Separately: most rounds on this board edit `.kenovis/AI/` — policies, commands, workflows, templates — because that is this repository's own product (DECISION-026). No listed agent role names that as its own; the Agent Roster's twelve files are silent on it, and it defaults to `cto` by absence rather than by selection (OF-55).

## Decision

**An `Open` finding names the role that owns analysing it, from the existing Agent Roster.** The requirement lives in `.kenovis/AI/policies/documentation.md` — one clause, loaded by every session — rather than as a routing instruction copied into twelve agent files. Existing queue rows are not retroactively tagged; the field applies going forward, the same precedent `PRODUCT/ROADMAP.md` OF-66 already set when Pain/Frequency/Cost were introduced.

**Which role owns which kind of finding is not stated in the framework layer at all.** It is a fact about one specific product's own Agent Roster and the areas it actually maintains, and it differs by Installation the moment a customer's roster differs from this one's. Stating it inside `.kenovis/AI/policies/documentation.md` would hardcode this repository's answer into text every Installation receives.

**In this repository specifically, the CTO role owns findings whose destination is `.kenovis/AI/`.** Recorded in `ENGINEERING/ARCHITECTURE.md`, not in `.kenovis/AI/agents/cto.md` — the same split as the rule above, one level down: `cto.md` is the framework-layer file every Installation receives, and "you own `.kenovis/AI/`" is false for every one of them except this one.

**`ceo`, `marketing`, `finance` and `legal` stay in the roster, unmodified.** `COMPANY_OS.md` → "Company Operating Model" already lists Marketing, Finance and Legal analysis as areas AI agents support, and `PRODUCT/ROADMAP.md` → "Product Strategy" places that work in Phase 2 and beyond — this product has not reached the phase that would invoke them. Dormant by product stage is not the same defect as `.kenovis/AI/workflows/roadmap.md` was (OF-81): that file had zero conceptual justification and a superseding replacement four rounds ahead of it; these four roles have a stated future use and nothing yet built to replace.

## Reasoning

**Item 39's own precedent already settled the shape of this fix.** Nineteen commands and workflows once needed the findings-disposition rule restated in each of them; the fix was one rule, loaded unconditionally, not nineteen copies. Twelve agent files needing to recognise a finding's role is the same problem at the same scale, and copying a routing instruction into each would reproduce exactly the drift item 39 was built to end — a rule edited in one file and not the other eleven.

**A framework-layer file that states a product-specific fact is wrong the moment it reaches a second product.** `.kenovis/AI/agents/cto.md` ships to every Installation unedited (`.kenovis/AI/` is never rewritten per product — `CLAUDE.md` → "Repository Layers"). "You own `.kenovis/AI/`" is true here because this repository dogfoods the framework on itself (DECISION-020's self-modification exception) and false everywhere else, where `.kenovis/AI/` is a read-only mirror no role ever touches. `ENGINEERING/ARCHITECTURE.md` already carries this exact class of this-repository-only fact — the CI-guards section three sections above states plainly that the guards it describes reach zero Installations — so the ownership statement joins a section that already knows how to say "true here, not elsewhere."

**Naming a default without justifying it is the failure OF-55 itself describes.** `cto` was already the silent fallback for framework-layer findings before this decision; what changes is that the fallback is now a stated choice with a reason, not an absence nobody selected.

## Alternatives Considered

**Add a "Findings" section to all twelve agent files.** Rejected on the same grounds item 39 already established: a rule copied into every file that might need it is the shape that drifts, and eleven of the twelve files would be stating a rule none of their own content otherwise concerns.

**Invent a thirteenth "Platform" or "Framework" role.** Rejected. `cto` already owns architecture, engineering direction and technical risk; a new role overlapping it by construction is complexity DECISIONS.md's own Decision Framework asks to justify and this case does not — see `COMPANY_OS.md` → "Simplicity Over Complexity".

**Delete `ceo`, `marketing`, `finance` and `legal` as inert.** Rejected. They are unused because the product has not reached the phase that uses them, which `COMPANY_OS.md` and `PRODUCT/ROADMAP.md` both already state; deleting roles the company's own strategy document says it will need is optimising this round's grep count over the roadmap it is supposed to serve.

## Consequences

**`ENGINEERING/ARCHITECTURE.md` now carries a role-ownership fact, which is new for that document.** Precedent exists (the CI-guards section already states a this-repository-only fact in the same style), but this is the first time the document assigns a *role* rather than describing a *system*.

**Nothing enforces that a newly filed `Open` finding actually carries a `Role:` field.** Same shape as OF-44/§15 generally: the rule is loaded, not mechanically checked. A future round auditing queue rows for the field would be doing the same work `policies/testing.md` → "A Check Is Not Verified Until It Has Been Run" already asks of any new rule the first time it is exercised.

**OF-32 — the chain still stops at capture; nothing refines a routed finding — is untouched by this decision and is item 41 §1's own next step.**

---

# DECISION-036

# An `Open` Finding Is Refined By Age Order, Not By Whichever Round Reopens It

Date:

2026-08-14

Status:

Accepted

Owner:

AI — engineering, closing `PRODUCT/ROADMAP.md` OF-32 (and, as a direct consequence, OF-66 and the remainder of OF-45), inside item 41 §1.

Review Date:

When the Open Findings queue's shape changes structurally — ids stop being assigned in discovery order, or the table starts being reordered — or when the queue is observed large enough that "once every N rounds" stops being a meaningful cadence.

---

## Context

`PRODUCT/OPERATING_MODEL.md` §1 states the chain as `DISCOVERY → ANALYZE → CLASSIFY → REFINE → PLAN → ROADMAP`. What DECISION-025, DECISION-029 and DECISION-035 built is `DISCOVERY → a row with a disposition, dimensioned, and routed to an owning role` — real progress, and none of it is REFINE. An `Open` row satisfies every rule written so far on the day it is created and again on every day after, forever, with no mechanism that revisits it. `PRODUCT/ROADMAP.md` OF-32 names this directly: "the chain stops at capture," measured at 17 of 30 rows `Open` when written and higher since. OF-32 was itself blocked on OF-31 ("depends on OF-31 for who does the refining"), which DECISION-035 closed.

## Decision

**Every `/next` round refines exactly one `Open` row, as a second action alongside the round's own chosen objective: the lowest-id row still carrying `Open`.**

Ids in this queue are assigned in discovery order (DECISION-025 / `policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected") and the table is never reordered — closed rows compact in place and archive, never resequence. So the lowest surviving `Open` id is, by construction, the row that has gone longest since it was last written to. No new field, counter or timestamp is needed to know which row is oldest: the ordering already exists and costs nothing to read.

**Refining means the row's own text changes.** One of: its Pain/Frequency/Cost/Role are re-checked against the current tree and rewritten where stale (the backfill OF-66 already asked for, on the six rows DECISION-029 predates); the row is promoted to a scheduled item; or it is re-dispositioned — `Deferred`, `Rejected`, or `Fixed`, if the round discovers the finding no longer holds. A round that reads the row and writes it back unchanged has not refined it.

**The rule lives in `.kenovis/AI/policies/documentation.md`** (loaded every task) **and is pointed to from `commands/next.md` Step 3** (where the queue is already read), matching the split DECISION-035 already drew between a framework-wide rule and the command that exercises it.

**No CI guard.** DECISION-026 and OF-21 forbid an eleventh guard while item 37 is still dispositioning the first ten; this rule has no mechanical enforcement beyond being loaded on every task, the same enforcement every other rule in this section already has.

## Reasoning

**The queue's own id sequence is a free age signal.** An explicit "rounds open" counter was the first shape considered and was rejected for needing a write path nothing else in this framework has: every row would need updating on every round regardless of whether that round touched it, which is more bookkeeping than the thing it tracks. Id order gives the same ordering for zero marginal state, because it already exists for an unrelated reason (unique identification) and happens to be monotonic in the one property this decision needs.

**One row, not the whole queue.** Refining every `Open` row every round was rejected as unbounded cost that grows with the queue itself — the opposite of what OF-32 called for. One row per round means the full queue sweeps once every *(count of `Open` rows)* rounds — cheap and self-limiting, since a queue that stays large simply takes longer to fully sweep rather than costing more per round.

**Refinement rides on Step 3, not a new command surface.** Step 3 already opens `PRODUCT/ROADMAP.md` → "Open Findings" to rank the round's own objective; touching one more row in that same read costs near nothing, versus a dedicated `/next --refine` mode, which would need its own trigger and its own reason a session would choose to run it instead of a normal round.

## Alternatives Considered

**A persisted "rounds open" counter per row.** Rejected — see Reasoning. New state with a write path every round must maintain, to reconstruct an ordering the ids already provide for free.

**A CI guard flagging `Open` rows older than N rounds.** Rejected outright by DECISION-026 and OF-21 until item 37 finishes dispositioning the existing ten guards; adding an eleventh mid-flight is the exact failure item 37 exists to stop.

**A dedicated periodic `/next --refine` mode.** Rejected. A second command surface for one clause, when Step 3 already runs every round and already reads the exact file this needs.

**Refine every `Open` row every round.** Rejected as unbounded per-round cost — see Reasoning.

## Consequences

**The queue sweeps fully once every N rounds, where N is the current `Open` count — not on a fixed schedule.** A queue that grows faster than it is swept still accumulates staleness, just more slowly than before this decision; this bounds the cost per round, not the total staleness in the queue, which is OF-62's own remaining problem and is untouched by this one.

**The behavioural half is unvalidated by the round that wrote it, per OF-30 and Learning-031.** This round performs the first refinement itself — on OF-02, with OF-66's other five rows backfilled in the same pass — as the one data point available to its own author; independent evidence is the next `/next`, in a fresh thread, doing it unprompted.

**OF-66 closes as a direct consequence, not a separate round:** refining OF-02 demonstrates the mechanism, and backfilling the five other rows OF-66 already named costs nothing extra once the queue is open for that purpose — OF-66's own text invited exactly this ("take it with any round already editing the queue").

---

# DECISION-037

# "Impossible" Is Not Architecturally Achievable For The Core Invariant; "Difficult" Is Partial, And Its Two Gaps Stay Separately Tracked

Date:

2026-08-14

Status:

Accepted

Owner:

AI — engineering, closing `PRODUCT/ROADMAP.md` OF-44, inside item 41 §15.

Review Date:

If DECISION-010 (tool-agnosticism) or DECISION-013 (no backend, no runtime) is ever revisited — either would change what kind of enforcement this framework could stand at all.

---

## Context

`PRODUCT/OPERATING_MODEL.md` §15: *"The system must be designed so that violating this invariant is difficult or impossible."* Measured against the tree, repeatedly, across item 41 step 4's own progress: every mechanism in this framework — policies, commands, workflows, the routing table, the required-line pattern DECISION-033 shipped — is an instruction an agent may follow. The one class of mechanical enforcement, the ten CI guards, reaches zero Installations (item 37) and is bypassable in this repository by the same merge command used on every round since `0.6.0` (`OF-19`), including the round that wrote this decision. `PRODUCT/ROADMAP.md` OF-44 names this directly and item 41 itself flagged it as the hardest of its five gaps, anticipating the honest output might be "not fully achievable, recorded as such" rather than a mechanism.

## Decision

**"Impossible" is not achievable under this framework's own architecture, and this decision settles that rather than leaving it an open question.** A markdown AI-OS that must stay tool-agnostic (DECISION-010) and ship no backend or runtime (DECISION-013) has no process of its own to refuse an action — there is no interpreter, no server, no hook that runs independent of whichever coding agent a human pointed at the repository. "Impossible" requires exactly that kind of standing process, and building one would mean reversing DECISION-010 or DECISION-013, which this decision does not do and is not scoped to.

**"Difficult" is partially achieved today, and it has exactly two gaps, both already tracked as their own findings rather than restated here.** The mechanism: a required line whose absence is exact (`Findings this item did not fix:`, `Operating model section served:`, `Next:` — DECISION-033) is checkable in a way "did the agent follow the spirit of the rule" is not — an omission is a fact about the text, not a judgement call. That mechanism has two independent limits:

- **Reach.** The ten CI guards that check it run in this repository's own CI and nowhere else — no customer Installation receives them (item 37, still mid-flight, dispositioning them one at a time).
- **Bypass.** Even here, the standard merge (`gh pr merge --rebase --admin`) skips required status checks, not only the required review — so a guard failing does not block a merge in this repository, it only makes the failure visible to whoever is looking (`OF-19`).

Neither gap is closed by this decision. Both stay `Open`, ranked on their own terms, tracked at their own ids.

**This decision is itself the correct instance of "difficult or impossible" — recorded, not enforced.** A decision log is read by the next session that asks the same question; it is not a runtime check. That is a real, weaker form of durability than a guard, and it is what this framework has for a claim about itself, per DECISION-009.

## Reasoning

**Recording is not settling for less than the invariant asks — it is answering the question the invariant's own wording leaves open.** "Difficult or impossible" is a disjunction, and treating it as requiring the harder disjunct by default is a reading nobody chose, it is what happens when nobody reads it closely. Once "impossible" is ruled out on architectural grounds, "difficult" is the operative bar, and the honest measure of "difficult" is naming exactly what would need to hold for a violation to go unnoticed — which is what the two gaps above already do.

**An `Absent` row is not the same defect with or without this decision.** `PRODUCT/OPERATING_MODEL.md`'s own Conformance Table defines `Absent` as "the rule does not hold, and there is either a finding carrying it or a recorded decision to leave it so. An `Absent` row with neither is the failure this table exists to make visible." §15's row already had findings (`OF-19`, `OF-21`, `item 37`); what it did not have was a decision stating that the gap is a considered position rather than an oversight nobody got to. This decision is that half. The row's grade does not move — `PRODUCT/OPERATING_MODEL.md` § "A row does not move to `Present` because a rule was written" applies here with the same force it applied to DECISION-035 — but the row's own honesty does.

**Deciding this now, rather than waiting for item 37 or OF-19 to close, keeps the two questions separable.** Item 37 is a placement question (does each of ten guards have a Framework-layer home). OF-19 is a repository-settings question only the founder can answer (keep a review requirement that only `--admin` satisfies, or drop it). Neither answer changes whether "impossible" is achievable — that answer comes from DECISION-010 and DECISION-013, both already settled. Waiting on either would tie a static architectural fact to two moving, unrelated pieces of work.

## Alternatives Considered

**Wait for item 37 to finish, then re-measure §15.** Rejected. Item 37 closing every guard's Framework-layer home would still leave the guards local-only in a customer Installation with no CI of its own — item 37 is about *where the rule for a guard lives*, not about a guard reaching every Installation, which DECISION-013's no-backend constraint already forecloses.

**Propose a lightweight runtime (a hook, a bundled script customers run) to give the invariant a real enforcement point.** Rejected outright by DECISION-010 (tool-agnosticism — a hook is one tool's configuration, the exact reasoning that already rejected `OF-20`) and DECISION-013 (no backend, no shipped runtime). Revisiting either is a decision bigger than this one and is not this decision's scope.

**Leave §15 `Open` in the queue until OF-19 resolves, on the theory that the row cannot be honestly assessed before the bypass gap closes.** Rejected. The bypass gap is real and is exactly what this decision names as one of the two tracked limits — closing OF-19 would narrow it, not remove the need for this decision, since "impossible" stays unachievable either way.

## Consequences

**`PRODUCT/OPERATING_MODEL.md` §15's row states a decided position for the first time, with its grade unchanged.** A future round reading the row gets a citation to open (this decision) instead of only a measurement to re-derive.

**OF-19 and item 37 keep their own standing and are not folded into this decision or closed by it.** OF-19 is still a founder call; item 37 is still mid-flight, three guards from done as of this decision.

**A future architectural change to DECISION-010 or DECISION-013 would reopen this decision's premise, not merely its measurement** — which is why the Review Date names those two decisions specifically rather than a re-measurement cadence.

---

# DECISION-038

# "Continuous" Observation Is Not Architecturally Achievable; A Bounded Step Inside The Command That Already Runs Is

Date:

2026-08-15

Status:

Accepted

Owner:

AI — engineering, closing `PRODUCT/ROADMAP.md` OF-33, inside item 41 §1/§16.

Review Date:

If DECISION-010 (tool-agnosticism) or DECISION-013 (no backend, no runtime) is ever revisited — either would change what kind of scheduler this framework could stand at all.

---

## Context

`PRODUCT/OPERATING_MODEL.md` §1: *"It observes the product continuously."* §16's loop diagram names `Observe` as its first node. Measured against the tree repeatedly across item 41 step 4's own progress, most recently in the round that closed OF-32 (Refine): all **11** commands in `.kenovis/AI/commands/` are keyed to a human "Execute when…" intention, and the one command built specifically as a standalone audit pass — `/framework-review` — has never been run once; `PRODUCT/ROADMAP.md` OF-06 records seven rounds (items 6, 8, 10, 12, 14, 16, 18) that each "swept the same surface" instead of invoking it. Between sessions, nothing looks at the product at all; what exists is faithful recording of whatever a human happened to trigger, which `PRODUCT/ROADMAP.md` OF-33 names as a different and weaker guarantee than "observes continuously."

Item 41 step 4's own sequencing flagged this as the harder kind of gap before it was scoped: *"a cadence must not become an eleventh guard (DECISION-026) and must not be tool-specific (DECISION-010, the reason OF-20 was rejected) — expect a design question, not a one-clause fix."*

## Decision

**"Continuous" is not achievable under this framework's own architecture, for the same two reasons DECISION-037 already settled for §15's "impossible."** A markdown AI-OS that must stay tool-agnostic (DECISION-010) and ship no backend or runtime (DECISION-013) has no process of its own that runs between sessions — there is no scheduler, no daemon, no hook independent of whichever coding agent a human pointed at the repository at a given moment. "Continuous" requires exactly that standing process. Building one means reversing DECISION-010 or DECISION-013, which this decision does not do and is not scoped to.

**The achievable form is an `Observe` step inside the command that already runs on this product's actual cadence, not a new standalone command.** `PRODUCT/OPERATING_MODEL.md` Addendum A §1 establishes that cadence: one thread executes one `/next`, back to back, until the roadmap empties. That is the nearest thing this architecture has to "continuous" — not wall-clock time, but every unit of work the product performs. `/next` gains a required, bounded, unconditional scan (`.kenovis/AI/commands/next.md` Step 3 → "Observe") that runs regardless of what the round's own chosen objective is, so a round notices things nobody pointed it at rather than only what its own item happens to touch.

**Bounded, not a full audit, and the checklist is fixed rather than open-ended.** Two reasons, both already evidenced in this repository rather than hypothetical:

- `PRODUCT/ROADMAP.md` item 40/OF-34 already names the risk of a round spending more effort on the AI-OS's own bookkeeping than on the product it is supposed to advance — eighteen of thirty queue rows at the time item 40 was written were the framework auditing itself. An unbounded "look for anything" instruction added on top of that risk makes it worse, not better.
- An instruction to "scan for problems" with no named population is exactly the shape `.kenovis/AI/policies/testing.md` → "A Check Is Not Verified Until It Has Been Run" already rejects for a mechanical check (`AI/memory/learnings.md` Learning-021/Learning-022: enumerate the population, don't pattern-match the defects already found). The same discipline applies to a recurring instruction given to an agent: a bounded, named, fixed list is followable and auditable across rounds; "notice things" is not — it degrades to whatever a round happens to have attention left for; identical to what happened to `/framework-review`, except the failure inverts, since here it is loaded and would still not be followed.

The first instance of the checklist is document-weight drift: every round already checks the size of a governed document it happens to write to (`.kenovis/AI/policies/documentation.md` → "Document Lifecycle"), reactively. `PRODUCT/ROADMAP.md` OF-23/OF-51/OF-62 are three rounds of the same undetected drift on `PRODUCT/ROADMAP.md` alone, each one found because a human or an `/analyze` run happened to look, never because a round was required to. The `Observe` step makes that check unconditional and proactive — every governed document, every round, independent of what the round's own item touches.

## Reasoning

**This is DECISION-037's own shape, applied to a sibling gap in the same operating-model paragraph, and reusing rather than re-deriving its architectural conclusion.** §15 asked whether a violation could be made "difficult or impossible"; §1/§16 ask whether observation could be made "continuous." Both disjunctions have an unreachable half for the identical structural reason — no standing process — and both have a reachable half that this framework's markdown-and-cadence mechanism can actually carry. Naming that once, in DECISION-037, and citing it here is cheaper and more honest than re-arguing DECISION-010/DECISION-013 a second time.

**A new standalone command was the first design considered and is rejected on this repository's own evidence, not in the abstract.** `/framework-review` already is that command — audits the framework's own surface, exists, is documented, and has a zero-invocations record across seven rounds that could have run it. A second command with the same shape (call it `/observe`) would carry the identical unforced-invocation problem: nothing in this architecture can make a human, or a fresh thread with no memory of this decision, choose to run it. The one thing this architecture can make happen reliably is a step inside a command a thread is already going to run for another reason — which is exactly how `Refine` (DECISION-036, closing OF-32) was made to hold, one round earlier, on the same document.

**Bounded to document-weight drift first, not to the full breadth §1 names ("problems, risks, inconsistencies, technical debt, missing work, and opportunities").** This decision does not claim the narrower scope satisfies the wider one. It claims the narrower scope is real, cheap, evidenced by three prior rounds hitting the same undetected class, and buildable today without inventing an enumeration this decision has no basis for. Naming the gap this leaves is itself part of "difficult, not impossible" done honestly, the same discipline DECISION-037 §2935 already applied to §15's own row.

## Alternatives Considered

**A new standalone `/observe` command, run at the start of a thread alongside `/bootstrap`.** Rejected. `/framework-review` is this exact shape already, unrun in seven opportunities (OF-06). Adding a second uninvoked command multiplies the failure rather than fixing it.

**A Claude Code hook, cron job, or other scheduler-backed process running between sessions.** Rejected outright by DECISION-010 (tool-agnosticism — the same reasoning that rejected OF-20's hook proposal) and DECISION-013 (no backend, no shipped runtime). Revisiting either is a decision bigger than this one.

**An eleventh CI guard scanning the tree for drift on every push.** Rejected by DECISION-026 (a guard in this repository's own CI reaches zero customer Installations — `.github/` is not in the bundle) and by OF-21, which already forbids adding an eleventh guard before item 37 finishes dispositioning the existing ten.

**An unbounded instruction — "look for anything the round wasn't pointed at" — with no fixed checklist.** Rejected. Unenumerable, for the same reason `policies/testing.md` rejects a mechanical check with no named population (Learning-021/Learning-022): it cannot be audited across rounds, and it is the shape that already produced `/framework-review`'s non-invocation, transplanted into a step instead of a command.

## Consequences

**`.kenovis/AI/commands/next.md` Step 3 gains a required `Observe` subsection**, alongside the existing `Refine The Oldest Open Row` — both bounded, low-cost, second actions a round performs beside its own chosen objective, following the pattern DECISION-036 already established for Refine.

**`PRODUCT/OPERATING_MODEL.md` §1 and §16 stay `Partial`, not `Present`, with the reason changed rather than the grade.** Observe now has a mechanism, on its first instance, covering one narrow class (document-weight drift) of the many §1 names. The row's own rule — "a row does not move to `Present` because a rule was written" — applies here exactly as it applied to Refine's own row a round earlier.

**The remaining breadth of §1 — inconsistencies, undocumented technical debt, missing work, opportunities beyond document weight — stays a named, open gap** (`PRODUCT/ROADMAP.md` OF-87), not folded into this decision as if closed by it.

**A future architectural change to DECISION-010 or DECISION-013 would reopen this decision's premise, not merely its measurement** — which is why the Review Date names those two decisions specifically, matching DECISION-037's own convention.

---

# Final Principle

A decision without context is a preference.

A documented decision becomes company knowledge.
