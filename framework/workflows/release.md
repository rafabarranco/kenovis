# Release Management Workflow

Version: 2.1

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
.kenovis/AI/commands/bootstrap.md
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
company-os/PRODUCT/ROADMAP.md

company-os/PRODUCT/FEATURES.md
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
company-os/ENGINEERING/ARCHITECTURE.md

company-os/ENGINEERING/DATABASE.md

company-os/ENGINEERING/SECURITY.md
```

---

# Phase 5 - Quality Validation

Execute:

```
.kenovis/AI/commands/review.md
```

Validate:

- Tests passing.
- No critical bugs.
- Performance requirements.
- Security requirements.
- Production readiness.

---

# Phase 6 - Release Preparation

Prepare release notes and publish them wherever this product publishes them — `company-os/AUTOMATIONS/release-process.md` records where that is.

Shaped by:

```
.kenovis/AI/templates/release-notes.md
```

That path is a form, not a destination — never write into it, and never write any produced artifact anywhere under `.kenovis/`, which `kenovis sync` replaces wholesale. See company-os/DECISIONS.md DECISION-024.

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
company-os/PRODUCT/

company-os/ENGINEERING/

company-os/AI/memory/learnings.md
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
company-os/PRODUCT/ROADMAP.md
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
