# Changelog

All notable changes to the Kenovis AI-OS **framework layer** are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). This log tracks the reusable framework (`.kenovis/AI/`, `CLAUDE.md`, `README.md`, `cli/README.md`) — not product-layer content, which is scaffolding meant to be rewritten per product via [.kenovis/AI/commands/init-project.md](.kenovis/AI/commands/init-project.md).

## [Unreleased]

### Changed

- **The session-initialization protocol reads `DECISIONS.md` as an index, not as seventeen decision bodies.** A decision log is append-only by design and grows without bound; every session was paying the whole file to consult none of it. Measured over 2026-07-30 → 2026-08-10 in this repository, `DECISIONS.md` went 9.8 KB → 119.9 KB in eleven days, and the mandatory read of `COMPANY_OS.md` + `DECISIONS.md` + `AI/SYSTEM.md` stood at ~138 KB before any work started.

  `COMPANY_OS.md` and `.kenovis/AI/SYSTEM.md` stay full reads. `DECISIONS.md` is read as its Decision Index — one line per decision, stating what that decision settled. A body is opened on demand, and **citing a decision requires opening it**: the index says what was settled, never why, and a citation built on the index alone is a preference wearing a decision's ID.

  Stated in `.kenovis/AI/SYSTEM.md` → "Context Loading Rules" (1.4 → 1.5), `.kenovis/AI/commands/bootstrap.md` Step 2 (2.5 → 2.6), and this repository's own root `CLAUDE.md` (2.1 → 2.2). Two further sites told an agent to read the log rather than the index and were found by enumerating every read instruction rather than the three the item named (Learning-022's rule): `agents/database.md` (1.1 → 1.2), which sent a designer to the whole log for the engine and tenancy model, and `workflows/framework-review.md` (1.0 → 1.1), whose reading scope named DECISION-001/009/010 by number and now names the index's framework-level marks. Measured on the read path: this repository 138.2 KB → 22.2 KB (**-84%**); an Installation whose log has grown to the same size, 135.6 KB → 19.7 KB (-85%). A day-one Installation whose log is still the template saves 2.6 KB of 19.2 KB — the bound matters as the log accumulates, which is the point.

### Added

- **`DECISIONS.md` gains a Decision Index**, and the Product-layer template ships the section empty so every Installation starts with it (`.kenovis/AI/templates/product-layer/DECISIONS.md` 1.1 → 1.2) instead of discovering the need for one at 100 KB. The item that scheduled this work assumed the index already existed; it did not — what sat at the head of the file listed fourteen of seventeen decisions by bare title. See `AI/memory/learnings.md` Learning-023.

- **`.github/scripts/check_decision_index.py`, wired into CI** beside the three existing docs-integrity guards. Reading an index instead of a log is only safe while the index is complete: a decision body with no index line is invisible to every session that follows it. The check fails on a body without an index line, an index line without a body, a duplicate, or a line that states a title and little else. Confirmed to fail on the pre-change tree before being kept.

  Per Learning-021 and Learning-022 the script states which of its parts is exact and which is not: the population — every `# DECISION-NNN` heading and every `- **DECISION-NNN**` index line — is exact and both counts print on every run; the substance test is a length heuristic and cannot tell a long empty line from a short useful one. Its scope is this repository only, because the bundle ships `.kenovis/AI/` and not `.github/` — a customer Installation carries the rule as an instruction with no guard behind it.

- **`.kenovis/AI/policies/documentation.md` → "A Decision Is Not Recorded Until Its Index Line Exists"** (2.2 → 2.3): writing a decision body and writing its index line are one change, never two; the index line says what was settled and never why; superseding updates the index line and leaves the body in place.

## [0.12.0] - 2026-08-10

Aligned with the `kenovis` npm package's own version, same as [0.2.0] through [0.11.0] — see `cli/package.json` and `cli/README.md` → "Cutting a release". Minor rather than patch, decided at cut time per the standing instruction in `PRODUCT/ROADMAP.md` Phase 1 item 2, and for the fifth release running the habitual answer would have been patch: not one line of CLI code changed and everything here is a bug fix. But this package bundles the framework files themselves, and fourteen of them changed — eight instruction documents changed behaviour across ten sites, six workflows changed content. An Installation syncing to this release gets `/review`, `/bug`, `/analyze`, `/feature`, `/next`, `/architect` and `/bootstrap` telling an agent where what they produce belongs, where before they said nothing. That is the same distinction [0.5.0], [0.7.0], [0.8.0], [0.10.0] and [0.11.0] drew.

`1.0.0` was considered and rejected again, for the reason [0.9.0] through [0.11.0] gave: it would signal maturity Phase 1 has not validated, with one external team on record and the MVP Success Metrics still without a target.

**Nothing breaks for an existing Installation, and nothing is lost by upgrading** — with the same caveat [0.10.0] and [0.11.0] carried, now for a wider set of commands: if you already followed one of these instructions as written and wrote a review report, resolution report, analysis report, completion summary or execution plan anywhere under `.kenovis/`, `kenovis sync` has already deleted it, or will on your next sync. Your own git history is the only copy. Check `git log -- .kenovis/` before syncing if you are unsure.

### Fixed

- **Nine instructions told an agent to produce a report, a plan or a result and never said where it goes.** `/review` Step 12 is the one that surfaced it: "Generate Review Report", the sections it must contain, and nothing else. No destination, and no template citation either — so `check_template_refs.py`, added in [0.11.0] to end exactly this defect class, passed the whole tree clean.

  Reproduced against the published `kenovis@0.11.0` by executing `/review` end to end from a real Installation (`PRODUCT/ROADMAP.md` Phase 1 item 16): the review report, carrying a Critical tenant-isolation finding the review had correctly found, was written under `.kenovis/` — nothing in `/review` says not to, and everything else Kenovis owns lives there — committed, and deleted by the next `kenovis sync`, which reported `0.11.0 -> 0.11.0 (already up to date)` and never named the file it removed. Third release running, third identical reproduction.

  Ten sites now say one of the only two correct things: the Product-layer document that records the artifact's durable residue, or that the artifact is delivered in the session and is not a file to create. `commands/review.md` Step 12, `commands/bug.md` Step 12, `commands/analyze.md` Steps 7 and 9, `commands/architect.md` Step 5, `commands/bootstrap.md` Step 9, `commands/next.md` Steps 8 and 15, `commands/feature.md` Step 13, `workflows/review.md` Phase 10.

  Why [0.11.0]'s guard missed them: it enumerates every reference to a working template — fifteen, an exact population — and that was the right fix for the verb-set grep before it. But it answers "where does an agent get *sent* to write?", and the question that matters is "where may an agent write *at all*?". The second population is larger and does not contain the first: an instruction can produce a report while citing no template, which is what all nine surviving sites did. See `AI/memory/learnings.md` Learning-022.

- **All six workflows ended with an unmatched code fence**, so the tail of `architecture.md`, `bugfix.md`, `feature.md`, `hotfix.md`, `release.md` and `review.md` opened a code block that never closed. The same cosmetic defect [0.11.0] fixed in five templates without looking at the workflows.

### Added

- **`.github/scripts/check_artifact_destinations.py`, wired into CI** beside `check_template_refs.py`, which it does not replace — the two enforce the two halves DECISION-024 separated, over different populations. Every `# Step N` / `# Phase N` block that produces an artifact must name a Product-layer destination or state that the artifact is session-only. Never a path under `.kenovis/`. Confirmed to fail on the published `kenovis@0.11.0` tree, naming nine sites, before being kept.

  The script states which of its parts is exact and which is not, because the two previous sweeps under-reported by not stating it: the population — every Step/Phase block under `commands/` and `workflows/` — is exact and its size prints on every run; the classifier deciding which blocks produce an artifact is a verb-and-noun heuristic that cannot be complete, and its count prints too. `commands/next.md` Step 15 was fixed in this round and the classifier does not see it, which is the demonstration rather than an oversight.

## [0.11.0] - 2026-08-10

Aligned with the `kenovis` npm package's own version, same as [0.2.0] through [0.10.0] — see `cli/package.json` and `cli/README.md` → "Cutting a release". Minor rather than patch, decided at cut time per the standing instruction in `PRODUCT/ROADMAP.md` Phase 1 item 2, and for the fourth release running the habitual answer would have been patch: not one line of CLI code changed and everything here is a bug fix. But this package bundles the framework files themselves, and seven of them changed — two commands changed behaviour, five templates changed content. An Installation syncing to this release gets `/bug` and `/release` telling an agent to record what they produce somewhere different from where they told it before. That is the same distinction [0.5.0], [0.7.0], [0.8.0] and [0.10.0] drew.

`1.0.0` was considered and rejected again, for the reason [0.9.0] and [0.10.0] gave: it would signal maturity Phase 1 has not validated, with one external team on record and the MVP Success Metrics still without a target.

**Nothing breaks for an existing Installation, and nothing is lost by upgrading** — with the same caveat [0.10.0] carried, now for two more commands: if you already followed `/bug` Step 2 or `/release` Step 8 as written and filled in `.kenovis/AI/templates/bug-report.md` or `release-notes.md`, `kenovis sync` has already deleted it, or will on your next sync. Your own git history is the only copy. Check `git log -- .kenovis/AI/templates/` before syncing if you are unsure.

### Fixed

- **`/bug` and `/release` still pointed at a template as the only place to put what they produce — the fix in [0.10.0] missed them.** `.kenovis/AI/commands/bug.md` Step 2 read "Create Bug Report / Use: `.kenovis/AI/templates/bug-report.md`" and `.kenovis/AI/commands/release.md` Step 8 read "Generate Release Notes / Use: `.kenovis/AI/templates/release-notes.md`". Neither named a destination, and since [0.10.0] the templates themselves say "fill it in where the workflow that sent you here says to record the artifact" — which those two commands never say. Template defers to command, command is silent, and the only path an agent has been given is the one inside `.kenovis/`.

  Reproduced against the published `kenovis@0.10.0`: a bug report filled in at `.kenovis/AI/templates/bug-report.md` and committed was deleted by the next `kenovis sync`, which reported `0.10.0 -> 0.10.0 (already up to date)` and never named the file it reverted.

  Both steps now carry the same shape the paired workflows already had. `/bug` Step 2 says the report shapes the session rather than becoming a file, and points at the regression test and `AI/memory/learnings.md` as what survives it. `/release` Step 8 says to publish release notes wherever `AUTOMATIONS/release-process.md` records that this product publishes them.

  Why [0.10.0] missed them: that round found its eleven sites with a grep over a verb set, so the fix's scope was whatever the pattern matched. These two say "Use:". A pattern that defines its own scope cannot report what it missed — the same failure `AI/memory/learnings.md` Learning-016 and Learning-018 each record for counts, now for a sweep. Found by executing `/bug` end to end from a real published Installation (`PRODUCT/ROADMAP.md` Phase 1 item 14); see Learning-021.

- **Five working templates ended with an unmatched code fence**, so the tail of `adr.md`, `bug-report.md`, `decision.md`, `feature-plan.md` and `release-notes.md` opened a code block that never closed. Cosmetic, and present since each file was written.

### Added

- **`.github/scripts/check_template_refs.py`, wired into CI**, so DECISION-024 stops depending on someone remembering it. Every reference to a working template from anywhere else under `.kenovis/AI/` must state that the path is a form rather than a destination, or cite DECISION-024, within a few lines. The check enumerates all fifteen references instead of pattern-matching imperatives, which is the specific way the previous sweep under-reported. Confirmed to fail on the pre-fix tree — naming both real defects — before being kept.

  Five workflow sites (`architecture.md`, `bugfix.md`, `feature.md`, `hotfix.md`, `roadmap.md`) were correct already: each names `DECISIONS.md` as the destination and the template only as "Shaped by:". They gained a one-line citation so the invariant is uniform and mechanically checkable, rather than the check having to judge English it cannot judge.

## [0.10.0] - 2026-08-09

Aligned with the `kenovis` npm package's own version, same as [0.2.0] through [0.9.0] — see `cli/package.json` and `cli/README.md` → "Cutting a release". Minor rather than patch, decided at cut time per the standing instruction in `PRODUCT/ROADMAP.md` Phase 1 item 2, and this round the habitual answer would again have been patch: not one line of CLI code changed and everything here is a bug fix. But this package bundles the framework files themselves, and fifteen of them changed — nine instruction documents and six templates. An Installation syncing to this release gets workflows that tell an agent to write somewhere different from where they told it before. That is the same distinction [0.5.0], [0.7.0] and [0.8.0] drew.

`1.0.0` was considered and rejected again, for the reason [0.9.0] gave: it would signal maturity Phase 1 has not validated, with one external team on record and the MVP Success Metrics still without a target.

**Nothing breaks for an existing Installation, and nothing is lost by upgrading** — but if you already followed one of the old instructions and wrote a feature plan, design spec, bug report or ADR into `.kenovis/AI/templates/`, `kenovis sync` has already deleted it, or will on your next sync. Your own `git history` is the only copy. Check `git log -- .kenovis/AI/templates/` before syncing if you are unsure.

### Fixed

- **Every workflow that told an agent to produce a document named a template's own path as the place to write it — inside `.kenovis/`, which `kenovis sync` deletes.** Eleven instructions across `.kenovis/AI/workflows/feature.md`, `bugfix.md`, `hotfix.md`, `architecture.md`, `roadmap.md`, `release.md`, `.kenovis/AI/commands/feature.md` and `.kenovis/AI/agents/designer.md` read "Generate: `.kenovis/AI/templates/feature-plan.md`", "Update: `.kenovis/AI/templates/bug-report.md` with final resolution details", "Create: `.kenovis/AI/templates/decision.md`". A template's path was given where a destination belongs, so one path named both the blank form and the filled-in document.

  Followed literally in an Installation, the artifact lands in the one directory `sync` mirror-replaces. Reproduced against the published `kenovis@0.9.0` package: a feature plan written to `.kenovis/AI/templates/feature-plan.md` and committed was deleted by the next `kenovis sync`, which restored the pristine template, reported `0.9.0 -> 0.9.0 (already up to date)`, and never named the file it removed. Followed carefully instead, the same instruction gives no destination at all, so two runs in the same Installation land in different places.

  Every site now names the artifact, the Product-layer document that records its durable residue, and the template that shapes it — separately. Destinations are files every Installation already has: an ADR or hotfix decision record in `DECISIONS.md`, a `FEATURE-NNN` spec in `PRODUCT/FEATURES.md`, a bug's reusable residue in `AI/memory/learnings.md`, release notes wherever `AUTOMATIONS/release-process.md` says this product publishes them. No new directory is created, at setup or ever. Each of the six working templates now carries a line saying it is a form and not a destination, so an agent that reads only the template still gets the rule. See DECISION-024.

- **`/feature` Phase 2 required a `FEATURE-NNN` spec that nothing in the framework wrote before implementation.** `/init-project` and `/adopt-project` seed `PRODUCT/FEATURES.md` with what already ships, and `/feature`'s own Phase 13 updates it afterwards — so the workflow's first input was produced by its last step, and the first feature in any Installation began with a step that could not be satisfied. Phase 2 now authors the spec into `PRODUCT/FEATURES.md` using that file's own Feature Specification Template when none exists, and says so explicitly: writing it is the phase's output, not a missing input.

- **`.kenovis/AI/commands/architect.md` offered `ENGINEERING/ADR/` as a place to record an ADR.** That path appears exactly once in the whole framework, is created by neither setup command, is absent from the seventeen Product-layer templates, and does not exist in this repository either, which has always recorded ADRs in `DECISIONS.md`. Retired; a product that prefers separate ADR files records that choice in `AI/memory/conventions.md`.

  Found by executing `/feature` end to end from a real published Installation for the first time (`PRODUCT/ROADMAP.md` Phase 1 item 12) — the third post-setup command to be run this way and the third to surface a maximal-Pain defect, after `/init-project` (item 6) and `/adopt-project` (item 8). None of the three is visible from inside this repository, where `.kenovis/AI/` is the product's source rather than a synced copy. See `AI/memory/learnings.md` Learning-020.

### Changed

- `DECISIONS.md` → "Document Layers" listed eight framework-level decisions and claimed framework-layer files cite all eight by ID. Four are not cited, and five decisions that are cited were missing from the list. Now fourteen entries with the nine cited ones marked, counts read off the tree with `grep -rho "DECISION-0[0-9][0-9]" .kenovis/AI` per `AI/memory/learnings.md` Learning-016.

## [0.9.0] - 2026-08-09

Aligned with the `kenovis` npm package's own version, same as [0.2.0] through [0.8.0] — see `cli/package.json` and `cli/README.md` → "Cutting a release". Minor rather than patch, and unlike the last two rounds the call needs no argument: CLI code changed (the stub written on every install), seventeen templates changed content, and both `/init-project` and `/adopt-project` changed behaviour.

**Read this before syncing.** An Installation created before this release keeps the old marker wording on the Product-layer files it already authored, and `kenovis sync` will not update them — it never touches a Product-layer file, by design (RULE-INST-01). Those files keep telling the next agent they are placeholder content until you edit line 1 by hand. The new wording is below; the `PROJECT-SPECIFIC` token is what every mechanism actually reads, so a file left as-is still works — it is only the sentence after the token that is wrong, and only for a reader.

### Fixed

- **Line 1 of every Product-layer document told the next agent it was reading placeholder content.** The `PROJECT-SPECIFIC` marker read `placeholder content. Rewrite when starting a new product. See .kenovis/AI/commands/init-project.md` — false the moment `/init-project` or `/adopt-project` authors the file, which is to say false for the entire life of every real Installation, and naming the wrong command in an adoption. This is the first thing read in `COMPANY_OS.md`, the top of the Source Of Truth Hierarchy, at the start of every session; it is also what the Collision Guard (DECISION-019) reads to decide whether a file may be overwritten without asking. The one line whose job is to protect authored content was describing that content as scaffolding.

  The marker now states which layer a file belongs to and nothing about whether it has been filled in — true of a template nobody has answered and of a document a company has owned for a year — and carries the fact a reader actually needs at that point: `kenovis sync` never overwrites it. Three wordings, matching the three kinds of Product-layer file the framework already distinguished (general, `AI/memory/` recorded knowledge, and `glossary.md`'s split between Domain and Framework Terms). 37 files updated: 17 templates (each bumped a minor version), this repository's own 17 Product-layer documents, `README.md`, `cli/README.md`, and the one literal example inside `init-project.md`.

  Root cause is the conflation DECISION-022 fixed three days earlier in the adjacent marker: one marker carrying both "which layer" and "what state" cannot be true in both. `[ANSWER: ...]` remains the sole carrier of "unanswered". Both commands (`.kenovis/AI/commands/init-project.md` and `adopt-project.md`, 1.9 → 1.10) and `.kenovis/AI/templates/product-layer/README.md` (1.2 → 1.3) now state the layer/state distinction explicitly. See DECISION-023 and `PRODUCT/ROADMAP.md` Phase 1 item 10.

  No mechanism changed and no Installation breaks: `check_markers.py` and the Collision Guard both match the bare `PROJECT-SPECIFIC` token, never the sentence after it, and no `.py`/`.ts`/`.mjs` file matches any part of that sentence. An Installation created before this release keeps the old wording on its authored files — `sync` never touches a Product-layer file (RULE-INST-01), so those stay as they are until the customer updates them by hand.

- **The `CLAUDE.md` stub omitted `AI/memory/` from the Product layer it enumerates.** `claudeStubContent` (`cli/src/domain/installation.ts`) listed `COMPANY_OS.md, DECISIONS.md, PRODUCT/, DOMAIN/, ENGINEERING/, AUTOMATIONS/, and this repository's own code` — while `/init-project` Step 8 and `/adopt-project` Step 9 both create `AI/memory/`, and roughly twenty framework files instruct agents to record a learning there or look up a term. Present since the stub was introduced.

  Every existing test compared `claudeStubContent` against its own output, which cannot catch an omission and did not. A test now pins the enumeration against the list of Product-layer paths the commands create, and was confirmed to fail on the old content before being kept (109 `cli/` tests, up from 108).

## [0.8.0] - 2026-08-09

Aligned with the `kenovis` npm package's own version, same as [0.2.0]/[0.3.0]/[0.4.0]/[0.5.0]/[0.6.0]/[0.7.0] — see `cli/package.json` and `cli/README.md` → "Cutting a release". Minor rather than patch, decided deliberately per the standing instruction in `PRODUCT/ROADMAP.md` Phase 1 item 2, and this round the habitual answer would again have been patch: not one line of CLI code changed, and everything here is a bug fix. But this package bundles the framework files themselves. Three Product-layer templates changed content and two commands changed behaviour — an Installation that syncs to this release gets templates that ask three questions they previously answered for it, and a Verify step that asks for something it did not ask for before. That is the same distinction [0.5.0] and [0.7.0] drew: more than a CLI bug fix, so minor.

Nothing breaks for an existing Installation. A Product layer already authored from the 0.7.0 templates stays valid — but if it was authored from the `ENGINEERING/SECURITY.md`, `AUTOMATIONS/release-process.md` or `AUTOMATIONS/user-feedback.md` template, read those three documents back after syncing: the content this release replaces with questions was inherited as fact, and syncing does not touch a Product-layer file the customer already authored.

### Fixed

- **Three Product-layer templates shipped this framework's own answers as if they were framework-level prose, and every Installation inherited them as fact.** `ENGINEERING/SECURITY.md` stated "Authorization Model: not applicable in v1 — no accounts, no shared backend" and "Audit System: not applicable in v1 — no backend exists to hold audit records", and described the CLI writing to a customer's filesystem as the product's sensitive operation, citing `RULE-INST-01`/`02` — rule IDs that exist only in this repository's decision log. `AUTOMATIONS/release-process.md` defined staging as "validate the CLI before publishing" and production as "serve real customers via the published npm package". `AUTOMATIONS/user-feedback.md` named GitHub Issues as the feedback system of record. Eleven `[ANSWER: ...]` instructions now replace that content across the three files (`ENGINEERING/SECURITY.md` 1.1 → 1.2, `AUTOMATIONS/release-process.md` 1.1 → 1.2, `AUTOMATIONS/user-feedback.md` 1.1 → 1.2); `AUTOMATIONS/customer-onboarding.md`, derived in the same original round, was already clean.

  Neither command's Verify step could catch this: both grep for `[ANSWER:`, which is by construction the one marker a leftover answer does not carry. Found by executing `/adopt-project` end to end against a real `npx kenovis@0.7.0` Installation for the first time (`PRODUCT/ROADMAP.md` Phase 1 item 8) — the brownfield command had never been run, and the fixture, a court-booking API with accounts, roles and a hosted deployment, inherited a security document denying it had any of them while passing Verify clean. See `AI/memory/learnings.md` Learning-017.

- `AUTOMATIONS/release-process.md`'s Development Environment carried `[ANSWER: Build and experiment on the product's source.]` — an answer written inside a question marker, so a reader could not tell whether it was theirs to replace.

### Changed

- Both commands' Verify step now says to read back the sections that came over from a template verbatim, not only to check that questions were answered (`.kenovis/AI/commands/init-project.md` 1.8 → 1.9, `.kenovis/AI/commands/adopt-project.md` 1.8 → 1.9). `/adopt-project`'s verify-by-contrast requirement — every factual claim must cite the customer's code or be marked Low confidence — now extends to `AUTOMATIONS/`, where two of the three cases above were; it already covered `ENGINEERING/` and `DOMAIN/`, and applied literally it was the only check in either command that would have caught them.
- `.kenovis/AI/templates/product-layer/README.md` (1.1 → 1.2) gains "How a template goes wrong, and how to see it": what a leftover answer looks like, the two questions that separate it from framework-level prose, and a starting grep. The rule it documents was already stated and was broken anyway, so the section is about detection rather than restating the rule. It says plainly that no pattern can gate this — an inherited answer phrased in generic words is invisible to any check.

## [0.7.0] - 2026-08-09

Aligned with the `kenovis` npm package's own version, same as [0.2.0]/[0.3.0]/[0.4.0]/[0.5.0]/[0.6.0] — see `cli/package.json` and `cli/README.md` → "Cutting a release". Minor rather than patch, and the call is deliberate rather than habitual: no CLI code changed at all this round, which alone would argue for a patch. But this package bundles the framework files themselves, and fifteen of them changed content while two changed behaviour — an Installation that syncs to this release gets rewritten Product-layer templates and a `/init-project`/`/adopt-project` Verify step that reports something different from what it reported before. That is more than a CLI bug fix, which is the same distinction [0.5.0] drew. Nothing breaks for an existing Installation: a Product layer already authored from the 0.6.0 templates stays valid, since the marker change affects unanswered questions only.

### Fixed

- **`/init-project` and `/adopt-project`'s Verify step could not tell an unanswered template question from content that is supposed to survive.** Both used `grep -rn "^\["`. Run against this repository's own completed Product layer it returned 29 matches and zero real ones — format specifications (`DOMAIN/BUSINESS_RULES.md` → "Rule Format", `PRODUCT/FEATURES.md`'s FEATURE-NNN shape), illustrative examples, markdown `[ ]` checkboxes, and the deliberate "nothing recorded yet" statements the commands themselves prescribe. Meanwhile it missed every question not at column 0, including the entire `### [Entity]` / `Definition:` / `Attributes:` block in `DOMAIN/DOMAIN_MODEL.md` — the layer `init-project.md` Step 4 calls the one where a guess does the most damage. Both commands' Completion Criteria ("No bracketed template instruction survives") were therefore unsatisfiable as written; this repository's own Product layer violates them. Found by executing `/init-project` end to end against a real `npx kenovis@0.6.0` Installation (`PRODUCT/ROADMAP.md` Phase 1 item 6) — the templates shipped in 0.6.0 had been validated for delivery, never for execution. See `AI/memory/learnings.md` Learning-015 and DECISION-022.
- `ENGINEERING/ARCHITECTURE.md`'s template shipped its six required Technology Stack choices (`- Frontend (web / mobile):`, `- CLI/tooling layer:`, …) as bare labels with no placeholder at all, so a stack left entirely unanswered passed Verify — while the same template's own text warns that "a missing line reads as unknown, which makes them guess."

### Changed

- Templates now mark a question for the human as `[ANSWER: ...]`, and that marker alone is what the Verify step greps (`grep -rn "\[ANSWER:"`, deliberately unanchored so mid-line questions are caught). Plain brackets are reserved for content that legitimately survives into a completed document. 110 instructions across 13 templates were converted (published as "15" and corrected after the release smoke test counted the changed files — see `AI/memory/learnings.md` Learning-016; the templates' own `README.md` also changed, but documents the convention rather than being a template); the 43 remaining plain brackets are all format specifications, illustrative examples or deliberate-empty statements, each one verified present in this repository's own completed equivalents. In a customer Installation the new check returns zero on a completed Product layer; in this repository it also matches the prose in `DECISIONS.md`/`PRODUCT/ROADMAP.md` that explains the marker, which is the DECISION-020/021 self-referential carve-out and not a defect. `.kenovis/AI/commands/init-project.md` (1.8 → 1.9), `.kenovis/AI/commands/adopt-project.md` (1.7 → 1.8) and `.kenovis/AI/templates/product-layer/README.md` (1.0 → 1.1) document the convention and when to use which form.

## [0.6.0] - 2026-08-08

Aligned with the `kenovis` npm package's own version, same as [0.2.0]/[0.3.0]/[0.4.0]/[0.5.0] — see `cli/package.json` and `cli/README.md` → "Cutting a release". Minor rather than patch: this release adds capability on both sides of the package. The CLI gains a fact it never tracked (`.kenovis/.framework-version`, reported by `init`/`add`/`sync`) and a `--version` flag, and the bundled framework gains seventeen Product-layer templates that make `/init-project` and `/adopt-project` executable in a real Installation for the first time. Nothing breaks: an Installation that syncs to this release keeps every file it authored, and both commands behave as before in a repurposed repository.

### Added

- Every Installation now records which Framework Release it tracks, in `.kenovis/.framework-version`. `cli/scripts/bundle-framework-assets.mjs` stamps the bundle with the npm package's own version at build time, so the mirror-replace `init`/`add`/`sync` already perform installs and update it — the CLI only reads it back and never maintains a second copy of the same fact (deliberately *not* an `INSTALL_TIME_OWNED_ENTRIES` member; that parallel bookkeeping is the failure mode `AI/memory/learnings.md` Learning-010/011 record). This closes a standing gap between `DOMAIN/DOMAIN_MODEL.md` → Installation ("framework version installed"; "an Installation tracks one Framework Release") and the code, which tracked nothing.
- `kenovis init`/`add` print the Framework Release they installed; `kenovis sync` prints the transition (`0.3.0 -> 0.5.0`, `0.5.0 -> 0.5.0 (already up to date)`, or `unknown -> 0.5.0` for an Installation predating the stamp — which that same sync fixes). An unstamped bundle or a hand-assembled `--source` directory reports `unknown` rather than being inferred from the running CLI's version, the same "recorded fact, not re-derived expectation" distinction Learning-008 established for the CLAUDE.md hash sidecar.
- `kenovis --version`/`-v` prints the CLI's own version. Checked before any dispatch, alongside `--help`, so it can never fall through to the bare autodetect path and install against the current directory (Learning-005).
- `.kenovis/AI/templates/product-layer/` — the Product layer's shape now ships inside the Framework bundle: seventeen templates plus a README, one per Product-layer document (`COMPANY_OS.md`, `DECISIONS.md`, `DOMAIN/`, `PRODUCT/`, `ENGINEERING/`, `AUTOMATIONS/`, `AI/memory/`), each at the path it maps to. Every template keeps its document's framework-level content verbatim and replaces the company-specific sections with a bracketed instruction stating what must be answered — never an invented answer. This closes a gap open since the CLI shipped: `kenovis init`/`add` create no Product-layer file at all, so an Installation had no `AI/memory/learnings.md`, `glossary.md` or `conventions.md`, while roughly twenty framework files instruct agents to record a learning there, promote one into `.kenovis/AI/policies/`, or look up a term. See `DECISIONS.md` DECISION-021 and `PRODUCT/ROADMAP.md` Phase 1 item 4.
- `ENGINEERING/ARCHITECTURE.md` (1.4 → 1.5) → "Hard Rules": the CLI must never create a Product-layer file in a target repository, not even a placeholder. Previously true of the implementation but stated nowhere, so nothing stopped a future change from "helpfully" scaffolding the Product layer at install time.

### Changed

- `cli/assets/framework/README.md` → "Updating" no longer says `kenovis sync` is a future command — it has shipped since `0.1.0`. The section now describes the real command and points at `.kenovis/.framework-version`.
- `cli/README.md` → "Upgrading" documents how to tell which Framework Release an Installation is on, offline and with no network dependency; "Structure" fixes the `bundle-framework-assets.mjs` description, which still described the pre-`.kenovis/` source path.
- **`.kenovis/AI/commands/init-project.md` (1.7 → 1.8) and `.kenovis/AI/commands/adopt-project.md` (1.6 → 1.7) now work in a real CLI Installation.** Both were written against a fork of this repository: `init-project.md`'s Trigger said "a fresh clone of this repository", its Core Principle was "the example content ... is a shape to replace", its pre-flight check was `grep -rl "PROJECT-SPECIFIC"` (which matches nothing after `kenovis init`), and Steps 2-8 instructed the agent to *rewrite* twelve files that do not exist. Both commands gained a "Where The Shape Comes From" section and changed verb throughout — author from template, not rewrite a placeholder — with pre-flight checks, `.gitignore` handling (a customer's own `.gitignore` is now explicitly left alone), Verify steps (which now also catch bracketed template instructions left unanswered) and Completion Criteria updated for a repository with no Product layer. Neither command's behaviour in a repurposed repository changed.
- `DECISIONS.md` → "Document Layers" said "Seven are framework-level" while listing eight, and claimed those eight should be carried over into a new product — contradicting `init-project.md` Step 3, which named three. Resolved per DECISION-021: a customer Installation's decision log starts empty, and this repository is the documented exception because its product *is* the framework (the same self-referential carve-out as DECISION-020). Framework files citing `DECISION-NNN` refer to the framework's own log, never to an Installation's.
- `DOMAIN/BUSINESS_RULES.md` (1.1 → 1.2) → "Edge Case Thinking" listed "an Installation still holding placeholder/example content" as a state to design for. That has never been true of a CLI Installation; the real edge case is an Installation with no Product layer at all.

## [0.5.0] - 2026-08-07

Aligned with the `kenovis` npm package's own version, same as [0.2.0]/[0.3.0]/[0.4.0] — see `cli/package.json` and `cli/README.md` → "Cutting a release". Minor rather than patch: the framework files this package bundles changed behaviour (`init-project.md`/`adopt-project.md` now clear the `CLAUDE.md` hash sidecar on completion), so an Installation that syncs to this release gets more than a CLI bug fix.

### Added

- `DECISIONS.md` → DECISION-020: this repository's own root `README.md` and root `CLAUDE.md` are a documented exception to DECISION-017's `.kenovis/` self-migration — they stay hand-authored at repo root (public landing page; repo-specific Role/Layers/Source-Of-Truth/graphify prose) instead of being replaced by the CLI's generic customer templates. Only `AI/agents/`, `AI/workflows/`, `AI/policies/`, `AI/commands/`, `AI/templates/`, `AI/SYSTEM.md` relocate to `.kenovis/AI/` (`PRODUCT/ROADMAP.md` Phase 0 item 8). `ENGINEERING/ARCHITECTURE.md` (1.3 → 1.4) → "Hard Rules" states the exception. `AI/memory/learnings.md` gains Learning-009.

### Changed

- **Breaking (repository layout, not the published package):** this repository's own Framework layer now lives under `.kenovis/AI/` — `AI/agents/`, `AI/workflows/`, `AI/policies/`, `AI/commands/`, `AI/templates/` and `AI/SYSTEM.md` moved, closing the inconsistency DECISION-017 flagged as "temporary and explicitly tracked." `AI/memory/` stays at the repository root (Product layer). Every navigational cross-reference in `README.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `.gitignore`, `.claude/commands/*.md`, `.github/**`, the Product-layer documents and the relocated files themselves was repointed; historical entries in `DECISIONS.md`, `CHANGELOG.md` and `PRODUCT/ROADMAP.md` were deliberately left as written, since they record what was true when written. Consumers of the published `kenovis` package are unaffected — the bundled Framework layer's own internal shape (`AI/` inside `.kenovis/`) is unchanged.
- `cli/scripts/bundle-framework-assets.mjs` now sources the bundle from `.kenovis/AI/` instead of the repository root's `AI/`, and no longer needs its `memory/` exclusion — that directory is no longer inside the tree it copies.
- The relocated framework files' `Version: X.Y` headers were deliberately left unchanged. Per `CONTRIBUTING.md` → "Versioning framework files" that header tracks a file's substance, and a path repoint changes none — bumping ~40 files would tell the next reader "this content changed" when it did not.
- `.github/scripts/check_changelog.py` watches `.kenovis/AI/` instead of `AI/`. Previously the `AI/` prefix also matched `AI/memory/`, which is Product layer, so the changelog gate fired on changes it was never meant to cover.
- `AI/memory/learnings.md` gains Learning-010: `kenovis sync` deletes `.kenovis/.setup-pending` and reverts the `CLAUDE.md` stub to steady state, disarming DECISION-018's first-session auto-trigger on an Installation that has not completed setup. Pre-existing behavior, found by this round's smoke test, recorded as a backlog item rather than fixed here — closed in this same release, see "Fixed" below.
- `.kenovis/AI/commands/init-project.md` (1.6 → 1.7) and `.kenovis/AI/commands/adopt-project.md` (1.5 → 1.6) — their completion step now also deletes `.kenovis/.claude-md.sha256` alongside `.setup-pending`. That sidecar recorded the hash of the *pending* stub the CLI wrote, so leaving it behind made the next `kenovis sync` refuse (`ExistingClaudeMdError`) to touch a `CLAUDE.md` the command itself had just legitimately reverted. The next install/sync records the hash again.

### Fixed

- `cli/src/application/commands/sync.ts` — `kenovis sync` no longer disarms DECISION-018's first-session auto-trigger. It now reads `.kenovis/.setup-pending` before the mirror-replace, rewrites it afterwards, and keeps the `CLAUDE.md` stub in its pending form, so an Installation that syncs before its first AI session still runs `/init-project` or `/adopt-project` automatically instead of falling back to a manual slash command. Closes Learning-010 (`PRODUCT/ROADMAP.md` Phase 1 item 1).
- `cli/src/domain/installation.ts` — new `INSTALL_TIME_OWNED_ENTRIES` names every file the CLI writes *inside* `.kenovis/` that the Framework bundle never ships (`.setup-pending`, `.claude-md.sha256`) together with the rule each needs to survive a mirror-replacing sync (preserved / rewritten). Learning-010's root cause was that this rule existed only as an accident of statement order in `runSync`; any future install-time-owned file must now be added to that set. New `installationKindFromSetupPending` recovers the installation kind from an existing marker.

## [0.4.0] - 2026-08-06

Aligned with the `kenovis` npm package's own version, same as [0.2.0]/[0.3.0] — see `cli/package.json` and `cli/README.md` → "Cutting a release".

### Added

- `cli/README.md` — "Upgrading" section documenting the manual upgrade path for an existing Installation (reinstall the CLI, `kenovis sync <targetDir>`, review with `git diff`).

### Changed (Breaking)

- `kenovis sync` on a target whose root `CLAUDE.md` isn't a Kenovis-managed stub at all (e.g. authored independently before adopting Kenovis) now **refuses** instead of silently overwriting it — pass `--force` to overwrite anyway. Anyone scripting `kenovis sync` against such a target on purpose needs `--force` after this ships. As of this same release, this also refuses on notes appended below an otherwise-intact Kenovis stub, closing the gap Learning-007 found — see Learning-008.

### Fixed

- `cli/src/application/commands/sync.ts` — `sync` no longer silently discards a customer's own edits to the root `CLAUDE.md` stub. New `ExistingClaudeMdError`/`isKenovisManagedClaudeStub` check, same pattern `init`/`add` already had (`ExistingClaudeMdError`, bypassable with `--force`) — this exact asymmetry was found and fixed for `init`'s `--force` path by `AI/memory/learnings.md` Learning-006 but never carried over to `sync`. Found via `/analyze` on the v0.1.0/v0.2.0 → v0.3.0 upgrade path (PRODUCT/ROADMAP.md Phase 0 item 6).
- `cli/src/domain/installation.ts` — `init`/`add`/`sync`'s CLAUDE.md guard now also catches content appended below an otherwise-untouched stub, which the marker-prefix check (`isKenovisManagedClaudeStub`) could not see. New `isClaudeMdSafeToOverwrite` compares against a recorded content hash (`.kenovis/.claude-md.sha256`, written by every install/sync) when one exists, falling back to the prefix check only for an Installation that predates this fix and has no recorded hash yet. Closes Learning-007.

## [0.3.0] - 2026-08-06

Aligned with the `kenovis` npm package's own version, same as [0.2.0] — see `cli/package.json` and `cli/README.md` → "Cutting a release".

### Added

- `AI/policies/git.md` (2.0 → 2.1) → "Branch Naming" — documents `release/<version>` (e.g. `release/v0.2.0`) as the naming convention for release-prep branches, alongside the existing `feature/`, `bugfix/`, `hotfix/`, `refactor/`, `docs/` patterns. Same flow as `feature/XXXX` (branch from `development`, PR back into it) — a naming specialization, not a new flow.
- New `kenovis add <targetDir>` command — `init`'s counterpart for a target that already holds a real implementation to adopt. A bare `kenovis <targetDir>` (no subcommand) autodetects and dispatches to `init` or `add` internally, never refusing.
- Auto-trigger for `init-project`/`adopt-project`: `init`/`add` now write a `.kenovis/.setup-pending` marker naming the right command, and a `CLAUDE.md` stub carrying a first-session imperative directive to run it — the very next AI session in Claude Code runs the correct command automatically, no manual slash command required. `init-project.md` Step 12 and `adopt-project.md` Step 13 delete the marker and revert the stub to its passive form on completion. `AI/SYSTEM.md` → "Context Loading Rules" gains the one-line marker check. See [DECISION-018](DECISIONS.md).
- `cli/src/domain/installation.ts` — `BrownfieldDetectedError`/`GreenfieldDetectedError`: `init` now refuses on a detected-brownfield target unless `--force` is passed (points at `kenovis add` instead); `add` refuses symmetrically on a detected-greenfield target (points at `kenovis init`).
- `cli/src/cli/bin.ts` — `--help`/`-h`. Found via manual smoke testing of this same release: an unrecognized flag (e.g. a typo'd `--help`) previously fell through to the new bare-invocation autodetect path with no target directory given, silently defaulting to `.` — running a real install against the current working directory. `--help`/`-h` are now checked before any dispatch.
- `AI/commands/init-project.md` (1.5 → 1.6) and `AI/commands/adopt-project.md` (1.4 → 1.5) — new "Collision Guard" section, referenced by every Step that rewrites a Product-layer file: if a target file already exists without the `PROJECT-SPECIFIC` marker, stop and ask the human before overwriting, mirroring `ExistingClaudeMdError`'s resolution for `CLAUDE.md`. See [DECISION-019](DECISIONS.md).

### Changed (Breaking)

- `kenovis init` on a target directory that already holds real content now **refuses** instead of installing-and-suggesting — use the new `kenovis add` there, or pass `--force` to keep the old behavior. Anyone scripting `kenovis init` against a non-empty directory on purpose needs `--force` after this ships. See [DECISION-018](DECISIONS.md).

### Fixed

- `cli/src/domain/installation.ts`/`init.ts` — `init`/`add` no longer silently overwrite a customer's own pre-existing root `CLAUDE.md`. New `ExistingClaudeMdError` (same escape-hatch pattern as `AlreadyInstalledError`/`BrownfieldDetectedError`, bypassable with `--force`) fires unless the existing file is already a Kenovis-managed stub (`isKenovisManagedClaudeStub`). `FileSystemPort` gained `readFile` to support the check. Found via `/analyze` right after DECISION-018 shipped: the target customer segment is "already fluent in agentic tooling" (COMPANY_OS.md), so a pre-existing customer `CLAUDE.md` predating Kenovis adoption is a realistic, not hypothetical, case.
- `cli/src/application/commands/init.ts` — a `--force` re-install over an existing `.kenovis/` now mirror-replaces it (`removeTree` then `copyTree`, matching `runSync`) instead of merging, so files retired from an older Framework Release are actually removed instead of accumulating as stale cruft. Same `/analyze` pass.

## [0.2.0] - 2026-08-06

First versioned release of the framework layer, aligned with the `kenovis` npm package's own version — the framework ships embedded inside that package (`cli/scripts/bundle-framework-assets.mjs` bundles `AI/` into `dist/framework-assets/` at build time), so there is no separate distribution channel to version independently. See `cli/package.json` and `cli/README.md` → "Cutting a release".

### Added

- `AI/memory/learnings.md` → Learning-004: end-to-end smoke test of the published `kenovis@0.1.0` CLI against a scratch external-like repository confirmed `init`/`sync` behave as documented (brownfield correctly detected, existing README/code untouched, idempotent sync); also found `sync --source <dir>` mirrors an unfiltered directory, a footgun relevant to DECISION-017's planned Phase 2 self-migration.
- `README.md` → "Getting started" section: documents `npx kenovis init` / `npx kenovis sync` as the actual installation path, ahead of "Starting a new product" / "Adopting an existing product". Closes a gap where the root README never mentioned the published CLI at all, blocking PRODUCT/ROADMAP.md Phase 1 MVP Success Criteria ("a team outside Kenovis can install the CLI... without help") and `AI/policies/documentation.md`'s README requirement to answer "How do I start?".
- `LICENSE` (Apache 2.0).
- `CONTRIBUTING.md` — contribution scope and rules for the two-layer repo.
- `.github/ISSUE_TEMPLATE/` (bug report, feature request) and `.github/PULL_REQUEST_TEMPLATE.md`.
- `.github/workflows/ci.yml` — checks relative markdown links resolve and the `PROJECT-SPECIFIC` marker convention holds.
- This changelog.
- `AI/policies/code-quality.md` — language-agnostic mechanical quality checklist (12 categories: correctness, reliability, security vulnerabilities, security hotspots, maintainability, complexity, accessibility, testing hygiene, API/contract design, concurrency & data integrity, dependency hygiene, observability/logging). Wired into `backend`, `frontend`, `database`, `security`, `reviewer`, and `AI/policies/coding.md`'s new "Definition of Done — Mechanical Gate".
- `AI/templates/design-spec.md` and a "Phase 5 - Design Analysis" step in `AI/workflows/feature.md`, for features with a user-facing surface.
- `PRODUCT/COMPETITIVE_LANDSCAPE.md` — shared competitive research doc, with dimension ownership split across `ceo`, `product-manager`, `designer`, `finance`, and `marketing`.
- `AI/policies/coding.md` → "Reuse Before Creation" — mandatory search for existing code before writing new components/services/utilities, referenced from `backend` and `frontend`.
- `AI/policies/documentation.md` → "README Sync — In-Task, Not Post-Hoc".
- `.github/scripts/check_changelog.py` and a CI step enforcing that PRs touching `AI/**`, `CLAUDE.md`, or `README.md` also update this file, with a `[skip changelog]` escape for wording-only changes.
- `AI/workflows/framework-review.md` — human-triggered periodic audit of the framework layer for stale cross-references and contradictions.
- `CONTRIBUTING.md` → "Framework Definition of Done" and "Versioning framework files". See [DECISION-011](DECISIONS.md).
- [DECISION-012](DECISIONS.md) — scoped exception to DECISION-010's tool-agnosticism for `graphify` (knowledge-graph CLI), to cut per-session token cost of `AI/commands/bootstrap.md`'s full-tree reads. `graphify` installed project-scoped (`.claude/skills/graphify/`, `.claude/settings.json` PreToolUse hooks in strict mode, `## graphify` section in `CLAUDE.md`); `graphify-out/` gitignored, regenerated locally. `CONTRIBUTING.md` → "Knowledge graph (graphify)" setup section.
- `AI/commands/adopt-project.md` — brownfield counterpart to `init-project.md`. Audits `cli/` first (stack, DB, auth, tenancy, real domain entities, confidence-tagged with file/line citations) before touching any product-layer document; never empties or rewrites `cli/` beyond its README; verifies completion by contrast against the code instead of by absence of example terms. See [DECISION-014](DECISIONS.md).
- `.claude/commands/adopt-project.md` — Claude Code slash-command wrapper for `/adopt-project`, same pattern as the existing `/init-project` wrapper.
- `cli/README.md` — documents the new `sync` command (`kenovis sync <targetDir> [--source <dir>]`): mirror-replaces an existing Installation's `.kenovis/` and rewrites the `CLAUDE.md` stub, deleting files retired in a newer Framework Release rather than leaving them stale, while never touching Product-layer files or the target repository's own code. Reversibility (RULE-INST-02) comes from the target's own git-tracked `.kenovis/`, not a CLI-side diff engine — that ergonomic layer stays scoped to PRODUCT/ROADMAP.md Phase 2.
- `cli/README.md` → "Cutting a release" — documents the tag/GitHub-Release steps that trigger `.github/workflows/publish.yml`'s `npm publish --provenance` from CI.

### Changed

- `cli/README.md` — documents that `init`/`sync` now validate `--source` itself before touching anything (must contain only `AI/` and `README.md`, or `InvalidFrameworkSourceError`), closing a footgun where `--source` pointed at a full product repository checkout silently mirrored its Product-layer content into a target's `.kenovis/`. Found via end-to-end smoke testing (`AI/memory/learnings.md` Learning-004).
- `cli/README.md` — Phase 0 item 3 marked done (was "in progress"); NPM_TOKEN paragraph corrected to state `kenovis@0.1.0` is live on npm instead of "not yet configured as of this writing", which was stale since the DONE (2026-08-05) publish entry landed in PRODUCT/ROADMAP.md.
- `ENGINEERING/ARCHITECTURE.md` (1.0 → 1.1) → "Hard Rules": the CLI must write the Framework layer under `.kenovis/` in the target repository (hidden, dot-directory convention), never at repo root — except `CLAUDE.md` (stub) and `.claude/`, forced there by Claude Code autoload. The CLI must never touch a target repository's own existing `README.md`; Kenovis's explanatory README lives at `.kenovis/README.md` instead. See [DECISION-017](DECISIONS.md), the ADR that unblocks PRODUCT/ROADMAP.md Phase 0 item 3 (the CLI build).
- No framework-mandated directory name for any Installation's code. `AI/commands/bootstrap.md` (2.1 → 2.4), `AI/commands/adopt-project.md` (1.0 → 1.3), `AI/commands/init-project.md` (1.2 → 1.4), `AI/SYSTEM.md` (1.1 → 1.3), `AI/workflows/architecture.md` (2.0 → 2.1), `AI/workflows/roadmap.md` (2.0 → 2.1), `AI/workflows/feature.md` (3.1 → 3.2), `AI/workflows/bugfix.md` (2.1 → 2.2), `AI/workflows/review.md` (2.1 → 2.2), `AI/policies/coding.md` (2.1 → 2.2), `AI/policies/documentation.md` (2.1 → 2.2), `README.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `DOMAIN/DOMAIN_MODEL.md` (1.0 → 1.2), `DOMAIN/BUSINESS_RULES.md` (1.0 → 1.1) — removed a latent self-contradiction (`bootstrap.md` stated implementation "lives under a dedicated directory" as a hard rule while also saying "do not assume any particular directory layout") and retired a dedicated per-implementation `README.md` as a framework-referenced concept in favor of the single existing pointer, `ENGINEERING/ARCHITECTURE.md` → "Suggested Project Structure". Adoption never relocates a customer's existing implementation, and no Installation is required to have a directory with any specific name. See [DECISION-016](DECISIONS.md) (supersedes DECISION-015, same day).
- Product-layer files (`COMPANY_OS.md`, `DECISIONS.md`, `PRODUCT/`, `DOMAIN/`, `ENGINEERING/`, `AUTOMATIONS/`, `AI/memory/glossary.md`) reset from a fleshed-out example business to instructional placeholder scaffolding, ahead of the framework's first public release.
- `AI/commands/init-project.md` — `PRODUCT/COMPETITIVE_LANDSCAPE.md` added to the reset/emptied list; Step 8 (Reset AI Memory) now requires promoting reusable Critical/Important learnings to `AI/policies/` or `conventions.md` before deleting `AI/memory/learnings.md` and `conventions.md`. See [DECISION-011](DECISIONS.md).
- `AI/agents/designer.md` — added "Adapt To Product Context", explicit WCAG 2.1 AA compliance target, "Design Rigor By Stage", metrics thinking, and backend-collaboration notes.
- `README.md` — repository map updated to list the `framework-review` workflow.
- `.github/PULL_REQUEST_TEMPLATE.md` — checklist items for the CHANGELOG/DECISIONS discipline above.
- `AI/commands/bootstrap.md` (2.0 → 2.1) — Steps 2-4 query the `graphify` knowledge graph before reading `PRODUCT/`, `DOMAIN/`, `ENGINEERING/`, `AI/memory/*`, `cli/` in full; full read is now the fallback, not the default. See [DECISION-012](DECISIONS.md).
- `AI/workflows/feature.md` (3.0 → 3.1), `AI/workflows/bugfix.md` (2.0 → 2.1), `AI/workflows/review.md` (2.0 → 2.1) — Phase 1 re-queries the graph instead of re-running a full bootstrap read when one already ran this session; `graphify affected`/`graphify explain` referenced for technical analysis, root-cause tracing, and change-scope review once `cli/` has content.
- `CONTRIBUTING.md` — tool-agnostic rule now documents the scoped `graphify` exception ([DECISION-012](DECISIONS.md)); added a "Knowledge graph (graphify)" setup section.
- `.gitignore` — `graphify-out/` (regenerate locally, never versioned; can exceed the tool's 512MiB `graph.json` cap on large repos).
- `AI/commands/init-project.md` (1.1 → 1.2) — Trigger section now routes repositories where `cli/` already holds a real implementation to `AI/commands/adopt-project.md` instead. See [DECISION-014](DECISIONS.md).
- `AI/SYSTEM.md` (1.0 → 1.1) — Commands example list now includes `/adopt-project` alongside `/init-project` as one of the two possible first commands in a repository.
- `README.md` — new "Adopting an existing product" section; repository map lists `adopt-project`.
- `PRODUCT/ROADMAP.md` (1.0 → 1.1) — Phase 0 CLI install command scoped to detect greenfield vs. brownfield target repositories and route to `/init-project` or `AI/commands/adopt-project.md` accordingly; Phase 0 Success Criteria updated to match.

## How to add an entry

When a framework-layer change lands:

1. Add a bullet under `[Unreleased]`, in `Added` / `Changed` / `Deprecated` / `Removed` / `Fixed` / `Security` as appropriate.
2. On release, rename `[Unreleased]` to `[x.y.z] - YYYY-MM-DD` and start a fresh empty `[Unreleased]` above it.

Product-layer changes (a specific team's `DECISIONS.md`, `DOMAIN/`, etc.) belong in that product's own history — not here.
