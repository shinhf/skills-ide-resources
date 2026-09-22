> **TRAINEE-FACING — safe to hand out.** This document contains no solution, no module list and no dependency list for the task. The mentor-side calibration material is pointed at, never quoted (see the facilitator appendix).

# Workshop — Approaching "Call Me Maybe" with the Coding Mentor Plugin

This is the facilitator script and the trainee handout for a guided session on a single unfamiliar task. It teaches a **method for entering a task nobody has explained to you yet** — read, interrogate, study, plan, defend the plan, structure, then slice into work. The task is the vehicle. The method is the lesson.

Use it as a running order, not as a lecture. Every station is a **conversation** with the mentor, and every station ends with a document that conversation produced — one the trainee can defend because they said most of it out loud first. Nothing in here tells a trainee what their program should look like inside, and it must not be used that way: if you find yourself wanting to add the answer to make a station "clearer", you have found the exact place where the trainee is supposed to think.

| | |
|---|---|
| **Audience** | Beginner-to-intermediate developers facing their first large, under-specified task |
| **Safe to hand to** | Trainees, including trainees currently doing this task |
| **Prerequisites** | Basic Python; comfortable with a terminal and `git`; has read nothing about the task yet |
| **Duration** | 5 hours with breaks for the full chain — 90-minute and two-session variants below. **The two-session split is the recommended default**; see the arithmetic under Schedule variants |
| **Group size** | 4–12, pairs or solo at one machine each, one facilitator |
| **Trainee leaves with** | Nine documents — `UNDERSTANDING.md`, `QUESTIONS.md`, `SUBJECTS.md`, one or more `CONCEPTS-<slug>.md`, `PLAN.md`, `REVIEW-<n>.md`, `ARCHITECTURE.md`, `PATTERNS.md`, `TASKS.md` (or `task_list.md`) — published issues if they have a board, a filled worksheet, and the first task in progress |
| **Plugin** | `coding-mentor` — nine commands, nine artifacts, no code written for you |

---

## Learning outcomes

By the end of the session, a trainee can do each of these in front of a facilitator, without notes:

1. **State the task's contract in three lines** — input, required behaviour, failure behaviour — from the subject alone, and point at the sentence in the subject that each line came from.
2. **Separate what is given from what they author** — name every provided, read-only component in the repo and say why it is a constraint rather than a design choice.
3. **Name the pressure behind every module boundary** on their own diagram, and say what breaks if that module is merged into its neighbour.
4. **Defend or drop every dependency** with the three-question test: what it does, what they would write by hand instead, whether the standard library is honestly enough.
5. **Deliver a pattern verdict in the plugin's vocabulary** and be comfortable when that verdict is NOT NEEDED.
6. **Recite the "done when" of their first task** — a check they can run in a terminal — without reopening `TASKS.md`.
7. **Say which of their nine documents still has an honest open question in it**, and what would close it.

Note what is not on that list: writing the program. The build starts in this session and finishes outside it.

---

## What this workshop will not give you

**Struggle is the curriculum. A solution handed over is a lesson removed.**

This document deliberately does not contain, and no facilitator should add:

- Any module list, file layout or proposed decomposition for this task.
- Any dependency list, or the name of any third-party library for this task.
- Any technique, strategy or algorithm for producing the required output.
- Any claim about how many modules the "right" answer has.
- Anything you could copy into a design and skip the thinking.

Where a section could only be made more helpful by adding one of those, it instead gives you **the question to answer**. That trade is on purpose, and it is the whole product. The plugin behaves the same way — no command in it will write your code or hand you your answer, and it will keep declining however you phrase a request for the answer. Asking to be *taught* is a different request, and that one is never declined — see **How the mentor behaves** below.

**Bottom line for the trainee:** you will leave with your own design, defensible by you, and possibly different from your neighbour's. Both can be right. Neither is right because it was handed over.

---

## How the mentor behaves

Read this before you run a single command. Every station below is a back-and-forth, and a mentor that asks instead of answering reads as obstruction unless you know the rules going in. There are six.

**1. One question at a time, and then it waits.** The mentor's turn ends at the question mark. Nothing follows it — no hint, no "for example", no second question, no answer in brackets. The silence after the question is not a bug and not a stall; it is your turn. A station takes six to twelve of these exchanges, and the mentor tells you where you are in them ("two things left, then the write-up").

**2. When you are stuck, it comes down a ladder.** Five rungs, one per turn, and it only descends when a turn fails: an open prompt ("what are you thinking?"), then attention pointed at the right place, then a narrowing question, then one fact or one analogy with the question re-asked, then the step worked on an unrelated toy problem with the next step handed back to you. Say "I don't know" honestly and you get the next rung. Guess wrong and you get the next rung. Neither is punished.

**3. It will teach you anything. It will not answer your task.** These are different requests and they get opposite answers. *"Give me the answer / write this function / just solve it"* is declined — it is a mentor, it does not provide answers, and a different tool exists for that. *"I don't understand pointers" / "I'm stuck" / "explain this to me"* is never declined; that is the job, and you will get the concept, an analogy and a worked example on an unrelated problem, quickly and without being made to feel bad for asking. **If you are confused, say so plainly — do not dress it up as a request for the answer, because that is the one phrasing that gets declined.**

**4. "Write up what we have" always works — in the turn you ask it.** At any point, in any station, you can ask for the document and you get it *in the same turn*. You will not be asked for a summary first, and nothing is held back until you produce one; a trainee out of time should not have to answer one more question to get their file. It covers what you actually settled, marks the rest as open, says which questions remain, and says on its face that it was written on request. Three turns in and out of time is a legitimate way to end a station. Nobody loses work here.

**5. Being asked a question is not evasion.** You will feel, around the fourth question, that the mentor is withholding something it could just tell you. It is — and the thing it is withholding is the part of your learning you would otherwise skip. Being asked which task you mean, or what you already believe, is the same discipline you are here to learn.

**6. It will not walk you to an answer.** There is a difference between being asked and being herded. A run of questions that each admit exactly one answer, each built on the last, is a lecture wearing a question mark — the protocol forbids it, and by the third one the mentor is required to stop, say plainly that it is steering, and hand the direction back to you. You do not have to wait for it to notice. *"I feel like you are walking me somewhere"* is a legitimate thing to say, not a complaint, and what comes back is the choice of where to go next. Rule 5 and this one are not in tension: a question you cannot yet answer is the work, a question you can only answer one way is the mentor thinking out loud.

Two consequences worth knowing up front:

- **The documents are project documentation, not transcripts.** No question-and-answer log, no "then I asked", no dialogue history. They record what was settled and, separately, what is still open. You will not find the mentor's wording in there to copy, which is why every checkpoint in this workshop is spoken.
- **Mid-conversation state lives in `.coding-mentor/`.** Add that directory to your project's `.gitignore` before you start. It is scratch; the nine documents are the product.

---

## Materials and setup

Setup problems eat workshops. Everything below is done **before** the session starts — send it out the day before and ask for a green checklist by email or chat.

Each trainee needs:

- **The subject** — the task PDF or markdown file, in the repo, path known. Nobody reads it yet.
- **The repo cloned**, with the provided material in place: two JSON inputs (a set of function definitions with typed parameters, and a list of natural-language prompts), the vendored SDK for the small local model, and the grader CLI.
- **The stack working** — Python, `uv`, the linter and the strict type checker the subject requires. `uv sync` completes without errors.
- **The provided SDK installed and importable.** It is read-only; do not modify it, and do not read ahead — discovering its surface is Station 0 work.
- **The grader runnable** — it runs and reports a score, even a score of zero.
- **Claude Code with the `coding-mentor` plugin available** — `/understand-task` appears in the command list.
- **`.coding-mentor/` in `.gitignore`.** The commands keep mid-conversation state there. One line, added before the session, saves a confusing first commit.
- **A place to write** — one markdown file per trainee, for the worksheet below.
- **Optional but better:** a GitHub repo and a project board they can publish issues to, and `gh` authenticated. Without it Station 9 falls back to a file, which works fine.

### Pre-flight checklist

Run this at the machine, not from memory. Every line must pass before Station 0.

```
[ ] git clone done, subject file present, path noted
[ ] uv sync completes with no errors
[ ] python -c "import <provided sdk package>" succeeds
[ ] the model loads without a network connection
[ ] the grader CLI runs and prints a score (zero is fine)
[ ] the linter and the type checker both run to completion
[ ] claude launches; /understand-task is listed
[ ] .coding-mentor/ added to .gitignore
[ ] subject NOT yet read   <-- deliberately unchecked
[ ] worksheet file created and empty
```

> **Facilitator note.** Expect one machine to fail on the model download and one on the type checker. Budget fifteen minutes before the official start for these, and pair a broken machine with a working one rather than debugging it while nine people wait.

> **Facilitator note — say this before Station 0, to the whole room.** Every command is a conversation: the mentor asks one question, stops, and waits for the trainee. It does not answer the task, at any station, however the question is put — but it will teach any concept, immediately, to anyone who says plainly that they are lost. Set that expectation now and the first "why won't it just tell me" arrives as a shrug instead of a complaint. Say the other half too: "write up what we have" produces the document at any point, so nobody has to choose between finishing the conversation and having something to show.

---

## The command order

This is the core of the document. Run the session from this table and the checkpoints.

| # | Station | Command | Time | You leave with |
|---|---|---|---|---|
| 0 | Read the subject yourself | *(none — no terminal)* | 20 min | A three-line contract in your own handwriting, and a list of words you do not know |
| 1 | Orient | `/understand-task <subject>` | 20 min | `UNDERSTANDING.md` — the task brief, with your contract confirmed or corrected |
| 2 | Interrogate | `/advise-questions <subject>` | 30 min | `QUESTIONS.md` — the parts of the subject you chose to pull apart, each unknown resolved or marked open |
| 3 | Study list | `/advise-subjects <subject>` | 15 min | `SUBJECTS.md` — the study plan, triaged into "need now" and "need later" |
| 4 | Unblock | `/explain-subject "<term>"` | on demand, ~10 min a term | `CONCEPTS-<slug>.md` — one note per term, in your words |
| 5 | Plan | `/prepare-plan <subject>` | 30 min | `PLAN.md` — a plain-English plan you can read aloud from memory |
| 6 | Defend your weakest step | `/review-algorithm "<one step's procedure>"` | 40 min | `REVIEW-1.md`, `REVIEW-2.md` — one per round, and a step that survived them |
| 7 | Structure | `/map-architecture <subject>` | 35 min | `ARCHITECTURE.md` — diagram, module table, library table, build order |
| 8 | Patterns | `/advise-pattern <module-or-task>` | 20 min | `PATTERNS.md` — a verdict per candidate, usually NOT NEEDED |
| 9 | Slice into work | `/plan-tasks` | 25 min | `TASKS.md`, plus issues on your board or `task_list.md` |
| 10 | Build | *(your editor, plus 4 and 6 as needed)* | 40 min, and it continues after the session | The first task's "done when" passing |

Stations 0–9 are **235 minutes of conversation**. Add two breaks and Station 10 and the full chain is five hours. Station 4's time comes out of whichever station you were on when you got stuck, not out of a slot of its own.

All nine documents land in the project root. `.coding-mentor/` holds mid-conversation state and is gitignored, not read.

---

### Station 0 — Read the subject yourself, unaided

No terminal. No plugin. No search. Paper or a plain text file.

**Timebox:** 20 minutes. **Non-negotiable, and the most-skipped step in this workshop.**

Produce, alone:

- The contract in three lines — input, required behaviour, failure behaviour.
- The success condition: what the grader measures, and what target the subject sets for accuracy and for JSON validity.
- A list of every word in the subject you cannot define. Do not look any of them up yet.

**Done with this station when** you have three lines you would defend and a list with at least three words on it. There is no conversation here and no document; the mentor has not been opened yet, on purpose.

**Checkpoint (under a minute):** the facilitator reads the three lines and asks "which sentence of the subject gave you line two?" A trainee who cannot point at it has skimmed.

> **Facilitator note.** Everyone will want to open the plugin first — the whole session looks like a tool demo from the outside. Say it plainly: the mentor's first move is to ask what you already think, and "nothing yet" is a wasted station. Without your own reading you cannot tell a good answer from a confident one.

> **Facilitator note.** The "words I do not know" list feels like an admission of weakness, so it comes back empty. Push back with "you wrote nothing down — so define the output format for me in one sentence." The list fills up immediately.

---

### Station 1 — `/understand-task` — orient and confirm

```
/understand-task subjects/call-me-maybe.pdf
```

**Timebox:** 20 minutes.

You go first. The mentor asks what you think the task is asking for before it says anything about it, so read your Station 0 contract into the chat and let it be interrogated. Where its questions and your reading pull apart, one of you misread the subject — go back to the subject and settle it in the conversation. **The differences are the point**, and you will find them by defending your version, not by comparing it to a delivered summary.

**Produce:** `UNDERSTANDING.md` — the task brief, holding the contract as you and the mentor left it, the success condition, and the vocabulary now sorted into "blocks me now" and "can wait". You can say, without opening it, what the task requires and what counts as failure.

**Done with this station when** you state the contract and the mentor has nothing left to correct in it — or when the same question has been answered wrong twice and the distinction was taught outright. Two one-word answers in a row also ends it, and the document will be thin. So does asking for the write-up.

**Checkpoint:** with the screen turned away, the trainee states the three-line contract and names one thing they had wrong at Station 0. If nothing changed, they either read very well or did not argue — ask which line they defended hardest.

> **Facilitator note.** This is where the room learns the rhythm for the whole day. Watch for the trainee who pastes the subject and waits. Nothing arrives except a question. Nudge once — "it asked you something" — and let the second silence do the teaching.

---

### Station 2 — `/advise-questions` — interrogate the subject

```
/advise-questions subjects/call-me-maybe.pdf
```

**Timebox:** 30 minutes, and this station is worth its length.

**You choose what gets pulled apart.** No list of unknowns is handed to you to work through — the mentor asks which part of the subject you want to interrogate, and then asks one question about *that* part, stops at the question mark, and waits. Answer in the chat, in sentences, each one traced to the subject or to something you can check in the repo. When your answer comes back general — "it has to handle the input properly" — the next question takes that answer apart rather than moving on, and keeps taking it apart until the piece left is small enough to check. When a strand is finished, the choice of the next one comes back to you: which part now? Argue back when a question is built on a wrong assumption; that is a legitimate answer and often the most useful one.

So the shape of this station is yours — which strands you open, and how far down each one goes. Two taken to the bottom beat six touched lightly. When it ends, `QUESTIONS.md` records the unknowns you settled and the ones still open, and your worksheet holds the two or three conclusions you want to be able to say out loud at the checkpoint. The worksheet is no longer where you answer — it is where you write down what you concluded.

The old discipline still holds, it has just moved. A trainee who types "yes" and nothing else has learned nothing, and the protocol knows it: **two one-word replies in a row is a stop condition.** The mentor stops asking, writes the document, and the document is thin because you were. Nobody polices your typing. The thin document is the consequence.

**Produce:** `QUESTIONS.md` — the strands you chose to open, and inside them every unknown either resolved with its source or marked open. The open ones are your real backlog; they become study topics at Station 3, or questions the subject genuinely does not answer, in which case you decide and the decision is recorded as yours. You can say which part you chose to pull apart first, why, and which two open questions matter most.

**Done with this station when** any one of these fires:

- You have named the subject's central unknown before being asked about it.
- The ladder bottomed out on a question, it was taught, and there is nothing left to ask on it.
- Two disengaged replies in a row.
- You ask for the write-up.

**Checkpoint:** the facilitator picks an open item from `QUESTIONS.md` at random, closes the laptop, and asks why it is still open and what would close it. "I don't remember" means the conversation happened to the trainee rather than with them.

> **Facilitator note — the stall that is new here.** The direction belongs to the trainee at this station, so a trainee waiting to be handed a list will sit at the first turn with nothing happening and read it as the tool being broken. Walk the room in the first five minutes and look for a screen with one question on it and no typing. Say: *"it is not going to give you the list — name the part of the subject you trust least, and start there."* Any part will do; the narrowing is the mentor's job, the choosing is theirs. Say the same thing again after each strand closes, because the hand-back surprises them twice.

> **Facilitator note.** One sharp question beats five vague suggestions, and the same is true of answers. When a trainee is giving three words a turn, sit down next to them and make them say the answer to you first, out loud, before they type it. They usually discover mid-sentence that they cannot.

> **Facilitator note.** This is where trainees first try to talk the mentor into answering its own questions. Use the ninety-second script under *Facilitator notes — running the room*, and do not litigate it in front of the room.

---

### Station 3 — `/advise-subjects` — the study list, triaged

```
/advise-subjects subjects/call-me-maybe.pdf
```

**Timebox:** 15 minutes.

You name the gaps first. The mentor asks what you think you are missing before it proposes anything, so start from your Station 0 word list and your open items from Station 2. Then the triage happens in the conversation, not afterwards: for each candidate you say which next step it blocks, and an item you cannot attach to a next step does not make the "need now" column. Left untriaged, a study list becomes a week of reading and no program.

- **Need now** — blocks the very next step. At most three items.
- **Need later** — real, but it can wait until a task actually demands it.

**Produce:** `SUBJECTS.md` — the study plan with the two columns and a one-line reason for each "need now". You can say the three "need now" items and what each one unblocks, from memory.

**Done with this station when** you have defended a "need now" column of three items or fewer, or you ask for the write-up.

**Checkpoint:** screen away — name the "need now" items and the station each one unblocks.

> **Facilitator note.** A long "need now" column is avoidance wearing a study hat. Ask: "which of these do you need to write the *first* task?" Everything else drops a column.

---

### Station 4 — `/explain-subject` — the on-demand loop

```
/explain-subject "JSON schema"
/explain-subject "vendored dependency"
```

**Not a station with a fixed time.** It runs from Station 1 to the end of the session, whenever a term blocks you. Budget ten minutes a term, taken from the clock of the station you are on.

The rule keeps it from becoming a detour: **one term per visit, at most two terms open at a time, and back to the station you left the moment you can say the term in a sentence of your own.** Bound the terms, not the turns — a single term may take five turns, and that is the station working, not the station running long. You will be asked what you already think the term means before you are told anything, and the examples that come back are real-life analogies and toy problems unrelated to your task. Asking for an example closer to your own task gets you another unrelated one.

This is the one command nobody should hesitate over. "I don't understand X" is never declined, at any station, at any point — it is the job.

**Produce:** `CONCEPTS-<slug>.md` — one short note per term, holding the definition as you ended up stating it, the analogy that landed, and what it is for in your task. You can explain the term to your pair in one sentence without opening the note.

**Done with this station when** you can state the term in your own words, or it has been taught outright after two failed attempts and the next step has been handed back to you.

**Checkpoint:** the trainee explains the term to their neighbour without reopening the note.

> **Facilitator note.** Three concept notes in fifteen minutes means someone has stopped working and started browsing. Interrupt: "which station are you on, and what is the next thing you have to write?"

---

### Station 5 — `/prepare-plan` — a plan the trainee owns

```
/prepare-plan subjects/call-me-maybe.pdf
```

**Timebox:** 30 minutes.

You draft first. The mentor asks for your first cut of the steps — in plain English, no code, and none is coming — and then goes after them one at a time: what goes into this step, what comes out, why this step exists at all. The plan grows out of your answers, so it is **yours** by construction; there is no delivered version to rewrite. A plan you cannot read aloud from memory is a plan you will not be able to defend at Station 6 or debug at Station 10.

**Produce:** `PLAN.md` — six to twelve plain-English steps, each with what goes in and what comes out, plus the step you already suspect will be hardest. You can read the plan aloud with the screen turned away.

**Done with this station when** every step has an input and an output you stated yourself and you named the hardest step before being asked — or when a step was taught outright after two failed attempts and the next one handed back. Asking for the write-up ends it at any point.

**Checkpoint:** the trainee reads the plan aloud with the screen turned away. Hesitation at a step is the step to rework.

> **Facilitator note.** Watch for plans made of nouns — "handle the input, process it, write the output". The mentor will ask what "process" means in terms of what goes in and what comes out; if the trainee dodges it twice, ask it yourself in the room. That single question usually doubles the plan's length and halves its vagueness.

---

### Station 6 — `/review-algorithm` — Socratic review of your weakest step

```
/review-algorithm "<one step's procedure, in plain English>"
```

**Timebox:** 40 minutes. **Expect two rounds.** The first review is never the last, and each round writes its own file: `REVIEW-1.md` for the first, `REVIEW-2.md` for the second. Seeing a second file appear is the loop working, not the first one being rejected.

**Do not paste `PLAN.md` here.** Your plan is a build order — it says what you will do and in what order, and it says in its own second paragraph that it contains no code, no pseudocode and no algorithm. A five-step review has nothing to bite on in a build order, and the command will say so and make you pick something. Pick it yourself first: **the one step of your plan you are least sure of**, written out as *that step's procedure* in plain English — what comes in, what happens to it in what order, what comes out. Half a dozen lines is plenty, and it is what you hand to the command.

The questions come one at a time, aimed at the weakest part of that procedure, and they stop at the question mark. You revise the procedure yourself between rounds and bring it back. The mentor will not rewrite it for you, and there is no round in which it starts.

Each round walks the same ground: the step's contract, the invariant that holds every time round its loop, the edge cases, the cost, and the translation checkpoint — what variables exist and what exactly gets written out.

**Good enough to proceed** — all four of these, or you go round again:

- The step's contract survives the review unchanged.
- You can name what is true at every pass through its main loop.
- You have at least three edge cases, one of them from the failure line of that contract.
- You can say which part of the step will be hardest to turn into code, and why.

**Done with this station when** all four hold for the step you chose — or when you ask for the write-up, which ends it in the same turn and marks whatever you did not get to as open. A second step reviewed is a bonus, not a requirement; one step taken to the bottom is the station.

**Produce:** `REVIEW-1.md` and `REVIEW-2.md`, and a step description that visibly changed between them — carried back into `PLAN.md` if the change moved the build order. You can say what round two changed and why, without opening either file.

**Checkpoint:** screen away — the facilitator asks which step the trainee chose and why that one, then for the edge case they added in round two. One that came out of the review and not out of their first write-up proves the loop ran.

> **Facilitator note.** Half the room will paste the whole plan anyway and get asked to narrow it. Head it off at the start of the station: "one step, the one you trust least, described as a procedure." A trainee who cannot say which step they trust least has not got a plan yet — send them back to Station 5 for five minutes.

> **Facilitator note.** Rounds are not failure. Say so at the start of the station, or the first question lands as criticism and the trainee defends their step instead of improving it.

> **Facilitator note.** A trainee stuck at round four has a contract problem, not a procedure problem. Send them back to the subject for five minutes. It is almost always the failure line.

---

### Station 7 — `/map-architecture` — structure, after the plan

```
/map-architecture subjects/call-me-maybe.pdf
```

**Timebox:** 35 minutes. Writes `ARCHITECTURE.md` in the project root, and asks before overwriting one.

**Why this comes after the plan, not before.** A module boundary needs a named pressure, and pressures come from the plan — from the step that repeats, the step that could fail, the step whose input shape is not the program's input shape. Map first and you are decorating a guess: boxes chosen by taste, then a plan bent to fit them. Plan first and every box has a reason you lived through.

**You propose the boxes.** The mentor asks which steps of your plan belong together and why, one boundary at a time, and it applies the merge test live: *what breaks if this is folded into its neighbour?* If your honest answer is "nothing", the box goes — in the conversation, before it is ever drawn. Same for every library you reach for: the three questions come at you one at a time — what does it do, what would you write by hand instead, is the standard library honestly enough? If the by-hand answer is about ten lines, you have already answered it.

`ARCHITECTURE.md` is written at the end and holds what survived: the contract, a component diagram with the provided read-only pieces in their own subgraph, a module table naming the constraint behind each boundary and what breaks if you merge it, a library table, a build order with a "done when" per step, and the questions still open. The map stays deliberately small — a diagram you cannot hold in your head is not a map. The questions in the file are the ones you did not get to, not a new quiz; the ones that mattered were asked to your face.

**Done with this station when** every boundary in the diagram has a pressure you named and a merge answer you gave, and every library has survived the three questions or been dropped. A boundary taught outright after two failed attempts on the merge test also ends its turn. Ask for the write-up at any point and the boundaries you never argued go into the file marked open.

**Produce:** `ARCHITECTURE.md`, plus, in the worksheet, every module's pressure in your own words and at least one box you argued about — merged, split or dropped. You can walk the diagram from memory.

**Checkpoint:** screen away. Facilitator names a box from the file; the trainee gives its pressure and what breaks on merge, in one breath. Then a library row: what would you write by hand instead?

> **Facilitator note.** "It's cleaner" is not an architecture argument and the mentor will not take it — it will ask what breaks, and it will ask again. Neither should you take it. Three times if necessary.

> **Facilitator note.** Two trainees with different module counts will ask which of them is right. More than one can be right. Ask each of them which pressure produced their extra boundary; whoever cannot name one has found their own answer.

---

### Station 8 — `/advise-pattern` — patterns, after the architecture

```
/advise-pattern <module-or-task>
```

**Timebox:** 20 minutes. Writes `PATTERNS.md`. Needs `ARCHITECTURE.md` to already exist.

**Why it comes after the architecture.** A pattern is an answer to a structural pressure, and the pressures live in the architecture's constraint column and library table. Without those there is nothing for a pattern to be an answer *to* — you get a catalogue reading, which is how beginners end up with a factory that manufactures one thing.

**You name the force first.** The mentor asks what pressure you think you are feeling in this module, and where in `ARCHITECTURE.md` it is written down. Only a force you can point at earns a candidate. Then, candidate by candidate, you say what you think it would buy you and what it would cost — and the verdict is reached in the conversation, from a fixed vocabulary:

| Verdict | What it means for you |
|---|---|
| ADOPT NOW | The pressure is here today; restructure before you build |
| ADOPT LATER | Not yet — the named trigger tells you when to revisit |
| NOT NEEDED | The pressure this pattern answers does not exist in your task |
| ALREADY PRESENT | Your design does this; it does not need the name |
| BUILT INTO THE LANGUAGE | The language already gives you this; reaching for the pattern adds ceremony |
| OVERENGINEERING | Applying it would cost more than the problem it solves |

**"No pattern needed" is the default answer, the most common outcome, and the most valuable one.** A page of NOT NEEDED verdicts is a successful station: you now know which patterns you consciously declined and why. Trainees read it as the tool failing to help. It is the tool refusing to sell you something.

**Done with this station when** you have named a force, traced it to a constraint and reached a verdict you can defend — or when you could not name a force for any candidate, which is itself the verdict and puts NOT NEEDED in the file. Two disengaged replies in a row, or asking for the write-up, also ends it.

**Produce:** `PATTERNS.md`, plus one line in the worksheet: your verdict, and the trigger if it was ADOPT LATER. You can state the verdict and the force behind it without reading.

**Checkpoint:** screen away — the verdict and its reason. For ADOPT LATER, the trigger. For ADOPT NOW, what in `ARCHITECTURE.md` forced it.

> **Facilitator note.** Someone will keep re-asking with different modules until they get an ADOPT NOW. Name the behaviour out loud — it is the same instinct as asking for the code, wearing better clothes.

---

### Station 9 — `/plan-tasks` — slice into work

```
/plan-tasks
```

**Timebox:** 25 minutes. Writes `TASKS.md`.

The command reads everything the plugin has produced — `ARCHITECTURE.md`, `PATTERNS.md`, `PLAN.md`, the reviews, any previous `TASKS.md`, the subject, and the current state of the repo. Then it asks **you** what is left to do and in what order, and pushes on the answers: is that one sitting or three? What command proves it is done? Why is that one first? The 8–15 tasks that end up in the file are the ones that survived those questions, each **sized to a single sitting** and carrying a **runnable "done when"** check.

Then the GitHub step. The command asks whether you have a repo and a project board:

- **Yes** — it publishes one issue per task with `gh`, issue bodies written to the plugin's `trainee-issue-writing` conventions. Confirm the count afterwards on the board.
- **No, or you decline, or `gh` is not available** — it writes `task_list.md` with every task's full issue-ready definition instead. Nothing is lost; you paste them later.

A task you cannot finish in one sitting is two tasks. A "done when" you cannot run in a terminal is not a "done when" — say so when it comes up, and rewrite it until it is a command with an observable result.

**Done with this station when** every task is one sitting, every "done when" is a command you can type, and you said why the first task is first without being asked. Two disengaged replies in a row ends it, and so does asking for the write-up — unsized tasks then go into the file marked open.

**Produce:** `TASKS.md`, plus issues on a board or `task_list.md`, plus your chosen first task in the worksheet with its "done when" copied out in full. You can recite the first task's "done when" from memory.

**Checkpoint:** screen away — the facilitator asks the trainee to state the first task's "done when" and then type the command that checks it. If they cannot, the task is not ready.

> **Facilitator note.** Ordering is the lesson here, and the command will ask about it rather than assert it. The right answer is that the first task removes the most uncertainty — usually the task that touches the provided, unfamiliar component. The wrong answer is that it looked easiest. If the trainee gives the wrong answer and the mentor lets it stand, ask again yourself.

---

### Station 10 — The build loop

No new command. Your editor, plus Stations 4 and 6 when you are stuck.

**Timebox:** 40 minutes here, and it continues after the session.

Run this loop, one task at a time:

1. Take the first task from `TASKS.md` and read its "done when" aloud.
2. Write the check first if you can — run it, watch it fail.
3. Build until the check passes. Nothing more; the next task is the next task.
4. Stuck on a concept — `/explain-subject "<term>"`, one term, then back.
5. Stuck on an approach — `/review-algorithm "<what you were going to do>"`, answer the questions, revise.
6. Check passes — run the linter, the type checker and the grader before you call it done.
7. Re-run `/plan-tasks` to refresh the list against the repo's new state, then go to 1.

Step 7 is what keeps the plan honest: the task list is regenerated from reality, not maintained by hand.

**The plugin will not write this code, and that is the point.** It will explain anything you ask about, endlessly and without complaint. It will not hand you your own answer. The design is yours; so is the code, and so is the thing you will be able to do next week that you cannot do today.

**Produce:** the first task's "done when" passing, with the linter and type checker clean.

**Checkpoint:** the check runs green in front of the facilitator, from a terminal, on the trainee's machine.

> **Facilitator note.** "Just give me the code" arrives here, around minute twenty of being stuck. Separate the two requests before you answer: nine times out of ten the trainee is actually lost on a concept, and *that* the mentor will teach instantly. Ask "what exactly don't you understand?" — then send them to `/explain-subject` with it. If it really is the answer they want, decline once and ask which step of their plan the code would go into.

> **Facilitator note.** Do not let anyone start task two before task one's check is green. Half-finished tasks are how a clean task list turns back into a pile.

---

## Why this order

The chain is **understand → question → study → plan → review → structure → patterns → tasks → build**, and each link consumes the *document* the previous conversation produced. `QUESTIONS.md` supplies the gaps `SUBJECTS.md` triages; `PLAN.md` supplies the step the reviews attack; the surviving plan supplies the pressures `ARCHITECTURE.md` names; its constraint column supplies the forces `PATTERNS.md` weighs; all of it supplies the slices in `TASKS.md`. A station run without its input document has to invent one, and what it invents is a guess with your name on it.

**Strengths:**
- Every document is checkable by someone other than its author, so progress is visible without reading code.
- Design decisions arrive attached to the pressure that caused them, which is what makes them defensible later.
- The trainee hits the unfamiliar provided component early, while there is still time to be confused about it.
- Rework is cheap up to Station 7 and expensive after it, and the order puts all the cheap rework first.
- Because the trainee speaks each conclusion before it is written down, there is no mentor wording in the documents to hide behind.

**Risks (say these out loud at the start):**
- It feels slow. Two hours in, nothing runs, and that is on schedule.
- It can drift into documentation as an end in itself — Station 10 is the cure, and it is not optional.
- A conversation can be pleasant and empty. Nine documents with no open sections, produced fast, is the signature.

**What breaks when it is run backwards.** The three common inversions:

- **`/map-architecture` first.** Boxes get chosen by taste, then the plan is bent to fit them. The constraint column fills up with "it's cleaner", the merge test has no answer, and the trainee cannot defend a single boundary under questioning — because there was no pressure, only a preference. Fix: go back to Station 5 and keep the diagram as a hypothesis to be re-earned.
- **`/advise-pattern` before there is anything to apply a pattern to.** With no architecture, there is no constraint column and no library table to weigh, so a trainee "chooses a pattern" from the catalogue and then builds a program shaped like the pattern rather than like the task. The command expects `ARCHITECTURE.md` to exist for this reason. Fix: run Station 7, then ask again — and expect NOT NEEDED.
- **Asking a station for its document instead of having its conversation.** "Just write me the `ARCHITECTURE.md`" is the new shortcut, and it is the old one in a suit. What comes back is a file with your open questions still open and nothing in it you can say out loud, which the spoken checkpoint finds in ten seconds. The document was never the deliverable; being able to defend it was. Fix: there is no fix — run the station.

Skipping Station 0 breaks the whole chain quietly: everything downstream is built on the mentor's questions landing against nothing, and nobody notices until the grader disagrees with both.

---

## Schedule variants

Conversations cost more clock than replies did. Here are the honest numbers.

| Variant | Total | Stations | What to cut or add |
|---|---|---|---|
| **Taster** | 90 min | 0 (15), 1 (20), 2 (25), 5 (25) | Cut 3, 6, 7, 8, 9, 10. `/map-architecture` no longer fits a 90-minute taster — do not try. Trainees leave with `UNDERSTANDING.md`, `QUESTIONS.md` and `PLAN.md`, and no code. Close by reading the plan aloud with the screen away. `/explain-subject` stays available throughout, out of the running station's clock |
| **Full chain, one sitting** | 5 h | 0 through 10 | Runs, but it is a five-hour day, not a half day. Breaks after Stations 3 and 6 (15 + 10 min). Station 10 gets 40 minutes and no more. Only attempt this with a room that arrived green on the pre-flight checklist |
| **Two sessions** *(recommended)* | 2 × 2 h 45 | Session A: 0–6, with a 10-minute break after 3. Session B: 7–10, with a 10-minute break after 8 | **The default.** The arithmetic makes it so: Stations 0–6 are 155 minutes of conversation and will not compress into 150, and Station 10 needs an unhurried 75 minutes, which the one-sitting variant cannot give it. Hand off on the reviewed `PLAN.md` and the `REVIEW-<n>.md` files |

**Homework between the two sessions:** finish the "need now" study items from `SUBJECTS.md`, and run one more `/review-algorithm` round on the step you reviewed. Nothing else — no architecture, no code. Trainees who start structuring at home arrive at Session B with boxes they cannot defend, and Station 7 becomes an argument instead of a station.

> **Facilitator note.** For the taster, announce up front that nothing will run today and that Station 2 alone will eat a third of the session. Otherwise the last twenty minutes are spent trying to make something run, and the plan never gets read aloud.

---

## Trainee worksheet

Copy this into your own file and fill it in as you go. **This is not where you answer the mentor** — you answer in the chat, and the nine documents keep the detail. The worksheet holds the handful of things you want to be able to *say* at each checkpoint, and it is deliberately short. If you are copying a document into it, stop.

```markdown
# Worksheet — <your name>

## Contract (Station 0, corrected in the Station 1 conversation)
Input:
Required behaviour:
Failure behaviour:
What I had wrong at Station 0:

## Words I did not know (Station 0)
Blocks me now:
Can wait:

## From the Station 2 conversation
The subject's central unknown:
Two open questions that matter most, and what would close them:

## Study triage (Station 3)
Need now (max 3) and the station each one unblocks:

## My plan (Stations 5 and 6) — the parts I can say from memory
The step I took into Station 6, and why I trusted it least:
What round two changed:
Hardest step to turn into code, and why:

## Modules and their pressures (Station 7)
| Module | The pressure behind it | What breaks if I merge it |
|---|---|---|
|  |  |  |
|  |  |  |
Box I argued about, and what I did:
Library I dropped, and what I would have written by hand:

## Pattern verdict (Station 8)
Verdict, and the force behind it (or the trigger, if ADOPT LATER):

## First task (Station 9)
Task:
Done when (the exact command):
Why this one is first:

## Still open (all stations)
The open question I most want to close next:
```

---

## Facilitator notes — running the room

**Group size and pairing.** Four to twelve. Pair trainees for Stations 0 through 6 and split them for 7 through 10 — thinking benefits from a partner, documents need a single author. Rotate pairs once, after Station 3, so nobody spends the whole session with the fastest person in the room.

**Pacing a room where everyone is mid-conversation.** This is the new hard part: a conversational station does not end for twelve people at the same minute. Do not call "pencils down" — a trainee cut off at a question mark loses the turn they were about to take. Instead:

- Call the station's start, then its **last ten minutes**, not its last five. Ten minutes is one more exchange plus the write-up.
- At the ten-minute call, say the sentence out loud: *"if you are not going to finish the conversation, ask it to write up what you have."* That is the legitimate ending, not a forfeit.
- Walk the room during the last five minutes and check for a written document, not for a finished conversation. A `QUESTIONS.md` with two settled items and four marked open is a pass.
- Let the fast finishers start Station 4 on a "need later" term rather than opening the next station early — it keeps the room together without anyone idling — and never make a trainee's station length public. "Still on Station 2" is not behind; it is one conversation.

**"Write up what we have" is how a station ends when time runs out.** Say this at the start of the day and again at the first ten-minute call. It produces the real document, covering what was settled, with everything else marked open — the gaps are visible, honest and the right size for homework. A trainee who used it after three turns has more to work from than one who spent twenty minutes trying to finish and wrote nothing down.

**The trainee who argues the mentor into answering.** It will happen, in every room, usually at Station 2 or Station 7, and it can burn fifteen minutes. The script is ninety seconds:

1. Ask them to read their last message back to you out loud.
2. Sort it in front of them. *"Tell me the answer to my task"* is declined, permanently, by every command, in every phrasing — restating it louder does not change the class of request. *"I don't understand this concept"* is the one request the plugin never declines.
3. If it is the second kind wearing the first kind's clothes — and it usually is — make them say the concept out loud, then send them to `/explain-subject` with it. They get taught immediately and the argument evaporates.
4. If it really is the answer they want, say the principle once — struggle is the curriculum, a solution handed over is a lesson removed — and ask which step of their plan the code would go into. Then walk away. Repeating it invites a second round.

Do not let this become a debate with an audience. If two people start it at once, say it once to the room and move on.

**The trainee who finishes early.** They have not finished; they have skipped a defence. Send them to defend their `ARCHITECTURE.md` to someone at Station 6 — answering a peer's "what breaks if you merge it?" is harder than answering yours, and it slows the other trainee down productively too. If the defence holds, let them start task two.

**The trainee who stalls.** Identify the station, not the mood. Stalls at 5 and 6 are almost always contract problems — send them back to the subject for five minutes with one question. Stalls at 7 are usually a trainee waiting for permission to delete a box; give it. Stalls at 10 are usually a "done when" that was never runnable; rewrite it with them. A trainee stalled *inside* a conversation, staring at a question, needs the ladder pointed out: "say 'I don't know' to it and see what comes back."

**Debrief (last 15 minutes, everyone answers one).**
- Which of your module boundaries was hardest to defend, and did it survive?
- What did you learn from a NOT NEEDED verdict?
- What is the "done when" of your next task — from memory?
- Which of your documents has the most honest "Open" section, and what is in it?
- Where did this method work against the provided, read-only part of the repo, and where did you fight it?

---

## Anti-patterns — how to waste this workshop

- Opening the plugin before reading the subject → every question lands against nothing.
- Asking a station to write its document instead of having its conversation → nine files, no spoken answers.
- Replying "yes" and "ok" → two in a row ends the station, and the document is as thin as the answers were.
- Hiding a concept gap inside a request for the answer → the one phrasing that gets declined, for the one need that is never refused.
- `/map-architecture` first, plan afterwards → boxes with no pressure behind them, and a plan bent to fit.
- Hunting for an ADOPT NOW verdict → a program shaped like a pattern instead of like the task.
- A "done when" you cannot run in a terminal → a task that is never finished, only abandoned.
- Empty "Open" sections everywhere → nothing was open because nothing was examined.
- Asking for the code → the one request the whole plugin exists to decline.

---

## Assessment

Judge the workshop on the nine documents and on what the trainee can say about them without reading — **not on the code**. Code volume in five hours is noise.

| Signal | Pass | Strong |
|---|---|---|
| Contract | Three lines, and each traced to the subject | Failure line is specific and was tested against an edge case |
| Provided vs. authored | Names every read-only component | Explains why each one is a constraint, not a choice |
| Module boundaries | Names the pressure behind every box, from memory | Merged, split or dropped a box during the conversation and can say why |
| Dependencies | Every library defended with the three questions | Something was dropped in favour of the standard library |
| Pattern verdict | States it and the reason | Comfortable with NOT NEEDED; names the trigger for ADOPT LATER |
| Task list | 8–15 tasks, each sized to one sitting | Every "done when" is a command they can type |
| First task | States its "done when" without looking | The check is green, linter and type checker clean |
| **Honest "Open" sections** | The documents mark what was not settled, and the trainee can name one gap per station | The open items are specific enough to be closed by a named next action |
| Ownership | The plan is in their own words, because they said it before it was written | They disagreed with the mentor at least once and can say why |

The "Open" row is the one to read first, because it is the hardest to fake. Nine documents with nothing open is the failure signature of this session: either every conversation was cut short and written up as complete, or the trainee answered agreeably for twenty minutes and examined nothing. Conversely, a trainee with four thin documents, honestly marked, who can name the pressure behind every module boundary, defend every dependency and state the "done when" of their first task without looking, has got what this session is for — even with very little code written. Re-run any checkpoint you doubt with the screen turned off; there is no mentor wording in these documents to recite, so what comes back is what the trainee has.

---

---

## Facilitator appendix — calibration material (mentor-eyes-only)

> **This appendix is for facilitators. It contains no spoilers and names no solution — it only tells you where the calibration material lives.**

There is a fully worked mentor-side example of this exact task in the plugin:

```
skills/architecture-mapping/references/worked-example-call-me-maybe.md
```

**It is mentor-eyes-only.** Read it before facilitating, to calibrate the depth and tone of a good architecture answer and to recognise a strong module table when a trainee produces one.

**Its module list and its library table must never be shown to a trainee working this task** — not on a slide, not on a shared screen, not read aloud, not paraphrased into a hint. The plugin's `architecture-mapping` skill carries this as a hard refusal: when a trainee's task matches a shipped worked example, the mapping conversation runs on the trainee's own statement of the task and the example's module list and library table are not replayed. This workshop inherits that rule without exception. If a trainee asks whether a reference design exists, the honest answer is yes, more than one, they decomposed the task differently, and all of them passed — then ask which pressures *their* version will face.

The same rule covers every reference file in the plugin's `skills/*/references/` directories — the reference C solutions in `skills/algorithm-review/references/c-code-examples.md` most sharply, but the dialogue-move catalogue in `skills/socratic-dialogue/references/` and the pattern, task-planning and issue-writing references too. A trainee handed the dialogue-move catalogue reads ahead to the questions coming next and answers the script instead of the problem. All of them open with a mentor-side marking and none is to be pasted to a trainee. Nothing else here is restricted — everything above this appendix is safe to hand out as-is.
