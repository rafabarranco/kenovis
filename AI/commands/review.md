# Review Command

Version: 2.0

---

# Purpose

Execute a complete engineering review of code, architecture, or a proposed change.

The objective is to verify that the implementation meets production-quality standards.

A review is not a search for mistakes.

A review is a quality improvement process.

---

# Trigger

Execute when:

- Reviewing completed work.
- Before merging a Pull Request.
- Evaluating existing code.
- Validating architecture decisions.

Command:

```
/review
```

or:

```
/review <target>
```

Examples:

```
/review

/review src/modules/events

/review latest feature implementation
```

---

# Core Principle

A change should leave the system better than before.

A working implementation is not automatically a good implementation.

---

# Review Workflow

Follow this sequence.

---

# Step 1 - Bootstrap Context

Execute:

```
AI/commands/bootstrap.md
```

Load:

- System rules.
- Architecture.
- Policies.
- Current project state.

Never review without context.

---

# Step 2 - Understand The Change

Identify:

- What changed?
- Why did it change?
- What problem does it solve?
- What business capability is affected?

Do not review code before understanding intent.

---

# Step 3 - Activate Reviewer Agent

Load:

```
AI/agents/reviewer.md
```

The reviewer is responsible for the final evaluation.

---

# Step 4 - Load Relevant Agents

Depending on the change:

## Frontend Review

Activate:

```
frontend
designer
reviewer
```

Review:

- Components.
- UX.
- State.
- Accessibility.
- Performance.

---

## Backend Review

Activate:

```
backend
security
reviewer
```

Review:

- APIs.
- Business logic.
- Validation.
- Permissions.

---

## Database Review

Activate:

```
database
security
reviewer
```

Review:

- Schema.
- Migrations.
- Integrity.
- Performance.

---

## Product Review

Activate:

```
product-manager
reviewer
```

Review:

- User value.
- Scope.
- Product alignment.

---

# Step 5 - Load Policies

Always load:

```
architecture.md

coding.md

testing.md

documentation.md
```

Additional:

Database:

```
database.md
```

Security:

```
security.md
```

Git/release:

```
git.md
```

---

# Step 6 - Architecture Review

Evaluate:

## Responsibilities

Does every part live in the correct layer?

---

## Dependencies

Are dependencies flowing correctly?

---

## Complexity

Is the solution more complex than necessary?

---

## Future Impact

Will future changes become easier or harder?

---

# Step 7 - Code Quality Review

Check:

- Naming.
- Readability.
- Duplication.
- Function responsibilities.
- Error handling.
- Type safety.
- Dependency usage.

Ask:

"Would another engineer understand this quickly?"

---

# Step 8 - Business Logic Review

Verify:

- Business rules are correct.
- Edge cases are handled.
- Domain concepts are respected.

Reject:

Business logic hidden inside technical layers.

---

# Step 9 - Security Review

Check:

- Authentication.
- Authorization.
- Input validation.
- Data exposure.
- Secrets.
- Tenant isolation.

Security issues are blockers.

---

# Step 10 - Testing Review

Evaluate:

- Are critical behaviours tested?
- Are edge cases covered?
- Are tests meaningful?
- Are tests maintainable?

Do not reward coverage numbers alone.

---

# Step 11 - Documentation Review

Verify:

Required documentation was updated.

Check:

```
PRODUCT/

DOMAIN/

ENGINEERING/

DECISIONS.md
```

---

# Step 12 - Generate Review Report

The report must contain:

---

# Summary

What was reviewed.

---

# Strengths

What was done well.

---

# Issues

Problems found.

For each issue include:

- Severity.
- Location.
- Explanation.
- Recommended action.

---

# Severity Levels

## Critical

Must fix before merge.

Examples:

- Security vulnerability.
- Data corruption risk.
- Breaking architecture.

---

## High

Should fix before merge.

Examples:

- Significant maintainability problem.
- Incorrect business behaviour.

---

## Medium

Recommended improvement.

Examples:

- Code quality issue.
- Missing documentation.

---

## Low

Optional improvement.

Examples:

- Style.
- Minor simplification.

---

# Final Decision

Choose one:

```
Approved

Approved with suggestions

Changes requested

Rejected
```

---

# Step 13 - Update Memory

If a recurring pattern or important lesson was discovered:

Update:

```
AI/memory/learnings.md
```

Examples:

- New convention.
- Architectural rule.
- Common mistake.

---

# Review Checklist

Before approval:

✓ Intent understood.

✓ Architecture respected.

✓ Code quality acceptable.

✓ Security verified.

✓ Tests are meaningful.

✓ Documentation updated.

✓ No unnecessary complexity introduced.

✓ Future maintenance considered.

---

# Forbidden Behaviours

Never:

- Review only syntax.
- Approve because tests pass.
- Ignore architecture problems.
- Ignore security risks.
- Request unnecessary rewrites.
- Optimize for personal preference.

---

# Decision Framework

When reviewing:

1. Protect correctness first.
2. Protect security second.
3. Protect maintainability third.
4. Prefer simplicity.
5. Prefer consistency.
6. Request changes only when they create real value.

---

# Final Principle

A reviewer protects the future of the product, not just the present implementation.