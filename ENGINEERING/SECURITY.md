<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

SECURITY.md

Security Architecture

Version: 1.0
---
Purpose

This document defines the security principles, requirements and practices of the platform.

Security is a fundamental product requirement.

[List here what categories of sensitive data the platform will actually handle — e.g. personal information, financial data, health data — once known.]

Security failures can damage user trust and business viability.
---
Security Philosophy

The security strategy follows:

Prevent.

Detect.

Audit.

Recover.

The system must:

- Prevent unauthorized access.
- Detect suspicious behavior.
- Keep historical records.
- Allow recovery from failures.
---
Security Principles
---
Principle 1

Never trust the client

The frontend is not a security boundary.

The backend and database must enforce:

- Permissions.
- Validation.
- Data access.
---
Principle 2

Least privilege

Users should only access what they need.
---
Principle 3

Defense in depth

Security must exist in multiple layers:

Frontend

↓

API/Application

↓

Database

↓

Infrastructure

---
Authentication

Purpose

Verify user identity.
---
Requirements

Authentication must support:

- Secure login.
- Session management.
- Password recovery.
- Account protection.
---
Authentication Rules

Never:

- Store passwords manually.
- Implement custom cryptography.
- Store sensitive credentials in frontend code.
---
Authorization

Authentication answers:

"Who are you?"

Authorization answers:

"What are you allowed to do?"
---
Authorization Model

[Describe the roles/permissions model — see ENGINEERING/ARCHITECTURE.md Authorization Model and DOMAIN/DOMAIN_MODEL.md for the entities involved.]
---
Multi-Tenant Security

[If the product is multi-tenant, per ENGINEERING/ARCHITECTURE.md: a user must never access another tenant's data. State the enforcement layers — database, backend, frontend — and the mandatory technique (e.g. RLS) from ENGINEERING/DATABASE.md.]
---
Personal Data Protection

[List the categories of personal data the platform will actually store, once known.]
---
Data Minimization

Only store data required for product functionality.

Avoid collecting:

- Unnecessary personal information.
- Sensitive information without reason.
---
Data Classification

[Classify the product's data once known — e.g. public, internal, personal, sensitive business data — with an example of each.]
---
Personal Data Rules

The system must support:

- Access control.
- Modification.
- Deletion requests.
- Data export when required.
---
GDPR Considerations

The product must consider European data protection requirements, if it serves EU users.

Important concepts:

- Data minimization.
- User consent.
- Right of access.
- Right of deletion.
- Data protection.
---
Important Note

Legal compliance requires professional review before commercial scale.

AI assistance is useful for preparation but does not replace legal advice.
---
Sensitive Operations

[If the product handles money or other high-stakes operations, state the extra rules here: permission-controlled, history maintained, auditable, no silent modifications.]
---
Audit System

Critical actions should create audit records.

[List the action types worth auditing once the domain is defined — e.g. ENTITY_CREATED, ENTITY_UPDATED, PAYMENT_CONFIRMED.]
---
Logging

Logs should help diagnose problems.

Do not log:

- Passwords.
- Tokens.
- Sensitive personal information.
- Payment credentials.
---
Error Handling

Errors must not reveal sensitive information.

Bad:

Database user password incorrect

Good:

Unable to complete operation

---
API Security

All APIs must validate:

- Authentication.
- Authorization.
- Input data.
- Tenant/resource ownership, if applicable.
---
Input Validation

Never trust user input.

Validate:

- Required fields.
- Data formats.
- Business constraints.
---
File Upload Security

If file uploads are added:

Validate:

- File type.
- File size.
- Storage permissions.

Never execute uploaded files.
---
Dependency Security

Before adding dependencies:

Check:

- Maintenance.
- Security history.
- Community adoption.
---
Secrets Management

Never store:

- API keys.
- Database passwords.
- Private tokens.

Inside:

- Source code.
- Public repositories.
- Frontend bundles.
---
Environment Separation

Different environments:

Development

Staging

Production

must have separated:

- Databases.
- Credentials.
- Secrets.
---
Backup Strategy

Production data must have:

- Automated backups.
- Recovery process.
- Backup verification.
---
Incident Response

If a security incident occurs:

Process:

Detect

↓

Contain

↓

Investigate

↓

Fix

↓

Document

↓

Improve

---
Security Testing

Important tests:

Authentication

Verify:

- Login.
- Session handling.
---
Authorization

Verify:

- Role restrictions.
- Tenant isolation, if applicable.
---
Data Protection

Verify:

- Personal data access.
- Sensitive business data protection.
---
AI Agent Security Rules

AI agents must never:

- Disable security checks for convenience.
- Expose secrets.
- Bypass authorization.
- Remove auditability.

Before changing security-sensitive code:

Explain:

- Risk.
- Reason.
- Impact.
---
Security Review Checklist

Before releasing a feature:

- Does it access personal data?
- Does it respect tenant/resource boundaries?
- Are permissions correct?
- Is historical information protected?
- Are errors safe?
- Are secrets protected?
---
Final Principle

Security is not a feature.

Security is the foundation that allows users to trust the product.
