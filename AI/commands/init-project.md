# Init Project Command

Version: 1.6

---

# Purpose

Turn this repository from a framework carrying example content into a framework carrying a real product.

The AI-OS has two layers:

Framework

Reusable. Works for any product. Never rewritten.

Product

Describes one specific company and product. Rewritten every time.

This command empties the product layer and rebuilds it, without touching the framework.

---

# Trigger

Execute when:

- Starting a new product in a fresh clone of this repository.
- Repurposing this repository for a different company.
- Product-layer documents still describe the example company.

Command:

```
/init-project
```

Do not execute on a repository that already holds a real product. That would destroy its context.

Do not execute on a repository that already contains a real implementation predating the Kenovis AI-OS, wherever that implementation lives — that is an adoption, not an initialization. Use `AI/commands/adopt-project.md` instead: it audits the existing code before touching any product-layer document, instead of asking the human to decide a stack that is already running.

---

# Core Principle

The example content is not a suggestion to follow.

It is a shape to replace.

Anything that survives from the example company becomes a silent wrong assumption that every agent will inherit.

---

# How To Recognise The Product Layer

Every product-layer file starts with:

```
<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->
```

If a file does not carry that marker, it is framework. Leave it alone.

Verify before starting:

```
grep -rl "PROJECT-SPECIFIC" . --include="*.md" --include=".gitignore"
```

---

# Collision Guard

Before rewriting any Product-layer file in Steps 2-7, check it:

```
head -1 <file>
```

If the marker is missing, the file predates this command and may not be Kenovis's to overwrite — this repository's own product layer is not necessarily the only content that could sit at that path. Stop. Ask the human: overwrite it, or move it aside first. Do not write that file until answered.

Same escape-hatch shape as `ExistingClaudeMdError` in `cli/src/domain/installation.ts` — a file this command is allowed to own is not the same guarantee as a file it may discard sight unseen (AI/memory/learnings.md Learning-006).

Files that already carry the marker need no confirmation — that is the expected, normal case.

---

# Step 1 - Confirm Intent

Ask the human:

```
What company is this?

What product is being built?

Who is the first customer segment?

What problem is painful enough that they would pay to remove it?
```

Do not continue without answers.

Never invent a company. Never keep the example company because no answer was given.

---

# Step 2 - Rewrite The Top Of The Hierarchy

Order matters. Everything below depends on what is written here.

```
COMPANY_OS.md
```

Collision guard applies (see above).

Rewrite completely:

- Company vision.
- Company thesis.
- Initial market strategy.
- Long-term market vision.
- Ideal customer profile.
- Market exclusions.
- Company principles.
- Product philosophy.
- Competitive advantages.
- What the company will NOT become.
- Definition of success.

Keep the section structure. Replace every sentence about the example company.

---

# Step 3 - Reset The Decision Log

```
DECISIONS.md
```

Collision guard applies (see above).

Keep:

- The decision format.
- The status definitions.
- DECISION-001 — AI-Native Company Operating Model.
- DECISION-009 — Documentation As Company Memory.
- DECISION-010 — AI Tooling Strategy.

Delete every other decision.

Renumber the surviving decisions if the human prefers a clean sequence, otherwise keep the original IDs and start new decisions after the highest one.

New decisions are recorded as they are made, not invented up front.

---

# Step 4 - Rewrite The Domain

```
DOMAIN/DOMAIN_MODEL.md
DOMAIN/BUSINESS_RULES.md
```

Collision guard applies (see above).

This is the layer most likely to be copied by accident, because the example entities look generic.

Derive entities from the real business, not from the example. If the new product genuinely needs an entity that also exists in the example, define it from scratch and confirm the meaning matches.

---

# Step 5 - Rewrite The Product Layer

```
PRODUCT/ROADMAP.md
PRODUCT/FEATURES.md
PRODUCT/USER_RESEARCH.md
PRODUCT/COMPETITIVE_LANDSCAPE.md
```

Collision guard applies (see above).

USER_RESEARCH.md and COMPETITIVE_LANDSCAPE.md should be emptied rather than invented. Research that has not happened is not research. Competitors that have not been verified are not competitors.

Leave both as structured empty documents until real research and real competitor findings exist.

---

# Step 6 - Rewrite The Engineering Layer

```
ENGINEERING/ARCHITECTURE.md
ENGINEERING/DATABASE.md
ENGINEERING/SECURITY.md
```

Collision guard applies (see above).

Decide explicitly and record in DECISIONS.md:

- Stack.
- Database engine.
- Tenancy model (single-tenant or multi-tenant, and the tenant key name).
- Authentication approach.
- Deployment target.

The framework policies read these documents. AI/policies/database.md and AI/agents/database.md deliberately do not assume a tenancy model or an engine — they look it up here. If these documents are vague, the agents will be vague.

---

# Step 7 - Rewrite The Automations

```
AUTOMATIONS/customer-onboarding.md
AUTOMATIONS/release-process.md
AUTOMATIONS/user-feedback.md
```

Collision guard applies (see above).

Onboarding depends on what "activated customer" means for this product. Do not carry over the example definition.

---

# Step 8 - Reset AI Memory

```
AI/memory/glossary.md
```

Replace the Domain Terms section with the vocabulary of the new product.

Leave the Framework Terms section untouched.

Before touching `conventions.md` and `learnings.md`, run the Review Process from `AI/memory/learnings.md` first:

1. List every recorded learning marked Critical or Important.
2. For each one, ask: is this reusable across any product built on this framework, or specific to the product being reset?
3. Reusable ones must be promoted before deletion — a permanent rule moves to `AI/policies/`, a naming rule moves to the Framework Terms section of `conventions.md`, domain knowledge moves nowhere (it dies with the product it described).
4. Do this promotion now. Do not defer it — after Step 8 completes, the source learning is gone.

```
AI/memory/conventions.md
AI/memory/learnings.md
```

Keep the rules. Delete every recorded convention and learning that was not promoted in the previous step. They belong to the previous product.

---

# Step 9 - Trim The Gitignore

```
.gitignore
```

Keep the UNIVERSAL block unchanged.

In the STACK-SPECIFIC block, delete every entry that does not match the stack chosen in Step 6.

---

# Step 10 - Clear Any Leftover Implementation

If this repository already ran `/init-project` for a different product before (a pivot, not a first install), delete whatever implementation that previous product left behind, wherever it lived — there is no framework-mandated location for it.

For a genuinely first-time install there is nothing to delete.

`ENGINEERING/ARCHITECTURE.md` → "Suggested Project Structure" (Step 6) records whatever layout this product chooses going forward. A dedicated top-level directory for the implementation is one valid choice, not a rule every product must follow — Step 6 decides it explicitly, it is never a framework default.

Do not scaffold anything yet. Scaffolding is the first roadmap item, not part of initialization.

---

# Step 11 - Verify

Run:

```
grep -rinE "<terms from the previous product>" . --include="*.md"
```

Populate the pattern with the distinctive nouns of the example company: its market, its entities, its brand.

Zero matches outside a deliberate historical note means the product layer is clean.

Then confirm the markers survived:

```
grep -rl "PROJECT-SPECIFIC" . --include="*.md"
```

The markers stay. They mark which files are product-layer, not which files are unfinished.

---

# Step 12 - Record The Initialization

Add a decision to DECISIONS.md recording:

- What company this repository now serves.
- The date.
- The stack and tenancy model chosen in Step 6.

This is the first decision of the new product.

If `.kenovis/.setup-pending` exists (this run was auto-triggered by a `kenovis init` install, per DECISIONS.md DECISION-018):

- Delete `.kenovis/.setup-pending`.
- Rewrite the root `CLAUDE.md` stub back to its passive, steady-state form (no first-session directive).

---

# Rules

Never:

- Modify anything under AI/agents/, AI/workflows/, AI/policies/, AI/templates/ or AI/commands/ during initialization. If a framework file blocks the new product, that is a framework defect — fix it as its own change, with reasoning, not silently during setup.
- Keep example content because it "looks reasonable".
- Invent business requirements, user research or decisions to fill a document.
- Scaffold code.

Always:

- Work top-down through the hierarchy.
- Ask when the answer is a business fact you do not have.
- Leave a document explicitly empty rather than plausibly wrong.

---

# Completion Criteria

Initialization is complete when:

✓ COMPANY_OS.md describes the real company.

✓ DECISIONS.md contains only framework decisions plus real new ones.

✓ DOMAIN/ describes the real business.

✓ PRODUCT/ describes the real roadmap, with research and competitive landscape left empty if none exists.

✓ ENGINEERING/ records real stack, database and tenancy decisions.

✓ AUTOMATIONS/ describes real processes.

✓ AI/memory/ holds the new vocabulary and no inherited learnings.

✓ .gitignore matches the chosen stack.

✓ No implementation survives from a previous product, and ENGINEERING/ARCHITECTURE.md describes this product's chosen topology.

✓ No term from the example company survives.

✓ No unmarked pre-existing file was overwritten without the human confirming.

✓ Framework files are byte-identical to before.

---

# Final Principle

A framework is only reusable if the previous product leaves no residue.

Every sentence that survives initialization is a decision nobody made.
