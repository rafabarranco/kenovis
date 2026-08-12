#!/usr/bin/env python3
"""Verify every closed roadmap item declares what it found and did not fix.

`.kenovis/AI/policies/documentation.md` -> "A Finding Is Fixed, Scheduled, Or
Rejected" says a round's unfixed findings each get a disposition, and that
being described in prose is not one of them. `.kenovis/AI/commands/next.md`
Step 15 orders it: dispositions first, closing summary second, precisely so a
finding cannot die with the session that found it.

`check_future_actions.py` enforces the half of that rule with a fixed form --
`Future action:` / `Disposition:` inside a learning. Its own docstring records
why it stopped there: findings parked in `PRODUCT/ROADMAP.md` prose are "the
larger half of the same leak" and have "no mechanical form".

That is true only of *detecting* a finding inside narrative prose, which has no
pattern -- the same reason items 6 and 8 correctly rejected guards built on
classifying prose. Inverting it does have a form: do not detect the finding,
require the declaration. An omission is invisible; a missing required line is
not.

So every closed item states, in one line, either the ids it left behind or that
it left none. A round that found nothing says so and passes in five seconds. A
round that found something and skipped the queue can no longer do it by saying
nothing -- it has to write "none" and be wrong on the record.

Measured before this check existed: item 35's round found three things, queued
none of them, and wrote two into a session summary that no later round reads.
The rule it broke was already written, already loaded, and already correct
(DECISION-025). Nothing detected the omission, which is what made it repeatable.

WHAT THIS CHECK CAN AND CANNOT DO, per AI/memory/learnings.md Learning-021 and
Learning-022:

  - The POPULATION is exact and structural: every `NN. DONE` item in
    `PRODUCT/ROADMAP.md` whose body is a real narrative rather than an archive
    pointer. Archive pointers are excluded by their own fixed literal form, not
    by a length heuristic. The count prints on every run. Archived items are out
    of scope on purpose -- they were closed before this rule existed, and
    rewriting closed narratives to satisfy a later guard is the retroactive
    editing the archive rule forbids.

  - The CLASSIFIER is trivial and honest about being shallow: the declaration
    counts when it names at least one `OF-NN` id, or states none. It cannot tell
    a complete declaration from a plausible one -- an item that found four
    things and declares one passes. It cannot read the round's mind, and no
    check can. What it removes is the silent path, which is the one that was
    actually being taken.

  - Every declared id must exist in the Open Findings queue. A declaration
    naming `OF-99` fails: citing an id that was never written is the same defect
    wearing a citation.

Framework-layer home: `.kenovis/AI/policies/documentation.md` -> "A Finding Is
Fixed, Scheduled, Or Rejected" states the rule; `.kenovis/AI/commands/next.md`
Step 15 orders it (dispositions first, summary second); and
`.kenovis/AI/templates/product-layer/PRODUCT/ROADMAP.md` -> "Open Findings"
ships both to every Installation at initialization. Verified 2026-08-13
(PRODUCT/ROADMAP.md item 37).

Scope: this repository's CI only. The bundle ships `.kenovis/AI/`, not
`.github/`, so a customer Installation runs this script never and carries the
rule always. That is the intended split, not a gap -- the rule is what travels
and this file is a local net over this repository's own dogfooding
(DECISIONS.md DECISION-026). An earlier version of this paragraph said the gap
closed "until `kenovis check` ships (PRODUCT/ROADMAP.md item 25)"; item 25 is
rejected and `kenovis check` will not ship.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ROADMAP = ROOT / "PRODUCT" / "ROADMAP.md"

ITEM_HEADING = re.compile(r"^(\d+)\. (DONE|SCHEDULED)\b.*$", re.MULTILINE)
ARCHIVE_POINTER = re.compile(r"→ `PRODUCT/ROADMAP-ARCHIVE\.md`\s*$")

DECLARATION = re.compile(r"^Findings this item did not fix:(.*)$", re.MULTILINE)
OF_ID = re.compile(r"\bOF-(\d{2})\b")
NONE_STATED = re.compile(r"\bnone\b", re.IGNORECASE)

QUEUE_ROW = re.compile(r"^\| (OF-\d{2}) \|", re.MULTILINE)


def item_blocks(text: str):
    """(number, state, heading_line, body) per item. The headings are the population."""
    matches = list(ITEM_HEADING.finditer(text))
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        yield match.group(1), match.group(2), match.group(0), text[match.end():end]


def main() -> int:
    if not ROADMAP.exists():
        print(f"{ROADMAP.relative_to(ROOT)} not found.")
        return 1

    text = ROADMAP.read_text(encoding="utf-8")
    queued = {row for row in QUEUE_ROW.findall(text)}
    if not queued:
        print("No Open Findings queue rows found — the corpus is empty, which is not a pass.")
        return 1

    checked = 0
    pointers = 0
    declared_ids = 0
    errors = []

    for number, state, heading, body in item_blocks(text):
        if state != "DONE":
            continue
        if ARCHIVE_POINTER.search(heading):
            pointers += 1
            continue

        checked += 1
        where = f"item {number}"

        declaration = DECLARATION.search(body)
        if not declaration:
            errors.append(
                f"{where}: closed with no `Findings this item did not fix:` line — "
                f"an omission here is indistinguishable from having found nothing"
            )
            continue

        stated = declaration.group(1)
        ids = OF_ID.findall(stated)
        if not ids and not NONE_STATED.search(stated):
            errors.append(
                f"{where}: declaration names no `OF-NN` id and does not state none"
            )
            continue

        for suffix in ids:
            of_id = f"OF-{suffix}"
            declared_ids += 1
            if of_id not in queued:
                errors.append(
                    f"{where}: declares {of_id}, which has no row in the Open Findings queue"
                )

    print(f"  {ROADMAP.relative_to(ROOT)}: {checked} closed items with a narrative, "
          f"{pointers} archive pointers skipped, {len(queued)} queue rows")

    if not checked:
        print("No closed items with a narrative — nothing to check, which is not a pass.")
        return 1

    if errors:
        print("\nA closed item does not say what it left behind:\n")
        for error in errors:
            print(f"  {error}")
        print(
            "\nEvery closed item states the ids it queued or that it queued none — see "
            '`.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, '
            'Or Rejected" and `.kenovis/AI/commands/next.md` Step 15. Write the '
            "dispositions first, then the summary."
        )
        return 1

    print(
        f"\nClosed items hold: {checked} narratives, each declaring what it left "
        f"behind, {declared_ids} declared ids all present in the queue."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
