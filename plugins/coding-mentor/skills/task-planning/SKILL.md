---
name: task-planning
description: Use when a trainee asks what work is left on a project or wants that work turned into something they can act on ("what's left to do?", "what should I do next?", "turn this into a task list", "turn the whole project into issues", "regenerate my TODO", "am I nearly done?"). Produces a TASKS.md of 8–15 one-sitting tasks, each with a "done when" check the trainee can run, plus task_list.md as the offline fallback when the issues are not published — never the algorithm and never the code. Decides which tasks exist and in what order, and owns the publishing procedure; the wording of each issue body belongs to the companion skill trainee-issue-writing. Calibrated for school tasks and School 42 curriculum projects, and for directories where the earlier artifacts of this plugin already exist.
version: 0.1.0
---

# Task Planning

This skill is the mentor's playbook for turning everything already decided about a project — the architecture map, the pattern verdicts, the subject, the state of the repository — into the short ordered list of things still to be done, and then, if the trainee wants it, into GitHub issues.

Apply the no-spoiler rules from `mentor-guidance` at all times. The rule here is sharper than usual, because a task list sits one careless sentence away from being an implementation:

> **A task names what must become true, never how to make it true.** "The reader reports how many lines the sample file has, and the count agrees with `wc -l`" is a task. "Loop over the buffer and split on newlines" is the solution wearing a checkbox.

Test for it: if a task would still be useful to someone working on a different project, it is describing *how* — cut it. Concretely: no signatures, no types, no pseudocode, no `def` / `function` / `int main`, not in a task title, not in a "done when" check, not in an issue body.

**Every reference file in this skill is mentor-side.** They hold the templates and the publishing ladder. Handing a trainee the ladder instead of running it teaches nothing.

## When this skill applies

- Trainee has an `ARCHITECTURE.md` and asks what to actually do on Monday morning.
- Trainee has been working for a week, has lost track, and asks whether they are nearly done.
- Trainee wants the remaining work as GitHub issues on a board.
- Trainee has a stale `TASKS.md` and the artifacts have since changed.
- Trainee asks for "a TODO" — usually a request for *ordering*, not for a longer list.

This skill plans work that is **already decided**. It does not decide the architecture: if there is no artifact and no prior conversation, the honest answer is that `/map-architecture` comes first. A plan invented ahead of a design is a guess with checkboxes.

## Before you start

Load the turn-level protocol in `${CLAUDE_PLUGIN_ROOT}/skills/socratic-dialogue/SKILL.md` before the first question and follow it throughout: this skill owns which tasks exist and in what order, that one owns what a single turn may contain, when the dialogue stops, and when the file may be written.

Settle four things first. The `/plan-tasks` command handles them, but when this skill triggers on its own, it owns them:

1. **The artifact inventory.** `ARCHITECTURE.md`, `PATTERNS.md`, an existing `TASKS.md`, the subject file, and the repository itself. State in one line what was found and what was missing — a plan derived from two artifacts and a plan derived from none are not the same document, and the trainee must see which one they were handed.
2. **The session record.** `/understand-task`, `/advise-subjects`, `/advise-questions`, `/prepare-plan` and `/review-algorithm` leave no file. Whatever they established lives only in the transcript, so read it before assuming something was never decided.
3. **The write targets.** `TASKS.md` in the current working directory, and `task_list.md` in the same place if the issues are not published.
4. **The overwrite and merge policy.** Confirm before replacing an existing `TASKS.md`, and even on a confirmed write, merge instead of clobbering. The trainee's checkmarks are data that exists nowhere else.

## The seven-step loop

Run these in order. **Steps 1–2 are reading** — the artifacts and the state of the repository, gathered from disk without interrogating the trainee about them. **Steps 3–6 are turns, not narration** — the trace behind each candidate, the sizing, the ordering and every "done when" are questions put to the trainee, and the answer that gets recorded is theirs. A step the mentor answers on the trainee's behalf has been skipped, not completed. **Step 7 is the only writing**, and it comes after the conversation.

### Step 1. Inventory the artifacts
Read what exists rather than asking for it — a rule that scopes to this step and Step 2, the inventory steps, where the answer sits on disk and a question about it would spend a turn on something a file already says. It is not a licence to skip the questions in Steps 3–6. The **build order** in `ARCHITECTURE.md` is the primary source: it is already a sequence of deliverables with "done when" checks, which is most of a task list. The module table supplies the boundaries a task may not cross. The library table supplies the decisions that need acting on — a chosen dependency is a task, a rejected one is not. Every verdict in `PATTERNS.md` carries a planning consequence, and all six are accounted for: **ADOPT NOW** becomes a task in its own right, traced to the verdict; **ADOPT LATER (name the trigger)** becomes a conditional task carrying the trigger that would activate it; **OVERENGINEERING** becomes a removal task when the pattern is already in the code, and no task otherwise; **NOT NEEDED** becomes a `DECIDED AGAINST` row, never an actionable task; **ALREADY PRESENT (unnamed)** and **BUILT INTO THE LANGUAGE** produce no task at all, because nothing has to change.

### Step 2. Establish what is already true in the repository
Before listing anything, find out what is done. Look at the source files, the tests, the `Makefile`, the lockfiles. A task whose "done when" check already passes is not a task — it is a `DONE` line, and listing it as work is how a list loses the trainee's trust on first reading. Ask when the evidence is genuinely ambiguous: a half-written module may be paused or abandoned, and those produce different lists.

### Step 3. Derive candidate tasks from the decisions on record
Every candidate must trace back to something: a build-order step, a module in the table, a library decision, a pattern verdict, or a constraint stated in the subject. Put the trace to the trainee as a question rather than asserting it — which decision on record does this piece of work come from? — because the trace is the test, and a candidate with no trace is an invention, and inventions are where solutions leak in. Constraints from the subject are the ones most often missed and the best ones to ask for: the error behaviour, the argument count, the memory rule, the forbidden function, the style gate. Each is a task the trainee will otherwise discover at grading time.

### Step 4. Size each task to one sitting
One sitting for a beginner, which is smaller than it sounds — and the trainee is the one who knows how long their sitting is. Put each candidate to them one per turn: *is that one sitting for you, honestly?* If a task cannot plausibly end in a state worth committing, they split it; if two tasks cannot be verified separately, they merge them. Then cap the whole list at **8–15**. A list that will not fit under fifteen items has usually confused activities with deliverables.

### Step 5. Order by risk retired per task
Order by how much **unknown** each task removes, not by how easy it is. The ordering comes out of a question, not out of a sort: ask which of these the trainee is **least sure** they can do, and let that answer open the sequence. The first task should be the one that would hurt most to discover late: the unfamiliar provided component, the format nobody has read yet, the tool that may not even install. Never open with the CLI because it feels achievable. The ordering reason for the first task is stated in the trainee's own words, so the sequence reads as theirs rather than as an arbitrary one they were handed, and they say for each task what it unblocks.

### Step 6. Attach a runnable "done when" to every task
Every task, without exception, ends with a check the trainee can run alone and read the result of without asking — and **the trainee writes it**, because a "done when" the mentor invented is one the trainee cannot run. Ask for it task by task, and probe the weak ones: when the answer is "the parser works", ask what command would be typed and what would appear on screen. Comparing an output against a known value is a check; running the provided grader is a check. "The parser works" is not, and neither is "the code is clean". A task with no check gets declared finished twice and finished never.

### Step 7. Write the file — merge, never clobber
Write only once a stop condition from `socratic-dialogue` fires or the trainee asks for the write-up, and ask the trainee for their own closing summary — the first task and why it is first — before emitting anything. Then emit `TASKS.md` per the output contract. When a previous `TASKS.md` exists, reconcile the two rather than replacing one with the other, following the merge rule below, and confirm before writing.

## Output contract

Write `TASKS.md` following `${CLAUDE_PLUGIN_ROOT}/skills/task-planning/references/tasks-md-template.md` exactly:

1. Title + one-sentence restatement of the project's goal.
2. **Progress** — one line: how many tasks, how many done, what remains.
3. **Tasks** — the ordered checklist. Each item carries an id, a title, a status, a size, its "done when" check, and what it unblocks.
4. **Dropped** — tasks no longer supported by the artifacts, each with the reason.
5. **Start here** — exactly one task, and why that one.
6. **Questions to answer before you start** — the 3–5 questions that remain **genuinely open** once the dialogue has finished. The Socratic questions are asked live, in the loop above; this section is not where they are deferred to. A size the trainee defended and a check they wrote belong in the task rows as decisions, and anything left unresolved is recorded as open rather than presented as though it were settled.

The offline fallback `task_list.md` follows `${CLAUDE_PLUGIN_ROOT}/skills/task-planning/references/task-list-template.md`: one section per task, each holding the task's **full definition** — the complete issue body, ready to paste. Every body carries all eight sections of the `trainee-issue-writing` contract, in order — Goal · Why this task exists · Done when · What you already have · Concepts you may need · Constraints from the subject · Out of scope · Questions to answer before you start — so a body pasted in by hand next month is identical to one published today.

### Status vocabulary

Exactly five statuses, and nothing else:

- **`TODO`** — derived, not started, nothing blocking it.
- **`IN PROGRESS`** — the trainee has begun and the "done when" check does not yet pass.
- **`DONE`** — the "done when" check passes, verified in the repository rather than claimed.
- **`BLOCKED (name the blocker)`** — cannot proceed, and the parenthesis names what would unblock it. An unnamed blocker is not a status, it is a shrug.
- **`DECIDED AGAINST (name the verdict it came from)`** — considered and rejected, with the verdict cited. The token is deliberately not `NOT NEEDED`: that name belongs to a `PATTERNS.md` verdict, and one word meaning both "suppress the row" and "keep the row, marked" is how a list starts contradicting itself. This status exists so a rejected idea stops coming back every time the list is regenerated.

### The merge rule

On regeneration, the old file wins on **state** and the artifacts win on **content**:

- A task the trainee has ticked **stays ticked**, even if the artifacts changed underneath it. Their evidence beats a fresh derivation.
- The trainee's own notes and re-orderings survive. A deliberate re-order is a decision; preserve it and say so.
- A task that has disappeared from the artifacts moves to the **dropped** section with the reason. Never delete one silently — a task that vanishes without explanation reads as a mistake and gets re-added by hand.
- A genuinely new task is appended in its risk-ordered position, and flagged as new since the last run.

## Sizing and ordering

The two failure modes are symmetrical. A list of thirty tasks teaches that the project is hopeless; a list of four teaches nothing about sequence, because each item is really a phase in disguise. Hold to 8–15 and let the sizing test arbitrate: a task ends in something committable, and its check can be run in isolation.

A beginner left to choose will start with the part they already understand, which retires no risk and produces a project that is 80% done and 100% unproven. Put the unknown first, name what it unblocks, and the list becomes a schedule rather than a menu.

## The GitHub step

After `TASKS.md` is written — never before — offer to publish. Ask whether there is a repository, whether there is a project board, and whether to publish; then confirm once before creating anything, because issues are outward-facing and not cheaply reversible.

**Board routing is the trainee's choice at run time.** Ask which project, offer what `gh project list` returns, and hardcode no organisation, owner or project number anywhere — this plugin is distributed, and those values belong to whoever installs it.

Never fail because `gh` is unavailable. Every rung of the ladder — `gh` absent, unauthenticated, no repository, no project, trainee declines — degrades to writing `task_list.md` and saying so. The full workflow, the exact invocations and the whole ladder are in `${CLAUDE_PLUGIN_ROOT}/skills/task-planning/references/github-publishing.md`. This skill owns the publish procedure; `trainee-issue-writing` owns only the body text. Load `${CLAUDE_PLUGIN_ROOT}/skills/trainee-issue-writing/SKILL.md` for the eight-section contract, and keep the invocations here.

## Calibration

A good plan reads like the next two weeks of a real project: the first task is slightly frightening, the last task is a check rather than a feature, and nothing in it explains how anything works. Calibrate the depth of a task against the build order in `ARCHITECTURE.md` — a task carrying more detail than its build-order step is carrying solution. The templates in `${CLAUDE_PLUGIN_ROOT}/skills/task-planning/references/tasks-md-template.md` and `${CLAUDE_PLUGIN_ROOT}/skills/task-planning/references/task-list-template.md` fix the shape; this skill fixes the judgement.

## Hard refusals

- "Just do the first task for me" -> refuse. Point at its "done when" check and ask what the check would print right now.
- "Write out what goes in each file" -> refuse. A task says what must become true; the contents are the trainee's work.
- "Split this into thirty tasks so I can see everything" -> refuse the count, not the wish. Offer the 8–15 list plus the one task to start with; granularity below a sitting is bookkeeping.
- "Can I start with the easy one?" -> not a yes or no. Ask which unknown the easy one retires, and what would happen if the hard one turns out to be impossible in week three.
- "Just publish the issues" -> not without a confirmation in this session and not before the trainee has seen the list. An issue is public, and an unreviewed issue is a public guess.
- "Put the board number in the plugin so I don't have to pick" -> refuse. The board is chosen at run time; a hardcoded owner breaks the plugin for the next installer.
- Regenerating and the trainee has ticked items -> never re-derive over them. Merge, and say which of their marks were preserved.

## Keep it short

One screen of checklist, one line of progress, one task to start with. A trainee who receives a thirty-item backlog has been handed a reason to stop, not a plan.
