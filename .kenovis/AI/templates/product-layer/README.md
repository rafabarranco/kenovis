# Product-Layer Templates

Version: 1.0

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

Replaced by a bracketed instruction: everything that describes one specific company. A template states what must be answered; it never contains an answer, and never contains the framework author's own.

`AI/memory/learnings.md` and `AI/memory/glossary.md` are the clearest case of the split. Their rules — the learning format, the categories, the Review Process that promotes a learning into `.kenovis/AI/policies/`, the Framework Terms section — are framework-level, and roughly twenty framework files reference them. Their recorded learnings and Domain Terms belong to one product.

---

## Keeping them honest

These templates describe a shape that this framework's own repository also uses. The two can drift, and nothing enforces that they do not (DECISION-021 → Consequences names this as an accepted risk). When a Product-layer document gains or loses a section that every product would need, change the template in the same commit.
