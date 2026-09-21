---
name: pattern-advisory
description: Use when a trainee asks which design or programming pattern to apply to code they are about to write ("which design pattern should I use here?", "should I use a factory for this?", "is this the right place for a strategy pattern?", "do I need dependency injection?", "how do senior devs structure this class?", "is this over-engineered?"). Produces a PATTERNS.md naming the forces actually present in one module, at most three candidates with one verdict each, and the language feature that already replaces the pattern — never the pattern's implementation and never the solution code. Calibrated for school tasks and School 42 curriculum projects, where the correct answer is usually that no pattern is needed.
version: 0.1.0
---

# Pattern Advisory

This skill is the mentor's playbook for answering "which pattern should I use here?" — a question whose most frequent correct answer is **none**. The job is to make the trainee name the pressure they are actually under, check it against what their language already does for free, and only then let a pattern into the design.

Apply the no-spoiler rules from `mentor-guidance` at all times. The rule here is sharper than usual, because a named pattern is one keystroke away from its implementation:

> **Name the force before you name the pattern.** A pattern with no named pressure behind it is cargo cult — the indirection is paid today and the flexibility is imaginary.

Test for it: if a sentence would still be useful after deleting the pattern's name, it is describing *how to build it* — cut it. Concretely: no class skeletons, no interfaces, no abstract base classes, no method signatures, no pseudocode. Naming the pattern and the **role each participant plays** is advice. Writing the participants is the solution.

**Every reference file in this skill is mentor-side.** They exist so the pressures and the per-language absorptions can be recognized, not so they can be handed over. A trainee given the force catalogue will shop it for a pattern they like, which is the exact failure this skill prevents.

## When this skill applies

- Trainee has a module with a stated responsibility and asks whether a pattern belongs in it.
- Trainee has read about a pattern — factory, strategy, singleton, observer — and wants to use it somewhere.
- Trainee's code works and they suspect it is "not how professionals would write it".
- Trainee's code has grown three near-identical branches and they sense a shape but cannot name it.
- Trainee is told their design is over-engineered and wants to know which parts to remove.

This skill advises on **one module at a time**, inside a design that already exists — usually the `ARCHITECTURE.md` from `/map-architecture`. It does not decompose a task into modules; that is `architecture-mapping`'s job, and it comes first.

## Before you start

Settle four things. The `/advise-pattern` command handles them, but when this skill triggers on its own, it owns them:

1. **The stack.** Look for `pyproject.toml`, `requirements.txt`, `package.json`, `*.csproj`, `go.mod`, `Cargo.toml`, `Makefile`/`*.c`. If that is ambiguous, **ask**. Never name a pattern before the stack is settled — `${CLAUDE_PLUGIN_ROOT}/skills/pattern-advisory/references/pattern-catalogue.md` is organized by stack precisely because a pattern in one language is a keyword in another.
2. **The one module.** A pattern applies to a boundary, not to a program. If the trainee says "my project", narrow it to a single module and its single responsibility before going further.
3. **The existing design.** Read `ARCHITECTURE.md` if it exists; its "which constraint forced it" column is the force table's raw material. If it does not exist, say once that `/map-architecture` usually comes first, and continue only against a named module with a named responsibility.
4. **The write target and overwrite.** `PATTERNS.md` in the current working directory. If it already exists, confirm before replacing it — the previous verdict may be the thing being revisited.

## The six-step loop

Run these in order. Steps 1–5 are questions to the trainee wherever possible; only the write-up is prose from the mentor.

### Step 1. Settle the stack and the one module in question
Get to a single sentence both sides agree on: *this module is responsible for X, in language Y*. If the responsibility cannot be stated in one sentence, the module is the problem and no pattern will fix it — send them back to `architecture-mapping`.

### Step 2. Research the language's own catalogue, and what it absorbed
Before any candidate is named, establish what the language does for free. Use **WebSearch** and **WebFetch** on the detected stack, and load `${CLAUDE_PLUGIN_ROOT}/skills/pattern-advisory/references/pattern-catalogue.md` for the per-stack shortlists and absorptions.

This step exists because the classic catalogue was written against a language without first-class functions. In a language that has them, a large fraction of the book is a workaround for a missing feature — Strategy becomes a variable holding a function, Iterator becomes a generator, Decorator becomes a wrapping function. Recommending those by name in such a language is not advice, it is ceremony.

### Step 3. Name the forces actually present
A force is a pressure that exists **today**, in this module, with evidence. Take them from the `ARCHITECTURE.md` constraint column first: a boundary that was forced by something is the most likely place for a real force to live.

Load `${CLAUDE_PLUGIN_ROOT}/skills/pattern-advisory/references/force-to-pattern.md` for the numbered catalogue of pressures, the cheaper non-pattern answer for each, and the question to put to the trainee. **The trainee names the force.** A force the mentor supplies is a force the trainee will not recognize next time. The same file lists the forces beginners believe they have and usually do not — check those before accepting any candidate.

### Step 4. Shortlist at most three candidates
Three is the cap, not the target. Zero candidates is a legitimate and common outcome, and one well-refused candidate teaches more than three evaluated ones. Each candidate must trace to a numbered force from Step 3; a candidate that traces to no force never becomes a row.

### Step 5. Verify each candidate against real usage and against the honest baseline
Two checks per candidate, both mandatory.

**Real usage.** Find one place the pattern is genuinely used for this force, in this language, and cite it. If no real-world use resembles the trainee's situation, that is evidence against the candidate, not a gap in the research.

**The honest baseline.** Compare against doing nothing. Two tests decide it:

- **The function-and-a-dict rule.** If the whole benefit of the pattern can be had with a function, a dictionary, a parameter, or the language's own feature, the verdict is **NOT NEEDED**. This is the pattern-side twin of the architecture skill's ten-line rule: writing those few lines *is* the exercise.
- **The horizon test** (falsifiable, and the mirror of the merge test). Ask: *"What future change becomes cheap if you adopt this — and is that change actually on your horizon?"* If the trainee cannot name the change, drop the candidate. If they can name it but it is not on the horizon, the verdict is **ADOPT LATER**, with the trigger written down.

Then assign exactly one verdict per candidate, from this fixed vocabulary:

- **ADOPT NOW** — the force is present today, the baseline is genuinely more expensive, and the named change is on the horizon.
- **ADOPT LATER (name the trigger)** — the force is real but not yet felt. The trigger must be an observable event ("when the second export format arrives"), never a date and never "when it gets big".
- **NOT NEEDED** — no force present, or the function-and-a-dict rule settles it. The expected default.
- **ALREADY PRESENT (unnamed)** — the code already does what the pattern describes, without the vocabulary. Name it, change nothing, and let them keep the word.
- **BUILT INTO THE LANGUAGE** — the language provides it as a feature. Say which feature, and stop.
- **OVERENGINEERING** — the pattern would add participants, indirection and a vocabulary lesson to a module that has one caller and one behaviour.

### Step 6. Write the file
Write `PATTERNS.md` and nothing else. No source file is created, edited or stubbed.

## Output contract

Write `PATTERNS.md` following `${CLAUDE_PLUGIN_ROOT}/skills/pattern-advisory/references/patterns-md-template.md` exactly:

1. Title + the module under review, and its responsibility in one sentence.
2. **The forces present** — `| Force | Evidence in this task | Which constraint in ARCHITECTURE.md |`
3. **Candidates evaluated** — `| Pattern | What it would buy you | Verdict | Why |`, at most three rows, one verdict each from the fixed vocabulary.
4. **The recommendation** — one paragraph, frequently "none", stated without apology.
5. **What the language gives you instead** — the features that cover the refused candidates.
6. **Sources** — markdown links, one per non-obvious claim.
7. **Questions to answer before applying anything** — 3–5 Socratic questions.

## Calibration

The depth to aim for is one screen: two tables, a paragraph, a short source list. The refusal calibration lives in `${CLAUDE_PLUGIN_ROOT}/skills/pattern-advisory/references/force-to-pattern.md` under the forces beginners think they have — read it to recognize how confidently a beginner can describe a pressure they are not under.

For the tone of a good negative verdict: state what the pattern would buy, state what the module costs without it, and let the arithmetic be the argument. A verdict of **NOT NEEDED** with a named reason is a result the trainee can use. "You probably don't need it" is not.

## Hard refusals

- "Just show me the pattern's code" -> refuse. Name the pattern and the role of each participant; the participants are theirs to write.
- "Which pattern is best practice here?" -> refuse the framing. Patterns are answers to forces; ask which force is being felt, and accept that the answer may be none.
- "I want to use a factory because it looks professional" -> refuse. "It's cleaner", "it's more professional" and "it scales better" are the same rejected non-reasons the `architecture-mapping` skill refuses for module boundaries.
- "Add all three patterns you evaluated" -> refuse. Three candidates were *evaluated*; at most one is usually adopted, and a design with three fresh patterns in one module has a different problem.
- The trainee's language already provides the pattern as a feature -> do not recommend the pattern. Name the feature, and say plainly that the pattern exists because an older language lacked it.
- "Our lecturer requires a design pattern in this assignment" -> the grading requirement is a real constraint; treat it as force #0, say so explicitly in the file, and still pick the smallest pattern that the module's actual behaviour can carry.

## Keep it short

Two tables, one paragraph, three questions. A trainee who receives a taxonomy of twenty-three patterns has learned that professional code is complicated — the opposite of the lesson.
