# task_list.md Template — the Offline Fallback

> **MENTOR-SIDE REFERENCE.** This file is the shape to emit, not a document to hand over.
> **Do not paste the skeleton or these rules to a trainee.** The file that gets written
> from it is theirs; this template is the mentor's copy.

`task_list.md` is what gets written whenever the issues are **not** published: no GitHub repository, no project board, `gh` missing or unauthenticated, or the trainee declined. It holds every task's **full definition** — the complete issue body, one section per task, in the order the tasks should be done — so that publishing later is copy, paste, submit, with nothing to rewrite.

Each task body is written per the plugin skill `trainee-issue-writing` (`${CLAUDE_PLUGIN_ROOT}/skills/trainee-issue-writing/SKILL.md`). That is not a style preference: a body written to a different shape here produces a *different issue* when it is pasted in next month, and the point of this file is that the two are identical.

Write it beside `TASKS.md` in the current working directory. `TASKS.md` stays the plan; this file is the publishable form of the same plan, and the two must not disagree about ids, titles or order.

---

## Skeleton

````markdown
# Task list — <project name>

<One sentence: what this project must do when it is finished.>

These are the <n> tasks from `TASKS.md`, each written out as a complete issue definition.

**Why this file exists:** the issues were not published — <the reason: no GitHub repository /
no project board / `gh` not installed / `gh` not authenticated / publishing declined>.

**To publish them later:** create one issue per section below, in this order, so the issue
numbers read in the same sequence as the tasks. Paste the section body as the issue body
unchanged — it is already in the issue format this project uses. Add each new issue to a
project board afterwards if there is one.

---

## T1 — <title: the deliverable, as a noun phrase>

<The complete issue body for this task: all eight sections of the `trainee-issue-writing`
contract, in order and all present — Goal, Why this task exists, Done when, What you
already have, Concepts you may need, Constraints from the subject, Out of scope,
Questions to answer before you start. Copy the skeleton from
${CLAUDE_PLUGIN_ROOT}/skills/trainee-issue-writing/references/issue-template.md.
No code, no pseudocode, no signatures.>

---

## T2 — <title>

<The complete issue body for this task.>

---

<One section per task, in task order, to the end of the list.>
````

---

## Rules for filling it in

- **Full definitions, never summaries.** A section that says "see `TASKS.md`" defeats the whole file. Every section must stand alone as an issue body.
- **The document is written after the conversation, not before it.** Emit it once a session-level stop condition from `socratic-dialogue` fires, or whenever the trainee asks for the write-up — never unrequested before then.
- **An empty section is emitted with an em dash, never dropped.** A section with nothing in it — apart from one this template explicitly says to omit — carries a single `—` where its content would go, because an empty section is itself a finding: the reader must see that the question was asked and came back empty.
- **The body format is not negotiable.** Follow `${CLAUDE_PLUGIN_ROOT}/skills/trainee-issue-writing/SKILL.md` exactly — all eight sections, in order — so pasting a section into GitHub later produces the same issue that publishing now would have produced.
- **Order is the interface.** Sections appear in task order, so issues created from them get numbers in that order. Never sort alphabetically.
- **Ids and titles match `TASKS.md` character for character.** The two files are read side by side; a renamed title reads as a second task.
- **Name the reason once, at the top.** A trainee finding this file in three weeks needs to know whether the issues were skipped or simply not possible.
- **Dependencies are prose, not a feature.** A blocked task names its blocker inside the body ("cannot start before T3") rather than relying on a GitHub relationship the trainee may not have.
- **Tasks with status `DONE` or `DECIDED AGAINST` are not sections here.** This file is the publishable remainder; list them in one closing line instead, so nothing looks lost.
- **No code anywhere.** Same rule as everywhere else in this plugin: a task states what must be true, never how to make it true.
- **Do not add labels the trainee did not ask for.** Labels are optional and minimal; a body that assumes labels will not paste cleanly into a fresh repository.
