<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

# DECISIONS.md

Company Decision Log

Version: 2.1

Last updated: —

---

# Document Layers

Most decisions in this log are product-specific and must be removed when starting a new product.

Three are framework-level and should be carried over:

- DECISION-001 — AI-Native Company Operating Model.
- DECISION-009 — Documentation As Company Memory.
- DECISION-010 — AI Tooling Strategy.

Everything else is product-specific and should be recorded as real decisions get made. See AI/commands/init-project.md.

---

# Purpose

This document records important decisions that shape the company.

The objective is to preserve:

- Context.
- Reasoning.
- Alternatives considered.
- Trade-offs.
- Consequences.

Future decisions should consider previous decisions.

A decision without context is just a preference.

A documented decision becomes organizational knowledge.

---

# Decision Format

Every decision should follow this structure:

---

## DECISION-ID

## Title

Date:

YYYY-MM-DD

Status:

Proposed | Accepted | Deprecated | Superseded | Rejected

Owner:

Person or role responsible for the decision.

Review Date:

When this decision should be reconsidered.

---

## Context

Why this decision was necessary.

What problem or opportunity existed.

---

## Options Considered

Alternative approaches evaluated.

---

## Decision

The chosen approach.

---

## Reason

Why this option was selected.

---

## Consequences

Positive:

Expected benefits.

Negative:

Expected trade-offs or risks.

---

# Decision Status

## Proposed

Under evaluation.

Not yet adopted.

---

## Accepted

Currently active.

---

## Deprecated

No longer recommended.

---

## Superseded

Replaced by another decision.

---

## Rejected

Considered but intentionally discarded.

---

# Strategic Decisions

Company-level decisions that affect the direction of the company.

[No product-specific strategic decisions recorded yet. Add them here as they are made — do not invent decisions to fill this section.]

---

# Product Decisions

Product decisions that affect what the company builds.

[No product-specific product decisions recorded yet.]

---

# Operating Decisions

Decisions about how the company operates.

---

# DECISION-001

# AI-Native Company Operating Model

Date:

2026-01-01

Status:

Accepted

Owner:

Founder

Review Date:

2027-01-01

---

## Context

The company starts with a very small human team.

Building a traditional software company would require significant investment in:

- Engineering.
- Product.
- Design.
- Operations.

The company wants to maximize execution speed while maintaining quality.

---

## Options Considered

### Option A

Build a traditional team immediately.

Advantages:

- More human expertise.
- Established processes.

Disadvantages:

- Higher cost.
- Slower initial execution.
- Larger operational requirements.

---

### Option B

Operate with an AI-native model.

Advantages:

- Lower initial cost.
- Faster experimentation.
- High execution leverage.
- Smaller initial team.

Disadvantages:

- Requires stronger review processes.
- Requires disciplined documentation.
- Requires human strategic ownership.

---

## Decision

Operate using an AI-native company model.

AI agents support:

- Software development.
- Product analysis.
- Documentation.
- Research.
- Marketing.
- Internal operations.

Strategic decisions remain human-controlled.

---

## Reason

The initial company stage requires:

- Speed.
- Validation.
- Low operational cost.
- Maximum learning.

AI provides leverage without replacing business judgment.

---

## Consequences

Positive:

- Faster iteration.
- Lower initial costs.
- Greater execution capacity.

Negative:

- Requires strong quality controls.
- Requires structured knowledge management.

---

# DECISION-009

# Documentation As Company Memory

Date:

2026-01-01

Status:

Accepted

Owner:

Founder

Review Date:

2027-01-01

---

## Context

AI agents require structured knowledge to operate consistently.

Company knowledge cannot exist only in conversations.

---

## Decision

Maintain a structured documentation system:

- COMPANY_OS.md.
- DECISIONS.md.
- PRODUCT/.
- DOMAIN/.
- ENGINEERING/.
- AI/.

---

## Reason

Documentation becomes the long-term memory of the company.

---

## Consequences

Positive:

- Better AI collaboration.
- Easier onboarding.
- More consistent decisions.

Negative:

- Requires maintenance discipline.

---

# DECISION-010

# AI Tooling Strategy: Claude Code Primary, Tool-Agnostic AI-OS

Date:

2026-07-30

Status:

Accepted

Owner:

Founder

Review Date:

2027-01-01

---

## Context

The company operates using an AI-native model (DECISION-001). Day-to-day development happens through Claude Code (VS Code extension, Claude Pro subscription), which automatically loads the root CLAUDE.md file.

The company also needs the operating model to work through other AI tooling, including Maker, without rebuilding it per tool.

---

## Options Considered

### Option A

Write AI instructions using Claude Code-specific mechanisms (Skills, hooks, tool syntax) throughout the AI-OS.

Advantages:

- Deeper integration with Claude Code.

Disadvantages:

- Locks the AI-OS to one tool.
- Breaks if followed from Maker or any future tool.

---

### Option B

Keep the AI-OS (AI/SYSTEM.md, agents, workflows, policies, commands, templates, memory) as plain, tool-agnostic markdown. Keep Claude Code-specific configuration isolated to the root CLAUDE.md file only.

Advantages:

- AI-OS remains portable across tools.
- Claude Code still gets automatic loading via CLAUDE.md without polluting the framework.

Disadvantages:

- Requires discipline to avoid leaking tool-specific syntax into AI/.

---

## Decision

Adopt Option B.

Claude Code (VS Code extension, Claude Pro subscription) is the primary development interface and loads root CLAUDE.md automatically.

The AI-OS under AI/ must remain tool-agnostic plain markdown, readable and followable by any AI tool, including Maker. A tool other than Claude Code should manually load AI/SYSTEM.md as its equivalent entry point.

---

## Reason

The operating model (DECISION-001) depends on AI/SYSTEM.md being reusable. Coupling it to one tool's syntax would contradict that decision and create migration risk.

---

## Consequences

Positive:

- No vendor lock-in on the operating model.
- New tools can be onboarded by pointing them at AI/SYSTEM.md.

Negative:

- Tool-specific optimizations (e.g. Claude Code Skills) must live outside AI/, which may duplicate some setup per tool.

---

# Future Decisions

Future important decisions should be added here.

Examples:

- Technology choices.
- Pricing changes.
- Market expansion.
- Architecture changes.
- Business model changes.
- Partnership decisions.

---

# Final Principle

A decision without context is a preference.

A documented decision becomes company knowledge.
