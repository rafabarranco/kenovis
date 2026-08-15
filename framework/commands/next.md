# Next Command

Version: 2.12

---

# Purpose

Execute the next highest-value development action according to the current product roadmap.

This command transforms product direction into concrete engineering execution.

The objective is not to write code immediately.

The objective is to identify, plan, validate, implement, review, and document the next meaningful improvement.

---

# Trigger

Execute when:

- Starting new development work.
- Completing the previous roadmap item.
- Asking what should be done next.
- Continuing autonomous development.

Command:

```
/next
```

---

# Core Principle

Always maximize product value before maximizing technical output.

The next action should be the one that creates the highest business impact with acceptable technical risk.

---

# Execution Workflow

Follow this sequence.

---

# Step 1 - Bootstrap Context

Execute:

```
.kenovis/AI/commands/bootstrap.md
```

Before doing anything else.

Load:

- Product context.
- Domain knowledge.
- Architecture.
- Engineering rules.
- Current repository state.

---

# Step 2 - Read Product Roadmap

Read:

```
PRODUCT/ROADMAP.md
```

Understand:

- Current phase.
- Completed work.
- Pending objectives.
- Priority order.

---

# Step 3 - Identify Next Objective

Read three inputs, not one.

**The scheduled items.**

**`PRODUCT/ROADMAP.md` → "Open Findings"**, the queue of findings earlier rounds did not fix. A finding carrying `Open` competes here on the same priority formula as a scheduled item — that is the whole reason the queue exists, and skipping it is how a known problem stays unresolved for months while rounds pick from the items that happen to be written up.

**The `Next` pointer the previous round wrote in Step 15.** Start from it. It carries the ordering rationale — dependencies, what unblocks what, why an expensive item is ranked above a cheap one — and that reasoning is written every round and is the first thing a new thread does not have. Re-deriving the order from the priority formula over the whole roadmap is not thoroughness; it is discarding the previous round's work and paying to reach a worse-informed version of the same answer.

A round may depart from the pointer. When it does, it **says why, in `PRODUCT/ROADMAP.md`, in the same round** — new information, a dependency that turned out false, a founder instruction that outranks it. A departure that is not written down is indistinguishable from never having read the pointer.

If no pointer exists yet — a first round, or one whose predecessor left none — rank from the two inputs above and write one in Step 15.

---

## When The Next Objective Is Not Yours To Execute

Some work has an executor that is not this command: a decision only the human can make, work that needs an external party, a number nobody has yet. `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected" requires such a finding to name **who executes it and what input they need to decide**. That is the write side. This is the read side, and without it the write side produces nothing.

When the highest-ranked objective is one of those:

- **Present the decision to the human**, with the input the item or finding already names. It is there so nobody has to invent it under pressure at the end of a round.
- **Record in `PRODUCT/ROADMAP.md` that this round reached that item and stopped**, and on what it is blocked. A blocked round is a real outcome and leaves a real trace.
- **Stop.**

**Do not descend the priority order looking for something executable.** Skipping leaves no artifact, so a board whose top item needs a human silently becomes a board of whatever the AI could do alone — every round defensible, the ranking quietly inverted, and nothing anywhere showing the top item was passed over. That is the drift `PRODUCT/ROADMAP.md` item 40 describes, and descending is how it happens with a fresh mechanism each time.

If the human answers within the same session, continue from Step 4 with their answer.

---

## When The Roadmap Is Empty

An empty roadmap is the stated end of the loop: threads open, `/next` runs, and it repeats until there is nothing left in the product's roadmap (`PRODUCT/OPERATING_MODEL.md` → Addendum A §4). So this state is reached on purpose, and the command needs a defined behaviour for it rather than an improvised one.

Empty means all three of Step 3's inputs are empty: no scheduled item, no `Open` row in the findings queue, and a `Next` pointer that says `none`. A pointer that is merely absent is not this state — that is Step 3's fallback, and it means rank from the other two.

When it is genuinely empty:

- **Say so plainly, and say what that means.** `PRODUCT/OPERATING_MODEL.md` §1 and §14 hold that the roadmap is the complete representation of known future work and that Kenovis observes the product continuously and feeds it. Under those two together, an empty roadmap is the claim that observation ran and found nothing.
- **State which of the two it actually is**, because they are not the same and only one is a finished product: the product has nothing worth improving, or nothing observed. Continuous observation is an unimplemented promise today — `PRODUCT/ROADMAP.md` OF-33 — so the honest answer in this repository is currently the second.
- **Do not invent work to have something to do.** An item manufactured to keep the loop turning is worse than a stopped loop: it consumes a thread, it enters the roadmap with the same authority as real work, and it hides the fact that the board drained.
- **Stop, and record in `PRODUCT/ROADMAP.md` that a round reached an empty board and on what date** — the same shape as a blocked round above. That record is the evidence that observation, whenever it exists, has a gap to fill.

---

Determine:

```
What is the next valuable outcome?
```

Not:

"What file should we edit?"

---

Evaluate:

- User impact.
- Business value.
- Technical dependencies.
- Risk.
- Effort.

---

## Observe

A third action, alongside choosing the round's own objective and refining the oldest open row — and, like Refine, low-cost and separate from the round's main work rather than a replacement for it.

Between sessions this product is not observed by anything. Every command in `.kenovis/AI/commands/` runs only when a human decides to invoke it, including the one built specifically to audit the framework's own surface — see `PRODUCT/ROADMAP.md` OF-06, unrun across seven opportunities. `PRODUCT/OPERATING_MODEL.md` §1 and §16 name continuous observation as part of this system's own operating model; DECISIONS.md DECISION-038 records why "continuous" is not architecturally achievable here (no scheduler, no backend — DECISION-010, DECISION-013) and why the reachable form is a step inside the command that already runs on this product's actual cadence, rather than a new standalone command nobody invokes.

So this step is **required, unconditional, and deliberately bounded to a fixed, short checklist** — not an open-ended instruction to look for problems, which cannot be audited across rounds and degrades the same way an unrun command does. Run it before ranking the round's objective, so anything it finds can compete on the same priority formula as everything else in Step 3:

1. **Every governed document's size**, not only the one this round's own objective happens to touch. `wc -c` each document `.kenovis/AI/policies/documentation.md` → "Document Lifecycle" names as governed. A document over threshold with no split and no exemption is a new `Open Findings` row, dimensioned on the spot — checked against the roadmap first, per the disposition rule, same as any other finding.
2. **Every exemption currently in force on an over-threshold governed document.** An exemption names the roadmap item that will close it. Confirm that item still exists and is not `Fixed` or `Rejected` — a closed item cited as a live exemption is the same defect as a stale premise (`.kenovis/AI/policies/documentation.md` → "A Claim Is Read Back Off The Artifact"), and nothing else in this command checks it unprompted.

Two commands, at most a handful of documents. This is not a framework-review audit and does not become one — it is the same kind of bounded, cheap, second action Refine already is, aimed at a class of drift this product has hit unnoticed more than once (`PRODUCT/ROADMAP.md` OF-23, OF-51, OF-62 are three rounds of exactly this on one document alone). Anything the round notices outside this checklist still gets a disposition per the findings rule — this step does not narrow that — but it is not itself grounds to widen the checklist without a decision recording why, for the same reason DECISION-038 rejected an unbounded version of this step in the first place.

---

## Refine The Oldest Open Row

Alongside choosing the round's own objective, refine exactly one row from `PRODUCT/ROADMAP.md` → "Open Findings": the lowest-id row still carrying `Open`. Ids are assigned in discovery order and the table is never reordered, so the lowest-id `Open` row is the one that has gone longest without being touched.

Refining means the row's text changes — its Pain/Frequency/Cost/Role re-checked against the current tree, or the row promoted to a scheduled item, or re-dispositioned with the reason. Leaving the row byte-identical is not refinement.

This is a second, low-cost action, separate from the round's own chosen objective — do not let it become the objective itself, and do not skip the round's real work to perform it. See `policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected" and DECISIONS.md DECISION-036.

---

# Step 4 - Activate Product Agent

Call:

```
product-manager
```

Responsibilities:

- Validate user problem.
- Confirm expected value.
- Define success criteria.

Questions:

- Who benefits?
- Why does this matter?
- How will we know it worked?

---

# Step 5 - Activate CTO Agent

Call:

```
cto
```

Responsibilities:

- Evaluate architecture impact.
- Identify technical approach.
- Detect risks.

Review:

- Existing architecture.
- Scalability.
- Complexity.

---

# Step 6 - Select Engineering Agents

Activate only necessary specialists.

Examples:

## Frontend Feature

```
frontend

designer

reviewer
```

---

## Backend Feature

```
backend

database

security

reviewer
```

---

## Full Product Feature

```
product-manager

designer

frontend

backend

database

security

reviewer
```

---

# Step 7 - Select Policies

Load relevant policies.

Always:

```
architecture.md

coding.md

testing.md

documentation.md
```

Additional:

Database changes:

```
database.md
```

Security changes:

```
security.md
```

Release changes:

```
git.md
```

---

# Step 8 - Create Execution Plan

The plan is presented to the human in this session; it is not a file to create, and never anywhere under `.kenovis/`, which `kenovis sync` replaces wholesale — see DECISIONS.md DECISION-024. What survives is written in Step 13 (`PRODUCT/`, `DOMAIN/`, `ENGINEERING/`, `DECISIONS.md`) and Step 14 (`AI/memory/learnings.md`).

Before coding generate:

## Objective

What will be achieved.

## User Value

Why users need it.

## Technical Approach

How it will be implemented.

## Affected Areas

Files and systems involved.

## Risks

Possible problems.

## Validation

How success will be measured.

---

# Step 9 - Check Dependencies

Verify:

- Previous roadmap items completed.
- Required architecture exists.
- Necessary decisions documented.

If dependencies are missing:

Do not continue blindly.

Update plan.

---

# Step 10 - Implement

During implementation:

Follow:

- Architecture policy.
- Coding policy.
- Security policy.
- Testing policy.

Prefer:

Small incremental changes.

Avoid:

Large uncontrolled rewrites.

---

# Step 11 - Validate

**When the round's artifact is code:**

Run:

- Tests.
- Type checks.
- Linting.
- Build process.

**When the round's artifact is a document** — most rounds on this board, since the product is `.kenovis/AI/` markdown (DECISION-026) — the four checks above do not touch the changed file, and passing them is not validation. Validate instead with `.kenovis/AI/policies/documentation.md` → "A Claim Is Read Back Off The Artifact": read every claim, count and grep the round makes back off the artifact with the command that produces it, and exercise the failing case for anything the round added a check for. State which form ran.

Verify:

- Business requirements.
- Security.
- Performance.

---

# Step 12 - Review

Activate:

```
reviewer
```

The reviewer checks:

- Architecture.
- Code quality.
- Tests.
- Documentation.
- Technical debt.

Possible outcomes:

```
Approved

Approved with suggestions

Changes requested

Rejected
```

---

# Step 13 - Update Documentation

After successful implementation update:

Product:

```
PRODUCT/
```

Domain:

```
DOMAIN/
```

Engineering:

```
ENGINEERING/
```

Decisions:

```
DECISIONS.md
```

when required.

Then check the size of every document this round appended to, and run the archive pass on any that is over threshold — see `.kenovis/AI/policies/documentation.md` → "Closed Work Is Archived, Not Kept Inline". This is the step that triggers it. A document that has declared a split satisfies its size rule permanently, so nothing else will ever raise it again, and the round that added the weight is the last one that can cheaply remove it.

---

## State Which Section Of The Operating Model This Round Served

```
PRODUCT/OPERATING_MODEL.md → Conformance
```

**Name the section of the operating model this round's work served, and update that section's row in the Conformance table.** A round that served none says so, in those words, and that is a real and acceptable outcome — a release, a dependency bump and a typo fix all serve none.

**If the table is still the unfilled form it shipped as, build it before updating a row.** The template ships one placeholder row on purpose — setup is the session least equipped to measure conformance, and both setup commands say so — which means the first closing round finds a table with no row for the section it served, and "update that section's row" resolves to nothing. So the population is this step's job, not setup's: write one row per numbered section of the document above, and put `unmeasured` in the State column of every row this round did not actually verify. `unmeasured` is honest and it is something a later round can move; an absent row is indistinguishable from a section nobody served. This is a one-time step per Installation — a table with a row per section is built, and from then on this step only updates rows.

**Write the declaration, in `PRODUCT/ROADMAP.md`, next to the item this round closed:**

```
Operating model section served:
```

naming the section, or the word `none`. A round that served none and says nothing is indistinguishable from a round that forgot, and forgetting is what actually happens — which is why the neighbouring rule (`.kenovis/AI/policies/documentation.md` → "A closed item declares what it left behind") is built as a required line rather than as a habit. Same inversion, same reason: a round that served none now has to write `none` on the record instead of simply staying quiet.

This is the criterion. Everything else a round can be measured against — a guard's exit code, a byte count, a document's structure — is instrumentation, and instrumentation is checkable in a way the objective is not. So without this step, rounds are graded on the machinery, every one of them defensibly, and the product drifts from its purpose with nothing recording the drift. That failure is what `PRODUCT/ROADMAP.md` item 40 diagnoses and what item 41 exists to correct.

Two rules on moving a row, both because the failure they prevent has already happened here:

- **A row does not move to `Present` because a rule was written.** A rule that exists and a rule that holds are different claims. Where the row's subject is agent behaviour rather than file content, the round that changed it is the worst available judge of whether it took — see `PRODUCT/ROADMAP.md` OF-30.
- **A row's state is read off the tree with the command in the row**, not carried over from the previous pass. Every conformance figure this framework has restated without re-running has been stale within a day.

If the repository has no `PRODUCT/OPERATING_MODEL.md` — possible only in a repository set up before it was required — that is the finding, and it goes to the owner rather than into a row. See `.kenovis/AI/SYSTEM.md` → "Source Of Truth Hierarchy" and DECISIONS.md DECISION-032.

---

## Write The Next Pointer, Or Write That There Is None

```
PRODUCT/ROADMAP.md → Next
```

Step 3 starts from this pointer, so a round that ends without writing one silently costs the next round a re-derivation over the whole roadmap — and Step 3's fallback for "no pointer exists yet" makes that read as intended behaviour rather than as an omission.

So the pointer is a line the closing round writes, in those words:

```
Next:
```

with the ranked objectives and the reasoning that ranked them, or the single word `none` and why there is nothing to point at. `none` is a real answer — an empty roadmap is one, and a round blocked on a human decision is another. It is not the same answer as silence, and this line is what separates them.

Record important learnings:

```
AI/memory/learnings.md
```

Examples:

- New conventions.
- Important discoveries.
- Patterns established.

---

# Step 15 - Prepare Next Step

The summary is delivered to the human in this session; it is not a file to create, and never anywhere under `.kenovis/` — see DECISIONS.md DECISION-024. The recommended next action belongs in `PRODUCT/ROADMAP.md`, written in Step 13, so the next `/next` run reads it instead of re-deriving it.

The same applies to everything this round found and did not fix. A round finds more than it fixes; each of those findings is scheduled with an id in `PRODUCT/ROADMAP.md` or rejected with a reason, in Step 13, before this summary is written. Describing a finding in this summary, or in the narrative of the item just closed, is not a disposition — see `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected". The summary below then states the disposition of each, which is only possible because they already have one.

Ordering alone has already failed, twice, so it is no longer the only defence. The closed item carries a line — `Findings this item did not fix:` — naming the queued ids or stating none. Write it in Step 13, before this step exists. A round that found nothing writes "none"; a round that found something and skipped the queue now has to write "none" and be wrong on the record, instead of simply saying nothing. This is the one part of the rule a machine can hold you to, and it does.

After completion:

Summarize:

## Operating Model Section Served

Which section of `PRODUCT/OPERATING_MODEL.md` this round's work served, and what its Conformance row now says — or "none", in that word. Written in Step 13; restated here so the human reads it without opening the table.

## Completed

What changed.

## Decisions

Important choices.

## Risks

Remaining concerns.

## Next Recommended Action

What should happen next.

---

# Autonomous Mode

**The framework default is one roadmap item per round, and the round ends with the thread.** A thread is a temporary execution context (`PRODUCT/OPERATING_MODEL.md` §5); the durable record is what Steps 13 and 14 wrote. Continuing into a second item spends the rest of a context window that the closing steps of the first item are the last thing to need, and it makes the two items' findings share one disposition pass — which is where the second item's findings get folded into the first item's narrative and lose their ids.

**An Installation may state a different cadence, and that statement outranks this default.** It goes in that Installation's own `PRODUCT/OPERATING_MODEL.md`, which is rank 1 of the Source Of Truth Hierarchy (`.kenovis/AI/SYSTEM.md`, DECISION-031) — the owner's statement of how their product is developed, not a framework law. This section previously read *"Claude may continue through multiple roadmap items"* with no such deference, which put a framework command in direct contradiction with a rank-1 document in the Installation that had written one, at the exact moment a round decides whether to continue. See `PRODUCT/ROADMAP.md` OF-54 and DECISIONS.md DECISION-034.

Where an Installation has enabled multi-item rounds, confirmation is still required before:

- Architecture changes.
- Security changes.
- Database migrations.
- Large refactors.
- External costs.

---

# Forbidden Behaviours

Never:

- Start coding before understanding the objective.
- Ignore the roadmap.
- Implement features without user value.
- Skip review.
- Skip documentation.
- Add unnecessary complexity.
- Modify unrelated areas.

---

# Completion Criteria

The command is complete when:

✓ The roadmap item is understood.

✓ The correct agents participated.

✓ Relevant policies were applied.

✓ Implementation is complete.

✓ Tests pass.

✓ Review is approved.

✓ Documentation is updated.

✓ Memory contains relevant learnings.

✓ **The round's work has reached a branch.** Committed and pushed, per `.kenovis/AI/policies/git.md`, which owns how — this criterion owns only *that*, and *when*: before the thread ends.

Why it is a completion criterion rather than a note. Under a one-thread-per-round cadence the next round is a different session on a possibly different machine, so a round whose output sits only in a working tree is one `git checkout` away from never having happened — and every step above it can pass while that is true. The Product layer is this AI-OS's memory (`PRODUCT/OPERATING_MODEL.md` §5, §6), and the Product layer's durability is git, not the filesystem. Observed once, on entry to a round that found the previous round's entire output — a decision, a template, a document move — uncommitted on `development` with no open PR. See `PRODUCT/ROADMAP.md` OF-80.

---

# Final Principle

The purpose of /next is not to write more code.

The purpose of /next is to continuously move the company forward.

