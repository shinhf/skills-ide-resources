---
description: Analyze every artifact this plugin has already produced and derive the work still left to finish the project — writes an ordered TASKS.md of one-sitting tasks, each with a "done when" check, then offers to publish them as GitHub issues — no solution code.
argument-hint: [optional: task-file-or-note]
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion, Bash(gh repo view:*), Bash(gh project list:*), Bash(gh issue create:*), Bash(gh project item-add:*), Bash(gh issue view:*), Bash(gh auth status:*), Bash(git remote:*)
---

Initiate the `mentor` agent to derive the tasks still to be completed before this project is finished, narrowed by: "$1".

If "$1" looks like a path (contains `/` or ends with a known extension), read the file at @$1 first; otherwise treat "$1" as an inline note that narrows the scope of the plan. An empty `$1` is the normal case — the artifacts already sitting in the current directory are the real input.

**Step 0 — Clarify missing information:** Before deriving anything, confirm the inputs are present and unambiguous. If `$1` looks like a path but the file cannot be read, if the goal of the project cannot be stated in one sentence from the artifacts, or if the artifacts disagree about what the project must do, use the **AskUserQuestion** tool to ask focused, structured questions (e.g. which subject file is authoritative, or whether an unfinished module is abandoned or merely paused) and wait for the answer before continuing. Keep these questions strictly clarifying — they must never reveal or hint at the solution. Proceed only when there is a concrete project to plan.

**Step 0b — Inventory the artifacts:** Use **Glob** and **Read** to gather whatever this plugin has already left behind, then state in one line which artifacts were found and which were missing. Gather:
- `ARCHITECTURE.md` — the module table, the library table, and above all the **build order with its "done when" checks**, which is the primary source of tasks.
- `PATTERNS.md` — the pattern verdicts. Map every verdict: `ADOPT NOW` becomes a task; `ADOPT LATER (name the trigger)` becomes a conditional task carrying that trigger; `OVERENGINEERING` becomes a removal task only if the pattern is already in the code; `NOT NEEDED` becomes a `DECIDED AGAINST` row rather than an actionable task; `ALREADY PRESENT (unnamed)` and `BUILT INTO THE LANGUAGE` produce no task at all.
- An existing `TASKS.md` — to be **updated**, never silently replaced. Preserve the trainee's own checkmarks, notes and re-orderings.
- The subject or task file, when the trainee names one as `$1`.
- The current state of the repository — source files, tests, `Makefile`, lockfiles — so that work already finished is marked done rather than re-listed.
- Anything established earlier in this session by `/understand-task`, `/advise-subjects`, `/advise-questions`, `/prepare-plan` and `/review-algorithm`. Those commands are conversation-only and leave no file behind, so the session transcript is their only record.

If none of those commands ran and no artifact exists, say so in one line and recommend `/map-architecture` first, rather than inventing a plan out of nothing.

The agent uses the plugin skill `task-planning` and inherits the `mentor-guidance` rules. Enforce:
- Do NOT write code, pseudocode, function signatures or algorithms into a task or an issue body. A task states what must be true when it is done, never how to make it true.
- Do NOT invent tasks the artifacts do not support — every task traces to a build-order step, a module, a library decision, a pattern verdict, or a constraint from the subject.
- Do NOT list a task that is already satisfied in the repository; mark it done instead.
- Do NOT create GitHub issues without an explicit confirmation in this session.
- The issue bodies must be written using the plugin skill `trainee-issue-writing` (`${CLAUDE_PLUGIN_ROOT}/skills/trainee-issue-writing/SKILL.md`), so that a body pasted into GitHub later is identical to one published now.
- Cap the list at 8–15 tasks. A beginner handed thirty tasks learns only that the project is hopeless.
- Every task carries a **"done when"** check the trainee can run themselves, and is sized to a single sitting.
- Never fail because `gh` is unavailable. Every step of the GitHub flow degrades to a written file.
- Follow the output contract in the `task-planning` skill exactly.

**Step 1 — Derive the tasks:** Walk the build order first, then the module table, the library decisions, the pattern verdicts and the subject's constraints, and keep only what the repository does not already satisfy. Order the result so the riskiest unknown is confronted first — usually the unfamiliar provided component, never the "easy" CLI — and attach to each task the check that proves it finished.

**Step 2 — Write `TASKS.md`:** Write it to the current directory. If that file already exists, use **AskUserQuestion** to confirm before writing, and on an update merge rather than clobber: a ticked task stays ticked even when the artifacts changed, and a task the artifacts no longer support moves to the dropped section with its reason instead of vanishing.

**Step 3 — Offer the GitHub step:** Detect the repository with `gh repo view --json nameWithOwner`, falling back to `git remote -v`. Then use **AskUserQuestion** to ask whether there is a GitHub repository, whether there is a project board for it, and whether to publish the list. Offer the boards found with `gh project list --owner <owner>` — the choice of board belongs to the trainee at run time, so never assume an owner, an organisation or a project number. On confirmation, create one issue per task in task order with `gh issue create --repo <owner>/<repo> --title "<title>" --body-file <file>`, add each to the chosen board with `gh project item-add <number> --owner <owner> --url <issue-url>`, and verify with `gh issue view <number> --repo <owner>/<repo> --json projectItems`. Confirm once before creating anything — issues are outward-facing and not cheaply reversible — and never create an issue the trainee has not seen.

**Step 4 — Fall back to a written file:** If there is no repository, no project, the trainee declines, or `gh` is missing or unauthenticated (`gh auth status`), write `task_list.md` in the current directory holding every task together with its full task definition — the complete issue body for each, in task order, ready to paste — and say so in one line. The full workflow and its degradation ladder are in `${CLAUDE_PLUGIN_ROOT}/skills/task-planning/references/github-publishing.md`.

Return a short summary to the beginner developer: where the files were written, how many tasks the list holds, how many were published as issues (or the reason none were), and the single task to start with.
