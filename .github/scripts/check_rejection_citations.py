#!/usr/bin/env python3
"""Verify every still-inline rejection declares its own citation sweep.

A rejected item or queue row does not stop being cited elsewhere in the tree.
Item 25 (`kenovis check`) was rejected 2026-08-12; four guard docstrings kept
naming it as the plan that would eventually reach a customer, read as
scheduled, for a full round afterwards -- fixed by hand in item 37's first
round, but the class itself was never made a rule (PRODUCT/ROADMAP.md OF-22).

Detecting a stale citation automatically has no pattern: a citation of the
form "item N" or "OF-NN" asserts nothing about item N's own current status on
its face, so a guard cannot tell a live reference from a historical one
without classifying the surrounding prose -- the same reason `check_links.py`
and `check_item_findings.py`'s own docstrings both reject guards built on
classifying prose. The rejection side has a form the citation side does not:
the round that rejects an item or row already knows the id, right now, and can
run the sweep itself.

So rejecting names its own citation sweep, in the same change: a
`Citations swept:` line naming the grep command run across `company-os/` and
`framework/` and its result -- `0` is a complete answer, not a skipped step.
Requiring the declaration, not detecting the omission, is the same inversion
`check_item_findings.py` already applies to a closed item's own findings.

POPULATION: a `REJECTED` item heading or a `**Rejected**` queue-row
disposition that is still inline -- i.e. does not already end in the
`-> PRODUCT/ROADMAP-ARCHIVE.md` pointer. A rejection is closed work the moment
it is decided, and `policies/documentation.md` -> "Closed Work Is Archived,
Not Kept Inline" moves closed work to the archive on the document's own
size-triggered pass, not immediately -- so a rejection sits inline for a
while, long enough for this check to see it, before a later archive pass
compacts it to a pointer. Every rejection on record as of this check's own
introduction (2026-08-19, DECISION-052) was already compacted to a pointer by
an earlier archive pass, so the population is legitimately zero today -- the
same shape `check_item_findings.py` documents for its own empty case, and the
same grandfather precedent DECISION-035 already set for Pain/Frequency/Cost:
existing rows do not gain a field retroactively for a rule that postdates them.

Framework-layer home: `framework/policies/documentation.md` -> "A Finding Is
Fixed, Scheduled, Or Rejected" states the rule. `PRODUCT/ROADMAP.md` OF-22,
DECISION-052.

Scope: this repository's CI only, the same local-net split DECISION-026 draws
for every guard here -- the rule travels via the policy above; this script is
a net over this repository's own dogfooding and reaches no Installation.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ROADMAP = ROOT / "company-os" / "PRODUCT" / "ROADMAP.md"

ITEM_HEADING = re.compile(r"^(\d+)\. (REJECTED)\b.*$", re.MULTILINE)
ARCHIVE_POINTER = re.compile(r"→ `PRODUCT/ROADMAP-ARCHIVE\.md`\s*$")

QUEUE_ROW = re.compile(r"^\| (OF-\d{2,}) \|.*\|\s*(\*\*Rejected\*\*.*)\|\s*$", re.MULTILINE)

SWEPT = re.compile(r"Citations swept:")


def item_blocks(text: str):
    matches = list(ITEM_HEADING.finditer(text))
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        yield match.group(1), match.group(0), text[match.end():end]


def main() -> int:
    if not ROADMAP.exists():
        print(f"{ROADMAP.relative_to(ROOT)} not found.")
        return 1

    text = ROADMAP.read_text(encoding="utf-8")

    checked = 0
    pointers = 0
    errors = []

    for number, heading, body in item_blocks(text):
        if ARCHIVE_POINTER.search(heading):
            pointers += 1
            continue
        checked += 1
        if not SWEPT.search(heading + body):
            errors.append(
                f"item {number}: rejected with no `Citations swept:` line — "
                f"a stale reference elsewhere in the tree is invisible without it"
            )

    for match in QUEUE_ROW.finditer(text):
        of_id, disposition_cell = match.group(1), match.group(2)
        if ARCHIVE_POINTER.search(disposition_cell):
            pointers += 1
            continue
        checked += 1
        if not SWEPT.search(disposition_cell):
            errors.append(
                f"{of_id}: rejected with no `Citations swept:` line in its disposition cell"
            )

    print(f"  {ROADMAP.relative_to(ROOT)}: {checked} inline rejections, "
          f"{pointers} already-archived rejections skipped")

    if not checked:
        print(
            "No inline rejection to check — every rejection on record is already "
            "compacted to an archive pointer. Population is legitimately empty; this "
            "check becomes live the next time something is rejected."
        )
        return 0

    if errors:
        print("\nA rejection does not declare its own citation sweep:\n")
        for error in errors:
            print(f"  {error}")
        print(
            '\nSee `framework/policies/documentation.md` → "A Finding Is Fixed, Scheduled, '
            'Or Rejected" — rejecting names its own citation sweep, in the same change.'
        )
        return 1

    print(f"\n{checked} inline rejections all declare their own citation sweep.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
