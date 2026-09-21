---
name: trainee-issue-writing
description: Use when a trainee's work has to be turned into GitHub issues, or when an existing issue body needs to be phrased so a beginner can act on it alone ("write this up as a GitHub issue", "how should I phrase this issue?", "create issues for a beginner", "what goes in the issue body?", "is this issue clear enough for a junior?", "split this into issues"). Produces self-contained, one-sitting, spoiler-free issue bodies on a fixed eight-section contract, with a title and a trainee-runnable "done when" — never the algorithm, never the code, never a hidden acceptance criterion. Applies both when publishing with gh and when writing the same body into a local file. Companion to task-planning, which decides which tasks exist. Calibrated for school tasks and School 42 curriculum projects.
version: 0.1.0
---

# Trainee Issue Writing

This skill is the mentor's playbook for the *shape of an issue*. `task-planning` decides **which** tasks exist and in what order; this skill decides **what one of them looks like on the page**, so that a beginner who opens it knows exactly what to do next without being handed the solution.

The failure it exists to prevent is the ordinary engineering issue. "Implement the tokenizer module" is a perfectly good ticket for someone who already holds the context, the acceptance criteria and the boundaries in their head. For a trainee it is a dead end: it assumes context they do not have, hides the check that decides whether they are finished, and either says nothing at all or says so much that the task is already solved.

Apply the no-spoiler rules from `mentor-guidance` at all times. The rule here is:

> **An issue states what must become true, and how the trainee will know it became true — never how to make it true.** A trainee issue that needs a conversation before it is actionable is not finished.

Test for it before publishing anything: hand the body to someone who was not in the session. If they cannot start, the issue is incomplete. If they can finish without thinking, the issue is a spoiler.

**Every reference file in this skill is mentor-side.** They set the format; they are not worksheets to forward.

## When this skill applies

- A task list exists — from `task-planning`, from a build order, from an `ARCHITECTURE.md` — and it has to become issues.
- A trainee has written an issue and asks whether it is clear enough to start on.
- An issue keeps producing the question "so what do I actually do?".
- One issue is quietly two issues, and the work stalls halfway.
- The same body has to serve a `gh` publish today and a local file when there is no repo.

This skill formats **one task at a time**. It does not decide scope, ordering or dependencies — that is `task-planning`, and an issue written before those are settled is a guess.

## Before you start

Settle four things first:

1. **The task, singular.** One task, its place in the build order, and the pressure behind it. Missing any of the three: go back to `task-planning` rather than inventing them here.
2. **The subject's constraints.** Language version, forbidden functions, allowed libraries, required output format, linters, performance targets. These are quoted into every issue, so they are read once, from the subject, not recalled.
3. **What is already provided.** Scaffold, fixtures, read-only SDK, graders, and which earlier issues are already done. Without this, section 4 turns into fiction.
4. **The write target.** A repo for `gh`, or a local directory. Probe with `gh auth status` and `gh repo view`; **never fail because `gh` is unavailable** — every step degrades to a file the trainee can paste in later.

## The 6-step loop

Run these in order. Steps 1–4 produce decisions; only Step 5 produces prose.

### Step 1. Take one task, never the list

Pull a single task off the plan and finish its issue completely before looking at the next. Writing eight bodies in parallel produces eight vague bodies with the same three sentences in them.

### Step 2. Write the "done when" first

Before the goal, before the title, name the check. Phrase it as something observable that the trainee can run alone:

- `running the tool on the sample directory prints the same name as ls -S | head -1` — observable.
- `test_largest_file passes` — a test name, not an outcome, and useless if the test is not written yet.
- `the reader works` — not a check at all.

If no runnable check can be named, the task is not understood well enough to be an issue. That discovery belongs back in `task-planning`, not in the body.

### Step 3. Trace the task back to its pressure

Name the thing the task descends from: a step in the build order, a module boundary in the architecture, a rule in the subject, a grader requirement. An untraceable task reads as busywork, and a trainee who suspects busywork optimises for closing the issue rather than for learning. Where the pressure is a module boundary, `${CLAUDE_PLUGIN_ROOT}/skills/architecture-mapping/references/constraint-to-module.md` names it precisely.

### Step 4. Fence the scope

Decide, explicitly, what this issue does **not** cover, and which later issue covers it instead. Do this before writing, because the fence is what keeps a one-sitting task from becoming a weekend. The fence becomes section 7, and section 7 is the section beginners benefit from most and the one most often left out.

### Step 5. Fill the eight sections, in order

Fill the skeleton in `${CLAUDE_PLUGIN_ROOT}/skills/trainee-issue-writing/references/issue-template.md` — fixed order, all eight headings, no extras. The order is load-bearing: goal, then why, then the check, then the ground already covered, then the concepts to go and learn, and only then the constraints and the fence.

### Step 6. Size-check, get approval, then publish

Run the tripwires under **Sizing**. Split before publishing, never after. Then show every body in the session and wait for an explicit confirmation. Nothing reaches a repo unapproved.

## Output contract

Eight sections, always these, always in this order:

1. **Goal** — one sentence, plain English, what must become true. One sentence means one sentence.
2. **Why this task exists** — the pressure from Step 3, in one or two lines. Traceability is what stops the list reading as busywork.
3. **Done when** — the check from Step 2, as an observable outcome rather than a test name. **Exactly one primary** check, plus **at most two** secondary ones.
4. **What you already have** — provided and read-only components, fixtures, and the prior issues this builds on, by reference.
5. **Concepts you may need** — named subjects only, each an invitation to run `/explain-subject "<term>"`. Names, never explanations. Explaining a concept inside an issue body is how a body turns into a tutorial and then into a solution.
6. **Constraints from the subject** — the non-negotiables: language version, forbidden functions, allowed libraries, output format, linters, performance targets.
7. **Out of scope** — what belongs to a later issue, each with that issue's reference.
8. **Questions to answer before you start** — one to three Socratic questions, per `mentor-guidance` §3. A trainee who cannot answer them is not ready to start, and learning that before the first line of code is the point.

Two absolutes on top of the order:

**No solution, anywhere in a body.** No code, no pseudocode, no function signatures, no data-structure choices, no algorithm, no library the architecture has not already justified. Naming what a module owes the rest of the program is the task; writing what is inside it is the solution.

**No hidden acceptance criteria.** Anything a reviewer would check belongs in "Done when". A criterion that surfaces for the first time in review is the mentor's bug, not the trainee's.

## Titles

An imperative verb plus the observable outcome, under roughly 60 characters, one issue per title. A module name alone names a container, not an outcome; "Implement X" restates the file tree. If a title needs "and", Step 6 rejects the issue anyway — fix the scope, not the title. The template carries the form and a correct/incorrect pair: `${CLAUDE_PLUGIN_ROOT}/skills/trainee-issue-writing/references/issue-template.md`.

## Sizing

One sitting for a beginner: one sustained session, ending in something that runs. Four tripwires, any one of which means the issue must be split:

- More than one primary "done when".
- An "and" in the goal sentence.
- A dependency on something not yet built.
- A "Concepts you may need" list longer than three.

The last one is the subtlest. Four unfamiliar concepts is not a task, it is a syllabus, and the trainee will bounce off it. `${CLAUDE_PLUGIN_ROOT}/skills/trainee-issue-writing/references/worked-issues.md` shows a single issue before and after a split for the "and" tripwire.

## Labels and metadata

Keep metadata minimal and optional. A size label and an ordering hint help a beginner; a taxonomy of ten labels helps a reporting dashboard nobody has. Two labels is a reasonable ceiling — something like `size: one-sitting` and a sequence hint — and zero is acceptable.

Dependencies go **in the body**, as a reference to the blocking issue under "What you already have" or "Out of scope". GitHub's own dependency and relationship features may not be enabled on the repo, and a trainee should not have to discover a UI to learn that an issue is blocked.

## Publishing

The body always goes to a **file** first, never a giant inline `--body` — quoting mangles the Markdown, and there is then no artifact to review before creation. The invocations, the project step and the whole degradation ladder belong to the sibling skill: `${CLAUDE_PLUGIN_ROOT}/skills/task-planning/references/github-publishing.md`. This skill owns the body text and nothing else.

The same body text is what gets written into a local fallback file when there is no repo or no authenticated `gh`, so the format stays publish-agnostic: plain Markdown, no GitHub-only syntax beyond headings and task-list checkboxes.

The trainee sees and approves the bodies before anything is created, and nothing is published without an explicit confirmation in the session. An issue created without approval is a task assigned by an assistant rather than chosen by a learner.

## Calibration

- `${CLAUDE_PLUGIN_ROOT}/skills/trainee-issue-writing/references/issue-template.md` — the literal skeleton, the rules for filling it in, and how it renders on GitHub.
- `${CLAUDE_PLUGIN_ROOT}/skills/trainee-issue-writing/references/worked-issues.md` — three worked bodies at increasing difficulty, on deliberately unrelated toy subjects, plus one split demonstration. Read it to calibrate depth and tone.
- `${CLAUDE_PLUGIN_ROOT}/skills/trainee-issue-writing/references/anti-patterns.md` — the catalogue of bad trainee issues and the repair for each. Check a body against it before publishing.

## Hard refusals

- "Just put the code in the issue so I can paste it" -> refuse. The body names the outcome and the check; the trainee writes what is inside.
- "Write the pseudocode in the acceptance criteria" -> refuse. Criteria describe an observable outcome. Pseudocode in a "Done when" is a solution wearing a checklist.
- "Create all thirty issues now" -> refuse. Issue the next two or three; later ones encode guesses about code that does not exist yet.
- "Leave out the 'done when', the mentor will decide when it's finished" -> refuse. An issue whose completion only a mentor can judge teaches dependence, not engineering.
- "Which library should the issue tell me to use?" -> not an issue question. Route it to `architecture-mapping` Step 5; an issue only quotes decisions the architecture already justified.
- The trainee's task matches a worked issue this skill ships -> do **not** replay that body. Run the loop on their task.
- "Copy the module table from `ARCHITECTURE.md` into the issues" -> refuse. A module table is a map of the whole; an issue is one move on it.

## Keep it short

One screen per issue, eight short sections, three questions at most. An issue that scrolls has stopped being a task and started being a document — and a trainee who is handed a document reads none of it.
