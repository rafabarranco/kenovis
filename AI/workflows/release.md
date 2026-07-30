# Release Management Workflow

Version: 2.0

---

# Purpose

Prepare, validate and deliver a production release following a controlled engineering process.

This workflow ensures releases are stable, documented and aligned with product expectations.

The objective is not only to deploy changes.

The objective is to deliver reliable software to users.

---

# Trigger

Execute when:

- Preparing a production release.
- Publishing a new application version.
- Deploying completed features.
- Creating release documentation.

Command:

```
/release
```

or:

```
Prepare release
```

---

# Core Principle

A release is not the final step of development.

A release is a quality checkpoint where product, engineering and operations must be aligned.

---

# Workflow

Follow these phases.

---

# Phase 1 - Bootstrap Project Context

Execute:

```
AI/commands/bootstrap.md
```

Load:

- Product context.
- Completed features.
- Current roadmap status.
- Engineering policies.
- Release requirements.

---

# Phase 2 - Review Release Scope

Review:

```
PRODUCT/ROADMAP.md

PRODUCT/FEATURES.md
```

Identify:

- Features included.
- Bug fixes included.
- Technical changes.
- Known limitations.

Do not release changes without a clear scope.

---

# Phase 3 - Activate Release Agents

Activate:

```
cto
product-manager
reviewer
```

Optional depending on release scope:

```
frontend
backend
database
security
```

---

# Phase 4 - Technical Validation

CTO evaluates:

- Deployment readiness.
- Architecture consistency.
- Database migrations.
- Infrastructure requirements.
- Rollback strategy.

Review:

```
ENGINEERING/ARCHITECTURE.md

ENGINEERING/DATABASE.md

ENGINEERING/SECURITY.md
```

---

# Phase 5 - Quality Validation

Execute:

```
AI/commands/review.md
```

Validate:

- Tests passing.
- No critical bugs.
- Performance requirements.
- Security requirements.
- Production readiness.

---

# Phase 6 - Release Preparation

Prepare:

```
AI/templates/release-notes.md
```

Include:

- Release summary.
- New features.
- Bug fixes.
- Improvements.
- Breaking changes.
- Known issues.

---

# Phase 7 - Deployment Preparation

Verify:

- Environment configuration.
- Database migrations.
- Build process.
- Deployment steps.
- Monitoring.

Affected areas:

```
APPLICATION

DATABASE

API

INFRASTRUCTURE

DOCUMENTATION
```

---

# Phase 8 - Execute Release

Perform:

- Version update.
- Deployment.
- Migration execution.
- Release publication.

Monitor:

- Errors.
- Performance.
- User impact.

---

# Phase 9 - Post Release Validation

Validate:

- Application availability.
- Critical user flows.
- Monitoring status.
- Reported issues.

---

# Phase 10 - Documentation Update

Update:

```
PRODUCT/

ENGINEERING/

AI/memory/learnings.md
```

Document:

- Released version.
- Important changes.
- Operational learnings.
- Future improvements.

---

# Phase 11 - Roadmap Update

Update:

```
PRODUCT/ROADMAP.md
```

Change:

- Completed items.
- Release status.
- Next priorities.

---

# Decision Rules

Always:

- Validate before releasing.
- Document changes.
- Have a rollback strategy.
- Monitor after deployment.

Never:

- Release untested changes.
- Skip validation.
- Deploy without understanding impact.
- Ignore production feedback.

---

# Final Principle

A successful release is not when code reaches production.

A successful release is when users receive a stable and valuable improvement.
```