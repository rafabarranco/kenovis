## What changed

## Which layer

- [ ] Framework (`AI/`, `CLAUDE.md`, `README.md`, `CODE/README.md`)
- [ ] Product layer example/scaffolding (rare — see [CONTRIBUTING.md](../CONTRIBUTING.md), most PRs should not touch this)

## Why

Explain the reasoning, not just the change — this framework runs on documented decisions.

## Checklist

- [ ] Stays tool-agnostic under `AI/` (no Claude-Code-specific syntax outside `CLAUDE.md`) — see [DECISION-010](../DECISIONS.md)
- [ ] Stays domain-agnostic (no assumptions about a specific vertical, stack, or tenancy model)
- [ ] `PROJECT-SPECIFIC` markers untouched or intact where applicable
- [ ] No secrets, no real business/customer data, anywhere including examples
- [ ] Links checked (relative paths resolve)
- [ ] `CHANGELOG.md` updated under `[Unreleased]`, or `[skip changelog]` in this PR's title/description (typo/wording-only) — see [CONTRIBUTING.md](../CONTRIBUTING.md) → "Framework Definition of Done"
- [ ] `DECISIONS.md` entry added if this changes an agent's responsibilities, a workflow's phases, or a policy's mechanics
