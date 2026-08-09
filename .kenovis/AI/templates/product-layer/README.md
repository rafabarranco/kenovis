# Product-Layer Templates

Version: 1.2

---

## What this directory is

The Product layer's shape, shipped as part of the Framework layer.

An Installation created by `kenovis init` or `kenovis add` contains no Product-layer files at all — the CLI writes `.kenovis/`, the root `CLAUDE.md` stub, and nothing else (DECISIONS.md DECISION-017, DECISION-021). These templates are where the Product layer's structure comes from when `/init-project` or `/adopt-project` authors it.

Each file here maps to the path of the same name in the repository root:

```
product-layer/COMPANY_OS.md              →  COMPANY_OS.md
product-layer/DECISIONS.md               →  DECISIONS.md
product-layer/DOMAIN/*.md                →  DOMAIN/*.md
product-layer/PRODUCT/*.md               →  PRODUCT/*.md
product-layer/ENGINEERING/*.md           →  ENGINEERING/*.md
product-layer/AUTOMATIONS/*.md           →  AUTOMATIONS/*.md
product-layer/AI/memory/*.md             →  AI/memory/*.md
```

---

## How to use them

Only `/init-project` and `/adopt-project` read this directory. Do not copy a template into place by hand — both commands ask the human real questions first, then author the file from the answers. A template copied verbatim is placeholder content pretending to be a decision.

Every template's first line carries the `PROJECT-SPECIFIC` marker, so a file authored from one is recognisable as Product layer from the moment it exists. That is what makes the Collision Guard (DECISION-019) work: a Product-layer path holding a file *without* the marker is someone else's file, and neither command may overwrite it without asking.

---

## What is in a template, and what is not

Kept verbatim: the parts of each document that are identical for every product — purpose, philosophy, formats, rules for AI agents, final principles. These are framework content that happens to live in a Product-layer file, and they should survive into every Installation unchanged.

Replaced by an `[ANSWER: ...]` instruction: everything that describes one specific company. A template states what must be answered; it never contains an answer, and never contains the framework author's own.

`[ANSWER: ...]` is the only bracket form that means "unanswered question", and it is what both commands' Verify step greps for. Brackets are used for other things too, and those legitimately survive into a completed document:

- A format specification — `DOMAIN/BUSINESS_RULES.md` → "Rule Format", `PRODUCT/FEATURES.md`'s FEATURE-NNN shape, `AUTOMATIONS/release-process.md`'s `[ ]` checklists.
- An illustrative example — `PRODUCT/ROADMAP.md`'s good/bad feature framing, `ENGINEERING/ARCHITECTURE.md`'s directory tree and `POST /[resources]` sample, `ENGINEERING/DATABASE.md`'s `[tenant_key]`.
- A deliberate "nothing recorded yet" statement, in a section the product has genuinely not filled — `PRODUCT/USER_RESEARCH.md`, `PRODUCT/COMPETITIVE_LANDSCAPE.md`, an empty `DECISIONS.md`.

When adding an instruction to a template, use `[ANSWER: ...]` if and only if leaving it in place would be a defect. An anchored, bracket-shaped check cannot tell these apart — that is why the marker exists (`AI/memory/learnings.md` Learning-015).

`AI/memory/learnings.md` and `AI/memory/glossary.md` are the clearest case of the split. Their rules — the learning format, the categories, the Review Process that promotes a learning into `.kenovis/AI/policies/`, the Framework Terms section — are framework-level, and roughly twenty framework files reference them. Their recorded learnings and Domain Terms belong to one product.

---

## How a template goes wrong, and how to see it

The rule above — a template never contains an answer, and never the framework author's own — was stated from the beginning and broken anyway, in three files, for three releases. It is worth knowing what the failure looks like, because it is invisible to every check the framework runs.

These templates were derived from this repository's own completed Product layer. Deriving means deleting each Kenovis-specific answer and writing the question that produced it. Where that deletion was missed, Kenovis's own answer stayed behind — indistinguishable, in shape, from the framework-level prose that legitimately survives. `ENGINEERING/SECURITY.md` shipped "Audit System: not applicable in v1 — no backend exists", `AUTOMATIONS/release-process.md` shipped "Staging: validate the CLI before publishing", and a product with a backend, a staging server and no CLI inherited all of it as fact (`AI/memory/learnings.md` Learning-017).

Neither Verify step catches this. Both grep for `[ANSWER:`, and a leftover answer has no marker — that is exactly what makes it a leftover answer. The document passes, and reads as though someone decided it.

When adding or editing a template, read the section back and ask which product it is describing. Two questions separate the cases:

- Would this sentence be true for a product with a completely different shape — no database, or no users, or no published artifact? If not, it is an answer, and it needs an `[ANSWER: ...]` instruction instead.
- Does it name something only this framework has — a CLI, an npm package, an Installation, a `RULE-INST-*` ID, a `DECISION-NNN` from the framework's own log? Then it is this repository's content in a customer's file.

A cheap first pass over the whole directory, which is what found the three:

```
grep -rniE "in v1|not applicable|no backend|RULE-INST|npm|the CLI" . --include="*.md"
```

Every hit is either a real answer that must become a question, or framework-level prose that survives — decide which, do not skim past it. The check is a starting point, not a gate: it cannot see an answer phrased in this product's own generic-sounding words.

---

## Keeping them honest

These templates describe a shape that this framework's own repository also uses. The two can drift, and nothing enforces that they do not (DECISION-021 → Consequences names this as an accepted risk). When a Product-layer document gains or loses a section that every product would need, change the template in the same commit.
