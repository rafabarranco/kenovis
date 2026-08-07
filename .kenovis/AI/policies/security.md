# Security Policy

Version: 2.0

---

# Purpose

This document defines the mandatory security standards that every AI agent must follow.

Security is not a feature.

Security is a system property.

Every architectural, product, and engineering decision must consider its security implications.

---

# Core Philosophy

Assume every system will eventually be attacked.

The objective is not to eliminate all risk.

The objective is to reduce risk to an acceptable level while maintaining usability.

Security must be proactive, not reactive.

---

# Security Principles

Always prioritize:

- Confidentiality
- Integrity
- Availability
- Auditability
- Least Privilege
- Defense in Depth

No feature is exempt.

---

# Secure by Design

Security begins during design.

Before implementing any feature ask:

- What assets are being protected?
- Who should access them?
- What could go wrong?
- How can abuse be prevented?
- How can misuse be detected?

---

# Authentication

Authentication answers:

Who is making this request?

Authentication must always be:

- Explicit
- Verified
- Centralized
- Consistent

Never trust client-side identity.

---

# Authorization

Authorization answers:

What is this identity allowed to do?

Every protected operation must verify authorization.

Never rely on:

- Hidden UI
- Disabled buttons
- Client-side checks

Authorization belongs on the server.

---

# Principle of Least Privilege

Users, services and integrations should receive only the permissions they need.

Avoid:

- Administrator by default
- Wildcard permissions
- Shared credentials

Permissions should be as narrow as practical.

---

# Input Validation

Every external input is untrusted.

Validate:

- Type
- Format
- Length
- Range
- Allowed values
- Business rules

Reject invalid input early.

---

# Output Encoding

Any data rendered to users must be safely encoded for its destination.

Protect against:

- XSS
- HTML injection
- Script injection

Never render untrusted HTML unless explicitly sanitized.

---

# Secrets

Secrets include:

- API keys
- Tokens
- Passwords
- Certificates
- Private keys

Never:

- Commit secrets
- Log secrets
- Hardcode secrets
- Share secrets in documentation

Use secure secret management.

---

# Passwords

Passwords must never be stored in plaintext.

Use strong password hashing algorithms.

Never implement custom cryptography.

---

# Encryption

Encrypt sensitive information:

- In transit
- At rest when appropriate

Use well-established algorithms and libraries.

Avoid creating proprietary encryption solutions.

---

# Session Management

Sessions should:

- Expire appropriately
- Be invalidated on logout
- Rotate when privilege changes
- Be protected against theft

---

# Multi-Tenant Isolation

Tenant isolation is mandatory.

Every request must verify tenant ownership.

Never allow data from one tenant to be visible to another.

Isolation failures are critical security issues.

---

# APIs

APIs should:

- Authenticate requests
- Authorize operations
- Validate input
- Limit rate
- Return safe errors

Never expose internal implementation details.

---

# Error Handling

Error messages should help legitimate users.

They should not help attackers.

Avoid exposing:

- Stack traces
- SQL queries
- Internal file paths
- Secrets
- Infrastructure details

---

# Logging

Security-relevant events should be logged.

Examples:

- Login
- Logout
- Permission changes
- Failed authentication
- Sensitive operations

Never log confidential information.

---

# Dependencies

Every dependency introduces risk.

Before adding one evaluate:

- Maintenance
- Security history
- Community adoption
- License
- Supply chain risk

Remove unused dependencies.

---

# File Uploads

Treat uploaded files as untrusted.

Validate:

- Type
- Size
- Extension
- Content when appropriate

Never execute uploaded files.

---

# Rate Limiting

Protect endpoints vulnerable to abuse.

Examples:

- Login
- Password reset
- Public APIs
- Expensive operations

---

# Auditability

Critical business actions should be traceable.

Security investigations require evidence.

Prefer immutable audit logs for sensitive operations.

---

# Incident Response

When a security issue is discovered:

1. Identify
2. Contain
3. Mitigate
4. Recover
5. Document
6. Prevent recurrence

Every incident should improve the system.

---

# AI Responsibilities

AI must:

- Follow secure defaults
- Prefer proven security practices
- Avoid unnecessary attack surface
- Never bypass security for convenience
- Escalate uncertainty

When security conflicts with convenience, security wins unless a documented business decision states otherwise.

---

# Security Review Checklist

Before approving work:

✓ Authentication verified

✓ Authorization enforced

✓ Input validated

✓ Output encoded

✓ Secrets protected

✓ Sensitive data minimized

✓ Logs are safe

✓ Dependencies reviewed

✓ Tenant isolation preserved

✓ Security implications documented

---

# Decision Framework

When multiple implementations are possible:

1. Prefer the safest design.
2. Prefer secure defaults.
3. Minimize attack surface.
4. Reduce privileges.
5. Prefer proven solutions over custom implementations.
6. Document significant risks and trade-offs.

---

# Forbidden Behaviours

Never:

- Trust client input.
- Store secrets in source code.
- Expose sensitive errors.
- Skip authorization.
- Ignore tenant isolation.
- Invent cryptographic algorithms.
- Disable security controls for convenience.

---

# Final Principle

Security is not measured by the absence of attacks.

It is measured by the system's ability to resist, detect, and recover from them.