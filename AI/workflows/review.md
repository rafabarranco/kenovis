# Code Review Workflow

Version: 2.1

---

# Purpose

Validate implementation quality, architecture consistency and product requirements before completing a development task.

This workflow ensures changes are reliable, maintainable and aligned with project standards.

The objective is not only to find problems.

The objective is to improve the quality of the system.

---

# Trigger

Execute when:

- A feature implementation is completed.
- A bug fix is completed.
- A pull request requires validation.
- A release requires quality verification.

Command:

```
/review
```

or:

```
Review implementation
```

---

# Core Principle

Review is not a final approval step.

Review is a quality process that protects the product, the architecture and future development.

---

# Workflow

Follow these phases.

---

# Phase 1 - Bootstrap Project Context

Execute:

```
AI/commands/bootstrap.md
```

If bootstrap already ran earlier this session and `graphify-out/graph.json` is still fresh, re-query the graph (`graphify query "<topic>"`) instead of re-reading the full context tree.

Load:

- Product requirements.
- Domain rules.
- Architecture.
- Engineering policies.
- Testing standards.

---

# Phase 2 - Understand Change Scope

Once `CODE/` has real content: use `graphify query "<topic>"` and `graphify affected "<component>"` to scope impact instead of reading changed files cold.

Review:

- Feature requirements.
- Bug description.
- Implementation plan.
- Changed files.

Identify:

- What changed.
- Why it changed.
- Expected behavior.
- Possible impact areas.

---

# Phase 3 - Activate Review Agents

Activate:

```
reviewer
cto
```

Optional depending on changes:

```
frontend
backend
database
security
```

---

# Phase 4 - Requirements Validation

Verify:

## Product Requirements

Check:

- User problem solved.
- Acceptance criteria fulfilled.
- Expected behavior implemented.

---

## Business Rules

Check:

- Domain rules respected.
- Existing behavior preserved.
- No invalid flows introduced.

---

# Phase 5 - Code Quality Review

Analyze:

- Code readability.
- Maintainability.
- Project conventions.
- Complexity.
- Duplication.
- Error handling.

Review:

```
AI/policies/coding.md
```

---

# Phase 6 - Architecture Review

Evaluate:

- Architecture consistency.
- Component responsibilities.
- Data flow.
- Scalability impact.

Review:

```
ENGINEERING/ARCHITECTURE.md
```

If problems are detected:

Execute:

```
AI/commands/architect.md
```

---

# Phase 7 - Security Review

Review:

```
ENGINEERING/SECURITY.md
```

Validate:

- Authentication.
- Authorization.
- Data protection.
- Sensitive information handling.
- Security risks.

---

# Phase 8 - Testing Review

Validate:

```
AI/policies/testing.md
```

Check:

- Unit tests.
- Integration tests.
- Regression coverage.
- Edge cases.

---

# Phase 9 - Documentation Review

Verify:

```
PRODUCT/

DOMAIN/

ENGINEERING/

AI/memory/
```

are updated when required.

Check:

- New decisions documented.
- New rules documented.
- Knowledge preserved.

---

# Phase 10 - Final Review Result

Generate result:

Approved:

```
Implementation meets requirements and quality standards.
```

or:

Needs changes:

```
Required improvements:
- Issue
- Impact
- Recommended action
```

---

# Decision Rules

Always:

- Review against requirements.
- Consider future maintainability.
- Protect system consistency.
- Provide actionable feedback.

Never:

- Review only code style.
- Ignore architecture impact.
- Approve incomplete functionality.
- Skip security validation.

---

# Final Principle

A good review does not slow development.

A good review prevents future problems.
```