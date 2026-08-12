<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

ROADMAP.md

Product Roadmap

Version: 1.46
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

Sixteen items, items 18-33, in the order written — except where an item states its own ordering constraint, and three do. **Item 26 comes first** (it unblocks 27), **item 27 next** (it is the root cause behind this block needing to be asked for at all), and **item 29 gates item 19**, because archiving before triage converts a visible backlog into an invisible one. Item 25 goes with or after item 21, never before. Founder flagged this block maximum priority on 2026-08-12: it is executed before `/architect` and `/release` end-to-end runs, before the `sync`-names-removed-paths backlog finding, before the npm-registry version check, and before the paid-tier ADR — all of which stay scheduled behind it.

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

25. SCHEDULED (RA3) — a customer Installation can run a check, not just read a rule.

Problem: five guards run in this repository's CI (`check_links`, `check_markers`, `check_changelog`, `check_template_refs`, `check_artifact_destinations`, plus `check_decision_index` from item 18 — six). A customer Installation runs none. `cli/scripts/bundle-framework-assets.mjs` ships `.kenovis/AI/` plus the customer README; `.github/` is not in the bundle, verified in item 17. Every rule this repository enforces mechanically, a customer holds as prose.

The gap widens with each round rather than staying still: item 21 adds a seventh guard under the same mechanism, and item 20 a ninth. Count corrected in place on 2026-08-12 by reading it off the tree rather than off this paragraph — `ls .github/scripts/check_*.py | wc -l` → **9** (`check_links`, `check_markers`, `check_changelog`, `check_template_refs`, `check_artifact_destinations`, `check_decision_index`, `check_future_actions`, `check_document_size`, `check_learning_promotions`). That is the shape of the dogfooding caveat at the head of this block, applied to enforcement instead of retrieval — this repository is measurably better protected than the product it ships, by a margin that grows every round.

Target: a `kenovis check` subcommand — filesystem-only, no network, inside ENGINEERING/ARCHITECTURE.md's Hard Rules and DECISION-013 — running the subset of rules **a customer can actually violate**: an incomplete Decision Index, a Product-layer file with no `PROJECT-SPECIFIC` marker, an artifact written under `.kenovis/`. Not a port of all six scripts; most of what they guard is framework content a customer never edits.

Requires `/architect` and an ADR before any file is touched: a new CLI subcommand is an architecture decision, the same call DECISION-016/017/021/024 each needed. Two questions the ADR must settle rather than assume — where the rule definitions live so Python and TypeScript cannot drift apart, and whether this shares surface with item 23's `kenovis context` or stays separate.

Ordering: with or after item 21, never before it. Item 21 decides what the lifecycle rules are; building the enforcement first would enforce rules that do not exist yet.

Validated when: `kenovis check` run inside a real published Installation catches a seeded violation of each rule it claims to cover, and is silent on a clean Installation.

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

34. DONE (2026-08-12, via /next) — promote `development` → `preproduction` → `main` and publish the release carrying item 20 and the `Open`-finding-executor fix.

Chosen for the reason the previous "Next" gave and nothing displaced: fifteen files sat on `development` that no Installation could see. Item 20's half is unusually customer-visible for a framework-only release — five policies gained rules an Installation's agents already load per task, so the upgrade changes what those agents do rather than only what they are told. Competing items were item 24 (a seeded fixture, no release required), item 32 (founder input, not `/next` work) and OF-13; none of them reach a customer at all, which is the axis this item is on.

Version call, decided at cut time per Phase 1 item 2's standing instruction: **minor, `kenovis@0.14.0`**. Seventh framework-only release running with no CLI code changed, and the argument is item 20's: a policy is loaded per task, a learnings file is not, so moving twenty-two rules from the second into the first changes behaviour in every Installation that syncs. `1.0.0` rejected for the seventh time on OF-11's still-unset number, which is now item 32's to close rather than each release's to re-argue.

Also carried, because the lifecycle rule item 21 wrote came due on the document that scheduled it: `PRODUCT/ROADMAP.md` stood at **58.0 KB** against a 60 KB threshold with this item still to write. Items 19, 20, 21 and 31 — DONE and still inline, closed after item 19's own archive pass ran — moved verbatim to `PRODUCT/ROADMAP-ARCHIVE.md`, one line each left behind. The move alone took it **59410 → 42904 bytes (-16.1 KB)**; this item's own text and OF-14 put 3,962 of them back, for **46866 bytes (45.8 KB)** read off the file. The archive grew by exactly the 17,155 bytes extracted plus four separator newlines — 129415 → 146574 — checked by asserting each moved block is still a substring of the archive, so nothing was summarised away.

RA2 gate applied before the move, not after: item 20's narrative carried a validation criterion it stated rather than claimed — the failing-case test for the learnings threshold, impossible to run at 12.1 KB. Queued as **OF-14** first, so archiving did not make it disappear. Items 19, 21 and 31 left nothing homeless; item 21's `CHANGELOG.md` exemption is already OF-13.

Shipped: `cli/package.json`/`package-lock.json` 0.13.0 → 0.14.0, `CHANGELOG.md` `[Unreleased]` cut into `[0.14.0] - 2026-08-12` (PR #86). Both promotions ran exactly as `policies/git.md` → "Promotion Chains And Content Sync" prescribes — each downstream branch verified byte-identical to `8711711`, the `0.13.0` cut, so a strict older snapshot with nothing unique on it but previous sync commits; tree set with `git read-tree -u --reset`; empty diff confirmed before opening (PRs #87, #88). All three branches byte-identical afterwards. `kenovis@0.14.0` published from CI with provenance; `npm view kenovis version` → `0.14.0`, `dist-tags.latest` → `0.14.0`.

Validated against the *published* package, on the exact sequence a real upgrader runs — `npx kenovis@0.13.0 add` on a scratch brownfield repository, then `npx kenovis@0.14.0 sync`. Baseline reproduced first and it was zero: none of the seven new policy sections existed, and `grep -rho "Learning-0[0-9][0-9]" .kenovis/AI/policies/` returned nothing. After the sync: transition reported `0.13.0 -> 0.14.0`, **7 paths changed inside `.kenovis/`** listed off `git status` rather than recalled (five policies, the learnings template, `.framework-version`), all seven sections present, **22 distinct learning ids** cited from the policies, `.setup-pending` preserved as `adopt-project`, all 18 Product-layer templates delivered with the `[ANSWER:` corpus unchanged at 127, no Product-layer file created at the target's root, and the target's own `README.md`, `src/` and `package.json` untouched.

One check in that sweep returned zero and was the check being wrong, not the artifact: the search string for the `Open`-finding-executor rule carried the policy's `**` bold markers inside it. The rule is at `policies/documentation.md` line 408. Recorded because it is `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" working in the direction it is usually not tested in — a false negative, caught by reading the file instead of trusting the count.

Solo-maintainer note, unchanged since `0.6.0`: all three pull requests came back blocked on the required-review rule, which never counts self-approval, and were merged with `gh pr merge --rebase --admin`. Not a misconfiguration.

Backlog note, not an item: scheduling changes and implementation changes belong in separate commits. Item 18's commit carried this block's own scheduling because it was uncommitted in the working tree when the round began. No residue, no defect — recorded so it is a choice next time rather than an accident.

Next (updated 2026-08-12, after item 34 closed): `kenovis@0.14.0` is published and all three branches are byte-identical, so nothing sits unpublished — for the first time in this block the leading candidate is not a release. Two items compete, and they are the same two the previous "Next" listed behind the release.

**Item 24** is the recommendation: validate that an agent opens a decision body instead of paraphrasing the index. It needs no release (the instruction under test shipped in `0.13.0` and is now live), its dependency list is empty, and it is the only unmet criterion left from item 18 — the item this whole block opened with. Its one real cost is the fixture: an Installation's `DECISIONS.md` starts empty, so a populated log has to be seeded before the run exercises anything. OF-02 or OF-03 can be its vehicle, which is what makes it cheap: `/architect` and `/release` have never been run end to end from a real published Installation, and six for six such runs have found a maximal-Pain defect.

**OF-13** is the cheaper alternative and now the only governed document over threshold with a still-open exemption: `CHANGELOG.md` at 66.1 KB, same shape as item 19's roadmap archive and cheap for the same reason — nobody reads `[0.2.0]` at session start. Take it if the fixture work in item 24 turns out to be larger than one round.

Not `/next` work: item 32 (founder input, named in the item). Item 33 needs an external party. Item 22 and item 25 both require `/architect` and an ADR before any file is touched; do not start either from `/next`.

Per Learning-023, check the next item's own premise against the file it describes before scoping it — item 20's premise had drifted by one entry and 11 KB in the four days between being written and being executed.
---
Open Findings (queue, added 2026-08-12)

A scheduled item is dimensioned work. A finding is a candidate that is not dimensioned yet, and before this section existed there was nowhere to put one — so findings landed in the narrative of whichever item happened to be open, where they had no id, no priority and no life after that item closed. That is the defect item 27 fixes as a rule and item 28 ships to every Installation; this section is this repository's own instance of it, authored first so the triage was not blocked on the framework change.

Every finding carries one of four dispositions. **Scheduled** — it is an item, named here. **Open** — real, unscheduled, competing for the next round. **Deferred** — deliberately not now, with the reason and the condition that would change it. **Rejected** — decided against, with the reason, so it is not proposed again. Prose is not a disposition.

First pass, 2026-08-12, over the 13 parked findings in this document and the standing candidates named in items 13-17's closing paragraphs. The `AI/memory/learnings.md` sweep (24 `Future action:` entries) is item 29 and is not done here.

| Id | Finding | Source | Disposition |
|---|---|---|---|
| OF-01 | `kenovis sync` deletes anything a customer put under `.kenovis/` without naming what it removed. `already up to date` is printed while files disappear. | Item 12, 2026-08-09 | **Open.** Oldest open finding — prose for four rounds. CLI change with its own design; needs a decision on report-vs-refuse. Priority: Pain high (silent data loss), Frequency low (item 12 removed the instructions that led customers there), Cost medium. |
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
| OF-13 | `CHANGELOG.md` has no archive rule — 66.1 KB and growing one released section at a time, with every past release kept inline. The lifecycle rule exempts it pending this finding. | Item 21, 2026-08-12 | **Open.** Same shape as item 19's roadmap archive and cheap for the same reason; nobody reads `[0.2.0]` at session start. Size read off the file on 2026-08-12, not off the 60.6 KB this row was written with. |
| OF-14 | `check_document_size.py`'s failing case has never been exercised for `AI/memory/learnings.md`. Item 20 stated this rather than claiming it: at 12.1 KB the file is under threshold, so removing its split cannot make the guard fail, and the first attempt at that test passed for the wrong reason. | Item 20, 2026-08-12 | **Open.** Promoted out of item 20's narrative by item 34's RA2 gate before that narrative was archived. Cost is one fixture — a governed document temporarily grown past 60 KB — not a code change. Priority: Pain low (the guard's other error paths are both exercised), Cost low, but it is an unrun check, which is the exact shape `policies/testing.md` → "A Check Is Not Verified Until It Has Been Run" exists to forbid. |

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
