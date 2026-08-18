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

Framework-layer home: `.kenovis/AI/policies/documentation.md` -> "Document
Lifecycle: A Size Threshold, An Archive, And An Exit" states the rule this
check verifies structurally: the 60 KB threshold, the three acceptable splits,
and the exemption-must-name-its-fix clause. Verified 2026-08-16
(PRODUCT/ROADMAP.md item 37).

The three acceptable answers this docstring already named -- an archive
sibling, an index that bounds what is read, or a directory split -- were
implemented as two ("split", "archive_of") until DECISIONS.md DECISION-042,
which added "index" as a real category rather than letting DECISIONS.md fall
through to a bare exemption citing closed-out work (PRODUCT/ROADMAP.md item
22, rejected by that decision).

Scope: this repository's CI only. The bundle ships `.kenovis/AI/`, not
`.github/`, so an Installation carries the rule as an instruction with no guard
behind it. An earlier version of this paragraph said that lasted "until
`kenovis check` ships (PRODUCT/ROADMAP.md item 25)"; item 25 is rejected and
`kenovis check` will not ship (DECISIONS.md DECISION-026).
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
    "company-os/PRODUCT/ROADMAP.md": {"split": "company-os/PRODUCT/ROADMAP-ARCHIVE.md"},
    "company-os/PRODUCT/ROADMAP-ARCHIVE.md": {"archive_of": "company-os/PRODUCT/ROADMAP.md"},
    "company-os/DECISIONS.md": {
        "index": "its own Decision Index bounds what a session reads at start "
        "(check_decision_index.py verifies it stays complete); a decision body "
        "is opened by a targeted read, never the whole file (DECISION-042)",
    },
    "company-os/AI/memory/learnings.md": {"split": "company-os/AI/memory/LEARNINGS-ARCHIVE.md"},
    "company-os/AI/memory/LEARNINGS-ARCHIVE.md": {"archive_of": "company-os/AI/memory/learnings.md"},
    "CHANGELOG.md": {"split": "CHANGELOG-ARCHIVE.md"},
    "CHANGELOG-ARCHIVE.md": {"archive_of": "CHANGELOG.md"},
}


def main() -> int:
    exempted = []
    archives = []
    indexed = []
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

        split = rule.get("split")
        if split and (ROOT / split).exists():
            continue

        index = rule.get("index")
        if index:
            indexed.append(f"{rel} — index-bounded: {index}")
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

    if indexed:
        print("\nOver threshold, index-bounded:")
        for line in indexed:
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
        f"{len(indexed)} index-bounded, "
        f"{len(exempted)} exempted, each naming the item that fixes it."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
