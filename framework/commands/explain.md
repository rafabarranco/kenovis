# Explain Command

Version: 2.1

---

# Purpose

Explain any part of the product, architecture, codebase, or engineering decisions.

This command transforms existing project knowledge into understandable explanations.

The objective is learning and alignment.

---

# Trigger

Execute when:

- Understanding existing code.
- Learning a system area.
- Onboarding a new engineer.
- Explaining technical decisions.
- Reviewing unfamiliar architecture.

Command:

```
/explain <topic>
```

Examples:

```
/explain Authentication flow

/explain <entity> domain model

/explain Why this architecture was chosen
```

---

# Core Principle

Understanding comes before modification.

Never change a system that you do not understand.

---

# Explanation Workflow

Follow this sequence.

---

# Step 1 - Bootstrap Context

Execute:

```
.kenovis/AI/commands/bootstrap.md
```

Load:

- Product context.
- Domain knowledge.
- Architecture.
- Existing conventions.

---

# Step 2 - Identify Explanation Type

Classify the topic.

---

## Product Explanation

Activate:

```
product-manager
```

Explain:

- User problem.
- Business value.
- Product goals.
- Success criteria.

---

## Domain Explanation

Activate:

```
product-manager

domain understanding
```

Explain:

- Entities.
- Relationships.
- Business rules.
- Terminology.

---

## Architecture Explanation

Activate:

```
cto
```

Explain:

- System structure.
- Responsibilities.
- Trade-offs.
- Decisions.

---

## Code Explanation

Activate:

```
reviewer

frontend/backend
```

Explain:

- Flow.
- Responsibilities.
- Dependencies.
- Important details.

---

# Step 3 - Gather Context

Review:

- Documentation.
- Source code.
- Architecture decisions.
- Related modules.

Never explain based on assumptions.

---

# Step 4 - Structure Explanation

Use this structure:

---

# Overview

What is this?

---

# Purpose

Why does it exist?

---

# How It Works

Step-by-step flow.

---

# Important Concepts

Key ideas.

---

# Design Decisions

Why it was built this way.

---

# Examples

Concrete scenarios.

---

# Common Mistakes

Things to avoid.

---

# Future Considerations

Possible evolution.

---

# Step 5 - Adapt Depth

Adjust explanation level depending on audience.

Possible levels:

---

## Beginner

Focus on concepts.

Avoid unnecessary technical detail.

---

## Intermediate

Explain implementation and reasoning.

---

## Advanced

Explain architecture, trade-offs, and limitations.

---

## Expert

Discuss alternatives and deeper implications.

---

# Step 6 - Verify Understanding

When explaining complex systems:

Ask:

"Would changing this part affect other areas?"

Highlight dependencies.

---

# Documentation Opportunity

An explanation that reveals missing knowledge has found something. A finding gets a disposition, not a recommendation.

Recommending is prose, and **being described in prose is not a disposition** — see `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected", which is in force in this session whether or not this command names it. Write the gap into the Product layer before the session ends, in the file its kind belongs to:

```
company-os/PRODUCT/ROADMAP.md   - the work the gap implies: a scheduled item, or a row in the findings queue
company-os/PRODUCT/             - product knowledge the explanation had to reconstruct
company-os/DOMAIN/              - a business concept, rule or term that was missing
company-os/ENGINEERING/         - an architectural consequence
company-os/AI/memory/learnings.md - a reusable lesson
```

This command previously said *"Recommend creating documentation"*, and named `docs/` — a destination that exists in no Installation of this framework. Both are recorded as fixed in `company-os/PRODUCT/ROADMAP.md` OF-48. The reason the wording mattered more here than elsewhere: `/explain` is one of the three commands that actually run (`company-os/PRODUCT/OPERATING_MODEL.md` → Addendum A §3), its entire output is knowledge, and it is the command most likely to be standing in front of a gap at the moment it tells the session to merely recommend one.

---

# AI Responsibilities

AI must:

- Explain truthfully.
- Separate facts from assumptions.
- Mention uncertainty.
- Preserve existing decisions.

AI must not:

- Invent architecture.
- Simplify away important risks.
- Explain outdated behaviour as current.

---

# Forbidden Behaviours

Never:

- Explain without context.
- Hide complexity.
- Present assumptions as facts.
- Ignore historical decisions.

---

# Decision Framework

When explaining:

1. Start with purpose.
2. Explain concepts before implementation.
3. Explain why, not only how.
4. Include trade-offs.
5. Connect details with the bigger system.

---

# Final Principle

A system that cannot be explained cannot be safely evolved.