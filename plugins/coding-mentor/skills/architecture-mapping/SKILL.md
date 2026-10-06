---
name: architecture-mapping
description: Use when a trainee asks to map, diagram, or structure a not-yet-written programming task ("what modules do I need?", "how should I split this?", "draw the architecture", "write an ARCHITECTURE.md", "which files should this have?", "which libraries should I use and why?", "do I actually need this dependency?", "why is this split into five files?"). Produces an ARCHITECTURE.md with a Mermaid component diagram plus module- and library-rationale tables — never the algorithm and never the code. For task-to-design mapping, not for reverse-engineering an existing codebase. Calibrated for school tasks and School 42 curriculum projects.
version: 0.1.0
---

# Architecture Mapping

This skill is the mentor's playbook for turning a **task description** into a picture the trainee can hold in their head: which modules exist, why each one exists, and what every library is actually for.

Apply the no-spoiler rules from `mentor-guidance` at all times. The rule here is sharper than usual, because a diagram is very close to a solution:

> **Design the container, never the contents.** Naming a module `token-masking` is architecture. Explaining how to mask tokens is the solution.

Test for it: if a sentence would still be useful after deleting the diagram, it is describing *how* — cut it. Concretely: no function signatures, no types, no pseudocode, no `def` / `function` / `int main` — not in node labels, not in table cells, not in the build order.

**Every reference file in this skill is mentor-side.** They tell you which questions to ask. Handing a trainee the pattern table for their task shape is the same failure as handing them the code.

## When this skill applies

- Trainee has a subject/spec and does not know how many files to create.
- Trainee asks "why did this reference solution split things this way?".
- Trainee is about to install a package and cannot say what it buys them.
- Trainee wrote everything in `main` and senses it is wrong but cannot say why.

This skill maps a task **onto a design**. It is not for reverse-engineering an existing codebase; if the trainee has working code and wants it documented, that is a different job.

## Before you start

Load the turn-level protocol in `${CLAUDE_PLUGIN_ROOT}/skills/socratic-dialogue/SKILL.md` before the first question and follow it throughout: this skill owns the modules, that one owns what a single turn may contain, when the dialogue stops, and when the file may be written.

Settle three things first. The `/map-architecture` command handles them, but when this skill triggers on its own, it owns them:

1. **The stack.** Look for `pyproject.toml`, `requirements.txt`, `package.json`, `*.csproj`, `go.mod`, `Cargo.toml`, `Makefile`/`*.c` in the working directory. If that is ambiguous, **ask**. Never name libraries before the stack is settled — Step 5 and `${CLAUDE_PLUGIN_ROOT}/skills/architecture-mapping/references/library-rationale.md` are both organized by stack, and guessing produces confident nonsense.
2. **The write target.** `ARCHITECTURE.md` in the current working directory.
3. **Overwrite.** If `ARCHITECTURE.md` already exists, confirm before replacing it. The trainee's previous map may be the thing they are comparing against.

## The mapping loop

Run these six steps in order. **Steps 1–6 are turns, not narration** — each one is a question put to the trainee, and the answer that gets recorded is theirs: the contract, the provided/authored split, the seam, every module with the constraint that forced it, all three library answers, and the build order with its "done when" checks. A step the mentor answers on the trainee's behalf has been skipped, not completed. The only prose from the mentor is the write-up described in `## Output contract`, and it comes after the conversation.

### Step 1. Restate the contract
Before any boxes, get the task down to three lines, in the trainee's own words:
- **Input:** what arrives, in what shape, with what guarantees.
- **Required behavior:** what must be produced in the normal case.
- **Failure/edge behavior:** what happens on bad input, missing files, wrong arg count.

If the contract cannot be stated, the architecture cannot be drawn. Send them back to the subject.

### Step 2. Separate what is given from what you write
Split the world in two before decomposing anything:
- **Provided and read-only** — scaffold, vendored SDK, fixtures, grader, generated files.
- **Yours to author** — the only part the diagram is really about.

Trainees habitually draw every box as if it were theirs, then agonize over boundaries they do not control. Ask: *"Which of these could you delete and rewrite tomorrow, and which would the subject forbid you to touch?"*

### Step 3. Find the seams
Cut where the **reason to change** differs, not where the code happens to be long. The usual seams:
`input boundary -> parsing/validation -> core rules -> formatting -> output & side effects`

Load `${CLAUDE_PLUGIN_ROOT}/skills/architecture-mapping/references/decomposition-patterns.md` and match the task to a known shape before inventing one. Use its tables to choose your *questions*, not to hand over an answer.

### Step 4. Name each module, and name the constraint that created it
A module gets a **responsibility as a noun phrase**, never a file name, and it must come with the pressure that forced it into existence.

Then apply the falsifiable test. Ask the trainee: *what breaks if you merge this into its neighbor?* If the honest answer is "nothing", drop the box.

Load `${CLAUDE_PLUGIN_ROOT}/skills/architecture-mapping/references/constraint-to-module.md` for the catalog of pressures and the boundaries each one produces.

### Step 5. Justify every dependency
Three questions per library, no exceptions:
1. What does it do?
2. What would you write by hand without it?
3. Is the standard library honestly enough?

**The trainee answers all three.** If you answer them, they have learned a package list, not a decision. If the answer to (2) is "about ten lines", the answer is the standard library. Load `${CLAUDE_PLUGIN_ROOT}/skills/architecture-mapping/references/library-rationale.md` for the per-stack shortlists and the "no dependencies" case, which is frequently correct for a school task.

### Step 6. Order the build
Give a sequence the trainee can actually walk, each step with a **"done when"** check they can run themselves. Start with the step that de-risks the most: usually the one touching the unfamiliar provided component, never the "easy" CLI.

## Output contract

Write `ARCHITECTURE.md` with these headings, in this order, spelled exactly as written:

1. Title `# Architecture — <task name>`, a one-sentence restatement of the goal, then the blockquote marking the document as a map of the structure rather than the solution.
2. `## The contract` — **Input** · **Must do** · **Must handle**.
3. `## Components` — Mermaid `flowchart TD`, **4-7 authored nodes** (this is the cap the rest of the skill refers to), provided components in their own subgraph, edges labeled with the **data** that flows.
4. `## Modules` — `| Module | Responsibility | Which constraint forced it | What breaks if you merge it |`
5. `## Data flow` — a second Mermaid diagram only if the order of operations is non-obvious. Deleted outright otherwise; it is the only section that may be dropped.
6. `## Libraries` — `| Library | What it's for | What you'd write by hand instead | Is the stdlib enough? |`
7. `## Build order` — numbered, each step with a "done when" the trainee can run alone.
8. `## Questions to answer before you write code` — the 3-5 questions that remain **genuinely open** once the dialogue has finished. The Socratic questions are asked live, in the loop above; this section is not where they are deferred to. Anything the trainee actually settled belongs in the tables as a decision, and anything they did not work out is recorded as open rather than presented as though they had.

An open question inherited from an earlier artifact is listed once with a pointer to where it was first raised — not restated in full. Only what this conversation changed about it is written out.

Every other section is emitted even when it has nothing in it, carrying a single em dash rather than being dropped: an empty section is itself a finding. The fenced skeleton, the `<angle bracket>` placeholders and the fill-in rules live in `${CLAUDE_PLUGIN_ROOT}/skills/architecture-mapping/references/architecture-md-template.md`. **That template is enrichment, not a dependency — if it cannot be read, say so in one line and follow this contract.**

Section 3 may instead be a **dependency graph** when the trainee's question is about coupling or testability rather than data flow, or a **layer diagram** when the task genuinely has layers. Both are templated alongside the component diagram.

Diagram syntax and the blank -> annotated -> filled templates live in `${CLAUDE_PLUGIN_ROOT}/skills/architecture-mapping/references/mermaid-templates.md`.

## Calibration

A fully worked example — a task mapped end to end, with two real published solutions that decomposed it differently and a documented reason why — lives in `${CLAUDE_PLUGIN_ROOT}/skills/architecture-mapping/references/worked-example-call-me-maybe.md`. Read it to calibrate the depth and tone of a good answer.

## Hard refusals

- "Just create the files for me" -> refuse. Point at the build order and its first "done when".
- "Write the parser module" -> refuse. The diagram says what the module owes the rest of the program; the trainee writes what is inside it.
- "Which of these published solutions is the right one?" -> more than one can be right. Module boundaries follow from the pressures each author actually hit. Ask which pressures **their** version will face.
- The trainee's task matches a worked example this skill ships -> do **not** replay that example's module list **or its library table**. Run the loop on their statement of the task and let them arrive at their own boxes. (The shipped example's giveaway is a provided, read-only SDK exposing raw model logits with no generate call.)
- "Is 7 modules too many?" -> do not answer from the number alone. State the 4-7 cap once, then make them apply the merge test to the two smallest boxes. The cap is a smell detector, not a verdict.

## Keep it short

One screen of diagram, two tables, a build order. A trainee who receives fifteen modules learns nothing except that architecture is intimidating.
