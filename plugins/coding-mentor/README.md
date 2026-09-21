# Coding Mentor

A Claude Code plugin that mentors beginner developers by **talking with them**, not at them. Every command runs a conversation — one question at a time, waiting for an answer, coming down a hint ladder when the trainee is stuck, teaching whenever teaching is what's needed — and writes its result as project documentation at the end. It never hands over the solution to the trainee's own task.

Calibrated for coding-school settings (School 42 Exam Rank 02 in particular), but the pedagogy applies to any beginner.

## How the mentor behaves

Five rules govern every command:

1. **One question per turn, and then it waits.** The turn ends at the question mark — no second question and no answer in brackets. The one exception is rungs 4 and 5 of the ladder below, which pair one fact or one example with the re-asked question; that exception is what makes the teaching half of the protocol reachable at all.
2. **When the trainee is stuck, it descends a five-rung ladder**, one rung per turn: an open prompt → attention pointed at the right place → a narrowing question → one fact or analogy with the question re-asked → the step worked on an unrelated toy, with the next step handed back.
3. **It will teach anything. It will not answer the trainee's task.** These are different requests with opposite answers. *"Write this function for me"* is declined — it is a mentor, it does not provide answers, and a different tool exists for that. *"I don't understand pointers"* is never declined; that is the job.
4. **"Write up what we have" always works.** At any point the trainee can ask for the document and get it, covering what was settled and marking the rest open. Nobody loses work by running out of time.
5. **The documents are project documentation, not transcripts.** No question-and-answer log, no dialogue history — what is now known, and separately what is still open.

## Components

### Commands

Each runs a dialogue and writes one document at the end.

| Command | Argument | Dialogue | Artifact |
|---|---|---|---|
| `/understand-task` | `[pdf_file]` | The trainee states the goal before the mentor characterises it, then input, output, failure behaviour, success | `UNDERSTANDING.md` — task brief |
| `/advise-questions` | `[pdf_file]` | The subject's unknowns, asked one at a time; the trainee's own questions coached from vague to sharp | `QUESTIONS.md` — unknowns, each `SETTLED` / `PARTIAL` / `OPEN` |
| `/advise-subjects` | `[pdf_file]` | The trainee rates their own footing and does the triage; the mentor challenges a triage that looks wrong | `SUBJECTS.md` — triaged study plan |
| `/explain-subject` | `[concept]` | What the trainee already believes the term means, then analogy and an unrelated worked example | `CONCEPTS-<slug>.md` — one note per term |
| `/prepare-plan` | `[pdf_file]` | The trainee proposes each step; the mentor interrogates its input, output and "done when" | `PLAN.md` — implementation plan |
| `/review-algorithm` | `[algorithm-or-file]` | Five turns: contract → invariants → edge cases → complexity → translation. The mentor supplies none of the five answers | `REVIEW-<n>.md` — one per round |
| `/map-architecture` | `[task-file-or-description]` | Six turns; the trainee names every module, the constraint behind it, and answers all three library questions | `ARCHITECTURE.md` |
| `/advise-pattern` | `[module-or-task]` | The trainee names the force and answers the horizon test; web research on the language's catalogue is mentor-side | `PATTERNS.md` |
| `/plan-tasks` | `[optional: task-file-or-note]` | The trainee sizes each task, orders by risk, and writes every "done when" | `TASKS.md` (+ GitHub issues, or `task_list.md`) |

### Skills

| Skill | Purpose |
|---|---|
| `mentor-guidance` | The behavioural base layer: no solutions, analogies, Socratic method, toy-example policy, conversation-before-artifact — plus the five artifact templates |
| `socratic-dialogue` | The turn-level protocol: ten rules, the hint ladder, the stop conditions, the refusal, and the sourced pedagogy behind them |
| `algorithm-review` | The five-step review loop **as five turns**, plus a Rank 02 task bank, playbook and study plan |
| `architecture-mapping` | The six-step mapping loop, decomposition patterns, Mermaid templates, dependency justification |
| `pattern-advisory` | The six-step advisory loop, per-stack pattern catalogue, force-to-pattern catalogue, verdict vocabulary |
| `task-planning` | The seven-step planning loop, status vocabulary, merge-on-regenerate rule, GitHub publishing ladder |
| `trainee-issue-writing` | The eight-section issue body contract, titles and sizing tripwires |

### Agent

| Agent | Role |
|---|---|
| `mentor` | Handles every command. Asks, waits, teaches — never writes the trainee's code |

### Workshop material

`docs/workshop-call-me-maybe.md` — a trainee-facing, spoiler-free workshop running the nine commands as eleven timed stations, with spoken checkpoints, per-station stop conditions, facilitator notes and three schedule variants. Safe to hand out.

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

The commands are designed to run in order — each later one reads what the earlier ones left behind.

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

Expect six to twelve exchanges per command. Each one ends by writing its document; `docs/workshop-call-me-maybe.md` argues the order in full.

**Add `.coding-mentor/` to the project's `.gitignore`.** It holds mid-conversation state so a dialogue survives a restart. The nine documents are the product; that directory is scratch.

### The artifact chain

| Artifact | Written by | Feeds |
|---|---|---|
| `UNDERSTANDING.md` | `/understand-task` | everything downstream |
| `QUESTIONS.md` | `/advise-questions` | `/advise-subjects`, `/prepare-plan` |
| `SUBJECTS.md` | `/advise-subjects` | `/explain-subject` |
| `CONCEPTS-<slug>.md` | `/explain-subject` | the build loop |
| `PLAN.md` | `/prepare-plan` | `/review-algorithm`, `/map-architecture` |
| `REVIEW-<n>.md` | `/review-algorithm` | the next round |
| `ARCHITECTURE.md` | `/map-architecture` | `/advise-pattern`, `/plan-tasks` |
| `PATTERNS.md` | `/advise-pattern` | `/plan-tasks` |
| `TASKS.md` | `/plan-tasks` | the build loop, and its own next regeneration |

`task_list.md` appears only as the fallback when GitHub issues are not published.

## Mentoring principles

- **Struggle is the curriculum.** A solution handed over is a lesson removed.
- **Ask before explaining.** A mentor who explains first has taken the thinking away before it started.
- **Teaching is never refused.** Withholding a solution is the rule; withholding help is a different thing, and not one this plugin does.
- **Toy examples must be unrelated** to the trainee's actual task.
- **A module boundary needs a named pressure**, and the trainee names it. "It's cleaner" is not an architecture argument.
- **A pattern needs a named force.** Same rule, one level down.
- **A task names the outcome and the check, never the method.** A "done when" the mentor invented is one the trainee cannot run.
- **Short beats thorough.** One sharp question beats five vague suggestions.

## On the evidence

The `socratic-dialogue` skill cites its sources and tags each claim by strength, and it deliberately does **not** repeat two claims this kind of tool usually makes:

- **Bloom's "2 sigma" does not survive audit.** It rested on two dissertations with narrow experimenter-made tests; of 96 reviewed tutoring studies none reproduced a two-sigma effect, and the average was ~0.37 SD. The plugin cites ~0.4 SD or nothing.
- **Conversation has not been shown to beat good explanation.** VanLehn's interaction plateau found step-level tutoring statistically indistinguishable from human tutoring, and finer conversational elaboration bought no additional measured learning. The case for dialogue here rests on diagnosis, engagement and learner ownership — not a proven learning-gain multiplier.

There is also a documented failure mode this design guards against: a Socratic AI tutor studied across 18 schools refused direct answers, offered questions instead, and was largely abandoned with no measurable benefit. Hence principle 3 above — the refusal covers the trainee's task, never their confusion.

## Safety

- **All nine commands write files**, each asking before overwriting, and none writing before the conversation has produced something. `/review-algorithm` and `/explain-subject` never overwrite an earlier round or a different concept's note. `/plan-tasks` merges rather than clobbers.
- No command creates or modifies source files. The trainee writes every line of the program.
- `/plan-tasks` is the only command that can make an outward-facing change — creating GitHub issues. It never does so without explicit confirmation, never publishes an issue the trainee has not seen, and never fails when `gh` is missing: every step degrades to a written file. The project board is always chosen at run time; no owner, organisation or project number is hardcoded.
- `/advise-pattern` is the only command that browses the web (**WebSearch** / **WebFetch**), to establish the pattern vocabulary of the trainee's language. `/plan-tasks` touches the network only through `gh`. The remaining seven work entirely from local input.
- Everything under `skills/*/references/` is **mentor-side reference material**, marked never to be pasted to a trainee — the reference C solutions and the architecture worked example most sharply, but the dialogue-move catalogue too: a trainee who reads ahead to the questions coming next answers the script instead of the problem.
- `docs/workshop-call-me-maybe.md` is the one document that **is** safe to hand out. It says so on its first line, and contains no module list, no dependency list and no technique for the task it is built around.
