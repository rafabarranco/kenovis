#!/usr/bin/env python3
"""Verify every closed roadmap item, and the live round pointer, declare what
they found and did not fix.

`framework/policies/documentation.md` -> "A Finding Is Fixed, Scheduled, Or
Rejected" says a round's unfixed findings each get a disposition, and that
being described in prose is not one of them. `framework/commands/next.md`
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

A THIRD CHECK, THE REVERSE DIRECTION, per PRODUCT/ROADMAP.md OF-100 and
DECISION-055:

  Both populations above verify a closed item declares the ids it left behind
  -- the forward direction. Neither ever checks the reverse: that a queue row
  citing `**Scheduled -- item N**` gets corrected to `Fixed` once item N
  actually closes. That drift recurred five confirmed times in six days
  (OF-01, OF-42, OF-69, OF-92, OF-96), none caught mechanically, all found by
  a human re-reading the queue for an unrelated reason.

  DECISION-055 names the citation form this check trusts, so a guard can
  regex it safely: the queue row's own disposition-column citation, not a new
  required declaration on the item side. The item-side phrasing was
  confirmed too inconsistent to regex ("Closes OF-01", "closing OF-96", no
  phrase at all in OF-42's own citing item) -- but every row that reaches
  `Scheduled` is already written `**Scheduled -- item N**` from DECISION-025
  onward, which is uniform enough to trust directly. So: for every queue row
  whose own last bolded disposition word is still `Scheduled`, read the item
  number cited right after it, and fail if that item is already `DONE`.

TWO POPULATIONS, BOTH REQUIRED, per PRODUCT/ROADMAP.md OF-21 and DECISION-051:

  1. ITEM-SCOPED (original). Every `NN. DONE` item in `PRODUCT/ROADMAP.md`
     whose body is a real narrative rather than an archive pointer must carry
     `Findings this item did not fix:`.

  2. ROUND-SCOPED (added for OF-21/OF-61). The live `Next:` pointer -- the
     last block in the document that contains one -- must carry
     `Findings this round did not fix:` (or `... this pass ...`) alongside it.
     This is the same declaration, moved to the one artifact every round
     writes regardless of what it closed: a round that ran `/architect`,
     `/analyze`, no command at all, or a `/next` round that reached its
     objective and stopped without closing it, owed a disposition under the
     original rule and was invisible to a check bound to closed items alone.
     It also cannot go structurally empty the way the item-scoped population
     can once a roadmap is fully archived (OF-61): the live pointer is never
     itself a closed, archived entry while it is current.

WHAT THIS CHECK CAN AND CANNOT DO, per AI/memory/learnings.md Learning-021 and
Learning-022:

  - Both populations are exact and structural. Item headings are matched by
    their own fixed form; the live pointer is the last `---`-delimited block
    in the document that contains a `**Next:**` line. Archive pointers are
    excluded by their own fixed literal form, not by a length heuristic.
    Archived items are out of scope on purpose -- they were closed before this
    rule existed, and rewriting closed narratives to satisfy a later guard is
    the retroactive editing the archive rule forbids.

  - The CLASSIFIER is trivial and honest about being shallow, for both
    populations: the declaration counts when it names at least one `OF-NN` id,
    or states none. It cannot tell a complete declaration from a plausible one
    -- an item or round that found four things and declares one passes. It
    cannot read the round's mind, and no check can. What it removes is the
    silent path, which is the one that was actually being taken.

  - Every declared id must exist in the Open Findings queue. A declaration
    naming `OF-99` fails: citing an id that was never written is the same defect
    wearing a citation. This is why a closed queue row is compacted to one line
    rather than removed when it is archived -- the id has to stay resolvable.

  - THE ITEM-SCOPED POPULATION CAN EMPTY, AND THAT IS THE OTHER RULE WORKING.
    An empty population used to be a hard failure, on the reasoning that a
    corpus with no closed items is a corpus that was never written. The
    archive pass of 2026-08-13 (PRODUCT/ROADMAP.md item 42 part 1) proved that
    wrong by running the archive rule to completion: all four remaining
    inline narratives moved out, `checked` fell to 0, and this check failed a
    repository that had done exactly what `framework/policies/documentation.md`
    -> "Closed Work Is Archived, Not Kept Inline" requires. So the empty case
    splits: no closed items and no pointers is a missing corpus and still
    fails; no closed items with pointers present is the archive rule having
    completed, and passes on that population while still requiring the
    round-scoped check below to hold -- the round-scoped population is what
    keeps this guard live once the item-scoped one goes structurally empty.

Framework-layer home: `framework/policies/documentation.md` -> "A Finding Is
Fixed, Scheduled, Or Rejected" states both the item-scoped and round-scoped
rule; `framework/commands/next.md` Step 13 -> "Write The Next Pointer, Or
Write That There Is None" orders the round-scoped line, Step 15 orders the
item-scoped one (dispositions first, summary second); and
`framework/templates/product-layer/PRODUCT/ROADMAP.md` -> "Open Findings"
ships all of it to every Installation at initialization. Verified 2026-08-13
(PRODUCT/ROADMAP.md item 37); extended 2026-08-19 (OF-21, OF-61, DECISION-051);
extended again 2026-08-21 (OF-100, DECISION-055) with the reverse-direction
check above.

Scope: this repository's CI only. The bundle ships `framework/`, not
`.github/`, so a customer Installation runs this script never and carries the
rule always. That is the intended split, not a gap -- the rule is what travels
and this file is a local net over this repository's own dogfooding
(DECISIONS.md DECISION-026).
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ROADMAP = ROOT / "company-os" / "PRODUCT" / "ROADMAP.md"

ITEM_HEADING = re.compile(r"^(\d+)\. (DONE|SCHEDULED)\b.*$", re.MULTILINE)
ARCHIVE_POINTER = re.compile(r"→ `PRODUCT/ROADMAP-ARCHIVE\.md`\s*$")

DECLARATION = re.compile(r"^Findings this item did not fix:(.*)$", re.MULTILINE)
ROUND_DECLARATION = re.compile(r"^Findings this (?:round|pass) did not fix:(.*)$", re.MULTILINE)
NEXT_POINTER = re.compile(r"^\*\*Next:\*\*", re.MULTILINE)
BLOCK_SEP = re.compile(r"\n---\n")

OF_ID = re.compile(r"\bOF-(\d{2,})\b")
NONE_STATED = re.compile(r"\bnone\b", re.IGNORECASE)

QUEUE_ROW = re.compile(r"^\| (OF-\d{2,}) \|", re.MULTILINE)

STATUS_WORD = re.compile(r"\*\*(Fixed|Open|Rejected|Deferred|Scheduled)\b")
ITEM_CITATION = re.compile(r"item\s*(\d+)")


def item_blocks(text: str):
    """(number, state, heading_line, body) per item. The headings are the population."""
    matches = list(ITEM_HEADING.finditer(text))
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        yield match.group(1), match.group(2), match.group(0), text[match.end():end]


def live_pointer_block(text: str):
    """The last `---`-delimited block that contains a `**Next:**` line, or None.

    Round blocks accumulate chronologically but are not the only thing in the
    document -- unrelated sections (e.g. this rule's own origin story) can sit
    after the last round block without containing a pointer. Searching from
    the end for the first block that has one finds the live pointer regardless
    of what follows it structurally.
    """
    blocks = BLOCK_SEP.split(text)
    for block in reversed(blocks):
        if NEXT_POINTER.search(block):
            return block
    return None


def queue_row_bodies(text: str):
    """(id, body) per Open Findings queue row -- the population OF-100's own
    reverse check reads its citations from."""
    matches = list(QUEUE_ROW.finditer(text))
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        yield match.group(1), text[match.end():end]


def check_reverse_citations(text: str, closed_items: set, errors: list) -> int:
    """OF-100 / DECISION-055: a row whose own last bolded status is still
    `Scheduled` must name an item that has not itself already closed. Only the
    row's OWN most recent status word counts -- a row later corrected to
    `Fixed`/`Rejected`/etc. is not this drift, whatever its history quotes.
    """
    checked = 0
    for row_id, body in queue_row_bodies(text):
        matches = list(STATUS_WORD.finditer(body))
        if not matches:
            continue
        last = matches[-1]
        if last.group(1) != "Scheduled":
            continue
        checked += 1
        window = body[last.end():last.end() + 120]
        item_match = ITEM_CITATION.search(window)
        if not item_match:
            continue
        item_number = item_match.group(1)
        if item_number in closed_items:
            errors.append(
                f"{row_id}: disposition still reads Scheduled — item {item_number}, "
                f"but item {item_number} is closed (DONE) — the row was never "
                f"corrected to Fixed (PRODUCT/ROADMAP.md OF-100, DECISION-055)"
            )
    return checked


def check_declaration(where: str, declaration_text: str, queued: set, errors: list) -> int:
    """Validate one declaration's stated ids against the queue. Returns ids declared."""
    ids = OF_ID.findall(declaration_text)
    if not ids and not NONE_STATED.search(declaration_text):
        errors.append(f"{where}: declaration names no `OF-NN` id and does not state none")
        return 0
    declared = 0
    for suffix in ids:
        of_id = f"OF-{suffix}"
        declared += 1
        if of_id not in queued:
            errors.append(f"{where}: declares {of_id}, which has no row in the Open Findings queue")
    return declared


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

        declared_ids += check_declaration(where, declaration.group(1), queued, errors)

    print(f"  {ROADMAP.relative_to(ROOT)}: {checked} closed items with a narrative, "
          f"{pointers} archive pointers skipped, {len(queued)} queue rows")

    if not checked and not pointers:
        print("No closed items at all — the corpus is missing, which is not a pass.")
        return 1

    if not checked:
        print(
            f"Every closed item ({pointers}) is an archive pointer. The item-scoped "
            "population is legitimately empty — that is the archive rule having run to "
            "completion, not a missing corpus. Falling through to the round-scoped check "
            "below, which is what keeps this guard live from here (PRODUCT/ROADMAP.md OF-61)."
        )

    pointer_block = live_pointer_block(text)
    if pointer_block is None:
        errors.append(
            "no `**Next:**` pointer found anywhere in the document — "
            "`commands/next.md` Step 13 requires every round to write one"
        )
    else:
        round_declaration = ROUND_DECLARATION.search(pointer_block)
        if not round_declaration:
            errors.append(
                "the live `Next:` pointer has no `Findings this round did not fix:` "
                "(or `... this pass ...`) line alongside it — round-scoped findings are "
                "invisible without it (PRODUCT/ROADMAP.md OF-21)"
            )
        else:
            declared_ids += check_declaration(
                "live Next: pointer", round_declaration.group(1), queued, errors
            )

    closed_items = {number for number, state, heading, body in item_blocks(text) if state == "DONE"}
    reverse_checked = check_reverse_citations(text, closed_items, errors)
    print(f"  reverse check: {reverse_checked} queue row(s) currently Scheduled, "
          f"cross-checked against {len(closed_items)} closed item(s)")

    if errors:
        print("\nA closed item or the live round pointer does not say what it left behind:\n")
        for error in errors:
            print(f"  {error}")
        print(
            "\nEvery closed item states the ids it queued or that it queued none, and the "
            "live `Next:` pointer does the same for its own round — see "
            '`framework/policies/documentation.md` → "A Finding Is Fixed, Scheduled, '
            'Or Rejected" and `framework/commands/next.md` Step 13 and Step 15.'
        )
        return 1

    print(
        f"\nClosed items and the live round pointer hold: {checked} item narratives plus "
        f"the round-scoped declaration, each declaring what it left behind, {declared_ids} "
        f"declared ids all present in the queue. {reverse_checked} Scheduled row(s) all "
        f"cite an item that has not yet closed."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
