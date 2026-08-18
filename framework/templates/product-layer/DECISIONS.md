<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

# DECISIONS.md

Company Decision Log

Version: 1.2

Last updated: —

---

# Decision Index

This index is what a session reads. The decision bodies below it are not on the session-initialization path — see `.kenovis/AI/SYSTEM.md` → "Context Loading Rules" and `.kenovis/AI/commands/bootstrap.md` Step 2. A log is append-only and grows without bound; an index is what keeps consulting one decision from costing all of them.

Open a decision's body before citing it. The index states what a decision settled, never why it was settled that way, and a citation without the reasoning behind it is a preference wearing a decision's ID.

Every decision recorded in this file gets exactly one line here, added in the same change that records the decision. One line, stating what the decision settled in enough substance that a reader can tell whether they need to open it — not just the title.

Format, once decisions exist:

```
- **DECISION-001** — Title. One sentence stating what it settled.
- **DECISION-002** — Title. Superseded by DECISION-007; body kept for the reasoning trail.
```

[No decisions recorded yet. Add a line here for each decision as it is made — do not invent decisions to fill this section.]

---

# Document Layers

This log is entirely product-specific. It records the decisions this company makes, and starts empty.

Framework-layer files sometimes cite an identifier like `DECISION-018`. Those refer to the AI-OS framework's own decision log, which lives in the framework's public repository — not to entries in this file. Never renumber this log to make such a reference resolve, and never copy those decisions in: they explain why the framework works the way it does, not why this company does.

New decisions in this file are numbered from DECISION-001 upwards, in the order they are actually made.

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

[No decisions recorded yet. Add them here as they are made — do not invent decisions to fill this section.]

---

# Product Decisions

Product decisions that affect what the company builds.

[No decisions recorded yet.]

---

# Operating Decisions

Decisions about how the company operates.

[No decisions recorded yet.]

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
