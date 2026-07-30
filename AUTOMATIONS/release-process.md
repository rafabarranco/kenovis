<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

release-process.md

Software Release Process

Version: 1.0
---
Purpose

Define the process used to safely develop, review and release software changes.

The objective is to balance:

- Development speed.
- Product quality.
- Security.
- Reliability.
---
Philosophy

Follow:

Move fast.

Do not break trust.

---
Release Principles

Every release must:

- Solve a real problem.
- Be reviewed.
- Be tested.
- Be reversible.
---
Development Lifecycle

The standard lifecycle:

Idea

↓

Specification

↓

Development

↓

Review

↓

Testing

↓

Staging

↓

Production

↓

Monitoring

---
Environment Strategy

The platform uses:

Development

Staging

Production

---
Development Environment

Purpose:

Build and experiment.

Characteristics:

- Local development.
- Test data.
- Fast iteration.
---
Staging Environment

Purpose:

Validate before production.

Characteristics:

- Production-like environment.
- Realistic workflows.
- Final verification.
---
Production Environment

Purpose:

Serve real customers.

Requirements:

- Stability.
- Monitoring.
- Backup strategy.
- Controlled deployments.
---
Feature Development Process
---
Step 1

Define the Change

Before coding:

Document:

- Problem.
- User impact.
- Expected behavior.
- Acceptance criteria.
---
Step 2

Technical Analysis

The CTO agent evaluates:

- Architecture impact.
- Database changes.
- Security implications.
- Complexity.
---
Step 3

Implementation

Development rules:

- Follow architecture guidelines.
- Keep changes focused.
- Avoid unrelated refactoring.
---
Step 4

Automated Review

AI-assisted review should analyze:

- Code quality.
- Security risks.
- Architecture consistency.
- Potential bugs.
---
Step 5

Testing

Required tests depend on impact.
---
Critical Business Logic

Must include tests.

Examples:

- Core domain calculations, per DOMAIN/BUSINESS_RULES.md.
- Permissions.
---
Database Changes

Require:

- Migration.
- Rollback strategy.
- Data integrity verification.
---
UI Changes

Require:

- Main user flows tested.
- Mobile verification.
---
Step 6

Human Review

Even in AI-first development:

Human review remains necessary.

Review:

- Business correctness.
- User experience.
- Risk.
---
Step 7

Staging Deployment

Deploy to staging.

Verify:

- Application works.
- Database migrations succeed.
- Main workflows function.
---
Step 8

Production Release

Release only when:

- Tests pass.
- Review complete.
- Risks understood.
---
Deployment Strategy

Prefer:

Small frequent releases.

Avoid:

Large risky releases.
---
Release Types
---
Patch Release

Small fixes.

Examples:

- Bug corrections.
- Minor improvements.
---
Feature Release

New functionality.

Requires:

- Documentation.
- Testing.
---
Major Release

Large product changes.

Requires:

- Planning.
- Migration strategy.
---
Database Migration Rules

Database changes are sensitive.

Never:

- Modify production manually.
- Delete data without backup.
- Change schemas without migration.
---
Migration Checklist

Before applying:

[ ] Migration tested locally

[ ] Backup available

[ ] Rollback considered

[ ] Data impact understood

---
Rollback Strategy

Every release should answer:

"If this fails, how do we recover?"

Possible actions:

- Revert deployment.
- Disable feature.
- Restore data.
- Fix forward.
---
Feature Flags

Use feature flags for:

- Risky features.
- Gradual rollouts.
- Experiments.
---
Monitoring After Release

After deployment monitor:

- Errors.
- Performance.
- User behavior.
- Support requests.
---
Release Automation

Possible tools:
---
Version Control

Git.
---
CI/CD

Automated pipelines.

Examples:

- Tests.
- Build.
- Deployment.
---
Notifications

Automatic communication:

- Release completed.
- Deployment failed.
- Errors detected.
---
AI Development Workflow

AI agents should follow:

Understand

↓

Plan

↓

Implement

↓

Review

↓

Test

↓

Document

---
AI Coding Rules

AI must never:

- Modify critical files without context.
- Remove tests to make builds pass.
- Ignore business rules.
- Change architecture accidentally.
---
Code Review Checklist

Before merge:

Correctness

Does it solve the intended problem?
---
Security

Could it expose data?
---
Architecture

Does it belong in the correct layer?
---
Maintainability

Can another developer understand it?
---
Business Rules

Does it respect domain constraints?
---
Documentation Updates

When changing behavior, update:

Relevant:

- DOMAIN documents.
- Architecture documents.
- Product documentation.
---
Release Communication

Every important release should document:

- What changed.
- Why.
- User impact.
- Known limitations.
---
Incident Process

If production breaks:

Detect

↓

Contain

↓

Fix

↓

Analyze

↓

Prevent recurrence

---
Metrics

Track:
---
Deployment Frequency

How often releases happen.
---
Failed Release Rate

Percentage of releases causing problems.
---
Recovery Time

How quickly problems are resolved.
---
User Impact

How many users are affected.
---
Final Principle

Speed without quality destroys trust.

Quality without speed destroys opportunity.

The release process exists to achieve both.