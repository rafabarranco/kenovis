# Roadmap Execution Workflow

Version: 2.2

---

# Purpose

Execute the next product roadmap initiative following a structured product and engineering process.

This workflow transforms product direction into an actionable implementation plan.

The objective is not to blindly build features.

The objective is to build the right thing in the right way.

---

# Trigger

Execute when:

- Starting the next roadmap item.
- Moving from planning to execution.
- Prioritizing product work.

Command:

```
/next
```

or:

```
Execute next roadmap item
```

---

# Core Principle

A roadmap item is not a task.

It is a business objective that requires understanding, design, implementation, and validation.

---

# Workflow

Follow these phases.

---

# Phase 1 - Bootstrap Project Context

Execute:

```
.kenovis/AI/commands/bootstrap.md
```

Load:

- Product vision.
- Roadmap.
- Features.
- Domain model.
- Business rules.
- Architecture.
- Engineering policies.

---

# Phase 2 - Select Roadmap Item

Review:

```
PRODUCT/ROADMAP.md
```

Identify:

- Next priority item.
- Current status.
- Dependencies.
- Business objective.

Do not start implementation yet.

---

# Phase 3 - Activate Product Agents

Activate:

```
ceo
product-manager
cto
```

Optional depending on scope:

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

What problem are we solving?

---

## User Value

Why does the user care?

---

## Business Value

Why does the company need this?

---

## Success Criteria

How do we measure success?

---

# Phase 5 - Technical Analysis

CTO evaluates:

- Architecture impact.
- Required changes.
- Complexity.
- Risks.
- Dependencies.

Review:

```
ENGINEERING/ARCHITECTURE.md
```

---

# Phase 6 - Create Feature Plan

Produce a feature plan, shaped by:

```
.kenovis/AI/templates/feature-plan.md
```

That path is a form, not a destination — never write into it, and never write any produced artifact anywhere under `.kenovis/`, which `kenovis sync` replaces wholesale. See DECISIONS.md DECISION-024. The plan is a working artifact of this session; its durable parts belong in the `FEATURE-NNN` spec in `PRODUCT/FEATURES.md` and, for technical decisions, in `DECISIONS.md`.

Include:

- Objective.
- User problem.
- Scope.
- Out of scope.
- Technical approach.
- Implementation steps.
- Risks.
- Acceptance criteria.

---

# Phase 7 - Architecture Decisions

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

---

# Phase 8 - Implementation Preparation

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

---

# Phase 9 - Execute Feature Workflow

Continue with:

```
.kenovis/AI/workflows/feature.md
```

---

# Phase 10 - Quality Validation

After implementation:

Execute:

```
.kenovis/AI/commands/review.md
```

Validate:

- Architecture.
- Security.
- Tests.
- Maintainability.

---

# Phase 11 - Documentation Update

Update:

```
PRODUCT/

DOMAIN/

ENGINEERING/

AI/memory/learnings.md
```

when knowledge changes.

---

# Phase 12 - Roadmap Update

Update:

```
PRODUCT/ROADMAP.md
```

Change:

- Status.
- Progress.
- Decisions.
- Next steps.

---

# Decision Rules

Always:

- Understand before implementing.
- Validate user value.
- Respect architecture.
- Document important decisions.

Never:

- Build roadmap items without context.
- Skip technical analysis.
- Ignore business impact.
- Modify architecture casually.

---

# Final Principle

The roadmap defines where we go.

This workflow defines how we get there safely.