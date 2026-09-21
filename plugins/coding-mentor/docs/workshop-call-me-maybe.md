> **TRAINEE-FACING — safe to hand out.** This document contains no solution, no module list and no dependency list for the task. The mentor-side calibration material is pointed at, never quoted (see the facilitator appendix).

# Workshop — Approaching "Call Me Maybe" with the Coding Mentor Plugin

This is the facilitator script and the trainee handout for a guided session on a single unfamiliar task. It teaches a **method for entering a task nobody has explained to you yet** — read, interrogate, study, plan, defend the plan, structure, then slice into work. The task is the vehicle. The method is the lesson.

Use it as a running order, not as a lecture. Every station ends with an artifact the trainee wrote and can defend. Nothing in here tells a trainee what their program should look like inside, and it must not be used that way: if you find yourself wanting to add the answer to make a station "clearer", you have found the exact place where the trainee is supposed to think.

| | |
|---|---|
| **Audience** | Beginner-to-intermediate developers facing their first large, under-specified task |
| **Safe to hand to** | Trainees, including trainees currently doing this task |
| **Prerequisites** | Basic Python; comfortable with a terminal and `git`; has read nothing about the task yet |
| **Duration** | Half day (about 4.5 hours with breaks) — 90-minute and two-session variants below |
| **Group size** | 4–12, pairs or solo at one machine each, one facilitator |
| **Trainee leaves with** | `ARCHITECTURE.md`, `PATTERNS.md`, `TASKS.md` (or `task_list.md`), published issues if they have a board, a filled worksheet, and the first task in progress |
| **Plugin** | `coding-mentor` — nine commands, four artifacts, no code written for you |

---

## Learning outcomes

By the end of the session, a trainee can do each of these in front of a facilitator, without notes:

1. **State the task's contract in three lines** — input, required behaviour, failure behaviour — from the subject alone, and point at the sentence in the subject that each line came from.
2. **Separate what is given from what they author** — name every provided, read-only component in the repo and say why it is a constraint rather than a design choice.
3. **Name the pressure behind every module boundary** on their own diagram, and say what breaks if that module is merged into its neighbour.
4. **Defend or drop every dependency** with the three-question test: what it does, what they would write by hand instead, whether the standard library is honestly enough.
5. **Deliver a pattern verdict in the plugin's vocabulary** and be comfortable when that verdict is NOT NEEDED.
6. **Recite the "done when" of their first task** — a check they can run in a terminal — without reopening `TASKS.md`.

Note what is not on that list: writing the program. The build starts in this session and finishes outside it.

---

## What this workshop will not give you

**Struggle is the curriculum. A solution handed over is a lesson removed.**

This document deliberately does not contain, and no facilitator should add:

- Any module list, file layout or proposed decomposition for this task.
- Any dependency list, or the name of any third-party library for this task.
- Any technique, strategy or algorithm for producing the required output.
- Any claim about how many modules the "right" answer has.
- Anything you could copy into a design and skip the thinking.

Where a section could only be made more helpful by adding one of those, it instead gives you **the question to answer**. That trade is on purpose, and it is the whole product. The plugin behaves the same way — every command in it refuses to write your code, and it will keep refusing however you phrase the request.

**Bottom line for the trainee:** you will leave with your own design, defensible by you, and possibly different from your neighbour's. Both can be right. Neither is right because it was handed over.

---

## Materials and setup

Setup problems eat workshops. Everything below is done **before** the session starts — send it out the day before and ask for a green checklist by email or chat.

Each trainee needs:

- **The subject** — the task PDF or markdown file, in the repo, path known. Nobody reads it yet.
- **The repo cloned**, with the provided material in place: two JSON inputs (a set of function definitions with typed parameters, and a list of natural-language prompts), the vendored SDK for the small local model, and the grader CLI.
- **The stack working** — Python, `uv`, the linter and the strict type checker the subject requires. `uv sync` completes without errors.
- **The provided SDK installed and importable.** It is read-only; do not modify it, and do not read ahead — discovering its surface is Station 0 work.
- **The grader runnable** — it runs and reports a score, even a score of zero.
- **Claude Code with the `coding-mentor` plugin available** — `/understand-task` appears in the command list.
- **A place to write** — one markdown file per trainee, for the worksheet below.
- **Optional but better:** a GitHub repo and a project board they can publish issues to, and `gh` authenticated. Without it Station 9 falls back to a file, which works fine.

### Pre-flight checklist

Run this at the machine, not from memory. Every line must pass before Station 0.

```
[ ] git clone done, subject file present, path noted
[ ] uv sync completes with no errors
[ ] python -c "import <provided sdk package>" succeeds
[ ] the model loads without a network connection
[ ] the grader CLI runs and prints a score (zero is fine)
[ ] the linter and the type checker both run to completion
[ ] claude launches; /understand-task is listed
[ ] subject NOT yet read   <-- deliberately unchecked
[ ] worksheet file created and empty
```

> **Facilitator note.** Expect one machine to fail on the model download and one on the type checker. Budget fifteen minutes before the official start for these, and pair a broken machine with a working one rather than debugging it while nine people wait.

---

## The command order

This is the core of the document. Run the session from this table and the checkpoints.

| # | Station | Command | Time | You leave with |
|---|---|---|---|---|
| 0 | Read the subject yourself | *(none — no terminal)* | 20 min | A three-line contract in your own handwriting, and a list of words you do not know |
| 1 | Orient | `/understand-task <subject>` | 15 min | Confirmation or correction of your contract; the unfamiliar vocabulary named |
| 2 | Interrogate | `/advise-questions <subject>` | 25 min | Written answers to the questions, and the ones you could not answer marked |
| 3 | Study list | `/advise-subjects <subject>` | 15 min | A study list triaged into "need now" and "need later" |
| 4 | Unblock | `/explain-subject "<term>"` | on demand | One concept understood, then straight back to the station you left |
| 5 | Plan | `/prepare-plan <subject>` | 25 min | A plain-English plan you own and can read aloud |
| 6 | Defend the plan | `/review-algorithm "<your plan>"` | 30 min | A plan that survived two or three rounds of questions |
| 7 | Structure | `/map-architecture <subject>` | 25 min | `ARCHITECTURE.md` — diagram, module table, library table, build order |
| 8 | Patterns | `/advise-pattern <module-or-task>` | 20 min | `PATTERNS.md` — a verdict per candidate, usually NOT NEEDED |
| 9 | Slice into work | `/plan-tasks` | 25 min | `TASKS.md`, plus issues on your board or `task_list.md` |
| 10 | Build | *(your editor, plus 4 and 6 as needed)* | rest of session | The first task's "done when" passing |

All artifacts land in the project root: `ARCHITECTURE.md`, `PATTERNS.md`, `TASKS.md`, and `task_list.md` only as a fallback.

---

### Station 0 — Read the subject yourself, unaided

No terminal. No plugin. No search. Paper or a plain text file.

**Timebox:** 20 minutes. **Non-negotiable, and the most-skipped step in this workshop.**

Produce, alone:

- The contract in three lines — input, required behaviour, failure behaviour.
- The success condition: what the grader measures, and what target the subject sets for accuracy and for JSON validity.
- A list of every word in the subject you cannot define. Do not look any of them up yet.

**Checkpoint (under a minute):** the facilitator reads the three lines and asks "which sentence of the subject gave you line two?" A trainee who cannot point at it has skimmed.

> **Facilitator note.** Everyone will want to open the plugin first — the whole session looks like a tool demo from the outside. Say it plainly: the plugin's answers are only useful against a reading you already have. Without your own reading you cannot tell a good answer from a confident one.

> **Facilitator note.** The "words I do not know" list feels like an admission of weakness, so it comes back empty. Push back with "you wrote nothing down — so define the output format for me in one sentence." The list fills up immediately.

---

### Station 1 — `/understand-task` — orient and confirm

```
/understand-task subjects/call-me-maybe.pdf
```

**Timebox:** 15 minutes.

The mentor gives a beginner-level overview of the goal and the constraints — no solution. Read it against your own contract from Station 0 and mark the differences. **The differences are the point.** Where the overview and your reading disagree, one of you misread the subject; go back to the subject and settle it.

**Produce:** a corrected three-line contract, and the vocabulary list from Station 0 now sorted into "blocks me now" and "can wait".

**Checkpoint:** the trainee names one thing they had wrong at Station 0. If nothing changed, they either read very well or did not compare — ask which line they checked most carefully.

> **Facilitator note.** The mentor will ask clarifying questions before it answers, and those questions never contain the answer. Trainees read the questions as evasion. Reframe it: being asked which task you mean is the same discipline you are learning.

---

### Station 2 — `/advise-questions` — interrogate the subject

```
/advise-questions subjects/call-me-maybe.pdf
```

**Timebox:** 25 minutes, and this station is worth its length.

You get guiding questions, not answers. **You answer them in writing.** Typing "yes" in the chat does not count; write the answers into your worksheet in full sentences, each one traced to the subject or to something you can check in the repo.

**Produce:** written answers, with every unanswerable question marked. The marked ones are your real backlog — they become study topics at Station 3 or questions the subject genuinely does not answer, in which case you decide and record the decision.

**Checkpoint:** the facilitator picks one question at random and asks for the written answer and its source. "I know it but did not write it" is a fail — write it.

> **Facilitator note.** One sharp question beats five vague suggestions, and the same is true of answers. When a trainee writes three words per question, hand the worksheet back and ask them to answer just one question properly. They usually discover mid-sentence that they cannot.

> **Facilitator note.** This is where trainees try to make the mentor answer its own questions. It will not. Point at the plugin's hard refusals and move on — do not litigate it in front of the room.

---

### Station 3 — `/advise-subjects` — the study list, triaged

```
/advise-subjects subjects/call-me-maybe.pdf
```

**Timebox:** 15 minutes.

You get the concepts to study before coding, each with a reason. Left untriaged, this list becomes a week of reading and no program. Triage it yourself:

- **Need now** — blocks the very next step. At most three items.
- **Need later** — real, but it can wait until a task actually demands it.

**Produce:** the triaged list in the worksheet, with a one-line reason for each "need now".

**Checkpoint:** the "need now" column has three items or fewer, and the trainee can say which station each one unblocks.

> **Facilitator note.** A long "need now" column is avoidance wearing a study hat. Ask: "which of these do you need to write the *first* task?" Everything else drops a column.

---

### Station 4 — `/explain-subject` — the on-demand loop

```
/explain-subject "JSON schema"
/explain-subject "vendored dependency"
```

**Not a station with a fixed time.** It runs from Station 1 to the end of the session, whenever a term blocks you.

The rule keeps it from becoming a detour: **one term, then straight back to the station you left.** You get real-life analogies and toy examples on unrelated problems — that is deliberate, and asking for an example closer to your task will get you another unrelated one.

**Produce:** nothing filed. A concept you can explain to your pair in one sentence.

**Checkpoint:** the trainee explains the term to their neighbour without using the plugin's words.

> **Facilitator note.** Three consecutive `/explain-subject` calls means someone has stopped working and started browsing. Interrupt: "which station are you on, and what is the next thing you have to write?"

---

### Station 5 — `/prepare-plan` — a plan the trainee owns

```
/prepare-plan subjects/call-me-maybe.pdf
```

**Timebox:** 25 minutes.

Plain English, logical steps, inputs and outputs per step. No code, and none is coming. What matters is that the plan is **yours**: rewrite it in your own words in the worksheet. A plan you cannot read aloud from memory is a plan you will not be able to defend at Station 6 or debug at Station 10.

**Produce:** six to twelve lines of plain-English steps, each with what goes in and what comes out.

**Checkpoint:** the trainee reads the plan aloud with the screen turned away. Hesitation at a step is the step to rework.

> **Facilitator note.** Watch for plans made of nouns — "handle the input, process it, write the output". Ask what "process" means in terms of what goes in and what comes out. That single question usually doubles the plan's length and halves its vagueness.

---

### Station 6 — `/review-algorithm` — Socratic review, two or three rounds

```
/review-algorithm "<paste your plan, or a path to it>"
```

**Timebox:** 30 minutes. **Expect two or three iterations** — the first review is never the last.

You get a handful of sharp questions aimed at the weakest part of the plan, at most one analogy, and one next action. You revise the plan yourself and bring it back. The mentor will not rewrite it for you.

Each round walks the same ground: the contract, the invariant that holds every time round the loop, the edge cases, the cost, and the translation checkpoint — what variables exist and what exactly gets written out.

**Good enough to proceed** — all four of these, or you go round again:

- The contract survives the review unchanged.
- You can name what is true at every pass through the main loop.
- You have at least three edge cases, one of them from the failure line of your contract.
- You can say which step of the plan will be hardest to turn into code, and why.

**Produce:** a plan with a revision history — two or three visibly different versions in the worksheet.

**Checkpoint:** the facilitator asks for the edge case the trainee added in round two. One that came from the review and not from the original plan proves the loop ran.

> **Facilitator note.** Rounds are not failure. Say so at the start of the station, or the first review lands as criticism and the trainee defends their plan instead of improving it.

> **Facilitator note.** A trainee stuck at round four has a contract problem, not a plan problem. Send them back to the subject for five minutes. It is almost always the failure line.

---

### Station 7 — `/map-architecture` — structure, after the plan

```
/map-architecture subjects/call-me-maybe.pdf
```

**Timebox:** 25 minutes. Writes `ARCHITECTURE.md` in the project root, and asks before overwriting one.

**Why this comes after the plan, not before.** A module boundary needs a named pressure, and pressures come from the plan — from the step that repeats, the step that could fail, the step whose input shape is not the program's input shape. Map first and you are decorating a guess: boxes chosen by taste, then a plan bent to fit them. Plan first and every box has a reason you lived through.

`ARCHITECTURE.md` gives you the contract, a component diagram with the provided read-only pieces in their own subgraph, a module table naming the constraint behind each boundary and what breaks if you merge it, a library table, a build order with a "done when" per step, and a short list of questions to answer before writing code. The map stays deliberately small — a diagram you cannot hold in your head is not a map.

**Your work in this station is the two tables, not the diagram.** For each module, the merge test: what breaks if this is folded into its neighbour? If the honest answer is "nothing", delete the box. For each library, the three questions: what does it do, what would you write by hand instead, is the standard library honestly enough? If the by-hand answer is about ten lines, the answer is the standard library.

**Produce:** `ARCHITECTURE.md`, with every module's pressure written in your own words in the worksheet, and at least one box you argued about — merged, split or dropped.

**Checkpoint:** point at any box; the trainee names its pressure and what breaks on merge, in one breath. Then point at any library row and ask what they would write by hand instead.

> **Facilitator note.** "It's cleaner" is not an architecture argument and the skill will not accept it. Neither will you. Ask what breaks — three times if necessary.

> **Facilitator note.** Two trainees with different module counts will ask which of them is right. More than one can be right. Ask each of them which pressure produced their extra boundary; whoever cannot name one has found their own answer.

---

### Station 8 — `/advise-pattern` — patterns, after the architecture

```
/advise-pattern <module-or-task>
```

**Timebox:** 20 minutes. Writes `PATTERNS.md`. Needs `ARCHITECTURE.md` to already exist.

**Why it comes after the architecture.** A pattern is an answer to a structural pressure, and the pressures live in the architecture's constraint column and library table. Without those there is nothing for a pattern to be an answer *to* — you get a catalogue reading, which is how beginners end up with a factory that manufactures one thing.

The command researches the language's pattern catalogue, weighs it against your task, your modules and your dependencies, and returns a verdict from a fixed vocabulary:

| Verdict | What it means for you |
|---|---|
| ADOPT NOW | The pressure is here today; restructure before you build |
| ADOPT LATER | Not yet — the named trigger tells you when to revisit |
| NOT NEEDED | The pressure this pattern answers does not exist in your task |
| ALREADY PRESENT | Your design does this; it does not need the name |
| BUILT INTO THE LANGUAGE | The language already gives you this; reaching for the pattern adds ceremony |
| OVERENGINEERING | Applying it would cost more than the problem it solves |

**"No pattern needed" is the default answer, the most common outcome, and the most valuable one.** A page of NOT NEEDED verdicts is a successful station: you now know which patterns you consciously declined and why. Trainees read it as the tool failing to help. It is the tool refusing to sell you something.

**Produce:** `PATTERNS.md`, plus one line in the worksheet: your verdict, and the trigger if it was ADOPT LATER.

**Checkpoint:** the trainee states the verdict and the reason behind it. For ADOPT LATER, they name the trigger. For ADOPT NOW, they name what in `ARCHITECTURE.md` forced it.

> **Facilitator note.** Someone will keep re-asking with different modules until they get an ADOPT NOW. Name the behaviour out loud — it is the same instinct as asking for the code, wearing better clothes.

---

### Station 9 — `/plan-tasks` — slice into work

```
/plan-tasks
```

**Timebox:** 25 minutes. Writes `TASKS.md`.

The command reads everything the plugin has produced — `ARCHITECTURE.md`, `PATTERNS.md`, any previous `TASKS.md`, the subject, and the current state of the repo — and produces the 8–15 tasks left to finish the project. Each one is **sized to a single sitting** and carries a **runnable "done when"** check.

Then the GitHub step. The command asks whether you have a repo and a project board:

- **Yes** — it publishes one issue per task with `gh`, issue bodies written to the plugin's `trainee-issue-writing` conventions. Confirm the count afterwards on the board.
- **No, or you decline, or `gh` is not available** — it writes `task_list.md` with every task's full issue-ready definition instead. Nothing is lost; you paste them later.

Read the list critically. A task you cannot finish in one sitting is two tasks. A "done when" you cannot run in a terminal is not a "done when" — rewrite it until it is a command with an observable result.

**Produce:** `TASKS.md`, plus issues on a board or `task_list.md`, plus your chosen first task in the worksheet with its "done when" copied out in full.

**Checkpoint:** the facilitator reads the first task's "done when" and asks "type the command that checks it." If the trainee cannot, the task is not ready.

> **Facilitator note.** Ordering is the lesson here. Ask why the first task is first. The right answer is that it removes the most uncertainty — usually the task that touches the provided, unfamiliar component. The wrong answer is that it looked easiest.

---

### Station 10 — The build loop

No new command. Your editor, plus Stations 4 and 6 when you are stuck.

**Timebox:** whatever remains, and it continues after the session.

Run this loop, one task at a time:

1. Take the first task from `TASKS.md` and read its "done when" aloud.
2. Write the check first if you can — run it, watch it fail.
3. Build until the check passes. Nothing more; the next task is the next task.
4. Stuck on a concept — `/explain-subject "<term>"`, one term, then back.
5. Stuck on an approach — `/review-algorithm "<what you were going to do>"`, and revise.
6. Check passes — run the linter, the type checker and the grader before you call it done.
7. Re-run `/plan-tasks` to refresh the list against the repo's new state, then go to 1.

Step 7 is what keeps the plan honest: the task list is regenerated from reality, not maintained by hand.

**The plugin will not write this code, and that is the point.** Every command in it refuses, and the refusal is the feature. The design is yours; so is the code, and so is the thing you will be able to do next week that you cannot do today.

**Produce:** the first task's "done when" passing, with the linter and type checker clean.

**Checkpoint:** the check runs green in front of the facilitator, from a terminal, on the trainee's machine.

> **Facilitator note.** "Just give me the code" arrives here, around minute twenty of being stuck. Answer with the plugin's own refusals: it will offer an unrelated toy example and a question, and so should you. Then ask which step of their plan the code would go into. Nine times out of ten they cannot say, and that is the actual blocker.

> **Facilitator note.** Do not let anyone start task two before task one's check is green. Half-finished tasks are how a clean task list turns back into a pile.

---

## Why this order

The chain is **understand → question → study → plan → review → structure → patterns → tasks → build**, and each link consumes what the previous one produced.

**Strengths:**
- Every artifact is checkable by someone other than its author, so progress is visible without reading code.
- Design decisions arrive attached to the pressure that caused them, which is what makes them defensible later.
- The trainee hits the unfamiliar provided component early, while there is still time to be confused about it.
- Rework is cheap up to Station 7 and expensive after it, and the order puts all the cheap rework first.

**Risks (say these out loud at the start):**
- It feels slow. Two hours in, nothing runs, and that is on schedule.
- It can drift into documentation as an end in itself — Station 10 is the cure, and it is not optional.
- A trainee who copies the plugin's wording instead of rewriting it passes every checkpoint and learns nothing. Checkpoints are spoken, not read, for exactly this reason.

**What breaks when it is run backwards.** The two common inversions:

- **`/map-architecture` first.** Boxes get chosen by taste, then the plan is bent to fit them. The constraint column fills up with "it's cleaner", the merge test has no answer, and the trainee cannot defend a single boundary under questioning — because there was no pressure, only a preference. Fix: go back to Station 5 and keep the diagram as a hypothesis to be re-earned.
- **`/advise-pattern` before there is anything to apply a pattern to.** With no architecture, the command has no constraint column and no library table to weigh, so a trainee "chooses a pattern" from the catalogue and then builds a program shaped like the pattern rather than like the task. The command expects `ARCHITECTURE.md` to exist for this reason. Fix: run Station 7, then ask again — and expect NOT NEEDED.

Skipping Station 0 breaks the whole chain quietly: everything downstream is built on the plugin's reading of the subject rather than the trainee's, and nobody notices until the grader disagrees with both.

---

## Schedule variants

| Variant | Total | Stations | What to cut or add |
|---|---|---|---|
| **Taster** | 90 min | 0, 1, 2, 5, 6 (one round), 7 | Cut 3, 8, 9, 10. Trainees leave with `ARCHITECTURE.md` and no code. Close by reading the module table aloud. `/explain-subject` stays available throughout |
| **Half day** | 4.5 h | 0 through 10, full chain | The default. One 15-minute break after Station 6. Station 10 gets whatever is left — protect at least 40 minutes for it |
| **Two sessions** | 2 × 2.5 h | Session A: 0–6. Session B: 7–10 | Break after Station 6, with the reviewed plan as the hand-off artifact |

**Homework between the two sessions:** finish the "need now" study items from Station 3, and run one more `/review-algorithm` round on the plan. Nothing else — no architecture, no code. Trainees who start structuring at home arrive at Session B with boxes they cannot defend, and Station 7 becomes an argument instead of a station.

> **Facilitator note.** For the taster, announce up front that nothing will run today. Otherwise the last twenty minutes are spent trying to make something run, and the module table never gets read.

---

## Trainee worksheet

Copy this into your own file and fill it in as you go. One page, filled, is the session's deliverable.

```markdown
# Worksheet — <your name>

## Contract (Station 0, corrected at Station 1)
Input:
Required behaviour:
Failure behaviour:

Success condition (what the grader measures, and the targets):

## Words I did not know (Station 0)
Blocks me now:
Can wait:

## Answers to the guiding questions (Station 2)
Q1:  A:
Q2:  A:
Q3:  A:
Could not answer (my backlog):

## Study triage (Station 3)
Need now (max 3, with why):
Need later:

## My plan, in my own words (Station 5, revised at Station 6)
1.
2.
3.
Revision 2 changed:
Revision 3 changed:
Hardest step to turn into code, and why:

## Modules and their pressures (Station 7)
| Module | The pressure behind it | What breaks if I merge it |
|---|---|---|
|  |  |  |
|  |  |  |
Box I argued about, and what I did:
Library I dropped, and what I would have written by hand:

## Pattern verdict (Station 8)
Verdict:
Reason (or the trigger, if ADOPT LATER):

## First task (Station 9)
Task:
Done when (the exact command):
Why this one is first:
```

---

## Facilitator notes — running the room

**Group size and pairing.** Four to twelve. Pair trainees for Stations 0 through 6 and split them for 7 through 10 — thinking benefits from a partner, artifacts need a single author. Rotate pairs once, after Station 3, so nobody spends the whole session with the fastest person in the room.

**The trainee who finishes early.** They have not finished; they have skipped a defence. Send them to defend their `ARCHITECTURE.md` to someone at Station 6 — answering a peer's "what breaks if you merge it?" is harder than answering yours, and it slows the other trainee down productively too. If the defence holds, let them start task two.

**The trainee who stalls.** Identify the station, not the mood. Stalls at 5 and 6 are almost always contract problems — send them back to the subject for five minutes with one question. Stalls at 7 are usually a trainee waiting for permission to delete a box; give it. Stalls at 10 are usually a "done when" that was never runnable; rewrite it with them.

**"Just give me the code."** Do not negotiate and do not soften it. The plugin's own hard refusals are the script: it will offer an unrelated toy example and a question instead, and will not produce a snippet that maps line-for-line onto the task. Say the principle once — struggle is the curriculum, a solution handed over is a lesson removed — then ask which step of their plan the code would go into. Move on; repeating it invites an argument.

**Pace.** Call each station's start and its remaining five minutes out loud. Nobody will keep a timebox they cannot hear.

**Debrief (last 15 minutes, everyone answers one).**
- Which of your module boundaries was hardest to defend, and did it survive?
- What did you learn from a NOT NEEDED verdict?
- What is the "done when" of your next task — from memory?
- Where did this method work against the provided, read-only part of the repo, and where did you fight it?

---

## Anti-patterns — how to waste this workshop

- Opening the plugin before reading the subject → every later answer is checked against nothing.
- Copying the mentor's wording into the worksheet → passes the written checkpoint, fails the spoken one, teaches nothing.
- `/map-architecture` first, plan afterwards → boxes with no pressure behind them, and a plan bent to fit.
- Hunting for an ADOPT NOW verdict → a program shaped like a pattern instead of like the task.
- A "done when" you cannot run in a terminal → a task that is never finished, only abandoned.
- Asking for the code → the one request the whole plugin exists to refuse.

---

## Assessment

Judge the workshop on the artifacts and on what the trainee can say about them — **not on the code**. Code volume in a half day is noise.

| Signal | Pass | Strong |
|---|---|---|
| Contract | Three lines, and each traced to the subject | Failure line is specific and was tested against an edge case |
| Provided vs. authored | Names every read-only component | Explains why each one is a constraint, not a choice |
| Module boundaries | Names the pressure behind every box, from memory | Merged, split or dropped a box during the session and can say why |
| Dependencies | Every library defended with the three questions | Something was dropped in favour of the standard library |
| Pattern verdict | States it and the reason | Comfortable with NOT NEEDED; names the trigger for ADOPT LATER |
| Task list | 8–15 tasks, each sized to one sitting | Every "done when" is a command they can type |
| First task | States its "done when" without looking | The check is green, linter and type checker clean |
| Ownership | The plan is in their own words | They disagreed with the mentor at least once and can say why |

A trainee who can name the pressure behind every module boundary, defend every dependency, and state the "done when" of their first task without looking has got what this session is for — even with very little code written. The failure signature to watch for is the opposite: perfect artifacts, no spoken answers. That is a transcription, not a design — re-run the checkpoints with the screen turned off.

---

---

## Facilitator appendix — calibration material (mentor-eyes-only)

> **This appendix is for facilitators. It contains no spoilers and names no solution — it only tells you where the calibration material lives.**

There is a fully worked mentor-side example of this exact task in the plugin:

```
skills/architecture-mapping/references/worked-example-call-me-maybe.md
```

**It is mentor-eyes-only.** Read it before facilitating, to calibrate the depth and tone of a good architecture answer and to recognise a strong module table when a trainee produces one.

**Its module list and its library table must never be shown to a trainee working this task** — not on a slide, not on a shared screen, not read aloud, not paraphrased into a hint. The plugin's `architecture-mapping` skill carries this as a hard refusal: when a trainee's task matches a shipped worked example, the mapping loop runs on the trainee's own statement of the task and the example's module list and library table are not replayed. This workshop inherits that rule without exception. If a trainee asks whether a reference design exists, the honest answer is yes, more than one, they decomposed the task differently, and all of them passed — then ask which pressures *their* version will face.

The same rule covers every reference file in the plugin's `skills/*/references/` directories — the reference C solutions in `skills/algorithm-review/references/c-code-examples.md` most sharply, but the pattern, task-planning and issue-writing references too. All of them open with a mentor-side marking and none is to be pasted to a trainee. Nothing else here is restricted — everything above this appendix is safe to hand out as-is.
