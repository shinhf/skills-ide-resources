# CONCEPTS-<slug>.md Template

> **MENTOR-SIDE REFERENCE.** This file is the shape to emit, not a document to hand over.
> **Do not paste the skeleton or these rules to a trainee** — a trainee given the empty
> skeleton writes a textbook definition into the one-sentence slot, and that sentence in their
> own words is the whole point of the note.

The literal skeleton to emit at the end of an `/explain-subject` conversation. Keep the section order and the headings exactly as written, so every run produces a document the trainee already knows how to read.

One file per concept, named `CONCEPTS-<slug>.md` with the concept kebab-cased — `CONCEPTS-loop-invariant.md`, `CONCEPTS-pointer.md`. A second concept gets a second file; a different concept's file is never overwritten.

Replace everything in `<angle brackets>`. Never delete a section — an empty "still shaky" section claims a mastery one conversation does not produce.

---

## Skeleton

````markdown
# <Concept> — concept note

> Written from a mentoring conversation, produced by `/explain-subject`. The definition below is
> the trainee's own wording; the last section is what the conversation did not finish.

## In one sentence

<the concept, defined in the trainee's own words, as they said it>

## The analogy that landed

<the real-life comparison the trainee accepted, and the one point at which it stops holding>

## A worked example, unrelated to this task

<a small problem from somewhere else entirely, walked through in words: what starts, what
changes at each step, what is true at the end — described, never written as code>

## Why it matters here

- **In this project:** <the specific place in this task where the concept decides something>
- **What goes wrong without it:** <the concrete failure, not "bad practice">

## Still shaky

1. <the part the trainee could not yet restate, and the question that would settle it>
````

---

## Rules for filling it in

- **The opening blockquote stays.** It marks the document as the residue of a mentoring conversation and names `/explain-subject` as its source, so a reader knows the definition is the trainee's own rather than a copied one.
- **The document is written after the conversation, not before it.** Emit it once a session-level stop condition from `socratic-dialogue` fires, or whenever the trainee asks for the write-up — never unrequested before then.
- **Separate settled from open.** "In one sentence" holds only what the trainee could state themselves; anything they could not restate — including anything the mentor had to supply outright — belongs in **Still shaky**. Never present an understanding the trainee did not reach as though they did.
- **No transcript.** No "then I asked", no "you said", no dialogue history, no question-and-answer log. Every section is a statement of what is now known about this concept and its place in the project.
- **No code anywhere.** No pseudocode, no function signatures, no algorithm, no syntax — the toy example is described in prose. A worked example that could be pasted into an editor is a solution, whatever problem it claims to be about.
- **The definition is quoted, not improved.** Upgrade the vocabulary during the conversation, not in the file; a sentence rewritten into the mentor's words is a sentence the trainee cannot reuse.
- **The analogy must name where it breaks.** An analogy with no limit stated becomes the trainee's model of the concept, and every analogy is wrong somewhere.
- **The worked example is unrelated to the trainee's own task** (`mentor-guidance` §4). If the example's subject matter resembles the task, it is the wrong example.
- **"What goes wrong without it" is a concrete failure** — `"the freed buffer is read on the next iteration"` is a failure; `"it's not clean"` is not.
- **The still-shaky questions are Socratic** (per `mentor-guidance` §3): the question that would settle each one is answerable by the trainee after thinking, and answered nowhere else in the document.
- **"Still shaky" may not be empty.** One conversation rarely closes a concept; if nothing is shaky, record the boundary case the trainee has not met yet.
- **Keep the whole file to one screen** where the content allows. A concept note longer than a screen is a lecture, and the conversation already happened.
