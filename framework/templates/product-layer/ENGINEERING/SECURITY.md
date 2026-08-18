<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

SECURITY.md

Security Architecture

Version: 1.3
---
Purpose

This document defines the security principles, requirements and practices of the platform.

Security is a fundamental product requirement.

[ANSWER: What sensitive material this product actually handles: personal data, payment data, customer content, credentials, or none of them. Be specific — every rule below is calibrated to this answer, and "none" is a valid answer that must still be stated.]

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

[ANSWER: Who may do what, and where that check runs. Must agree with company-os/ENGINEERING/ARCHITECTURE.md → Authorization Model. If this product has no accounts and no permissions, say so and give the reason — but do not write "not applicable" over a product that has roles, because the security agent reads this section and will skip what it says is absent.]
---
Multi-Tenant Security

[ANSWER: How one tenant is prevented from reaching another tenant's data, and where that is enforced. If the product is single-tenant, say so and point at company-os/ENGINEERING/ARCHITECTURE.md → Tenancy Model.]
---
Personal Data Protection

[ANSWER: Which personal data this product stores, where, and under what legal basis. If none, state that — and state that any future collection must be scoped here before it starts, so the absence is a rule rather than a coincidence.]
---
Data Minimization

Only store data required for product functionality.

Avoid collecting:

- Unnecessary personal information.
- Sensitive information without reason.
---
Data Classification

[ANSWER: Classify this product's data: what is public, what is internal, what is customer-private, what is regulated. For each class, state what may never happen to it — transmitted where, logged where, cached where.]
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

[ANSWER: The operations this product performs that are dangerous if they go wrong — the ones worth naming individually rather than covering with a general rule. For each, state the constraint it must never violate, and reference the RULE-ID in company-os/DOMAIN/BUSINESS_RULES.md that it traces to.]

[ANSWER: Examples of the shape, not the content: writing to something the product does not own, moving money, deleting history, granting access. Write this product's own — a product whose most dangerous operation is a database write has a different list from one that installs files on a customer's machine.]
---
Audit System

[ANSWER: What records who did what, where those records live, and how long they are kept. If nothing records it, say so and name what plays that role instead — a version-control history, a provider's own logs, or nothing at all. "Nothing, and here is the consequence" is a valid answer; silence is not.]
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
Supply-Chain Security

[ANSWER: How this product's dependencies and its own published artifacts are kept trustworthy: version pinning, install-script policy, where releases are published from, and whether provenance is attached. Weight this section by how the product is distributed — code that runs on a customer's machine carries more supply-chain risk than an internal service.]
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
