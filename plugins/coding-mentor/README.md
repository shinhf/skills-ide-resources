# Coding Mentor

A Claude Code plugin that mentors beginner developers instead of solving their tasks for them. It explains what a task is asking, tells the trainee which subjects to study, reviews their algorithm, maps the architecture of the program they are about to write, says whether a design pattern actually belongs there, and turns all of it into a task list they can start on alone — and never hands over the code.

Calibrated for coding-school settings (School 42 Exam Rank 02 in particular), but the pedagogy applies to any beginner.

## Features

- **No spoilers by design.** Every command inherits a hard rule: never write the final code for the trainee's actual task.
- **Socratic by default.** Questions back, not answers down.
- **Real-life analogies** for the concepts that block beginners: pointers, invariants, tokenization, recursion.
- **Architecture without solutions.** Produces a Mermaid component diagram and rationale tables that explain *why* modules exist and *what* libraries are for — while leaving the algorithm entirely to the trainee.
- **Patterns with a named force, or not at all.** Researches the pattern vocabulary of the trainee's own language, then gives a verdict per candidate. The most common verdict is that no pattern is needed, and that is a real answer.
- **Work the trainee can start alone.** Derives the remaining tasks from the artifacts already produced, sizes each to one sitting, attaches a "done when" check to every one, and optionally publishes them as GitHub issues written for a beginner.
- **Clarify-first.** Every command asks structured questions before producing anything, and those questions never leak the answer.

## Components

### Commands

| Command | Argument | What it does |
|---|---|---|
| `/understand-task` | `[pdf_file]` | Beginner-friendly overview of the task's goal, no solution |
| `/advise-subjects` | `[pdf_file]` | The programming concepts to study before attempting it |
| `/advise-questions` | `[pdf_file]` | Guiding questions the trainee should ask themselves |
| `/explain-subject` | `[concept]` | Explains one term with real-life examples and unrelated toy snippets |
| `/prepare-plan` | `[pdf_file]` | Drafts a high-level implementation plan, no code |
| `/review-algorithm` | `[algorithm-or-file]` | Socratic review of pseudocode: contract, invariants, edge cases, complexity |
| `/map-architecture` | `[task-file-or-description]` | Writes `ARCHITECTURE.md` — component diagram, module rationale, library rationale |
| `/advise-pattern` | `[module-or-task]` | Writes `PATTERNS.md` — the forces present, ≤3 candidates with a verdict each, and what the language already gives you |
| `/plan-tasks` | `[optional: task-file-or-note]` | Writes `TASKS.md` from every earlier artifact, then offers to publish it as GitHub issues |

### Skills

| Skill | Purpose |
|---|---|
| `mentor-guidance` | The behavioral base layer: no direct solutions, analogies, Socratic method, toy-example policy |
| `algorithm-review` | The 5-step review loop, plus a Rank 02 task bank, playbook and study plan |
| `architecture-mapping` | The 6-step mapping loop, decomposition patterns, Mermaid templates, dependency justification |
| `pattern-advisory` | The 6-step advisory loop, the per-stack pattern catalogue, the force-to-pattern catalogue, the verdict vocabulary |
| `task-planning` | The 7-step planning loop, status vocabulary, merge-on-regenerate rule, GitHub publishing ladder |
| `trainee-issue-writing` | The eight-section issue body contract, titles and sizing tripwires — the body text only; `task-planning` owns publishing |

### Agent

| Agent | Role |
|---|---|
| `mentor` | Handles every command above. Acts as a mentor, never a code writer |

### Workshop material

`docs/workshop-call-me-maybe.md` — a trainee-facing, spoiler-free workshop that runs the nine commands in order as timed stations, with checkpoints, facilitator notes, schedule variants and a one-page trainee worksheet. Safe to hand out.

## Installation

From this repository's marketplace:

```
/plugin marketplace add .
/plugin install coding-mentor@skills-ide-resources
```

Or load the directory directly for local development:

```bash
claude --plugin-dir ./plugins/coding-mentor
```

## Usage

The commands are designed to run in order. Each later one reads what the earlier ones left behind.

```
/understand-task  subjects/task_1.pdf
/advise-questions subjects/task_1.pdf
/advise-subjects  subjects/task_1.pdf
/explain-subject  "loop invariant"
/prepare-plan     subjects/task_1.pdf
/review-algorithm "walk the string, count non-delimiter runs, allocate that many boxes"
/map-architecture subjects/task_1.pdf
/advise-pattern   "the exporter module"
/plan-tasks
```

Individual commands work standalone, but `/advise-pattern` reads `ARCHITECTURE.md` for the constraint behind each module boundary, and `/plan-tasks` reads everything — so running them out of order costs them their best input. `docs/workshop-call-me-maybe.md` argues the order in full.

### The artifact chain

Three artifacts, written to the project root, each feeding the next — plus one fallback file:

| Artifact | Written by | Feeds |
|---|---|---|
| `ARCHITECTURE.md` | `/map-architecture` | `/advise-pattern`, `/plan-tasks` |
| `PATTERNS.md` | `/advise-pattern` | `/plan-tasks` |
| `TASKS.md` | `/plan-tasks` | the build loop, and its own next regeneration |
| `task_list.md` | `/plan-tasks`, fallback only | pasting into GitHub later by hand |

### What `/map-architecture` produces

An `ARCHITECTURE.md` in the current directory containing:

1. The task contract — input, required behavior, failure behavior.
2. A Mermaid component diagram, with **provided/read-only components separated from the trainee's own modules**.
3. A module table: responsibility, **which constraint forced the boundary**, and what breaks if you merge it.
4. A library table: what it's for, what you'd write by hand instead, and whether the standard library is honestly enough.
5. A build order, each step with a "done when" check the trainee can run.
6. Three to five questions to answer before writing any code.

It detects the stack from the directory (`pyproject.toml`, `package.json`, `*.csproj`, `go.mod`, `Cargo.toml`, `Makefile`) and asks if it cannot tell.

### What `/advise-pattern` produces

A `PATTERNS.md` in the current directory containing:

1. The module under review.
2. A forces table: the force, the evidence for it in this task, and which constraint in `ARCHITECTURE.md` it traces to.
3. At most three candidates evaluated, each with one verdict from a fixed vocabulary — **ADOPT NOW**, **ADOPT LATER (name the trigger)**, **NOT NEEDED**, **ALREADY PRESENT (unnamed)**, **BUILT INTO THE LANGUAGE**, **OVERENGINEERING**.
4. The recommendation, which is frequently "none".
5. What the language gives you instead of the pattern.
6. Sources for every non-obvious claim.
7. Questions to answer before applying anything.

It settles the stack first, then researches that language's own catalogue on the web, because a large part of the classic pattern list is a workaround for a language feature the trainee may already have.

### What `/plan-tasks` produces

A `TASKS.md` in the current directory containing 8–15 tasks, each sized to one sitting, ordered so the riskiest unknown is confronted first, and each carrying a **"done when"** check the trainee can run themselves. Statuses come from a fixed vocabulary: `TODO`, `IN PROGRESS`, `DONE`, `BLOCKED (name the blocker)`, `DECIDED AGAINST (name the verdict it came from)`.

Re-running it updates rather than replaces: a ticked task stays ticked, trainee notes survive, and a task the artifacts no longer support moves to a dropped section with its reason instead of vanishing.

At the end it asks whether there is a GitHub repository and a project board, and on explicit confirmation creates one issue per task with `gh` and adds each to the chosen board. The board is always the trainee's choice at run time — no owner, organisation or project number is hardcoded. If there is no repository, no board, `gh` is unavailable, or the trainee declines, it writes `task_list.md` with every task's full issue-ready definition instead.

## Mentoring principles

- **Struggle is the curriculum.** A solution handed over is a lesson removed.
- **Toy examples must be unrelated** to the trainee's actual task.
- **Never give the exact command** — point at the `Makefile` or `--help` instead.
- **A module boundary needs a named pressure.** "It's cleaner" is not an architecture argument, and the architecture skill will not accept it.
- **A pattern needs a named force.** Same rule, one level down. A pattern with no pressure behind it pays for indirection today and buys flexibility that never arrives.
- **A task names the outcome and the check, never the method.** A "done when" only a mentor can judge teaches dependence.
- **Short beats thorough.** One sharp question beats five vague suggestions.

## Safety

- Three commands write files: `/map-architecture` writes `ARCHITECTURE.md`, `/advise-pattern` writes `PATTERNS.md`, and `/plan-tasks` writes `TASKS.md` (and `task_list.md` as a fallback). Each asks before overwriting an existing file, and `/plan-tasks` merges rather than clobbers. The remaining six commands are read-only.
- No command creates or modifies source files. The trainee writes every line of the program.
- `/plan-tasks` is the only command that can make an outward-facing change — creating GitHub issues. It never does so without an explicit confirmation in the session, never publishes an issue the trainee has not seen, and never fails because `gh` is missing or unauthenticated: every step degrades to a written file.
- `/advise-pattern` is the only command that browses the web (**WebSearch** / **WebFetch**), to establish the pattern vocabulary of the trainee's language. `/plan-tasks` touches the network only through `gh`, and only to publish issues the trainee has already approved. The remaining seven commands work entirely from local input.
- The following are **mentor-side reference material**. They exist so the assistant can calibrate a correct answer, and are explicitly marked never to be pasted to a trainee:
  - `skills/algorithm-review/references/c-code-examples.md`
  - `skills/architecture-mapping/references/worked-example-call-me-maybe.md`
  - `skills/pattern-advisory/references/*.md`
  - `skills/task-planning/references/*.md`
  - `skills/trainee-issue-writing/references/*.md`
- `docs/workshop-call-me-maybe.md` is the one document in the plugin that **is** safe to hand to a trainee. It says so on its first line, and it deliberately contains no module list, no dependency list and no technique for the task it is built around.
