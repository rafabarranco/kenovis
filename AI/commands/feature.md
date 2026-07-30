# Feature Command

Version: 2.0

---

# Purpose

Execute the complete lifecycle of a product feature.

This command transforms a product idea into a production-ready implementation.

The goal is not only to build functionality.

The goal is to build the correct functionality with the correct architecture and quality standards.

---

# Trigger

Execute when:

- A new feature needs to be developed.
- A roadmap item requires implementation.
- A product requirement has been defined.

Command:

```
/feature <feature description>
```

Example:

```
/feature Add recurring event notifications
```

---

# Core Principle

A feature is not finished when the code works.

A feature is finished when:

- The user problem is solved.
- The implementation is maintainable.
- The quality is validated.
- The documentation is updated.

---

# Execution Workflow

Follow this sequence.

---

# Step 1 - Bootstrap

Execute:

```
AI/commands/bootstrap.md
```

Before making changes.

Load:

- Project context.
- Architecture.
- Existing conventions.
- Current state.

---

# Step 2 - Product Analysis

Activate:

```
product-manager
```

Analyze:

## User Problem

What problem does this solve?

---

## User Value

Why will users care?

---

## Business Value

Why does this matter for the company?

---

## Success Criteria

How do we know this works?

---

# Step 3 - Domain Analysis

Review:

```
DOMAIN/
```

Identify:

- Existing entities.
- Business rules.
- New concepts required.
- Possible conflicts.

If a new domain concept appears:

Document it before implementation.

---

# Step 4 - UX Analysis

Activate:

```
designer
```

Define:

- User flow.
- Screens involved.
- Interaction patterns.
- Empty states.
- Error states.

Avoid building features without considering user experience.

---

# Step 5 - Architecture Analysis

Activate:

```
cto
```

Evaluate:

- Architectural impact.
- Required layers.
- Dependencies.
- Technical risks.

Decide:

- Where the logic belongs.
- What should change.
- What should remain untouched.

---

# Step 6 - Select Engineering Agents

Choose specialists.

Examples:

Frontend feature:

```
frontend

designer

reviewer
```

Backend feature:

```
backend

database

security

reviewer
```

Full-stack feature:

```
frontend

backend

database

security

reviewer
```

---

# Step 7 - Load Policies

Always load:

```
architecture.md

coding.md

testing.md

documentation.md
```

Additional policies:

Database changes:

```
database.md
```

Security impact:

```
security.md
```

---

# Step 8 - Create Feature Plan

Before coding create:

```
AI/templates/feature-plan.md
```

The plan must include:

---

## Feature Description

What is being built?

---

## Problem

What user problem is solved?

---

## Scope

What is included?

---

## Out Of Scope

What is intentionally excluded?

---

## User Flow

How users interact with it.

---

## Domain Impact

New or modified business concepts.

---

## Technical Design

Architecture approach.

---

## Data Changes

Database modifications.

---

## Security Considerations

Risks and mitigations.

---

## Testing Strategy

How behaviour will be validated.

---

## Documentation Required

What knowledge must be updated.

---

# Step 9 - Implementation

Implement incrementally.

Rules:

- Keep changes focused.
- Follow existing patterns.
- Avoid unnecessary refactoring.
- Reuse existing components.
- Maintain backwards compatibility.

---

# Step 10 - Testing

Verify:

Business rules.

Critical workflows.

Edge cases.

Security boundaries.

Integration points.

---

# Step 11 - Code Review

Activate:

```
reviewer
```

Review:

- Correctness.
- Architecture.
- Maintainability.
- Security.
- Performance.
- Documentation.

---

# Step 12 - Documentation Update

Update when necessary:

Product:

```
PRODUCT/
```

Domain:

```
DOMAIN/
```

Engineering:

```
ENGINEERING/
```

Decisions:

```
DECISIONS.md
```

---

# Step 13 - Completion Report

Generate summary:

## Feature

What was built.

## User Value

What problem was solved.

## Technical Changes

What changed internally.

## Files Changed

Important modifications.

## Tests

Validation performed.

## Decisions

Important choices.

## Future Improvements

Potential follow-ups.

---

# Feature Quality Checklist

Before marking complete:

✓ User problem is clear.

✓ Scope was respected.

✓ Architecture boundaries are preserved.

✓ Business logic is correctly placed.

✓ Security was considered.

✓ Tests protect behaviour.

✓ Documentation is updated.

✓ Reviewer approved.

---

# Forbidden Behaviours

Never:

- Start coding without understanding the problem.
- Add features outside scope.
- Ignore UX.
- Put business logic in UI.
- Skip testing.
- Skip review.
- Introduce dependencies without justification.
- Leave undocumented decisions.

---

# Decision Framework

When implementing a feature:

1. Understand the user problem.
2. Prefer extending existing capabilities.
3. Prefer simple solutions.
4. Avoid premature abstraction.
5. Protect future flexibility.
6. Document important trade-offs.

---

# Final Principle

A feature is not a piece of code.

A feature is a business capability delivered through software.