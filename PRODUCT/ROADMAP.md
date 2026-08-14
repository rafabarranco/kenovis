<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

ROADMAP.md

Product Roadmap

Version: 1.65
---
Purpose

This document defines the strategic product evolution of the platform.

It establishes:

- What we build.
- When we build it.
- Why we build it.
- What we deliberately avoid.

The roadmap exists to protect product focus.

Closed items live in `PRODUCT/ROADMAP-ARCHIVE.md`, verbatim — one line stays here per closed item, with a pointer. Finished work was costing the same to load as scheduled work, on every session's context, forever. The archive is read on demand; this document is the one that is read at session start.

Findings that earlier rounds did not fix live in "Open Findings" below, not in the narrative of the item that found them. `/next` reads that queue alongside the scheduled items.
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

1. DONE (2026-08-05) — Architecture decision: Framework layer physical packaging (visible/invisible footprint). → `PRODUCT/ROADMAP-ARCHIVE.md`
2. DONE (2026-08-05) — Fix /adopt-project's install-direction assumption. → `PRODUCT/ROADMAP-ARCHIVE.md`
3. DONE (2026-08-06) — Build the CLI installer/sync tool. → `PRODUCT/ROADMAP-ARCHIVE.md`
4. DONE (2026-08-06) — Architecture decision and CLI implementation, both shipped via /next. (added 2026-08-06, from /analyze on install-flow friction, founder-flagged highest priority — ahead of Phase 1) — Auto-trigger `/init-project` / `/adopt-project` without a manual slash-command step, plus a new `kenovis add` command, cross-detection errors, and a bare `kenovis` autodetect dispatch. → `PRODUCT/ROADMAP-ARCHIVE.md`
5. DONE (2026-08-06, via /next) — Guard Product-layer files against silent overwrite during /init-project and /adopt-project, mirroring the ExistingClaudeMdError pattern. → `PRODUCT/ROADMAP-ARCHIVE.md`
6. DONE (2026-08-06, via /next) — added 2026-08-06, from /analyze on the v0.1.0/v0.2.0 → v0.3.0 upgrade path, founder-flagged maximum priority — ahead of any other Phase 0/1 item. → `PRODUCT/ROADMAP-ARCHIVE.md`
7. DONE (2026-08-06, via /next) — close the Learning-007 follow-up: the CLAUDE.md guard's append-content blind spot. → `PRODUCT/ROADMAP-ARCHIVE.md`
8. DONE (2026-08-07, via /next) — DECISION-017's own deferred Phase 2: this repository migrates its own Framework layer (`AI/agents/`, `AI/workflows/`, `AI/policies/`, `AI/commands/`, `AI/templates/`, `AI/SYSTEM.md`) into `.kenovis/AI/`, the same packaging every customer Installation already gets. → `PRODUCT/ROADMAP-ARCHIVE.md`

Phase 0 is closed. All eight "Immediate Priority" items are DONE, and Phase 0's own Success Criteria were satisfied by the Real External Validation recorded under Phase 1 below. Work continues in the Phase 1 priority block that follows.
---
Phase 1 — Immediate Priority (added 2026-08-07, from /next after Phase 0 closed)

Two items, in this order. Neither is blocked. Ordering matters: item 1 lands a real customer-facing bug fix, item 2 packages it — doing them in this order means one release carries both instead of cutting two.

Items 3-17 continued that alternation of work and release. Items 18-23 are a second priority block, added 2026-08-12 and founder-flagged maximum priority — see its own header below.

1. DONE (2026-08-07, via /next) — close Learning-010: `sync` disarms DECISION-018's first-session auto-trigger. → `PRODUCT/ROADMAP-ARCHIVE.md`
2. DONE (2026-08-07, via /next) — promote `development` → `preproduction` → `main` and cut the next release. → `PRODUCT/ROADMAP-ARCHIVE.md`
3. DONE (2026-08-07, via /next) — an Installation records which Framework Release it tracks. → `PRODUCT/ROADMAP-ARCHIVE.md`
4. DONE (2026-08-08, via /next) — an Installation receives its Product layer from Framework templates. → `PRODUCT/ROADMAP-ARCHIVE.md`
5. DONE (2026-08-08, via /next) — promote `development` → `preproduction` → `main` and publish the release carrying items 3 and 4. → `PRODUCT/ROADMAP-ARCHIVE.md`
6. DONE (2026-08-09, via /next) — execute `/init-project` end to end against a real published Installation, and fix what breaks. → `PRODUCT/ROADMAP-ARCHIVE.md`
7. DONE (2026-08-09, via /next) — promote `development` → `preproduction` → `main` and publish the release carrying item 6. → `PRODUCT/ROADMAP-ARCHIVE.md`
8. DONE (2026-08-09, via /next) — execute `/adopt-project` end to end against a real published Installation, and fix what breaks. → `PRODUCT/ROADMAP-ARCHIVE.md`
9. DONE (2026-08-09, via /next) — promote `development` → `preproduction` → `main` and publish the release carrying item 8. → `PRODUCT/ROADMAP-ARCHIVE.md`
10. DONE (2026-08-09, via /next) — the `PROJECT-SPECIFIC` marker states layer, not state; and the `CLAUDE.md` stub enumerates the whole Product layer. → `PRODUCT/ROADMAP-ARCHIVE.md`
11. DONE (2026-08-09, via /next) — promote `development` → `preproduction` → `main` and publish the release carrying item 10. → `PRODUCT/ROADMAP-ARCHIVE.md`
12. DONE (2026-08-09, via /next) — execute `/feature` end to end from a real published Installation, and fix what breaks. → `PRODUCT/ROADMAP-ARCHIVE.md`
13. DONE (2026-08-09, via /next) — promote `development` → `preproduction` → `main` and publish the release carrying item 12. → `PRODUCT/ROADMAP-ARCHIVE.md`
14. DONE (2026-08-10, via /next) — execute `/bug` end to end against a real published Installation, and fix what breaks. → `PRODUCT/ROADMAP-ARCHIVE.md`
15. DONE (2026-08-10, via /next) — promote `development` → `preproduction` → `main` and publish the release carrying item 14. → `PRODUCT/ROADMAP-ARCHIVE.md`
16. DONE (2026-08-10, via /next) — execute `/review` end to end against a real published Installation, and fix what breaks. → `PRODUCT/ROADMAP-ARCHIVE.md`
17. DONE (2026-08-10, via /next) — promote `development` → `preproduction` → `main` and publish the release carrying item 16. → `PRODUCT/ROADMAP-ARCHIVE.md`

---
Phase 1 — Immediate Priority, second block (added 2026-08-12, from /analyze on framework context scalability, founder-flagged maximum priority — ahead of any other Phase 1/2/3 item)

Twenty-one items, items 18-38 — sixteen as originally written, plus items 34-38 added as the block ran. Item 25 is rejected, superseded by item 37. In the order written, except where an item states its own ordering constraint, and three do. **Item 26 comes first** (it unblocks 27), **item 27 next** (it is the root cause behind this block needing to be asked for at all), and **item 29 gates item 19**, because archiving before triage converts a visible backlog into an invisible one. Item 25 goes with or after item 21, never before. Founder flagged this block maximum priority on 2026-08-12: it is executed before `/architect` and `/release` end-to-end runs, before the `sync`-names-removed-paths backlog finding, before the npm-registry version check, and before the paid-tier ADR — all of which stay scheduled behind it.

The R-tags (R1-R6) are the recommendation labels from the 2026-08-12 `/analyze` run that produced this block, kept so the items stay traceable to their analysis. Execution order is not R-tag order: R5 is cheap and independent so it lands with the other Do-Now items, and R4 precedes R3 because a lifecycle rule that does not exist cannot govern the restructuring that R3 performs.

Items 24-25 and the two scope additions inside items 19 and 21 come from a second `/analyze` run the same day, on the three open risks item 18 closed with rather than closed. Their tags are RA1-RA4, kept distinct from R1-R6 so the two analyses stay separable.

Items 26-30 come from a third `/analyze` run the same day, tagged RB1-RB5, on the founder's observation that the AI-OS detects gaps and then leaves them to die in prose: *"lo que pasa ahora es simple, está detectándolo pero no está planificándolo, por lo que siempre se queda ahí, muerto, sin resolver."* The evidence held — 13 findings parked in this document's prose and 24 `Future action:` entries in `learnings.md`, of which 5 name the roadmap, with the oldest open one untouched since 2026-08-09. These five items are the highest-leverage in the block: they are why the other eight needed a human to notice them. The `Open Findings` queue that follows this block is their first output.

Measured finding this block exists to close, from git history over 2026-07-30 → 2026-08-10 (11 days, 58 commits): `DECISIONS.md` 9.8 KB → 119.9 KB, `PRODUCT/ROADMAP.md` 5.0 KB → 124.9 KB, `AI/memory/learnings.md` 4.1 KB → 65.2 KB, `CHANGELOG.md` 1.5 KB → 54.3 KB. Combined ~31 KB/day, append-only, with no archival, rotation or size rule anywhere in the framework. `CLAUDE.md` → "Session Initialization Protocol" mandates an unconditional full read of `COMPANY_OS.md` + `DECISIONS.md` + `AI/SYSTEM.md` — ~137 KB (~34k tokens) before any work starts — and a full `/bootstrap` reaches ~357 KB (~89k tokens). The growth rate is from an intense bootstrap phase and will slow; the direction does not depend on the rate. At one quarter of it, `DECISIONS.md` still passes 200 KB of mandatory per-session reading inside 90 days.

Why it outranks everything else on this document's own priority formula: it is not an infrastructure problem — Kenovis operates no backend to scale, per DECISION-013 — it is the documentation-as-memory discipline of DECISION-009 and DECISION-011 compounding with no retrieval or lifecycle counterpart. COMPANY_OS.md → Competitive Advantages names that same discipline as the customer's accumulated switching cost. The mechanism that creates the moat is the mechanism that hits the wall, so the failure lands inside the value proposition rather than beside it. And because Kenovis holds zero central infrastructure, it can neither observe nor remediate a customer's own accumulated Product layer — only ship framework changes through `sync`. Every Installation carries this unaided.

Dogfooding caveat, stated because it makes this repository unrepresentative: this repo has `graphify-out/` and a `CLAUDE.md` rule that routes questions through a knowledge graph before reading raw files. `bootstrap.md` Steps 2-4 honour that. No customer Installation receives any of it — graphify is third-party and not part of Kenovis — so a real Installation is measurably worse off than the evidence gathered here. Item 18's validation must be run against a real published Installation, not against this repository.

Deliberately short entries. Every item below states its problem, its target and its validation, and stops. This document is itself one of the four files the block exists to bound, and the 17 completed items above are the bulk of its 124.9 KB — writing this block in their style would enlarge the very measurement it is trying to reduce.

18. DONE (2026-08-12, via /next) (R1) — the session-initialization protocol reads the decision index, not every decision body. → `PRODUCT/ROADMAP-ARCHIVE.md`
19. DONE (2026-08-12, via /analyze) (R2) — completed roadmap items move to an archive; the active roadmap keeps one line each. → `PRODUCT/ROADMAP-ARCHIVE.md`
20. DONE (2026-08-12, via /next) (R5) — run `AI/memory/learnings.md`'s own Review Process for the first time. → `PRODUCT/ROADMAP-ARCHIVE.md`
21. DONE (2026-08-12, via /analyze) (R4) — `AI/policies/documentation.md` gains document lifecycle rules, enforced in CI. → `PRODUCT/ROADMAP-ARCHIVE.md`

22. SCHEDULED (R3) — `DECISIONS.md` becomes a directory, one file per decision, with the current file as its index.

Problem: granularity of storage does not match granularity of use. A decision is consulted one at a time and stored in a 119.9 KB monolith, so no retrieval — item 18's index included — can load DECISION-024 without the other sixteen being present in the same file.

Target: `DECISIONS/DECISION-NNN-*.md`, with `DECISIONS.md` retained as the index item 18 already reads. This is the item that turns item 18's deferral into a real ceiling.

Highest risk in the block, and the reason it is last: it changes a path that exists inside every customer Installation. `sync` mirror-replaces `.kenovis/` and never touches the Product layer, so shipping new framework files does not migrate anyone — an existing Installation keeps a monolithic `DECISIONS.md` that the new framework instructions no longer describe, which is Learning-022's shape exactly: a document that reads perfectly and is wrong. Migration has to be designed, not assumed. Blast radius to enumerate exactly before starting: the Product-layer templates, `init-project.md`, `adopt-project.md`, `check_artifact_destinations.py`, `check_template_refs.py`, `check_links.py`, `check_markers.py`, and every framework cross-reference of the form "see DECISIONS.md DECISION-0NN".

Requires `/architect` and an ADR before any file is touched. Do not start this item from `/next` without that.

Validated when: the migration is exercised against a real published Installation on the upgrade sequence a customer actually runs — install the previous version, sync forward, confirm the Product layer migrated and nothing outside `.kenovis/` was touched.

23. SCHEDULED (R6) — a native retrieval command in the CLI.

Problem: the dogfooding caveat above. This repository routes context through graphify; no Installation has it. After items 18-22 the framework bounds what is read, but an Installation still has no way to ask its own accumulated context a question.

Target: a `kenovis context "<query>"` — filesystem-only, no network, no backend, inside ENGINEERING/ARCHITECTURE.md's Hard Rules and DECISION-013.

Blocked behind items 18-22 and deliberately not started early. If bounding and lifecycle are enough, this is not needed; building it first would be building a retrieval layer over a corpus that should have been bounded instead. Reassess against measurements from items 18-22, not from the analysis that produced this block.

Explicitly out of scope for this block, and recorded here so it is not proposed again: a hosted backend, a vector database, or any Kenovis-operated service to hold customer context. It contradicts COMPANY_OS.md → Competitive Advantages ("Zero central infrastructure to scale") and → What The Company Will NOT Become, and DECISION-013. This is a data-lifecycle problem, not an infrastructure problem.

24. SCHEDULED (RA1) — validate that an agent opens a decision body instead of paraphrasing the index.

Problem: item 18 closed DONE with its own second validation criterion unmet, and said so rather than claiming it. Nothing checks it. `check_decision_index.py` proves the index is complete; no check can see an agent citing a decision from an index line it never opened, which is the failure the whole read-bound is exposed to. Item 18's fix made the risk cheap to run into: the index is now good enough to sound sufficient.

Second defect in the method item 18 itself proposed, and the reason this is an item rather than a note: "run `/architect` or `/release` end-to-end from an Installation with a real log" does not work as written. An Installation authors `DECISIONS.md` from the template, so its log is **empty** — there is no decision to cite and nothing to paraphrase. The fixture has to be seeded before the run exercises anything.

Target: a brownfield fixture Installation whose `DECISIONS.md` carries a populated log (≥10 decisions with real bodies, index lines that summarise without answering), then one post-setup workflow — `/architect` or `/release`, both still unrun end to end — executed against it. Observe whether the run opens the bodies it cites. Record what it did, not what it should have done.

Run it in a session that did not author the instruction. The `/next` round that wrote the protocol knows the decision bodies already, so its own behaviour is not evidence.

Dependency: none. Independent of items 19-23, and it needs no release first — the instruction under test is already on `development`.

Validated when: the run's citations are checked against the bodies it actually opened, and the result is written down either way. A negative result is the useful one — it means the index needs the body's shape, not more summary.

25. REJECTED (2026-08-12, founder) — a customer Installation can run a check, not just read a rule. Superseded by DECISION-026 and item 37; the original text is kept verbatim and must not be executed. → `PRODUCT/ROADMAP-ARCHIVE.md`

26. DONE (2026-08-12, via /analyze) (RB2) — `/analyze` is forbidden from doing what its own Step 9 requires. → `PRODUCT/ROADMAP-ARCHIVE.md`
27. DONE (2026-08-12, via /analyze) (RB1) — a finding that is not fixed is scheduled or rejected. Never just mentioned. → `PRODUCT/ROADMAP-ARCHIVE.md`
28. DONE (2026-08-12, via /analyze) (RB3) — the roadmap carries a findings queue, not only phase narrative. → `PRODUCT/ROADMAP-ARCHIVE.md`
29. DONE (2026-08-12, via /analyze) (RB5) — triage the parked findings and the learnings' future actions, before item 19 archives them. → `PRODUCT/ROADMAP-ARCHIVE.md`
30. DONE (2026-08-12, via /analyze) (RB4) — the one part of this that a machine can check. → `PRODUCT/ROADMAP-ARCHIVE.md`

31. DONE (2026-08-12, via /analyze) — promote `development` → `preproduction` → `main` and publish the release carrying items 18, 19, 21 and 26-30. → `PRODUCT/ROADMAP-ARCHIVE.md`

32. SCHEDULED — the three decisions only the founder can make, and the gap in item 27's own rule that let them sit.

Problem: OF-10 and OF-11 carry the disposition `Open — founder call`, which is honest and insufficient. A finding whose executor is not `/next` does not move because it scores well on a priority formula; it moves when someone names what has to be decided and what input the decision needs. OF-10 had been written in two places since this block was created and produced nothing — the pattern this block exists to end, surviving inside the rule that was supposed to end it.

Fixed already, in the round that scheduled this item: `.kenovis/AI/policies/documentation.md` (2.6 → 2.7) now requires an `Open` finding the AI cannot execute to name **who executes it and what input they need to decide**. `Open` was a valid disposition and the easiest place to hide. Found by the founder asking whether the three founder-call findings were actually planned — they were recorded, which is not the same thing. Item 27's own entry is archived and stays as written; this is where the correction lives.

Target: each decision reaches its own resolution, with the input stated so the founder is not asked to invent it.

- **OF-10 — the per-session context budget as a first-class constraint.** The cheapest of the three and the only one needing no external data: a `DECISIONS.md` entry recording that mandatory per-session reading is bounded by design, and an `AI/memory/learnings.md` entry that documentation-as-memory without a retrieval and lifecycle counterpart is accumulation rather than memory. Input available: everything items 18, 19 and 21 measured — 374.3 KB → 133.9 KB on the bootstrap path, the 60 KB threshold, the four governed documents. The founder decides the position; the entry is drafted against those measurements, not invented.
- **OF-11 — the MVP usage target.** Needs a number only the founder can set, and the input that shapes it is a constraint rather than data: DECISION-013 means no telemetry and no backend, so the target has to be something countable by hand (installations known to Kenovis, teams that report completing `/init-project`), not a metric a dashboard produces. Until it exists, `1.0.0` has no criterion and every release re-argues the same rejection — six so far.
- **OF-12 moves out of this item entirely.** It was mistagged as a founder call. It is work: see item 33.

Validated when: `DECISIONS.md` carries the context-budget decision with its index line, `learnings.md` carries the accumulation entry, `PRODUCT/ROADMAP.md` → MVP Success Metrics carries a real number, and OF-10 and OF-11 are struck from the queue rather than left `Open` beside their own resolution.

33. SCHEDULED — re-validate with a real external team, against the published package.

Problem, and the correction that produced this item: OF-12 was tagged `Open — founder call`. It is not a decision, it is work, and tagging work as a decision is a way of parking it. One external team has validated this product, on 2026-08-06, against `kenovis@0.3.0` — eight releases ago, before the `.kenovis/` packaging matured, before the Product-layer templates existed, and before the Decision Index, the findings queue and the lifecycle rules shipped today. `AUTOMATIONS/user-feedback.md` describes a feedback loop that has never run once.

Why it outranks most of what is left: five findings in the queue are `Deferred` on unvalidated Pain — OF-06, OF-07, OF-08 among them — and every one traces to this single gap. It is the cheapest thing that unblocks several at once. The North Star is defined in terms of Installations running a workflow, which is a number this product currently cannot report at all.

Target: at least one external team installs `kenovis@0.13.0` on a real repository, completes `/init-project` or `/adopt-project`, and runs one workflow end to end. Record what breaks in the queue, with dispositions. Run `AUTOMATIONS/user-feedback.md` as written for the first time — if it does not survive contact, that is this item's finding.

Not a smoke test. This repository has run those all day, and they only prove the artifact matches its own intent.

Validated when: a real external team's run is recorded with its findings dispositioned, and `AUTOMATIONS/user-feedback.md` either worked or was corrected.

34. DONE (2026-08-12, via /next) — promote `development` → `preproduction` → `main` and publish the release carrying item 20 and the `Open`-finding-executor fix (`kenovis@0.14.0`). → `PRODUCT/ROADMAP-ARCHIVE.md`

35. DONE (2026-08-12, via /next) — close OF-13: `CHANGELOG.md` archives its own released sections. → `PRODUCT/ROADMAP-ARCHIVE.md`

36. DONE (2026-08-12, via /next) — close OF-17: an omission becomes a missing line, not a silence. → `PRODUCT/ROADMAP-ARCHIVE.md`

37. SCHEDULED (founder-flagged maximum priority, 2026-08-12) — every rule this repository enforces mechanically gets its Framework-layer home, or is recorded as having none.

Problem, stated as the founder stated it: work has been landing in this repository's infrastructure instead of in the product, and in this repository those are not the same place. `ls .github/scripts/check_*.py | wc -l` → **9**. Guards a customer Installation runs: **0**. `.github/` is not in the bundle (verified in item 17), so every guard added since item 15 improved this repository and no customer. Four consecutive rounds recorded that gap as a caveat while widening it — including the round that quoted item 25's own "the margin grows every round" line and then added the ninth guard.

DECISION-026 settles where a rule goes: `.kenovis/AI/` — the policies, commands, workflows, agents and templates the AI loads to do the work, delivered by `sync`, in force on the next task with nothing to invoke. `kenovis check` is rejected; the CLI's job stays delivery.

Target: for each of the nine guards, its rule has a stated Framework-layer home, or an explicit record that it has none and why. Not a mechanical port — most of what these scripts guard is framework content a customer never edits, and that is a finding per guard, not an assumption to carry.

The nine, to be worked one at a time rather than in a sweep: `check_links`, `check_markers`, `check_changelog`, `check_template_refs`, `check_artifact_destinations`, `check_decision_index`, `check_future_actions`, `check_document_size`, `check_learning_promotions`, `check_item_findings` — read off the tree on 2026-08-12, which is **ten**, because `check_item_findings.py` landed in item 36 the same day this item was written. The count in the previous sentence is left wrong on purpose and corrected here: it is the same drift Learning-023 records, produced inside the round that was complaining about it.

Ordering constraint: the guards whose rule already has a Framework-layer half go first, because they are cheapest and they establish the pattern — `check_item_findings` (rule already in `policies/documentation.md` 3.0, `commands/next.md` 2.4 and the roadmap template 1.5) and `check_future_actions` (rule already in the learnings template). The two with no obvious home, `check_links` and `check_changelog`, go last and may well end as "no Framework-layer form", which is a valid outcome to record.

The test each one has to pass, from DECISION-026: **does this change reach a customer's next task without anyone doing anything?** A CI script fails it. A CLI subcommand fails it. A rule in a policy the agents already load passes it.

Validated when: each of the ten has a recorded disposition — Framework-layer home named, or no-form recorded with the reason — and no round can add a guard again without stating its Framework-layer half.

Progress — round 1 (2026-08-13, via /next): the mechanism, plus the two guards the ordering constraint puts first.

Where a disposition lives, decided here rather than assumed: **the guard's own module docstring**, on a `Framework-layer home:` line. A separate register — a table in `ENGINEERING/`, or in this item — would be a second copy of a fact that changes whenever a guard changes, and it would drift from the scripts, which is Learning-023's shape. `ENGINEERING/ARCHITECTURE.md` (1.5 → 1.6) → "CI Guards Are A Local Net, And Each One Names Its Framework-Layer Home" states the convention and points at the scripts; it deliberately does not restate the ten dispositions.

The rule itself went to the Framework layer, which is the item's whole point: `.kenovis/AI/policies/testing.md` (2.2 → 2.3) → "A Guard Belongs Where The Work Is Loaded". Agents load it per task and `sync` delivers it, so it passes DECISION-026's own test — a table in `.github/` would not, in the round that shipped that test.

Dispositioned, each verified against the files it names rather than off this item's text:

- `check_item_findings` → `policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected"; `commands/next.md` Step 15; `templates/product-layer/PRODUCT/ROADMAP.md` → "Open Findings".
- `check_future_actions` → the `Future action:` clause of that same policy section; `templates/product-layer/AI/memory/learnings.md` → "Learning Format".

Both needed no rule written — their Framework-layer halves already existed and the work was recording them. That is exactly what the ordering constraint selected for, and it means the remaining eight are larger than these two rather than the same size. Do not read this round's cost as the per-guard cost.

The other eight now carry `Framework-layer home: not yet dispositioned` in their own docstrings instead of nothing, so the population is visible where a guard is edited and none can be silently missing the field. Two state an expected outcome — `check_links` and `check_changelog`, both expected to end as "no Framework-layer form" — which is a prediction recorded so it can be checked, not a disposition.

No eleventh guard was added to enforce the `Framework-layer home:` field. It would fail DECISION-026's test in the round that shipped that test, and OF-21 forbids it explicitly until this item runs.

Also corrected, because it was found while reading the docstrings: four guards (`check_document_size`, `check_future_actions`, `check_item_findings`, `check_learning_promotions`) cited item 25 — rejected on 2026-08-12 — as the work that would eventually reach a customer. Each read as scheduled and was not. The instances are fixed; the class is **OF-22**.

Progress — round 2 (2026-08-13, via /next): `check_markers`, `check_artifact_destinations`, `check_template_refs` — the first three whose rule was *not* already written, which is where this item's real cost lives.

- `check_markers` → `policies/architecture.md` (1.2 → 1.3) → "Distribution Is Part Of The Architecture". The setup path was already covered five ways (`SYSTEM.md`, both setup commands, the product-layer README template, line 1 of all 18 templates). What was missing is the ongoing case: an agent creating a new Product-layer document *after* setup had nothing telling it to write the marker. Round 1 nearly produced that exact defect while considering a new `ENGINEERING/` file. The rule also fixes the boundary in the layer that reads it — the layer marker is on line 1 of the document, not in a path list the tool holds, because a list has to be edited every time a document is added and that edit is the step that gets skipped.
- `check_artifact_destinations` and `check_template_refs` → `policies/documentation.md` (3.0 → 3.1) → "An Instruction That Produces An Artifact Names Where It Goes, And A Template Is Never Where", the two halves of DECISION-024. Both had the same shape: the sentence was present at ~20 reference sites and the rule requiring it was written nowhere an agent loads. That is the artifact, not the rule — an agent adding the twenty-first site had nothing to follow.

One no-form outcome recorded rather than forced: `check_markers` still has a residue the framework half cannot reach — the marker being *deleted* from a file that already has one. That is an editing accident with no instruction to attach a rule to, so it stays a genuine local net. Recorded in the guard, not as a gap.

Also fixed here, found while placing the rules: **`policies/documentation.md` told every Installation that `.github/scripts/check_document_size.py` and `.github/scripts/check_item_findings.py` enforce two of its rules.** No Installation has those files. That is item 37's problem running in reverse — not "the guard does not reach the customer" but "the shipped policy claims it did". Both sites now state what actually holds an Installation to the rule, which is that the policy is loaded on every task.

And a defect in round 1's own work, corrected: the section it added to `policies/testing.md` restated `policies/architecture.md` → "An Improvement Lands Where The Work Is Loaded" almost line for line, including the test verbatim — the rule was already there and round 1 did not check. Trimmed to what is genuinely check-specific (the declaration goes inside the check; a cited plan can be rejected; a permanent satisfier turns a recurring trigger into a one-time gate) and now points at the architecture policy for the rule itself. `testing.md` 2.3 → 2.4.

Validation, run rather than reasoned about: a seeded workflow with an artifact-producing step naming no destination and a template reference missing its sentence made both guards exit `1`; removing the seed returned both to `0`; `check_markers` was unaffected throughout as a control.

Remaining: `check_decision_index`, `check_document_size`, `check_learning_promotions`, then `check_links` and `check_changelog` last.

Findings this item did not fix: **OF-22**, **OF-23**, **OF-24** and **OF-25**. The guard-count drift above is corrected in place rather than queued, and the underlying misdirection is DECISION-026, not a finding.

38. SCHEDULED — `sync` names what it removed from `.kenovis/`. Closes OF-01.

Problem: `sync` mirror-replaces the AI-OS layer and prints `already up to date` while files disappear. The oldest finding in the queue, unscheduled for four rounds because it read as needing a design decision.

It did not. RULE-INST-03 (2026-08-12) settled it: the AI-OS layer belongs to the AI-OS, so removal is correct and refusing would break the guarantee that every Installation runs the same team. What is left is one line of honesty — say what was removed.

Target: `sync` reports removed paths under `.kenovis/`, and `already up to date` is not printed when something was deleted. No refusal, no `--force`, no prompt.

Dependency: none. First item to test DECISION-026 in the direction it is hardest — this one genuinely is CLI code, and the rule it enforces already lives in `DOMAIN/BUSINESS_RULES.md`, so the loaded-layer half exists and the code is delivery.

Findings this item did not fix: none.

39. DONE (2026-08-13, via /next) — the findings rule is carried by the layer every session loads, not by one command. Closes OF-26. → `PRODUCT/ROADMAP-ARCHIVE.md`

40. SCHEDULED (founder-raised 2026-08-13, via /analyze on whether this AI-OS still serves its stated purpose) — the purpose has no verifiable form, so every round optimises the instrumentation that does.

Problem, and it is the mechanism behind the founder's question rather than the question itself. `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" makes byte counts, grep counts and guard exit codes checkable, and rounds have honoured it well. Nothing makes the stated mission checkable. So a round closes what it can prove it closed, and what it can prove is always the machinery.

Measured, 2026-08-13, each off the tree:

- Of the 30 rows in the queue below, **18** are about this AI-OS's own bookkeeping (guards, document lifecycle, the findings machinery). Of the **17** carrying `Open`, **11** are.
- `wc -l .github/scripts/*.py` → **1198 lines** across ten guards, reaching **0** Installations (item 37 states this). `find cli/src -name '*.ts' | xargs wc -l` → **2604**. Repository-only infrastructure is 46% the size of the shipped product.
- Last 30 commits by area: `PRODUCT/` 29, `.github/scripts` 22, `.kenovis/AI/policies` 19, `cli` 5.
- `cli/package.json` → `0.14.0`. Last external validation: `0.3.0`, 2026-08-06 — **eleven releases**. Six deferrals in the queue rest on that one gap (OF-12, item 33).

Item 37 already named the same drift — "four consecutive rounds recorded that gap as a caveat while widening it" — and treated it as a guard-placement problem. It is not only that. A guard in the right layer is still a guard; the question this item asks is what a round is *for*.

Second half, and the reason the first half persists: `commands/next.md` Step 3 ranks queued findings on the priority formula `Pain × Frequency × Business Impact / Cost`. That formula is written for a *customer's* pain. Eighteen of these thirty rows have pain to Kenovis and none to any customer. Two incompatible populations, one ranking. Instrumentation findings win every time — their Cost is low and exactly knowable — and mission findings lose, because theirs is unknown or needs a party this repository does not have.

Third, and it is upstream of both: COMPANY_OS.md → Company Vision says Kenovis "gives any small, ambitious team the execution capacity of a full specialized organization". The founder's stated objective is "enable products to be developed, maintained, evolved and supported **without requiring a conventional human development team**". Those are different claims — augmentation and replacement — and only the weaker one is written in the Product layer. A round cannot be measured against a criterion that is not written down, so it is measured against the ones that are.

Target, in this order:

1. The objective is written where rounds read it, in a form a round can be checked against — COMPANY_OS.md and `PRODUCT/ROADMAP.md` → success metrics. Not a slogan; a question a closing round answers.
2. The queue separates the two populations, or the formula stops being applied to both. A finding about the recording mechanism and a finding about what the product does for a team do not compete on one axis.
3. A standing constraint on the ratio, decided by the founder rather than proposed here: what fraction of rounds may close on instrumentation before external validation runs again.

Founder call on 2 and 3 — the input they need is the four measurements above, which are gathered. 1 is drafting work once the objective text is settled.

Validated when: a closing round states which of the two the work served and against which written criterion, and the queue's two populations are no longer ranked by one formula.

Findings this item did not fix: **OF-31**, **OF-32**, **OF-33**, **OF-34**, **OF-35**.

Update — the objective text arrived, 2026-08-13, via a second `/analyze` the same day. Part 1 of this item was written as "drafting work once the objective text is settled", and treated the absence of a written objective as a gap to be filled later. It is not a gap: the founder holds an authored 17-section statement of Kenovis's operating model and pasted it into a prompt to ask whether the system had lost it. So part 1's input exists and part 1 is now placement, not drafting — **OF-36** carries it.

What that run added, and it did not restate this item: **OF-36** (the operating model is not on disk), **OF-37** (272 KB of archived memory that no command opens), **OF-38** (the disposition rule's trigger — "before the session ends" — is an event nothing defines or detects, which is why findings still die in threads after item 39), **OF-39** (two Source Of Truth Hierarchies, in `CLAUDE.md` and `SYSTEM.md`, disagreeing on whether a decision or a business rule wins).

The measurement half of this item held on re-check and one figure moved: `grep -c "founder-raised\|founder asking\|raised by a human\|founder-flagged" PRODUCT/ROADMAP.md` → **12** on 2026-08-13 after this item landed, and this run is the thirteenth instance of OF-35's class — the founder asking whether the system still does what it was built to do, and the answer being found by the asking.

Corrected in the same session, after the founder asked what had happened again: the round had the operating-model document in its own input and filed a request that someone write it down. `PRODUCT/OPERATING_MODEL.md` now holds it verbatim with its provenance, OF-36 is half Fixed, and the round's own failure is **OF-40**.

Findings this round did not fix: **OF-37**, **OF-38**, **OF-39**, **OF-40**; **OF-36** half fixed, its reconciliation half still Open. `wc -c PRODUCT/ROADMAP.md` → **104143 bytes** before this round's writes, which is OF-23 growing by another ~10 KB and still the cheapest work on the board.

Update — third `/analyze` the same day, 2026-08-13, on the same question with one new input: the founder's framing of the repository's own layers. Nothing in this item is restated; the operating model was already on disk from the previous round and was verified byte-identical to the founder's paste before anything else ran.

What it added, and part of it lands on this item rather than beside it: **OF-41** — this item's headline ratio measures `.github/scripts` against `cli/src` and calls `cli/src` the shipped product. It is not. The bundle is `.kenovis/AI/` — 64 tracked files, 419,098 bytes — and the CLI delivers it. The drift this item names survives the correction; its magnitude does not, and the corrected figures are the input to part 3, which is a founder decision on a standing constraint. Do not settle part 3 against the numbers as first written. Also **OF-42** (the founder's model of the layering differs from the tree, and no mechanism compares them) and **OF-43** (three full analyses in one day because nothing on disk holds the answer to this question).

Findings this round did not fix: **OF-41**, **OF-42**, **OF-43**.

41. SCHEDULED (founder-flagged **maximum priority**, 2026-08-13 — ahead of item 37, OF-23, OF-25, item 24 and every other item and finding on this document) — the framework conforms 1:1 to `PRODUCT/OPERATING_MODEL.md`, section by section, or records where it deliberately does not.

Founder instruction, given in the session that produced items 40's update and OF-41/42/43: *"el propósito es que alinees 1:1 con lo que espero de kenovis"*. The specification is `PRODUCT/OPERATING_MODEL.md`, authored by the founder, on disk since 2026-08-13. This item is the alignment work; item 40 is the diagnosis of why rounds drift away from it. **Item 40 part 1 is absorbed here** (step 2 below is its checkable form); item 40 parts 2 and 3 stay where they are, as founder calls.

Why one item rather than thirteen: OF-28 through OF-43 are each correct and each scoped to a mechanism. None of them is scoped to the specification, so executing them in priority order optimises thirteen mechanisms and never answers the question the founder keeps asking. The unit of work here is a section of the operating model, and the finding ids are its parts.

**The conformance table has moved to `PRODUCT/OPERATING_MODEL.md` → "Conformance"** (2026-08-14, step 2 below, DECISION-032). It is not reproduced here: a second copy would be the failure DECISION-031 had just finished fixing one level up, and this item's own step 2 says its permanent home is not this document.

It was **moved, not copied, and re-verified rather than carried over** — every row re-read off the tree on 2026-08-14 before it was written into its new home. Four figures had moved in one day and are recorded in the new table: §3 14 → **22** founder-raised instances, §6 272,438 → **320,100** archived bytes, §13 17 → **54** `Open` queue rows, §14 ~120 KB → **164,762 bytes**. The shape held: five `Present`, nine `Partial`, three `Absent`, the three absent still §3, §12 and §15.

Two figures moved against the direction of the work, which is the table earning its keep on the first pass after it was given a home: rounds closed real gaps in that window and the two headline symptoms of §3 and §14 both got worse.

Target, in this order. Steps 1-3 are cheap and unblock the rest; do not start step 4 before them.

1. ~~**Rank the specification.**~~ — **DONE (2026-08-14, DECISION-031).** One hierarchy, in `.kenovis/AI/SYSTEM.md`, with `PRODUCT/OPERATING_MODEL.md` at rank 1 and on the session-initialization path; `CLAUDE.md` cites it and states no ordering; a business rule outranks a recorded decision. Closed OF-39 and the this-repository half of OF-50. The round reached it as a founder call, stopped, presented it and resumed on the answer — OF-47's branch running end to end for the first time. Residues were **OF-72** and **OF-73**, both closed in step 2.
2. ~~**The conformance table moves to `PRODUCT/OPERATING_MODEL.md`**~~ — **DONE (2026-08-14, DECISION-032).** It is a standing section there, one row per section, with the standing criterion carried by `commands/next.md` (2.6 → 2.7) Step 13: a closing round names the operating-model section its work served and updates that row, or states it served none, and Step 15's summary restates it. That is item 40 part 1's checkable form and OF-43's home in one artifact rather than two.

   **OF-72 and OF-73 closed with it**, as the pointer sequenced them. OF-72 was the founder's call and the founder answered in session: every Installation authors `PRODUCT/OPERATING_MODEL.md` at setup, before `COMPANY_OS.md`, from a new template the AI may never answer on the owner's behalf — `/init-project` 1.10 → 1.11 Steps 1-2, `/adopt-project` 1.10 → 1.11 Steps 2-3, `SYSTEM.md` 1.8 → 1.9 (rank 1 stops being conditional), `CLAUDE.md` 2.4 → 2.5, `bootstrap.md` 2.8 → 2.9. OF-73 was the third Source Of Truth ordering, in `COMPANY_OS.md` → "Knowledge Hierarchy": that section is now "What Each Document Defines", states no precedence, and cites `SYSTEM.md` — in this repository's copy **and** in the template, which OF-73's row did not know existed.
3. ~~**Reconcile `COMPANY_OS.md` with §1**~~ — **DONE (2026-08-13, DECISION-028).** Settled ahead of steps 1 and 2 because the founder answered it directly in the session that found it, and because the contradiction was sharper than this step assumed: `SYSTEM.md` did not merely omit §1's claim, its Final Principle asserted the negation (OF-57). §1 wins. `SYSTEM.md` 1.6 → 1.7, `COMPANY_OS.md` 2.0 → 2.1, and the operating model is ruled to outrank a framework document *for this conflict* — the general hierarchy is still OF-39 and still step 1. What remains of this step is **OF-58**: "the AI is not an autonomous decision maker" is unscoped in both `SYSTEM.md` and `CLAUDE.md`, and DECISION-028 deliberately did not settle it.
4. **Close the gaps in dependency order**, one round each, each round naming its section:
   - §2 — **OF-38 with OF-28 and OF-29, one change.** The rule's trigger becomes an event that occurs (write the finding when it is found, not before a terminus that never arrives), and the pre-setup window gets an instruction. Cheapest, and it closes ABSOLUTE PRIORITY #1's remaining edges.
   - §12 then §1 — **OF-31 then OF-32.** Routing by role, then refinement. In that order: nothing can refine a finding until a role owns it. This is the largest single piece of work in the item and the one that changes what Kenovis *is*.
   - §15 — **OF-44**, below. Hardest, and honest about it: the invariant may not be fully enforceable, in which case that is recorded rather than claimed.
   - §1/§16 — **OF-33.** Observation. Design question first: a cadence must not become an eleventh guard (DECISION-026) and must not be tool-specific (DECISION-010, the reason OF-20 was rejected).
   - §6/§9/§17 — **OF-37.** One instruction naming when an archive is opened; retrieval is item 23 and stays behind item 22.
   - §4 — **OF-41** before item 40 part 3, then **OF-42** with **OF-35**.
5. **Every closing round from step 2 onward states which operating-model section its work served**, against the table. A round that served none says so. That is the standing criterion item 40 says does not exist.

Explicitly out of scope, and stated so it is not folded in: no new CI guard (DECISION-026, OF-21, and item 37 is still mid-flight); no hosted service, backend or telemetry (DECISION-013, `COMPANY_OS.md` → What The Company Will NOT Become); no rewriting of `PRODUCT/OPERATING_MODEL.md`'s text, which is the founder's and is recorded verbatim by construction.

Precondition worth taking first, not scope creep: **OF-23's archive pass.** This document is at ~120 KB against a 60 KB threshold, it is the vehicle for every step above, and this item added ~9 KB to it. The pass has a written procedure and has been run twice.

Validated when: `PRODUCT/OPERATING_MODEL.md` carries the conformance table with no row reading `Absent` that is not accompanied by a recorded decision to leave it so, and the founder can read that table instead of asking the question a fifteenth time.

Findings this item did not fix: **OF-44**.

Progress — step 2 (2026-08-14, via /next): the table's home, the criterion that keeps it alive, and OF-72 and OF-73 with it, as the pointer sequenced them.

Premises checked against the tree before scoping, per [[Learning-023]]. Three held and one was larger than its row said:

- `grep -c "conformance" PRODUCT/OPERATING_MODEL.md` → **0**: the table was not there.
- `grep -c "OPERATING_MODEL" .kenovis/AI/commands/init-project.md .kenovis/AI/commands/adopt-project.md` → **0, 0**, and `ls .kenovis/AI/templates/product-layer/PRODUCT/` returned four templates, none an operating model. OF-72 held exactly as written.
- **OF-73 was understated.** Its row calls the third ordering a Product-layer contradiction that `sync` will never reach, which is true and is not all of it: `grep -rln "Knowledge Hierarchy" --include="*.md" .` returns `COMPANY_OS.md` **and** `.kenovis/AI/templates/product-layer/COMPANY_OS.md`. The framework ships the third ordering to every Installation that has not yet been set up. Both are fixed; the row is corrected in place rather than re-queued, since it is the same finding measured properly.
- `wc -c PRODUCT/ROADMAP.md` → **164,762**, against the 129,094 the pointer anchors. Sixth consecutive round to find its own item's figure stale, which is OF-04.

The two decisions this round had to make rather than look up, both recorded in DECISION-032 with what they cost:

**Where the operating model is authored in setup, without renumbering.** `init-project.md` Steps 8, 11 and 12 and `adopt-project.md` Step 13 are cited by id from `AI/memory/learnings.md`, DECISION-018 and DECISION-022, so inserting a new Step 1 would break four citations silently and none of them would fail a check. The existing step is titled "the top of the hierarchy" and was writing rank 2 while rank 1 did not exist — extending it is what its own title already claimed.

**The table moved rather than being copied.** This item's inline table is replaced by a pointer and the four figures that changed. A conformance table in two places is DECISION-031's failure one level down, in the round that was completing DECISION-031.

Validation, run rather than reasoned about: the ten CI guards all pass, and `check_artifact_destinations.py` earned its keep by failing first — the new Confirm Intent questions produce answers and named no destination for them, which is the exact defect DECISION-024 exists to prevent, in a step this round wrote. Both steps now say the answers go into `PRODUCT/OPERATING_MODEL.md` and that nothing produced by that step is a file of its own. The three greps that anchored the findings all flipped, read back off the artifacts:

- `grep -ci "conformance" PRODUCT/OPERATING_MODEL.md` → 0 → **3**
- `grep -c "OPERATING_MODEL" .kenovis/AI/commands/init-project.md .kenovis/AI/commands/adopt-project.md` → 0, 0 → **4, 4**
- `grep -rn "^# Knowledge Hierarchy" --include="*.md" .` → 2 → **0**. Four files still contain the phrase and all four are references to this closed finding, in `COMPANY_OS.md`'s own historical note, `DECISIONS.md`, this document and `learnings.md` — which is why the check is on the heading rather than the string.

**The behavioural half is unvalidated and is stated as unrun**, per OF-30 and [[Learning-031]]: whether a closing round actually names its operating-model section is a claim about agent behaviour, and this round wrote the instruction. The first real evidence is the next `/next`, in a fresh thread.

**Section served by this round: §3** — "behaves like a real development team; the founder never has to ask". That is what the table is for, and it is item 41's own `Validated when`. **The row does not move.** Its measure is `grep -c "founder-raised\|founder asking\|raised by a human\|founder-flagged" PRODUCT/ROADMAP.md` → **22**, up from 14, and building the artifact a founder could read instead of asking is not the same as the founder no longer asking. §3 stays `Absent`. Four rows were re-measured (§3, §6, §13, §14) and no row changed state, which is the first application of this round's own rule that a row does not move because a rule was written.

Also closed here, because the round was editing the paragraph anyway and it was its fourth correction: **OF-68**. `DECISIONS.md` → "Document Layers" no longer states how many decisions carry `‡` and `★`; it names what the marks mean and gives the two commands that count them. The numbers had gone "Eight" → "Fifteen"/"ten" → "Nineteen"/"thirteen" → "Twenty-one"/"fourteen" in eleven decisions, each correction made by a round that had to touch the paragraph anyway, each stale before the next decision landed.

Archive pass, run as a step of this round per `commands/next.md` Step 13 rather than when someone noticed: three closed queue rows (OF-68, OF-72, OF-73) compacted, and the superseded `Next` ordering block moved — all four verbatim, each asserted as a byte-substring of `PRODUCT/ROADMAP-ARCHIVE.md` by the script that moved them, none of them re-typed. `PRODUCT/ROADMAP.md` **164,762 → 165,080** after the compaction alone, and **166,984** at the end of the round: the pass moved out roughly 9 KB and the round put more back than it removed. That is OF-62 holding exactly as written — the archive rule has no lever left, and the bound from here depends on findings being resolved rather than moved. Recorded, not re-queued.

Findings this step did not fix: **OF-76**, **OF-77**, **OF-78**.

Progress — step 2's residue (2026-08-14, via /next, fresh thread): **OF-76**, **OF-77** and **OF-70**, closed as the pointer ranked them — the criterion step 2 shipped is now populated in every Installation and declared in every round.

Premises checked against the tree before scoping, per [[Learning-023]]. All four held, and one of them is the first thing this round measured because it decides whether the item is real:

- `grep -c "^| [0-9]" .kenovis/AI/templates/product-layer/PRODUCT/OPERATING_MODEL.md` → **1**. One placeholder row. OF-76 exactly as written.
- `grep -cn "Operating model section served\|Section served" .kenovis/AI/commands/next.md` → **0**. Nothing required the declaration.
- `grep -cin "founder\|human decision\|cannot execute\|who executes" .kenovis/AI/commands/next.md` → **2**, unchanged from step 2 — the stop-branch is still there and this round did not need it.
- `wc -c PRODUCT/ROADMAP.md` → **166,646** at the start of this round, against the 164,762 the pointer anchors. Seventh consecutive round to find its own item's figure stale, which is OF-04, and the smallest drift yet (1,884 bytes against 33,417 four rounds ago) because step 2 ran the archive pass.

**Where the population instruction actually was, which is the part the row understated.** `init-project.md` line 190 already said the table is *"filled the first time a round reads the document end to end against the framework"*, and the template repeated it. Both are true and neither is executable: a setup command is read once, by the session that runs setup, and never again by the rounds it describes. So the instruction existed in two places and reached its executor in neither — [[Learning-036]]'s third failure mode (an instruction whose sink is never read) with the sink being a *command a round does not load*. The fix is not new text, it is the same requirement moved to the step that runs every round.

`commands/next.md` **2.7 → 2.8**, Step 13:

- **The closing round builds the table when it is still the form**, one row per numbered section, with `unmeasured` in the State column of every row it did not verify. `unmeasured` is defined in the template as the state a row is born in — deliberately not a fourth grade, because a row that stays `unmeasured` across rounds is itself the finding.
- **`Operating model section served:`** is a required line in this document, naming the section or the word `none`.
- **`Next:`** is a required line likewise, carrying the ranked objectives and the reasoning, or `none` with why. Step 3's fallback for "no pointer exists yet" is what made an omission read as intended behaviour; a round that means `none` now has to write it.

`DECISION-033` carries the reasoning and the three rejected alternatives, including the one that looked cheapest — having setup fill the rows.

`.kenovis/AI/templates/product-layer/PRODUCT/OPERATING_MODEL.md` **1.0 → 1.1**: names Step 13 as the owner of the population rather than repeating the instruction, and defines `unmeasured`. That second half was not in the plan — it was caught in this round's own review, which found the round shipping a state name the document it ships to does not define.

Validation, run rather than reasoned about. Ten CI guards pass. The three anchoring greps flipped, read back off the artifacts: table-population clause in `next.md` **0 → 1**, `Operating model section served` **0 → 1**, the `Next` pointer declaration heading **0 → 1**; the template names `next.md` Step 13 **2** times and `.github/` still appears **0** times anywhere under `.kenovis/AI/`.

**And this round is the independent evidence step 2 said it could not produce.** Step 2 wrote *"the first real evidence is the next `/next`, in a fresh thread"*, and item 42 parts 2-3 wrote the same condition for OF-46 and OF-47. This is that thread — no conversational inheritance, a different session from the one that wrote either instruction. What it did, stated as behaviour rather than as intent: Step 3 started from the `Next` pointer, took item 1 as ranked, did not re-derive the order over the document, and did not descend. **OF-46 is behaviourally validated.** OF-47's stop-branch did **not** fire and is still unrun — this round's objective was executable, so the branch was never reached, and that is a different claim from "it works". Item 41 step 2's own behavioural half — that a closing round names its operating-model section — is validated by this block existing, one instance, by a session that did not author the rule. That is what OF-30 asks for and it is one data point, not a closed class.

**Operating model section served: §15** — *"the system must be designed so that violating this invariant is difficult or impossible"*. **The row does not move; it stays `Absent`**, and the reason is this round's own rule: three required lines make three omissions visible, which is not the same as making a violation difficult. Measured for the row rather than recalled: `ls .github/scripts/*.py` → **10** guards, reaching **0** Installations, unchanged. What did change is that the framework's one working enforcement shape — a required line whose absence is exact — now covers three of its load-bearing rules instead of one. OF-44 still carries the row.

Archive pass, run as a step of this round per `commands/next.md` Step 13 rather than when someone noticed: three closed queue rows (OF-70, OF-76, OF-77) compacted and the superseded `Next` ordering block moved — **8,102 bytes**, all four asserted as byte-substrings of `PRODUCT/ROADMAP-ARCHIVE.md` by the script that moved them, none re-typed. `PRODUCT/ROADMAP.md` **166,646 → 158,544** after the pass, **172,347** at the end of the round: the round put back **13,803** against **8,102** removed, a net **+5,701**. Smaller than the previous round's overrun and the same direction, which is OF-62 unchanged — the archive rule has no lever left and the bound depends on findings being resolved.

Two sizes worth carrying forward rather than queuing, because both are the rules working: `AI/memory/learnings.md` is **60,604 bytes** against the 61,440-byte threshold — **836 bytes of headroom**, so the next round that appends a learning triggers its archive pass in Step 13. And `PRODUCT/ROADMAP-ARCHIVE.md` is **216,103 bytes**, over threshold by design and classified `archive_of`, which is OF-15 as written.

Findings this step did not fix: **OF-79**, **OF-80**.

42. DONE (2026-08-13 → 2026-08-14, via /next across four rounds) — the three commands the founder actually runs (`/next`, `/analyze`, `/explain`) work under the one-thread-per-`/next` cadence: the archive pass ships as a Step 13 trigger alongside the stale-branch guard (OF-51/OF-23, OF-60), `/next` Step 3 reads its own `Next` pointer and stops rather than descends on a human-only item (OF-46, OF-47, DECISION-030), and `/explain`, "Autonomous Mode" and Completion Criteria stop contradicting the findings rule and the founder's cadence (OF-48, OF-52, OF-54, OF-56, OF-80, OF-49, DECISION-034). → `PRODUCT/ROADMAP-ARCHIVE.md`

OF-53, 2026-08-14, via /next — `/next` Step 11 splits validation by the round's own artifact kind.

Premise checked before scoping, per Learning-023: `grep -cin "artifact is a document\|artifact is code\|read back off the artifact" .kenovis/AI/commands/next.md` → **0**, confirming OF-53's row as written — the majority of rounds change markdown under `.kenovis/AI/` and Step 11's four checks (tests, type checks, linting, build) touch none of it.

`commands/next.md` **2.9 → 2.10** Step 11: the code checks move under an explicit "when the round's artifact is code" heading; a new "when the round's artifact is a document" heading — the OF-53 row's own plausible shape — names `.kenovis/AI/policies/documentation.md` → "A Claim Is Read Back Off The Artifact" as the validation form and requires the round to state which one ran.

Validation, run rather than reasoned about — and this round's own artifact is a document, so this paragraph is Step 11 applied to itself. The anchoring grep above flipped: **0 → 2**. Read back rather than assumed: `grep -c "Type checks" .kenovis/AI/commands/next.md` → **1**, confirming the code-artifact branch is intact rather than replaced.

Found while running this round's own Step 13, dispositioned rather than left in prose: **OF-19** gains a second instance — this round could not branch from `development` per `policies/git.md`, because the previous round's PR (#114) sat open, unreviewed, one commit ahead of `development`. Resolved by merging it with `gh pr merge --rebase --admin --delete-branch`, the same command OF-19 already names as this repository's standard, with the founder's explicit confirmation in this session. **OF-85** is new: the previous round's own archive pass updated six queue rows' disposition to `Fixed` and copied them to the archive, but left their Finding and Source columns at full length instead of compacting them to a clause, so the active document kept the weight it had before archiving. OF-53 and OF-60 below are compacted properly in this round's own pass, for comparison.

**Operating model section served: §16** — *"Observe → Analyze → Detect → Refine → Plan → Implement → Test → Review → Learn → Persist → Update roadmap"*. **The row does not move; it stays `Partial`.** What changed: the "Test" step of that loop had no definition for a document-artifact round, which is most rounds on this board; it now does, and this round is the first application of it — a data point, not a closed class (Learning-031, OF-30). Observe and Refine are still absent, which is why the row does not move.

Findings this round did not fix: **OF-85**. OF-19 gained a second instance rather than a new id, per DECISION-029's "cite the id and add what this session learned to it."

Archive pass, run as a step of this round per `commands/next.md` Step 13 — triggered by `wc -c PRODUCT/ROADMAP.md` → **186,168 bytes** at the start of this round, against the 60 KB threshold. Item 42's own body, all five parts now complete, and the superseded `Next` ordering block it wrote move to `PRODUCT/ROADMAP-ARCHIVE.md` verbatim, each asserted as a byte-substring of the archive by the script that moved it, none re-typed; the OF-53 and OF-60 queue rows compact to a clause each — the pattern OF-85 above says the previous pass did not follow. `PRODUCT/ROADMAP.md` **186,168 → 156,416 bytes** immediately after the pass, before OF-85, OF-19's addendum and this narrative were written; **164,537 bytes** at the end of the round.

Next (updated 2026-08-14, after OF-53 — the whole of the previous pointer's rank 1 is closed, and everything below it keeps the order the previous pointer gave it):

Closed and not repeated below: **OF-53** (`commands/next.md` 2.10 Step 11, splitting code-artifact from document-artifact validation). Item 42's own five parts, across four rounds, and the seven superseded `Next` ordering blocks they wrote (the one OF-53 closed among them) are `PRODUCT/ROADMAP-ARCHIVE.md`'s; item 42 itself is now archived as one line.

1. **OF-81 and OF-82**, in that order, as one round. Unchanged from the previous pointer: OF-81 is a workflow that selects work with a stale model beside a command with a current one, OF-82 is that this framework measures its own rules' reach with an improvised keyword and got it wrong in both directions in a shipped row. OF-81's first output is a deletion-or-convergence decision, which is small; OF-82's is whether citing a policy section by its exact title becomes a stated convention.

2. **Then item 41 step 3's residue, OF-58**, and then **item 41 step 4**'s gap sequence beginning with §2 (OF-38 + OF-28 + OF-29). Unchanged from the previous pointer.

3. **OF-78, OF-79, OF-83 and OF-85 are deliberately not ranked above the blocks above; this is the fourth round to say so about OF-78.** OF-85 joins the unranked group for the same reason the other three sit there: its first output is a decision — how much same-round compaction a fix-and-archive pass owes the rows it touches — rather than a clause.

Everything below stays scheduled and behind item 41: item 37 round 3, OF-25, item 24, OF-14, item 22, the release. Their ranking argument has not changed.

Not `/next` work: item 32 (founder input, named in the item). Item 33 needs an external party. Item 22 requires `/architect` and an ADR before any file is touched; do not start it from `/next`. Item 25 is rejected — do not restart it.

**A release is one round closer to being argued and is still not ranked.** OF-53 closing removes the last item the previous pointer named ahead of it; the case grows every round it stays unranked, and the next pointer that leaves it there should argue it rather than inherit this sentence.

Per Learning-023, check the next item's own premise against the file it describes before scoping it. Nine consecutive rounds have found their own item's stated figure stale, this one included: the previous pointer anchored 173,464 bytes and `wc -c PRODUCT/ROADMAP.md` read **186,168** at the start of this round.
---
Founder instruction, 2026-08-13 — the roadmap check becomes a step of dispositioning, not a habit

Given in a session that invoked no command: *"quiero que TRAS CADA analisis, ejecucion, aprendizaje, decision tomada, hallazgo encontrado... revises SIEMPRE si eso esta planificado en el roadmap, y si no lo esta, que lo añadas y lo planifiques"*. Another instance of OF-35's class — the founder detecting a structural gap the system did not; `grep -c "founder-raised\|founder asking\|raised by a human\|founder-flagged" PRODUCT/ROADMAP.md` → **21** on 2026-08-13, before this block was written.

What was missing, measured before anything was written rather than assumed: `grep -rni "already scheduled\|already covered\|duplicate finding\|existing item covers" .kenovis/AI/` → **0**, and `grep -rn "Pain" .kenovis/AI/policies/ .kenovis/AI/commands/` → **0**. DECISION-025 required a disposition and DECISION-027 required it in-session; neither required the finding to be compared against what is already planned, nor to be comparable to the other rows once queued. The dimensioning was real here — 41 of 47 `Open` rows already carry the three terms — and it was a forty-round habit, not a rule, and it was shipping as a format example inside a Product-layer template the customer owns.

Shipped, framework layer, so it reaches an Installation's next task through `sync` with nobody invoking anything (DECISION-026's test): `.kenovis/AI/policies/documentation.md` **3.4 → 3.5** gains the comparison against `PRODUCT/ROADMAP.md` before a disposition is written, the requirement that an `Open` row carry Pain, Frequency and Cost with `unknown` written where a term is unknown, and the sentence the instruction turns on — **recording is not planning**. `DECISION-029` carries the reasoning and the two alternatives the founder rejected: every finding becoming a `SCHEDULED` item at discovery, and per-finding judgement.

Ordering unchanged. This does not displace the `Next` pointer above; it changes how every round below it writes what it finds, not what runs first.

Findings this session did not fix: **OF-66**, **OF-67**, **OF-68**.
---
Open Findings (queue, added 2026-08-12)

A scheduled item is dimensioned work. A finding is a candidate that is not dimensioned yet, and before this section existed there was nowhere to put one — so findings landed in the narrative of whichever item happened to be open, where they had no id, no priority and no life after that item closed. That is the defect item 27 fixes as a rule and item 28 ships to every Installation; this section is this repository's own instance of it, authored first so the triage was not blocked on the framework change.

Every finding carries one of four dispositions. **Scheduled** — it is an item, named here. **Open** — real, unscheduled, competing for the next round. **Deferred** — deliberately not now, with the reason and the condition that would change it. **Rejected** — decided against, with the reason, so it is not proposed again. Prose is not a disposition.

First pass, 2026-08-12, over the 13 parked findings in this document and the standing candidates named in items 13-17's closing paragraphs. The `AI/memory/learnings.md` sweep (24 `Future action:` entries) is item 29 and is not done here.

| Id | Finding | Source | Disposition |
|---|---|---|---|
| OF-01 | `kenovis sync` deletes anything a customer put under `.kenovis/` without naming what it removed. `already up to date` is printed while files disappear. | Item 12, 2026-08-09 | **Scheduled — item 38.** Open for four rounds on "needs a decision on report-vs-refuse", which RULE-INST-03 settled on 2026-08-12: the AI-OS layer is the AI-OS's, so deleting is the rule working and refusing would be wrong. Only the silence is the defect, which collapses this from a design question to naming what was removed. |
| OF-02 | `/architect` has never been executed end to end from a real published Installation. Six for six such runs have found a maximal-Pain defect. | Learning-020/021/022 | **Open.** Highest expected yield of any unscheduled item on precedent alone. Item 24 may use it as its vehicle. |
| OF-03 | `/release` has never been executed end to end from a real published Installation. Item 14 fixed its Step 8; fixing one step is not running the command. | Learning-021/022 | **Open.** Same class as OF-02, one round behind it. |
| OF-04 | Items 19-23 carry structural premises about file contents that were never verified when written — the defect Learning-023 records against item 18. | Learning-023, 2026-08-12 | **Open.** Cost is one command per item. Do it at the start of each item rather than as its own round. |
| OF-05 | An Installation that has never run install/sync since the hash sidecar shipped has no recorded hash, so its next `CLAUDE.md` transition still relies on the old prefix check. | Learning-008, item 7 | **Deferred.** Accepted and documented at the time; self-heals on the first sync. Revisit only if a customer reports a lost `CLAUDE.md`. |
| OF-06 | `/framework-review` has never been run as an audit pass over the post-migration framework layer. | Items 3, 6, 8, 11 closing paragraphs | **Deferred.** Expected yield low — items 6, 8, 10, 12, 14, 16 and 18 each swept the same surface. Revisit after items 19-30 land, when the surface has changed again. |
| OF-07 | No active version check: nothing tells an installed customer a newer Framework Release exists. `cli/README.md` → "Upgrading" covers discovery at near-zero cost today. | Phase 2 → New Capabilities, 2026-08-06 | **Deferred.** First network dependency in the CLI's core logic; Pain and Frequency unvalidated against one external team. Condition to revisit: real Phase 2 usage data. |
| OF-08 | The paid open-core tier has no ADR on its gating mechanism, and must not ship without one. | Phase 2 → Prerequisite, 2026-08-06 | **Deferred.** Premature on one external team's data. Blocks "additional specialized agents" when Phase 2 opens. |
| OF-09 | `sync` has no diff preview or conflict detection before it mirror-replaces. | Phase 0 item 3 slice 4 | **Deferred.** Reversibility is satisfied by the target's own git history; ergonomics belong to Phase 2. |
| OF-10 | Two records this block implements but never wrote: a `DECISIONS.md` entry making the per-session context budget a first-class constraint, and a `learnings.md` entry that documentation-as-memory without lifecycle is accumulation, not memory. | Second block header, 2026-08-12 | **Open — founder call, item 32.** That item names the input the decision needs. Still not `/next` work, but no longer only a queue row. |
| OF-11 | `MVP Success Metrics` → Usage has no target: "N installations (target not yet set)". Every release round since `0.9.0` has rejected `1.0.0` partly on this, so an unset number is gating the version. | Phase 1 → MVP Success Metrics | **Open — founder call, item 32.** Product decision, not an engineering item. Until it exists, `1.0.0` has no criterion to meet and each release re-argues the same rejection — six so far. |
| OF-12 | One external team has validated the product, on 2026-08-06, against `kenovis@0.3.0` — eight releases ago. `AUTOMATIONS/user-feedback.md` describes a feedback loop that has never run. | Phase 1 → Real External Validation | **Scheduled — item 33.** Every "deferred on unvalidated Pain" disposition above traces to this one gap. Previously tagged a founder call, which was wrong: it is work, and tagging work as a decision is a way of parking it. |
| OF-13 | `CHANGELOG.md` had no archive rule — 67.3 KB, every past release inline. | Item 21, 2026-08-12 | **Fixed** (2026-08-12) — item 35. → `PRODUCT/ROADMAP-ARCHIVE.md` |
| OF-14 | `check_document_size.py`'s failing case has never been exercised for `AI/memory/learnings.md`. Item 20 stated this rather than claiming it: at 12.1 KB the file is under threshold, so removing its split cannot make the guard fail, and the first attempt at that test passed for the wrong reason. | Item 20, 2026-08-12 | **Open.** Promoted out of item 20's narrative by item 34's RA2 gate before that narrative was archived. Cost is one fixture — a governed document temporarily grown past 60 KB — not a code change. Priority: Pain low (the guard's other error paths are both exercised), Cost low, but it is an unrun check, which is the exact shape `policies/testing.md` → "A Check Is Not Verified Until It Has Been Run" exists to forbid. |

| OF-15 | `CHANGELOG-ARCHIVE.md` is 53.1 KB on the day it was created and grows one released section per release — roughly 4-5 KB each, so it crosses the 60 KB threshold in about two releases. It is registered `archive_of`, so the guard will classify it over-threshold-by-design and never fail on it. | Item 35, 2026-08-12 | **Deferred.** Correct by construction — an archive is where the weight goes and is never on the session-initialization path, which is exactly what `archive_of` encodes. Recorded because the classification means no check will ever raise this file again, and `PRODUCT/ROADMAP-ARCHIVE.md` reached 143.1 KB the same way. Condition to revisit: an archive is read often enough that its size costs something, or a second-level archive becomes cheaper than one flat file. |
| OF-16 | Released changelog prose cross-references sections that moved to the archive. | Item 35, 2026-08-12 | **Rejected** — editing shipped prose to tidy a cross-reference is the compression the archive rule forbids. → `PRODUCT/ROADMAP-ARCHIVE.md` |
| OF-17 | A round wrote its findings into the session summary instead of the queue, leaving them with no id. | Item 35, 2026-08-12, founder-raised | **Fixed** (2026-08-12) — item 36. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-18 | Scheduling changes and implementation changes land in the same commit. | Item 34, 2026-08-12 (backfilled) | **Rejected** as work — commit hygiene, already governed by `policies/git.md`. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-19 | `gh pr merge --rebase --admin` — this repository's standard merge, used on every round since `0.6.0` — bypasses required status checks, not only the required review. So all ten CI guards are advisory: they are bypassable by the same command and the same person they constrain, on the merge that lands the work. Five PRs were merged that way on 2026-08-12 alone. | DECISION-026 / item 36, 2026-08-12 | **Open.** Strengthens DECISION-026 rather than competing with it — it is a second, independent reason CI is not enforcement, and the reason item 37 is the priority instead of adding an eleventh guard. Item 34's "Solo-maintainer note... Not a misconfiguration" is about the *review* half and is still correct; the *checks* half was never examined. Priority: Pain medium (the guards have caught real defects and no round has knowingly merged red), Frequency high (every merge), Cost low to *decide* — the real question is whether required reviews should stop being required for a solo maintainer so `--admin` is not needed at all, which is a repository-settings call, not code. **Second instance, 2026-08-14:** the same tension blocked a round from *starting* — `policies/git.md` requires every round to branch fresh from `development`, and `development` sat one commit behind an open, unreviewed PR from the previous round — itself a consequence of OF-80's own fix, which made "reached a branch" the completion bar instead of "merged". Resolved the same way, with the founder's explicit confirmation in-session rather than assumed: `gh pr merge --rebase --admin --delete-branch`. |
| OF-20 | A Claude Code hook was proposed as in-thread enforcement and abandoned without a disposition. | This session, 2026-08-12 | **Rejected** — a hook is one tool's configuration and fails DECISION-010 before it reaches DECISION-026. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-21 | `check_item_findings.py` binds its population to closed items, but findings are round-scoped, not item-scoped. The two findings this session missed — OF-19, born inside DECISION-026's body as evidence for rejecting an option, and OF-20, born in conversation as a proposal that was dropped — were both structurally invisible to it: neither was attached to a closing item. The guard shipped in item 36 cannot catch the class of miss that produced it. | This session, 2026-08-12, founder-raised | **Open.** Two distinct mechanisms, both confirmed by example rather than reasoned: (1) a fact used as *evidence* inside a decision body stops reading as a finding, because it was already written down and already served a purpose — `policies/documentation.md` already forbids exactly this and it still happened, in the decision written about it; (2) a round audits what it *did* and not what it *proposed and dropped*, so a rejected option leaves no record and gets re-proposed. Priority: Pain high (it is the same leak, one layer out, and today's fix does not reach it), Frequency high, Cost unknown — the first output is deciding whether the declaration should be round-scoped instead of item-scoped, which changes the guard's population rather than adding a guard. Do not add an eleventh guard for it before item 37 runs; see DECISION-026 and OF-19. **Third instance, 2026-08-13:** item 37 is `SCHEDULED`, so its two progress blocks sit outside the guard's population entirely — they declared OF-22, OF-23, OF-24 and OF-25 and nothing verified those ids exist. They do, checked by hand, which is the point: an open item can accumulate rounds of findings with no mechanical check at all, and the ids only stay real for as long as someone keeps doing it manually. **Fourth instance, and the split, 2026-08-13:** the founder raised the same class from the other side — not "the guard's population is too narrow" but "the rule is only written where a command puts it" — which is OF-26 and is now item 39. The round-scoping half moves there and is built without a guard; what stays Open here is only the detection half, still behind item 37. |

| OF-22 | A rejected roadmap item stays cited elsewhere in the tree as the plan that closes a gap. Item 25 (`kenovis check`) was rejected on 2026-08-12; four guard docstrings kept naming it as what would eventually reach a customer, and read as scheduled for a full round afterwards. Nothing detects it — `check_links.py` sees no link, and the citation is prose. | Item 37, 2026-08-13 | **Open.** The four instances are fixed in item 37's first round; the class is not. Two mechanisms worth separating before scoping: a rejection is written into the item in `PRODUCT/ROADMAP.md` and nothing walks the tree for inbound references to it, and a citation of the form "`PRODUCT/ROADMAP.md` item N" asserts nothing about item N's status, so it cannot be wrong on its face. Priority: Pain medium — a dead plan reading as a live one is precisely what item 27 exists to prevent, and here it survived inside the guards that enforce item 27. Frequency low-medium (rejections are rare; item 25 is the first). Cost unknown; the first output is deciding whether the inbound reference or the rejection carries the check. Do not add an eleventh guard for it before item 37 completes — see DECISION-026 and OF-21. |

| OF-23 | `PRODUCT/ROADMAP.md` is over the 60 KB lifecycle threshold — **72107 bytes (70.4 KB)** read off the file with `wc -c PRODUCT/ROADMAP.md` on 2026-08-13, at a stated point: after item 37's progress block and before this row and OF-22 were written. No end-of-round figure is given, because this row is inside the file it measures and every correction to the number changes it — the anchor is the measurement point, not a total. Item 34 left the file at 46866 bytes on 2026-08-12 having just run the archive pass, so it gained **25,241 bytes in one day** across items 35, 36, 37, OF-19/20/21 and this round's item-37 block. `check_document_size.py` passes it and always will: `PRODUCT/ROADMAP.md` is registered with a permanent `split`, and a registered split satisfies the guard at any size. | Item 37 round 1, 2026-08-13 | **Open.** The guard is not wrong — the split is the correct structural answer and item 19 built it. What has no trigger is *running* the pass: a split satisfies the rule once and forever, so the document that item 19 archived is free to grow back past threshold with a clean CI. Items 35 and 36 are DONE with inline narratives and are the obvious next candidates. Not fixed here because an archive pass carries its own byte-substring integrity procedure (items 34 and 35 both ran it) and folding it into item 37's round would put two unrelated changes in one commit — OF-18's shape. Priority: Pain medium (this file is on the session-initialization path and every `/next` reads it whole), Frequency high (every round appends to it), Cost low and known — the pass has been run twice with a written procedure. Cheapest work on the board after item 37. **Second measurement, 2026-08-13, end of the `/analyze` round that wrote item 40 and OF-31 through OF-35: `wc -c PRODUCT/ROADMAP.md` → 103582 bytes (101.2 KB), up 23,831 from the 79751 this row was anchored at earlier the same day.** Recorded rather than avoided: an analysis whose subject is undimensioned findings cannot dimension them in a table row, and the alternative — writing item 40 short enough to stay under a threshold — would trade the finding for the file size. The archive pass is the answer, and it is now overdue by 41 KB rather than 12. |

| OF-24 | A new policy section can restate a rule another policy already carries, and nothing notices. | Item 37 round 2, 2026-08-13 | **Fixed** (habit half, 2026-08-13) — `policies/documentation.md` 3.2 → "Single Source of Truth". Detection half folded into OF-22. → `PRODUCT/ROADMAP-ARCHIVE.md` |
| OF-25 | The shipped Framework layer can name origin-repository-only infrastructure as the thing enforcing a rule. Two sites in `policies/documentation.md` told every Installation that a `.github/scripts/*.py` file enforced a rule it does not have; `grep -rn "\.github/" .kenovis/AI/ \| wc -l` → **2** on 2026-08-13, both fixed in item 37 round 2. | Item 37 round 2, 2026-08-13 | **Open.** Distinct from OF-22: there the citation went stale, here it was never true for the reader it shipped to. Unlike OF-24 this one *does* have an exact mechanical form — the framework layer should contain no reference to `.github/` at all, which is a grep with an empty expected result and no classifier. Deliberately not built now: adding an eleventh guard before item 37 completes is what DECISION-026 and OF-21 forbid, and the honest sequencing is to finish dispositioning the ten before adding one. Priority: Pain high (a customer is told a mechanism protects them and none does, which is worse than saying nothing), Frequency low-medium, Cost low. Take it as the first candidate once item 37 closes. |
| OF-26 | The findings rule reached a session only through a command that named it — 5 of 19, its checkable form 1 of 19. | This session, 2026-08-13, founder-raised | **Fixed** (2026-08-13) — item 39. → `PRODUCT/ROADMAP-ARCHIVE.md` |
| OF-27 | This repository's root `CLAUDE.md` is not the `CLAUDE.md` any Installation gets. The CLI generates a minimal stub (`cli/src/domain/installation.ts` → `claudeStubContent`) that points at `SYSTEM.md`; nothing links the two, so a rule written into this repository's constitution reaches zero customers and reads as shipped. Found while executing item 39, which had planned exactly that and would have shipped nothing. | Item 39, 2026-08-13 | **Open.** Distinct from OF-25 (framework prose naming origin-only infrastructure) and from OF-22 (a citation going stale): here two files are expected by every reader to be the same document and are not. Priority: Pain high — this is DECISION-026's test failing silently, in the file most likely to receive a foundational rule. Frequency low-medium, but every instance is a rule that reaches nobody. Cost unknown; the first output is deciding which of the two is authoritative — the plausible answers are "the stub is generated from `CLAUDE.md`'s framework-level sections" and "root `CLAUDE.md` stops being a rule destination at all", and DECISION-020 already exempted both files from the `.kenovis/` migration, so this is re-opening that boundary rather than a fresh question. Not built here: it is a second change with its own design, and folding it in is OF-18's shape. |

| OF-28 | The rule shipped in item 39 routes findings to six Product-layer destinations, and in a fresh Installation **none of them exist yet**. `runInit` (`cli/src/application/commands/init.ts:131-138`) writes `.kenovis/`, `.setup-pending`, the `CLAUDE.md` stub and its hash — nothing else, correctly, per DECISION-021 ("the CLI never creates a Product-layer file"). `PRODUCT/ROADMAP.md`, `DECISIONS.md`, `AI/memory/learnings.md`, `DOMAIN/` and `ENGINEERING/` are authored later by `/init-project` or `/adopt-project`. So between `kenovis init` and the end of setup, the autoloaded stub names five paths that are not there. | `/analyze`, 2026-08-13 | **Open.** The window is not an edge case: it is the customer's first session, and for `/adopt-project` it is the session that audits an entire existing codebase. The failure is silent in the worst direction — the session reads a rule it cannot follow and has no instruction for that state, so it does what every session did before item 39 and says it in prose. Priority: Pain high (first impression, and the highest-yield session a customer ever runs), Frequency: every single Installation, Cost low — the plausible fix is one paragraph in the stub telling a pre-setup session where findings go until the destinations exist, and setup is already gated by `.setup-pending` so the state is already detectable. Not fixed here: `/analyze` records, it does not implement. |
| OF-29 | `/init-project` and `/adopt-project` have no disposition step for what setup itself surfaces. `grep -ci "Open Findings\|disposition"` over both → **0** on 2026-08-13. `adopt-project.md` uses "finding" in a different sense (line 118, audit facts with a confidence level) and routes those into the reconstructed Product layer, which is correct and unrelated. What has no route is the other kind: the technical debt, defects and security gaps an audit of a real, pre-existing codebase inevitably turns up while reconstructing context for it. | `/analyze`, 2026-08-13 | **Open.** Item 39 deliberately dropped per-command terminal steps as the primary mechanism, and that reasoning holds — but these two commands are not one of nineteen equivalents. They run once per Installation, they are the only commands that read an entire unfamiliar codebase end to end, and they run in exactly the window OF-28 describes, when the destinations do not exist yet. Priority: Pain high, Frequency once per Installation but it is *the* formative session, Cost low. Take it with OF-28 — they are the same window and probably one change. Distinct from OF-21: this is reach, not detection. |

| OF-30 | Item 39 wrote a `Validated when:` condition — a session that runs no command, finds something and does not fix it has a written instruction telling it where that goes — and then closed in the same round on the author's own assertion that it held. No independent check ran. Item 24 (RA1) exists because exactly this shape already failed once: a claim about agent behaviour confirmed by the agent that authored the instruction. | `/explain`, 2026-08-13 | **Open.** The class is items that state a behavioural validation condition and satisfy it by self-report. Item 24 is the instance for decision bodies and is still SCHEDULED and unrun, so the pattern it was written to catch has now recurred before its own fix shipped. Priority: Pain medium — the cost is not that item 39 is wrong (its file changes are verified: 110 CLI tests, ten guards, the rule read back off `cli/dist/`), it is that "the rule works" and "the rule is written" were closed as one claim. Frequency: every item whose target is agent behaviour rather than file content. Cost low if folded into item 24, which needs a vehicle anyway and now has a second one. Recommendation: do not schedule separately — make item 39's condition item 24's second fixture. |

| OF-31 | No role processes a finding. The routing table shipped by item 39 and DECISION-027 routes by *destination file* — roadmap, decisions, learnings, `DOMAIN/`, `ENGINEERING/` — never by *responsibility*. `grep -rn "Open Findings\|disposition" .kenovis/AI/agents/*.md` → **0** on 2026-08-13: not one of the twelve agents knows findings exist. A security finding, an architectural finding and a typo receive identical treatment from whichever role happened to be active in the thread. Roster reach, same day: `finance` and `legal` are cited in **0 of 19** commands and workflows, `ceo` in 1, `marketing` in 1. | `/analyze`, 2026-08-13 | **Open.** The stated operating model is that the role owning the responsibility analyses the discovery; what is built is a shared inbox with a file-kind label. Priority: Pain high — this is the difference between a development organisation and a note-taking system, and it is the half of the model that makes refinement possible at all. Frequency: every finding. Cost unknown; the first output is deciding whether routing-by-role is a step inside the disposition rule or a property of the agents themselves, and whether four inert roster entries are a gap or a deletion. Do not fold into OF-32 — that one is about the missing step, this one is about who takes it. |
| OF-32 | The chain stops at capture. `DISCOVERY → ANALYZE → CLASSIFY → REFINE → PLAN → ROADMAP` is the stated model; what is implemented is `DISCOVERY → a row with one of five dispositions`. `grep -rin "refine" .kenovis/AI/{commands,workflows,policies,agents}` → **2** hits on 2026-08-13, both in `designer.md` and both about visual design. No step in the framework dimensions a finding. The queue's own definition concedes it: "a queued finding is a candidate that is not dimensioned yet" — and **17 of 30** rows are `Open`, which is that state made permanent. | `/analyze`, 2026-08-13 | **Open.** `Open` is a valid disposition and this is what it costs: a finding satisfies the rule forever without ever becoming work. The rule already patched the nearest symptom — an `Open` finding the AI cannot execute must name its executor and the input needed — and that constrains who acts, not whether anything is dimensioned. Priority: Pain high (roadmap integrity: 17 undimensioned rows are unprocessed input, not known future work), Frequency: every round, Cost medium — the plausible shape is an ageing rule, an `Open` row that survives N rounds is refined or re-dispositioned rather than re-read. Depends on OF-31 for who does the refining. |
| OF-33 | Nothing observes. All **11** commands are keyed to a human intention ("Execute when…"); every workflow is entered by a command. `/framework-review` is the only audit pass over the framework's own surface and has never been run (OF-06, Deferred since 2026-08-12). Between sessions the product is unobserved, so continuous observation of the product is a property the operating model claims and the framework does not have. | `/analyze`, 2026-08-13 | **Open.** What exists is good recording of whatever a human happened to trigger, which is a different guarantee and a weaker one. Distinct from OF-26/item 39: that made the rule reach a session that runs no command; this is about there being no session at all. Priority: Pain medium-high, Frequency continuous by definition, Cost unknown and the design question is load-bearing — a periodic sweep must not become an eleventh guard (DECISION-026), and a tool-specific scheduler fails DECISION-010 the way OF-20's hook did. The first output is whether observation is a command a round runs on a cadence, or a step inside the commands that already run. |
| OF-34 | Instrumentation outweighs the product, measured rather than felt: **1198** lines across ten CI guards reaching zero Installations, against **2604** lines of shipped CLI; 18 of 30 queue rows and 11 of 17 `Open` rows about the AI-OS's own bookkeeping; 22 of the last 30 commits touching `.github/scripts`. Eleven releases since the last external validation (`0.3.0`, 2026-08-06). | `/analyze`, 2026-08-13 | **Open — founder call, item 40.** Not a restatement of item 37: that one asks where a rule lives, this asks whether the round should have been spent on a rule at all. The decision needed is a standing constraint — what share of rounds may close on instrumentation before item 33 runs again — and the input is the four figures above plus item 33's cost. Priority: Pain high (it is the founder's stated symptom and it is confirmed), Frequency every round, Cost low to *decide* and zero to measure. |
| OF-35 | The system's own failure to self-detect is recorded eleven times and its detection half has never been scheduled. `grep -c "founder-raised\|founder asking\|raised by a human\|founder-flagged" PRODUCT/ROADMAP.md` → **11** on 2026-08-13. Item 39's own text: "the third time this class has been raised by a human rather than found by the system." Item 32: "Found by the founder asking whether the three founder-call findings were actually planned." OF-17, OF-21 and OF-26 are all founder-raised. This `/analyze` is the twelfth. | `/analyze`, 2026-08-13 | **Open.** The operating model's premise is that the founder does not have to ask; the record shows every structural miss so far was found by asking. OF-21 holds the detection half and has been parked behind item 37 for two rounds while the class recurred twice more, which is the finding restating itself one level up. Priority: Pain high, Frequency: every structural miss to date, Cost unknown — and the honest first output is not a guard but deciding whether detection is achievable at all, or whether the founder-as-detector is a permanent property to be designed around rather than removed. Merge into OF-21 only if that decision says detection is buildable. |

| OF-36 | The document defining Kenovis's operating model did not exist on disk. | `/analyze`, 2026-08-13 | **Fixed** (2026-08-13) — `PRODUCT/OPERATING_MODEL.md`, verbatim with its provenance. Its reconciliation half is OF-39 and item 41 step 3. → `PRODUCT/ROADMAP-ARCHIVE.md` |
| OF-37 | **The three archives are knowledge sinks nothing reads.** `grep -l "ARCHIVE" .kenovis/AI/commands/*.md .kenovis/AI/workflows/*.md` → **no match** on 2026-08-13: not one command or workflow opens `PRODUCT/ROADMAP-ARCHIVE.md`, `AI/memory/LEARNINGS-ARCHIVE.md` or `CHANGELOG-ARCHIVE.md`. `wc -c` the same day: **272,438 bytes archived** against 155,242 bytes active across the same three pairs. The archives are cited only from policy prose as sources for learning ids. | `/analyze`, 2026-08-13 | **Open.** The framework already wrote the rule this violates — `policies/documentation.md` → "An Instruction Is Reachable, And Its Sink Is Read": *"Before writing 'record it in X', ask what reads X and when. A destination nothing consults at decision time is a place to put something down, not a place for it to be picked up."* "Read on demand" is the archive rule's stated contract and no instruction anywhere issues that demand, so in practice archiving is deferred forgetting — which contradicts the operating model's §6/§9 (the Product layer is the persistent memory; the system must not rediscover what it already knows). Distinct from OF-15 (archive *size*, correctly Deferred) and from item 23 (`kenovis context`, a retrieval command blocked behind item 22): both of those assume a reader exists and ask how it scales. This says there is no reader at all, and the cheap half needs no CLI — one line in `bootstrap.md` or in the archive rule naming when an archive is opened. Priority: Pain high and rising with every archive pass (OF-23 is about to move another ~40 KB out of reach), Frequency every session, Cost low for the instruction, unknown for retrieval. |
| OF-38 | **The disposition rule fires at an event that does not exist.** "Before the session ends" is the trigger in all three places the rule is written — `CLAUDE.md` line 48, `.kenovis/AI/SYSTEM.md` line 325, `policies/documentation.md` line 431 (*"when a session ends, so must the session"*) — and nothing defines, detects or signals the end of a session. An agent receives no such event; a thread stops when a human stops typing. `grep -rin "one thread\|one conversation\|per thread\|session boundary" .kenovis/AI/` → **0**, so even the operating model's own §5 premise ("one roadmap item = one conversation") is nowhere in the framework. | `/analyze`, 2026-08-13 | **Open.** This is the mechanical reason findings still die in threads after item 39 shipped: item 39 fixed *reach* (the rule is now loaded unconditionally) and left the *trigger* unchanged, and a rule whose trigger never fires is loaded by every session and applied by whichever one happens to remember. The plausible fix is to re-anchor the rule to an event that does occur — write the finding at the moment it is found, not before some terminus — which is a one-clause change to three files and does not need a guard. Priority: Pain high (it is the last structural gap in the rule item 39 was built to make unconditional), Frequency every session, Cost low. Distinct from OF-33: that says nothing observes between sessions; this says the framework has no notion of a session ending inside one. Take it with OF-28/OF-29 — all three are the same rule failing at its edges. |
| OF-39 | Two Source Of Truth Hierarchies, in the two documents every session loads, and they disagree. | `/analyze`, 2026-08-13 | **Fixed** (2026-08-14) — item 41 step 1, DECISION-031. One hierarchy, in `SYSTEM.md`; `CLAUDE.md` cites it. A third ordering was found in `COMPANY_OS.md` while closing this and is **OF-73**. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-40 | **An analysis can hold the artifact in its hands and file a request that someone create it.** The `/analyze` round that found OF-36 had the founder's operating-model document in its own input, complete and authored, and closed without writing it to disk — recording instead a queue row asking for it, tagged `founder call`. The document would have left with the thread, which is the finding OF-36 states. Second instance of the same class in the same command: item 26 (2026-08-12) closed *"`/analyze` is forbidden from doing what its own Step 9 requires"*, and `analyze.md` now says explicitly that recording *"is not an exception to the line above — it is the difference between analysis and implementation"*. The round read that line and still let "AI must not implement fixes" swallow "write down the thing you were given". Founder-raised, immediately, with three words. | This session, 2026-08-13, founder-raised | **Open.** The mechanism is [[Learning-024]] — a prohibition phrased by mechanism silently swallows a different action — and it survived the round that had already fixed one instance of it, in the command where it was fixed. What is new and is the checkable half: **an artifact supplied by a human in the session is not a finding about an artifact.** A finding gets a disposition; a supplied artifact gets written down, and the two were collapsed. Tagging it `founder call` compounded it — it returned the founder's own text to the founder as a question, which §4 of the document being filed says is the thing that must not happen. Priority: Pain high (it is the invariant failing at the altitude that guards the invariant), Frequency unknown but this is instance two in two days, Cost low to state as a rule and unknown to detect — the plausible half is one clause in `policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected" separating *supplied* from *found*, not a guard. Do not fold into OF-32: that is about undimensioned findings, this is about content that was never a finding. |

| OF-41 | **Item 40's drift measurement excludes the product it is measuring against.** It reads `wc -l .github/scripts/*.py` → **1198** against `find cli/src -name '*.ts' \| xargs wc -l` → **2604** and concludes "repository-only infrastructure is 46% the size of the shipped product". `cli/src` is not the shipped product. `cli/scripts/bundle-framework-assets.mjs` copies `.kenovis/AI/` verbatim into `dist/framework-assets/` — **64 markdown files, 419,098 bytes**, tracked in git (`git ls-files .kenovis \| wc -l` → 64) — and that bundle is what a customer installs; the 2604 lines of TypeScript deliver it. Under the correct denominator the same item's commit breakdown inverts: of its "last 30 commits — `PRODUCT/` 29, `.github/scripts` 22, `.kenovis/AI/policies` 19, `cli` 5", the 19 policy commits are product work by DECISION-026's own definition, and only the 22 are repository-only. Its "18 of 30 queue rows are bookkeeping" classification counts framework-layer rule work the same way. | `/analyze`, 2026-08-13 | **Open.** The drift item 40 names is real and its remedy stands — the ten guards do reach zero Installations, and that is unchanged by this row. What is wrong is the size of it, in the direction that overstates it, and the figures are the stated input for item 40 part 3, a founder decision on what share of rounds may close on instrumentation. Deciding that against a denominator that omits 419 KB of the product sets the constraint wrong. Priority: Pain high (it is input to a standing constraint, not to one round), Frequency once but load-bearing, Cost low — it is a re-count, not new analysis. Take it with item 40 part 3, before that decision is made rather than after. |

| OF-42 | **The founder's model of this product's own layering does not match the repository, and nothing checks that it does.** Stated by the founder on 2026-08-13 while asking this question: *"la carpeta .kenovis es un ejemplo de una build"*. It is not an example and not a build output — `.kenovis/AI/` is the tracked source that `bundle-framework-assets.mjs` publishes, per DECISION-020, and the script's own header says so. The fact is on disk in three places (`ENGINEERING/ARCHITECTURE.md` line 97, the bundle script, DECISION-020's body), which is what makes this a finding rather than a documentation gap: it is written, it is correct, and the person the Source Of Truth Hierarchy ranks above every document does not hold it. | `/analyze`, 2026-08-13 | **Open.** Consequence, not hypothetical: DECISION-026, item 37 and item 39 all turn on "which layer does this rule go in", and each was approved by a founder whose model of the layers differs from the tree. Priority: Pain high — the hierarchy makes the founder the arbiter of every conflict the documents cannot settle, and an arbiter operating on a wrong map of the layers cannot arbitrate layer questions. Frequency: unknown, first measured instance, and it went 14 founder interventions without surfacing. Cost unknown; the first output is deciding whether founder/repo model divergence is detectable at all or is a periodic reconciliation — the same shape as OF-35's honest question, and it should be decided with it. Distinct from OF-36 (the founder's document was missing from the repo); here the repository's fact is missing from the founder. |

| OF-43 | **No document answers "is the AI-OS doing its job", so the answer is re-derived at full cost every time it is asked.** Asked three times on 2026-08-13. Each run bootstrapped, re-measured and re-assembled the same picture out of `PRODUCT/ROADMAP.md` — **104,143 bytes** at the second ask, **115,235** at the third — with the answer spread across item 40 and ten queue rows. `grep -c "founder-raised\|founder asking\|raised by a human\|founder-flagged" PRODUCT/ROADMAP.md` → **14**. | `/analyze`, 2026-08-13 | **Open.** Distinct from the three neighbours it looks like: OF-23 is the file being over threshold (it would still hold at 40 KB), OF-37 is archives having no reader (this is the *active* document), and item 40 part 1 writes the objective in checkable form — a criterion, not a place where the answers to it accumulate. What is missing is one short standing document a closing round updates and the founder reads instead of asking. Priority: Pain high (three full analyses in one day on one question, and the third produced OF-41 — meaning the re-derivation is not even converging), Frequency: every ask, 14 recorded, Cost low. Sequence with item 40 part 1: the criterion and the place that records answers to it are one piece of work, and building the second without the first records nothing. |

| OF-44 | **The core invariant is stated as unbreakable and is enforced nowhere.** `PRODUCT/OPERATING_MODEL.md` §15: *"The system must be designed so that violating this invariant is difficult or impossible."* Measured 2026-08-13: every mechanism in the framework is an instruction an agent may follow — policies, commands, workflows, the routing table, the `Findings this item did not fix:` line. The one class of mechanical enforcement, the ten CI guards, reaches **0** Installations (item 37) and is bypassed in this repository by `gh pr merge --rebase --admin`, the standard merge on every round since `0.6.0` (OF-19). So the invariant holds exactly as often as the agent executing the round chooses to honour it, which is the definition §15 rules out. Fourteen founder-raised instances are the observed failure rate. | Item 41 / `/analyze`, 2026-08-13 | **Open.** Carried by item 41 step 4 as §15's gap, and it is the one row in that item where the honest first output may be *"not fully achievable, recorded as such"* rather than a mechanism — a markdown AI-OS that must stay tool-agnostic (DECISION-010) and ship no runtime (DECISION-013) has no place to stand a hard constraint. Distinct from OF-21 (detecting a miss after it happens) and from OF-19 (guards being bypassable, which is one instance): this asks whether *any* enforcement point exists at all. Priority: Pain maximal — it is the invariant the whole product is built to guarantee, Frequency: every session, Cost unknown and the first output is the design question, not code. Do not schedule a guard for it; DECISION-026 and OF-21 both forbid that until item 37 completes, and a guard would be the eleventh instance of the thing item 41 §15 is about. |

| OF-45b | `claude-info.md` sits untracked at the repository root — the founder's original paste, byte-identical to the operating model. | This session, 2026-08-13 | **Rejected** as work — committing it would create a second copy of the specification outside the Product layer. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-45 | **`PRODUCT/OPERATING_MODEL.md` is untracked.** `git status --short` on 2026-08-13 → `?? PRODUCT/OPERATING_MODEL.md`, plus `?? claude-info.md`, a second copy of the same text sitting outside the Product layer at the repository root. The document item 41 ranks above every other Product-layer file, written to close OF-36, exists only in one working tree and is one `git clean` from gone. | `/analyze`, 2026-08-13 | **Open.** It is the core invariant (§15) failing in physical form, one day after the document was created to state it, and it went unnoticed by the round that created it and by the round that scheduled item 41 around it. Nothing in the framework says a Product-layer write is not durable until it is committed — `policies/git.md` governs commit scope and branch flow, not the durability of a finding's destination. Priority: Pain maximal (total loss of the specification), Frequency: every session that writes to the Product layer and does not commit, Cost trivial to fix for this instance and low for the rule. The instance is the founder's to close (`policies/git.md` reserves commits for explicit human instruction); the rule — *a finding is not recorded until it is committed* — belongs in `policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected". Take it first, before anything else in item 41 or 42. |

| OF-46 | `/next` writes the "Next" pointer and no `/next` is told to read it. | `/analyze`, 2026-08-13 | **Fixed** (2026-08-13) — item 42 parts 2-3, `commands/next.md` 2.6 Step 3, DECISION-030. The row's 131 KB figure was stale on execution; the file read 153,375 bytes (OF-04). → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-47 | `/next` has no behaviour for an item that only a human can execute. | `/analyze`, 2026-08-13 | **Fixed** (2026-08-13) — item 42 parts 2-3, `commands/next.md` 2.6 Step 3, DECISION-030. Descending the priority order is now forbidden in those words. Residues: OF-70, OF-71. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-48 | **`/explain` instructs the opposite of the unconditional findings rule.** `commands/explain.md` → "Documentation Opportunity": *"If an explanation reveals missing knowledge: **Recommend** creating documentation in PRODUCT/, DOMAIN/, ENGINEERING/, `docs/`."* Recommending is prose, which the dispos... | `/analyze`, 2026-08-13 | **Fixed** (2026-08-14) — item 42 part 4. `commands/explain.md` 2.0 → 2.1: "Documentation Opportunity" cites the disposition rule instead of saying "recommend", and `docs/` is gone. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-49 | **The stated end condition is a state with no defined behaviour.** Addendum A §4: the loop runs *"hasta que no haya nada en el roadmap del producto"*. | `/analyze`, 2026-08-13 | **Fixed** (2026-08-14) — item 42 part 5. `commands/next.md` 2.8 → 2.9 Step 3 gains "When The Roadmap Is Empty": define empty as all three inputs empty, name which of the two meanings applies, do not invent work, stop and record. The observation half stays OF-33. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-50 | The specification is not on any session-initialization path. | `/analyze`, 2026-08-13 | **Fixed for this repository** (2026-08-14) — item 41 step 1, DECISION-031: named in `CLAUDE.md` 2.4, `SYSTEM.md` 1.8 and `bootstrap.md` 2.8. The framework half — whether every Installation authors one — is **OF-72**, a founder call. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-51 | **Every thread pays the whole roadmap, and the roadmap is 76% of what a thread reads.** Measured 2026-08-13: `PRODUCT/ROADMAP.md` **131,511 bytes** against `COMPANY_OS.md` 9,799 + `.kenovis/AI/SYSTEM.md` 9,117 + `CLAUDE.md` 6,251 + `PRODUCT/OPERATING_MODEL.md` 16,127 — 172,805 bytes total on the mandatory path, before `DOMAIN/`, `ENGINEERING/`, `AI/memory/` or any implementation file. Under Addendum A's one-thread-per-item cadence that is paid once per roadmap step, not once per working day. | `/analyze`, 2026-08-13 | **Open, and it is OF-23 with the cadence applied — do not treat it as a separate work item.** What it changes is OF-23's priority, not its content: before Addendum A, the roadmap's size was a slow leak against an unbounded number of sessions; now it is a fixed toll multiplied by the exact number of steps left on the board. The archive pass is written, has been run twice, and is the single cheapest change available. Priority: Pain high and now quantified, Frequency: every thread the founder opens from here on, Cost low and known. **Run it before item 41 step 2 and before item 42.** Recorded as its own row rather than folded into OF-23 only because the multiplier is new information; the work is OF-23's. |

| OF-52 | **Twelve of nineteen commands and workflows still route a finding nowhere, and three of them are the ones that run.** Post-item-39 count, `grep -ci "Open Findings\|disposition\|Findings this"` per file on 2026-08-13: `next` 3, `analyze` 1, `bug` 1, `commands/review` 1, `workflows/review` 1 — and ... | `/analyze`, 2026-08-13 | **Fixed** (2026-08-14) — item 42 part 4, as an audit rather than an edit sweep. Three contradicting instructions found and fixed (`workflows/framework-review.md`, `commands/release.md`, `workflows/bugfix.md`); the row's own count was wrong in both directions and is corrected in the progress block. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-53 | `/next` Step 11 validated a kind of change this product rarely makes — none of its four checks touch a markdown file, and most rounds change only markdown. | `/analyze`, 2026-08-13 | **Fixed** (2026-08-14) — `commands/next.md` 2.9 → 2.10 Step 11 splits code-artifact from document-artifact validation; the latter names `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" as the form. Anchoring grep: 0 → 2. → `PRODUCT/ROADMAP-ARCHIVE.md` |
| OF-54 | **`/next` → "Autonomous Mode" contradicts the founder's supplied cadence.** The command says *"Claude may continue through multiple roadmap items."* `PRODUCT/OPERATING_MODEL.md` → Addendum A §1 says one thread executes one `/next`. | `/analyze`, 2026-08-13 | **Fixed** (2026-08-14) — item 42 part 4, DECISION-034. `commands/next.md` → "Autonomous Mode" defers to the Installation's own `PRODUCT/OPERATING_MODEL.md`; the framework default is one item per round. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-55 | **The Agent Roster has no role that owns the framework layer, which is what this product is.** `/next` Steps 4-6 select from product-manager, cto, designer, frontend, backend, database, security, reviewer. Most rounds on this board edit policies, commands, workflows and templates under `.kenovis/AI/` — the deliverable per DECISION-026 — and no listed role owns that. `grep -n "framework\|policy\|markdown" .kenovis/AI/agents/*.md` → **3** hits across twelve agent files. | `/analyze`, 2026-08-13 | **Open.** Distinct from OF-31, which is that no agent knows findings exist; this is that no agent owns the product's own material, so §12's "the role that owns the responsibility processes the discovery" has no owner to name for the most common change this repository makes. It defaults to `cto` by absence, never by selection. Priority: Pain medium-high — it is §12 and §3 failing for the modal case rather than an edge one, Frequency: most rounds, Cost unknown: the first output is whether this is a missing role, a widened `cto`, or evidence that framework work is genuinely this repository's own concern and not an Installation's — which would make it a `/framework-review` question (OF-06, Deferred) rather than a roster gap. Decide it with OF-31, inside item 41 §12; they are one design conversation. |

| OF-56 | **A relative link written inside `PRODUCT/` resolves from `PRODUCT/`, and nothing says so.** `check_links.py` caught a markdown link in `PRODUCT/ROADMAP.md` whose target was written repository-relative (`PRODUCT/OPERATING_MODEL.md`) rather than sibling-relative — it resolves to `PRODUCT/PRODUCT/O... | This session, 2026-08-13 | **Fixed** (2026-08-14) — item 42 part 4. `policies/documentation.md` 3.6 → 3.7 gains "A Path In These Documents Is Written Repository-Relative, In Backticks". The guard's inline-code blind spot is not fixed and is OF-25's class. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-57 | `.kenovis/AI/SYSTEM.md` denied the operating model's §1 in its Final Principle, and shipped that denial to every Installation. | This session, 2026-08-13, founder-raised | **Fixed** (2026-08-13) — DECISION-028. What remains is OF-58. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-58 | **"The AI is not an autonomous decision maker" is unscoped, and as written it contradicts §4 and §17.** `.kenovis/AI/SYSTEM.md` line 43 and `CLAUDE.md` line 17, both loaded unconditionally. The operating model splits ownership rather than denying autonomy: §4 gives the founder product direction, strategy, business decisions and approval, and gives Kenovis *"engineering awareness, technical debt tracking, architectural consistency, technical planning, discovery tracking, roadmap completeness"*; §17 states *"Kenovis owns the continuous engineering process of the product."* An unscoped denial of decision-making covers the engineering half the model explicitly assigns to Kenovis. | This session, 2026-08-13, founder-raised | **Open.** Distinct from OF-57, which is a flat contradiction needing a founder call: this one is a scoping defect with an obvious correct form — the sentence is right about business, product and strategic decisions and wrong about engineering ones, and adding the scope makes it agree with §4 instead of fighting it. Recorded separately so it is not settled by whatever OF-57 decides; the replacement question and the autonomy question are different, and collapsing them would let a "no" on OF-57 silently keep the unscoped denial. Priority: Pain high (it is the sentence that governs what a round believes it may do without asking, which is §3's *"the founder should NOT need to ask"*), Frequency: every session, Cost low. Take it with OF-57 inside item 41 step 3. |

| OF-59 | A rejected item was still cited as the live plan inside recorded knowledge — three instances. | This session, 2026-08-13 | **Fixed** (2026-08-13, founder instruction) — deleted in place, each leaving a dated note. Detection stays OF-22. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-60 | `/bootstrap` never checked the branch it is on is current with the remote, and the standard merge leaves it stale in either direction. | This session, 2026-08-13 | **Fixed** (2026-08-13, item 42 part 1) — `commands/bootstrap.md` 2.7 Step 5 and `policies/git.md` 2.3 → "Rebasing" require the branch be verified level with its remote before any work; validated live, unplanned, on the very next merge this repository ran. → `PRODUCT/ROADMAP-ARCHIVE.md` |
| OF-61 | **Two lifecycle rules cannot both be satisfied at steady state, and running one to completion broke the other.** The archive pass of item 42 part 1 moved the last four inline DONE narratives out of `PRODUCT/ROADMAP.md`, which took `check_item_findings.py`'s population to **0 closed items with a narrative, 39 archive pointers** — and the guard failed the repository, because an empty population was hardcoded as `"nothing to check, which is not a pass"`. The repository had done exactly what `policies/documentation.md` → "Closed Work Is Archived, Not Kept Inline" requires. | Item 42 part 1, 2026-08-13 | **Open, with the instance fixed.** The empty case now splits: no items *and* no pointers is a missing corpus and still fails; no items *with* pointers is the archive rule having completed, and passes while stating plainly that it checked nothing. What stays open is the consequence, which is worse than the bug: in a fully-archived roadmap this guard is now **permanently inert** — its population empties as an intended side effect of another rule, and the fix makes that inertness pass silently. So the one mechanical check on the findings rule enforces nothing here from now on, exactly as the rule's own population moved from items to sessions. Priority: Pain high (an enforcement mechanism reaching zero by correct action, invisibly), Frequency: permanent from this round, Cost unknown — it is OF-21's question arriving from the other side and should be decided with it, not before item 37 completes and not as an eleventh guard (DECISION-026). |

| OF-62 | **The archive rule has been run to its limit and the document is still 2.1× its threshold.** `PRODUCT/ROADMAP.md` after the fullest archive pass ever run: **129,094 bytes** against 60 KB, and every remaining byte is live by definition — 42 `Open` queue rows (~54 KB) and the scheduled items 22, 23, 24, 32, 33, 37, 38, 40, 41, 42 (~41 KB), plus ~22 KB of phase narrative. Nothing further is archivable without archiving open work, which the rule explicitly forbids ("archiving a document that still holds the only copy of an unresolved finding is how a visible backlog becomes an invisible one"). | Item 42 part 1, 2026-08-13 | **Open.** This is OF-32 made structural rather than preferential: the bound on this document now depends entirely on findings being *resolved or rejected*, and 42 of them are `Open` and undimensioned. The lifecycle rule has no remaining lever. Distinct from OF-23/OF-51, which are about the pass not being run — it has now been run, at full scope, with the rule widened, and this is what is left. Distinct from OF-15, which is about archive size. Priority: Pain high and now bounded from below (129 KB is the floor until the queue drains, and it is paid once per thread under Addendum A §1), Frequency: every thread, Cost: it is OF-32's cost, not a new one. Do not schedule a fourth archive pass against it — there is nothing left to move. |

| OF-63 | A learning's `Disposition:` named an unpromoted rule, gave it no id, and `check_future_actions.py` passed because the `Future action:` line cited other real ids. | This session, 2026-08-13, founder-raised | **Fixed** (2026-08-14) — item 41 step 2. The rule it parked is promoted: `policies/documentation.md` 3.6 → "An Instruction Is Reachable, And Its Sink Is Read", third failure mode, from [[Learning-036]]. Its plausible home was recorded as `testing.md` and was wrong. The mechanical half — that guard reads `Future action:` and not `Disposition:` — stays with OF-21. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-64 | **`CHANGELOG.md`'s `[Unreleased]` section carries two `### Changed` headings with `### Added` between them.** Read off the file 2026-08-13: `### Changed` (1 bullet), `### Added` (2 bullets), `### Changed` (9 bullets). Keep a Changelog, which the file's own header cites, defines one section per change type. `check_changelog.py` passes — it verifies a bullet exists for a framework-layer change, not the section structure. | This session, 2026-08-13 | **Open.** Low severity and recorded because of where it lands rather than what it costs today: `[Unreleased]` is cut verbatim into a released section at release time, and `policies/documentation.md` → "Closed Work Is Archived, Not Kept Inline" forbids editing released prose afterwards — so a structural defect in `[Unreleased]` becomes permanent the moment a release ships, and every future round appending a `Changed` bullet has to guess which of the two to use. This round guessed. Priority: Pain low now and unfixable later, Frequency: every release cut, Cost trivial before the cut and zero-after-impossible following it. Take it as a step of the next release, with the changelog trim that `policies/documentation.md` already schedules there. |

| OF-65 | **The rule this round shipped is unrunnable as written in the repository that shipped it.** `commands/bootstrap.md` 2.7 Step 5 and `policies/git.md` 2.3 both instruct `git fetch origin`. In this repository `origin` is an SSH remote with no key available to the session: every `git fetch origin` and `git push origin` this session attempted exited `128` with `git@github.com: Permission denied (publickey)`, and each one had to be reissued against an explicit HTTPS URL with `gh auth git-credential`. It is also the mechanical reason `gh pr merge --delete-branch` cannot level the checkout, so OF-60's failure fires on **every** merge here rather than occasionally. | This session, 2026-08-13, founder-raised | **Open, and it splits into two halves that must not be merged.** The *instance* is local configuration and the founder's to close — one line switching `origin` to HTTPS or configuring the credential helper globally — and is deliberately not being changed by this round, since a session rewriting a human's git remote is not its call. The *product* half is a real defect in what shipped: the new rule names a command and has no branch for that command failing, so a session that follows it and gets exit `128` has an instruction that ends and no stated next step. It will fail the same way for any Installation whose remote the agent cannot reach — a common shape, not an exotic one. Priority: Pain high for the product half (a session-start check that errors out is worse than none, because it reads as a broken repository rather than as a missing credential), Frequency: every session in such an Installation, Cost low — one clause stating what to do when the fetch fails, which is to say so and stop rather than proceed on unverified local state. Take it with item 42 part 2, which is already editing `next.md`'s session-start behaviour. |

| OF-66 | **Six `Open` rows predate DECISION-029's dimensioning rule and do not meet it.** Read off the file 2026-08-13: of **47** `Open` rows, **41** carry Pain, Frequency and Cost and **6** do not — OF-02, OF-03, OF-04, OF-10, OF-11, OF-14. OF-10 and OF-11 name their executor and their input, which is the other half of the rule, and still carry no ranking terms; OF-02 and OF-03 carry a precedent argument ("six for six such runs have found a maximal-Pain defect") that is stronger than most rows here and is not in the form `/next` ranks. | This session, 2026-08-13, founder instruction (DECISION-029) | **Open.** Backfill, not re-analysis: each row already contains the reasoning, and what is missing is stating it in the three terms. Recorded rather than fixed in the same round on purpose — a rule and its first exception written in one change makes the exception invisible, and this way the six are a queue row someone can check. Priority: Pain low (these six are the best-known rows on the board, so the ranking failure they cause is small *here* — it is a fresh Installation with no such familiarity that the rule protects), Frequency: once, then never again, Cost low — six lines, no new investigation. Take it with any round already editing the queue. |

| OF-67 | **The framework policy now ranks findings by terms whose definition ships only in a file the customer owns.** `policies/documentation.md` 3.5 requires Pain, Frequency and Cost on every `Open` row. The formula those terms come from — `(Customer Pain × Frequency × Business Impact)` — is at `.kenovis/AI/templates/product-layer/PRODUCT/ROADMAP.md:246`, a Product-layer template: authored once at setup, never touched by `sync` (DECISION-021, RULE-INST-01), and freely editable by the Installation afterwards. `grep -rn "Pain" .kenovis/AI/policies/ .kenovis/AI/commands/` → **0** before this round and the policy still does not define the terms, only require them. So a customer can hold a loaded policy citing a ranking their own roadmap no longer describes, and every `sync` will keep the policy current while the definition drifts. | This session, 2026-08-13, DECISION-029 consequences | **Open.** Same class as OF-25 — the shipped framework naming something the reader does not have — but the inverse direction: there the mechanism was absent, here the *definition* is present and mutable. Two candidate fixes and the choice is the first output: state the three terms in `policies/documentation.md` itself (policy becomes self-contained, and duplicates a definition, which is what OF-24's "Single Source of Truth" section now forbids), or have the policy cite the roadmap section by name so the drift is at least visible when it happens. Priority: Pain medium (a rule that cannot be applied reads as compliance theatre in exactly the Installations that have no habit to fall back on), Frequency: every finding in every Installation, Cost low. Do not add a guard for it — DECISION-026 and OF-21, item 37 is still mid-flight. |

| OF-68 | `DECISIONS.md` → "Document Layers" restated in prose two counts the Decision Index already carries as marks, and both went stale on every append — three corrections in eleven decisions. | This session, 2026-08-13 | **Fixed** (2026-08-14) — item 41 step 2. The counts are deleted; the paragraph names what `‡` and `★` mean and gives the two commands that produce the numbers. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-69 | **A merge that lands on the remote and fails locally prints only the failure, so the session reads it as "the merge did not happen".** Reproduced on PR #107, 2026-08-13: `gh pr merge 107 --rebase --admin --delete-branch` output nothing but `fatal: Could not read from remote repository.` and `! warning: not possible to fast-forward to: "development"` — while `gh pr view 107` reported `MERGED` at `16:16:13Z` with merge commit `4ad5db6`. The remote half had succeeded. The local half — delete the feature branch, check out the base, fast-forward it — needed `origin` over SSH (OF-65) and died, after the checkout had already moved. Net state: working tree on a `development` **1 commit behind**, with the local feature branch gone and `git status -sb` printing a clean `## development...origin/development`, because the tracking ref was never updated either. | This session, 2026-08-13, reproduced live | **Open.** Distinct from the two findings it sits between, checked against both before taking an id: OF-60 is `/bootstrap` not verifying currency at session start, OF-65 is the `git fetch origin` instruction having no branch for exit `128`. Neither covers a **composite command whose halves have different outcomes and whose output reports one of them**. The danger is specific and not hypothetical — a session that believes the merge failed will retry it, re-open the PR, or rebuild the branch, and every one of those acts on a repository where the work already landed. Priority: Pain high (a wrong belief about whether a merge happened is upstream of every recovery action a round would take), Frequency: every merge in an Installation whose remote the agent cannot reach over the configured transport, Cost low — the rule is to confirm the merge from the *PR's* state rather than the command's exit, then repair the local checkout, which is two commands. Belongs with OF-65 in item 42 part 2, which is already editing session-start git behaviour; the two are one clause about not trusting a git command's own report over the artifact's state. **Second instance, same day, on the PR that queued this row:** `gh pr merge 108 --rebase --admin --delete-branch` produced the identical output and `gh pr view 108` returned `MERGED 2026-08-13T16:19:38Z 0d539c5`. Two for two, so the Frequency term above is measured rather than predicted, and the repair is confirmed as two commands (`fetch` over HTTPS with an explicit refspec, then `merge --ff-only`). **Further instances are not individually recordable and this row is closed to them** — each merge here reproduces it by construction, so appending one line per merge would grow the document this queue is already over threshold on (OF-23, OF-62) while adding nothing to the disposition. The next thing worth writing about OF-69 is its fix. |

| OF-70 | The `Next` pointer became load-bearing and nothing held a round to writing one; Step 3's no-pointer fallback made an omission read as intended behaviour. | Item 42 parts 2-3, 2026-08-13 | **Fixed** (2026-08-14) — item 41 step 2's residue, DECISION-033. `commands/next.md` 2.8 Step 13 requires a `Next:` line carrying the ranking, or the word `none` with why. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-71 | **The new stop-branch names a file to record in and no section of it.** `commands/next.md` 2.6 Step 3 says to *"record in `PRODUCT/ROADMAP.md` that this round reached that item and stopped, and on what it is blocked"*. That document has three places a round writes: an item's progress narrative, the `Open Findings` queue, and the `Next` pointer. A stopped round produced no progress on the item, found no new finding, and did not change the ordering — so all three are wrong-shaped, and the instruction resolves to "somewhere in a 150 KB file". | Item 42 parts 2-3, 2026-08-13 | **Open.** Half-compliant with `policies/documentation.md` → "An Instruction That Produces An Artifact Names Where It Goes": it names the file, which is the half that stops the artifact from being invented in `.kenovis/` (DECISION-024), and omits the half that makes it findable. Written into the command anyway rather than held back, because a stop with an imprecise record is strictly better than a stop with none — and recorded here so the imprecision is a queued row rather than a thing the next round discovers while blocked. Priority: Pain medium (it fires on the very next round, which is a founder call), Frequency: every blocked round, Cost low — the plausible answer is a dated line under the item the round stopped on, but that is a judgement about this document's structure and belongs with whoever takes OF-70. |

| OF-72 | The hierarchy shipped to every Installation had a rank 1 no Installation has: neither setup command asked for `PRODUCT/OPERATING_MODEL.md` and no template existed. | Item 41 step 1, 2026-08-14 | **Fixed** (2026-08-14, founder answered in session) — item 41 step 2, DECISION-032. Every Installation authors it at setup, before `COMPANY_OS.md`, from a template the AI may never answer itself; rank 1 stops being conditional. The migration gap it leaves is **OF-78**. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-73 | A third Source Of Truth ordering, in `COMPANY_OS.md` → "Knowledge Hierarchy", inverting DOMAIN/ and PRODUCT/ against DECISION-031 and omitting `DECISIONS.md`. | Item 41 step 1, 2026-08-14 | **Fixed** (2026-08-14) — item 41 step 2, DECISION-032. Now "What Each Document Defines", stating no precedence and citing `SYSTEM.md`. The row called it Product-layer only; the **template** carried it too, so the framework was shipping the third ordering — corrected in both. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-74 | **`--force-with-lease` is inert when the push target is a URL instead of a tracked remote, and this repository can only push by URL.** `grep -cin "force-with-lease" .kenovis/AI/policies/git.md` → **3**, mandated in all three ("Use `--force-with-lease`, never `--force`"). The lease compares against the *remote-tracking ref* for the branch. Pushing to an explicit HTTPS URL creates no such ref, so the lease has no baseline: here it exited `! [rejected] (stale info)` and refused a legitimate push. That is the safe direction. The unsafe one is the same mechanism with a stale tracking ref, where the lease passes against a baseline that is no longer what the remote holds — protection that reports success and checked the wrong thing. Reached by URL because `origin` is SSH with no key available (OF-65), which makes URL pushes this repository's only path rather than an unusual one. | This session, 2026-08-14, hit live | **Open.** Distinct from OF-65, checked before taking an id: OF-65 is `git fetch origin` exiting `128` with no instruction for the failure; this is a *different command* whose stated safety property silently does not hold under the workaround OF-65 forces. Cost is low and the fix is known because this session used it — `--force-with-lease=<ref>:<sha>` with the remote SHA read from the API first, which restores the guarantee explicitly instead of relying on a ref that does not exist. Priority: Pain high (a safety rule that is inert is worse than an absent one, because it is cited as the reason force-pushing is acceptable), Frequency: every force-push in an Installation whose remote the agent reaches by URL, Cost low. Take it with OF-65 in item 42 part 2, which is already editing session-start git behaviour. |

| OF-75 | **Nothing in the framework covers a stacked pull request, and the standard merge breaks one by construction.** `grep -cin "stacked\|dependent branch" .kenovis/AI/policies/git.md` → **0**. This session opened PR #111 from PR #110's head. Merging #110 with `gh pr merge --rebase` rewrote its commits onto `development`, and #111 immediately went `CONFLICTING/DIRTY` carrying **3 commits** — its own plus two whose content was already merged under different SHAs. `policies/git.md` → "Rebasing" tells you to rebase and resolve, which here means resolving conflicts between a branch and an already-merged copy of itself: the most error-prone form of the operation, on the one occasion when a wrong resolution silently drops merged work. | This session, 2026-08-14, hit live | **Open.** The recovery is the reusable part and is what makes this cheap rather than theoretical: capture the target tree hash **before** the base merges, rebuild the branch on the new base, and assert tree equality rather than reading the diff. Run here, and the assertion earned its keep on the first attempt — `git add -A` had staged `claude-info.md`, the untracked file OF-45b rejects committing, and the tree hash caught it where a diff review plausibly would not have. Recorded in [[Learning-035]]. Priority: Pain high when it fires (the failure mode is losing merged work while believing a conflict was resolved), Frequency low-medium (any round that opens a PR on an unmerged branch, which this session did once in five), Cost low — a `policies/git.md` section stating the sequence and the assertion. Take it with OF-74; both are `git.md` and both were found by the same merge. |

| OF-76 | The Conformance table shipped to an Installation as a one-row form and no instruction built the other rows, so the criterion was inert everywhere but this repository. | Item 41 step 2, 2026-08-14 | **Fixed** (2026-08-14) — item 41 step 2's residue, DECISION-033. `commands/next.md` 2.8 Step 13 builds the table when it is still the form, `unmeasured` where unverified; the template (1.1) names Step 13 as the owner and defines `unmeasured`. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-77 | The standing criterion was load-bearing with nothing holding a round to it, and re-verifying one row leaves the other sixteen stale. | Item 41 step 2, 2026-08-14 | **Fixed** (declaration half, 2026-08-14) — item 41 step 2's residue, DECISION-033: `commands/next.md` 2.8 Step 13 requires an `Operating model section served:` line naming the section or `none`. The staleness half is **OF-79**. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-78 | **A Product-layer fix reaches no Installation that already ran setup, and this round shipped two of them.** `sync` mirror-replaces `.kenovis/` and never writes the Product layer (RULE-INST-01), so: an Installation created before DECISION-032 has no `PRODUCT/OPERATING_MODEL.md` and nothing gives it one — `SYSTEM.md` 1.9 names the state and routes it to the owner, which is an instruction, not a migration; and an Installation that already authored its `COMPANY_OS.md` from the old template still holds the third Source Of Truth ordering OF-73 closed, in a document the corrected hierarchy ranks at 2. Both are correct by RULE-INST-01 and both are silent. | Item 41 step 2, 2026-08-14 | **Open.** [[Learning-034]]'s second half stated the class — a rule with one framework home can have as many Product-layer contradictions as there are customers — and this is its first instance with a count: two, in one round, in the two highest-ranked documents. Distinct from OF-27 (two files expected to be the same document and not) and from item 22 (a framework path moving under an Installation): here nothing is broken, the Installation simply keeps an old correct-looking answer forever. Cheapest honest shapes, and choosing is the first output: `sync` reports Product-layer documents whose template changed materially since setup, without writing anything; or a `/next` step that reconciles one Product-layer document against its template when the framework version moves. The second is closer to how this framework already works and neither is free. Priority: Pain high (the rank-1 case means an Installation runs with no criterion at all, which is item 40 shipped to a customer), Frequency: every Installation that predates a Product-layer change — currently every existing one, Cost unknown and genuinely a design question. Do not fold into item 22: that is a decision-log migration with its own ADR requirement, and this is about content the customer owns. |

| OF-79 | **A conformance row is re-verified only when a round happens to serve its section, so sixteen of seventeen rows go stale per round.** OF-77's second half, split out when its declaration half was fixed rather than left riding on a closed row. `commands/next.md` 2.8 Step 13 requires the round to update *the row for the section it served*, which is correct and bounded, and says nothing about the rest; the table's own text says a row's state is read off the tree with the command in the row. Those two hold together only if something re-reads the untouched rows, and nothing does. Measured: this round re-verified **1** of **17** rows (§15), the previous round **4** of **17**, and `PRODUCT/OPERATING_MODEL.md`'s table is dated as a full pass on 2026-08-14 — a date that starts decaying the moment the next round closes. | Item 41 step 2's residue, 2026-08-14 | **Open.** Deliberately not fixed with its declaration half, and the reason is a cost the fix cannot avoid: a full re-verification is seventeen commands per round, against a table read a few times a week, and that price is paid by every Installation on every round forever. So the first output is a design question and not a clause — plausible shapes are a full pass on a cadence rather than per round (every Nth round, or at release), a per-row `as of` date that makes staleness visible without removing it, or accepting decay and stating the table is a sampled report rather than a current one. Priority: Pain medium (a stale `Present` is the exact failure the table exists to prevent, and OF-04 has seven consecutive instances of restated figures going stale), Frequency: every round, Cost unknown pending the shape. Do not add a guard: DECISION-026, OF-21, item 37 is mid-flight. Sequence it after item 42 — the table is not yet load-bearing enough to pay a per-round toll for. |

| OF-80 | **A round's output can end the session uncommitted, and nothing in `/next` says otherwise.** `grep -cin "commit\|pull request\|\bPR\b\|push" .kenovis/AI/commands/next.md` → **0**, and its Completion Criteria list eight conditions, none of them about the work reaching a branch. | This session, 2026-08-14 | **Fixed** (2026-08-14) — item 42 part 4. `commands/next.md` Completion Criteria gains a ninth condition: the round's work has reached a branch, deferring to `policies/git.md` for how. → `PRODUCT/ROADMAP-ARCHIVE.md` |
| OF-81 | **`workflows/roadmap.md` selects work the way `/next` did before its last four rounds, and disposes of nothing.** Phase 2 reads `PRODUCT/ROADMAP.md` for the "next priority item" — it does not know the `Open Findings` queue exists, and it does not know about the `Next` pointer, both of which are now load-bearing inputs to the same decision in `commands/next.md` Step 3. Phase 12 updates "Status, Progress, Decisions, Next steps" and has no disposition step, no `Findings this item did not fix:` line and no operating-model declaration. `grep -niE "finding\|discover\|debt\|Open Findings" .kenovis/AI/workflows/roadmap.md` → **0** across 321 lines. | Item 42 part 4's OF-52 audit, 2026-08-14 | **Open.** Found by the audit and deliberately not fixed in it: the fix is not text, it is a design question the audit was not scoped to answer. This workflow and `commands/next.md` describe the same job — bootstrap, select the roadmap item, run product and technical analysis, implement, validate, update the roadmap — and one of them has had four rounds of correction while the other has had none. So the first output is deciding whether `workflows/roadmap.md` is still warranted at all, or is `/next`'s predecessor left in the tree; if it is warranted, the second output is what it holds that `/next` does not, because right now the honest answer looks like "nothing, in a staler form". Distinct from OF-52, which was about local instructions contradicting an inherited rule — this file contradicts nothing, it is simply behind. Priority: Pain medium (it ships to every Installation and a session that reads it gets a worse selection model than the command beside it), Frequency unmeasured — nothing in the framework routes to this workflow, which is itself part of the finding, Cost low if the answer is deletion and medium if it is convergence. Do not fold into OF-52; that one is closed and this is a different question about a different file. |
| OF-82 | **The metric this framework uses to measure a rule's reach misclassifies in both directions, and it was the input to a ranking.** OF-52 counted per-file reach of the findings rule as `grep -ci "Open Findings\|disposition\|Findings this"` and reported **12 of 19** commands and workflows routing findings nowhere, naming seven commands and "all six remaining workflows". Re-measured 2026-08-14 before any edit: there are **seven** remaining workflows, not six; `commands/architect.md`, `commands/feature.md` and `workflows/hotfix.md` all scored **0** while all three cite `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected" by its exact title in a correct, load-bearing instruction; and the true silent population was **11**, not 12. So the proxy produced three false positives and one miscount, and the number it produced is what OF-52's scoping and its rank on the `Next` pointer were argued from. | Item 42 part 4's OF-52 audit, 2026-08-14 | **Open.** The instance is corrected in item 42 part 4's progress block and the correct measure — `grep -rl "A Finding Is Fixed, Scheduled, Or Rejected"`, the policy section's exact title — is what this round used. The class is not corrected and is what this row carries: this framework's rules are enforced by prose, so "does this file carry rule X" is a question it asks constantly, and it answers it with whatever keyword the asking round improvises. `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" requires the command to be stated, which made this detectable — it does not require the command to measure what the sentence claims, and a stated command that answers a nearby question is more convincing than no command at all. Priority: Pain medium-high (a wrong reach count suppresses or inflates a finding's rank, silently, and this one survived into a shipped queue row and a pointer), Frequency: every round that measures reach, which is most of them, Cost: first output is deciding whether "cite the section by its exact title" becomes a stated convention for framework cross-references — cheap if so, because it makes reach greppable by construction. Not a guard: DECISION-026, and a guard here reaches **0** Installations. |
| OF-83 | **The operating-model template asks the owner four questions and none of them is the cadence the framework now defers to.** DECISION-034 makes `commands/next.md` obey a cadence stated in an Installation's own `PRODUCT/OPERATING_MODEL.md`, and `.kenovis/AI/templates/product-layer/PRODUCT/OPERATING_MODEL.md` gives that owner no place to state one. So the deference is real and unreachable: an Installation gets the one-item-per-round default and no invitation to change it. | Item 42 part 4, DECISION-034, 2026-08-14 | **Open, and the failure direction is deliberate** — an Installation that says nothing gets the default, which is the safe half. This is `policies/documentation.md` → "An Instruction Is Reachable, And Its Sink Is Read", third failure mode: a rule over a population, shipped without whatever creates the population. Recorded rather than fixed in the same round because the template is the one Product-layer document the AI may never answer on the owner's behalf (DECISION-032), so adding a fifth question is a change to what setup asks a human, not a wording fix — and it belongs with whoever next opens the setup commands. Priority: Pain low today and rising with the second Installation (this repository's cadence is stated in Addendum A and is read), Frequency: once per Installation, at setup, Cost low — one question in the template and one line in each setup command's step. Take it with OF-78, which is the same question from the other side: how a Product-layer template change reaches an Installation that already ran setup. |
| OF-84 | **Three promoted learnings are marked `Fixed as a rule` and their target files do not cite them.** `AI/memory/learnings.md` → "Promoted And Archived" requires, for a clean close, that the destination policy "cites the learning id, so the reasoning is one hop away" — `check_learning_promotions.py` enforces exactly this for any destination phrased as a policy section. Learning-032 (→ `policies/documentation.md`, DECISION-029), Learning-033 (→ `commands/next.md`, DECISION-030) and Learning-034 (→ `SYSTEM.md`, DECISION-031) all name a real destination with a real rule in it; `grep -n "Learning-032\|Learning-033\|Learning-034" .kenovis/AI/policies/documentation.md .kenovis/AI/commands/next.md .kenovis/AI/SYSTEM.md` → **0** in all three. Found while running this round's own learnings archive pass (item 42 parts 4-5), which archived Learning-036/037/038 cleanly and left these three inline for exactly this reason rather than force the citation through. | This round's archive pass, 2026-08-14 | **Open.** Not the same defect as OF-63, which was a `Disposition:` field naming no id at all — these three name real destinations and the destinations are simply silent about which learning put the rule there. Cost is one line per file: add "(`AI/memory/learnings.md` Learning-0NN.)" at the point each rule appears, the same shape Learning-036's own citation already uses. Priority: Pain low (the citation is a convenience for whoever opens the policy wondering why a clause exists, not a correctness gap), Frequency: grows by one every time a round promotes a learning without adding the citation in the same edit, which is exactly how these three accumulated, Cost low. Once cited, all three archive in one pass alongside whatever is inline by then. |

| OF-85 | **A round that fixes and archives a queue row in the same pass can update its disposition without compacting it.** Closing OF-48, OF-52, OF-54, OF-56, OF-80 and OF-49 in item 42 parts 4-5's own archive pass copied each row to `PRODUCT/ROADMAP-ARCHIVE.md` and rewrote its disposition to `Fixed... → archive`, but left the Finding and Source columns at their original, full length in the active file. `policies/documentation.md` → "Closed Work Is Archived, Not Kept Inline" says a compacted row "stays as one line — id, the finding in a clause, its disposition, and the pointer"; these six rows average well over 400 characters of Finding text each, none of it a clause. So the active document paid for the pass's disposition-column edits and kept the weight it had before archiving. | This round's own archive pass, 2026-08-14 | **Open.** Cheap to check: a script over the queue table's Finding-column lengths for the six ids confirms all remain full paragraphs. Not fixed here — trimming six Finding clauses without losing the reasoning trail (already preserved in the archive snapshot either way) is editorial judgement per row, not a mechanical move, and this round's own OF-53 and OF-60 compactions are the corrected pattern to follow. Priority: Pain low (the six rows are wrong-sized, not wrong-content), Frequency: every round that fixes-and-archives in the same pass, which is now the observed norm, Cost low per row and additive across rows. Take it with the next round that opens this document's archive-pass step. |
| OF-86 | **`gh pr merge --admin --delete-branch`'s local housekeeping (checkout base, delete branch, pull) uses the repository's default git remote, and failed silently against it.** This session's remote is SSH (`git@github.com:...`) with no key loaded — every `fetch`/`push` in this session was routed around it through `gh auth git-credential` over HTTPS as a result. `gh pr merge --delete-branch` does not take that detour, and nothing in `policies/git.md` names the workaround at all, so a session that has not already discovered it has no reason to apply it here. It printed `Permission denied (publickey)` and `warning: not possible to fast-forward to: "development"`, neither fatal, and left the local checkout on `development` one commit behind the merge that had just landed on GitHub. Mid-round, this silently reverted six just-edited tracked files to their pre-edit content on disk — caught only because the harness itself flagged them as "modified externally", not by any git command reporting failure. | This session, 2026-08-14 | **Open.** A third angle on the OF-19/OF-60 family: not a stale branch at session start (OF-60) and not a review gate blocking a round from beginning (OF-19's second instance), but a live desync **mid-round**, immediately after a merge the round itself just performed. `policies/git.md` → "Rebasing" already requires a post-merge fetch-and-relevel check; every existing instance of it (`commands/bootstrap.md` Step 5, this row's own recovery) runs it at session start, not right after a merge command issued mid-session. Priority: Pain high (a round can keep editing against silently reverted files with no git command reporting failure — the only visible signal here was harness-specific), Frequency: every `--delete-branch` merge run over an unauthenticated SSH remote, which is this environment's default, Cost low — either route `gh pr merge` through the same credential-helper detour as `fetch`/`push`, or add the relevel check immediately after any merge/delete-branch command the round itself issues, not only at bootstrap. |
Findings closed by disposition and kept here so they are not re-proposed: a CI guard asserting this repository's Product layer stays free of `[ANSWER:` markers (**Rejected**, item 6 — it would pass trivially and forever, and the real risk is a question written with a plain bracket, which no pattern separates from a legitimate survivor); a CI guard detecting an inherited answer in an authored Product-layer document (**Rejected**, item 8 — an answer phrased in generic words is invisible to any check, and claiming otherwise repeats Learning-015's failure in a new place).
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
