# Adopt Project Command

Version: 1.0

---

# Purpose

Turn this repository's product layer into a real product's context when a real product already exists in `CODE/` — written before the Kenovis AI-OS was installed.

This is the brownfield counterpart to `AI/commands/init-project.md`.

The difference is not cosmetic:

`/init-project` assumes nothing exists. It asks the human, then decides, then writes.

`/adopt-project` assumes the code already decided most of this. It reads the code first, then asks the human only to confirm or correct what it found — not to decide from scratch.

Treating an adoption like an initialization destroys a working product: `/init-project` Step 10 empties `CODE/`, Step 6 asks the human to "decide" a stack that is already running, and Step 5 leaves research empty even when real, if undocumented, market context exists in the team's heads.

---

# Trigger

Execute when:

- `CODE/` already contains a real implementation that predates the Kenovis AI-OS.
- Product-layer files (`COMPANY_OS.md`, `DECISIONS.md`, `DOMAIN/`, `PRODUCT/`, `ENGINEERING/`) still carry example/placeholder content, but the actual product is running in `CODE/`.

Command:

```
/adopt-project
```

Do not execute on an empty repository or a fresh clone with no implementation — use `AI/commands/init-project.md` instead.

Do not execute on a repository whose product layer already describes the real product — that adoption already happened.

---

# Core Principle

Code that is already running already made decisions: a stack, a database engine, an auth mechanism, a set of domain entities.

The agent's job is to read those decisions accurately, not to invent, override, or re-decide them because the framework's default flow expects a blank slate.

A fact reconstructed from code and confirmed by a human is trustworthy. A fact invented to fill a template is not — it is worse than an empty document, because it looks authoritative.

---

# How To Recognise Adoption Is Needed

```
grep -rl "PROJECT-SPECIFIC" . --include="*.md" --include=".gitignore"
```

If that still lists the product-layer files (unrewritten) AND `CODE/` is non-empty, this is an adoption, not an initialization.

---

# Step 1 - Audit The Existing Code

Before asking the human anything, discover what the code already says.

If `graphify-out/graph.json` exists, prefer `graphify query` / `graphify explain` over raw reads (per DECISION-012). Otherwise grep/read directly.

Discover, and cite the file/line evidence for each:

- Language(s) and framework(s) in use.
- Database engine and schema (migrations, ORM models, schema files).
- Authentication approach, if any.
- Tenancy model, if any (single-tenant vs multi-tenant, and the tenant key name).
- Deployment target (CI/CD config, IaC, Dockerfiles).
- Real domain entities and their relationships (models, DTOs, schema tables).
- Real API surface / shipped user-facing capabilities (routes, controllers, UI screens).

Tag every finding with a confidence level:

- **High** — explicit in code (a `package.json` dependency, a schema column, a config value).
- **Medium** — inferred from a consistent pattern across multiple files.
- **Low** — guessed from partial or contradictory evidence.

Do not modify `CODE/` during this step. This is a read-only audit.

---

# Step 2 - Confirm Intent With The Human

Present the Step 1 findings and ask the human to confirm or correct each one. Do not re-ask questions the audit already answered with High confidence.

Then ask what the code cannot answer:

```
What company is this?

What product is this code building?

Who is the first customer segment?

What problem is painful enough that they would pay to remove it?
```

Do not continue without answers. Never invent a company. Never keep example content because no answer was given.

---

# Step 3 - Rewrite The Top Of The Hierarchy

```
COMPANY_OS.md
```

Same as `init-project.md` Step 2: vision, thesis, market strategy, ideal customer profile, principles, competitive advantages, definition of success.

Code has no opinion on this layer. It depends entirely on the Step 2 answers.

---

# Step 4 - Reset The Decision Log, Then Reconstruct It

```
DECISIONS.md
```

Keep the same framework decisions `init-project.md` Step 3 keeps. Delete every other inherited decision.

Then add new decisions recording what Step 1 found — not what would ideally have been decided. Each reconstructed decision:

- Is dated with today's date, not an invented historical date.
- States explicitly that it was "reconstructed from existing code on adoption," not decided fresh.
- Carries the confidence level from Step 1 (High/Medium/Low).
- Records what a human confirmed or corrected in Step 2.

A Low-confidence entry is still worth recording — mark it as needing verification, don't silently upgrade it to look decided.

---

# Step 5 - Derive The Domain

```
DOMAIN/DOMAIN_MODEL.md
DOMAIN/BUSINESS_RULES.md
```

Derive entities and rules from the real models/schemas found in Step 1, not from the example content and not invented.

Where the code's entity names or relationships are ambiguous, confirm meaning with the human rather than guessing. Where a business rule is enforced in code (a validation, a constraint) but its business reason isn't obvious from the code alone, ask why — the code shows *what*, not always *why*.

---

# Step 6 - Rewrite The Product Layer

```
PRODUCT/ROADMAP.md
PRODUCT/FEATURES.md
PRODUCT/USER_RESEARCH.md
PRODUCT/COMPETITIVE_LANDSCAPE.md
```

Vision and strategy need human input — code cannot supply them. Rewrite with the human, same as `init-project.md` Step 5.

FEATURES.md is different from a greenfield start: seed it with what Step 1 found is actually shipped (real routes, real screens), then confirm scope and intent with the human. Do not describe shipped code as a "feature" until its user problem and acceptance criteria are confirmed.

USER_RESEARCH.md and COMPETITIVE_LANDSCAPE.md: same rule as `init-project.md` — leave structured and empty unless real research/competitor findings exist. Code cannot manufacture either.

---

# Step 7 - Reconcile The Engineering Layer

```
ENGINEERING/ARCHITECTURE.md
ENGINEERING/DATABASE.md
ENGINEERING/SECURITY.md
```

Unlike `init-project.md` Step 6, do not "decide explicitly." Fill these from the Step 1 audit: the stack, database engine, tenancy model, authentication approach, and deployment target the code already runs.

The human's role here is to confirm or correct the audit, not to choose from a blank slate. If the human wants to change something the code currently does differently, that is a new decision going forward — record it as such in DECISIONS.md, separate from the reconstruction entries.

---

# Step 8 - Rewrite The Automations

```
AUTOMATIONS/customer-onboarding.md
AUTOMATIONS/release-process.md
AUTOMATIONS/user-feedback.md
```

Where the repository already has evidence of these processes (a CI/CD pipeline, an onboarding script, a support inbox integration), derive from that evidence and confirm with the human. Where no evidence exists, this needs human input the same as `init-project.md` Step 7 — do not invent a process to fill the document.

---

# Step 9 - Reset AI Memory

```
AI/memory/glossary.md
```

Replace the Domain Terms section with vocabulary drawn from real code identifiers (entity names, table names, class names) confirmed against Step 5, not invented terminology.

Leave the Framework Terms section untouched.

Before touching `conventions.md` and `learnings.md`, run the same Review Process `init-project.md` Step 8 requires: promote any Critical/Important, reusable learning to `AI/policies/` or the Framework Terms section of `conventions.md` before deleting it.

```
AI/memory/conventions.md
AI/memory/learnings.md
```

Keep the rules. Delete every recorded convention and learning that was not promoted. They belong to whatever prior context existed before this adoption.

---

# Step 10 - Reconcile The Gitignore

```
.gitignore
```

Keep the UNIVERSAL block unchanged.

In the STACK-SPECIFIC block, reconcile against the stack found in Step 1 — the repository likely already has a working `.gitignore` for its real stack. Merge, don't blindly overwrite; do not delete entries the running project actually needs.

---

# Step 11 - Do Not Touch CODE/

`CODE/` holds the real product. Never delete or empty it.

Rewrite only:

```
CODE/README.md
```

Describe the actual repository topology found in Step 1 — the real layout, not a placeholder.

---

# Step 12 - Verify By Contrast

This is not the `init-project.md` Step 11 check for zero matches of example terms — adoption doesn't start from an example, it starts from real code that must not be contradicted.

For every factual claim written into `ENGINEERING/*.md` and `DOMAIN/*.md`, confirm it matches something observable in `CODE/`:

```
For each claim: does CODE/ support it? Cite file/line, or mark it explicitly as inferred / Low confidence and unverified.
```

A claim with no code evidence and no explicit Low-confidence marker is a defect in this adoption, not an acceptable gap.

Then confirm the markers survived:

```
grep -rl "PROJECT-SPECIFIC" . --include="*.md"
```

---

# Step 13 - Record The Adoption

Add a decision to `DECISIONS.md` recording:

- What company this repository now serves.
- The date.
- That this was an adoption (reconstructed from existing code), not an initialization.
- The stack, database engine, tenancy model and confidence levels established in Step 7.

This is the first decision of the adopted product's Kenovis-tracked history — not the first decision of the product itself, which predates this adoption.

---

# Rules

Never:

- Delete, empty, or rewrite anything under `CODE/` other than `CODE/README.md`.
- Modify anything under `AI/agents/`, `AI/workflows/`, `AI/policies/`, `AI/templates/` or `AI/commands/` during adoption. If a framework file blocks adoption, that is a framework defect — fix it as its own change, not silently during this command.
- Treat "the code does X" as proof X is the right pattern going forward. Document what exists; flag anti-patterns to the human separately from recording them as the current state.
- Write a fact into `ENGINEERING/` or `DOMAIN/` without either a file/line citation or an explicit Low-confidence marker.
- Ask the human to decide something the code already shows with High confidence.

Always:

- Audit before asking. The human confirms and corrects; they should not have to dictate what the code already states.
- Cite evidence for every reconstructed fact.
- Mark confidence explicitly wherever it is not High.
- Ask when the answer is a business fact the code cannot show — company, vision, first segment, real user research.

---

# Completion Criteria

Adoption is complete when:

✓ COMPANY_OS.md describes the real company, from human input.

✓ DECISIONS.md contains framework decisions plus reconstruction decisions with confidence markers, plus real new decisions.

✓ DOMAIN/ describes entities derived from real schemas/models, confirmed by a human.

✓ PRODUCT/ describes the real roadmap; FEATURES.md reflects what is actually shipped; research and competitive landscape are left empty if none exists.

✓ ENGINEERING/ describes what CODE/ actually does — verified by contrast against the code, not decided fresh.

✓ AUTOMATIONS/ describes real processes, derived from evidence where it exists.

✓ AI/memory/ holds vocabulary drawn from real code identifiers, and no unpromoted inherited learnings.

✓ .gitignore is reconciled with the real stack, not overwritten.

✓ CODE/ is byte-identical to before, except CODE/README.md.

✓ Every factual claim in ENGINEERING/ and DOMAIN/ has a code citation or an explicit Low-confidence marker.

✓ Framework files are byte-identical to before.

---

# Final Principle

An adoption that overwrites what the code already decided doesn't onboard the product — it discards its history and replaces it with fiction.

The code speaks first. The human confirms. The documents follow both.
