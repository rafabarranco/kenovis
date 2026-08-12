#!/usr/bin/env python3
"""Verify DECISION-024 holds: a template is a form, never a destination.

Every reference to a working template under `.kenovis/AI/templates/` from
elsewhere in the framework layer must be accompanied by the sentence that
says so. Without it, an agent following the instruction writes the produced
artifact into `.kenovis/`, which `kenovis sync` mirror-replaces — the file is
deleted on the next sync and nothing reports it (PRODUCT/ROADMAP.md Phase 1
items 12 and 14).

The templates themselves are exempt: each carries the rule in its own header,
and `product-layer/` templates are Product-layer documents that are copied out
rather than filled in place.

This check exists because DECISION-024's first sweep was done with a grep over
a verb set, so its scope was whatever that pattern happened to match. Two sites
phrased "Use:" survived it and shipped in `kenovis@0.10.0`. A pattern that
defines its own scope cannot report what it missed; this one enumerates every
reference instead.

Framework-layer home: not yet dispositioned. PRODUCT/ROADMAP.md item 37 works
the guards one at a time and this one is outstanding. Until it names a home or
records that its rule has no Framework-layer form, this check protects this
repository only.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
FRAMEWORK = ROOT / ".kenovis" / "AI"
TEMPLATES = FRAMEWORK / "templates"

# What a referencing site must carry: the rule stated in words, or a citation of
# the decision that states it. Two shapes are in use and both are correct — a
# workflow that names its destination above the form ("Record it in DECISIONS.md
# / Shaped by: ...") and a command that spells the rule out. Requiring one or the
# other keeps the check free of judgements about English it cannot make.
RULE_PATTERN = re.compile(r"form, not a destination|DECISION-024", re.IGNORECASE)

# How far after the reference the rule may appear. The established shape is a
# fenced path followed by the rule on the next non-blank line.
RULE_WINDOW_LINES = 6

TEMPLATE_REF = re.compile(r"\.kenovis/AI/templates/(?!product-layer)([A-Za-z0-9_-]+\.md)")


def working_templates() -> set[str]:
    return {p.name for p in TEMPLATES.glob("*.md")}


def main() -> int:
    known = working_templates()
    if not known:
        print(f"No working templates found under {TEMPLATES.relative_to(ROOT)}.")
        return 1

    errors = []
    unknown = []

    for path in sorted(FRAMEWORK.rglob("*.md")):
        if TEMPLATES in path.parents:
            continue  # a template states the rule in its own header
        lines = path.read_text(encoding="utf-8").splitlines()
        rel = path.relative_to(ROOT)
        for number, line in enumerate(lines, start=1):
            match = TEMPLATE_REF.search(line)
            if not match:
                continue
            if match.group(1) not in known:
                unknown.append(f"{rel}:{number}: references {match.group(1)}, which does not exist")
                continue
            window = lines[number - 1 : number + RULE_WINDOW_LINES]
            if not any(RULE_PATTERN.search(candidate) for candidate in window):
                errors.append(
                    f"{rel}:{number}: references {match.group(1)} without stating it is a form, "
                    f"not a destination (DECISION-024)"
                )

    if errors or unknown:
        print("DECISION-024 broken — a template path is offered as somewhere to write:\n")
        for error in errors + unknown:
            print(f"  {error}")
        print(
            "\nName three things separately: the artifact produced, the Product-layer "
            "document that records its durable residue, and the template that shapes it."
        )
        return 1

    print("DECISION-024 holds: every template reference states it is a form, not a destination.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
