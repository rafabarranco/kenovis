# Testing Policy

Version: 2.0

---

# Purpose

This document defines the testing philosophy and quality assurance standards for this project.

Testing exists to protect the business.

Not to increase code coverage.

Every test should reduce the probability of introducing defects into production.

---

# Core Philosophy

Confidence is the goal.

Coverage is only a metric.

A project with 100% coverage can still be full of bugs.

A project with 40% coverage can be extremely reliable.

Always optimize for confidence.

---

# Risk-Based Testing

Not all code has the same value.

Prioritize testing according to business risk.

Highest priority:

- Authentication
- Authorization
- Payments
- Financial calculations
- Permissions
- Business rules
- Multi-tenant isolation

Medium priority:

- Application workflows
- API endpoints
- Data persistence

Lower priority:

- Simple UI rendering
- Presentational components
- Trivial mappings
- Framework behaviour

---

# Test Behaviour

Test behaviour.

Do not test implementation details.

Good test:

"When an event is cancelled, every attendee receives a notification."

Bad test:

"The private function calculateNotifications() returns 3."

Behaviour survives refactoring.

Implementation does not.

---

# Business First

Protect:

Business Rules

↓

Critical Workflows

↓

Integrations

↓

Infrastructure

Never invert this order.

---

# Testing Pyramid

Prefer:

Many fast tests.

Some integration tests.

Few end-to-end tests.

Use E2E only for complete user journeys.

---

# Unit Tests

Use unit tests for:

- Domain logic
- Validation
- Calculations
- State transitions
- Utility functions with business value

Keep them:

- Fast
- Deterministic
- Independent

---

# Integration Tests

Verify collaboration between components.

Examples:

- API ↔ Database
- Domain ↔ Repository
- Service ↔ External Provider

Integration tests protect architecture.

---

# End-to-End Tests

Use E2E tests only for:

- Critical user journeys
- Authentication
- Payments
- Registration
- Onboarding
- High-value workflows

Avoid testing every UI interaction.

---

# Regression Tests

Every production bug should produce:

1. A failing test.
2. A fix.
3. A passing test.

Never fix the same bug twice.

---

# Edge Cases

Think beyond the happy path.

Test:

- Invalid input
- Missing permissions
- Duplicate requests
- Empty states
- Time-related scenarios
- Concurrent operations
- Unexpected failures

---

# Multi-Tenant Testing

Every multi-tenant application must verify:

- Data isolation
- Permission boundaries
- Organization ownership

Cross-tenant leaks are critical failures.

---

# Security Testing

Verify:

- Authentication
- Authorization
- Validation
- Sensitive operations
- Permission escalation

Security assumptions should be tested.

---

# Performance Testing

Measure only when necessary.

Test performance for:

- Expensive queries
- Large datasets
- Critical workflows
- High concurrency

Avoid premature benchmarking.

---

# Test Data

Use realistic data.

Avoid meaningless values like:

```
John Doe

Test User

ABC123
```

Representative data improves confidence.

---

# Mocking

Mock external systems.

Avoid mocking your own business logic.

Mock:

- Email providers
- Payment gateways
- External APIs
- File storage

Prefer real collaboration inside your own application.

---

# Test Independence

Tests must never depend on:

- Execution order
- Shared mutable state
- External timing
- Previous tests

Every test should run independently.

---

# Readability

Tests are documentation.

Someone should understand expected behaviour by reading tests alone.

Use descriptive names.

---

# Flaky Tests

Flaky tests destroy confidence.

Fix or remove them immediately.

Never ignore unstable tests.

---

# AI Responsibilities

AI must:

- Add tests for new business behaviour.
- Update tests when behaviour changes.
- Remove obsolete tests.
- Prefer behaviour-driven testing.
- Avoid meaningless coverage.

AI should never generate tests only to increase percentages.

---

# Review Checklist

Before approving:

✓ Critical workflows are protected.

✓ Business rules are tested.

✓ Edge cases are considered.

✓ Multi-tenant boundaries are verified.

✓ Security-sensitive paths are tested.

✓ Regression tests exist for important fixes.

✓ Tests remain readable.

✓ Test suite remains fast.

---

# Decision Framework

When deciding what to test:

1. Protect business value first.
2. Test behaviour before implementation.
3. Prefer fast tests.
4. Test integrations where risk exists.
5. Use E2E only for critical journeys.
6. Add regression tests for every production bug.

---

# Forbidden Behaviours

Never:

- Chase coverage percentages.
- Test framework internals.
- Duplicate production logic inside tests.
- Ignore flaky tests.
- Mock everything.
- Skip tests for critical business rules.
- Remove failing tests instead of fixing them.

---

# Final Principle

A good test suite is not the one with the most tests.

It is the one that gives the team confidence to deploy every day.