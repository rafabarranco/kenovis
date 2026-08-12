#!/usr/bin/env python3
"""Fail when a promoted learning is not findable in the policy that claims it.

`AI/memory/learnings.md` -> "Promoted And Archived" is the index a session
reads instead of the archive: one row per closed learning, naming what it
established and which policy section now carries the rule. That index is the
only thing pointing from a bounded document to an unbounded one, so a row that
points nowhere silently undoes the promotion -- the rule is in a policy nobody
can find it in, and the story is in an archive nobody opens.

The rule being enforced: `.kenovis/AI/policies/documentation.md` -> "Closed
Work Is Archived, Not Kept Inline" -> a promoted learning closes only when the
rule lives in the policy AND the policy cites the learning id.

WHAT THIS CHECK CAN AND CANNOT DO, per AI/memory/LEARNINGS-ARCHIVE.md
Learning-021 and Learning-022:

  - The POPULATION is exact: every row of the "Promoted And Archived" table,
    and every `## Learning-NNN` heading in the archive. Both counts print. The
    two are cross-checked in both directions, so a learning archived without a
    row fails, and a row for a learning that was never archived fails too.

  - The SATISFACTION test is structural, not semantic. It checks that the named
    policy file exists, that the named section is a real heading in it, and that
    the policy cites the learning id somewhere. It cannot tell whether the
    section actually contains that learning's rule, or whether the rule is any
    good. A row rewritten to point at a real-but-wrong section passes.

Scope: this repository's CI only. The bundle ships `.kenovis/AI/`, not
`.github/`, so an Installation carries the rule as an instruction until
`kenovis check` ships (PRODUCT/ROADMAP.md item 25).
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ACTIVE = ROOT / "AI/memory/learnings.md"
ARCHIVE = ROOT / "AI/memory/LEARNINGS-ARCHIVE.md"
INDEX_HEADING = "Promoted And Archived"

# A destination cell names zero or more policy sections, in this exact form:
#   `policies/<name>.md` → "<Section Heading>"
DESTINATION = re.compile(r"`policies/([a-z-]+\.md)`\s*→\s*\"([^\"]+)\"")
ROW = re.compile(r"^\|\s*Learning-(\d+)\s*\|[^|]*\|\s*(.+?)\s*\|\s*$", re.M)


def main() -> int:
    errors = []

    active = ACTIVE.read_text()
    archive = ARCHIVE.read_text()

    if INDEX_HEADING not in active:
        print(f"{ACTIVE.name}: no '{INDEX_HEADING}' section")
        return 1

    rows = ROW.findall(active)
    archived_ids = re.findall(r"^## Learning-(\d+)", archive, re.M)

    print(f"  index rows: {len(rows)}")
    print(f"  archived learnings: {len(archived_ids)}")

    row_ids = [rid for rid, _ in rows]
    for rid in sorted(set(row_ids)):
        if row_ids.count(rid) > 1:
            errors.append(f"Learning-{rid}: {row_ids.count(rid)} index rows, expected one")
    for aid in archived_ids:
        if aid not in row_ids:
            errors.append(
                f"Learning-{aid}: archived with no row in '{INDEX_HEADING}' — "
                f"the only pointer to it is gone"
            )
    for rid in row_ids:
        if rid not in archived_ids:
            errors.append(f"Learning-{rid}: indexed as archived but no entry in {ARCHIVE.name}")

    checked_destinations = 0
    for rid, destination in rows:
        for policy_file, section in DESTINATION.findall(destination):
            checked_destinations += 1
            path = ROOT / ".kenovis/AI/policies" / policy_file
            if not path.exists():
                errors.append(f"Learning-{rid}: names {policy_file}, which does not exist")
                continue
            policy = path.read_text()
            if f"# {section}" not in policy:
                errors.append(
                    f"Learning-{rid}: {policy_file} has no section '{section}' — "
                    f"the rule was promoted somewhere else, or the heading was renamed"
                )
            if f"Learning-{rid}" not in policy:
                errors.append(
                    f"Learning-{rid}: {policy_file} never cites it, so the reasoning "
                    f"behind the rule is not one hop away"
                )

    print(f"  policy destinations checked: {checked_destinations}")

    if errors:
        print("\nA promoted learning is not findable where its index says it is:\n")
        for error in errors:
            print(f"  {error}")
        print(
            "\nSee `.kenovis/AI/policies/documentation.md` → \"Closed Work Is Archived, "
            'Not Kept Inline" — a promotion is done when the rule is in the policy and '
            "the policy cites the learning id."
        )
        return 1

    print(
        f"\nLearning promotions hold: {len(rows)} indexed, {len(archived_ids)} archived, "
        f"{checked_destinations} policy destinations each present and citing their learning."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
