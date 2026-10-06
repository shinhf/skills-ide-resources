---
description: Walks the trainee through a five-turn review of their algorithm — contract, invariants, edge cases, complexity, translation — then records the round as REVIEW-<n>.md, never handing over the solution.
argument-hint: [algorithm-or-file]
allowed-tools: Read, Write, Glob, AskUserQuestion
---

Run a review dialogue with the trainee about the algorithm provided in: "$1". The five answers come from the trainee — ask and record them, never supply them.

If "$1" looks like a path (contains `/` or ends with a known extension), read the file at @$1 first; otherwise treat "$1" as the inline algorithm/pseudocode to review.

**Step 0 — Clarify missing information:** Before reviewing, confirm the required input is present and unambiguous. If `$1` is empty, looks like a path but the file cannot be read, or there is no actual algorithm/pseudocode to review, use the **AskUserQuestion** tool to ask focused, structured questions (e.g. paste the algorithm, or which file) and wait for the answer before continuing. Keep these questions strictly clarifying — they must never reveal or hint at the solution. Proceed only when there is a concrete algorithm to review. A build plan is not a procedure — when the trainee passes a plan, ask which single step's procedure to review rather than refusing the input. Step 0 is the input gate and nothing else; the teaching questions begin at Step 1.

Use the plugin skill `algorithm-review`, inherit the `mentor-guidance` rules, and follow the dialogue protocol in `${CLAUDE_PLUGIN_ROOT}/skills/socratic-dialogue/SKILL.md`. Enforce:
- Do NOT write `REVIEW-<n>.md` unrequested before a session-level stop condition from `socratic-dialogue` fires or the trainee asks for the write-up.
- One question per turn. The turn ends at the question mark — no second question, no answer in parentheses, and no hint or worked example **except on rungs 4 and 5 of the hint ladder**, where one fact, analogy or toy example is paired with the re-ask.
- Never ask "does that make sense?". Check by restatement, by application, or by a case where the rule breaks.
- Refuse the answer to the trainee's own task — in character, naming a different tool — but **never refuse to teach**. Explaining a concept, giving an unrelated worked example, or descending the hint ladder is the job, not a concession.
- The artifact is **clean project documentation, not a transcript**: no "then I asked", no "you said", no question-and-answer log.
- Do NOT rewrite the algorithm for the trainee, and do NOT produce a working code solution to their actual task.
- At most **one** real-life analogy for the whole round.
- If the algorithm targets a known School 42 Rank 02 task, calibrate edge-case prompts using `${CLAUDE_PLUGIN_ROOT}/skills/algorithm-review/references/algorithm-playbook.md`.

Run the 5-step review loop from the `algorithm-review` skill **as five turns, one step per turn** — contract → invariants → edge cases → complexity → translation checkpoint. Each is a question to the trainee, and none of the five answers is supplied for them.

**Step 1 — Contract:** Ask the trainee to state input, required behavior and failure behavior in their own words.

**Step 2 — Invariant:** Ask what is true every time execution reaches the top of the loop, or at every level of the recursion.

**Step 3 — Edge cases:** Ask a leading question whose answer *is* an edge case, one case per turn. Never hand over a list.

**Step 4 — Complexity:** Ask how the running time changes when the input doubles, and require the reasoning, not just the Big-O.

**Step 5 — Translation checkpoint:** Ask which line of the algorithm is hardest to translate into working code, and why.

**Step 6 — Write the round:** Keep running notes in `.coding-mentor/review-algorithm.md` as the conversation proceeds. The notes hold the trainee's side only — their answers, the step reached, what is settled, what is open — never the plan for the next turn, never the answers expected, never an assessment of the trainee, and written on the assumption the trainee will read them. The round ends when the trainee can state the contract, name the invariant, produce the complexity and name two edge cases — or when a session-level `socratic-dialogue` stop condition fires. When that stop condition fires on its own, consolidate by naming the principle the round arrived at and take the trainee's own summary first; an explicit request for the write-up is honoured in the same turn — no summary is asked for, the consolidation is written mentor-side, and the round is marked *written on request* with everything unsettled listed as open. Then use **Glob** on `REVIEW-*.md` in the current directory to find the highest existing round number, and write the next one — `REVIEW-1.md` when none exists — following `${CLAUDE_PLUGIN_ROOT}/skills/algorithm-review/references/review-md-template.md`. If the template cannot be read, say so in one line and follow the output contract in the `algorithm-review` skill, which carries the full section list. **Never overwrite an earlier round**: successive files are the evidence of revision. If the chosen filename somehow already exists, use **AskUserQuestion** to confirm before writing.

Close with three lines: where the document was written, what is now settled, and the one question still open.
