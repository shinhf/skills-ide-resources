# Coding Mentor

A Claude Code plugin that mentors beginner developers instead of solving their tasks for them. It explains what a task is asking, tells the trainee which subjects to study, reviews their algorithm, maps the architecture of the program they are about to write — and never hands over the code.

Calibrated for coding-school settings (School 42 Exam Rank 02 in particular), but the pedagogy applies to any beginner.

## Features

- **No spoilers by design.** Every command inherits a hard rule: never write the final code for the trainee's actual task.
- **Socratic by default.** Questions back, not answers down.
- **Real-life analogies** for the concepts that block beginners: pointers, invariants, tokenization, recursion.
- **Architecture without solutions.** Produces a Mermaid component diagram and rationale tables that explain *why* modules exist and *what* libraries are for — while leaving the algorithm entirely to the trainee.
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

### Skills

| Skill | Purpose |
|---|---|
| `mentor-guidance` | The behavioral base layer: no direct solutions, analogies, Socratic method, toy-example policy |
| `algorithm-review` | The 5-step review loop, plus a Rank 02 task bank, playbook and study plan |
| `architecture-mapping` | The 6-step mapping loop, decomposition patterns, Mermaid templates, dependency justification |

### Agent

| Agent | Role |
|---|---|
| `mentor` | Handles every command above. Acts as a mentor, never a code writer |

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

```
/understand-task  subjects/task_1.pdf
/advise-subjects  subjects/task_1.pdf
/explain-subject  "loop invariant"
/review-algorithm "walk the string, count non-delimiter runs, allocate that many boxes"
/map-architecture subjects/task_1.pdf
```

### What `/map-architecture` produces

An `ARCHITECTURE.md` in the current directory containing:

1. The task contract — input, required behavior, failure behavior.
2. A Mermaid component diagram, with **provided/read-only components separated from the trainee's own modules**.
3. A module table: responsibility, **which constraint forced the boundary**, and what breaks if you merge it.
4. A library table: what it's for, what you'd write by hand instead, and whether the standard library is honestly enough.
5. A build order, each step with a "done when" check the trainee can run.
6. Three to five questions to answer before writing any code.

It detects the stack from the directory (`pyproject.toml`, `package.json`, `*.csproj`, `go.mod`, `Cargo.toml`, `Makefile`) and asks if it cannot tell.

## Mentoring principles

- **Struggle is the curriculum.** A solution handed over is a lesson removed.
- **Toy examples must be unrelated** to the trainee's actual task.
- **Never give the exact command** — point at the `Makefile` or `--help` instead.
- **A module boundary needs a named pressure.** "It's cleaner" is not an architecture argument, and the architecture skill will not accept it.
- **Short beats thorough.** One sharp question beats five vague suggestions.

## Safety

- Commands are read-only except `/map-architecture`, which writes a single `ARCHITECTURE.md` and asks before overwriting an existing one.
- No command creates or modifies source files.
- `skills/algorithm-review/references/c-code-examples.md` and `skills/architecture-mapping/references/worked-example-call-me-maybe.md` are **mentor-side reference material**. They exist so the assistant can calibrate a correct answer, and are explicitly marked never to be pasted to a trainee.
