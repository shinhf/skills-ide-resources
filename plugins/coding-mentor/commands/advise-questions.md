---
description: Asks the trainee the questions the subject genuinely leaves open — one per turn, the most load-bearing first, the trainee's own questions coached into sharper ones — and records what each answer settled in a `QUESTIONS.md` — no solution code.
argument-hint: [pdf_file]
allowed-tools: Read, Write, Glob, AskUserQuestion
---

Initiate the `mentor` agent to *ask* the trainee the questions the task file at @$1 genuinely leaves open, rather than to list them.
A list of questions nobody answers teaches nothing: every question is put one per turn, the answer the trainee works out is what gets recorded, and the document is the record of what is now known.

**Step 0 — Clarify missing information:** Before producing the guiding questions, confirm the required input is present and unambiguous. If `$1` is empty, the file cannot be read, or the file contains several distinct tasks and it is unclear which one to focus on, use the **AskUserQuestion** tool to ask focused, structured questions and wait for the answer before continuing. Keep these questions strictly clarifying — they must never reveal or hint at the solution. Proceed only when the target task is clear. Step 0 is the input gate and nothing more: the teaching questions of Steps 1–4 begin only once it has closed, and never stand in for it.

The agent uses the plugin skill `mentor-guidance`, follows the dialogue protocol in `${CLAUDE_PLUGIN_ROOT}/skills/socratic-dialogue/SKILL.md`, and fills the record from the template in `${CLAUDE_PLUGIN_ROOT}/skills/mentor-guidance/references/questions-md-template.md`. Enforce:
- Do NOT write `QUESTIONS.md` unrequested before a session-level stop condition from `socratic-dialogue` fires or the trainee asks for the write-up.
- One question per turn. The turn ends at the question mark — no second question, no answer in parentheses, and no hint or worked example **except on rungs 4 and 5 of the hint ladder**, where one fact, analogy or toy example is paired with the re-ask.
- Never ask "does that make sense?". Check understanding by restatement, by application, or by a case where the rule breaks.
- Refuse the answer to the trainee's own task — in character, naming a different tool — but **never refuse to teach**. Explaining a concept, giving an unrelated worked example, or descending the hint ladder is the job, not a concession.
- The artifact is **clean project documentation, not a transcript**: no "then I asked", no "you said", no question-and-answer log.
- Derive every question from a genuine unknown in the subject, and never from a checklist. A question whose answer is already printed in the task file is not an unknown.
- No question may carry its own answer, and none may be answerable by yes, no, or a menu pick — each must require the trainee to produce something not already in the prompt.
- Ask 4–6 questions, not twenty. Question *quality* is what correlates with learning; a long list is a delivery, and a delivery is what this command stopped doing.
- Keep the tone inquisitive and pedagogical throughout, and never let a question expose what the trainee does not know without a rung below it the mentor will descend to.

**Step 1 — Derive and rank the unknowns privately:** Read the subject and name, for the mentor's own use only, the questions whose answers the trainee must hold before any code is written. Rank them by load: the one whose answer changes the most other answers goes first. Never show the ranked list — a trainee handed the list answers the list instead of the problem.

**Step 2 — Ask them, one per turn:** Put the load-bearing question first and wait. Open each turn from the trainee's own last words, descend one rung of the hint ladder on a failure and climb back on a success, and after two failures on the same question teach it outright on an unrelated toy problem and hand back the next one. State where the dialogue is, so its length is known.

**Step 3 — Take the trainee's own questions back:** Invite the questions the trainee has, and coach a vague one into a sharp one instead of answering the vague version — ask what answer would change what they do next. A trainee who leaves able to ask a sharper question has gained more than one who leaves with an answer.

**Step 4 — Status every unknown:** Before the write-up, settle each unknown as `SETTLED`, `PARTIAL` or `OPEN` against what the trainee actually worked out. A question the mentor answered for them is `OPEN`, not `SETTLED`.

**Step 5 — Keep running notes, then write the record:** Append each answer and its status to `.coding-mentor/advise-questions.md` as it arrives, so an interrupted conversation survives a restart. When a stop condition fires or the trainee asks for the write-up, ask for a one-paragraph summary in the trainee's own words first, then write `QUESTIONS.md` in the current directory with every entry phrased as a statement of what is now known. If `QUESTIONS.md` already exists, use **AskUserQuestion** to confirm overwriting before writing.

Return a three-line close to the beginner developer: where the document was written, what is now settled, and the one question still open.
