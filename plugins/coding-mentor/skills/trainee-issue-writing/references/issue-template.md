# Trainee Issue Template

> **MENTOR-SIDE REFERENCE.** This file is the format, not a worksheet. **Do not hand it
> to a trainee.** A beginner given the skeleton fills all eight sections dutifully and
> learns the shape of a form; the teaching happens when the mentor fills it in from the
> subject and the trainee receives a task they can actually start.

The literal skeleton to emit. Keep the eight headings and their order exactly as written, so every issue in a project is a document the trainee already knows how to read.

Replace everything in `<angle brackets>`. No section is optional — a section with nothing in it means the task is not understood yet, not that the heading should be deleted.

---

## Title

One line, imperative verb plus the observable outcome, under roughly 60 characters:

```
<Verb> <the observable outcome>
```

`Report the largest file in a given directory` — correct.
`Implement file_scanner module` — a container, not an outcome.

---

## Skeleton

````markdown
## Goal

<One sentence, plain English: what must become true. No "and".>

## Why this task exists

<The pressure this traces back to: a step in the build order, a module boundary, a rule
in the subject, a grader requirement. One or two lines.>

## Done when

- [ ] <The one primary check, observable, runnable by the trainee alone.>
- [ ] <Optional secondary check.>
- [ ] <Optional secondary check. Never more than two.>

## What you already have

- <Provided and read-only component, fixture, or sample data.>
- <Prior work this builds on, by issue reference: #<n> — <what it left behind>.>

## Concepts you may need

- <subject name> — run `/explain-subject "<subject name>"`
- <subject name> — run `/explain-subject "<subject name>"`

<Names only. Three is the ceiling; a fourth means this issue is two issues.>

## Constraints from the subject

- <Language and version.>
- <Forbidden functions, allowed libraries.>
- <Required output format, exactly as specified.>
- <Linters, performance targets, anything a grader enforces.>

## Out of scope

- <What belongs to a later issue> — see #<n>.
- <What is deliberately not handled yet, and why it can wait.>

## Questions to answer before you start

1. <Socratic question.>
2. <Socratic question.>
3. <Socratic question.>

<If these cannot be answered, the issue is not ready to start — and that is useful.>
````

---

## Rules for filling it in

- **The goal is a restatement, not a transcription.** Shorter than the subject, in different words. If it reads like a copy-paste, the task was not understood.
- **One sentence means one sentence.** An "and" in the goal is the split tripwire firing. Split the issue; do not shorten the sentence.
- **Exactly one primary "Done when".** Two primary checks are two issues that happen to share a heading.
- **Every "Done when" must be runnable without the mentor.** `"the printed name matches the largest file shown by ls -S"` is checkable; `"the scanner works"` and `"tests pass"` are not — the first names no check, the second names a file that may not exist.
- **"Why this task exists" names a pressure, never a virtue.** `"the writer is the only place that guarantees the required output shape"` is a pressure; `"good separation of concerns"` is not.
- **"Concepts you may need" contains names and nothing else.** One sentence of explanation next to a concept name is where an issue starts becoming a tutorial. The invitation to `/explain-subject` is the whole mechanism.
- **Constraints are quoted, not remembered.** Read them off the subject each time. A misquoted forbidden-function list costs the trainee a grading run.
- **"Out of scope" carries references.** `"error handling comes later"` leaves a beginner guessing whether they are allowed to skip it. `"malformed rows — see #7"` closes the question.
- **The closing questions are answered nowhere else in the body.** A question whose answer is three lines up is decoration.
- **No solution anywhere.** No code, no pseudocode, no function signatures, no data-structure choices, no algorithm, no library the architecture never justified.
- **No hidden acceptance criteria.** Anything a reviewer would check appears under "Done when", before the work starts.
- **Second person stays inside the body.** The issue's reader is the trainee, so `"what you already have"` is right there and wrong everywhere else in this plugin.

---

## How this renders on GitHub

- **The title is the issue title field, not a heading in the body.** Nothing in the body is `#` — the top level inside a body is `##`, so the eight sections render as the largest headings and the issue does not appear to contain a nested document.
- **"Done when" items are task-list checkboxes** (`- [ ] `). GitHub renders them as tickable boxes and shows a `0 of 3` progress counter on the issue, which gives the trainee a self-service definition of finished. This is the one GitHub-specific affordance worth using; everything else stays plain Markdown so the same text survives being written to a local file.
- **Issue references (`#7`) auto-link** within the same repository and render with the target's title on hover — which is why dependencies belong in the body rather than in a repo feature that may be switched off.
- **Keep the whole body under one screen** — roughly 40 rendered lines. A beginner scrolling an issue is already looking for the part that tells them what to do, and everything below the fold is that part.
- **Code fences are for sample input and required output only.** A fence containing anything that could be typed into a source file is a spoiler, whatever language it claims.
