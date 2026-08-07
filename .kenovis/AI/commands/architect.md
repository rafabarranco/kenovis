# Architect Command

Version: 2.0

---

# Purpose

Analyze, design, and document technical solutions before implementation.

This command exists to make high-quality architectural decisions.

The objective is not to write code.

The objective is to choose the correct solution.

---

# Trigger

Execute when:

- Designing a new system.
- Making architectural changes.
- Introducing major technologies.
- Solving complex technical problems.
- Evaluating trade-offs.

Command:

```
/architect <problem>
```

Examples:

```
/architect Design notification architecture

/architect Evaluate database scaling strategy
```

---

# Core Principle

Good architecture is not the most advanced architecture.

Good architecture is the simplest architecture that solves the current and future problem.

---

# Architecture Workflow

Follow this sequence.

---

# Step 1 - Bootstrap Context

Execute:

```
.kenovis/AI/commands/bootstrap.md
```

Understand:

- Product.
- Domain.
- Current architecture.
- Existing decisions.
- Constraints.

---

# Step 2 - Activate Architecture Agents

Always activate:

```
cto
```

Additional agents depending on context:

Backend:

```
backend
```

Frontend:

```
frontend
```

Database:

```
database
```

Security:

```
security
```

Product impact:

```
product-manager
```

---

# Step 3 - Understand The Problem

Define:

## Current Situation

What exists today?

---

## Problem

What needs to change?

---

## Constraints

What cannot change?

Examples:

- Budget.
- Performance.
- Compatibility.
- Existing users.

---

## Success Criteria

How will we know the architecture works?

---

# Step 4 - Analyze Existing Architecture

Review:

```
ENGINEERING/
```

and:

Current implementation.

Identify:

- Existing patterns.
- Strengths.
- Weaknesses.
- Technical debt.

Do not design in isolation.

---

# Step 5 - Generate Options

Create multiple possible solutions.

Minimum:

```
Option A

Option B

Option C
```

For each option explain:

- Description.
- Advantages.
- Disadvantages.
- Complexity.
- Risks.
- Long-term impact.

---

# Step 6 - Evaluate Trade-offs

Compare options using:

## Simplicity

Is it easy to understand?

---

## Scalability

Can it grow?

---

## Maintainability

Can future engineers modify it?

---

## Cost

Does complexity justify value?

---

## Risk

What can fail?

---

# Step 7 - Make Recommendation

Choose one option.

Provide:

## Recommended Solution

The selected architecture.

---

## Reasoning

Why this option wins.

---

## Trade-offs Accepted

What limitations are accepted.

---

## Future Evolution

How the design can evolve.

---

# Step 8 - Create Architecture Decision Record

If the decision affects architecture:

Create:

```
DECISIONS.md
```

or:

```
ENGINEERING/ADR/
```

Using:

```
.kenovis/AI/templates/adr.md
```

Include:

- Context.
- Decision.
- Alternatives.
- Consequences.

---

# Step 9 - Identify Implementation Impact

Define:

Affected:

- Applications.
- Packages.
- Services.
- Database.
- APIs.
- Documentation.

---

# Step 10 - Define Implementation Strategy

Provide:

## Phase 1

Minimum viable implementation.

---

## Phase 2

Improvements.

---

## Phase 3

Future scalability.

---

Avoid designing everything upfront.

---

# Architecture Review Checklist

Before approval:

✓ Problem is clearly understood.

✓ Existing architecture considered.

✓ Multiple options evaluated.

✓ Trade-offs documented.

✓ Complexity is justified.

✓ Security considered.

✓ Scalability considered.

✓ Decision recorded.

---

# Forbidden Behaviours

Never:

- Design without understanding context.
- Choose technology because it is trendy.
- Over-engineer future problems.
- Ignore existing architecture.
- Skip documenting important decisions.
- Start implementation before alignment.

---

# Decision Framework

When choosing architecture:

1. Prefer simplicity.
2. Prefer existing patterns.
3. Minimize irreversible decisions.
4. Optimize for business value.
5. Consider future evolution.
6. Document important trade-offs.

---

# Final Principle

Architecture is the art of making important decisions easy to change and unimportant decisions easy to make.