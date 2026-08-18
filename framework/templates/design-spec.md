# Design Spec

Version: 1.1

This file is a form, not a destination. Fill it in where the workflow that sent you here says to record the artifact — never write into this file, and never write a produced artifact anywhere under `.kenovis/`, which `kenovis sync` replaces wholesale. See company-os/DECISIONS.md DECISION-024.

---

# Feature Name

```
[Feature name]
```

---

# Status

Options:

```
Draft
In Review
Approved
In Development
Validated
```

Current status:

```
[Status]
```

---

# User Problem

Describe the problem being solved.

Include:

- Who experiences the problem.
- Current workflow.
- What causes frustration.
- What success looks like.

---

# User Flow

Describe the primary path.

Format:

```
Entry point
↓
User intention
↓
Actions
↓
Decisions
↓
Success state
```

Include secondary paths and exit points where relevant.

---

# Interface States

Document each state that applies:

## Default

```
[Description]
```

## Loading

```
[Description]
```

## Empty

```
[Description]
```

## Error

```
[Description]
```

## Success

```
[Description]
```

---

# Component Behaviour

For each new or modified component:

- States.
- Variations.
- Responsive behaviour.
- Edge cases.

---

# Accessibility Notes

Confirm:

- Keyboard navigation.
- Screen reader behaviour.
- Color contrast.
- Target compliance level (WCAG 2.1 AA minimum).

---

# Design Decisions

For decisions with meaningful trade-offs:

## Decision

```
[What was decided]
```

Why:

```
[Reason]
```

Alternative considered:

```
[Alternative and why it was not chosen]
```

---

# Consistency Check

- [ ] Uses existing design system components/patterns where possible.
- [ ] New patterns justified (no existing pattern fits).
- [ ] Terminology matches company-os/DOMAIN/ glossary.

---

# Open Questions

List unresolved items that block implementation:

- 

---

# Related Documentation

References:

```
company-os/PRODUCT/

company-os/DOMAIN/
```

and the feature plan produced for this feature, shaped by `.kenovis/AI/templates/feature-plan.md`.
