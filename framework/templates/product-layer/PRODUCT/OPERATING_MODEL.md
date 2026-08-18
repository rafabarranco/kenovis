<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

OPERATING_MODEL.md

Operating Model & Non-Negotiable Rules

Version: 1.2
---
Purpose

This document is the product owner's statement of what this product is for, and of how the AI-OS is expected to behave while building it.

It is **rank 1 of the Source Of Truth Hierarchy** (`.kenovis/AI/SYSTEM.md`). Everything else in this repository — the company context, the decisions, the roadmap, the engineering documentation — describes how the product is built. This describes what it is being built for, and it wins wherever the two conflict.

Why that rank, stated plainly because it is the whole reason this document exists: without it, a round of work can only be measured against the machinery it happens to touch. Guards, formats and bookkeeping are all checkable; the objective is not, unless it is written down. So rounds optimise the machinery, every one of them defensibly, and the product drifts from its purpose with nothing anywhere recording that it did.

This is the one Product-layer document the AI never authors on its own. It is the owner's. The AI records it, ranks it, and is measured against it.
---
Provenance

[ANSWER: Who authored this document, and when. If it is a statement the owner wrote elsewhere and supplied, say so and record it **verbatim** below — do not summarise, reorder or improve it. A supplied statement is evidence of intent, and editing it destroys exactly the thing that makes it rank 1.]
---
1. Objective

[ANSWER: What is this product for? Not what it does — what it exists to make possible, and for whom. One or two paragraphs. If the owner has strong words for it, use the owner's words.]
---
2. What the AI-OS owns

[ANSWER: Which responsibilities belong to the AI-OS rather than to a human. Typical answers: engineering awareness, technical debt tracking, architectural consistency, technical planning, discovery tracking, documentation of durable knowledge, roadmap completeness, continuity between iterations. Write what is true for this product, not this list.]
---
3. What the owner owns

[ANSWER: Which decisions stay with the human. Typical answers: product direction, strategic and business decisions, approval or rejection of product changes, prioritisation where owner input is genuinely required. Be specific — an unscoped "the human decides" makes every round stop, and an unscoped "the AI decides" makes none of them stop.]
---
4. Non-negotiable rules

[ANSWER: The rules that must hold no matter what the schedule says. State each one as a rule, with what it forbids and what it requires. If a rule has no exceptions, say "no exceptions" — a rule with unstated exceptions is a preference.]

The framework carries one such rule already, and it is in force whether or not this section restates it: **nothing discovered may be lost.** Anything a session finds that is not already planned gets a disposition in a Product-layer file, in that same session. See `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected".
---
5. Working cadence

[ANSWER: How this product is actually worked on. How many roadmap steps per session or thread? Which commands are used most? What state means the work is finished for now? The framework has defaults; where this product's cadence differs, this is what the framework is measured against.]
---
Conformance — How This Document Is Checked Against The Framework

**Everything above this line is the owner's.** Everything below it is the AI-OS's own report on itself, appended and never interleaved. The specification and the report on the specification are different documents that share a file, and they share it so the question "is the AI-OS doing its job" is answered where the job is defined.

## The Standing Criterion

**Every round that closes states which section of this document its work served, and updates that section's row below.** A round that served none says so, in those words.

The rule is carried by `.kenovis/AI/commands/next.md` Step 13, which every task loads. Nothing enforces it mechanically; it holds because it is loaded, which is the enforcement this framework has.

## Conformance Table

One row per numbered section above. The single row below is the form, not the table — setup deliberately leaves it unfilled, because setup is the session least equipped to measure anything.

**The first closing round builds the rest**, as a step of `.kenovis/AI/commands/next.md` Step 13, writing `unmeasured` in the State column of every row it did not verify itself. That is where the instruction lives and it is not repeated here, because a table that is never populated cannot have a row updated, and an instruction that only exists in the document being measured is not a step anybody executes.

**Every State besides `unmeasured` carries the date it was actually last checked**, in the `As of` column — the table does not require every row to be re-checked every round (DECISION-049); it requires staleness to be visible rather than silent. A row a round did not touch keeps its existing date. An `unmeasured` row carries no date, since its own state already says nobody has checked it.

| § | Rule | State | As of | Carried by |
|---|---|---|---|---|
| 1 | (the section's rule, in one clause) | unmeasured | — | (the roadmap item or finding id that carries the gap, or "—") |

## What A Row Means

`Present` — the rule holds, and a command, policy or measurement shows it. `Partial` — part of it holds, and the row names which part does not. `Absent` — it does not hold, and there is either a finding carrying it or a recorded decision to leave it so. An `Absent` row with neither is the failure this table exists to make visible.

`unmeasured` — nobody has checked this row yet. It is the state a row is born in when the table is first built, and it is the only one that carries no claim about the product. It is deliberately not a fourth grade: a row that stays `unmeasured` for many rounds is itself the finding, because the section it names is one nobody's work has served or examined.

A row is not moved to `Present` because a rule was written. A rule that exists and a rule that holds are different claims, and the round that writes one is the worst possible judge of the other. A state change is verified by the command in the row, or by a session that did not author the change. Whichever grade is written, the `As of` date moves with it — a state that did not change but was re-confirmed still gets today's date, since re-confirmation is itself a check.

Do not delete a row to make the table read better. A conformance report that only ever improves is measuring the rounds, not the product.
