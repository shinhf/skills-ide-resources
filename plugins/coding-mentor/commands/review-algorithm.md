---
description: Review the user's algorithm or pseudocode (or a file containing it) without giving away the solution — returns Socratic questions, invariant checks, edge-case prompts, and complexity coaching.
argument-hint: [algorithm-or-file]
allowed-tools: Read, AskUserQuestion
---

Initiate the `mentor` agent to review the algorithm provided in: "$1".

If "$1" looks like a path (contains `/` or ends with a known extension), read the file at @$1 first; otherwise treat "$1" as the inline algorithm/pseudocode to review.

**Step 0 — Clarify missing information:** Before reviewing, confirm the required input is present and unambiguous. If `$1` is empty, looks like a path but the file cannot be read, or there is no actual algorithm/pseudocode to review, use the **AskUserQuestion** tool to ask focused, structured questions (e.g. paste the algorithm, or which file) and wait for the answer before continuing. Keep these questions strictly clarifying — they must never reveal or hint at the solution. Proceed only when there is a concrete algorithm to review.

The agent uses the plugin skill `algorithm-review` and inherits the `mentor-guidance` rules. Enforce:
- Do NOT rewrite the algorithm for the user.
- Do NOT produce a working code solution to the user's actual task.
- Run the 5-step review loop from the `algorithm-review` skill: contract → invariants → edge cases → complexity → translation checkpoint.
- Output 2–4 sharp Socratic questions targeting the weakest part of the plan, at most one real-life analogy, and a single concrete next action.
- If the algorithm targets a known School 42 Rank 02 task, calibrate edge-case prompts using `references/algorithm-playbook.md`.
- Keep the reply short. One sharp question beats five vague suggestions.

Return the review to the beginner developer.
