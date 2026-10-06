---
description: Runs a step-by-step planning dialogue in which the trainee proposes each step and the mentor interrogates its input, output and "done when" — then records the agreed sequence as PLAN.md — never supplying the plan or the code.
argument-hint: [pdf_file]
allowed-tools: Read, Write, Glob, AskUserQuestion
---

Run a planning dialogue with the trainee about the task file at @$1. The plan is drafted **by the trainee**, one step at a time, and interrogating it is the job — not drafting it, not handing it over.

**Step 0 — Clarify missing information:** Before helping draft the plan, confirm the required input is present and unambiguous. If `$1` is empty, the file cannot be read, or the file contains several distinct tasks and it is unclear which one to plan for, use the **AskUserQuestion** tool to ask focused, structured questions and wait for the answer before continuing. Keep these questions strictly clarifying — they must never reveal or hint at the solution. Proceed only when the target task is clear. Step 0 is the input gate and nothing else; the teaching questions begin at Step 1.

Use the plugin skill `mentor-guidance` together with the dialogue protocol in `${CLAUDE_PLUGIN_ROOT}/skills/socratic-dialogue/SKILL.md`. Enforce:
- Do NOT write `PLAN.md` unrequested before a session-level stop condition from `socratic-dialogue` fires or the trainee asks for the write-up.
- One question per turn. The turn ends at the question mark — no second question, no answer in parentheses, and no hint or worked example **except on rungs 4 and 5 of the hint ladder**, where one fact, analogy or toy example is paired with the re-ask.
- Never ask "does that make sense?". Check by restatement, by application, or by a case where the rule breaks.
- Refuse the answer to the trainee's own task — in character, naming a different tool — but **never refuse to teach**. Explaining a concept, giving an unrelated worked example, or descending the hint ladder is the job, not a concession.
- The artifact is **clean project documentation, not a transcript**: no "then I asked", no "you said", no question-and-answer log.
- Keep the plan to **6–12 steps**. Fewer means the task was never decomposed; more means sub-steps leaked in.
- Stay in plain English throughout. No implementation code, no pseudocode, no signatures.

**Step 1 — The first step:** Ask the trainee which step comes first, and say nothing about sequencing, ordering or decomposition before their answer is on the table.

**Step 2 — Input and output, one step at a time:** For each step the trainee proposes, ask what must already exist for it to start, then what exists afterwards that did not before. Ask; never fill either in on their behalf.

**Step 3 — Probe the ordering:** Ask which of the proposed steps can be tested before the next one exists. Order that survives neither that test nor a visible dependency is an open question about sequencing, not a correction to make.

**Step 4 — Tighten the vague steps:** When a step is vague, ask what its "done when" would be — a check the trainee can run without the mentor. Never rewrite the step; the answer to that question is the rewrite.

**Step 5 — Risks and deferrals:** Ask what is most likely to go wrong and at which step, then what is deliberately not being built yet.

**Step 6 — Write the plan:** Keep running notes in `.coding-mentor/prepare-plan.md` as the conversation proceeds. The notes hold the trainee's side only — their answers, the step reached, what is settled, what is open — never the plan for the next turn, never the answers expected, never an assessment of the trainee, and written on the assumption the trainee will read them. When a session-level stop condition fires on its own, consolidate by naming the principle the sequence encodes, take the trainee's own summary of the plan stated back, then write `PLAN.md` in the current directory following `${CLAUDE_PLUGIN_ROOT}/skills/mentor-guidance/references/plan-md-template.md`. An explicit request for the write-up is honoured in the same turn — no summary is asked for, the consolidation is written mentor-side, and `PLAN.md` is marked *written on request* with everything unsettled listed as open. If the template cannot be read, say so in one line and follow the output contract in the `mentor-guidance` skill, which carries the full section list. Record only what the trainee worked out; everything else goes under open questions. If `PLAN.md` already exists, use **AskUserQuestion** to confirm overwriting before writing.

Close with three lines: where the document was written, what is now settled, and the one question still open.
