# Testing Policy

Version: 2.5

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

# A Check Is Not Verified Until It Has Been Run

Not every check in a repository is a test. Greps, marker conventions, CI scripts and manual verification steps written into a command are all checks, and none of them are covered by the test suite. They fail the same way tests do and nothing reports it.

**Run a new check against a known-good corpus in the round that introduces it.** A check that has only ever been reasoned about encodes its author's mental model of what a bad case looks like, and silently misclassifies everything that model did not contain. Reading a grep is indistinguishable from running it, right up to the moment the two disagree. Zero matches against a document set already known to be correct is the acceptance criterion, and it costs one command. If the check's own documentation lives inside the scanned corpus, say so rather than quietly reporting a number that excludes it. (`company-os/AI/memory/LEARNINGS-ARCHIVE.md` Learning-015.)

**Enumerate the population, not the matches.** When fixing a class of defect, a pattern built from the instances already found can only ever report instances of that shape. Ask "where could this live?" — usually a structural set, like every reference to a path, or every step block in a command — and check each member against the rule. A pattern that matches *defects* cannot be complete; a pattern that enumerates *sites* can be. (Learning-021.)

**Write the protected property as a sentence before choosing the population.** An exact population feels like completeness in a way a pattern does not, which is exactly what stops the search too early. Check that the population is the set of places the property could be violated — not the set of places the known violations happened to sit. (Learning-022.)

**A guard states which of its parts is exact and which is a heuristic, and prints both counts.** A population that is structurally enumerable is exact; a classifier deciding which members are in scope usually is not, and cannot be. Saying so in the script lets the next round check the question the guard asks instead of re-verifying its answer. A check that hides its own cut invites a clean pass to be read as proof. (Learning-022.)

**If the population is mechanically enumerable, the check belongs in CI**, not in a session's scrollback. Confirm it fails against the pre-fix state before keeping it. (Learning-021.)

**A fix that succeeds can make the guard covering it pass for the wrong reason.** When the remedy removes the condition that puts a document, path or record into the guard's scope, the branch the fix just registered stops executing — and the guard reports a clean pass that is true of the file and silent about the change. The pass is evidence the problem is gone, never evidence the new handling works. Exercise the registered branch in a fixture that still meets the triggering condition, and say which branch the green run actually covered. (`company-os/PRODUCT/ROADMAP.md` item 35: a changelog trimmed to 18.5 KB passed its size guard by being under threshold, leaving the `split` registration written for it untested.)

**For anything installed elsewhere, "has this been run from an installed copy?" predicts latent defects better than any review pass.** Instructions that are correct in the origin repository can be destructive in an Installation without a word of them changing. Run each command end to end from a real published installation, one per round. (Learning-020.)

**This discipline is not only for mechanical checks.** A recurring instruction given to an agent — "observe", "review", "scan for X" — degrades the identical way an unbounded guard does when its population is not named: coverage narrows silently to whatever is easiest to notice on a given round, in a way that reads as diligence and is not. `.kenovis/AI/commands/next.md` → "Observe" is written as a fixed, short, named checklist for exactly this reason, not as an open-ended instruction to look for problems — the same population discipline Learning-021/Learning-022 already require of a mechanical check, applied to a step a human never runs but an agent is instructed to. (`company-os/AI/memory/learnings.md` Learning-041.)

---

# A Guard Declares Its Loaded-Layer Home, Inside The Guard

`.kenovis/AI/policies/architecture.md` → "An Improvement Lands Where The Work Is Loaded" is the rule: a mechanical check is a local net over one repository's own practice and never the answer to "how is this enforced", and a round that adds one states what the loaded-layer half is, or records that the rule has no loaded-layer form and why. That section is not restated here. What follows is the part specific to checks.

**The declaration goes inside the check itself**, on one line naming the policy section, command step or template that carries the rule — or recording the no-form outcome and its reason. Not in a register kept beside the checks: a register is a second copy of a fact that changes whenever a check changes, and it drifts. The docstring is read at the moment the check is edited, which is the moment the declaration is either true or newly wrong.

A check with no such line is enforcement that stops at one repository's edge while reading as if it did not. The failure mode is cumulative rather than acute — each round adds a check, records the gap as a caveat, and the distance between the repository and the product it ships grows by one check per round, with every individual round defensible.

**A check that cites the work which will close its gap is citing something that can be rejected.** When that happens the check keeps pointing at it, reads as scheduled, and is not. A check's reference to its loaded-layer half is documentation like any other and is corrected when it stops being true.

**A permanent satisfier turns a recurring trigger into a one-time gate.** When a threshold rule accepts a structural answer — a registered split, a declared archive, a named exception — the answer is usually registered once and never re-evaluated, so the guard passes forever while the condition it was built to catch comes straight back. The check is not wrong and the structure is not wrong; what is missing is that satisfying the rule once was mistaken for satisfying it continuously. So when a guard's passing condition is a permanent registration, say in the guard what it stops being able to see, and put the recurring half — running the pass, re-reading the number — where the work is loaded rather than in the guard. (`company-os/PRODUCT/ROADMAP.md` OF-23: a roadmap registered with a split grew from 45.8 KB back to 70.4 KB against a 60 KB threshold in one day, with a clean CI throughout.)

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