# Release Command

Version: 2.2

---

# Purpose

Prepare and validate a production release.

This command ensures that the product is technically stable, documented, and ready to be delivered to users.

A release is not only a deployment.

A release is a verified product milestone.

---

# Trigger

Execute when:

- Preparing a production deployment.
- Creating a product version.
- Publishing a major milestone.

Command:

```
/release
```

or:

```
/release <version>
```

Examples:

```
/release

/release v1.0.0
```

---

# Core Principle

Never release code.

Release a validated product improvement.

---

# Release Workflow

Follow this sequence.

---

# Step 1 - Bootstrap Context

Execute:

```
.kenovis/AI/commands/bootstrap.md
```

Load:

- Product state.
- Engineering state.
- Current roadmap.
- Previous decisions.

---

# Step 2 - Identify Release Scope

Determine:

- Version.
- Included features.
- Bug fixes.
- Breaking changes.
- Database changes.
- Infrastructure changes.

Review:

```
git history
```

and:

```
PRODUCT/ROADMAP.md
```

---

# Step 3 - Activate Release Agents

Activate:

```
cto

reviewer
```

Optional:

```
marketing
```

for user-facing releases.

---

# Step 4 - Review Release Readiness

Evaluate:

## Product

Questions:

- Does this release deliver the expected value?
- Are acceptance criteria satisfied?
- Are incomplete features excluded?

---

## Engineering

Check:

- Architecture stability.
- Code quality.
- Technical risks.

---

## Security

Check:

- New vulnerabilities.
- Permission changes.
- Sensitive data handling.

---

## Operations

Check:

- Deployment requirements.
- Environment variables.
- Infrastructure changes.

---

# Step 5 - Run Validation

Execute:

Tests:

```
All required tests
```

Quality checks:

```
Lint

Type checking

Build
```

Verify:

- Application starts correctly.
- Critical workflows work.
- No blocking errors exist.

---

# Step 6 - Database Validation

If database changes exist:

Verify:

- Migrations are included.
- Migration order is correct.
- Rollback strategy exists.
- Production impact is understood.

Never release unknown database changes.

---

# Step 7 - Documentation Review

Verify:

Updated:

```
PRODUCT/

DOMAIN/

ENGINEERING/

DECISIONS.md
```

Required:

- Release notes.
- Migration instructions.
- Breaking changes.

---

# Step 8 - Generate Release Notes

Prepare release notes and publish them wherever this product publishes them — `AUTOMATIONS/release-process.md` records where that is.

Shaped by:

```
.kenovis/AI/templates/release-notes.md
```

That path is a form, not a destination — never write into it, and never write any produced artifact anywhere under `.kenovis/`, which `kenovis sync` replaces wholesale. See DECISIONS.md DECISION-024.

Include:

## Version

Release identifier.

---

## Highlights

Main user benefits.

---

## New Features

Capabilities added.

---

## Improvements

Existing behaviour improved.

---

## Bug Fixes

Problems solved.

---

## Breaking Changes

Migration required.

---

## Technical Notes

Important engineering information.

---

# Step 9 - Git Preparation

Verify:

- Branch state.
- Commit history.
- Version tags.
- Clean working tree.

Follow:

```
.kenovis/AI/policies/git.md
```

---

# Step 10 - Release Decision

Generate:

```
Release Readiness Report
```

With:

---

## Status

Choose:

```
Ready

Ready with warnings

Blocked
```

---

## Risks

Remaining concerns.

---

## Required Actions

Tasks before release.

---

# Step 11 - Post Release

After deployment:

Verify:

- Application availability.
- Error monitoring.
- Critical workflows.
- User impact.

Record, naming where each part goes rather than leaving "document" to resolve itself:

- **Release outcome** → `CHANGELOG.md`, under the version just cut.
- **Problems discovered** → these are findings. Each one is fixed in this session, scheduled with an id in `PRODUCT/ROADMAP.md`, or rejected with a reason. A problem discovered during a release and written only into the release notes has been announced, not dispositioned. See `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected".
- **Follow-up tasks** → `PRODUCT/ROADMAP.md`, with an id. A follow-up that exists only as a sentence in a post-release summary is the deferred-improvement failure that policy names.

---

# AI Responsibilities

AI must:

- Validate before releasing.
- Avoid skipping checks.
- Highlight risks.
- Prepare documentation.
- Preserve release history.

AI must never:

- Declare a release ready without validation.
- Ignore failing tests.
- Hide known risks.
- Make destructive production changes.

---

# Release Checklist

Before release:

✓ Scope is defined.

✓ Tests pass.

✓ Build succeeds.

✓ Documentation updated.

✓ Database changes reviewed.

✓ Security reviewed.

✓ Rollback strategy exists.

✓ Release notes created.

✓ Risks communicated.

---

# Decision Framework

When deciding release readiness:

1. Protect users first.
2. Protect data second.
3. Protect system stability third.
4. Delay release when uncertainty is high.
5. Prefer smaller safe releases over large risky releases.
6. Document accepted risks.

---

# Final Principle

A release is a promise to users.

Only make promises the system can keep.