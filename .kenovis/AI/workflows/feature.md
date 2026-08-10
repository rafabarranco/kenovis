# Feature Development Workflow

Version: 3.4

---

# Purpose

Transform a product requirement into a complete feature implementation following the product and engineering process.

This workflow converts a feature idea into a structured development process.

The objective is not to only write code.

The objective is to deliver a valuable, maintainable and validated product capability.

---

# Trigger

Execute when:

- Developing a new feature.
- Implementing a planned product capability.
- Starting work from a feature request.
- Continuing development from the roadmap.

Command:

```
/feature
```

or:

```
Implement feature
```

---

# Core Principle

A feature is not a development task.

A feature is a product capability that requires understanding, planning, design, implementation and validation.

---

# Workflow

Follow these phases.

---

# Phase 1 - Bootstrap Project Context

Execute:

```
.kenovis/AI/commands/bootstrap.md
```

If bootstrap already ran earlier this session and `graphify-out/graph.json` is still fresh, do not re-read the full context tree. Re-query the graph instead (`graphify query "<topic>"`) for whatever this phase needs.

Load:

- Product vision.
- Roadmap.
- Features.
- Domain model.
- Business rules.
- Architecture.
- Engineering policies.

---

# Phase 2 - Understand Feature Definition

Review:

```
PRODUCT/FEATURES.md
```

Identify:

- Feature objective.
- User problem.
- Business value.
- User value.
- Acceptance criteria.
- Dependencies.

If no `FEATURE-NNN` spec exists for this feature, writing it is this phase's output, not a missing input. Author it into `PRODUCT/FEATURES.md` using that document's own "Feature Specification Template" section, and confirm it with the human before Phase 4. Nothing else in the framework produces a spec ahead of implementation — `/init-project` and `/adopt-project` seed that file with what already ships, and Phase 13 below only updates the entry against what was actually built. See DECISIONS.md DECISION-024.

Do not start implementation without a clear understanding of the feature.

---

# Phase 3 - Activate Product Agents

Activate:

```
product-manager
cto
```

Optional depending on feature scope:

```
designer
frontend
backend
database
security
```

---

# Phase 4 - Product Analysis

Product Manager evaluates:

## User Problem

Define:

- What problem are we solving?
- Who has this problem?
- Why does this matter?

---

## User Value

Define:

- Expected user benefit.
- User experience improvement.
- Success criteria.

---

## Business Value

Define:

- Why the product needs this feature.
- Expected business impact.
- Strategic alignment.

---

# Phase 5 - Design Analysis

Optional. Execute when the feature has a user-facing surface (UI, interaction, user-visible flow).

Skip when the feature is purely internal (e.g. background job, infra change, non-UI refactor).

Designer evaluates:

- User flow.
- Interface states (default, loading, empty, error, success).
- Accessibility impact.
- Consistency with existing design system.

Produce a design spec for this feature, shaped by:

```
.kenovis/AI/templates/design-spec.md
```

That path is a form, not a destination — never write into it. The spec is a working artifact of this session; what must outlive the session is the user-facing behaviour it settles, which belongs in the `FEATURE-NNN` spec's Capabilities and Acceptance Criteria in `PRODUCT/FEATURES.md`. A product that wants to keep design specs as files decides where and records it in `AI/memory/conventions.md`. See DECISIONS.md DECISION-024.

Do not proceed to implementation preparation with an unresolved user flow.

---

# Phase 6 - Technical Analysis

CTO evaluates:

- Architecture impact.
- Complexity.
- Dependencies.
- Risks.
- Required technical decisions.

Review (query the graph first if fresh, e.g. `graphify query "<topic>"`, `graphify explain "<concept>"`; fall back to reading in full otherwise):

```
ENGINEERING/ARCHITECTURE.md
ENGINEERING/DATABASE.md
ENGINEERING/SECURITY.md
```

---

# Phase 7 - Create Feature Plan

Produce a feature plan, shaped by:

```
.kenovis/AI/templates/feature-plan.md
```

That path is a form, not a destination — never write into it, and never write any produced artifact anywhere under `.kenovis/`, which `kenovis sync` replaces wholesale. The plan is a working artifact of this session: present it to the human here, and let its durable parts land where they belong — scope and acceptance criteria in the `FEATURE-NNN` spec (Phase 2), technical decisions in `DECISIONS.md` (Phase 8), what shipped in `PRODUCT/FEATURES.md` (Phase 13). A product that wants to keep plans as files decides where and records it in `AI/memory/conventions.md`. See DECISIONS.md DECISION-024.

Include:

- Objective.
- User problem.
- Scope.
- Out of scope.
- User stories.
- Technical approach.
- Implementation steps.
- Risks.
- Acceptance criteria.

---

# Phase 8 - Architecture Decisions

If required:

Execute:

```
.kenovis/AI/commands/architect.md
```

Record the ADR in:

```
DECISIONS.md
```

Shaped by:

```
.kenovis/AI/templates/adr.md
```

`DECISIONS.md` is the destination; the path above is the form that shapes what goes there. See DECISIONS.md DECISION-024.

Document:

- Context.
- Decision.
- Alternatives.
- Consequences.

---

# Phase 9 - Implementation Preparation

Once the repository has real implementation content: use `graphify affected "<component>"` to find nodes impacted before touching them, instead of grepping the tree cold.

Define:

Affected areas:

```
CODE (the units listed in ENGINEERING/ARCHITECTURE.md)

DATABASE

API

DOCUMENTATION
```

Identify:

- Files to modify.
- New components.
- New services.
- Database changes.
- API changes.
- Testing requirements.

---

# Phase 10 - Execute Implementation

Follow:

```
.kenovis/AI/policies/coding.md
.kenovis/AI/policies/testing.md
.kenovis/AI/policies/documentation.md
```

Implementation order:

```
Database

Backend

Frontend

Integration

Tests
```

Rules:

- Follow existing conventions.
- Keep changes focused.
- Avoid unnecessary refactoring.
- Preserve system stability.

---

# Phase 11 - Quality Validation

Before invoking review, close the mechanical gate defined in `.kenovis/AI/policies/coding.md` → "Definition of Done":

- Run the project's real lint/type-check/test commands. Fix everything they report.
- Walk the change against `.kenovis/AI/policies/code-quality.md`.
- Confirm reuse was checked before any new code was written (`.kenovis/AI/policies/coding.md` → "Reuse Before Creation").

Then execute:

```
.kenovis/AI/commands/review.md
```

Validate:

- Requirements completed.
- Tests passing.
- Architecture consistency.
- Security considerations.
- Code quality.
- Maintainability.

---

# Phase 12 - Documentation Update

Update:

```
PRODUCT/

DOMAIN/

ENGINEERING/

AI/memory/learnings.md
```

when knowledge changes.

Document:

- New capabilities.
- New rules.
- Technical decisions.
- Lessons learned.

---

# Phase 13 - Feature Completion

Confirm:

- Feature implemented.
- Acceptance criteria satisfied.
- Tests completed.
- Review approved.
- Documentation updated.

Update:

```
PRODUCT/FEATURES.md
```

---

# Decision Rules

Always:

- Understand the problem before implementing.
- Validate user value.
- Respect architecture.
- Follow engineering policies.
- Keep documentation synchronized.

Never:

- Implement unclear requirements.
- Skip product analysis.
- Ignore business rules.
- Introduce undocumented behavior.
- Modify architecture casually.

---

# Final Principle

A feature is complete when the user value is delivered.

Code is only one part of the solution.
```