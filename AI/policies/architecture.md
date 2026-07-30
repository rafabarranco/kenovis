# Architecture Policy

Version: 1.0

---

# Purpose

This document defines the architectural rules that every AI agent must follow.

These rules are mandatory.

They take precedence over implementation preferences.

No feature should violate these principles without an Architecture Decision Record (ADR).

---

# Core Principle

Architecture exists to make change easier.

Every architectural decision must reduce future complexity instead of increasing it.

When in doubt:

Prefer the simplest architecture capable of supporting future evolution.

---

# Golden Rules

Every change should improve at least one of:

- Simplicity
- Maintainability
- Readability
- Scalability
- Testability
- Security

No change should significantly worsen any of them.

---

# Separation of Concerns

Each layer has a single responsibility.

Never mix concerns.

Preferred architecture:

Presentation

↓

Application

↓

Domain

↓

Infrastructure

Each layer only communicates with the layer immediately below it.

---

# Domain First

Business rules belong to the Domain Layer.

Never implement business rules inside:

- UI components
- API controllers
- Database migrations
- Database triggers
- External integrations

The Domain Layer must represent business truth.

---

# Framework Independence

Frameworks are implementation details.

Business logic must never depend directly on:

- UI frameworks (React, Vue, SwiftUI, Jetpack Compose)
- HTTP and application frameworks (Express, NestJS, FastAPI, Rails, Spring)
- ORMs and query builders (Prisma, SQLAlchemy, Hibernate, ActiveRecord)
- Backend-as-a-service SDKs (Supabase, Firebase, Amplify)
- Any library that would have to be replaced to change vendor

The examples name a category, not a stack. Recognise the category in whatever stack ENGINEERING/ARCHITECTURE.md defines.

The business should survive replacing any of them.

---

# Dependency Direction

Dependencies always point inward.

Allowed:

Presentation

↓

Application

↓

Domain

↓

Infrastructure

Forbidden:

Domain importing UI.

Application importing view components.

Infrastructure defining business rules.

---

# Explicit Dependencies

Dependencies should always be visible.

Avoid:

- Global state without ownership.
- Hidden service locators.
- Implicit magic.
- Runtime dependency injection without necessity.

Explicit dependencies are easier to maintain.

---

# Single Responsibility

Every module should have one reason to change.

Every class should have one responsibility.

Every function should solve one problem.

If something changes for multiple unrelated reasons, split it.

---

# Simplicity First

Prefer:

Simple code.

Simple APIs.

Simple workflows.

Simple data structures.

Avoid clever implementations.

Code is read more often than it is written.

---

# Composition Over Inheritance

Prefer:

Small reusable components.

Composable services.

Pure functions.

Avoid deep inheritance hierarchies.

---

# Abstractions

Do not create abstractions before they are needed.

A good abstraction removes duplication.

A bad abstraction hides complexity.

Wait until patterns emerge.

---

# Reuse

Before creating new code ask:

Does something similar already exist?

Can it be generalized?

Can it become a reusable component?

Avoid copy-paste development.

---

# Domain Language

Use business language.

Names in code come from DOMAIN/DOMAIN_MODEL.md and AI/memory/glossary.md.

If a name does not exist in the domain vocabulary, either the name is wrong or the vocabulary is incomplete. Resolve that before writing the code.

Avoid technical names leaking into business concepts.

---

# Multi-Tenant Architecture

Applies only if multi-tenancy is a documented decision in DECISIONS.md.

When the product is multi-tenant:

Tenant isolation is mandatory.

Every business workflow must respect tenant boundaries.

Never assume global visibility.

---

# Error Boundaries

Errors belong to the appropriate layer.

Presentation

↓

User-friendly messages.

Application

↓

Workflow failures.

Domain

↓

Business rule violations.

Infrastructure

↓

Technical failures.

Never expose infrastructure errors directly to users.

---

# State Ownership

Every piece of state must have a clear owner.

Possible owners:

- Component
- Feature
- Application
- Backend
- Database

Avoid duplicated sources of truth.

---

# Data Flow

Prefer predictable, one-directional data flow.

Avoid hidden mutations.

Avoid shared mutable state.

Data should have a clear lifecycle.

---

# API Design

APIs should be:

Consistent.

Versionable.

Predictable.

Typed.

Well documented.

Avoid special cases whenever possible.

---

# Persistence

Persistence is an implementation detail.

Business logic should not know:

- SQL
- ORM specifics
- Database vendor
- Storage provider

Repositories exist to isolate persistence.

Use them when complexity justifies it.

---

# Security By Design

Security is part of architecture.

Not a later feature.

Every new capability should consider:

Authentication.

Authorization.

Input validation.

Data protection.

Auditability.

---

# Performance

Optimize based on evidence.

Never sacrifice readability for hypothetical performance.

Measure first.

Optimize second.

Document third.

---

# Scalability

Build for today's needs.

Design so tomorrow's growth is possible.

Do not build distributed systems for ten users.

Do not build monoliths that cannot evolve.

---

# Documentation

Every significant architectural decision must be documented.

Use:

ENGINEERING/

or

DECISIONS.md

Never keep architecture only in conversations.

---

# Refactoring

Continuous refactoring is encouraged.

Refactor when:

- Complexity increases.
- Duplication appears.
- Responsibilities blur.
- Naming becomes confusing.

Do not refactor without purpose.

---

# Technical Debt

Technical debt is acceptable only when:

- It is intentional.
- It is documented.
- It has a repayment strategy.

Hidden technical debt is forbidden.

---

# AI Responsibilities

AI must never:

- Introduce unnecessary architecture.
- Add dependencies without justification.
- Ignore existing conventions.
- Replace documented architecture with personal preference.

AI should improve consistency.

Never reduce it.

---

# Architecture Review Checklist

Before approving any change ask:

✓ Does this respect layer boundaries?

✓ Is business logic in the Domain?

✓ Is the solution simpler than alternatives?

✓ Is there unnecessary coupling?

✓ Is the design maintainable?

✓ Is the architecture documented if needed?

✓ Does this introduce technical debt?

✓ Can another engineer understand this quickly?

---

# Final Principle

Architecture is successful when future engineers can change the system safely.

Every decision should make tomorrow's work easier than today's.