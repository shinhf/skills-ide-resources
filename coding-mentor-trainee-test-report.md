# coding-mentor 2.0.0 — trainee test report

**Date:** 2026-09-21/22 · **Tester:** Claude, playing a beginner trainee · **Plugin unchanged.**
**Scenario:** the Call Me Maybe workshop (`plugins/coding-mentor/docs/workshop-call-me-maybe.md`), Stations 0–9, on a scratch project with a written subject and a stub SDK.
**Verdict:** the conversational design works — the protocol held across 80 turns, the refusal is exemplary, and the artifacts are real project documentation. Four things I actively dislike, one of which undermines the plugin's core promise.

---

## How the test was run

- Headless: `claude -p --plugin-dir <plugin> --permission-mode acceptEdits --output-format json`, one process per turn, `--resume` between turns. 80 trainee turns across nine commands.
- **Stations 1–6 with `--restricted`** (no Bash, file tools confined to the project). **Stations 7–9 with `--add-dir <plugin> --disallowedTools Bash`** after discovering the reference-file problem (finding 2). Bash stayed off throughout so `/plan-tasks` could not reach `gh` — which also exercised its fallback.
- The trainee was played by a model that knows the domain. Answers were kept at a plausible beginner level (partial, sometimes wrong, "I don't know" twice), but a real beginner would be slower and wronger. The pedagogy findings hold; the timing findings are optimistic.
- Scratch project, all nine artifacts, `.coding-mentor/` notes and per-station transcripts: `/tmp/claude-1000/-home-kamil-kamil-workspace-tmp-skills-ide-resources/1a57a07b-801b-40b4-b082-c5dde7f2d912/scratchpad/{call_me_maybe,log}/`.

| Station | Command | Trainee turns | Model time | Cost | Artifact |
|---|---|---|---|---|---|
| 1 | `/understand-task` | 10 | 4 min | $6.32 | `UNDERSTANDING.md` |
| 2 | `/advise-questions` | 12 | 6 min | $12.53 | `QUESTIONS.md` |
| 3 | `/advise-subjects` | 6 | 5 min | $5.54 | `SUBJECTS.md` |
| 4 | `/explain-subject` | 6 | 4 min | $3.82 | `CONCEPTS-log-probabilities.md` |
| 5 | `/prepare-plan` | 9 | 4 min | $7.15 | `PLAN.md` |
| 6 | `/review-algorithm` | 10 | 9 min | $16.63 | `REVIEW-1.md` |
| 7 | `/map-architecture` | 14 | 6 min | $15.46 | `ARCHITECTURE.md` |
| 8 | `/advise-pattern` | 4 | 6 min | $8.78 | `PATTERNS.md` |
| 9 | `/plan-tasks` | 9 | 9 min | $28.28 | `TASKS.md` + `task_list.md` |
| | **Total** | **80** | **53 min** | **$104.52** | 10 files |

Station 10 (build) was not attempted — the plugin does not write code, and that is the point.

---

## What I don't like — ranked

### 1. `/advise-questions` handed me the solution design through leading questions — CRITICAL

The plugin's whole identity is "never the algorithm, never the code." Station 2 broke that in spirit while keeping it in letter. In twelve turns, a chain of "what could you do that `generate()` wouldn't let you?" → "what would your program have to be tracking to say which characters could legally come next?" → "what test would you run on that candidate as a whole?" → "which parts of the entry are still undetermined?" → "what could you do to settle a choice between two known strings?" → "what single number would you compute from those three?" walked me, step by step, through: a structure-position filter over the vocabulary, skeleton-filling so only the holes need the model, candidate scoring for the closed list, the chain rule, softmax, log-probs, the catalogue-driven type gate, and greedy longest-match tokenization. Then it said *"Having now laid out the whole pipeline — the skeleton you write, the filter at each step, the scoring of candidate names, the gate at the end…"* and named the technique: **constrained decoding**.

`QUESTIONS.md` is, as a result, a complete design document for the solution — and it was produced at Station 2, before `/prepare-plan`, `/review-algorithm` and `/map-architecture` had anything to do. Every later station was elaboration.

Three specifics make it worse:
- This is the exact design of "Solution B" in the plugin's own mentor-side worked example, which `architecture-mapping`'s hard refusals say must never be replayed. `/advise-questions` replayed it — as questions.
- It is the failure mode `socratic-dialogue` names explicitly: the "guess what I'm thinking" question and the lecture in question form. Each question had exactly one acceptable answer, which rule 5 says makes it a check question, not a Socratic one.
- After leading me there, it said *"you got there unaided."* I did not. A beginner told that will believe it.

To be fair: the subject's own hint ("think about what you control at each generation step") points the same way, and `QUESTIONS.md` honestly marks "mechanics taught during the session rather than derived." But the plugin's no-spoiler rule is about the answer, not the phrasing, and the answer arrived.

### 2. Every `references/` file is unreadable in the default deployment — CRITICAL for the design, easy to fix

All nine artifact templates, the pattern catalogue, the force catalogue, the hint-ladder move catalogue, the pedagogy sources and the `gh` publishing ladder live under `${CLAUDE_PLUGIN_ROOT}/skills/*/references/`. `SKILL.md` bodies are injected by the harness; **references are not — the model must `Read` them from the plugin directory, which is outside the project.**

- With `--restricted`: `…review-md-template.md is outside <project>; --restricted confines the file tools to the working directory.` Denied.
- Without `--restricted`: `Claude requested permissions to read from …/review-md-template.md, but you haven't granted it yet.` Denied in headless mode; a permission prompt per file interactively.
- With `--add-dir <plugin>`: SUCCESS, no denials.

The effect was measurable. Six artifacts written under `--restricted` all ignored their templates — invented headings, no origin blockquote, `CONCEPTS-log-probabilities.md` at ~120 lines against a template rule of "one screen." The three written under `--add-dir` (`ARCHITECTURE.md`, `PATTERNS.md`, `TASKS.md`) matched their templates section-for-section, column-for-column.

**The plugin-side defect:** five of six commands silently improvised structure. Only `/review-algorithm` said *"the mentor could not read `review-md-template.md`… so `REVIEW-1.md` follows the skill's own output shape instead."* A command that cannot load its template should say so, every time. Also worth verifying whether an installed plugin (under `~/.claude/plugins/cache/`) has the same problem; `--plugin-dir` definitely does.

### 3. The scratch notes contain the mentor's answer key — MAJOR

`.coding-mentor/explain-subject.md`, after one exchange of a softmax dialogue:

> *Mentor's private read: … the trainee should be led to notice that rather than told. … Plan for Step 2: remove the exponent and let the trainee predict the breakage… **Acceptable answers include:** negative scores give negative "probabilities"; a sum of zero or near zero blows the division up; …*

That is the answer to the next question, in a file in the trainee's own project directory, which the README tells them to gitignore but not to avoid reading. The design said the notes hold the trainee's answers so a dialogue survives a restart — they do, and resume works well (finding 12) — but the model also wrote its own plan and expected answers there. The workshop's facilitator appendix warns that a trainee who reads the dialogue-move catalogue "answers the script instead of the problem." The notes file is that script, one question ahead, unmarked.

### 4. "Initiate the `mentor` agent" does not fit a multi-turn command — MAJOR

Every command opens with *"Initiate the `mentor` agent…"*. A subagent returns once; it cannot hold a conversation across user turns. The model noticed and said so on the record: *"I'm running the mentor dialogue here in the main thread rather than in a background subagent, since this protocol needs your answers one turn at a time."* Elsewhere it narrated a mentor that wasn't there: *"The mentor has completed the input gate and is ready for your first answer"*, *"Before I hand this to the mentor…"*, *"The mentor's closing report:"*. It worked because the model improvised; a beginner reading "before I hand this to the mentor" will wonder who they are talking to. Either the commands should stop delegating, or the agent file should be reframed as the persona the main thread adopts.

### 5. Workshop Station 6 feeds a plan to an algorithm reviewer — MAJOR (workshop, not plugin)

The station table says `/review-algorithm "<your plan>"`. `PLAN.md` states in its second paragraph that it "contains no code, no pseudocode and no algorithm." The command did the right thing — *"the five-step review loop needs an actual procedure to bite on"* — and asked which step's procedure to review. That cost a turn and would confuse a trainee following the table literally. The station should say: pick one step of your plan and describe its procedure in plain English, then review that. The gate behaviour itself was correct and clearly labelled *"the input gate, not a teaching question."*

### 6. Cost and clock — MAJOR for anyone running a room

53 minutes of model time and **$104** for one trainee through Stations 1–9, with a fast-typing trainee. `/plan-tasks` alone cost $28 and spent 33 internal turns on inventory before its first question; `/map-architecture` and `/review-algorithm` were $15–17 each. The workshop's 235-minute station budget is plausible for a human on top of this, but the two-session-split recommendation should probably mention that a room of ten is on the order of $1,000 of tokens, and that the first turn of the heavy commands takes one to two minutes of silence.

### 7. Turns run long when the mentor teaches — MODERATE

The protocol says keep turns short. When teaching kicked in — softmax, log-probabilities, the serial-dilution analogy plus the spam-filter toy plus the next question — single turns ran to five or six paragraphs. The content was good and correctly scoped (unrelated toys, analogy first), but it is the one place the "essay-length reply" guardrail was visibly not applied. Same for several consolidation turns.

### 8. "Write up what we have" was gated on one more turn — MINOR

At Station 2 I said *"Please write up what we have"* and got *"One thing before I write… in a single paragraph, in your own words…"*. The protocol's own pre-write sequence (consolidate → trainee summary → write) is the reason, and the summary is cheap. But the README promises *"at any point the trainee can ask for the document and get it,"* and a trainee out of time will read the extra turn as not being heard. Worth stating the one-turn cost honestly, or waiving the summary when the request is explicit.

### 9. Small things

- `UNDERSTANDING.md` explained tokens/ids before asking what I believed (rule 3, attempt-before-explain, skipped once). Defensible — I had said "no idea" — but noted.
- `TASKS.md` has no "Dropped" section on a first run; the template says never delete a section. Trivial.
- Headless mode never surfaced `AskUserQuestion`; stack detection and overwrite checks were handled in prose. Fine, but untested interactively.
- The fixture's stub SDK was noticed and flagged as an open question by three separate commands. Good behaviour, mildly repetitive across artifacts.

---

## What worked — and should not be regressed

- **The turn protocol held.** One question per turn, ending at the question mark, for essentially all 80 turns. Uptake in nearly every reply (*"I'll keep that phrase"*, *"revoicing it so you can correct me"*). Progress signals throughout (*"two things left, then the write-up"*, *"Step 4 of 6"*). Check questions labelled as such (*"This one has a single right answer"*). "I don't know" handled by affirming the correct fragment and descending one rung. Consolidation-then-trainee-summary before every single write, without exception.
- **The refusal is exactly right.** *"No — I won't write it. That's the one thing this tool doesn't do… if you want the function typed out, a general coding assistant will do it in seconds, and that's the right tool for that job."* Then it named my real blocker, offered a ten-minute concrete alternative, and offered to stop for the day. No moralising, no second refusal.
- **Teaching was never refused.** Softmax, log-probabilities, the log-sum-exp shift and smoothing were all taught on unrelated toys (ice cream, serial dilution, a spam filter) the moment I said I didn't have them, and checked by restatement and boundary case, never by "does that make sense?".
- **The trainee did the thinking.** The merge tests at Station 7, the need-now triage at Station 3, moving the validity gate to the front of the plan at Station 5, splitting the tokenizer/gate contract check across its two owners at Station 9 — those were my calls, and the mentor challenged one placement rather than supplying the rest.
- **Artifacts are genuine project documentation once templates load.** `ARCHITECTURE.md` (six boxes, both rationale tables, a "boxes considered and dropped" table), `PATTERNS.md` (BUILT INTO THE LANGUAGE, nothing adopted, sources with an honest "not re-fetched" caveat), `TASKS.md` (15 tasks with checks, two BLOCKED with named blockers, one DECIDED AGAINST citing its verdict), and `task_list.md` — 14 issue bodies on the exact eight-section contract. Every artifact has an honest **Open** section; `PLAN.md` even criticises itself (*"no step yet covers sampling correctness"*).
- **Continuity across commands.** Each command read the earlier artifacts and built on them by section number; `/explain-subject` on a second concept opened with *"Good to have you back… last time you worked out log-probabilities right down to the shift trick."*
- **The `gh` degradation ladder works.** No remote, no Bash → `task_list.md` with a "why this file exists / how to publish later" header, issues in task order.
- **Resume from notes works.** Abandoned a softmax dialogue after one exchange; a fresh session picked up my definition, my two open gaps, and the step count.

---

## Recommendations (none applied — plugin left as-is)

1. Re-scope `/advise-questions`: its questions should be about the *subject* (what is unstated, what is assumed, what would you ask the instructor), never a ladder toward the technique. Add a hard refusal to `mentor-guidance` or `socratic-dialogue` against chains of single-answer questions that converge on a design — and ban "you got there unaided" after a leading chain.
2. Make reference loading robust: have every command state plainly when a template or catalogue could not be read, and document `--add-dir` (or verify the installed-plugin path is pre-approved) in the README's installation section.
3. Keep the mentor's plan out of `.coding-mentor/`: notes should hold the trainee's answers and the step reached, nothing the trainee shouldn't read. Or write the mentor's plan to a separate, clearly-named file the workshop tells trainees not to open.
4. Drop "Initiate the `mentor` agent" from the nine commands, or reframe `agents/mentor.md` as a persona the main thread adopts.
5. Workshop Station 6: "pick one step of your plan and describe its procedure; review that."
6. Add cost and first-turn latency to the workshop's facilitator notes.
7. Apply the short-turn rule to teaching turns: analogy in one turn, toy in the next, question in the third.
