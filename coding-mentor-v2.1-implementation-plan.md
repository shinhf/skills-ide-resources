# coding-mentor 2.1 — implementation plan

Fixes findings 1, 2, 3, 4, 5, 7, 8, 9 from `coding-mentor-trainee-test-report.md`. Finding 6 (cost and clock) is not implemented — it is a facilitator-notes matter, not a defect.

## Decisions taken

| # | Finding | Decision |
|---|---|---|
| 1 | `/advise-questions` led the trainee to the solution design | **Trainee-led questioning** — the trainee picks the subject, the mentor decomposes their answers |
| 2 | References need a permission grant, even when installed | **Inline the contracts** into each SKILL.md; templates demoted to optional enrichment |
| 3 | Scratch notes carried the mentor's answer key | **Remove it** — notes hold the trainee's side only |
| 4 | `Initiate the mentor agent` cannot hold a conversation | **Keep the agent, stop delegating** — reframe as the persona the main thread adopts |
| 5 | Workshop Station 6 feeds a plan to an algorithm reviewer | Station text picks one step and describes its procedure |
| 7 | Teaching turns run essay-length | One analogy **or** one toy per turn, then the question |
| 8 | "Write up what we have" cost an extra turn | **Write immediately**; the mentor consolidates; no trainee summary required |
| 9 | Small things | Attempt-before-explain reinforced; empty sections emit `—`; carry-forward opens deduplicated |

---

## Do not regress

Every one of these was verified working across 80 turns of testing. Each agent gets this list and must preserve the behaviour it touches.

- **One question per turn, and the turn ends at the question mark** — held for essentially all 80 turns.
- **Uptake and revoicing** in nearly every reply (*"I'll keep that phrase"*, *"revoicing it so you can correct me"*).
- **Progress signals** (*"two things left, then the write-up"*, *"Step 4 of 6"*).
- **Check questions labelled as such** (*"This one has a single right answer"*).
- **The "I don't know" ladder** — affirm the correct fragment, descend one rung, never supply the answer.
- **The refusal and its exact scoping** — declining the trainee's task in character while naming a different tool, then immediately teaching. Its current wording is the best thing in the plugin; change nothing about it except what finding 8 requires.
- **Teaching is never refused** — concepts, analogies and unrelated toy examples delivered the moment the trainee says they lack them.
- **The trainee does the thinking** — merge tests, need-now triage, build reordering, splitting a contract check across its two owners. The mentor challenges one placement and supplies none of the rest.
- **Artifacts are project documentation, not transcripts**, each with an honest **Open** section, including artifacts that criticise themselves.
- **Continuity across commands** — later commands read earlier artifacts and cite them by section.
- **The `gh` degradation ladder** — no remote, no Bash, still produced `task_list.md` with 14 issue bodies on the eight-section contract, in task order.
- **Resume from notes** — an abandoned dialogue resumed with the trainee's definition, their open gaps and the step reached.

---

## 1. `/advise-questions` becomes trainee-led

**The defect.** The mentor arrived with a destination and asked a chain of single-answer questions that reached it: structure-position filtering, skeleton-filling, candidate scoring, the chain rule, the type gate, greedy tokenization — then named the technique. `QUESTIONS.md` came out a complete solution design, at Station 2, before the three stations whose job that is. Then the mentor said *"you got there unaided."*

**The new shape.** The trainee chooses what to interrogate; the mentor subdivides what the trainee says. Decomposition follows the trainee's own words downward, never a mentor's agenda forward.

- **Step 1 — the trainee picks the ground.** An open question, not a menu: which part of the subject they are least sure about, or most want to pull apart. The mentor may state in one line which parts of the subject are unstated or ambiguous, as raw material — but does not rank them or choose.
- **Step 2 — one question about that ground.** Open, admitting more than one good answer.
- **Step 3 — decompose on a general answer.** When the answer comes back general or vague, break **that answer** into smaller pieces and ask about one piece. Repeat as needed. The granularity follows the trainee's answer quality, which is the hint ladder applied to a topic rather than to a stuck step.
- **Step 4 — the trainee's own questions**, coached from vague to sharp, as now.
- **Return to Step 1** when a strand is settled, so the trainee re-chooses rather than being carried onward.

**Never**: a prepared chain of questions converging on a technique; naming the technique the trainee's own task needs; claiming they reached something unaided after a leading chain.

**Guard added plugin-wide** (`socratic-dialogue`), because the same laddering can happen in `/prepare-plan` and `/map-architecture`:

- More than two consecutive questions each admitting only one acceptable answer, building toward a single design, is a **convergence failure**. Stop, say what is happening, and hand the choice back.
- **Attribution honesty** — never credit the trainee with reaching something the mentor led them to. If the mentor supplied the path, the write-up says so, exactly as `QUESTIONS.md` already does for taught mechanics.

**Files:** `commands/advise-questions.md` (rewrite of the dialogue steps), `skills/socratic-dialogue/SKILL.md` (two guards, one hard refusal), `skills/mentor-guidance/references/questions-md-template.md` (artifact records the strands the trainee chose and where each stands).

---

## 2. Reference files, and the contracts that depend on them

**The defect, confirmed by test.** `${CLAUDE_PLUGIN_ROOT}/skills/*/references/*.md` requires a permission grant in every deployment — I verified a denial against an *installed* plugin (`plugin-dev`'s own `authentication.md`), not just against `--plugin-dir`. Headless it is a hard denial; interactively it is a prompt per file. Six of nine artifacts written without templates invented their own headings; the three written with `--add-dir` matched exactly.

**The fix.** SKILL.md bodies *are* injected by the harness and need no read. So the structure moves there.

- Each artifact-producing skill's `## Output contract` gains the **literal section list** of its artifact — headings in order, and the column headers of every table. Enough to produce a correct document with zero file reads.
- Templates keep the fenced skeleton, the fill-in rules and the worked detail, and become **optional enrichment**.
- Every command's write step gains: *if the template cannot be read, say so in one line and follow the output contract in the skill.* Only `/review-algorithm` did this unprompted; all nine must.
- `README.md` gains an installation note: references need a directory grant, and `--add-dir <plugin>` is how to give it.

**Files:** `skills/{algorithm-review,architecture-mapping,pattern-advisory,task-planning,trainee-issue-writing,mentor-guidance}/SKILL.md`, all nine commands, `README.md`.

---

## 3. Remove the mentor's private note

**The defect.** `.coding-mentor/explain-subject.md` contained *"Mentor's private read: … the trainee should be led to notice that rather than told. … Plan for Step 2: … **Acceptable answers include:** …"* — the next question's answer, one question ahead, in the trainee's own project directory.

**The fix.** A single rule, stated in `socratic-dialogue` and repeated in each command's notes line:

> The notes file holds the trainee's side of the conversation and nothing else: their answers, the step reached, what is settled, what is open. It never holds the mentor's plan for the next turn, the answers the mentor expects, or an assessment of the trainee. Written on the assumption the trainee will read it — because it is in their project.

**Files:** `skills/socratic-dialogue/SKILL.md`, all nine commands.

---

## 4. Stop delegating to the agent

**The defect.** Every command opens *"Initiate the `mentor` agent…"*, but a subagent returns once and cannot hold a conversation across user turns. The model said so on the record and then narrated an absent third party: *"Before I hand this to the mentor…"*, *"The mentor's closing report:"*.

**The fix.**

- All nine commands open with a direct instruction — *"Run a … dialogue with the trainee"* — and never refer to the mentor in the third person.
- `agents/mentor.md` is reframed as **the persona the main thread adopts**: its system prompt stays, its frontmatter description says it is the behavioural definition a command assumes rather than a worker dispatched to. Its six examples are kept and rephrased so none implies dispatch. It remains available for a direct standalone trigger.

**Files:** all nine commands, `agents/mentor.md`.

---

## 5. Workshop Station 6

**The defect.** The station table says `/review-algorithm "<your plan>"`, but `PLAN.md` states it contains no algorithm. The command correctly balked and spent a turn asking which step's procedure to review.

**The fix.** Station 6 becomes: *pick the one step of your plan you are least sure of, describe its procedure in plain English, and review that.* The checkpoint and "Produce" line follow. `commands/review-algorithm.md` gains one line in Step 0 stating that a build plan is not a procedure, and what to ask for instead — so the gate reads as guidance rather than an obstacle.

**Files:** `docs/workshop-call-me-maybe.md`, `commands/review-algorithm.md`.

---

## 7. A budget for teaching turns

**The defect.** When teaching landed — softmax, log-probabilities — single turns ran five or six paragraphs: analogy *and* toy example *and* the next question. Good content, but the one place the short-turn rule was visibly not applied.

**The fix.** In `socratic-dialogue`, rules 1 and 7 and the hint ladder:

- A teaching turn carries **one analogy or one toy example, not both**, then the question. Roughly 150 words.
- A concept needing both gets two turns with a check between: analogy → check by restatement → toy → the question.
- Consolidation turns state the principle in one or two sentences, as the rule already says.

**Files:** `skills/socratic-dialogue/SKILL.md`, `skills/socratic-dialogue/references/dialogue-moves.md`.

---

## 8. "Write up what we have" is honoured on the spot

**The defect.** The request was answered with *"One thing before I write…"*. The README promises the document at any point; a trainee out of time reads the extra turn as not being heard.

**The fix.** In `socratic-dialogue`'s `## The refusal` and `## Output contract`, and in all nine commands' write steps:

- An explicit request is honoured **in the same turn**. No summary is asked for.
- The mentor writes the consolidation itself — naming the principle reached — since that half is the mentor's job anyway.
- The artifact is marked *written on request* and everything unsettled is listed as open.
- The trainee's own summary stays required only when the dialogue reaches a stop condition on its own.

**Files:** `skills/socratic-dialogue/SKILL.md`, all nine commands.

---

## 9. Small things

- **Attempt-before-explain** (rule 3) reinforced: even when the trainee says "no idea", ask what they would guess before explaining. One line in `socratic-dialogue`.
- **Empty sections emit `—`**, never dropped — `TASKS.md` had no Dropped section on a first run. One line in each template's fill-in rules.
- **Carry-forward opens deduplicated**: an open question inherited from an earlier artifact is listed once with a pointer, not restated in full. The stub SDK was flagged in three separate artifacts. One line in `task-planning` and `architecture-mapping` output contracts.

---

## Execution

| Agent | Owns |
|---|---|
| A | `skills/socratic-dialogue/**` — the convergence guard, attribution honesty, notes rule, teaching budget, write-on-request, attempt-before-explain. Lands first; everything else cites it |
| B | `commands/advise-questions.md` rewrite + `questions-md-template.md` |
| C | The other eight commands — de-delegation, notes rule, write-on-request, template-failure disclosure |
| D | The six SKILL.md output contracts + the nine templates' fill-in rules |
| E | `docs/workshop-call-me-maybe.md` + `agents/mentor.md` |
| me | `README.md`, both manifests → 2.1.0, final verification |

B–E run in parallel after A.

## Verification

1. **Mechanical**: every `${CLAUDE_PLUGIN_ROOT}` path resolves; 17 frontmatter blocks parse; no command refers to the mentor in the third person; the notes rule appears in all nine; `Write` still in all nine `allowed-tools`.
2. **Contract completeness**: for each of the nine artifacts, the section list in the SKILL.md `## Output contract` matches its template's skeleton headings exactly.
3. **Behavioural re-test**, as the trainee, headless, deliberately **without** `--add-dir` so the reference denial is in play:
   - `/advise-questions` — confirm it opens by asking what the trainee wants to interrogate, and that a general answer is met with decomposition of that answer rather than a new direction. Confirm `QUESTIONS.md` is not a solution design.
   - `/understand-task` — confirm the artifact follows the inlined contract despite the template being unreadable, and that the failure is announced.
   - Any command — say "write up what we have" on turn two and confirm the document arrives in that same turn, marked.
   - Inspect `.coding-mentor/*.md` for any mentor plan or expected answers.
4. `plugin-validator` and `skill-reviewer` as before.
