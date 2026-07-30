# Kenovis

## What is this?

Kenovis is building the operating platform for organizations that manage people, groups, events, attendance and financial operations — starting with music bands as the initial market (see [COMPANY_OS.md](COMPANY_OS.md)).

This repository is currently the company's operating system: business context, product direction, domain rules, engineering standards, and the AI-OS framework that governs how AI agents and humans work here. Product implementation lives under [CODE/](CODE/), which is empty until Phase 0 of [PRODUCT/ROADMAP.md](PRODUCT/ROADMAP.md) begins.

## Why does it exist?

The company replaces fragmented operational workflows (WhatsApp, spreadsheets, manual attendance and payments) with a unified operational platform, starting narrow and expanding once product-market fit is reached. Full reasoning in [COMPANY_OS.md](COMPANY_OS.md).

## How do I start?

Read in this order, per the Session Initialization Protocol in [AI/SYSTEM.md](AI/SYSTEM.md):

1. [COMPANY_OS.md](COMPANY_OS.md) — vision, thesis, principles.
2. [DECISIONS.md](DECISIONS.md) — decisions made and why.
3. [AI/SYSTEM.md](AI/SYSTEM.md) — how AI agents operate here.

Then load context relevant to your task: [PRODUCT/](PRODUCT/), [DOMAIN/](DOMAIN/), [ENGINEERING/](ENGINEERING/), [AUTOMATIONS/](AUTOMATIONS/).

Do not modify code or documentation before understanding this context.

## Repository map

| Folder | Contains |
|---|---|
| [COMPANY_OS.md](COMPANY_OS.md) | Company vision, thesis, principles — highest-level context |
| [DECISIONS.md](DECISIONS.md) | Log of important company/product/engineering decisions |
| [PRODUCT/](PRODUCT/) | Features, roadmap, user research |
| [DOMAIN/](DOMAIN/) | Business entities and rules |
| [ENGINEERING/](ENGINEERING/) | Architecture, database and security design for this product |
| [AI/](AI/) | The AI-OS: agents, workflows, policies, commands, templates, memory |
| [AUTOMATIONS/](AUTOMATIONS/) | Onboarding, release and feedback automation processes |
| [CODE/](CODE/) | Actual product implementation (currently empty) |

## Tooling

Primary development interface: **Claude Code** (VS Code extension, Claude Pro subscription), which auto-loads the root [CLAUDE.md](CLAUDE.md).

The AI-OS under [AI/](AI/) is intentionally tool-agnostic plain markdown so it can also be followed by other AI tooling, including Maker. See [DECISION-010](DECISIONS.md) in DECISIONS.md.

## Where can I learn more?

Start with [COMPANY_OS.md](COMPANY_OS.md), then [DECISIONS.md](DECISIONS.md), then [AI/SYSTEM.md](AI/SYSTEM.md).
