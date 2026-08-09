# Adopt Project Command

Version: 1.10

---

# Purpose

Build a real product's context into a repository whose product already exists — wherever its implementation actually lives — written before the Kenovis AI-OS was installed.

This is the brownfield counterpart to `.kenovis/AI/commands/init-project.md`.

The difference is not cosmetic:

`/init-project` assumes nothing exists. It asks the human, then decides, then writes.

`/adopt-project` assumes the code already decided most of this. It reads the code first, then asks the human only to confirm or correct what it found — not to decide from scratch.

Both commands author their documents from the same templates in `.kenovis/AI/templates/product-layer/` (DECISIONS.md DECISION-021). What differs is where the answers come from: `/init-project` asks the human, `/adopt-project` reads the code and has the human confirm.

Treating an adoption like an initialization destroys a working product: `/init-project` Step 10 deletes leftover implementation on the assumption of a pivot, Step 6 asks the human to "decide" a stack that is already running, and Step 5 leaves research empty even when real, if undocumented, market context exists in the team's heads.

---

# Trigger

Execute when:

- The target repository already contains a real implementation that predates the Kenovis AI-OS — wherever it actually lives (repo root, `src/`, a monorepo package). It never needs to be moved into any particular folder for this command to apply.
- Product-layer files (`COMPANY_OS.md`, `DECISIONS.md`, `DOMAIN/`, `PRODUCT/`, `ENGINEERING/`) are absent, or still carry example/placeholder content, while the actual product is running somewhere in the repository. Absent is the normal case: `kenovis add` installs the Framework layer and nothing else.

Command:

```
/adopt-project
```

Do not execute on an empty repository or a fresh clone with no implementation — use `.kenovis/AI/commands/init-project.md` instead.

Do not execute on a repository whose product layer already describes the real product — that adoption already happened.

---

# Core Principle

Code that is already running already made decisions: a stack, a database engine, an auth mechanism, a set of domain entities.

The agent's job is to read those decisions accurately, not to invent, override, or re-decide them because the framework's default flow expects a blank slate.

A fact reconstructed from code and confirmed by a human is trustworthy. A fact invented to fill a template is not — it is worse than an empty document, because it looks authoritative.

---

# How To Recognise Adoption Is Needed

```
grep -rl "PROJECT-SPECIFIC" . --include="*.md" --include=".gitignore" --exclude-dir=.kenovis
```

That marker states which layer a file belongs to, not whether anyone has filled it in — a completed Product layer carries it exactly as a template does (DECISION-023). So the grep tells you which product-layer files *exist*, and you still have to read them to know whether they hold real answers or leftover `[ANSWER: ...]` instructions.

If it lists nothing, or lists product-layer files still holding unanswered questions, AND the repository already has a real implementation somewhere — whatever the repository's actual layout is — this is an adoption, not an initialization.

Zero matches is the expected result after `kenovis add`. It means no product layer exists yet, so every Step below authors its file from the template rather than rewriting one.

---

# Where The Shape Comes From

```
.kenovis/AI/templates/product-layer/
```

One template per product-layer document, at the path it maps to. See that directory's own `README.md`, and `init-project.md` → "Where The Shape Comes From" for the full rule — it is identical here, with one difference that matters:

An `[ANSWER: ...]` instruction in a template is a question. In an adoption, the code answers most of them, and the human confirms the answer. Only the questions the code cannot answer — company, vision, first segment, real user research — go to the human to decide.

Brackets that are not `[ANSWER:` are format specifications, illustrative examples or deliberate "nothing recorded yet" statements. They survive into the written document; see `init-project.md` for the full rule.

Never copy a template into place unanswered, and never leave an `[ANSWER: ...]` instruction in a written document.

---

# Collision Guard

Before writing any Product-layer file in Steps 3-8, check whether something is already there:

```
head -1 <file>
```

If the marker is missing, the file predates this command and may not be Kenovis's to overwrite — a brownfield target is exactly the case most likely to already have its own file at that path. Stop. Ask the human: overwrite it, or move it aside first. Do not write that file until answered.

Same escape-hatch shape as `ExistingClaudeMdError` in `cli/src/domain/installation.ts` — a file this command is allowed to own is not the same guarantee as a file it may discard sight unseen (AI/memory/learnings.md Learning-006).

Files that already carry the marker need no confirmation.

A path with no file at all needs no confirmation either — that is the expected case after `kenovis add`.

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

Do not modify the customer's existing code during this step. This is a read-only audit.

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

# Step 3 - Author The Top Of The Hierarchy

```
COMPANY_OS.md
```

Template: `product-layer/COMPANY_OS.md`. Collision guard applies (see above).

Same as `init-project.md` Step 2: vision, thesis, market strategy, ideal customer profile, principles, competitive advantages, definition of success.

Code has no opinion on this layer. It depends entirely on the Step 2 answers.

---

# Step 4 - Start The Decision Log, Then Reconstruct It

```
DECISIONS.md
```

Template: `product-layer/DECISIONS.md`. Collision guard applies (see above).

Same rule as `init-project.md` Step 3: the log is entirely product-specific and starts empty, carrying only the decision format and the status definitions. A `DECISION-NNN` cited by a framework file belongs to the framework's own log, never to this one. In a repurposed repository, delete every inherited decision.

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

Templates: `product-layer/DOMAIN/DOMAIN_MODEL.md`, `product-layer/DOMAIN/BUSINESS_RULES.md`. Collision guard applies (see above).

Derive entities and rules from the real models/schemas found in Step 1 — never invented, and never carried over from example content.

Where the code's entity names or relationships are ambiguous, confirm meaning with the human rather than guessing. Where a business rule is enforced in code (a validation, a constraint) but its business reason isn't obvious from the code alone, ask why — the code shows *what*, not always *why*.

---

# Step 6 - Author The Product Layer

```
PRODUCT/ROADMAP.md
PRODUCT/FEATURES.md
PRODUCT/USER_RESEARCH.md
PRODUCT/COMPETITIVE_LANDSCAPE.md
```

Templates: the four files under `product-layer/PRODUCT/`. Collision guard applies (see above).

Vision and strategy need human input — code cannot supply them. Author with the human, same as `init-project.md` Step 5.

FEATURES.md is different from a greenfield start: seed it with what Step 1 found is actually shipped (real routes, real screens), then confirm scope and intent with the human. Do not describe shipped code as a "feature" until its user problem and acceptance criteria are confirmed.

USER_RESEARCH.md and COMPETITIVE_LANDSCAPE.md: same rule as `init-project.md` — leave structured and empty unless real research/competitor findings exist. Code cannot manufacture either.

---

# Step 7 - Reconcile The Engineering Layer

```
ENGINEERING/ARCHITECTURE.md
ENGINEERING/DATABASE.md
ENGINEERING/SECURITY.md
```

Templates: the three files under `product-layer/ENGINEERING/`. Collision guard applies (see above).

Unlike `init-project.md` Step 6, do not "decide explicitly." Answer the templates' `[ANSWER: ...]` instructions from the Step 1 audit: the stack, database engine, tenancy model, authentication approach, and deployment target the code already runs.

ARCHITECTURE.md → "Suggested Project Structure" describes the layout the repository already has. Adoption never relocates working code to match a shape a document suggests (DECISIONS.md DECISION-016). See Step 11.

The human's role here is to confirm or correct the audit, not to choose from a blank slate. If the human wants to change something the code currently does differently, that is a new decision going forward — record it as such in DECISIONS.md, separate from the reconstruction entries.

---

# Step 8 - Author The Automations

```
AUTOMATIONS/customer-onboarding.md
AUTOMATIONS/release-process.md
AUTOMATIONS/user-feedback.md
```

Templates: the three files under `product-layer/AUTOMATIONS/`. Collision guard applies (see above).

Where the repository already has evidence of these processes (a CI/CD pipeline, an onboarding script, a support inbox integration), derive from that evidence and confirm with the human. Where no evidence exists, this needs human input the same as `init-project.md` Step 7 — do not invent a process to fill the document.

---

# Step 9 - Set Up AI Memory

Templates: the three files under `product-layer/AI/memory/`. Collision guard applies (see above).

The CLI does not distribute these three files, and roughly twenty framework files depend on them — instructing agents to record a learning in `AI/memory/learnings.md`, promote one into `.kenovis/AI/policies/`, or look up a term in `AI/memory/glossary.md`. Skip this Step and every one of those instructions points at a file that does not exist.

```
AI/memory/glossary.md
```

Author the Domain Terms section from vocabulary drawn from real code identifiers — entity names, table names, class names — confirmed against Step 5, never invented terminology.

Carry the Framework Terms section over from the template unchanged.

```
AI/memory/conventions.md
```

Carry the template over as-is, then add any convention the Step 1 audit found the codebase actually follows — naming patterns, folder organization, established architectural patterns. Cite the evidence, same rule as Step 12.

```
AI/memory/learnings.md
```

Carry the template's rules over unchanged: the Learning Philosophy, the format, the categories, the priority levels, the Review Process.

Record no learnings yet. What the audit found belongs in `ENGINEERING/`, `DOMAIN/` and `conventions.md` as current state — a learning is something this team learned, not something an audit inferred.

In a repurposed repository only: before deleting inherited conventions and learnings, run the same Review Process `init-project.md` Step 8 requires — promote any Critical/Important, reusable learning to `.kenovis/AI/policies/` or the Framework Terms section of `conventions.md` before deleting it.

---

# Step 10 - Reconcile The Gitignore

```
.gitignore
```

A brownfield repository almost always has its own working `.gitignore` for its real stack. It belongs to the repository, not to this command.

Leave it alone unless something is genuinely missing for the stack found in Step 1, and then ask before adding. Never delete an entry the running project needs, and never overwrite the file wholesale.

If the framework's UNIVERSAL and STACK-SPECIFIC blocks happen to be present (a repurposed repository, not a `kenovis add` Installation): keep UNIVERSAL unchanged and merge STACK-SPECIFIC against the real stack.

---

# Step 11 - Do Not Touch The Customer's Existing Code

The customer's implementation holds the real product, wherever in the repository it lives. Never delete, empty, or relocate it — not even into a Kenovis-preferred layout.

Rewrite only:

```
ENGINEERING/ARCHITECTURE.md
```

Describe the actual repository topology found in Step 1 — the real layout, not a placeholder. There is no requirement to introduce any particular top-level directory; document the layout the repository already uses.

---

# Step 12 - Verify By Contrast

This is not the `init-project.md` Step 11 check for zero matches of example terms — adoption doesn't start from an example, it starts from real code that must not be contradicted.

This check covers every factual claim in the document, not only the sentences authored in Steps 3-9. A section that came over from its template verbatim can carry an answer about a different product — the framework's own, left behind when the template was derived from it (`AI/memory/learnings.md` Learning-017). Such a sentence has no `[ANSWER:` marker and no code citation, which is exactly what the contrast check below is for. Apply it to `AUTOMATIONS/*.md` as well: two of the three known cases were there, describing a release process and a feedback system belonging to another company.

For every factual claim written into `ENGINEERING/*.md`, `DOMAIN/*.md` and `AUTOMATIONS/*.md`, confirm it matches something observable in the customer's actual code:

```
For each claim: does the code support it? Cite file/line, or mark it explicitly as inferred / Low confidence and unverified.
```

A claim with no code evidence and no explicit Low-confidence marker is a defect in this adoption, not an acceptable gap.

Then confirm no unanswered template question survived:

```
grep -rn "\[ANSWER:" COMPANY_OS.md DECISIONS.md DOMAIN/ PRODUCT/ ENGINEERING/ AUTOMATIONS/ AI/memory/
```

Zero matches is the passing result. Every match is a question that was never answered. Answer it, or replace it with an explicit statement that no answer exists yet — never leave the instruction, because the next agent reads it as content.

The pattern is deliberately not anchored to the start of a line — a template question can sit mid-line, and an anchored check would report those documents as clean. Brackets that are not `[ANSWER:` are not failures.

Then confirm the markers are in place:

```
grep -rl "PROJECT-SPECIFIC" . --include="*.md" --exclude-dir=.kenovis
```

Every file authored in Steps 3-9 must appear.

---

# Step 13 - Record The Adoption

Add a decision to `DECISIONS.md` recording:

- What company this repository now serves.
- The date.
- That this was an adoption (reconstructed from existing code), not an initialization.
- The stack, database engine, tenancy model and confidence levels established in Step 7.

This is the first decision of the adopted product's Kenovis-tracked history — not the first decision of the product itself, which predates this adoption.

If `.kenovis/.setup-pending` exists (this run was auto-triggered by a `kenovis add` install, per DECISIONS.md DECISION-018):

- Delete `.kenovis/.setup-pending`.
- Rewrite the root `CLAUDE.md` stub back to its passive, steady-state form (no first-session directive).
- Delete `.kenovis/.claude-md.sha256`. It records the hash of the stub the CLI last wrote — the pending one — so leaving it in place would make the next `kenovis sync` refuse to touch a `CLAUDE.md` you just legitimately rewrote. The next install/sync records it again.

---

# Rules

Never:

- Delete, empty, relocate, or rewrite any of the customer's existing code. `ENGINEERING/ARCHITECTURE.md` is the only file this command writes to describe it.
- Modify anything under `.kenovis/AI/agents/`, `.kenovis/AI/workflows/`, `.kenovis/AI/policies/`, `.kenovis/AI/templates/` or `.kenovis/AI/commands/` during adoption. If a framework file blocks adoption, that is a framework defect — fix it as its own change, not silently during this command.
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

✓ DECISIONS.md carries the decision format, the reconstruction decisions with confidence markers, and real new decisions — and no framework decisions copied in from the framework's own log.

✓ DOMAIN/ describes entities derived from real schemas/models, confirmed by a human.

✓ PRODUCT/ describes the real roadmap; FEATURES.md reflects what is actually shipped; research and competitive landscape are left empty if none exists.

✓ ENGINEERING/ describes what the customer's actual code does — verified by contrast against it, not decided fresh.

✓ AUTOMATIONS/ describes real processes, derived from evidence where it exists.

✓ AI/memory/ exists, holds vocabulary drawn from real code identifiers plus the framework's own memory rules, and carries no unpromoted inherited learnings.

✓ .gitignore is the repository's own, reconciled at most by addition — never overwritten.

✓ The customer's existing code is byte-identical to before this command ran, in its original location.

✓ Every factual claim in ENGINEERING/ and DOMAIN/ has a code citation or an explicit Low-confidence marker.

✓ No `[ANSWER: ...]` template question survives in any product-layer file.

✓ No unmarked pre-existing file was overwritten without the human confirming.

✓ Framework files are byte-identical to before.

---

# Final Principle

An adoption that overwrites what the code already decided doesn't onboard the product — it discards its history and replaces it with fiction.

The code speaks first. The human confirms. The documents follow both.
