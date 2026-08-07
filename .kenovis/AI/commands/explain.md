# Explain Command

Version: 2.0

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

If an explanation reveals missing knowledge:

Recommend creating documentation in:

```
PRODUCT/

DOMAIN/

ENGINEERING/

docs/
```

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