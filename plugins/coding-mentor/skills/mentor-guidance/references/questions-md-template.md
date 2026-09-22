# QUESTIONS.md Template

> **MENTOR-SIDE REFERENCE.** This file is the shape to emit, not a document to hand over.
> **Do not paste the skeleton or these rules to a trainee** — handing over the skeleton turns
> it back into the list of unasked questions this command was rewritten to stop producing.

The literal skeleton to emit at the end of an `/advise-questions` conversation. Keep the section order and the table headings exactly as written, so every run produces a document the trainee already knows how to read.

Replace everything in `<angle brackets>`. Never delete a section — a strand the trainee opened but never closed is recorded as `OPEN`, and a section with nothing to record emits `—`.

---

## Skeleton

````markdown
# Questions — <task name>

> Written from a mentoring conversation, produced by `/advise-questions`. Each row is a strand the
> trainee chose to pull apart and what they worked out about it; the status column says how far it got.

**The strand that mattered most:** <the one the trainee spent the most on, in their words>

## Where each strand stands

| The strand the trainee chose to pull apart | Status | What is now known | What remains open |
|---|---|---|---|
| <in the trainee's own words, as they named it — not a survey item, not a question> | <SETTLED / PARTIAL / OPEN> | <the trainee's own conclusion, as a statement; anything supplied marked `(supplied)`> | <the part no answer was reached on, or —> |

## Questions the trainee raised

| As first asked | Sharpened to | Status |
|---|---|---|
| <the vague version> | <the version that names what its answer would change> | <SETTLED / PARTIAL / OPEN> |

## Still open, in order

1. <the strand the trainee most wants to come back to>
2. <the next one>

## What the settled answers rule out

- <an approach or assumption the answers eliminated>
````

---

## Rules for filling it in

- **The opening blockquote stays.** It marks the document as the residue of a mentoring conversation and names `/advise-questions` as its source, so a reader knows each row is something the trainee worked out.
- **The document records what the trainee worked out about the subject, never a design for solving it.** If a section is describing how the program should be built — a structure, a sequence of steps, a technique to apply — it belongs in `ARCHITECTURE.md` or `PLAN.md` and is cut from here.
- **The first column is the trainee's, not a survey of the problem space.** It names the strand the trainee chose to pull apart, in their words. A row nobody chose to open does not belong in the table.
- **Attribution is explicit.** Anything supplied rather than reached is marked `(supplied)` in the trainee's-words column or beside it. A conclusion the conversation walked the trainee to is never written as one they arrived at.
- **The document is written after the conversation, not before it.** Emit it once a session-level stop condition from `socratic-dialogue` fires, or whenever the trainee asks for the write-up — never unrequested before then.
- **Separate settled from open.** `SETTLED` means the trainee reached the conclusion themselves. An answer supplied to them, or one reached only after the ladder bottomed out, is `PARTIAL` at best. Nothing the trainee did not work out is presented as though they did.
- **No transcript.** No "then I asked", no "you said", no dialogue history, no question-and-answer log. Every entry reads as a statement of what is now known about the project, never as a question that was put.
- **No code anywhere.** No pseudocode, no function signatures, no algorithm — not in the "what is now known" column, not in the open list.
- **One status per row, from the fixed vocabulary only.** `SETTLED`, `PARTIAL`, `OPEN`. No hedges, no two statuses in one cell, no blank.
- **A `PARTIAL` or `OPEN` row must fill "what remains open".** A row with a status and no residue has mislabelled itself; a `SETTLED` row puts `—` there.
- **Cap the table at the strands actually opened** — typically three to six rows. Padding it with strands nobody chose rebuilds the delivered list.
- **An empty section emits `—`, never disappears.** A run where the trainee raised no questions of their own records that, because the absence is itself a finding.
- **The still-open entries are Socratic** (per `mentor-guidance` §3): answerable by the trainee after thinking, and answered nowhere else in the document.
- **"What the settled answers rule out" carries only eliminations the answers support.** An eliminated approach is a result; a preference is not, and belongs nowhere in this document.
- **Keep the whole file to one screen** where the content allows. A long record of a short conversation is a transcript in disguise.
