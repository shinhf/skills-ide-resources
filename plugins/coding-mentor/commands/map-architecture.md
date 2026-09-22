---
description: Map a programming task onto a design through a question-led conversation in which the trainee names the modules, then record what that conversation settled in an ARCHITECTURE.md with a Mermaid component diagram, a module table explaining why each module exists, and a library table explaining what each dependency is for — no solution code.
argument-hint: [task-file-or-description]
allowed-tools: Read, Write, Glob, AskUserQuestion
---

Run a dialogue that maps the architecture of the programming task described in: "$1" **together with** the trainee. This command is a multi-turn conversation in which the trainee states the contract, names the boundaries and justifies the dependencies; `ARCHITECTURE.md` is the record written at the end of that conversation, never a document delivered at the start of it.

If "$1" looks like a path (contains `/` or ends with a known extension), read the file at @$1 first; otherwise treat "$1" as the inline task description to map.

**Step 0 — Clarify missing information:** Before mapping anything, confirm the required input is present and unambiguous. If `$1` is empty, looks like a path but the file cannot be read, or describes a task too vague to decompose (no stated input, no stated output, no stated success condition), use the **AskUserQuestion** tool to ask focused, structured questions (e.g. paste the subject, or which file, or what the program must print) and wait for the answer before continuing. Keep these questions strictly clarifying — they must never reveal or hint at the solution. Proceed only when there is a concrete task to map.

**Step 0b — Detect the stack:** Use **Glob** in the current directory for `package.json`, `pyproject.toml`, `requirements.txt`, `*.csproj`, `go.mod`, `Cargo.toml`, `Makefile`, `*.c`. If exactly one stack is indicated, use it and say so in one line. If none or several are found, use **AskUserQuestion** to ask which language the trainee is writing this in, offering the candidates you found. Never name libraries before the stack is settled.

Step 0 and Step 0b are the **input gate**, not the lesson. They establish that a concrete task and a settled stack exist, and **AskUserQuestion** belongs to them because each is a branch point rather than a teaching question. The teaching questions begin at Step 1, one per turn, asked in prose and never offered as a menu.

Use the plugin skill `architecture-mapping` for the subject matter and the dialogue protocol in `${CLAUDE_PLUGIN_ROOT}/skills/socratic-dialogue/SKILL.md` for the shape of every turn, and inherit the `mentor-guidance` rules. Enforce:
- Do NOT write function bodies, algorithms, pseudocode, or function signatures. This command designs the container, never the contents.
- Do NOT create or stub the source files. The trainee builds them.
- Name every module by its **responsibility**, and name the constraint that forced the boundary. A box with no constraint behind it does not go in the diagram.
- Separate what is **provided and read-only** (scaffold, SDK, fixtures, grader) from what the trainee **authors**. Put them in different subgraphs.
- Every library needs a "what you would write by hand instead" answer. If the honest answer is ten lines, recommend the standard library instead.
- Cap the diagram at 4–7 authored modules. A beginner cannot hold more than that at once.
- Follow the output contract in the `architecture-mapping` skill exactly.
- Do NOT write the artifact unrequested before a session-level stop condition from `socratic-dialogue` fires or the trainee asks for the write-up.
- One question per turn. The turn ends at the question mark — no second question, no answer in parentheses, and no hint or worked example **except on rungs 4 and 5 of the hint ladder**, where one fact, analogy or toy example is paired with the re-ask.
- Never ask "does that make sense?". Check by restatement, by application, or by a case where the rule breaks.
- Refuse the answer to the trainee's own task — in character, naming a different tool — but **never refuse to teach**. Explaining a concept, giving an unrelated worked example, or descending the hint ladder is the job, not a concession.
- The artifact records what was **settled** in the conversation and marks what is still **open**; it is clean project documentation, never a transcript.

**Step 1 — The trainee states the contract:** Ask for the input, the required behaviour and the failure behaviour, in the trainee's own words — one of the three per turn if the first answer is thin. Revoice each answer and hand it back checkably. If the contract cannot be stated at all, the architecture cannot be drawn: point back at the subject rather than supplying the contract.

**Step 2 — The trainee splits provided from authored:** Ask which parts could be deleted and rewritten tomorrow and which parts the subject forbids touching. The split is the trainee's answer, not an inventory read out to them.

**Step 3 — Ask the way to the seams:** Load `${CLAUDE_PLUGIN_ROOT}/skills/architecture-mapping/references/decomposition-patterns.md` and match the task to a known shape mentor-side. Use its tables to choose the **question** that walks the trainee to the seam — where the reason to change differs — and never to announce the shape. This reference is mentor-side; it is not shown.

**Step 4 — The trainee names each module and the constraint that forced it:** One module per turn. For each, the trainee supplies the responsibility as a noun phrase and the pressure that created it, then answers the merge test — *what breaks if you merge this into its neighbour?* — and a module whose honest answer is "nothing" is dropped in the conversation, not in the file. Load `${CLAUDE_PLUGIN_ROOT}/skills/architecture-mapping/references/constraint-to-module.md` to recognise the pressure behind an answer and to choose the next question.

**Step 5 — The trainee answers all three library questions:** For every candidate dependency, the trainee answers what it does, what would have to be written by hand without it, and whether the standard library is honestly enough. All three answers come from the trainee — a package list answered by the mentor teaches a package list, not a decision. Load `${CLAUDE_PLUGIN_ROOT}/skills/architecture-mapping/references/library-rationale.md` mentor-side for the per-stack shortlists and the frequently correct "no dependencies" case.

**Step 6 — Draft the build order with the trainee:** Ask which step would hurt most to discover late, and let that answer open the sequence. Each step needs a "done when" check the trainee can run; ask for the check rather than supplying it.

**Step 7 — Write up what the conversation settled:** Keep running notes in `.coding-mentor/map-architecture.md` as the dialogue proceeds, so an interrupted session can resume without re-asking what was already answered. The notes hold the trainee's side only — their answers, the step reached, what is settled, what is open — never the plan for the next turn, never the answers expected, never an assessment of the trainee, and written on the assumption the trainee will read them. When a session-level stop condition from `socratic-dialogue` fires on its own, consolidate by naming the principle the design encodes, take the trainee's own closing summary of that design, and add only what was missed. An explicit request for the write-up is honoured in the same turn — no summary is asked for, the consolidation is written mentor-side, and `ARCHITECTURE.md` is marked *written on request* with everything unsettled listed as open. Then write `ARCHITECTURE.md` in the current directory; if that file already exists, use **AskUserQuestion** to confirm overwriting before writing. If a reference file under `${CLAUDE_PLUGIN_ROOT}/skills/` cannot be read, say so in one line and follow the output contract in the `architecture-mapping` skill, which carries the full section list. Section 8 of the output contract holds the questions that remain **genuinely open** after the conversation — the Socratic questions themselves were asked live, and a question the trainee already answered belongs in the module or library table as a settled decision, not restated as homework.

Return a three-line summary to the beginner developer: where the file was written, how many modules it proposes, and which single question they should answer before writing any code — naming anything the conversation left open, so the record and the summary agree about what is unfinished.
