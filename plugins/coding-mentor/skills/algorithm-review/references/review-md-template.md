# `REVIEW-<n>.md` Template

> **MENTOR-SIDE REFERENCE.** This file is the shape to emit, not a document to hand over.
> **Do not paste the skeleton or these rules to a trainee** — a trainee reading the
> placeholders learns which five answers are being collected and produces them in order,
> which is exactly the five-turn dialogue this template exists to record, not to replace.

The literal skeleton to emit. Keep the section order and the heading names exactly as written, so every round produces a document the trainee already knows how to read.

Replace everything in `<angle brackets>`. Never delete a section, with one exception: **Changed since the last round** is omitted in round 1 and present in every round after it.

---

## Skeleton

````markdown
# Review <n> — <task name>

**Round:** <n>
**Date:** <YYYY-MM-DD>

> Written from a mentoring conversation, produced by `/review-algorithm`. Every statement below is
> the trainee's own, reached one question at a time. Nothing here is code, and nothing here
> is a solution.

## The contract

- **Input:** <what arrives, in what shape, with what guarantees — as the trainee stated it>
- **Required behavior:** <what must be produced in the normal case — as the trainee stated it>
- **Failure/edge behavior:** <what happens on empty input, wrong argument count, and the rest>

## The invariant

<What the trainee named as true at the top of every iteration, or at every level of the recursion, in their own words.>

## Edge cases

| Case | Identified by | Behavior now |
|---|---|---|
| <the case> | <trainee / raised in review> | <settled, or open> |

<Cases the trainee named and cases they missed both go in this table. The middle column is
the difference between them, and it is not softened.>

## Complexity

- **Time:** <the trainee's answer>
- **Space:** <the trainee's answer>
- **Their reasoning:** <the argument the trainee gave, not a corrected one>

## Changed since the last round

<Omit this whole section in round 1. Otherwise: what is different from REVIEW-<n-1>.md —
what was resolved, what was reopened, what the trainee revised.>

## Changing before the next round

1. <a concrete revision the trainee committed to>
2. <revision>

## Still unresolved

1. <question the trainee could not yet answer, unanswered anywhere above>
2. <question>
````

---

## Rules for filling it in

- **The first line marks the document's origin.** The round number, the date and the blockquote naming `/review-algorithm` stay in every emitted review. A review record that does not say which round it is cannot show revision.
- **The document is written after the conversation, not before it.** Emit it once a session-level stop condition from `socratic-dialogue` fires, or whenever the trainee asks for the write-up — never unrequested before then.
- **An empty section is emitted with an em dash, never dropped.** A section with nothing in it — apart from one this template explicitly says to omit — carries a single `—` where its content would go, because an empty section is itself a finding: the reader must see that the question was asked and came back empty.
- **Round numbering never reuses a number.** `REVIEW-1.md`, `REVIEW-2.md`, and so on, one per round, and an existing file is never overwritten. The sequence of files *is* the evidence of revision.
- **Settled and open stay separated.** The contract, the invariant and the complexity hold only what the trainee actually produced. Everything else goes under **Still unresolved** and nowhere else.
- **No transcript.** No "then I asked", no "you said", no question-and-answer log, no dialogue history. Every section states what is now known, in the present tense, as project documentation.
- **No code.** No pseudocode, no signatures, no types, no algorithm — not in a section, not in a table cell, not in the reasoning line.
- **The trainee's answers are recorded as given, not improved.** A contract stated loosely is recorded loosely and the gap becomes an unresolved item. Nothing the trainee did not work out is written as though they did.
- **A missed edge case is recorded as missed.** The **Identified by** column exists for that and is never filled with "trainee" to be kind.
- **The reasoning line is the trainee's argument**, right or wrong. A corrected derivation in that field turns the record into the mentor's answer sheet.
- **The unresolved questions are Socratic** (per `mentor-guidance` §3): answerable by the trainee after thinking, and answered nowhere else in the document.
- **Cap the whole file at one screen where the content allows.** A round that needs two screens was two rounds.
