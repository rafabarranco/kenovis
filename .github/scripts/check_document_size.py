#!/usr/bin/env python3
"""Fail when a governed document passes its size threshold with no way to shed weight.

`.kenovis/AI/policies/documentation.md` -> "Document Lifecycle: A Size Threshold,
An Archive, And An Exit". Rigor in this framework is asymmetric: cheap to add,
and until this rule existed, impossible to remove. The result was measurable --
over 2026-07-30 to 2026-08-10, four documents grew from 20 KB combined to 360 KB,
all of it on every session's mandatory reading path.

The threshold is a trigger for a decision, not a law. Crossing it means "decide
how this document sheds weight", and there are three acceptable answers: an
archive sibling, an index that bounds what is read, or a split into a directory.

WHAT THIS CHECK CAN AND CANNOT DO, per AI/memory/learnings.md Learning-021 and
Learning-022:

  - The POPULATION is exact and hardcoded below: the four documents that
    accumulate entries. Documents that describe a current state are rewritten
    rather than appended to and are deliberately not governed. Every governed
    document's size prints on every run, so growth is visible before it is a
    problem rather than after.

  - The SATISFACTION test is structural, not semantic: a document over
    threshold passes if it has a declared split, or an exemption naming the
    roadmap item that will close it. It cannot tell whether the archive is
    actually being used, or whether the named item is progressing. An exemption
    that nobody ever closes passes forever -- which is why each one prints.

Scope: this repository's CI only. The bundle ships `.kenovis/AI/`, not
`.github/`, so an Installation carries the rule as an instruction until
`kenovis check` ships (PRODUCT/ROADMAP.md item 25).
"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
THRESHOLD_BYTES = 60 * 1024

# Governed documents, and how each one is allowed to be over threshold.
# "split" names a file that must exist; "exempt" names the roadmap item that
# closes the gap. A governed document with neither, over threshold, fails.
GOVERNED = {
    "PRODUCT/ROADMAP.md": {"split": "PRODUCT/ROADMAP-ARCHIVE.md"},
    "PRODUCT/ROADMAP-ARCHIVE.md": {
        "exempt": "item 21 — the archive is off the session-initialization path by design; "
        "it is read on demand and its size is the point of the split, not a defect"
    },
    "DECISIONS.md": {
        "split": None,
        "exempt": "item 22 — DECISIONS.md becomes a directory, one file per decision, "
        "with the current file as its index. The Decision Index from item 18 already "
        "bounds what a session reads",
    },
    "AI/memory/learnings.md": {
        "exempt": "item 20 — run the learnings Review Process, promoting standing rules "
        "into policies and archiving the rest"
    },
    "CHANGELOG.md": {"exempt": "OF-13 — no archive rule exists for released changelog sections yet"},
}


def main() -> int:
    over = []
    exempted = []
    errors = []

    for rel, rule in sorted(GOVERNED.items()):
        path = ROOT / rel
        if not path.exists():
            errors.append(f"{rel}: governed document does not exist")
            continue
        size = path.stat().st_size
        print(f"  {rel}: {size / 1024:.1f} KB")
        if size <= THRESHOLD_BYTES:
            continue
        over.append(rel)

        split = rule.get("split")
        if split and (ROOT / split).exists():
            continue

        exemption = rule.get("exempt")
        if exemption:
            exempted.append(f"{rel} — exempt, closed by {exemption}")
            continue

        errors.append(
            f"{rel}: {size / 1024:.1f} KB, over the {THRESHOLD_BYTES / 1024:.0f} KB "
            f"threshold with no archive, index, or exemption naming the item that fixes it"
        )

    if exempted:
        print("\nOver threshold, exempted:")
        for line in exempted:
            print(f"  {line}")

    if errors:
        print("\nA governed document has no way to shed weight:\n")
        for error in errors:
            print(f"  {error}")
        print(
            "\nSplit it, index it, or record an exemption citing the roadmap item that "
            'will — see `.kenovis/AI/policies/documentation.md` → "Document Lifecycle: '
            'A Size Threshold, An Archive, And An Exit".'
        )
        return 1

    print(
        f"\nDocument lifecycle holds: {len(GOVERNED)} governed documents, "
        f"{len(over)} over the {THRESHOLD_BYTES / 1024:.0f} KB threshold, "
        f"each with a split or an exemption naming its item."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
