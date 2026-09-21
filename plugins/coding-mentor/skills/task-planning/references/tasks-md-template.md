# TASKS.md Template

> **MENTOR-SIDE REFERENCE.** This file is the shape to emit, not a document to hand over.
> **Do not paste the skeleton or these rules to a trainee** — a trainee reading the
> placeholders learns the template, and a trainee reading the filled file learns their
> project. Fill it in and hand over the result.

The literal skeleton to emit. Keep the section order, the checklist item shape and the table headings exactly as written, so every regeneration produces a document the trainee already knows how to read.

Replace everything in `<angle brackets>`. Delete the **Dropped** section only on a first run, when nothing has been dropped yet.

---

## Skeleton

````markdown
# Tasks — <project name>

<One sentence: what this project must do when it is finished, in plain language.>

> This is a list of what must become **true**, not of how to make it true. Every task
> ends with a check that can be run alone. What goes inside each task is yours to work out.

## Progress

<n> tasks · <n> done · <n> in progress · <n> blocked · derived from <which artifacts were found>

## Tasks

- [ ] **T1 — <title: the deliverable, as a noun phrase>**
      status: <TODO | IN PROGRESS | DONE | BLOCKED (blocker) | DECIDED AGAINST (verdict)> · size: <one sitting | half a sitting>
      done when: <a check the trainee can run themselves and read the result of>
      unblocks: <T-ids, or "nothing — this is a leaf">
      traces to: <build-order step / module / library decision / pattern verdict / subject constraint>

- [ ] **T2 — <title>**
      status: <status> · size: <size>
      done when: <check>
      unblocks: <T-ids>
      traces to: <source>

<Continue to between 8 and 15 tasks. Keep them in the order they should be done —
riskiest unknown first. Tick the box only when the "done when" check actually passes.>

## Dropped

| Id | Title | Why it was dropped |
|---|---|---|
| <T-id> | <title> | <the verdict, decision or artifact change that removed it> |

<Nothing is ever deleted from this file. A task that leaves the plan lands here with a
reason, so it stops being re-added by hand.>

## Start here

**<exactly one T-id and title>** — <why this one first: the unknown it retires, or what
goes wrong if it is discovered late>.

## Questions to answer before you start

1. <question>
2. <question>
3. <question>
````

---

## Rules for filling it in

- **Restatement, not transcription.** The goal sentence should be shorter than the subject and in different words. If it reads like a copy-paste, the project was not understood.
- **Every checklist item needs all five lines.** `status`, `size`, `done when`, `unblocks`, `traces to`. A missing `traces to` means the task was invented — remove the task, not the line.
- **Status comes from the five-value vocabulary only.** `TODO` / `IN PROGRESS` / `DONE` / `BLOCKED (name the blocker)` / `DECIDED AGAINST (name the verdict it came from)`. `BLOCKED` with an empty parenthesis is not a status, and a sixth status invented for one project makes the file unreadable on the next run.
- **The title is a deliverable, not an activity.** `"reader turns a file into a list of lines"` beats `"start working on parsing"`. A title beginning with "work on", "handle" or "improve" is an activity in disguise.
- **Every "done when" must be runnable without the mentor.** `"printing the line count of the sample file matches wc -l"` is checkable; `"the parser works"` is not. If the check needs the mentor to judge it, the task is not yet a task.
- **`unblocks` is what makes this a plan.** A list where every task unblocks nothing is a menu, and the trainee will pick the easiest item on it.
- **Tick from evidence, never from claim.** A box is ticked because the check passed in the repository, not because the task was attempted.
- **A ticked box survives regeneration.** The trainee's marks, notes and deliberate re-orderings are preserved even when the artifacts changed; say in one line which marks were kept.
- **No code anywhere.** No signatures, no types, no pseudocode, no `def`/`function`/`int main`. Not in a title, not in a "done when", not in the dropped table.
- **The closing questions are Socratic** (per `mentor-guidance` §3): answerable by the trainee after thinking, and none of them answered anywhere else in the document.
- **Exactly one task under "Start here".** Two recommendations are no recommendation.
- **Cap the whole file at roughly one screen of checklist.** A long task list for a beginner project is itself a planning error.
