# SUBJECTS.md Template

> **MENTOR-SIDE REFERENCE.** This file is the shape to emit, not a document to hand over.
> **Do not paste the skeleton or these rules to a trainee** — a trainee given the empty
> skeleton fills the need-now table with every concept they have heard of, which is the triage
> this command exists to make them do properly.

The literal skeleton to emit at the end of an `/advise-subjects` conversation. Keep the section order and the table headings exactly as written, so every run produces a document the trainee already knows how to read.

Replace everything in `<angle brackets>`. Never delete a section — an empty need-later table is a finding, and a concept nobody triaged belongs in the open section rather than being quietly sorted.

---

## Skeleton

````markdown
# Subjects — <task name>

> Written from a mentoring conversation, produced by `/advise-subjects`. The triage is the
> trainee's own; the footing column is their self-assessment, not a test result.

**Study first:** <the one need-now concept to start on> — <why that one first>

## Need now

| Concept | Why it blocks this task | Where to start |
|---|---|---|
| <the concept> | <the thing in this task that cannot be done without it> | <the one source or exercise to begin with> |

## Need later

| Concept | Why it can wait | What makes it need-now |
|---|---|---|
| <the concept> | <what in this task does not depend on it> | <the observable change that promotes it> |

## Footing, self-assessed

| Concept | Trainee's own rating | Mentor's note |
|---|---|---|
| <the concept> | <could explain it / has only read about it / the word is new> | <only where the placement was challenged, else —> |

## Open — not yet triaged

1. <concept raised but never placed, and what would place it>
````

---

## Rules for filling it in

- **The opening blockquote stays.** It marks the document as the residue of a mentoring conversation and names `/advise-subjects` as its source, so a reader knows the triage came from the trainee rather than from the mentor.
- **The document is written after the conversation, not before it.** Emit it once a session-level stop condition from `socratic-dialogue` fires, or whenever the trainee asks for the write-up — never unrequested before then.
- **An empty section is emitted with an em dash, never dropped.** A section with nothing in it — apart from one this template explicitly says to omit — carries a single `—` where its content would go, because an empty section is itself a finding: the reader must see that the question was asked and came back empty.
- **Separate settled from open.** Both tables hold only concepts the trainee placed themselves, with the reason they gave. Anything they never sorted, or that the mentor sorted for them, goes in **Open — not yet triaged**. Never present a placement the trainee did not make as though they did.
- **No transcript.** No "then I asked", no "you said", no dialogue history, no question-and-answer log. Every row is a statement of what is now known about this project's study needs.
- **No code anywhere.** No pseudocode, no function signatures, no algorithm, no library calls — not in "where to start", not in the footing notes.
- **Cap both tables together at 5–8 concepts.** A beginner handed twenty subjects reads for a week and writes nothing; if the list wants to be longer, the need-later rows were not filtered.
- **"Why it blocks this task" names something in this task.** `"the input arrives as a pointer to a buffer"` blocks; `"it comes up a lot in C"` does not, and demotes the row to need-later.
- **"Where to start" is one concrete starting point**, not a reading list — a single manual page, a single exercise, a single chapter.
- **The footing rating is quoted, never corrected.** The mentor's note exists only where a placement was challenged, and says what the challenge was about, not who was right.
- **"What makes it need-now" is an observable event**, never a date and never "when the project gets bigger".
- **The open entries carry a Socratic question** (per `mentor-guidance` §3): what would place an untriaged concept is a question the trainee can answer after thinking, and it is answered nowhere else in the document.
- **Keep the whole file to one screen** where the content allows. A study plan longer than the task is a plan that will not be followed.
