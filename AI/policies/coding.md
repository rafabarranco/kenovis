# Coding Policy

Version: 2.0

---

# Purpose

This document defines the coding standards that every AI agent must follow.

These rules apply to every language, framework, and repository unless a project-specific rule explicitly overrides them.

Correct code is not enough.

Code must also be understandable, maintainable, testable, and safe to evolve.

---

# Engineering Philosophy

Every line of code is a liability.

Every line should justify its existence.

Prefer:

- Less code
- Clear code
- Predictable code

Never optimize for writing speed.

Optimize for long-term ownership.

---

# The Readability Rule

Code is written once.

It is read hundreds of times.

Always optimize for the next engineer.

If a solution needs an explanation, it is probably too complex.

---

# Simplicity

Always choose the simplest implementation that correctly solves the problem.

Prefer:

- Small functions
- Explicit names
- Linear logic
- Predictable control flow

Avoid:

- Clever tricks
- Nested conditionals
- Hidden side effects
- Implicit behaviour

---

# Naming

Names must describe intent.

Good names explain:

- What something represents.
- Why it exists.
- What it returns.

Avoid:

- data
- item
- value
- temp
- helper
- manager
- utils
- misc

Prefer business language.

---

# Functions

A function should:

- Have one responsibility.
- Be easy to read.
- Be easy to test.
- Be deterministic whenever possible.

Prefer early returns.

Avoid deeply nested code.

---

# Function Size

There is no strict line limit.

However:

If scrolling is required to understand a function, it is probably doing too much.

Split responsibilities.

---

# Parameters

Prefer:

Small parameter lists.

When many values are needed:

Use objects.

Avoid:

Boolean flags.

Example:

Bad

```
createUser(user, true, false, true)
```

Better

```
createUser(user, {
  sendEmail: true,
  activate: false,
  audit: true
})
```

---

# Comments

Good code rarely needs comments.

Comments should explain:

WHY

not

WHAT.

Delete outdated comments immediately.

---

# Duplication

Avoid duplicated knowledge.

Do not extract abstractions too early.

Wait until duplication becomes meaningful.

---

# Error Handling

Errors should be:

Explicit.

Actionable.

Consistent.

Never swallow exceptions silently.

Never ignore failed promises.

---

# Immutability

Prefer immutable data whenever practical.

Avoid mutating shared objects.

Predictability is more important than micro-performance.

---

# Type Safety

Use the strongest typing available.

Avoid:

- any
- unsafe casts
- stringly-typed code

Types are documentation.

---

# Dependencies

Before adding a dependency ask:

- Does the standard library already solve this?
- Is the dependency actively maintained?
- Does it reduce complexity?
- Is it worth the long-term maintenance cost?

Every dependency becomes part of the architecture.

---

# Logging

Logs exist for operators.

Not developers.

Every log should answer:

What happened?

Why?

Can someone investigate this?

Never log secrets.

Never log credentials.

Never log personal data unless explicitly justified.

---

# Configuration

Configuration belongs outside code.

Never hardcode:

- URLs
- Credentials
- Secrets
- Environment-specific values

Use configuration providers.

---

# Constants

Magic numbers are forbidden.

Meaningful constants improve readability.

Example:

Bad

```
if (age >= 18)
```

Better

```
const LEGAL_ADULT_AGE = 18
```

when the value has business meaning.

---

# Defensive Programming

Assume external input is invalid.

Validate boundaries.

Do not over-validate trusted internal code.

Balance safety with simplicity.

---

# Code Evolution

Before changing existing code ask:

Why was this written this way?

Avoid rewriting code without understanding its history.

---

# Refactoring

Refactor when:

- Duplication increases.
- Complexity grows.
- Naming becomes confusing.
- Responsibilities blur.

Do not refactor unrelated code inside feature work unless it improves clarity without increasing risk.

---

# Performance

Optimize after measuring.

Readable code beats hypothetical optimization.

Document non-obvious optimizations.

---

# AI Expectations

AI must:

- Follow existing conventions.
- Prefer consistency over novelty.
- Reuse existing patterns.
- Keep changes as small as possible.

AI should never rewrite files unnecessarily.

---

# Pull Request Checklist

Before considering work complete:

✓ Names are meaningful.

✓ Functions have one responsibility.

✓ No duplicated business logic exists.

✓ Error handling is consistent.

✓ Types are correct.

✓ No unnecessary dependency was introduced.

✓ Existing conventions were followed.

✓ Code became simpler, not more complex.

---

# Final Principle

Every commit should leave the codebase slightly better than it was before.