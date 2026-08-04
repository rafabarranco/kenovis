# Documentation Policy

Version: 2.0

---

# Purpose

This document defines how knowledge is documented inside this repository.

Documentation is a first-class artifact.

If knowledge exists only inside conversations or code, it is considered lost.

Every important decision should survive the people—and the AI models—that created it.

---

# Core Philosophy

Code explains **how**.

Documentation explains **why**.

Future engineers should not need to reverse engineer decisions.

---

# Documentation Principles

Documentation must be:

- Accurate
- Concise
- Actionable
- Versionable
- Easy to maintain

Documentation that is no longer true is worse than no documentation.

---

# Single Source of Truth

Every piece of knowledge should have exactly one authoritative location.

Avoid duplicated documentation.

Example:

Business rules belong in:

DOMAIN/

Architecture belongs in:

ENGINEERING/

Product strategy belongs in:

PRODUCT/

AI behaviour belongs in:

AI/

---

# Documentation Hierarchy

The repository should be understood from the top down.

Company

↓

Product

↓

Domain

↓

Engineering

↓

Implementation

Do not document implementation details in business documents.

---

# When Documentation Must Be Updated

Documentation is mandatory when changing:

- Architecture
- Business rules
- Product behaviour
- Security model
- API contracts
- Database schema
- Deployment process
- Development workflow

If the behaviour changed, the documentation probably should too.

---

# Decision Documentation

Every important decision should answer:

Context

↓

Problem

↓

Options

↓

Decision

↓

Consequences

↓

Date

↓

Owner

Prefer documenting decisions immediately.

Never rely on memory.

---

# Architecture Documentation

Document:

- Layer responsibilities
- Module boundaries
- Technology choices
- Communication patterns
- Trade-offs

Do not document implementation details.

Document reasoning.

---

# Domain Documentation

Document:

- Business entities
- Relationships
- Business rules
- Invariants
- Terminology

The domain should be understandable without reading code.

---

# Product Documentation

Document:

- Vision
- Roadmap
- Features
- User value
- Success metrics

Product documentation should explain:

Why does this feature exist?

---

# API Documentation

Every public API should describe:

Purpose.

Authentication.

Inputs.

Outputs.

Errors.

Examples.

Version.

Avoid undocumented endpoints.

---

# Database Documentation

Document:

- Entity purpose
- Relationships
- Constraints
- Migration strategy
- Important indexes

Future schema changes should be understandable.

---

# AI Documentation

Document:

- Agent responsibilities
- Policies
- Workflows
- Prompts
- Memory

AI behaviour should be deterministic and reproducible.

---

# README

Every repository should contain a README that answers:

What is this?

Why does it exist?

How do I start?

Where can I learn more?

Do not assume prior knowledge.

---

# Change Log

Important releases should document:

- New features
- Breaking changes
- Bug fixes
- Migration requirements

Users should know what changed.

---

# Examples

Prefer examples over explanations.

Good documentation demonstrates.

Do not describe complex workflows without examples.

---

# Visual Documentation

Use diagrams when they simplify understanding.

Examples:

Architecture.

Entity relationships.

Event flows.

Deployment.

Do not create diagrams that become harder to maintain than the code.

---

# Documentation Style

Write:

Short sentences.

Clear language.

Business terminology.

Avoid unnecessary jargon.

Avoid marketing language.

Documentation is for understanding.

Not promotion.

---

# AI Responsibilities

Whenever AI changes:

Architecture

↓

Update ENGINEERING/

Business Rules

↓

Update DOMAIN/

Roadmap

↓

Update PRODUCT/

Major Decision

↓

Update DECISIONS.md

Never leave documentation outdated after implementation.

---

# README Sync — In-Task, Not Post-Hoc

Waiting for review to catch outdated documentation makes it optional in practice — reviews get rushed, sync gets deferred, and it never happens.

Before reporting any code task complete:

1. Ask whether the change affects anything the README documents: setup, architecture, routing, folder structure, scripts, conventions, environment variables.
2. If yes, update the README in the same task, not a follow-up.
3. If no, state that explicitly ("No README impact") instead of silently skipping the question.

This applies to the README of whichever unit changed (see `CODE/README.md` for the repository's topology), not only the repository root.

---

# Review Checklist

Before approving work:

✓ Documentation matches implementation.

✓ Decisions are recorded.

✓ Examples remain correct.

✓ Broken links are removed.

✓ New concepts are documented.

✓ Terminology remains consistent.

---

# Forbidden Behaviours

Never:

- Document guesses.
- Duplicate documentation.
- Leave obsolete information.
- Store architecture decisions only in chat.
- Mix implementation details into business documents.
- Skip documentation for important changes.

---

# Final Principle

The codebase should be understandable without asking its original authors.

Documentation is how knowledge survives.