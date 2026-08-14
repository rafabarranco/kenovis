# Init Project Command

Version: 1.11

---

# Purpose

Turn a repository carrying the framework into a repository carrying a real product.

The AI-OS has two layers:

Framework

Reusable. Works for any product. Never rewritten.

Product

Describes one specific company and product. Rewritten every time.

This command builds the product layer, without touching the framework.

Two situations reach this command, and it must work in both:

Fresh Installation

The Framework layer was installed by `kenovis init` (DECISIONS.md DECISION-017). There is no Product layer yet — not placeholder files, nothing. The product layer gets authored from the templates in `.kenovis/AI/templates/product-layer/`.

Repurposed repository

A repository that already carries a product layer, being reset for a different company. The existing files are rewritten in place, and the templates are the reference for any section that went missing.

---

# Trigger

Execute when:

- A fresh `kenovis init` Installation needs its product layer.
- Repurposing a repository for a different company.
- Product-layer documents still describe a previous or example company.

Command:

```
/init-project
```

Do not execute on a repository that already holds a real product. That would destroy its context.

Do not execute on a repository that already contains a real implementation predating the Kenovis AI-OS, wherever that implementation lives — that is an adoption, not an initialization. Use `.kenovis/AI/commands/adopt-project.md` instead: it audits the existing code before touching any product-layer document, instead of asking the human to decide a stack that is already running.

---

# Core Principle

A template is a shape, not an answer.

Every `[ANSWER: ...]` instruction in a template is a question for the human. Filling one in with a plausible guess produces a document that reads like a decision and is not one — and every agent from then on inherits it as fact.

The same applies to content left behind by a previous product: anything that survives becomes a silent wrong assumption.

---

# How To Recognise The Product Layer

Every product-layer file starts with:

```
<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->
```

If a file does not carry that marker, it is framework. Leave it alone.

The marker states which layer a file belongs to, and nothing about whether it has been filled in. It is equally true of a template nobody has answered and of a document this company has owned for a year. Whether questions remain unanswered is a separate fact carried by a separate marker, `[ANSWER: ...]` — see "Where The Shape Comes From" below, and DECISION-023.

Check what is actually present before starting:

```
grep -rl "PROJECT-SPECIFIC" . --include="*.md" --include=".gitignore" --exclude-dir=.kenovis
```

Zero matches is the normal, expected result in a fresh Installation. It means the product layer does not exist yet and every Step below authors its file rather than rewriting one. It does not mean anything is broken.

---

# Where The Shape Comes From

```
.kenovis/AI/templates/product-layer/
```

One template per product-layer document, at the path it maps to — `product-layer/COMPANY_OS.md` → `COMPANY_OS.md`, `product-layer/DOMAIN/DOMAIN_MODEL.md` → `DOMAIN/DOMAIN_MODEL.md`, and so on. See that directory's own `README.md`.

Each template keeps verbatim the parts of its document that are identical for every product, and replaces everything company-specific with an instruction stating what must be answered.

A template uses brackets for two different things, and the difference is what makes Step 11 checkable:

```
[ANSWER: ...]
```

A question for the human. It must not survive into the written document. Every one of these is a decision nobody has made yet.

```
[anything else in brackets]
```

Content that legitimately survives: a format specification (`DOMAIN/BUSINESS_RULES.md` → "Rule Format", `PRODUCT/FEATURES.md`'s FEATURE-NNN shape), an illustrative example, a placeholder inside a code or tree sample, or a deliberate "nothing recorded yet" statement in a section the product has genuinely not filled. These are answers, not questions. Leave them.

For every Step below:

1. Read the template for that document.
2. Ask the human what its `[ANSWER: ...]` instructions ask for. Do not answer them yourself.
3. Write the real file: framework sections carried over unchanged, every `[ANSWER: ...]` replaced by the human's real answer.
4. Keep the `PROJECT-SPECIFIC` marker on line 1, unchanged. It marks the file as product layer, which is what makes the Collision Guard work — for this run and every future one. Do not reword it to say the file is finished; it never claimed the file was unfinished.

Never copy a template into place unanswered. The marker would be correct — a template at a product-layer path really is Product layer — and that is exactly why it is not a safety net. What tells anyone the file is unanswered is the `[ANSWER: ...]` instructions still sitting in it.

If the document already exists (a repurposed repository), rewrite it in place instead, and use the template only as the reference for what its sections should be.

---

# Collision Guard

Before writing any Product-layer file in Steps 2-7, check whether something is already there:

```
head -1 <file>
```

If the marker is missing, the file predates this command and may not be Kenovis's to overwrite — this repository's own product layer is not necessarily the only content that could sit at that path. Stop. Ask the human: overwrite it, or move it aside first. Do not write that file until answered.

Same escape-hatch shape as `ExistingClaudeMdError` in `cli/src/domain/installation.ts` — a file this command is allowed to own is not the same guarantee as a file it may discard sight unseen (AI/memory/learnings.md Learning-006).

Files that already carry the marker need no confirmation — that is the expected case in a repurposed repository.

A path with no file at all needs no confirmation either — that is the expected case in a fresh Installation.

---

# Step 1 - Confirm Intent

Ask the human:

```
What company is this?

What product is being built?

Who is the first customer segment?

What problem is painful enough that they would pay to remove it?
```

Then ask the four that produce rank 1 of the Source Of Truth Hierarchy, and say why they are being asked — they are not more of the same:

```
What is this product for? Not what it does — what it exists to make possible.

Which responsibilities are the AI-OS's rather than yours?

Which decisions stay yours?

Which rules must hold no matter what the schedule says?
```

If the human already has a written statement of any of this, ask for it and keep it **verbatim**. A supplied statement is evidence of intent; summarising it destroys the thing that makes it rank 1.

These four answers go into `PRODUCT/OPERATING_MODEL.md` in Step 2, and the four above them into `COMPANY_OS.md` in the same step. Nothing produced by this step is a file of its own.

Do not continue without answers.

Never invent a company. Never keep the example company because no answer was given. Never author the operating model on the human's behalf — it is the one Product-layer document the AI does not get to write, because it is the document the AI is measured against.

---

# Step 2 - Rewrite The Top Of The Hierarchy

Order matters. Everything below depends on what is written here. Two documents, in this order.

```
PRODUCT/OPERATING_MODEL.md
```

Template: `product-layer/PRODUCT/OPERATING_MODEL.md`. Collision guard applies (see above).

Rank 1 of the Source Of Truth Hierarchy (`.kenovis/AI/SYSTEM.md`): the owner's statement of what this product is for. Write it from the Step 1 answers, in the human's own words wherever they gave them, verbatim wherever they supplied a written statement.

Leave the Conformance table at the foot of that template as the form it is — one row per numbered section, filled the first time a round reads the document end to end against the framework. Do not fill it during setup with states nobody measured.

This document exists because a round can only be checked against a criterion that is written down. Where none is, rounds are measured against the machinery instead, and the product drifts from its purpose with every round defensible and nothing recording the drift.

```
COMPANY_OS.md
```

Template: `product-layer/COMPANY_OS.md`. Collision guard applies (see above).

Author, or rewrite completely:

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

Keep the section structure the template defines. Every `[ANSWER: ...]` instruction becomes a real answer from Step 1, or a question back to the human.

---

# Step 3 - Reset The Decision Log

```
DECISIONS.md
```

Template: `product-layer/DECISIONS.md`. Collision guard applies (see above).

The decision log is entirely product-specific and starts empty. Keep the decision format and the status definitions the template carries; record nothing else yet.

Framework-layer files sometimes cite an identifier like `DECISION-018`. Those refer to the framework's own decision log, not to this company's. Never copy them in, and never renumber this log to make such a citation resolve — the framework decision explains why the framework behaves as it does, which is not a decision this company made.

In a repurposed repository, delete the previous product's decisions. If any of them recorded something still true for the new product, it must be re-decided and re-recorded deliberately, not inherited.

New decisions are numbered from DECISION-001 upwards as they are actually made, not invented up front. Step 12 records the first one.

---

# Step 4 - Rewrite The Domain

```
DOMAIN/DOMAIN_MODEL.md
DOMAIN/BUSINESS_RULES.md
```

Templates: `product-layer/DOMAIN/DOMAIN_MODEL.md`, `product-layer/DOMAIN/BUSINESS_RULES.md`. Collision guard applies (see above).

This is the layer where a guess does the most damage, because a generic-sounding entity looks correct in every review afterwards.

Derive entities from the real business. Four real entities beat twelve invented ones. Give each business rule a stable RULE-ID prefixed per entity, so code, tests and PRs can cite it.

In a repurposed repository: if the new product needs an entity the previous one also had, define it from scratch and confirm the meaning actually matches. A shared name is not a shared concept.

---

# Step 5 - Rewrite The Product Layer

```
PRODUCT/ROADMAP.md
PRODUCT/FEATURES.md
PRODUCT/USER_RESEARCH.md
PRODUCT/COMPETITIVE_LANDSCAPE.md
```

Templates: the four files under `product-layer/PRODUCT/`. Collision guard applies (see above).

USER_RESEARCH.md and COMPETITIVE_LANDSCAPE.md stay empty rather than invented. Research that has not happened is not research. Competitors that have not been verified are not competitors.

Leave both as structured empty documents until real research and real competitor findings exist.

---

# Step 6 - Rewrite The Engineering Layer

```
ENGINEERING/ARCHITECTURE.md
ENGINEERING/DATABASE.md
ENGINEERING/SECURITY.md
```

Templates: the three files under `product-layer/ENGINEERING/`. Collision guard applies (see above).

Decide explicitly and record in DECISIONS.md:

- Stack.
- Database engine.
- Tenancy model (single-tenant or multi-tenant, and the tenant key name).
- Authentication approach.
- Deployment target.

The framework policies read these documents. .kenovis/AI/policies/database.md and .kenovis/AI/agents/database.md deliberately do not assume a tenancy model or an engine — they look it up here. If these documents are vague, the agents will be vague.

"None" is a valid answer for a stack line, a database engine or an authentication approach — but it must be written down. A missing line reads as unknown, and unknown is what makes an agent guess.

ARCHITECTURE.md → "Suggested Project Structure" is the single answer to "where does this product's code live". Decide it here explicitly. There is no framework-mandated directory name (DECISIONS.md DECISION-016).

---

# Step 7 - Rewrite The Automations

```
AUTOMATIONS/customer-onboarding.md
AUTOMATIONS/release-process.md
AUTOMATIONS/user-feedback.md
```

Templates: the three files under `product-layer/AUTOMATIONS/`. Collision guard applies (see above).

Onboarding depends on what "activated customer" means for this product, and that definition must be checkable — PRODUCT/ROADMAP.md's success metrics read it. Do not carry over another product's definition.

---

# Step 8 - Set Up AI Memory

Templates: the three files under `product-layer/AI/memory/`. Collision guard applies (see above).

These three files are not distributed by the CLI, and the framework depends on them: roughly twenty framework files instruct agents to record a learning in `AI/memory/learnings.md`, promote one into `.kenovis/AI/policies/`, or look up a term in `AI/memory/glossary.md`. Without this Step, every one of those instructions points at a file that does not exist.

```
AI/memory/glossary.md
```

Author the Domain Terms section from the entities defined in Step 4 — every entity in DOMAIN/DOMAIN_MODEL.md should have a term here.

Carry the Framework Terms section over from the template unchanged.

```
AI/memory/conventions.md
```

Carry the template over as-is. It is entirely framework-level rules; recorded conventions accumulate later, as real ones are established.

```
AI/memory/learnings.md
```

Carry the template's rules over unchanged — the Learning Philosophy, the format, the categories, the priority levels, the Review Process. Those are the mechanism by which this product's knowledge accumulates.

The two entries in the template are format examples, not recorded learnings. Leave them or replace them; either way, nothing here yet describes this product.

In a repurposed repository only: before deleting the previous product's recorded learnings, run the Review Process from `AI/memory/learnings.md` first.

1. List every recorded learning marked Critical or Important.
2. For each one, ask: is this reusable across any product built on this framework, or specific to the product being reset?
3. Reusable ones must be promoted before deletion — a permanent rule moves to `.kenovis/AI/policies/`, a naming rule moves to the Framework Terms section of `conventions.md`, domain knowledge moves nowhere (it dies with the product it described).
4. Do this promotion now. Do not defer it — once this Step completes, the source learning is gone.

---

# Step 9 - Trim The Gitignore

```
.gitignore
```

Applies only if this repository carries a `.gitignore` with the framework's UNIVERSAL and STACK-SPECIFIC blocks. The CLI does not install one, so a fresh Installation usually has either the repository's own `.gitignore` or none at all.

If the framework's blocks are present: keep UNIVERSAL unchanged, and in STACK-SPECIFIC delete every entry that does not match the stack chosen in Step 6.

If the repository has its own `.gitignore`: it belongs to the repository, not to this command. Leave it alone. Add an entry only if the chosen stack genuinely needs one, and only after asking.

If there is none: skip this Step. Do not fabricate a `.gitignore` — that is the stack scaffolding's job, and scaffolding is the first roadmap item, not part of initialization.

---

# Step 10 - Clear Any Leftover Implementation

If this repository already ran `/init-project` for a different product before (a pivot, not a first install), delete whatever implementation that previous product left behind, wherever it lived — there is no framework-mandated location for it.

For a genuinely first-time install there is nothing to delete.

`ENGINEERING/ARCHITECTURE.md` → "Suggested Project Structure" (Step 6) records whatever layout this product chooses going forward. A dedicated top-level directory for the implementation is one valid choice, not a rule every product must follow — Step 6 decides it explicitly, it is never a framework default.

Do not scaffold anything yet. Scaffolding is the first roadmap item, not part of initialization.

---

# Step 11 - Verify

First, confirm no unanswered template question survived:

```
grep -rn "\[ANSWER:" COMPANY_OS.md DECISIONS.md DOMAIN/ PRODUCT/ ENGINEERING/ AUTOMATIONS/ AI/memory/
```

Zero matches is the passing result. Every match is a question that was never answered. Either answer it, or replace it with an explicit statement that this product has no answer yet — never leave the instruction itself in place, because the next agent reads it as content.

The pattern is deliberately not anchored to the start of a line: a template question can sit mid-line (`Definition: [ANSWER: ...]`, `- Deployment target: [ANSWER: ...]`), and an anchored check would report those documents as clean.

Brackets that are not `[ANSWER:` are not failures — see "Where The Shape Comes From". A correctly completed product layer still contains format specifications, illustrative examples and deliberate "nothing recorded yet" statements, all of them in brackets.

Second, read back what came over verbatim. The check above finds questions that were never answered; it cannot find a section that arrived already answered — about a different product. Templates are derived from the framework's own Product layer, and a derivation that missed a section ships that answer to every Installation (`AI/memory/learnings.md` Learning-017, fixed in three files but not provably absent from the rest).

Read each section that was not written in Steps 2-8 and ask whether it describes this product. A concrete statement about infrastructure, distribution, accounts or tooling is the shape to look for — framework-level prose states principles and formats, never facts about one system:

```
grep -rinE "in v1|not applicable|no backend|the CLI|npm" COMPANY_OS.md DECISIONS.md DOMAIN/ PRODUCT/ ENGINEERING/ AUTOMATIONS/ AI/memory/
```

A hit is not automatically wrong — this product may genuinely have no backend. It is wrong when nobody decided it. Replace any such sentence with this product's real answer, or with an explicit statement that there is none.

In a repurposed repository, also run:

```
grep -rinE "<terms from the previous product>" . --include="*.md"
```

Populate the pattern with the distinctive nouns of the previous company: its market, its entities, its brand. Zero matches outside a deliberate historical note means the product layer is clean.

Then confirm the markers are in place:

```
grep -rl "PROJECT-SPECIFIC" . --include="*.md" --exclude-dir=.kenovis
```

Every file authored in Steps 2-8 must appear. The markers mark which files are product-layer, not which files are unfinished.

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
- Delete `.kenovis/.claude-md.sha256`. It records the hash of the stub the CLI last wrote — the pending one — so leaving it in place would make the next `kenovis sync` refuse to touch a `CLAUDE.md` you just legitimately rewrote. The next install/sync records it again.

---

# Rules

Never:

- Modify anything under .kenovis/AI/agents/, .kenovis/AI/workflows/, .kenovis/AI/policies/, .kenovis/AI/templates/ or .kenovis/AI/commands/ during initialization. If a framework file blocks the new product, that is a framework defect — fix it as its own change, with reasoning, not silently during setup.
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

✓ PRODUCT/OPERATING_MODEL.md carries the owner's own statement of what this product is for, in the owner's words, and its Conformance table is present as an unfilled form.

✓ COMPANY_OS.md describes the real company.

✓ DECISIONS.md carries the decision format and only decisions this company actually made.

✓ DOMAIN/ describes the real business.

✓ PRODUCT/ describes the real roadmap, with research and competitive landscape left empty if none exists.

✓ ENGINEERING/ records real stack, database and tenancy decisions.

✓ AUTOMATIONS/ describes real processes.

✓ AI/memory/ exists, holds this product's vocabulary and the framework's own memory rules, and carries no inherited learnings.

✓ .gitignore matches the chosen stack, or was deliberately left untouched.

✓ No implementation survives from a previous product, and ENGINEERING/ARCHITECTURE.md describes this product's chosen topology.

✓ No `[ANSWER: ...]` template question survives in any product-layer file.

✓ No term from a previous or example company survives.

✓ No unmarked pre-existing file was overwritten without the human confirming.

✓ Framework files are byte-identical to before.

---

# Final Principle

A framework is only reusable if the previous product leaves no residue.

Every sentence that survives initialization is a decision nobody made.
