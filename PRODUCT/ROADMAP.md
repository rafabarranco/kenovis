<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

ROADMAP.md

Product Roadmap

Version: 1.60
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

**Conformance as read off the tree on 2026-08-13.** Every row verified against the files it names, not recalled. This table is the item's first deliverable and its permanent home is step 2, not here.

| § | Rule | State | Carried by |
|---|---|---|---|
| 1 | Observes continuously; raises to the right role; role refines; becomes planned work | **Partial** — plan/persist work; observe, route and refine do not | OF-33, OF-31, OF-32 |
| 2 | ABSOLUTE PRIORITY #1 — nothing discovered may be lost | **Partial** — rule is loaded unconditionally (item 39); its trigger is an event that never fires, and in a fresh Installation its five destinations do not exist | OF-38, OF-28, OF-29 |
| 3 | Behaves like a real development team; founder never has to ask | **Absent** — 14 founder-raised instances, every structural miss to date | OF-35 |
| 4 | Founder decides; Kenovis owns engineering awareness | **Partial** — and the founder's own model of the layers differs from the tree | OF-35, OF-42, item 40 |
| 5 | Thread isolation must not silo knowledge | **Partial** — reach fixed (item 39); "one item = one conversation" appears nowhere in the framework | OF-38 |
| 6 | Product layer is the persistent memory | **Partial** — 272,438 bytes archived, and no command opens an archive | OF-37, OF-43 |
| 7 | Injected once; each iteration understands the product better | **Partial** — nothing rereads what earlier iterations wrote away | OF-37, OF-33 |
| 8 | Two adoption modes, INIT and ADOPT | **Present** — both exist and both have run end to end; their findings window does not | OF-28, OF-29 |
| 9 | Continuous improvement is mandatory | **Partial** — learnings are written; the sink has no reader | OF-37 |
| 10 | AI-OS layer is the AI-OS's; product layer is the product's | **Present** — `sync` mirror-replaces and never touches the Product layer; it stays silent about what it removed | OF-01 / item 38 |
| 11 | Kenovis may modify itself inside its own repository | **Present** — DECISION-020, `ENGINEERING/ARCHITECTURE.md` line 97; not held by every reader | OF-42 |
| 12 | The role that owns the responsibility processes the discovery | **Absent** — `grep -rn "Open Findings\|disposition" .kenovis/AI/agents/*.md` → **0** of 12 agents | OF-31 |
| 13 | No silent debt | **Present as a rule** — and 17 queue rows sit `Open` and undimensioned | OF-32 |
| 14 | Roadmap is the complete representation of known future work | **Partial** — it is complete and it is 120 KB, which is a different way of not being readable | OF-32, OF-23 |
| 15 | Core invariant: violating it must be difficult or impossible | **Absent** — compliance is voluntary at every point; the ten guards are bypassed by the merge command this repository uses on every round | **OF-44** (new), OF-19, OF-21 |
| 16 | Observe → Analyze → Detect → Refine → Plan → Implement → Test → Review → Learn → Persist → Update roadmap | **Partial** — Observe and Refine have no implementation; the rest run when a human starts a session | OF-33, OF-32 |
| 17 | Perfect institutional memory; founder is not the cross-thread memory | **Partial** — memory is written and not re-read; the founder is still the detector | OF-37, OF-43, OF-35 |

Five `Present`, nine `Partial`, three `Absent`. The three absent — §3, §12, §15 — are the ones that make it an organisation rather than a notebook.

Target, in this order. Steps 1-3 are cheap and unblock the rest; do not start step 4 before them.

1. **Rank the specification.** OF-39 first: `CLAUDE.md` and `.kenovis/AI/SYSTEM.md` carry two Source Of Truth Hierarchies that disagree, and neither lists `PRODUCT/OPERATING_MODEL.md` at any rank. One hierarchy, one home, the other cites it — and the operating model placed in it. Founder call on the ordering; the input is both hierarchies, already on disk. **Nothing below can be checked against a specification whose rank is undefined.**
2. **The conformance table moves to `PRODUCT/OPERATING_MODEL.md`** as a standing section, one row per section, updated by every closing round. This is item 40 part 1's checkable form and OF-43's home in one artifact rather than two: the question "is the AI-OS doing its job" gets answered where the job is defined. A round states which section it served and the row moves, or it states that it served none.
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

42. SCHEDULED (founder-supplied usage model, 2026-08-13 — **runs before item 41 step 4, and its first two parts run before item 41 step 2**) — the three commands the founder actually runs work under the cadence the founder actually uses.

`PRODUCT/OPERATING_MODEL.md` → Addendum A is the input, supplied verbatim in the session that produced this item: one thread per `/next`, every unresolved finding planned before that thread ends, `/next` + `/analyze` + `/explain` as the three most-used commands, and the loop terminating when the roadmap empties. Until it was supplied, `grep -rin "one thread\|one conversation\|per thread\|session boundary" .kenovis/AI/ CLAUDE.md` → **0** — OF-38 had recorded that absence as §5's missing premise. It is no longer missing; it is specified and unimplemented, and this item is the difference.

Why it is a separate item from 41 rather than a step inside it: item 41 makes the framework conform to the seventeen sections. This makes the *execution loop* work at all. Every finding below fires on the founder's very next `/next`, and three of them fire on the first one — which makes this the item that has to be right before item 41 can be executed the way the founder intends to execute it.

Parts, in execution order. The first three are one round together; they are small and they share a file.

1. **OF-51 / OF-23 — run the archive pass first.** `PRODUCT/ROADMAP.md` is **131,511 bytes**, 76% of the 172,805 bytes on the mandatory session-initialization path, and under Addendum A that is paid once per roadmap step rather than once per day. The pass has a written procedure with a byte-substring integrity check and has been run twice (items 34, 35). Nothing else on this board has a better cost-to-effect ratio, and every subsequent thread pays for not having done it.
2. **OF-46 — `/next` Step 3 reads the "Next" pointer.** Step 15 writes it and says the next run reads it; Step 3 names two inputs and not that one. One clause, plus the requirement that a round departing from the pointer says why. Under a one-thread cadence the pointer is the *only* thing carrying ordering rationale across threads.
3. **OF-47 — `/next` has a defined response to an item only a human can execute.** Zero hits for `founder|human decision|cannot execute|who executes` in `next.md` today, and the current top of the board — item 41 step 1 — is exactly that. The branch: present the decision with the input the finding already names, record that the round was blocked and on what, stop. Explicitly *not* "descend the priority order until something is executable", which is item 40's drift with a fresh mechanism and would leave no trace.
4. **OF-48 then OF-52 — `/explain` stops contradicting the findings rule, then the other eleven are audited for the same shape.** `/explain` currently says *"Recommend creating documentation"* and names `docs/`, a destination that does not exist. Fix the instance, then read the eleven remaining zero-count commands and workflows with one question: does this file contain a local instruction that overrides the inherited rule? Not a nineteen-way edit — item 39's reasoning against that stands.
5. **OF-49 — `/next` has defined behaviour on an empty roadmap.** The founder's stated terminal state. The terminal behaviour belongs here; whether the roadmap can actually empty is OF-33 and stays in item 41 §16. Minimum: `/next` on an empty board states that it has no work and why, rather than improvising some.

Not in scope: OF-50 (the specification is on no session-initialization path) sequences with item 41 step 1, because ranking the document and loading it are one decision. OF-45 (the specification is untracked) is ahead of both and is the founder's to close.

Validated when: a fresh thread — no conversational inheritance, the founder's actual working condition — runs `/next`, picks the item the pointer names or says why not, stops correctly if that item needs a human, and disposes of what it found. Run it as a real thread, not as a reasoned-about scenario; item 24 and OF-30 both exist because a behavioural claim was confirmed by the agent that authored it.

Also inside part 4, added by the closing audit of the session that wrote this item: **OF-54** (`Autonomous Mode` contradicts Addendum A §1) and **OF-56** (the relative-link convention exists nowhere). Both are one-line framework-layer corrections in files an agent loads. **OF-53** (`Step 11` validates nothing a markdown round produces) follows part 3. **OF-55** goes to item 41 §12 with OF-31, not here — it is a roster design question, not a command fix.

Findings this item did not fix: **OF-53**, **OF-54**, **OF-55**, **OF-56** — all queued below, all found by auditing this session rather than by closing an item, which is OF-21's population gap producing four more instances.

Progress — part 1 (2026-08-13, via /next): the archive pass (OF-51 / OF-23), with OF-60, and the rule that made both possible to skip.

Premise checked before scoping, per [[Learning-023]], and it changed the work: OF-51 anchors this part at **131,511 bytes**. `wc -c PRODUCT/ROADMAP.md` read **164,928** — 33,417 more, in one day. That is the fourth consecutive round to find its own item's stated figure stale, which is OF-04.

The larger correction is what the measurement exposed. Running the pass as previously defined — DONE items whose body is a narrative — moves items 34, 35, 36 and 39, **16,853 characters**, and leaves the file at ~148 KB against a 60 KB threshold. The pass could no longer solve the problem it was scheduled to solve, because the weight had moved somewhere the rule did not look: the **`Open Findings` queue held 72,423 characters, 44% of the document**. `.kenovis/AI/policies/documentation.md` → "Closed Work Is Archived, Not Kept Inline" was written in item 21; the queue arrived in item 28. A rule that predates a section does not cover it by implication, and nothing said so, so two archive passes had already run past 72 KB of partly-closed content without touching it.

So the round's product is the widened rule, and this document is its first instance. `policies/documentation.md` (3.3 → 3.4) now states that a closed entry is not only a numbered item — a findings queue's `Fixed`/`Rejected` rows, superseded planning prose, and rejected entries are all closed work — and that archiving a queue row **compacts it to one line rather than removing it**, because `OF-NN` ids are cited by name across the framework layer and `check_item_findings.py` resolves every declaration against the queue.

It also gained the trigger OF-23 said was missing. A declared split satisfies a size rule once and permanently, so an archived document is free to grow back with a clean CI — measured here as 46,866 bytes on 2026-08-12 returning to 164,928 the next day. The pass now runs as a step of the round that appends (`policies/documentation.md`, and `commands/next.md` 2.4 → 2.5 Step 13), not when someone notices.

Moved, verbatim, with integrity asserted rather than assumed the way items 34 and 35 did it — every moved block a byte-substring of the archive, every archived narrative absent from the active file, every compacted id still resolvable as a queue row, all checked mechanically and all clean:

| What | out |
|---|---|
| Items 34, 35, 36, 39 — DONE, inline narrative | 16,853 |
| Item 25 — REJECTED, closed, its verbatim original kept | 2,434 |
| Four superseded `Next` ordering blocks | 6,444 |
| Eleven closed queue rows (`Fixed`/`Rejected`), compacted | 13,272 |

`PRODUCT/ROADMAP.md` **164,928 → 129,094 bytes (−35,834)**; `PRODUCT/ROADMAP-ARCHIVE.md` 146,574 → 188,044, the difference above the moved bytes being its own section header and eighteen block labels. Measurement point stated the way OF-23's row states it, because this text is inside the file it measures: 129,094 is the file immediately after the pass, before this block, the two new queue rows and the corrections below were written. End of round, read off the file: **137,793 bytes** — the round put 8,699 back, which is what a round costs and is why the trigger now sits in the step that appends. Not archived, deliberately: OF-01 and OF-12 carry `Scheduled` and point at items 38 and 33, which are live; the six `Deferred` rows are a live disposition awaiting a stated condition.

**And it is still 129 KB, 2.1× the threshold, which is the finding this round hands forward.** The archive rule has now been run to its limit and cannot bound this document further: what remains is 42 `Open` queue rows (~54 KB) and live scheduled items (~41 KB), all of it live by definition. The bound from here depends on findings being *resolved*, not archived — which is OF-32, and is now structural rather than a preference. Recorded as **OF-62**.

OF-60 closed in the same round because it edits the same path. `commands/bootstrap.md` (2.6 → 2.7) Step 5 requires the current branch be verified level with its remote before any work, and `policies/git.md` (2.2 → 2.3) → "Rebasing" records why a post-merge checkout is behind by construction. Both are framework layer, so both reach a customer's next task through `sync` with nobody doing anything — DECISION-026's test. OF-60's own text is corrected in place by this round's reproduction: it described the failure as a branch silently *behind*, and what this session actually hit was `git status -sb` reporting a confident **`[ahead 8]`** against a remote that a real fetch proved byte-identical. The local tracking ref lies in both directions; the rule as written covers both.

Findings this round did not fix: **OF-61**, **OF-62**. The stale-figure drift is corrected in place rather than queued (it is OF-04), and OF-60's directional error likewise.

Next (updated 2026-08-13, after item 42 part 1 — steps 0 and 1 of the previous ordering are done, the rest is unchanged and kept in its own order):

Steps 0 and 1, closed: **OF-45** is fixed — `PRODUCT/OPERATING_MODEL.md` is tracked, verified with `git ls-files`. **Item 42 part 1** ran; see its progress block above. Neither is repeated below.

1. **Item 42 parts 2-3 (OF-46, OF-47).** Both fire on the founder's very next `/next`: the pointer is written and never read, and the top item is a founder call the command has no branch for. Doing these before item 41 step 1 means the round that hits that founder call handles it correctly instead of demonstrating OF-47. **OF-46 just demonstrated itself in the useful direction** — this round read the pointer, took the item it named, and did not re-derive the ordering, which is the behaviour Step 3 does not yet require; that is one round of evidence, not a rule.
2. **Item 41 step 1 with OF-50** — rank the specification (OF-39) and put it on the session-initialization path. Founder call; input is on disk.
3. **Item 41 step 2** — the conformance table into `PRODUCT/OPERATING_MODEL.md`. This is where OF-43 dies and where every later round gets its criterion.
4. **Item 42 parts 4-5**, then **item 41 step 3** (`COMPANY_OS.md` reconciliation), then **item 41 step 4**'s gap sequence beginning with §2 (OF-38 + OF-28 + OF-29).

A release is not on this list and is deliberately not being re-argued each round — its case was already strong before this round and is stronger now (`SYSTEM.md`'s corrected mission, item 39's rule inside the generated stub, and now the archive rule's widening plus OF-60's session-start check, none of which any Installation can see). The superseded ordering blocks in the archive carry that argument in full. It stays behind item 42, for item 42's own reason: the loop that cuts a release is the thing being fixed.

Everything below the live pointer above stays scheduled and is now behind items 41 and 42: item 37 round 3, OF-25, item 24, OF-14, item 22, the release. The four superseded `Next` blocks that ranked them — including the release argument, which still holds on its merits and is only outranked — moved verbatim to `PRODUCT/ROADMAP-ARCHIVE.md` in this round's archive pass. The reasoning has not changed; its rank and its location have.

Not `/next` work: item 32 (founder input, named in the item). Item 33 needs an external party. Item 22 requires `/architect` and an ADR before any file is touched; do not start it from `/next`. Item 25 is rejected — do not restart it.

Per Learning-023, check the next item's own premise against the file it describes before scoping it — OF-13's own row claimed 66.1 KB and the file read 67.3 KB, the third consecutive round to find drift this way.
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

| OF-19 | `gh pr merge --rebase --admin` — this repository's standard merge, used on every round since `0.6.0` — bypasses required status checks, not only the required review. So all ten CI guards are advisory: they are bypassable by the same command and the same person they constrain, on the merge that lands the work. Five PRs were merged that way on 2026-08-12 alone. | DECISION-026 / item 36, 2026-08-12 | **Open.** Strengthens DECISION-026 rather than competing with it — it is a second, independent reason CI is not enforcement, and the reason item 37 is the priority instead of adding an eleventh guard. Item 34's "Solo-maintainer note... Not a misconfiguration" is about the *review* half and is still correct; the *checks* half was never examined. Priority: Pain medium (the guards have caught real defects and no round has knowingly merged red), Frequency high (every merge), Cost low to *decide* — the real question is whether required reviews should stop being required for a solo maintainer so `--admin` is not needed at all, which is a repository-settings call, not code. |

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
| OF-39 | **Two Source Of Truth Hierarchies, in the two documents every session loads, and they disagree.** `CLAUDE.md` → "Source Of Truth Hierarchy": COMPANY_OS.md, DECISIONS.md, DOMAIN/, PRODUCT/, ENGINEERING/, code. `.kenovis/AI/SYSTEM.md` → "Source Of Truth Hierarchy": Business Rules, Domain Model, Architecture Decisions, Product Requirements, Implementation Code, AI Suggestions. They invert the two that most often conflict: when a decision contradicts a business rule, `CLAUDE.md` says the decision wins (2 over 3) and `SYSTEM.md` says the business rule wins (1 over 3). Neither lists the AI-OS's own operating model at any rank. | `/analyze`, 2026-08-13 | **Open.** OF-24 instantiated at the highest altitude — the same rule written twice, edited independently, diverged, and neither reader opens the other file because both are loaded as authoritative. It is worse than an ordinary duplicate: this is the rule that resolves every other contradiction, so the tie-breaker is itself tied. Found while checking where the operating model would rank, which is OF-36's question and the reason these two are taken together. Priority: Pain high (a conflict-resolution rule that conflicts resolves nothing, and both halves ship — `SYSTEM.md` to every Installation, `CLAUDE.md` in a generated stub that carries neither, per OF-27), Frequency low to hit and total when hit, Cost low to *decide* (one hierarchy, one home, the other cites it) and it is a real decision because the two orderings are not obviously reconcilable. Sequence after OF-27, which decides which of the two files is a rule destination at all. |

| OF-40 | **An analysis can hold the artifact in its hands and file a request that someone create it.** The `/analyze` round that found OF-36 had the founder's operating-model document in its own input, complete and authored, and closed without writing it to disk — recording instead a queue row asking for it, tagged `founder call`. The document would have left with the thread, which is the finding OF-36 states. Second instance of the same class in the same command: item 26 (2026-08-12) closed *"`/analyze` is forbidden from doing what its own Step 9 requires"*, and `analyze.md` now says explicitly that recording *"is not an exception to the line above — it is the difference between analysis and implementation"*. The round read that line and still let "AI must not implement fixes" swallow "write down the thing you were given". Founder-raised, immediately, with three words. | This session, 2026-08-13, founder-raised | **Open.** The mechanism is [[Learning-024]] — a prohibition phrased by mechanism silently swallows a different action — and it survived the round that had already fixed one instance of it, in the command where it was fixed. What is new and is the checkable half: **an artifact supplied by a human in the session is not a finding about an artifact.** A finding gets a disposition; a supplied artifact gets written down, and the two were collapsed. Tagging it `founder call` compounded it — it returned the founder's own text to the founder as a question, which §4 of the document being filed says is the thing that must not happen. Priority: Pain high (it is the invariant failing at the altitude that guards the invariant), Frequency unknown but this is instance two in two days, Cost low to state as a rule and unknown to detect — the plausible half is one clause in `policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected" separating *supplied* from *found*, not a guard. Do not fold into OF-32: that is about undimensioned findings, this is about content that was never a finding. |

| OF-41 | **Item 40's drift measurement excludes the product it is measuring against.** It reads `wc -l .github/scripts/*.py` → **1198** against `find cli/src -name '*.ts' \| xargs wc -l` → **2604** and concludes "repository-only infrastructure is 46% the size of the shipped product". `cli/src` is not the shipped product. `cli/scripts/bundle-framework-assets.mjs` copies `.kenovis/AI/` verbatim into `dist/framework-assets/` — **64 markdown files, 419,098 bytes**, tracked in git (`git ls-files .kenovis \| wc -l` → 64) — and that bundle is what a customer installs; the 2604 lines of TypeScript deliver it. Under the correct denominator the same item's commit breakdown inverts: of its "last 30 commits — `PRODUCT/` 29, `.github/scripts` 22, `.kenovis/AI/policies` 19, `cli` 5", the 19 policy commits are product work by DECISION-026's own definition, and only the 22 are repository-only. Its "18 of 30 queue rows are bookkeeping" classification counts framework-layer rule work the same way. | `/analyze`, 2026-08-13 | **Open.** The drift item 40 names is real and its remedy stands — the ten guards do reach zero Installations, and that is unchanged by this row. What is wrong is the size of it, in the direction that overstates it, and the figures are the stated input for item 40 part 3, a founder decision on what share of rounds may close on instrumentation. Deciding that against a denominator that omits 419 KB of the product sets the constraint wrong. Priority: Pain high (it is input to a standing constraint, not to one round), Frequency once but load-bearing, Cost low — it is a re-count, not new analysis. Take it with item 40 part 3, before that decision is made rather than after. |

| OF-42 | **The founder's model of this product's own layering does not match the repository, and nothing checks that it does.** Stated by the founder on 2026-08-13 while asking this question: *"la carpeta .kenovis es un ejemplo de una build"*. It is not an example and not a build output — `.kenovis/AI/` is the tracked source that `bundle-framework-assets.mjs` publishes, per DECISION-020, and the script's own header says so. The fact is on disk in three places (`ENGINEERING/ARCHITECTURE.md` line 97, the bundle script, DECISION-020's body), which is what makes this a finding rather than a documentation gap: it is written, it is correct, and the person the Source Of Truth Hierarchy ranks above every document does not hold it. | `/analyze`, 2026-08-13 | **Open.** Consequence, not hypothetical: DECISION-026, item 37 and item 39 all turn on "which layer does this rule go in", and each was approved by a founder whose model of the layers differs from the tree. Priority: Pain high — the hierarchy makes the founder the arbiter of every conflict the documents cannot settle, and an arbiter operating on a wrong map of the layers cannot arbitrate layer questions. Frequency: unknown, first measured instance, and it went 14 founder interventions without surfacing. Cost unknown; the first output is deciding whether founder/repo model divergence is detectable at all or is a periodic reconciliation — the same shape as OF-35's honest question, and it should be decided with it. Distinct from OF-36 (the founder's document was missing from the repo); here the repository's fact is missing from the founder. |

| OF-43 | **No document answers "is the AI-OS doing its job", so the answer is re-derived at full cost every time it is asked.** Asked three times on 2026-08-13. Each run bootstrapped, re-measured and re-assembled the same picture out of `PRODUCT/ROADMAP.md` — **104,143 bytes** at the second ask, **115,235** at the third — with the answer spread across item 40 and ten queue rows. `grep -c "founder-raised\|founder asking\|raised by a human\|founder-flagged" PRODUCT/ROADMAP.md` → **14**. | `/analyze`, 2026-08-13 | **Open.** Distinct from the three neighbours it looks like: OF-23 is the file being over threshold (it would still hold at 40 KB), OF-37 is archives having no reader (this is the *active* document), and item 40 part 1 writes the objective in checkable form — a criterion, not a place where the answers to it accumulate. What is missing is one short standing document a closing round updates and the founder reads instead of asking. Priority: Pain high (three full analyses in one day on one question, and the third produced OF-41 — meaning the re-derivation is not even converging), Frequency: every ask, 14 recorded, Cost low. Sequence with item 40 part 1: the criterion and the place that records answers to it are one piece of work, and building the second without the first records nothing. |

| OF-44 | **The core invariant is stated as unbreakable and is enforced nowhere.** `PRODUCT/OPERATING_MODEL.md` §15: *"The system must be designed so that violating this invariant is difficult or impossible."* Measured 2026-08-13: every mechanism in the framework is an instruction an agent may follow — policies, commands, workflows, the routing table, the `Findings this item did not fix:` line. The one class of mechanical enforcement, the ten CI guards, reaches **0** Installations (item 37) and is bypassed in this repository by `gh pr merge --rebase --admin`, the standard merge on every round since `0.6.0` (OF-19). So the invariant holds exactly as often as the agent executing the round chooses to honour it, which is the definition §15 rules out. Fourteen founder-raised instances are the observed failure rate. | Item 41 / `/analyze`, 2026-08-13 | **Open.** Carried by item 41 step 4 as §15's gap, and it is the one row in that item where the honest first output may be *"not fully achievable, recorded as such"* rather than a mechanism — a markdown AI-OS that must stay tool-agnostic (DECISION-010) and ship no runtime (DECISION-013) has no place to stand a hard constraint. Distinct from OF-21 (detecting a miss after it happens) and from OF-19 (guards being bypassable, which is one instance): this asks whether *any* enforcement point exists at all. Priority: Pain maximal — it is the invariant the whole product is built to guarantee, Frequency: every session, Cost unknown and the first output is the design question, not code. Do not schedule a guard for it; DECISION-026 and OF-21 both forbid that until item 37 completes, and a guard would be the eleventh instance of the thing item 41 §15 is about. |

| OF-45b | `claude-info.md` sits untracked at the repository root — the founder's original paste, byte-identical to the operating model. | This session, 2026-08-13 | **Rejected** as work — committing it would create a second copy of the specification outside the Product layer. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-45 | **`PRODUCT/OPERATING_MODEL.md` is untracked.** `git status --short` on 2026-08-13 → `?? PRODUCT/OPERATING_MODEL.md`, plus `?? claude-info.md`, a second copy of the same text sitting outside the Product layer at the repository root. The document item 41 ranks above every other Product-layer file, written to close OF-36, exists only in one working tree and is one `git clean` from gone. | `/analyze`, 2026-08-13 | **Open.** It is the core invariant (§15) failing in physical form, one day after the document was created to state it, and it went unnoticed by the round that created it and by the round that scheduled item 41 around it. Nothing in the framework says a Product-layer write is not durable until it is committed — `policies/git.md` governs commit scope and branch flow, not the durability of a finding's destination. Priority: Pain maximal (total loss of the specification), Frequency: every session that writes to the Product layer and does not commit, Cost trivial to fix for this instance and low for the rule. The instance is the founder's to close (`policies/git.md` reserves commits for explicit human instruction); the rule — *a finding is not recorded until it is committed* — belongs in `policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected". Take it first, before anything else in item 41 or 42. |

| OF-46 | **`/next` writes the "Next" pointer and no `/next` is told to read it.** `commands/next.md` Step 15 (line 413): *"The recommended next action belongs in `PRODUCT/ROADMAP.md` … so the next `/next` run reads it instead of re-deriving it."* Step 3 names exactly two inputs — the scheduled items and the `Open Findings` queue — and never the pointer. So every round re-derives the ordering from the priority formula over a 131 KB document while the previous round's reasoning sits unread a few hundred lines away. | `/analyze`, 2026-08-13 | **Open.** Exactly the failure `policies/documentation.md` → "An Instruction Is Reachable, And Its Sink Is Read" forbids, in the command that ships that policy's own workflow, and it costs most under the founder's stated cadence (Addendum A §1): a fresh thread per item has no memory of why the ordering is what it is, so the pointer is the only carrier and nothing picks it up. Priority: Pain high (the ordering rationale is written every round and consumed never; the current pointer is four paragraphs of sequencing reasoning), Frequency: every `/next`, Cost low — one clause in Step 3 naming the third input, and stating that a round which departs from the pointer says why. Take it inside item 42. |

| OF-47 | **`/next` has no behaviour for an item that only a human can execute.** `grep -cin "founder\|human decision\|cannot execute\|who executes" .kenovis/AI/commands/next.md` → **0**. `policies/documentation.md` requires an `Open` finding the AI cannot execute to name who executes it and what input they need — the write side exists; `/next` has no step that consumes it. Today the top of the board is item 41 step 1, a founder call on OF-39, and items 32 and 33 are the same. A fresh thread running `/next` under Addendum A's cadence reaches a founder-call item with no instruction: Step 9 says only *"do not continue blindly, update plan"*. | `/analyze`, 2026-08-13 | **Open.** The observable failure is either a stalled thread or, worse, a round silently skipping down the priority order to something it can execute — which is item 40's drift with a new mechanism, and would be invisible because skipping is not recorded anywhere. Priority: Pain high (it fires on the very next `/next`, on the item the founder just flagged maximum priority), Frequency: every round whose top item needs a decision, Cost low — Step 3 gains a branch: present the decision with the input the finding already names, record that the round was blocked and on what, and stop rather than descend. Take it inside item 42, with OF-46. |

| OF-48 | **`/explain` instructs the opposite of the unconditional findings rule.** `commands/explain.md` → "Documentation Opportunity": *"If an explanation reveals missing knowledge: **Recommend** creating documentation in PRODUCT/, DOMAIN/, ENGINEERING/, `docs/`."* Recommending is prose, which the disposition rule names explicitly as not a disposition — so one of the three most-used commands (Addendum A §3) tells the session to do the thing item 39 shipped a rule against. `grep -ci "Open Findings\|disposition\|Findings this" .kenovis/AI/commands/explain.md` → **0**. Second defect in the same six lines: `docs/` is not a Product-layer destination and no such directory exists in this repository — `grep -rn "docs/" .kenovis/AI/` → 3 hits, one an example path in `git.md`, one in a template, and this one, which is the only place it is named as a place to write. | `/analyze`, 2026-08-13 | **Open.** Worse than silence: item 39 made the rule reach every session unconditionally, and a command that actively says "recommend" gives the session a specific, local, contradicting instruction at the exact moment a finding appears. Distinct from OF-26, which was about the rule not reaching; here it reaches and is overridden in place. Priority: Pain high (one of the three commands the founder actually runs, and `/explain` is the one whose entire output is knowledge that has nowhere to go), Frequency: every `/explain` that finds a gap, which is most of them, Cost low — replace "recommend" with a citation of the policy section, and delete `docs/` or record why it is there. Take it inside item 42. |

| OF-49 | **The stated end condition is a state with no defined behaviour.** Addendum A §4: the loop runs *"hasta que no haya nada en el roadmap del producto"*. `grep -cin "empty\|nothing left\|no items\|exhausted" .kenovis/AI/commands/next.md` → **0**. §1 and §14 of the operating model say the roadmap is the complete representation of known future work and that Kenovis observes continuously and feeds it, so an empty roadmap should mean observation has run and found nothing — but nothing observes (OF-33), so in practice an empty roadmap would mean the founder's loop simply stops. | `/analyze`, 2026-08-13 | **Open.** This is OF-33 given a date: continuous observation is an unimplemented §1 promise today and becomes a hard stop the moment the queue drains. It also sets the acceptance test for OF-33 — whatever observation turns out to be, its first requirement is that `/next` on an empty roadmap produces work or states plainly that it has none and why. Priority: Pain high but not yet (the board holds 20-plus open rows), Frequency: once, at the end, and the end is the founder's stated goal, Cost: low for the terminal behaviour, unknown for observation itself. Sequence: the terminal behaviour goes in item 42; the observation half stays OF-33 inside item 41 §16. |

| OF-50 | **The specification is not on any session-initialization path.** `grep -n "OPERATING_MODEL" CLAUDE.md .kenovis/AI/SYSTEM.md .kenovis/AI/commands/bootstrap.md cli/src/domain/installation.ts` → **0 hits in all four**. `CLAUDE.md` → "Session Initialization Protocol" names `COMPANY_OS.md`, `SYSTEM.md` and the Decision Index and stops; `bootstrap.md` Step 2 reaches it only incidentally, as one file inside `PRODUCT/`. The document item 41 is about to rank above every other Product-layer file is loaded by accident or not at all. | `/analyze`, 2026-08-13 | **Open.** Under Addendum A's cadence this compounds: every thread is fresh, so the only guarantee that a round sees the specification is that the protocol names it, and it does not. Also a framework-shape question rather than a this-repository one — no Installation has such a document, and `/init-project` and `/adopt-project` never ask the founder for one, which is [[Learning-028]]'s "Future action" half still unbuilt. Priority: Pain high, Frequency: every session, Cost low for this repository and unknown for the framework half, which is genuinely a design question — whether "the founder's statement of purpose" becomes a named Product-layer document every Installation has. Sequence after OF-39, with item 41 step 1, because ranking it and loading it are one decision. |

| OF-51 | **Every thread pays the whole roadmap, and the roadmap is 76% of what a thread reads.** Measured 2026-08-13: `PRODUCT/ROADMAP.md` **131,511 bytes** against `COMPANY_OS.md` 9,799 + `.kenovis/AI/SYSTEM.md` 9,117 + `CLAUDE.md` 6,251 + `PRODUCT/OPERATING_MODEL.md` 16,127 — 172,805 bytes total on the mandatory path, before `DOMAIN/`, `ENGINEERING/`, `AI/memory/` or any implementation file. Under Addendum A's one-thread-per-item cadence that is paid once per roadmap step, not once per working day. | `/analyze`, 2026-08-13 | **Open, and it is OF-23 with the cadence applied — do not treat it as a separate work item.** What it changes is OF-23's priority, not its content: before Addendum A, the roadmap's size was a slow leak against an unbounded number of sessions; now it is a fixed toll multiplied by the exact number of steps left on the board. The archive pass is written, has been run twice, and is the single cheapest change available. Priority: Pain high and now quantified, Frequency: every thread the founder opens from here on, Cost low and known. **Run it before item 41 step 2 and before item 42.** Recorded as its own row rather than folded into OF-23 only because the multiplier is new information; the work is OF-23's. |

| OF-52 | **Twelve of nineteen commands and workflows still route a finding nowhere, and three of them are the ones that run.** Post-item-39 count, `grep -ci "Open Findings\|disposition\|Findings this"` per file on 2026-08-13: `next` 3, `analyze` 1, `bug` 1, `commands/review` 1, `workflows/review` 1 — and **0** in `adopt-project`, `architect`, `bootstrap`, `explain`, `feature`, `init-project`, `release`, and all six remaining workflows. Item 39 deliberately dropped per-command terminal steps, correctly, as nineteen copies of one rule (OF-24's shape). | `/analyze`, 2026-08-13 | **Open.** Item 39's reasoning holds and this is not a request to reverse it — the unconditional rule in `SYSTEM.md` and the stub is the right mechanism. What OF-48 shows is that the mechanism has a hole the count exposes: a command with **0** is silent and inherits the rule, but a command with a *contradicting local instruction* overrides it, and nothing distinguishes the two from a count. So the useful form is not "add the step to twelve files" but "audit the twelve for instructions that contradict the inherited rule" — which is a one-pass read with a known population, not a nineteen-way edit. Priority: Pain medium-high (`/explain` is the first instance found and it was found by reading, not by counting), Frequency: unknown until the pass runs, Cost low — twelve files, one question each. Take it inside item 42 after OF-48, since OF-48 is the instance that proves the class. |

| OF-53 | **`/next` Step 11 validates a kind of change this product rarely makes.** It reads *"Run: Tests. Type checks. Linting. Build process."* `grep -cin "guard\|check_\|\.github" .kenovis/AI/commands/next.md` → **0**. The majority of rounds on this board change markdown under `.kenovis/AI/` — the product itself, per DECISION-026 — and none of those four validations touches a markdown file. The only thing that actually validates such a round is the ten guards. | `/analyze`, 2026-08-13 | **Open, and deliberately not scoped as "add the guards to Step 11"** — that would name origin-only infrastructure inside the shipped framework, which is OF-25 exactly, in the command most likely to be read. The real question is what "validate" means for a change whose artifact is a document, in a framework that must state it without depending on scripts no Installation has. Plausible shape: the claim-read-back rule from `policies/documentation.md` promoted into Step 11 as the documentation-change validation form — read the assertion back off the artifact, exercise the failing case — which is already the standard every recent round used and is nowhere in the command that requires validation. Priority: Pain medium-high (rounds pass Step 11 vacuously and have done for months), Frequency: most rounds, Cost low once the shape is settled. Take it inside item 42 after part 3. |

| OF-54 | **`/next` → "Autonomous Mode" contradicts the founder's supplied cadence.** The command says *"Claude may continue through multiple roadmap items."* `PRODUCT/OPERATING_MODEL.md` → Addendum A §1 says one thread executes one `/next`. Both are in force, one in the command and one in the specification, and the command is the one a round reads at the moment it decides whether to continue. | `/analyze`, 2026-08-13 | **Open.** Same shape as OF-48 — a local instruction overriding an inherited rule — against the usage model rather than the findings rule, and in the most-used command. Not obviously a deletion: an Installation may legitimately want multi-item rounds, and Addendum A is this founder's cadence, not a framework law. So the honest first output is deciding whether the cadence is a framework default or a per-Installation setting, which is the same question item 41 step 1 asks about the specification's rank. Priority: Pain medium (the two only conflict when a round finishes early and has to choose), Frequency: every round that could continue, Cost low. Take it with OF-48 inside item 42 part 4. |

| OF-55 | **The Agent Roster has no role that owns the framework layer, which is what this product is.** `/next` Steps 4-6 select from product-manager, cto, designer, frontend, backend, database, security, reviewer. Most rounds on this board edit policies, commands, workflows and templates under `.kenovis/AI/` — the deliverable per DECISION-026 — and no listed role owns that. `grep -n "framework\|policy\|markdown" .kenovis/AI/agents/*.md` → **3** hits across twelve agent files. | `/analyze`, 2026-08-13 | **Open.** Distinct from OF-31, which is that no agent knows findings exist; this is that no agent owns the product's own material, so §12's "the role that owns the responsibility processes the discovery" has no owner to name for the most common change this repository makes. It defaults to `cto` by absence, never by selection. Priority: Pain medium-high — it is §12 and §3 failing for the modal case rather than an edge one, Frequency: most rounds, Cost unknown: the first output is whether this is a missing role, a widened `cto`, or evidence that framework work is genuinely this repository's own concern and not an Installation's — which would make it a `/framework-review` question (OF-06, Deferred) rather than a roster gap. Decide it with OF-31, inside item 41 §12; they are one design conversation. |

| OF-56 | **A relative link written inside `PRODUCT/` resolves from `PRODUCT/`, and nothing says so.** `check_links.py` caught a markdown link in `PRODUCT/ROADMAP.md` whose target was written repository-relative (`PRODUCT/OPERATING_MODEL.md`) rather than sibling-relative — it resolves to `PRODUCT/PRODUCT/OPERATING_MODEL.md`. `grep -rin "relative link\|markdown link\|backtick" .kenovis/AI/policies/documentation.md` → **0**: the surrounding convention (backticked paths, not markdown links) is universal in these documents and written nowhere. Third half, found while writing this row: **the guard does not honour inline code spans**, so this row could not quote the offending syntax as an example without failing CI — a documentation rule whose violation cannot be documented. | This session, 2026-08-13 | **Open.** Three halves and the second is the one that matters. The instance is trivial and fixed. The class is OF-25's: the guard that caught it runs only here, so an Installation writing the same link into its own `PRODUCT/` gets a silent dead link, and its `PRODUCT/` is the directory it edits most. Recorded also because of how it nearly died — it was reported to the founder in the session summary and existed nowhere else until this row was written, which is `policies/documentation.md`'s "prose is not a disposition" happening inside the analysis that had just measured that failure four times. Priority: Pain low for the instance, medium for the class (a dead link in a customer's own roadmap, unreported), Frequency: any Product-layer document that cites a sibling, Cost low — one sentence of convention in `policies/documentation.md`, which reaches every Installation, versus the guard which reaches none. Take it inside item 42 part 4 with OF-48; both are one-line framework-layer corrections in files an agent loads. |

| OF-57 | `.kenovis/AI/SYSTEM.md` denied the operating model's §1 in its Final Principle, and shipped that denial to every Installation. | This session, 2026-08-13, founder-raised | **Fixed** (2026-08-13) — DECISION-028. What remains is OF-58. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-58 | **"The AI is not an autonomous decision maker" is unscoped, and as written it contradicts §4 and §17.** `.kenovis/AI/SYSTEM.md` line 43 and `CLAUDE.md` line 17, both loaded unconditionally. The operating model splits ownership rather than denying autonomy: §4 gives the founder product direction, strategy, business decisions and approval, and gives Kenovis *"engineering awareness, technical debt tracking, architectural consistency, technical planning, discovery tracking, roadmap completeness"*; §17 states *"Kenovis owns the continuous engineering process of the product."* An unscoped denial of decision-making covers the engineering half the model explicitly assigns to Kenovis. | This session, 2026-08-13, founder-raised | **Open.** Distinct from OF-57, which is a flat contradiction needing a founder call: this one is a scoping defect with an obvious correct form — the sentence is right about business, product and strategic decisions and wrong about engineering ones, and adding the scope makes it agree with §4 instead of fighting it. Recorded separately so it is not settled by whatever OF-57 decides; the replacement question and the autonomy question are different, and collapsing them would let a "no" on OF-57 silently keep the unscoped denial. Priority: Pain high (it is the sentence that governs what a round believes it may do without asking, which is §3's *"the founder should NOT need to ask"*), Frequency: every session, Cost low. Take it with OF-57 inside item 41 step 3. |

| OF-59 | A rejected item was still cited as the live plan inside recorded knowledge — three instances. | This session, 2026-08-13 | **Fixed** (2026-08-13, founder instruction) — deleted in place, each leaving a dated note. Detection stays OF-22. → `PRODUCT/ROADMAP-ARCHIVE.md` |

| OF-60 | **`/bootstrap` never checks that the branch it is on is current with the remote, and the standard merge leaves it stale.** `bootstrap.md` Step 5 says *"Inspect: Git status. Recent commits. Open branches. Pending changes."* — all local, all of which a stale branch passes. Reproduced in this session rather than reasoned about: `gh pr merge --rebase --admin --delete-branch` on PR #101 deleted the feature branch and switched the checkout to local `development`, which sat at `80779ed` while the remote was at `6e6ba0c` — the work just merged. A round that had started there would have bootstrapped from a Product layer missing its own two most recent commits. | This session, 2026-08-13 | **Open, and it is the highest-priority operational finding for the cadence the founder starts using next.** `PRODUCT/OPERATING_MODEL.md` → Addendum A §1 makes every roadmap step a fresh thread, so the branch state at thread start is now a per-item risk rather than a per-day one, and a thread that bootstraps stale re-derives against an outdated roadmap and an outdated queue — silently, because everything it reads is internally consistent. Distinct from OF-51 (the *cost* of reading the roadmap) — this is reading the *wrong* roadmap. Priority: Pain high (a whole round's reasoning built on superseded context, undetectable from inside that round), Frequency: every thread that starts after a merge, which under Addendum A is most of them, Cost low — one line in Step 5 requiring the current branch be verified against its remote before any work, and one in `policies/git.md` noting that `--delete-branch` returns the checkout to a branch that is by definition behind. Take it inside item 42 part 1, which is already editing the session-start path. **Fixed** (2026-08-13, item 42 part 1) — `commands/bootstrap.md` (2.6 → 2.7) Step 5 requires the branch be verified level with its remote before any work; `policies/git.md` (2.2 → 2.3) → "Rebasing" records that a post-merge checkout is behind by construction. **Corrected in place by the round that fixed it:** this row describes the failure as a branch silently *behind*, and the instance the fixing session hit was the opposite direction — `git status -sb` reported a confident `[ahead 8]` while a real fetch proved the branch byte-identical to the remote. The local tracking ref is only as fresh as the last fetch, so it misreports both ways; the rule as written covers both, and the original one-directional framing is left visible here rather than rewritten. **Validated live, unplanned, by the command that landed the fix:** `gh pr merge --rebase --admin --delete-branch` on PR #104 merged remotely, deleted the branch, returned the checkout to local `development` at `850ee23` while the remote sat at `752de14`, and its own attempt to level the checkout failed with `fatal: Could not read from remote repository` — printed as a warning, after the merge had already succeeded. The round that wrote the rule reproduced the defect on its very next command, which is the standard item 24 and OF-30 exist to demand: a behavioural claim confirmed by an instance rather than by the agent that authored it. One detail is worse than this row states and is why it is added here: the reverted checkout made `git status --short` report a **clean tree**, so the round's nine committed files read as never having existed. The failure does not look like stale context, it looks like lost work. |

| OF-61 | **Two lifecycle rules cannot both be satisfied at steady state, and running one to completion broke the other.** The archive pass of item 42 part 1 moved the last four inline DONE narratives out of `PRODUCT/ROADMAP.md`, which took `check_item_findings.py`'s population to **0 closed items with a narrative, 39 archive pointers** — and the guard failed the repository, because an empty population was hardcoded as `"nothing to check, which is not a pass"`. The repository had done exactly what `policies/documentation.md` → "Closed Work Is Archived, Not Kept Inline" requires. | Item 42 part 1, 2026-08-13 | **Open, with the instance fixed.** The empty case now splits: no items *and* no pointers is a missing corpus and still fails; no items *with* pointers is the archive rule having completed, and passes while stating plainly that it checked nothing. What stays open is the consequence, which is worse than the bug: in a fully-archived roadmap this guard is now **permanently inert** — its population empties as an intended side effect of another rule, and the fix makes that inertness pass silently. So the one mechanical check on the findings rule enforces nothing here from now on, exactly as the rule's own population moved from items to sessions. Priority: Pain high (an enforcement mechanism reaching zero by correct action, invisibly), Frequency: permanent from this round, Cost unknown — it is OF-21's question arriving from the other side and should be decided with it, not before item 37 completes and not as an eleventh guard (DECISION-026). |

| OF-62 | **The archive rule has been run to its limit and the document is still 2.1× its threshold.** `PRODUCT/ROADMAP.md` after the fullest archive pass ever run: **129,094 bytes** against 60 KB, and every remaining byte is live by definition — 42 `Open` queue rows (~54 KB) and the scheduled items 22, 23, 24, 32, 33, 37, 38, 40, 41, 42 (~41 KB), plus ~22 KB of phase narrative. Nothing further is archivable without archiving open work, which the rule explicitly forbids ("archiving a document that still holds the only copy of an unresolved finding is how a visible backlog becomes an invisible one"). | Item 42 part 1, 2026-08-13 | **Open.** This is OF-32 made structural rather than preferential: the bound on this document now depends entirely on findings being *resolved or rejected*, and 42 of them are `Open` and undimensioned. The lifecycle rule has no remaining lever. Distinct from OF-23/OF-51, which are about the pass not being run — it has now been run, at full scope, with the rule widened, and this is what is left. Distinct from OF-15, which is about archive size. Priority: Pain high and now bounded from below (129 KB is the floor until the queue drains, and it is paid once per thread under Addendum A §1), Frequency: every thread, Cost: it is OF-32's cost, not a new one. Do not schedule a fourth archive pass against it — there is nothing left to move. |

| OF-63 | **A learning's `Disposition:` can name an unpromoted rule and give it no id, and the guard that watches learnings will pass.** [[Learning-031]]'s disposition reads *"the first is not promoted … 'check what empties this population, and what that other rule then reads' has no policy home yet; the plausible one is `policies/testing.md`"*. `check_future_actions.py` passed because the `Future action:` line cites OF-61 and OF-62 — real ids for the *other* half. The half named only in `Disposition:` exists nowhere else. | This session, 2026-08-13, founder-raised | **Open.** The rule the round declined to write is real and the reason for declining was sound (two policy sections already added, and OF-24 forbids restating a sibling's section without reading it first) — but a deferral with a reason and no id is a well-documented deferral, which [[Learning-025]] already records as the thing that reads as handled and is not. The mechanical half is exact and worth stating for whoever takes OF-21: `check_future_actions.py` reads `Future action:` and not `Disposition:`, so a finding parked in the second field is invisible to it. Priority: Pain medium (it is the disposition rule failing inside the file that records lessons about the disposition rule), Frequency: every learning whose rule is deferred, Cost low — either promote the rule or give it a queue row. The content itself: **a rule that constrains a population never says what happens when the population empties, and another rule is usually what empties it**; plausible home `policies/testing.md` → "A Check Is Not Verified Until It Has Been Run", widened from "run the failing case" to "run the empty case". |

| OF-64 | **`CHANGELOG.md`'s `[Unreleased]` section carries two `### Changed` headings with `### Added` between them.** Read off the file 2026-08-13: `### Changed` (1 bullet), `### Added` (2 bullets), `### Changed` (9 bullets). Keep a Changelog, which the file's own header cites, defines one section per change type. `check_changelog.py` passes — it verifies a bullet exists for a framework-layer change, not the section structure. | This session, 2026-08-13 | **Open.** Low severity and recorded because of where it lands rather than what it costs today: `[Unreleased]` is cut verbatim into a released section at release time, and `policies/documentation.md` → "Closed Work Is Archived, Not Kept Inline" forbids editing released prose afterwards — so a structural defect in `[Unreleased]` becomes permanent the moment a release ships, and every future round appending a `Changed` bullet has to guess which of the two to use. This round guessed. Priority: Pain low now and unfixable later, Frequency: every release cut, Cost trivial before the cut and zero-after-impossible following it. Take it as a step of the next release, with the changelog trim that `policies/documentation.md` already schedules there. |

| OF-65 | **The rule this round shipped is unrunnable as written in the repository that shipped it.** `commands/bootstrap.md` 2.7 Step 5 and `policies/git.md` 2.3 both instruct `git fetch origin`. In this repository `origin` is an SSH remote with no key available to the session: every `git fetch origin` and `git push origin` this session attempted exited `128` with `git@github.com: Permission denied (publickey)`, and each one had to be reissued against an explicit HTTPS URL with `gh auth git-credential`. It is also the mechanical reason `gh pr merge --delete-branch` cannot level the checkout, so OF-60's failure fires on **every** merge here rather than occasionally. | This session, 2026-08-13, founder-raised | **Open, and it splits into two halves that must not be merged.** The *instance* is local configuration and the founder's to close — one line switching `origin` to HTTPS or configuring the credential helper globally — and is deliberately not being changed by this round, since a session rewriting a human's git remote is not its call. The *product* half is a real defect in what shipped: the new rule names a command and has no branch for that command failing, so a session that follows it and gets exit `128` has an instruction that ends and no stated next step. It will fail the same way for any Installation whose remote the agent cannot reach — a common shape, not an exotic one. Priority: Pain high for the product half (a session-start check that errors out is worse than none, because it reads as a broken repository rather than as a missing credential), Frequency: every session in such an Installation, Cost low — one clause stating what to do when the fetch fails, which is to say so and stop rather than proceed on unverified local state. Take it with item 42 part 2, which is already editing `next.md`'s session-start behaviour. |

| OF-66 | **Six `Open` rows predate DECISION-029's dimensioning rule and do not meet it.** Read off the file 2026-08-13: of **47** `Open` rows, **41** carry Pain, Frequency and Cost and **6** do not — OF-02, OF-03, OF-04, OF-10, OF-11, OF-14. OF-10 and OF-11 name their executor and their input, which is the other half of the rule, and still carry no ranking terms; OF-02 and OF-03 carry a precedent argument ("six for six such runs have found a maximal-Pain defect") that is stronger than most rows here and is not in the form `/next` ranks. | This session, 2026-08-13, founder instruction (DECISION-029) | **Open.** Backfill, not re-analysis: each row already contains the reasoning, and what is missing is stating it in the three terms. Recorded rather than fixed in the same round on purpose — a rule and its first exception written in one change makes the exception invisible, and this way the six are a queue row someone can check. Priority: Pain low (these six are the best-known rows on the board, so the ranking failure they cause is small *here* — it is a fresh Installation with no such familiarity that the rule protects), Frequency: once, then never again, Cost low — six lines, no new investigation. Take it with any round already editing the queue. |

| OF-67 | **The framework policy now ranks findings by terms whose definition ships only in a file the customer owns.** `policies/documentation.md` 3.5 requires Pain, Frequency and Cost on every `Open` row. The formula those terms come from — `(Customer Pain × Frequency × Business Impact)` — is at `.kenovis/AI/templates/product-layer/PRODUCT/ROADMAP.md:246`, a Product-layer template: authored once at setup, never touched by `sync` (DECISION-021, RULE-INST-01), and freely editable by the Installation afterwards. `grep -rn "Pain" .kenovis/AI/policies/ .kenovis/AI/commands/` → **0** before this round and the policy still does not define the terms, only require them. So a customer can hold a loaded policy citing a ranking their own roadmap no longer describes, and every `sync` will keep the policy current while the definition drifts. | This session, 2026-08-13, DECISION-029 consequences | **Open.** Same class as OF-25 — the shipped framework naming something the reader does not have — but the inverse direction: there the mechanism was absent, here the *definition* is present and mutable. Two candidate fixes and the choice is the first output: state the three terms in `policies/documentation.md` itself (policy becomes self-contained, and duplicates a definition, which is what OF-24's "Single Source of Truth" section now forbids), or have the policy cite the roadmap section by name so the drift is at least visible when it happens. Priority: Pain medium (a rule that cannot be applied reads as compliance theatre in exactly the Installations that have no habit to fall back on), Frequency: every finding in every Installation, Cost low. Do not add a guard for it — DECISION-026 and OF-21, item 37 is still mid-flight. |

| OF-68 | **`DECISIONS.md` → "Document Layers" restates in prose two facts the Decision Index already carries as marks, so both go stale every time a decision is added.** The paragraph read "Fifteen of them are framework-level in effect and ten are cited by ID"; counted off the artifact on 2026-08-13 the figures were **nineteen** `‡` and **thirteen** `★`, four decisions after the last correction. That last correction is itself recorded two lines below, in the same paragraph, having fixed the same sentence from "Eight". Corrected again this round, which makes it the third instance. | This session, 2026-08-13, while adding DECISION-029's index line | **Open.** The prose claims its own redundancy is safe — "marked `‡` and `★` in the index rather than listed again here, so the two lists cannot disagree" — and it is the counts, not the lists, that disagree. `check_decision_index.py` verifies body↔index pairing and has no view of a number in a neighbouring paragraph. Cheapest fix is deleting the two numbers and naming the marks, since a reader who needs the count can produce it in one command; that is a judgement about what the paragraph is for, not a mechanical change, which is why it is queued rather than done. Priority: Pain low (nobody has acted on a wrong count), Frequency: every decision added — three instances in eleven decisions, Cost low. This is Learning-023's shape in a document that already carries two records of it. |

| OF-69 | **A merge that lands on the remote and fails locally prints only the failure, so the session reads it as "the merge did not happen".** Reproduced on PR #107, 2026-08-13: `gh pr merge 107 --rebase --admin --delete-branch` output nothing but `fatal: Could not read from remote repository.` and `! warning: not possible to fast-forward to: "development"` — while `gh pr view 107` reported `MERGED` at `16:16:13Z` with merge commit `4ad5db6`. The remote half had succeeded. The local half — delete the feature branch, check out the base, fast-forward it — needed `origin` over SSH (OF-65) and died, after the checkout had already moved. Net state: working tree on a `development` **1 commit behind**, with the local feature branch gone and `git status -sb` printing a clean `## development...origin/development`, because the tracking ref was never updated either. | This session, 2026-08-13, reproduced live | **Open.** Distinct from the two findings it sits between, checked against both before taking an id: OF-60 is `/bootstrap` not verifying currency at session start, OF-65 is the `git fetch origin` instruction having no branch for exit `128`. Neither covers a **composite command whose halves have different outcomes and whose output reports one of them**. The danger is specific and not hypothetical — a session that believes the merge failed will retry it, re-open the PR, or rebuild the branch, and every one of those acts on a repository where the work already landed. Priority: Pain high (a wrong belief about whether a merge happened is upstream of every recovery action a round would take), Frequency: every merge in an Installation whose remote the agent cannot reach over the configured transport, Cost low — the rule is to confirm the merge from the *PR's* state rather than the command's exit, then repair the local checkout, which is two commands. Belongs with OF-65 in item 42 part 2, which is already editing session-start git behaviour; the two are one clause about not trusting a git command's own report over the artifact's state. |

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
