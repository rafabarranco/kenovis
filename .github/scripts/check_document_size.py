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

  - The POPULATION is exact and hardcoded below: the documents that accumulate
    entries, plus the archives they shed weight into. Documents that describe a
    current state are rewritten rather than appended to and are deliberately not
    governed. Every governed document's size prints on every run, so growth is
    visible before it is a problem rather than after.

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
# closes the gap; "archive_of" names the active document this one absorbs
# weight for. A governed document with none of the three, over threshold, fails.
#
# An archive is over threshold on purpose -- it is where the weight went, it is
# never on the session-initialization path, and no roadmap item will ever
# "close" it. Naming an item for one would be an exemption nothing can satisfy,
# which is the failure mode this rule exists to prevent. It is still listed and
# still prints its size, because an archive nobody watches is how the next 120 KB
# arrives unnoticed.
GOVERNED = {
    "PRODUCT/ROADMAP.md": {"split": "PRODUCT/ROADMAP-ARCHIVE.md"},
    "PRODUCT/ROADMAP-ARCHIVE.md": {"archive_of": "PRODUCT/ROADMAP.md"},
    "DECISIONS.md": {
        "split": None,
        "exempt": "item 22 — DECISIONS.md becomes a directory, one file per decision, "
        "with the current file as its index. The Decision Index from item 18 already "
        "bounds what a session reads",
    },
    "AI/memory/learnings.md": {"split": "AI/memory/LEARNINGS-ARCHIVE.md"},
    "AI/memory/LEARNINGS-ARCHIVE.md": {"archive_of": "AI/memory/learnings.md"},
    "CHANGELOG.md": {"split": "CHANGELOG-ARCHIVE.md"},
    "CHANGELOG-ARCHIVE.md": {"archive_of": "CHANGELOG.md"},
}


def main() -> int:
    over = []
    exempted = []
    archives = []
    errors = []

    for rel, rule in sorted(GOVERNED.items()):
        path = ROOT / rel
        if not path.exists():
            errors.append(f"{rel}: governed document does not exist")
            continue
        size = path.stat().st_size
        print(f"  {rel}: {size / 1024:.1f} KB")

        archive_of = rule.get("archive_of")
        if archive_of:
            if not (ROOT / archive_of).exists():
                errors.append(f"{rel}: archives {archive_of}, which does not exist")
            elif size > THRESHOLD_BYTES:
                archives.append(f"{rel} — archive of {archive_of}, over threshold by design")
            continue

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

    if archives:
        print("\nOver threshold, by design:")
        for line in archives:
            print(f"  {line}")

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
        f"{len(archives)} archives over threshold by design, "
        f"{len(over)} others over the {THRESHOLD_BYTES / 1024:.0f} KB threshold, "
        f"each with a split or an exemption naming its item."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
