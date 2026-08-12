# Git Policy

Version: 2.2

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

Three long-lived branches, all protected. Work happens on short-lived branches off `development`.

Flow:

```
development

  ↓  branch

feature/XXXX

  ↓  pull request + review

development

  ↓  pull request

preproduction

  ↓  pull request

main
```

Create every working branch from `development`:

```
git fetch origin
git checkout -b feature/XXXX origin/development
```

Never branch from `main`, from `preproduction`, or from another working branch. Doing so guarantees conflicts at pull request time.

Keep working branches short-lived. A branch that lives longer than the code around it stops being mergeable.

---

# Branch Naming

Use descriptive names.

Examples:

feature/<domain-concept>-<capability>

feature/payment-reminders

bugfix/<screen-or-endpoint>-<symptom>

hotfix/login-error

refactor/<module>-<what-changes>

docs/api-reference

release/<version>

release/v0.2.0

Used for release-prep work (version bumps, CHANGELOG cuts) — same flow as `feature/XXXX` (branch from `development`, PR back into it), just a naming specialization so a release-prep branch reads as what it is instead of as a feature.

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
Add password reset workflow

Fix payment validation bug

Refactor scheduling service

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

Pull requests are merged with **Rebase and Merge**. Always.

Never:

- Merge commits.
- Squash merges.
- Manual merges into a protected branch.

Rationale: a linear history keeps `git bisect` and blame usable, and makes every commit independently revertible.

Resolving conflicts on an open pull request:

```
git rebase origin/development
# resolve
git push --force-with-lease
```

Use `--force-with-lease`, never `--force`.

---

# Rebasing

Rebase your working branch onto `origin/development` before requesting review, and again whenever the pull request falls behind.

Resolve conflicts carefully.

Rebasing your own unmerged working branch is expected. Rewriting history on a protected branch is never allowed.

Never overwrite another engineer's work without understanding the conflict.

---

# Protected Branches

`development`, `preproduction` and `main` are protected.

Never push directly to any of them. Every change enters through a pull request.

`development`

Integration branch. Where working branches land. Always buildable.

`preproduction`

Release candidate. Mirrors what is about to ship. Always deployable and tested.

`main`

Production. Always deployable, stable, tested and documented.

Never merge experimental work into a protected branch.

Automatic backmerges between protected branches carry `[skip ci]` in the commit message.

---

# Promotion Chains And Content Sync

A promotion chain of protected branches merged with rebase only cannot stay history-aligned once any step introduces a commit the upstream branch will never contain. A content-sync commit on the downstream branch is exactly such a commit — so applying that fix guarantees the next promotion needs it again.

That is a steady state, not a repair, and it is an acceptable one: what matters is that the branches are byte-identical after every promotion, not that their histories match. What is not acceptable is rediscovering it every release and spending the investigation again. (`AI/memory/LEARNINGS-ARCHIVE.md` Learning-012.)

A repository in that state promotes like this, every release:

1. Verify the downstream branch is a strict older snapshot — `git diff origin/<downstream> <last-release-cut-commit>` is empty, and nothing unique sits downstream except previous sync commits.
2. Branch `sync/<downstream>-<version>` from the downstream branch.
3. `git read-tree -u --reset origin/<upstream>`. This is the correct primitive: `git checkout <ref> -- .` does not delete files removed upstream, which matters on any release that moves or retires paths.
4. Confirm `git diff origin/<upstream> HEAD` is empty before opening the pull request.
5. Open the pull request and rebase-merge it.

Record which mode the repository is in — true fast-forward or permanent content-sync — where the release process is documented, so no release has to re-derive it.

---

# Hotfixes

A hotfix is the only case where a branch does not start from `development`.

```
git fetch origin
git checkout -b hotfix/XXXX origin/main
```

It merges to `main` through a pull request, then is backmerged into `preproduction` and `development` so the fix is never lost on the next release.

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
- Branch from `development`, never from a protected branch other than for a hotfix.
- Never push to `development`, `preproduction` or `main`.
- Never rewrite Git history unless explicitly requested.
- Never force-push shared branches. On its own working branch, use `--force-with-lease`.
- Commit or push only when the human asks.

---

# Git Review Checklist

Before merging:

✓ Branch started from `development` (or from `main` if it is a hotfix).

✓ Branch name is meaningful.

✓ Pull request targets the correct branch.

✓ Merge method is Rebase and Merge.

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
- Push directly to `development`, `preproduction` or `main`.
- Branch a feature from anything other than `development`.
- Merge a pull request with a merge commit or a squash.
- Create a merge commit manually.
- Force-push shared history.
- Rewrite history without agreement.
- Commit secrets.
- Merge code that has not been reviewed.
- Leave the repository in a broken state.

---

# Final Principle

Git is the permanent memory of the engineering team.

Every commit should make the project's history easier to understand, not harder.