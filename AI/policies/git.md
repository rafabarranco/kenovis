# Git Policy

Version: 2.0

---

# Purpose

This document defines the Git workflow and version control standards for this project.

Git is not only a backup system.

Git is the complete history of how the product evolved.

Every commit should tell a clear story.

---

# Core Philosophy

A repository should be understandable through its commit history.

A new engineer should be able to answer:

- What changed?
- Why did it change?
- When did it change?
- Who made the decision?

without reading every file.

---

# Golden Rules

Every change should be:

- Atomic
- Reversible
- Reviewable
- Understandable

Never mix unrelated changes.

---

# Branch Strategy

Prefer short-lived branches.

Typical flow:

main

↓

feature/...

↓

review

↓

merge

Avoid long-running branches whenever possible.

---

# Branch Naming

Use descriptive names.

Examples:

feature/member-attendance

feature/payment-reminders

bugfix/event-filter

hotfix/login-error

refactor/attendance-service

docs/api-reference

Avoid:

feature1

test

new

fix

tmp

---

# Commit Philosophy

A commit represents one logical change.

If a commit message contains:

"and"

it probably includes multiple changes.

Split it.

---

# Commit Messages

Prefer imperative mood.

Examples:

```
Add attendance confirmation workflow

Fix payment validation bug

Refactor event scheduling service

Update onboarding documentation
```

Avoid:

```
changes

fix

update

work

misc

final
```

---

# Commit Size

Prefer small commits.

A reviewer should understand a commit in a few minutes.

Large commits increase review difficulty and merge conflicts.

---

# Pull Requests

Every Pull Request should explain:

- Why the change exists.
- What changed.
- How it was tested.
- Risks.
- Breaking changes.
- Documentation updates.

The code should not need to explain the business reason.

---

# Reviews

No significant change should be merged without review.

Review the:

- Business value.
- Architecture.
- Security.
- Maintainability.
- Documentation.

Not only correctness.

---

# Merge Strategy

Prefer:

Squash Merge

or

Rebase Merge

depending on project conventions.

Avoid noisy merge histories.

---

# Rebasing

Rebase before merging when appropriate.

Resolve conflicts carefully.

Never overwrite another engineer's work without understanding the conflict.

---

# Main Branch

The main branch should always be:

- Deployable
- Stable
- Tested
- Documented

Never merge experimental work directly into main.

---

# Hotfixes

Hotfixes should:

- Solve one production issue.
- Be minimal.
- Be reviewed after deployment.
- Be documented.

Never introduce unrelated improvements during a hotfix.

---

# Rollback

Every deployment should have a rollback strategy.

Before merging ask:

Can this change be safely reverted?

If not, document why.

---

# Breaking Changes

Breaking changes require:

- Explicit documentation.
- Migration strategy.
- Version update when applicable.
- Communication plan.

Never surprise consumers.

---

# Versioning

Prefer Semantic Versioning:

MAJOR

Breaking changes.

MINOR

Backward-compatible features.

PATCH

Bug fixes.

---

# Generated Files

Avoid committing generated artifacts unless they are required.

Examples:

Do not commit:

- Temporary files
- Local caches
- Build outputs
- Editor-specific files

unless intentionally versioned.

---

# Secrets

Never commit:

- API keys
- Tokens
- Passwords
- Certificates
- Private keys

Even temporarily.

Use environment variables or secret management systems.

---

# AI Responsibilities

AI should:

- Create focused commits.
- Avoid unrelated formatting changes.
- Respect existing branch strategy.
- Never rewrite Git history unless explicitly requested.
- Never force-push shared branches.

---

# Git Review Checklist

Before merging:

✓ Branch name is meaningful.

✓ Commit history is clean.

✓ Changes are atomic.

✓ Documentation is updated.

✓ Tests pass.

✓ No secrets are committed.

✓ Rollback is possible.

✓ Breaking changes are documented.

---

# Forbidden Behaviours

Never:

- Commit unrelated work together.
- Push directly to production branches.
- Force-push shared history.
- Rewrite history without agreement.
- Commit secrets.
- Merge code that has not been reviewed.
- Leave the repository in a broken state.

---

# Final Principle

Git is the permanent memory of the engineering team.

Every commit should make the project's history easier to understand, not harder.