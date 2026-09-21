# GitHub Publishing

> **MENTOR-SIDE REFERENCE.** This is the mentor's operating procedure for turning a
> finished task list into issues. **Do not hand it to a trainee** — running the ladder is
> the mentor's job, and a trainee who is given the commands instead of the result learns
> the `gh` CLI in place of their own project.

Publishing happens **after** `TASKS.md` is written and read, never instead of it. The plan is the deliverable; issues are a convenience on top of it.

Two rules govern everything below.

**Board routing is the user's choice at run time.** Ask which project. Offer what `gh project list` actually returns. Hardcode no organisation, no owner, no repository and no project number anywhere in this plugin — it is distributed, and those values belong to whoever installs it. A plugin that carries one workspace's board number is broken for every other installation.

**Never fail because `gh` is unavailable.** Every rung of the ladder degrades to writing `task_list.md` and saying so in one line. A missing CLI is not an error condition for this command; it is a branch.

---

## 1. Detect the repository

Ask the tool first, the remote second:

```
gh repo view --json nameWithOwner
```

If that fails or returns nothing, fall back to the remote and parse owner and repository out of it:

```
git remote -v
```

Both can legitimately come back empty — a local directory with no remote is a normal state for a school project. Do not invent an owner to fill the gap, and do not assume the directory name is the repository name.

The `owner` parsed here is also the owner passed to `gh project list`; it is never a value chosen by the mentor.

## 2. Confirm intent before anything is created

Use **AskUserQuestion** once, covering three things together:

- Is there a GitHub repository for this project?
- Is there a project board it should land on?
- Publish the list now, as one issue per task?

Then confirm once more before the first `gh issue create`. Issue creation is outward-facing and not cheaply reversible: an issue can be closed but not un-sent, and a board full of machine-written issues the trainee has not read is worse than no board. **Never create an issue the trainee has not seen** — the list in `TASKS.md` is what they have seen, which is why it is written first.

## 3. List the projects and let the trainee pick

```
gh project list --owner <owner>
```

Present what comes back — number and title — and ask which one. Accept "none" as an answer: a repository with no board is common, and issues without a board are still useful.

If the command errors on a missing scope (classic and newer project permissions differ), treat it as **no project available** rather than a failure, and say so in one line.

## 4. Create one issue per task, in task order

One issue per task, created in the order the tasks should be done, so the issue numbers read in sequence. A trainee scanning `#14, #15, #16` should be reading their plan in order; out-of-order numbers force them back to `TASKS.md` to re-derive the sequence.

Write each body to a file first, then pass the file:

```
gh issue create --repo <owner>/<repo> --title "<task title>" --body-file <path-to-body-file>
```

**Always `--body-file`, never a large inline `--body`.** A multi-line body shoved through a shell argument loses newlines, breaks on quotes and backticks, and mangles Markdown — and the body is the part of the issue that carries the "done when" check. Bodies are written per the plugin skill `trainee-issue-writing` (`${CLAUDE_PLUGIN_ROOT}/skills/trainee-issue-writing/SKILL.md`), so a published body and a body pasted from `task_list.md` are identical.

Keep the returned issue URL for each task — the board step and the verification step both need it.

**Labels are optional and minimal.** Add one only if the trainee asks, and only if it already exists in the repository. A label invented at publish time either fails the call or clutters a fresh repository with taxonomy nobody chose.

**Dependencies go in the body, as prose.** A blocked task names its blocker inside the issue text ("cannot start before T3 — <title>"). Do not reach for a GitHub dependency, sub-issue or task-list feature: availability varies by plan and by repository, and a beginner cannot debug a relationship they cannot see.

## 5. Add each issue to the chosen board

```
gh project item-add <number> --owner <owner> --url <issue-url>
```

Where `<number>` is the project number the trainee picked in step 3 and `<owner>` is the owner detected in step 1. One call per issue, in the same order.

## 6. Verify

Do not trust a silent success:

```
gh issue view <number> --repo <owner>/<repo> --json projectItems
```

An empty `projectItems` means the issue exists but never reached the board. Report that plainly per issue rather than in aggregate — a partial publish is the failure mode that goes unnoticed, and the trainee will otherwise assume a board they cannot find work on.

---

## The degradation ladder

Each rung answers the same question — what gets written instead — and every one of them ends with a file the trainee can use.

| Rung | How it shows up | What to do instead |
|---|---|---|
| **`gh` absent** | the command is not found | Write `task_list.md` with every task's full definition. Say in one line that the CLI was not available and the file is paste-ready. Do not suggest installing anything as a precondition — the plan is already delivered. |
| **`gh` unauthenticated** | `gh auth status` reports no logged-in account | Write `task_list.md`. Say authentication is missing and that publishing can be re-run later with `/plan-tasks`, which will find the existing plan and merge rather than re-derive. |
| **No repository** | both `gh repo view` and `git remote -v` come back empty | Write `task_list.md`. Say there is no remote to publish to. Never create a repository, and never guess an owner from the directory name. |
| **No project board** | `gh project list` is empty, errors on scope, or the trainee answers "none" | Still offer to create the issues, if a repository exists and the trainee confirmed. Report that no board step ran. If the trainee wants neither, write `task_list.md`. |
| **Trainee declines** | the answer to "publish now?" is no | Write `task_list.md` and stop. Do not re-ask, and do not create a single "example" issue to demonstrate. |
| **Partial publish** | some issues created, then a call fails | Do not roll back and do not retry blindly. Report which tasks were published with their numbers, and write `task_list.md` containing **only the remaining** tasks, so a second pass cannot duplicate the first. |

In every case, the closing summary states where the file was written, how many tasks it holds, how many issues were published, and the single task to start with.
