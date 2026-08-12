<!-- PROJECT-SPECIFIC: this product's own recorded knowledge; the rules around it are framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

AI Learnings

Version: 1.14
---
Scope

The rules in this document are framework-level and reusable.

The learnings recorded by the AI while working on a product are project-specific and must be cleared when starting a new product.
---
Purpose

This document stores accumulated organizational knowledge.

The purpose is to capture:

- Important lessons.
- Repeated mistakes.
- Successful patterns.
- Process improvements.
- Technical discoveries.
- Product insights.

This file represents the experience gained by the organization over time.
---
Learning Philosophy

A learning is not a record of what happened.

A learning explains:

What happened

↓

Why it happened

↓

What was learned

↓

What should change in the future

---
What Should Be Stored

Store learnings about:

- Architecture decisions.
- Development processes.
- Product discovery.
- User behaviour.
- Technical limitations.
- Failed approaches.
- Successful approaches.
---
What Should NOT Be Stored

Do not store:

- Temporary tasks.
- Daily progress updates.
- Completed tickets.
- Meeting notes.
- Personal opinions without evidence.
- Project-specific details that have no future value.
---
Learning Format

Every learning should follow this structure:

## Learning ID

Date:

Category:

Context:

Problem:

What happened:

Root cause:

Learning:

Future action:

`Future action:` either cites the id of a scheduled item or queued finding in `PRODUCT/ROADMAP.md`, or states that no work is implied. A future action naming work that exists nowhere else is a finding with no disposition wearing a different field name — see `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected".

---
Categories

Use one of these categories:

Architecture

Engineering

Product

Business

Security

Process

User Experience

Performance

Operations

---
Recorded Learnings

Example: Process — a process with no exit half runs zero times and reports nothing

## Learning-025

Date:
2026-08-12

Category:
Process

Context:
Executing this file's own Review Process for the first time (`PRODUCT/ROADMAP.md` Phase 1 item 20), via `/next`. The process had been documented since initialization and had a checkpoint pointing at it inside `.kenovis/AI/commands/init-project.md`. It had never run once, over 24 recorded learnings and 76 KB.

Problem:
Eighteen of the 24 entries carried a `Disposition:` line ending in "candidate for promotion by item 20" — written by the rounds that recorded them, each correctly identifying that its learning was a standing rule belonging in a policy. Every one of those rounds stopped at identifying it. No rule ever moved.

What happened:
The Review Process said what to look for ("repeated problems, patterns, opportunities to improve policies") and where a rule goes ("move it to `.kenovis/AI/policies/`"). It never said what happens to the entry afterwards. So "move" had no completion state: a round could write the rule into a policy and leave the learning in place, and nothing in the process would call that wrong — the rule would then live in two documents, one loaded per task and one loaded at session start.

Facing that ambiguity, every round did the cheaper half — noted the candidacy in the disposition line and moved on. The note reads like a step in a process. It is a step in no process.

Root cause:
An instruction with no defined finished state is not a weak instruction, it is an optional one, and what makes it optional is invisible: each individual round's decision to defer looks reasonable, because the alternative was undefined. This is [[Learning-024]] in the same file it was recorded in — there, a command could not perform the action its own step required; here, a process could not tell anyone when its action was complete. Both produce the same artifact: a rule that reads perfectly and executes never.

The multiplier is that the deferral was *recorded*. "Candidate for promotion by item 20" is a well-documented deferral, and a well-documented deferral reads as handled — the same mechanism [[Learning-024]] found routing findings into sinks nothing consults at decision time.

Learning:
A process that moves something between documents states its completion condition in terms of both ends: what the destination gains, and what the source loses. "Move it to X" is half an instruction; the half that gets skipped is always the removal, because the addition is the part that feels like progress.

And a recurring "candidate for" note is data, not bookkeeping. Eighteen entries independently reaching the same conclusion and none acting on it is evidence that the action was not available, not that eighteen rounds were careless.

Future action:
`.kenovis/AI/policies/documentation.md` and both learnings templates now state the completion condition — rule into the policy, policy cites the learning id, entry archived verbatim, one line left behind. `.github/scripts/check_learning_promotions.py` enforces the pointer half in this repository's CI; it found a real gap on its first run (a rule promoted into `coding.md` that never cited Learning-010). It cannot check that a policy section contains the rule it claims, only that the section and the citation exist.

Disposition: No work implied — the process gap is closed by item 20 itself. The customer-facing half of the enforcement is item 25, which carries every guard this repository runs and an Installation does not.

---
Learning Examples

The two entries below are the format examples every Installation receives in its template (see `.kenovis/AI/commands/init-project.md` Step 8). They are not learnings this product recorded.

Example: Architecture

## Learning-001

Date:
2026-01-01

Category:
Architecture

Context:
Introducing a new external service.

Problem:
The service was integrated directly inside business logic.

What happened:
Changing the provider required modifying multiple modules.

Root cause:
The external dependency was not isolated.

Learning:
External services should be hidden behind interfaces.

Future action:
Use adapters for external integrations.

Disposition: No work implied — this is the template's format example, not a learning this product recorded. Item 20 kept it here for that reason rather than promoting it.

---
Example: Product

## Learning-002

Date:
2026-01-01

Category:
Product

Context:
Testing a new workflow.

Problem:
Users ignored a complex configuration screen.

What happened:
The feature adoption was lower than expected.

Root cause:
The workflow required too much setup before providing value.

Learning:
Users should reach the first valuable action as quickly as possible.

Future action:
Prioritize simple onboarding flows.

Disposition: No work implied — this is the template's format example, not a learning this product recorded. Item 20 kept it here for that reason rather than promoting it.

---
Promoted And Archived

The Review Process below ran for the first time on 2026-08-12 (`PRODUCT/ROADMAP.md` Phase 1 item 20). Twenty-two recorded learnings closed: each argued for a standing rule, that rule now lives in the policy that enforces it, and the entry moved verbatim to `AI/memory/LEARNINGS-ARCHIVE.md`.

One line each stays here, naming where the rule went. That is the pointer a session needs; the story behind it is one file away and is read on demand.

A learning is listed as closed only when its rule is findable in the destination named beside it. Where an entry recorded a defect rather than a rule, the closure names what fixed it.

| Learning | What it established | Now carried by |
|---|---|---|
| Learning-024 | A command that instructs an outcome must permit the action producing it; knowledge sinks are not interchangeable | `policies/documentation.md` → "An Instruction Is Reachable, And Its Sink Is Read" |
| Learning-023 | An item's premise about a file's contents is a claim; verify it while writing the item | `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" |
| Learning-022 | Enumerate the population the protected property could be violated in, not the population the known defects sat in; a guard states which of its parts is exact and which is a heuristic | `policies/testing.md` → "A Check Is Not Verified Until It Has Been Run" |
| Learning-021 | When fixing a class of defect, enumerate the population, not the matches; if the population is mechanical, the check belongs in CI | `policies/testing.md` → "A Check Is Not Verified Until It Has Been Run" |
| Learning-020 | "Has anyone run this from an installed copy?" predicts latent defects better than any review pass | `policies/testing.md` → "A Check Is Not Verified Until It Has Been Run" |
| Learning-019 | An unverified cost estimate in a deferred item is a decision made by nobody; verify it or mark it unverified | `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" |
| Learning-018 | State the command that produces a count, not its scope in words | `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" |
| Learning-017 | A template's passing condition is "no sentence here is true of only one product", not "the questions are marked" | `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" |
| Learning-016 | Any count in a changelog, decision or roadmap entry is read off the artifact with the command that produces it | `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" |
| Learning-015 | A mechanical check is run against a known-good corpus in the round that introduces it | `policies/testing.md` → "A Check Is Not Verified Until It Has Been Run" |
| Learning-014 | When a change replaces how an artifact reaches its consumer, that artifact's own instructions are inside the blast radius | `policies/architecture.md` → "Distribution Is Part Of The Architecture" |
| Learning-013 | Before adding to a registry of special cases, ask whether the fact belongs inside the artifact being copied | `policies/coding.md` → "Guards, Recorded State, And Permissive Paths" |
| Learning-012 | A protected-branch promotion chain that ever takes a downstream-only commit is permanently in content-sync mode; that is the standard procedure, not a repair | `policies/git.md` → "Promotion Chains And Content Sync" |
| Learning-011 | A recorded-state guard must enumerate every writer of the guarded file, framework markdown commands included | `policies/coding.md` → "Guards, Recorded State, And Permissive Paths" |
| Learning-010 | State the CLI writes inside a mirror-replaced directory needs an explicit preserve-or-recompute rule | Fixed — Phase 1 item 1 (`INSTALL_TIME_OWNED_ENTRIES`); rule in `policies/coding.md` → "Guards, Recorded State, And Permissive Paths" |
| Learning-009 | A rule reasoned about "the customer" is checked against the tool's own origin repository, which may be a customer of it | `policies/architecture.md` → "Distribution Is Part Of The Architecture" |
| Learning-008 | A recorded-state guard's reference point is a fact recorded at write time, never the current code's output | `policies/coding.md` → "Guards, Recorded State, And Permissive Paths" |
| Learning-007 | A prefix/marker check proves "we wrote the beginning", not "this content is entirely ours" | Fixed — Phase 1 item 7 (hash sidecar); rule in `policies/coding.md` → "Guards, Recorded State, And Permissive Paths" |
| Learning-006 | "This tool may own this file" and "this tool may discard what is in it" are different guarantees; two code paths solving one problem are cross-checked for parity | `policies/coding.md` → "Guards, Recorded State, And Permissive Paths" |
| Learning-005 | A catch-all dispatch needs the invocations that must not reach it enumerated before the fallback is wired | `policies/coding.md` → "Guards, Recorded State, And Permissive Paths" |
| Learning-004 | An unvalidated "mirror this directory" input reproduces whatever mistake the caller makes; default and escape-hatch paths carry different trust | `policies/architecture.md` → "Distribution Is Part Of The Architecture" |
| Learning-003 | When a business rule names its own rollback mechanism, build against that mechanism instead of reimplementing it | `policies/architecture.md` → "Distribution Is Part Of The Architecture" |

Learning-001 and Learning-002 above are not this product's recorded learnings. They are the format examples every Installation receives in its template (`.kenovis/AI/commands/init-project.md` Step 8 says so), and they stay here as examples of the shape, not as knowledge this company earned.
---
Learning Validation

Before adding a learning, verify:

✓ Is this based on a real experience?

✓ Does this change future behaviour?

✓ Can another project benefit from this?

✓ Is this more than a simple observation?

If the answer is no, do not store it.
---
Priority Levels

Each learning can have a priority:

Critical

Important

Useful

---
Critical

Must influence future decisions.

Examples:

- Security failures.
- Data loss prevention.
- Architecture mistakes.
---
Important

Should be considered regularly.

Examples:

- Development patterns.
- Product lessons.
---
Useful

Helpful but not mandatory.

Examples:

- Minor improvements.
- Optimizations.
---
Review Process

Periodically review learnings.

The AI should identify:

- Repeated problems.
- Patterns.
- Opportunities to improve policies.

If a learning becomes a permanent rule:

Move it to:

.kenovis/AI/policies/

If a learning becomes a naming rule:

Move it to:

AI/memory/conventions.md

If a learning becomes domain knowledge:

Move it to:

DOMAIN/

---
What "Move It" Means

"Move" is the whole instruction, and the half that was missing until 2026-08-12 is what happens to the entry afterwards.

A promotion is not done when the rule appears in a policy. It is done when the rule appears in the policy **and** the learning stops being the place that rule lives. Otherwise the same rule sits in two documents, one of which is loaded per task and one of which is loaded at session start, and the second keeps growing.

So a promoted learning closes:

1. The rule is written into the policy that enforces it, in that policy's own voice — a rule, not a story. The policy cites the learning id, so the reasoning is one hop away.
2. The entry moves verbatim to `AI/memory/LEARNINGS-ARCHIVE.md`.
3. One line stays in this file, naming what the learning established and which policy section now carries it — see "Promoted And Archived" above.
4. Any finding the entry raised already has a disposition in `PRODUCT/ROADMAP.md` before the move. An entry whose only copy of an unresolved finding is in its own text is not archived yet.

Run this process when this file crosses the size threshold in `.kenovis/AI/policies/documentation.md` → "Document Lifecycle", and at every `/init-project` in a repurposed repository, before the previous product's learnings are deleted.

A learning that has not become a rule stays here. Most do not, and that is the normal outcome.

---
Evolution Rules

The AI should improve the organization over time.

When a recurring problem appears:

Do not only fix the issue.

Improve the system that allowed the issue.

Example:

Bad:

Fix bug.

Good:

Fix bug.

Understand why it happened.

Update policy.

Prevent future repetition.

---
Cross-Project Knowledge

The AI-OS may be reused across different products.

Therefore:

Store only reusable knowledge.

Avoid:

This product uses React.

Prefer:

Technology choices should be documented explicitly per project.

---
Relationship With Other Memory Files

conventions.md

Stores:

"What rules do we follow?"
---
glossary.md

Stores:

"What do concepts mean?"
---
learnings.md

Stores:

"What have we learned?"
---
Final Principle

A strong organization does not only accumulate code.

It accumulates experience.

This document is the mechanism through which the AI organization becomes better over time.