# QUESTIONS.md Template

> **MENTOR-SIDE REFERENCE.** This file is the shape to emit, not a document to hand over.
> **Do not paste the skeleton or these rules to a trainee** — handing over the skeleton turns
> it back into the list of unasked questions this command was rewritten to stop producing.

The literal skeleton to emit at the end of an `/advise-questions` conversation. Keep the section order and the table headings exactly as written, so every run produces a document the trainee already knows how to read.

Replace everything in `<angle brackets>`. Never delete a section — an unknown nobody reached is recorded as `OPEN`, never dropped.

---

## Skeleton

````markdown
# Questions — <task name>

> Written from a mentoring conversation, produced by `/advise-questions`. Each row states what
> is now known about the task, not what was asked; the status column says how far it got.

**The unknown that mattered most:** <the one whose answer changed the most other answers>

## Where each unknown stands

| Unknown | Status | What is now known | What remains open |
|---|---|---|---|
| <the unknown, as a noun phrase — not a question> | <SETTLED / PARTIAL / OPEN> | <the trainee's own conclusion, as a statement> | <the part no answer was reached on, or —> |

## Questions the trainee raised

| As first asked | Sharpened to | Status |
|---|---|---|
| <the vague version> | <the version that names what its answer would change> | <SETTLED / PARTIAL / OPEN> |

## Still open, in order

1. <the most load-bearing unresolved question>
2. <the next one>

## What the settled answers rule out

- <an approach or assumption the answers eliminated>
````

---

## Rules for filling it in

- **The opening blockquote stays.** It marks the document as the residue of a mentoring conversation and names `/advise-questions` as its source, so a reader knows each row is something the trainee worked out.
- **The document is written after the conversation, not before it.** Emit it once a session-level stop condition from `socratic-dialogue` fires, or whenever the trainee asks for the write-up — never unrequested before then.
- **Separate settled from open.** `SETTLED` means the trainee reached the conclusion themselves. An answer the mentor supplied, or one reached only after the ladder bottomed out, is `PARTIAL` at best. Nothing the trainee did not work out is presented as though they did.
- **No transcript.** No "then I asked", no "you said", no dialogue history, no question-and-answer log. The first column names an unknown, never a question the mentor put — every entry reads as a statement of what is now known about the project.
- **No code anywhere.** No pseudocode, no function signatures, no algorithm — not in the "what is now known" column, not in the open list.
- **One status per row, from the fixed vocabulary only.** `SETTLED`, `PARTIAL`, `OPEN`. No hedges, no two statuses in one cell, no blank.
- **A `PARTIAL` or `OPEN` row must fill "what remains open".** A row with a status and no residue has mislabelled itself; a `SETTLED` row puts `—` there.
- **Cap the table at the questions actually put** — typically four to six rows. Padding it with unasked questions rebuilds the delivered list.
- **The still-open questions are Socratic** (per `mentor-guidance` §3): answerable by the trainee after thinking, and answered nowhere else in the document.
- **"What the settled answers rule out" carries only eliminations the answers support.** An eliminated approach is a result; a preference is not, and belongs nowhere in this document.
- **Keep the whole file to one screen** where the content allows. A long record of a short conversation is a transcript in disguise.
