# UNDERSTANDING.md Template

> **MENTOR-SIDE REFERENCE.** This file is the shape to emit, not a document to hand over.
> **Do not paste the skeleton or these rules to a trainee** — a trainee given the empty
> skeleton fills the goal line by copying the subject, which is exactly the restatement the
> conversation exists to earn.

The literal skeleton to emit at the end of a `/understand-task` conversation. Keep the section order and the table headings exactly as written, so every run produces a document the trainee already knows how to read.

Replace everything in `<angle brackets>`. Never delete a section — an empty vocabulary table and an empty open-questions list are themselves findings, and the trainee must see that the question was asked.

---

## Skeleton

````markdown
# Understanding — <task name>

> Written from a mentoring conversation, produced by `/understand-task`. It records what the
> trainee worked out about the task; the open questions at the end are the parts still to settle.

**The goal, in one sentence:** <what this program must do, in the trainee's own words>

## Inputs

- **Arrives as:** <what the program receives, in what shape, from where>
- **Guaranteed:** <what may be assumed about it>
- **Not guaranteed:** <what may be missing, malformed, empty or oversized>

## Required output

- **Normal case:** <what is produced, in what form, where it goes>
- **On bad input:** <what must happen instead>

## Constraints from the subject

| Constraint | Where it comes from | What it rules out |
|---|---|---|
| <the named restriction> | <the subject's own wording or rule> | <the approach it forecloses> |

## How success is measured

1. **<check>** — <how the trainee runs it without help>
2. **<check>** — <how the trainee runs it without help>

## Vocabulary established

| Term | What it means here | Settled? |
|---|---|---|
| <word from the subject> | <the trainee's working definition> | <settled / still shaky> |

## Open questions

1. <question the conversation did not close>
2. <question the conversation did not close>
````

---

## Rules for filling it in

- **The opening blockquote stays.** It marks the document as the residue of a mentoring conversation and names `/understand-task` as its source, so a reader knows it is a record of what the trainee worked out rather than a specification handed down.
- **The document is written after the conversation, not before it.** Emit it once a session-level stop condition from `socratic-dialogue` fires, or whenever the trainee asks for the write-up — never unrequested before then.
- **An empty section is emitted with an em dash, never dropped.** A section with nothing in it — apart from one this template explicitly says to omit — carries a single `—` where its content would go, because an empty section is itself a finding: the reader must see that the question was asked and came back empty.
- **Separate settled from open.** Everything above **Open questions** is what the trainee actually worked out; anything the mentor supplied, or that no answer was reached on, belongs in **Open questions** or carries `still shaky` in the vocabulary table. Never present an answer the trainee did not reach as though they did.
- **No transcript.** No "then I asked", no "you said", no dialogue history, no question-and-answer log. Every section is a statement of what is now known about the project.
- **Restatement, not transcription.** The goal sentence must be shorter than the subject and in different words. If it reads like a copy-paste, the task was not understood and the line is not ready.
- **No code anywhere.** No pseudocode, no function signatures, no algorithm, no `def`/`function`/`int main` — not in table cells, not in the success checks, not in the open questions.
- **Every success check must be runnable by the trainee** without the mentor. `"the printed line count matches wc -l on the sample file"` is checkable; `"the parser works"` is not.
- **"Not guaranteed" is mandatory and may not be "nothing".** A task whose input is assumed perfect has not been read; if the subject is genuinely silent, record that silence as an open question.
- **The open questions are Socratic** (per `mentor-guidance` §3): answerable by the trainee after thinking, and none of them answered anywhere else in the document.
- **Keep the whole file to one screen** where the content allows. A long brief for a beginner task is itself a failure to restate.
