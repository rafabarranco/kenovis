# Documentation Policy

Version: 2.5

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

.kenovis/AI/

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

# Closed Work Is Archived, Not Kept Inline

A document that records work — a roadmap, a decision log, a learnings file — is append-only in practice: entries are added and never removed, because the reasoning trail is the point.

That is correct, and it has a cost nobody pays until it is large: finished work loads on every session at the same price as work that is still pending. In this framework's own repository the completed items were 90% of the roadmap and 100% of them were read at every bootstrap.

So a document that accumulates closed entries splits:

- Closed entries move to a sibling archive — `PRODUCT/ROADMAP-ARCHIVE.md` for the roadmap — **verbatim**. Nothing is summarised away; the archive exists to preserve the trail, not to compress it.
- The active document keeps one line per closed entry and a pointer to the archive.
- The archive is read on demand. It is never on the session-initialization path.
- An entry is archived only when it is genuinely closed. An open finding it raised moves to the findings queue first — see the section below. Archiving a document that still holds the only copy of an unresolved finding is how a visible backlog becomes an invisible one.

Create the archive when the first entry closes, not in advance. An empty archive is noise.

---

# A Finding Is Fixed, Scheduled, Or Rejected

A round finds more than it fixes. That is healthy — a round that only ever found what it had budgeted for would not be looking.

What is not healthy is the third outcome: a finding described in the narrative of the item that was open at the time, with no id, no priority and no owner. It reads as handled. It is not. Once that item closes, and certainly once it is archived, the finding exists only in prose that nothing reads to decide what to do next.

So every finding a round does not fix gets exactly one disposition, stated where the round's work is recorded:

**Fixed** — done in this round. Say so, with the evidence.

**Scheduled** — it becomes an entry with an id in `PRODUCT/ROADMAP.md`: the finding, its source, and enough of its shape to be picked up by someone with less context than the person who wrote it. A scheduled item and a queued finding are different things — a scheduled item is dimensioned work, a queued finding is a candidate that is not dimensioned yet — and both live in that document.

**Rejected** — decided against, with the reason, recorded so it is not proposed again. This is a first-class outcome, not a failure. Most findings should not become work.

**Being described in prose is not a disposition.**

Two rules that follow from this, because both failure modes have already happened:

- A deferred improvement is a decision, so its reasoning goes to `DECISIONS.md` — and its *work* still needs a disposition. `DECISIONS.md` records why something was not done; it is not a queue, and nothing reads it to choose the next objective.
- A `Future action:` in `AI/memory/learnings.md` either cites the id of a queued or scheduled entry, or states that no work is implied. A future action naming work that exists nowhere else is the same defect wearing a different field name.

When a round closes, it must be able to name the disposition of every finding it raised.

---

# A Decision Is Not Recorded Until Its Index Line Exists

`DECISIONS.md` opens with a Decision Index: one line per decision, stating what that decision settled in enough substance that a reader can tell whether they need to open the body.

That index is what the session-initialization protocol reads (`.kenovis/AI/SYSTEM.md` → "Context Loading Rules"). A decision whose body exists with no index line is invisible to every session that follows it, which is worse than not recording it — the reasoning is on disk and nothing points at it.

So:

- Writing a decision body and writing its index line are one change, never two.
- The index line states what was settled. It never states why — that is the body's job, and it is why citing a decision requires opening it.
- Superseding a decision updates its index line to say so, and names the decision that replaced it. The body stays where it is.

---

# README Sync — In-Task, Not Post-Hoc

Waiting for review to catch outdated documentation makes it optional in practice — reviews get rushed, sync gets deferred, and it never happens.

Before reporting any code task complete:

1. Ask whether the change affects anything the README documents: setup, architecture, routing, folder structure, scripts, conventions, environment variables.
2. If yes, update the README in the same task, not a follow-up.
3. If no, state that explicitly ("No README impact") instead of silently skipping the question.

This applies to the README of whichever unit changed (see `ENGINEERING/ARCHITECTURE.md` for the repository's topology), not only the repository root.

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