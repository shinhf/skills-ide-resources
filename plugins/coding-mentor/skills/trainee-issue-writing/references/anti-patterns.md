# Trainee Issue Anti-Patterns

> **MENTOR-SIDE REFERENCE.** This catalogue is a checklist for *your* drafts before they
> are published. **Do not hand it to a trainee.** A beginner shown ten ways an issue can
> be wrong learns to distrust the issues they are given; the mentor's job is to not ship
> them in the first place.

Every entry is a real failure mode of a real trainee issue, with the repair. Run a draft past this file at Step 6 of the loop, before anything reaches a repo.

The short form of the whole file: an issue fails when it does not say what must become true, does not say how the trainee will know, or says how to do it.

---

## The catalogue

### 1. The one-word issue

**Title:** `Parser`

No goal, no check, no fence. It names a container and calls it a task. The trainee's first move is to ask what it means, which means the issue did not exist until that conversation happened.

- **Symptom:** the issue is reopened as a chat message within a day.
- `"Parser"` -> `"Turn a config file into records the rest of the program can read"`, plus the eight sections. The title carries a verb and an outcome, or it is not a title.
- **Test:** a title with no verb is not a title.

### 2. The essay that contains the algorithm

**Body:** four hundred words ending in "then walk the list backwards, keeping a running maximum, and swap when the invariant breaks".

Written with the best intentions — the mentor wanted to be helpful — and it removes the entire task. The trainee transcribes the paragraph and learns typing.

- **Symptom:** the trainee finishes suspiciously fast and cannot explain why any line exists.
- **Repair:** delete every sentence that would still be useful after the goal is deleted. What survives is the issue. The algorithm goes nowhere; it is the trainee's to find.
- **Test:** if the body can be read as instructions, it is a solution. If it can only be read as a target, it is an issue.

### 3. "Implement module X" with no observable outcome

**Body:** `## Goal — Implement the tokenizer module.`

Restates the file tree. There is nothing here a trainee can check, so "finished" is whatever they decide it is, and review becomes a negotiation.

- **Symptom:** "is this done?" asked three times about the same issue.
- `"Implement the tokenizer module"` -> `"Split an input line into the fields the rest of the program expects"` + a "Done when" naming the observable output on a fixture.
- **Test:** name the command the trainee runs to prove it is finished. No command, no issue.

### 4. Acceptance criteria hidden in a comment thread

The body says "convert the file"; comment 7, posted after two days of work, says "it also has to preserve the original column order".

This is the most damaging entry in the catalogue, because the trainee did the work correctly against the issue they were given and is told they failed.

- **Symptom:** rework that the trainee could not have avoided.
- **Repair:** anything a reviewer would check goes into "Done when" **before the work starts**. A criterion discovered mid-issue means the issue is edited and the trainee is told it changed — not that a comment now outranks the body.
- **Test:** review only against the body. If something outside it was checked, the body was wrong.

### 5. The silently blocked issue

The issue cannot be finished until another one is done, and says nothing about it. The trainee stalls, assumes the blocker is their own misunderstanding, and starts inventing the missing piece.

- **Symptom:** a beginner reimplementing a component that already exists, or was supposed to.
- **Repair:** name the blocker in the body — `"needs the reader from #3"` under "What you already have" — or reorder so nothing is blocked. Dependencies live in the body text, not in a repo feature the trainee may not have enabled.
- **Test:** every item under "What you already have" is either provided, or a closed issue. A reference to an open issue is a blocker and must be labelled as one.

### 6. The "refactor" issue with no named pressure

**Title:** `Refactor the output code`

Nothing became true, so nothing can be checked. For a beginner this is the purest busywork: the code already worked, and the issue asks them to make it different.

- **Symptom:** the trainee asks "different how?" — correctly.
- `"Refactor the output code"` -> name the pressure and the outcome it produces: `"Make a wording change to the report safe to do without re-testing the rules"`, with a check that says what is now possible that was not before.
- **Test:** a refactor issue needs a pressure from `${CLAUDE_PLUGIN_ROOT}/skills/architecture-mapping/references/constraint-to-module.md` and an outcome. Without both, the issue does not exist. "It's cleaner" is not a pressure.

### 7. The "Done when" that means "when the mentor says so"

**Body:** `- [ ] The implementation is reviewed and approved.`

Teaches dependence. The trainee cannot tell whether they are finished, so they either stop too early and wait, or polish indefinitely.

- **Symptom:** every issue ends with a request for permission.
- `"when the mentor approves"` -> `"when running X on fixture Y produces Z"`. Review is what happens after a check passes, never the check itself.
- **Test:** the trainee, alone, at midnight, with no one to ask, can determine whether the issue is done. If not, rewrite the check.

### 8. Thirty issues created at once

A whole project planned into issues in one sitting. Issues 6 onward encode guesses about code that does not exist yet; half are wrong within a week, and the trainee is left maintaining a backlog instead of learning.

- **Symptom:** issues closed as "no longer relevant", or quietly ignored.
- **Repair:** publish the next two or three. Write the rest when the code they depend on is real. `task-planning` owns the ordering; this skill only formats what is next.
- **Test:** an issue whose "What you already have" describes something not yet built is premature. Hold it.

### 9. The issue that names an unjustified library

**Body:** `## Constraints — use pandas for the CSV reading.`

A decision the trainee never made, arriving as a constraint. It also quietly forecloses the interesting question — whether the standard library is enough, which for a beginner-sized task it very often is.

- **Symptom:** a dependency in the project that the trainee cannot explain.
- **Repair:** an issue quotes only decisions the architecture already justified, per `architecture-mapping` Step 5. An unjustified library is a question for that skill, and the answer belongs in `ARCHITECTURE.md` before it appears in any issue body.
- **Test:** for every library named in an issue, the trainee can say what they would have written by hand instead. If not, remove it from the body.

### 10. The architecture table pasted into the bodies

Each issue opens with the same copied module table from `ARCHITECTURE.md`, so all six look identical above the fold and the trainee stops reading the top of issues.

- **Symptom:** the sections that differ between issues get skipped, because everything before them was noise last time.
- **Repair:** the map is one document; an issue is one move on it. Reference the map once — `"see the module table in ARCHITECTURE.md"` — and let the body say only what is specific to this task.
- **Test:** delete anything that appears verbatim in two issue bodies. If a body is now empty, the task was never distinct.

---

## The pre-publish pass

Five questions per draft. Any "no" blocks publication:

1. Is there exactly one primary "Done when", and can the trainee run it alone?
2. Does the goal sentence survive without an "and"?
3. Is every reviewer check already in the body?
4. Is there anything in here that could be typed into a source file?
5. Does "Out of scope" name the later issue for each thing it defers?

Then the outsider test from the skill body: someone who was not in the session reads it. Cannot start -> incomplete. Can finish without thinking -> a spoiler.
