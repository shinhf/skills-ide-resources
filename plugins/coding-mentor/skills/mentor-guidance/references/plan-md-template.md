# PLAN.md Template

> **MENTOR-SIDE REFERENCE.** This file is the shape to emit, not a document to hand over.
> **Do not paste the skeleton or these rules to a trainee** — a trainee handed the empty
> steps table fills it with six plausible-sounding activities instead of proposing a first
> step, which is the conversation this template exists to record, not to replace.

The literal skeleton to emit. Keep the section order and the table headings exactly as written, so every run produces a document the trainee already knows how to read.

Replace everything in `<angle brackets>`. Never delete a section — an empty risks list and an empty deferred list are themselves findings, and the plan must show that both questions were asked.

---

## Skeleton

````markdown
# Plan — <task name>

> Written from a mentoring conversation, produced by `/prepare-plan`. The steps below are the
> trainee's own, interrogated one at a time. Nothing here is code, and nothing here is a
> solution.

## Goal

<One sentence, restated — the outcome, not the activity. Shorter than the subject and in different words.>

## Steps

| # | Step | Input | Output | Done when |
|---|---|---|---|---|
| 1 | <a deliverable, not an activity> | <what must already exist for this step to start> | <what exists afterwards that did not before> | <a check the trainee can run without the mentor> |
| 2 | <step> | <input> | <output> | <check> |

<6-12 rows. Fewer means the task was not decomposed; more means sub-steps leaked in.>

## Known risks

- **<the risk, named>** — <the step it threatens, and the first sign it is happening>

## Deliberately deferred

- **<what is not being built yet>** — <the step that would have to exist first>

## Open questions

1. <question the trainee still has to answer, unanswered anywhere above>
2. <question>
````

---

## Rules for filling it in

- **The first line marks the document's origin.** The blockquote naming `/prepare-plan` and the mentoring conversation stays in every emitted plan. A plan that does not say where it came from reads as a delivered solution.
- **The document is written after the conversation, not before it.** Emit it once a session-level stop condition from `socratic-dialogue` fires, or whenever the trainee asks for the write-up — never unrequested before then.
- **An empty section is emitted with an em dash, never dropped.** A section with nothing in it — apart from one this template explicitly says to omit — carries a single `—` where its content would go, because an empty section is itself a finding: the reader must see that the question was asked and came back empty.
- **Settled and open stay separated.** The steps table, the risks and the deferred list hold only what the trainee actually worked out. Everything unresolved goes under **Open questions** and nowhere else. A step the trainee could not justify is an open question, not a row.
- **No transcript.** No "then I asked", no "you said", no question-and-answer log, no dialogue history. Every section states what is now known, in the present tense, as project documentation.
- **No code.** No pseudocode, no signatures, no types, no algorithm, no `def`/`function`/`int main` — not in a step name, not in a table cell, not in a risk.
- **Every step names a real input and a real output.** Both columns come from the trainee. A blank or hedged column means the step was never understood; leave it as an open question instead of filling it in on their behalf.
- **Every "done when" must be runnable by the trainee** without the mentor. `"the sample file's line count matches wc -l"` is checkable; `"the reader works"` is not.
- **Steps name deliverables, not activities.** `"reader turns a file into a list of lines"` beats `"start on parsing"`.
- **The ordering must be defensible.** Each step is either testable before the next one exists, or its dependency is visible in the Input column. Order that survives neither test is an open question about sequencing.
- **The open questions are Socratic** (per `mentor-guidance` §3): answerable by the trainee after thinking, and answered nowhere else in the document.
- **Cap the whole file at one screen where the content allows.** A plan a beginner cannot hold in their head is itself a planning error.
