# Documentation Policy

Version: 3.16

---

# Purpose

This document defines how knowledge is documented inside this repository.

Documentation is a first-class artifact.

If knowledge exists only inside conversations or code, it is considered lost.

Every important decision should survive the people—and the AI models—that created it.

---

# Core Philosophy

Code explains **how**.

Documentation explains **why**.

Future engineers should not need to reverse engineer decisions.

---

# Documentation Principles

Documentation must be:

- Accurate
- Concise
- Actionable
- Versionable
- Easy to maintain

Documentation that is no longer true is worse than no documentation.

---

# Single Source of Truth

Every piece of knowledge should have exactly one authoritative location.

Avoid duplicated documentation.

**This applies to the policies themselves, and that is the case it gets missed in.** Before adding a section to a policy, read the section headings of its siblings — the whole set is small, and the rule being written is usually general enough to already live under a heading that does not sound like it. Two copies of a rule do not stay identical: each is edited by whoever is looking at that file, neither reader opens the other, and the policy set ends up contradicting itself with both halves reading as authoritative. When the rule does already exist, cite that section and add only what is genuinely new to the narrower context.

Example:

Business rules belong in:

company-os/DOMAIN/

Architecture belongs in:

company-os/ENGINEERING/

Product strategy belongs in:

company-os/PRODUCT/

AI behaviour belongs in:

.kenovis/AI/

---

# Documentation Hierarchy

The repository should be understood from the top down.

Company

↓

Product

↓

Domain

↓

Engineering

↓

Implementation

Do not document implementation details in business documents.

---

# When Documentation Must Be Updated

Documentation is mandatory when changing:

- Architecture
- Business rules
- Product behaviour
- Security model
- API contracts
- Database schema
- Deployment process
- Development workflow

If the behaviour changed, the documentation probably should too.

---

# Decision Documentation

Every important decision should answer:

Context

↓

Problem

↓

Options

↓

Decision

↓

Consequences

↓

Date

↓

Owner

Prefer documenting decisions immediately.

Never rely on memory.

---

# Architecture Documentation

Document:

- Layer responsibilities
- Module boundaries
- Technology choices
- Communication patterns
- Trade-offs

Do not document implementation details.

Document reasoning.

---

# Domain Documentation

Document:

- Business entities
- Relationships
- Business rules
- Invariants
- Terminology

The domain should be understandable without reading code.

---

# Product Documentation

Document:

- Vision
- Roadmap
- Features
- User value
- Success metrics

Product documentation should explain:

Why does this feature exist?

---

# API Documentation

Every public API should describe:

Purpose.

Authentication.

Inputs.

Outputs.

Errors.

Examples.

Version.

Avoid undocumented endpoints.

---

# Database Documentation

Document:

- Entity purpose
- Relationships
- Constraints
- Migration strategy
- Important indexes

Future schema changes should be understandable.

---

# AI Documentation

Document:

- Agent responsibilities
- Policies
- Workflows
- Prompts
- Memory

AI behaviour should be deterministic and reproducible.

---

# README

Every repository should contain a README that answers:

What is this?

Why does it exist?

How do I start?

Where can I learn more?

Do not assume prior knowledge.

---

# Change Log

Important releases should document:

- New features
- Breaking changes
- Bug fixes
- Migration requirements

Users should know what changed.

---

# Examples

Prefer examples over explanations.

Good documentation demonstrates.

Do not describe complex workflows without examples.

---

# Visual Documentation

Use diagrams when they simplify understanding.

Examples:

Architecture.

Entity relationships.

Event flows.

Deployment.

Do not create diagrams that become harder to maintain than the code.

---

# Documentation Style

Write:

Short sentences.

Clear language.

Business terminology.

Avoid unnecessary jargon.

Avoid marketing language.

Documentation is for understanding.

Not promotion.

---

# AI Responsibilities

Whenever AI changes:

Architecture

↓

Update company-os/ENGINEERING/

Business Rules

↓

Update company-os/DOMAIN/

Roadmap

↓

Update company-os/PRODUCT/

Major Decision

↓

Update company-os/DECISIONS.md

Never leave documentation outdated after implementation.

---

# Document Lifecycle: A Size Threshold, An Archive, And An Exit

Documentation rigor in this framework is asymmetric: cheap to add, and until now impossible to remove. `company-os/DECISIONS.md` states the no-remove rule explicitly, and it is right to — the reasoning trail is the value. But a rule that only ever adds produces documents that every session pays for and nobody reads whole.

So the governed documents — the ones that accumulate entries rather than describing a current state — carry a lifecycle:

**Governed documents.** `company-os/DECISIONS.md`, `company-os/PRODUCT/ROADMAP.md`, `company-os/AI/memory/learnings.md`, `CHANGELOG.md`. Documents that describe a current state (`company-os/COMPANY_OS.md`, `company-os/DOMAIN/`, `company-os/ENGINEERING/`) are rewritten rather than appended to, and are not governed by this section.

**Threshold: 60 KB.** Past it, a governed document must have a split — an archive sibling, an index that bounds what is read, or a directory. The number is a trigger for a decision, not a law: crossing it means "decide how this document sheds weight", not "delete something".

**Index-bounded is a third permanent answer, not a waypoint to one of the other two.** A document qualifies when it carries its own bounded index — read at session start, separately enforced for completeness — and every other reader of it retrieves one entry at a time by a targeted read (find the heading, read a bounded range), never the whole file. `company-os/DECISIONS.md` is the instance: `check_decision_index.py` bounds the index, `.kenovis/AI/SYSTEM.md` → "Context Loading Rules" requires the targeted-read discipline for a body. What this buys over a split into many files is the same retrieval property with none of a split's migration cost to an Installation that already has one file — see company-os/DECISIONS.md DECISION-042. A document that does not meet both conditions still needs an archive sibling or a directory split; index-bounding is not a lighter-weight substitute available on request.

**The exit.** Closed entries move to the archive verbatim, per the section above. Superseded entries move rather than being marked in place, so the active document holds what is live and the archive holds the trail.

**An exemption is allowed and must name its fix.** A governed document may sit over the threshold while the work that splits it is scheduled — but the exemption cites the roadmap item that closes it. An exemption with no item is the failure this whole rule exists to prevent, wearing a permission slip.

**An archive is over the threshold on purpose, and is not exempted — it is classified.** An archive is where the weight went; it is never on the session-initialization path, and no roadmap item will ever close it. Giving one an exemption would mean naming an item that can never be satisfied, which is the same failure in the opposite direction. It stays listed and its size stays printed, because an archive nobody watches is how the next hundred kilobytes arrive unnoticed.

Nothing in an Installation enforces this mechanically — the rule holds because it is loaded on every task, which is the enforcement this framework has. The origin repository additionally backs it with a check in its own build, which is a local net over its own dogfooding and reaches nobody else. See `.kenovis/AI/policies/architecture.md` → "An Improvement Lands Where The Work Is Loaded".

---

# Closed Work Is Archived, Not Kept Inline

A document that records work — a roadmap, a decision log, a learnings file — is append-only in practice: entries are added and never removed, because the reasoning trail is the point.

That is correct, and it has a cost nobody pays until it is large: finished work loads on every session at the same price as work that is still pending. In this framework's own repository the completed items were 90% of the roadmap and 100% of them were read at every bootstrap.

So a document that accumulates closed entries splits:

- Closed entries move to a sibling archive — `company-os/PRODUCT/ROADMAP-ARCHIVE.md` for the roadmap, `company-os/AI/memory/LEARNINGS-ARCHIVE.md` for the learnings, `CHANGELOG-ARCHIVE.md` for the changelog — **verbatim**. Nothing is summarised away; the archive exists to preserve the trail, not to compress it.
- The active document keeps one line per closed entry and a pointer to the archive.
- The archive is read on demand. It is never on the session-initialization path. "On demand" is not a permission, it is a moment: `.kenovis/AI/SYSTEM.md` → "Context Loading Rules" names it — opened when a round cites the closed row, builds on it, or needs the reasoning behind its pointer, the same discipline that document already requires of a `company-os/DECISIONS.md` body. A pointer left unopened by the round citing it is a destination nothing consults, which is the exact failure "An Instruction Is Reachable, And Its Sink Is Read" describes below.
- An entry is archived only when it is genuinely closed. An open finding it raised moves to the findings queue first — see the section below. Archiving a document that still holds the only copy of an unresolved finding is how a visible backlog becomes an invisible one.

Create the archive when the first entry closes, not in advance. An empty archive is noise.

**The pass runs on a trigger, not on someone noticing.** Declaring a split satisfies a size rule once and forever, so a document that has already been archived once is free to grow back past the threshold with nothing complaining — which is exactly what happened here: an archived roadmap returned to 2.7× its threshold in one day, and every round read the whole thing. So the trigger is a step of the round that appends: **a round that writes to an archiving document checks that document's size before it closes, and runs the pass if it is over.** Not a separate cleanup task, and not a size somebody notices late.

**A learning closes when its rule has been promoted.** `company-os/AI/memory/learnings.md` documents a Review Process that moves a recurring lesson into the policy that should enforce it. "Move" is the whole instruction: the rule is written into the policy in that policy's voice, the policy cites the learning id so the reasoning stays one hop away, and the entry then closes and is archived like any other closed entry. A rule left in both places is loaded twice — once per task from the policy, once per session from the learnings — and only one of those two documents is bounded.

**A closed entry is not only a numbered item.** The rule above says "entries", and an entry is anything the document accumulates and then finishes with. Three kinds are routinely missed because they do not look like items:

- **A findings queue's closed rows.** A row whose disposition is `Fixed` or `Rejected` is finished; only `Open`, `Deferred` and `Scheduled` are live. Measured in this framework's own repository on 2026-08-13: the queue had reached 44% of the active roadmap while every archive pass moved items and left the queue untouched, because the archive rule was written before the queue existed and never named it. A rule that predates a section does not cover it by implication.
- **Superseded planning prose.** A "what to do next" block that a later block replaces is closed the moment it is superseded. Keeping it inline under a "kept for the trail" note keeps the trail and pays for it on every session; the archive is what "kept for the trail" is supposed to mean.
- **A rejected entry.** A rejection is closed work. Its reasoning must survive so the option is not re-proposed — which is what the archive is for, not what the active document is for.

**Archiving a queue row compacts it; it does not remove it.** Ids are cited by name from closed entries and from across the framework layer, so the row stays as one line — id, the finding in a clause, its disposition, and the pointer — and the reasoning goes to the archive. Deleting the row instead breaks every citation of it, silently.

**A changelog section closes on release, so "closed" is not the trim rule there.** Every released section is closed the moment it ships, and archiving on that alone would leave a changelog holding only `[Unreleased]` — useless to the one reader it has, someone deciding whether to upgrade. So the changelog keeps `[Unreleased]` plus the **two most recent released versions** inline, which is what an upgrade from the previous version needs, and archives the rest. The trim runs as a step of cutting a release, not as a separate cleanup: a document that is only trimmed when someone notices its size is a document that gets noticed late.

---

# A Finding Is Fixed, Scheduled, Or Rejected

**A finding is anything the work surfaced: an improvement, a bug, technical debt, a decision, a lesson, an open question.** Not only what a `/next` round found while closing an item. The kind determines which file it lands in — `CLAUDE.md` → "Nothing Stays In The Thread" holds that routing table — and every kind lands somewhere.

**A finding is something the work discovered. A supplied artifact — a document, a decision, an instruction a human hands over directly, complete — is not a finding about itself, and giving it a disposition is how it leaves with the thread instead of landing on disk.** Write a supplied artifact down immediately, in the destination its own kind already names in the routing table above; do not file a queue row asking that someone create what is already in hand. Collapsing the two also inverts the founder/AI split this framework exists to hold — it returns a human's own material to them as a question to answer, rather than the AI doing the one step available to it: recording what it was given. (`company-os/AI/memory/learnings.md` Learning-028; `company-os/PRODUCT/ROADMAP.md` OF-40.)

**The population is the session, not the item.** Any session that finds something owes it a disposition: one that closed a roadmap item, one that ran `/feature` or `/architect` or no command at all, one that only answered a question. Binding this rule to closed items was how findings born in conversation, in a decision body, or inside an item still open stayed invisible — three failures already on record, all found by a human asking rather than by the system.

A round finds more than it fixes. That is healthy — a round that only ever found what it had budgeted for would not be looking.

What is not healthy is the third outcome: a finding described in the narrative of the item that was open at the time, with no id, no priority and no owner. It reads as handled. It is not. Once that item closes, and certainly once it is archived, the finding exists only in prose that nothing reads to decide what to do next.

So every finding a round does not fix gets exactly one disposition, stated where the round's work is recorded:

**Fixed** — done in this round. Say so, with the evidence.

**Scheduled** — it becomes an entry with an id in `company-os/PRODUCT/ROADMAP.md`: the finding, its source, and enough of its shape to be picked up by someone with less context than the person who wrote it. A scheduled item and a queued finding are different things — a scheduled item is dimensioned work, a queued finding is a candidate that is not dimensioned yet — and both live in that document.

**Rejected** — decided against, with the reason, recorded so it is not proposed again. This is a first-class outcome, not a failure. Most findings should not become work.

**Rejecting names its own citation sweep, in the same change.** A rejected item does not stop being cited — the surviving prose keeps narrating it as live or planned, which is a dead plan reading as a scheduled one. So a round that rejects an item or a queue row also runs `grep -rn "item N\b"` / `grep -rn "OF-NN\b"` (as applicable) across `company-os/` and `framework/`, corrects every hit it finds, and states doing so on the record: `Citations swept:` naming the command and its result — `0` is a complete answer, not a skipped step. A rejection with no `Citations swept:` line is the same omission `Findings this item did not fix:` already exists to prevent, aimed at a rejection's own reach instead of a round's own findings. (`company-os/PRODUCT/ROADMAP.md` OF-22.)

**Being described in prose is not a disposition.**

`Open` is a real disposition and also the easiest place to hide. A finding whose executor is not the AI — a decision only the human can make, work that needs an external party, a number nobody has — sits in the queue in perfect compliance with this rule and moves for no one. So an `Open` finding that the AI cannot execute names two more things: **who executes it, and what input they need to decide.** Without those, the queue becomes the new place where things stay still, with an id.

**A finding is checked against `company-os/PRODUCT/ROADMAP.md` before it is dispositioned, and that check has two outcomes, never zero.** Either something already covers it — a scheduled item or a queue row — and the finding cites that id and adds what this session learned to it; or nothing does, and it enters the queue with a new id. Writing without looking is how one defect acquires three ids. Looking without writing is how a session concludes "that is already known" about something that is on no document at all. Both fail the same way: the roadmap stops being the complete representation of known future work, which is the one property that makes it worth reading.

**Recording is not planning.** A finding written to a Product-layer file and absent from the roadmap has been remembered, not scheduled — and remembering is what a thread already does badly. The disposition is not complete until the roadmap shows it. (DECISION-029; `company-os/AI/memory/LEARNINGS-ARCHIVE.md` Learning-032.)

**An `Open` finding is dimensioned where it is written, or it is prose with an id.** The row carries **Pain, Frequency and Cost** — the terms the roadmap's own priority formula divides — in one line. A term that is unknown is written as unknown; that ranks, and it names the first output of picking the finding up. A term simply left out does not rank, and the finding drops silently out of every selection that follows, which is indistinguishable from never having recorded it.

**This rule requires the three terms; it does not define them, and does not restate the formula they feed.** `Priority = (Customer Pain × Frequency × Business Impact) / Implementation Cost` is defined once, in the Product-layer template every Installation authors at setup — `framework/templates/product-layer/PRODUCT/ROADMAP.md` → "Features Backlog Philosophy" (an Installation reads its own copy at `company-os/PRODUCT/ROADMAP.md`, since `sync` never rewrites what setup authored). Stating the formula here too would duplicate a definition this same policy's own "Single Source of Truth" section already forbids; citing it instead means the two cannot drift apart the way a duplicate would. (`company-os/PRODUCT/ROADMAP.md` OF-67.)

**An `Open` finding also names the role that owns analysing it, from the existing Agent Roster — not a taxonomy invented per finding.** Routing by destination file (`company-os/PRODUCT/ROADMAP.md`, `company-os/DECISIONS.md`, `company-os/AI/memory/learnings.md`, `company-os/DOMAIN/`, `company-os/ENGINEERING/`) says where a disposition is recorded; it says nothing about who decides it, and a security finding, an architectural finding and a typo were receiving identical treatment from whichever role happened to be active in the thread. Which roles own which kind of finding is a fact about this specific product's own Agent Roster and the areas it actually maintains — it belongs in `company-os/ENGINEERING/ARCHITECTURE.md`, not in this framework-layer rule, the same split DECISION-026 already draws between a rule and the product-specific fact it governs. A role picked because nothing else was considered is not a disposition; it is the failure this clause exists to stop. Existing rows written before this rule do not gain the field retroactively; the cost of picking each one up again is not owed for a field that did not exist when they were written — the same precedent `company-os/PRODUCT/ROADMAP.md` OF-66 already set for Pain, Frequency and Cost. (DECISION-035, OF-31, OF-55.)

**An `Open` finding is refined by the row that has waited longest, not by whichever one a round happens to reopen.** `company-os/PRODUCT/OPERATING_MODEL.md` §1 states the chain as `DISCOVERY → ANALYZE → CLASSIFY → REFINE → PLAN → ROADMAP`; a disposition alone only builds `DISCOVERY → a row`, and an `Open` row that never changes again is REFINE never happening — the exact gap `company-os/PRODUCT/ROADMAP.md` OF-32 named as "the chain stops at capture." So every round that reads the Open Findings queue in Step 3 also refines exactly one row: **the `Open` row least recently touched — the row whose own most recent `Refined <date>` marker (or, for a row never yet refined, its original discovery date) is oldest — tied rows broken first by fewest `Refined <today's date>` markers the row already carries (ascending), then by lowest id.** The sub-day tiebreak matters once a full sweep leaves every `Open` row tied on the same calendar date, which is a real condition and not hypothetical — `company-os/PRODUCT/ROADMAP.md` OF-102 is the recorded instance, `company-os/DECISIONS.md` DECISION-057 the correction — and without it the id-only tiebreak re-selects the same row for the rest of that day with nothing new to report. Counting today's own `Refined` markers costs nothing new: it reads the same prose DECISION-054 already reads. **Once both stages tie, lowest id is the terminal stage — no third stage exists or is needed, since the two stages already rotate every `Open` row through fair attention across a day; a repeat tie is that rotation completing another lap.** `company-os/PRODUCT/ROADMAP.md` OF-103 and `company-os/DECISIONS.md` DECISION-059 record why a third stage (wall-clock time, a persisted counter) was considered and rejected. What that saturation actually cost was not a wrong pick but a bloated one: a row re-selected inside one saturated day was still owed a full new paragraph even with nothing new to say, which is how `OF-02` grew large enough to weigh on `PRODUCT/ROADMAP.md` itself (item 14). **A round that lands on a row purely by saturation, and whose premise re-check finds no change since that row's own last refinement, writes the compact form instead — `**Checked <today's date>, no change — see <date> refinement above.**` — still a genuine refinement (the premise was re-checked, not assumed), just without a duplicate paragraph.** A full paragraph is still required the moment anything actually changed. **A `Checked <date>` entry counts identically to a `Refined <date>` entry when tallying same-day markers for the fewest-markers stage** — the rotation guarantee that stage relies on requires it, since a row landed on via the compact form has still received today's attention, and an uncounted pick would leave it artificially eligible for immediate re-selection, the same monopolization the stage exists to prevent. "Lowest surviving id" was the original operative rule and is wrong on its own terms: it equated id order with age only by assuming a refined-but-still-`Open` row leaves the "oldest" position once touched, and nothing in the mechanism makes that true — a row that gets refined without closing keeps its id and stays the numerically lowest survivor, so a literal id reading re-selects it every round forever and starves every higher-id row regardless of how long *that* row has actually sat untouched. `company-os/PRODUCT/ROADMAP.md` OF-99 caught this live: on 2026-08-19 alone, four separate rounds refined a row other than the literal lowest id, each citing "untouched by any prior refinement pass" as its own unwritten substitute, while the row the literal text names (`OF-02`, refined 2026-08-18 and again the same day) sat five days behind the rows they actually picked. `company-os/DECISIONS.md` DECISION-054 records the correction. No new field, counter or CI guard is needed: each row already carries its own most recent `Refined <date>` (or, absent one, its Source column's discovery date) in prose, which is what a round reads to find the oldest. Refining means the row's own text changes: its Pain/Frequency/Cost/Role are re-checked against the current tree and rewritten where stale, or the row is promoted to a scheduled item, or it is re-dispositioned to `Deferred`/`Rejected`/`Fixed` with the reason. Restating the row unchanged is not refinement. This runs as a second, low-cost action alongside the round's own chosen objective, not instead of it — the same separation `commands/next.md` Step 13 already keeps between a round's main work and its `Operating model section served:` line. See company-os/DECISIONS.md DECISION-036, DECISION-054, DECISION-057 and DECISION-059.

Promotion is a separate act. A queue row becomes a scheduled item when a round picks it up and dimensions it into work — problem, target, validation. Demanding a full item at the moment of discovery is what pushes a late finding back into prose, which is the failure this whole section exists to prevent.

**A closed item declares what it left behind, in one line, or the omission is invisible.** The three dispositions above only work if someone remembers to apply them, and remembering is exactly what fails — a round that finds something late, while writing its summary, takes the cheap path and describes it there. Nothing distinguishes that from a round that genuinely found nothing.

So closing an item includes the line `Findings this item did not fix:` naming the queued ids, or stating none. A round that found nothing writes "none" and is done. A round that found something can no longer stay silent about it; it has to write "none" and be wrong on the record, which is a different act from forgetting.

This is the inversion that makes the rule checkable at all. Detecting a finding inside narrative prose has no pattern — which is why guards built on classifying prose were correctly rejected twice. Requiring a declaration does: the population is every closed item, and a missing line is exact. Two things follow and both are part of the rule: every id a closing item declares exists in the queue, and a round with nothing to declare writes "none" rather than omitting the line.

**A round that closes no item still owes this declaration, next to its own `Next:` pointer.** Binding the mechanism to closed items only was how a finding born as evidence inside a decision body, a proposal dropped in conversation, or a finding raised inside an item still open stayed invisible to it — the population was items, and none of those three is one (`company-os/PRODUCT/ROADMAP.md` OF-21). `commands/next.md` Step 13 → "Write The Next Pointer, Or Write That There Is None" requires the same line — `Findings this round did not fix:`, ids or `none` — next to every `Next:` pointer, written by every round regardless of what it closed. This is not a second rule; it is the same required-declaration mechanism moved to the one artifact every round writes unconditionally, which is also why it cannot go structurally empty the way an item-scoped population can once a roadmap is fully archived: the live `Next:` block is never itself a closed, archived entry while it is the current pointer (`company-os/PRODUCT/ROADMAP.md` OF-61).

**A `Scheduled` queue row is corrected to `Fixed` the moment the item it names closes — in the same change, not a later one.** The declaration above only ever runs forward: a closing item says what it left behind. Nothing made it run backward — an `OF-N` row reading `Scheduled — item N` has no obligation of its own to notice item N closed, so the row and reality drift apart with nothing to catch it. Confirmed five times in six days on this exact shape (OF-01, OF-42, OF-69, OF-92, OF-96), every one found by a human re-reading the queue for an unrelated reason. This repository's own CI now runs a mechanical check for exactly this: every queue row whose own last bolded disposition word is still `Scheduled` names an item, and that item cannot already be `DONE`. The citation form this trusts is the row's own `**Scheduled — item N**` text, written that way from the moment a finding is first scheduled — not a new declaration required on the item side, which DECISION-055 rejected as unreachable (the item-side phrasing already in use is not uniform enough to regex safely). (`company-os/PRODUCT/ROADMAP.md` OF-100, DECISION-055.)

Two rules that follow from this, because both failure modes have already happened:

- A deferred improvement is a decision, so its reasoning goes to `company-os/DECISIONS.md` — and its *work* still needs a disposition. `company-os/DECISIONS.md` records why something was not done; it is not a queue, and nothing reads it to choose the next objective.
- A `Future action:` in `company-os/AI/memory/learnings.md` either cites the id of a queued or scheduled entry, or states that no work is implied. A future action naming work that exists nowhere else is the same defect wearing a different field name.

When a round closes, it must be able to name the disposition of every finding it raised.

**The trigger is discovery, not a session boundary.** Nothing detects a session ending — a thread simply stops — so "before the session ends" never fires for a thread that ran no command and closed no item, and closing an item is only one of the ways a session's findings need dispositioning, not the moment to wait for. A session that wrote nothing to a Product-layer file is asserting it found nothing, which is a claim like any other in this policy and is usually false.

---

# A Decision Is Not Recorded Until Its Index Line Exists

`company-os/DECISIONS.md` opens with a Decision Index: one line per decision, stating what that decision settled in enough substance that a reader can tell whether they need to open the body.

That index is what the session-initialization protocol reads (`.kenovis/AI/SYSTEM.md` → "Context Loading Rules"). A decision whose body exists with no index line is invisible to every session that follows it, which is worse than not recording it — the reasoning is on disk and nothing points at it.

So:

- Writing a decision body and writing its index line are one change, never two.
- The index line states what was settled. It never states why — that is the body's job, and it is why citing a decision requires opening it.
- Superseding a decision updates its index line to say so, and names the decision that replaced it. The body stays where it is.

---

# A Claim Is Read Back Off The Artifact

Prose in `CHANGELOG.md`, `company-os/DECISIONS.md`, `company-os/PRODUCT/ROADMAP.md` and the rest of this document set is a product, not commentary about one. A number in it carries the same obligation as a number in code, with none of the tooling — nothing compiles it, nothing tests it, and every later reader is reading a restatement rather than the artifact.

**Every count is read off the artifact with the command that produces it, in the same round, and the command goes in the entry.** `git show --stat <commit> -- <path>`, `grep -rc <pattern> <dir>`, the test runner's own total. If a number is not worth one command, do not state it — "several templates" is honest and costs nothing. (`company-os/AI/memory/LEARNINGS-ARCHIVE.md` Learning-016.)

**State the command, not the scope in words.** "Eleven across the three files" is precise about the number and puts the scope in a sentence, so any later verification has to reconstruct which files were meant — and the obvious command silently answers a different question. Per-file transitions are self-checking: "net +11 across A, B, C (5 → 9, 6 → 11, 1 → 3)". When a broad number disagrees with a scoped one, reconcile the difference before treating either as a defect. (Learning-018.)

**When the count measures a rule's reach across files, the command greps the rule's exact section title, not an improvised keyword list.** `grep -ci "Open Findings\|disposition\|Findings this"` and `grep -ci "guard\|check_\|\.github"` are both proxies for "does this file carry rule X", and a proxy drifts from the rule the moment either is edited without the other. A citation of the section's exact title cannot drift the same way: the title names one rule, so a file either cites it or does not. This is what corrected a wrong reach count after it had already set a ranking — three files scored zero on the keyword and cited the rule correctly by title. (`company-os/PRODUCT/ROADMAP.md` OF-82.)

**A published number that turns out wrong is corrected where it was published**, and said to have been corrected. The trail is the point.

**An item's premise about a file's contents is a claim, not context.** Verify it while writing the item — usually one command — or write it explicitly as an assumption to confirm before scoping. A scheduled item is executed by whoever has less context than the person who wrote it, and a wrong premise lands its cost on the round that can least afford to re-plan. A measurement sitting in the same paragraph as an assumption lends the assumption its credibility. (Learning-023.)

**An unverified cost estimate in a deferred item is a decision made by nobody.** Priority formulas divide by implementation cost, so a wrong cost does not merely mislead — it suppresses the item, and the more wrong it is the longer it stays suppressed. Over-estimating is invisible, because the item simply never comes up again. So: verify the cost, or write that it is unverified. When the note names a specific mechanism as the reason something is expensive, check that claim first — it is the load-bearing part. When picking up a deferred item, re-derive its cost before ranking it. (Learning-019.)

**A template's passing condition is "no sentence here is true of only one product",** not "the questions are marked". A check that finds unanswered questions cannot find wrongly answered ones, and the two are not symmetric: an unanswered question is visibly incomplete, while an inherited answer looks decided and gets built on. When a template is derived from a real document by deleting its answers, there is no completion signal — nothing tells you which deletions you skipped. Read back every section that was not rewritten and ask whether it survives a product of the opposite shape. (Learning-017.)

---

# The Framework Layer Never Names A Repository-Local Script As Where A Rule Holds

An Installation's own repository may run checks that live outside `.kenovis/AI/` — a CI workflow, a pre-commit hook, anything `sync` never delivers. Such a script may exist as a local net over that one repository's own practice, and it may never be the framework layer's own answer to *how a rule is enforced* — that answer is a policy, command, workflow or template section, because that is what every task loads and what `sync` delivers to every Installation. A script nobody but the repository that wrote it runs is not enforcement anyone else has.

So the citation runs in both directions. A repository-local check names, in its own source, the framework-layer section that carries the rule it mechanically enforces — or records that no such section exists and why (`company-os/PRODUCT/ROADMAP.md` item 37 disciplines this repository's own checks that way). The framework layer never runs the citation the other way: it does not name a repository-local script as the mechanism holding a rule for a customer. A live instance of exactly that — the framework layer telling every Installation a script it does not have was enforcing something — was found and fixed inside this document (`company-os/PRODUCT/ROADMAP.md` OF-25).

---

# An Instruction Is Reachable, And Its Sink Is Read

Three failure modes that make a correctly written instruction produce nothing.

**A document that instructs an outcome must permit the action that produces it.** A prohibition written for one purpose ("do not implement") silently swallows a different one ("do not record") when it is phrased by mechanism rather than by intent. A rule a command is structurally prevented from following is not a weak rule, it is an absent one, and no amount of care in following it helps. When writing "do X" into a command, re-read that command's own constraints for whatever forbids X. (`company-os/AI/memory/LEARNINGS-ARCHIVE.md` Learning-024.)

**Knowledge sinks are not interchangeable.** This framework has three: `company-os/DECISIONS.md` records *why*, `company-os/AI/memory/learnings.md` records the *lesson*, `company-os/PRODUCT/ROADMAP.md` records *what and when*. Only the third is read to decide what happens next. Before writing "record it in X", ask what reads X and when. A destination nothing consults at decision time is a place to put something down, not a place for it to be picked up — and a well-documented deferral in the wrong sink reads as closed. (Learning-024.)

**A rule over a population ships whatever creates that population, and says what an empty one means.** A rule phrased as "update the row", "check each entry", "declare what this item left behind" is correct, loaded, and produces nothing where the rows, entries or items do not exist yet. Whoever writes the rule always has the population in front of them — it is the repository they are working in — and that is exactly why they do not see the question. Three instances in this framework, all found after shipping: a routing rule naming five destinations that a repository does not have until setup completes; a conformance table whose rows one repository had built by hand and no other repository has any instruction to build; and a check whose population emptied as the *intended* effect of a second rule, leaving it permanently inert and passing. So two questions before the rule ships: **what creates the population, and what does an empty one mean** — "nothing to do" and "nothing is set up" are different answers and only one of them is a pass. (`company-os/AI/memory/learnings.md` Learning-036.)

---

# An Instruction That Produces An Artifact Names Where It Goes, And A Template Is Never Where

Two halves of one rule. Both shipped as real defects before either was written down, and both are invisible to the agent that hits them.

**An instruction that tells an agent to produce something states where the produced thing is recorded.** A step that says "generate the report" and stops does not read as incomplete — it reads as finished, and the agent completes it by choosing a destination itself. The destination it chooses is wherever this framework's own files live, because that is where everything else the framework owns sits. In an Installation that directory is mirror-replaced by the next update, so the artifact is deleted and nothing names the file it removed.

So the destination is part of the instruction, not judgement left to the reader. When the artifact is genuinely session-only — a plan presented to a human, a summary, a form that shaped a conversation — the instruction says *that*, because "no file, delivered in session" is a destination and silence is not.

**A template is a form, never a destination.** A path under the templates directory names a shape to fill in; the filled-in artifact goes somewhere else. Every reference to a template carries that sentence **at the reference**, not only in the template's own header — an agent following a pointer acts on the instruction that sent it, and does not necessarily open the target first. The templates directory is inside the layer `sync` mirror-replaces, so a template used as a destination is a file written in order to be deleted.

Why both belong at the reference site and not only here: the agent that fails this is reading one instruction, not the policy set. This policy is what makes the sentence required; the sentence at the site is what makes the instruction complete. A rule that is true in a policy and absent from the instruction it governs is a rule with no reader at the moment it applies.

See company-os/DECISIONS.md DECISION-024.

---

# A Path In These Documents Is Written Repository-Relative, In Backticks

**The convention across this document set is a backticked path, not a markdown link**, and it is written relative to the repository root from every file: `company-os/PRODUCT/OPERATING_MODEL.md`, `.kenovis/AI/policies/documentation.md`, `company-os/AI/memory/learnings.md`. That is what every document here already does, and it was written down nowhere until a link went wrong.

Two reasons it is the convention rather than a preference:

- **A markdown link resolves relative to the file it is written in, not to the repository.** A link target written repository-relative inside `company-os/PRODUCT/ROADMAP.md` resolves to a path with `company-os/PRODUCT/` twice, and points at nothing. A backticked path has no resolution behaviour at all, so it means the same thing read from any file, by a human or an agent — and an agent reading these documents is the primary reader.
- **A dead link in a Product-layer document is silent.** Whatever checks links in this repository does not travel to an Installation, and `company-os/PRODUCT/` is the directory an Installation edits most. The convention has to hold by being written, not by being caught.

Where a markdown link is genuinely wanted — an external URL, or a `README.md` written for humans browsing a forge — write it and make the target correct from the file it lives in.

See `company-os/PRODUCT/ROADMAP.md` OF-56.

---

# README Sync — In-Task, Not Post-Hoc

Waiting for review to catch outdated documentation makes it optional in practice — reviews get rushed, sync gets deferred, and it never happens.

Before reporting any code task complete:

1. Ask whether the change affects anything the README documents: setup, architecture, routing, folder structure, scripts, conventions, environment variables.
2. If yes, update the README in the same task, not a follow-up.
3. If no, state that explicitly ("No README impact") instead of silently skipping the question.

This applies to the README of whichever unit changed (see `company-os/ENGINEERING/ARCHITECTURE.md` for the repository's topology), not only the repository root.

---

# Review Checklist

Before approving work:

✓ Documentation matches implementation.

✓ Decisions are recorded.

✓ Examples remain correct.

✓ Broken links are removed.

✓ New concepts are documented.

✓ Terminology remains consistent.

---

# Forbidden Behaviours

Never:

- Document guesses.
- Duplicate documentation.
- Leave obsolete information.
- Store architecture decisions only in chat.
- Mix implementation details into business documents.
- Skip documentation for important changes.

---

# Final Principle

The codebase should be understandable without asking its original authors.

Documentation is how knowledge survives.