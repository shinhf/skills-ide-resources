# Dialogue Moves

> **MENTOR-SIDE REFERENCE.** This catalogue is here so *you* can build one turn before sending
> it. Do not hand it to a trainee — a trainee who can read the next three moves answers the
> script instead of the problem, and the whole point of asking was to find out what they
> actually think.

Each move below: what it is, the exact words to use, when to use it, and the failure it prevents. Used turn by turn under the eleven rules in `SKILL.md`; the evidence for the claims is tagged in `pedagogy-sources.md`.

---

## The four-stage structure for one topic

Padesky's sequence for a single topic, in order, and **never skipped** — the fourth stage is where the learning lands, and a dialogue that stops after stage 1 is an interview ([Padesky, *Socratic Questioning: Changing Minds or Guiding Discovery?*](https://padesky.com/newpad/wp-content/uploads/2012/11/socquest.pdf)).

| Stage | What it is | Words to use | The failure it prevents |
|---|---|---|---|
| 1. Informational questions | Specific, concrete questions aimed at information the trainee can actually supply | "What does the subject say arrives on stdin?" / "Which of your files reads that file?" | Abstract openers that produce a shrug, because nothing concrete was asked for |
| 2. Empathic listening | Reflect the answer back, including the difficulty in it | "So the parsing works and the ordering is where it goes wrong." | The trainee restating themselves three times because nothing showed they were heard |
| 3. Summarising | Gather what has surfaced into two or three lines | "So far: the contract is settled, the boundary between reading and validating is not." | A long pleasant dialogue whose content nobody can name afterwards |
| 4. Analytical / synthesising | Apply what surfaced back to their **original** problem | "Given that, which of your two module boundaries survives?" | Insight that stays in the example and never reaches the task |

**Padesky's own condition.** A Socratic question must come from genuine curiosity — the mentor must not already have the answer it wants. A question asked to extract a known answer is stage 1 in form and interrogation in function, and trainees detect it immediately.

---

## OARS

Borrowed from motivational interviewing ([Understanding Motivational Interviewing](https://motivationalinterviewing.org/understanding-motivational-interviewing)).

| Move | Words to use | When |
|---|---|---|
| **O**pen question | "How did you decide to split it there?" | Opening any point; anywhere a yes/no was about to be asked |
| **A**ffirmation | "You checked the last iteration before the first — that is the harder habit." | After real effort, naming the **specific** effort |
| **R**eflective listening | "You're saying the allocation count has to be known before the loop starts." | Immediately after any substantive answer |
| **S**ummary | "Two things settled, one open." | Before a stage-4 question, and before the write-up |

**Honest transfer note.** Outside clinical settings the effect is small: g ≈ 0.18 in a school meta-analysis, with a prediction interval crossing zero ([meta-analysis](https://pubmed.ncbi.nlm.nih.gov/39645344/)). OARS is borrowed here as **technique for phrasing a turn**, not as an outcome claim.

**MI's own warning.** Never disguise advice as a question. "Don't you think it would be cleaner to split that?" is an instruction wearing a question mark; the trainee detects it, and it damages the collaboration more than the plain instruction would have. If it is advice, say it as advice — the affirmation is cheap and the disguise is not.

**"Good job" is not an affirmation.** Name what was done. An unnamed compliment tells the trainee the mentor is being nice, not that the move was right.

---

## The information-gap opener

One sentence of context, then a question that opens a **specific, nearly-closable** gap.

> "Your `ARCHITECTURE.md` has the validator downstream of the parser. What does the parser have to guarantee for that order to be safe?"

Curiosity collapses at both ends: too large a gap leaves no foothold, too small a gap leaves nothing to find out ([information-gap study](https://journalofcognition.org/articles/10.5334/joc.501)). So:

- Give the **priming dose** — the one sentence of context — *before* the question, never after it.
- Never ask about something the trainee has zero clues about. That is rung 1's job or rule 7's, not a question's.
- Never ask about something already certain. A question whose answer is already on screen reads as a test.

The failure it prevents: the opener that produces "I don't know" on turn one, and the opener that produces a bored correct answer.

---

## Responding to a wrong answer

In this order. **Never "no, actually…" as the first move.**

1. **Affirm the correct fragment, specifically.** "The count is right — the loop bound is where it goes wrong." An answer is almost never wholly wrong, and the fragment is the foothold for the repair.
2. **"How did you get that?"** The reasoning is what needs repairing; the answer is a symptom. This move frequently also reveals the answer was right and the phrasing was not.
3. **Present a case their answer fails on, and ask them to reconcile it.** "Run that on an empty string — what comes out?" A contradiction they discover is a correction; a contradiction they are told is a note.
4. **One rung down the ladder.**

**Then require them to state the corrected version.** "Say the rule back in one line." Novices frequently fail to process error feedback they only read, so an uncorrected wrong answer that was merely contradicted stays in place. The failure this prevents: a dialogue where every error was addressed and none was fixed.

---

## Responding to "I don't know"

In this order, because "I don't know" most often means "I wasn't tracking".

1. **Ask them to restate the question.** "What do you think I'm asking?" — this alone resolves a large share of them.
2. **Ask what they *do* know.** "What part of it are you sure about?"
3. **Name that not knowing is fine.** "Not knowing is the normal state here — this is not a grading exercise." Say it once, not every time.
4. **Descend the ladder** one rung.
5. **Two "I don't know"s in a row on the same point -> teach it.** Rule 7. An unrelated worked example, then hand back the *next* step.

"I don't know" does not skip step 1 of rule 3 either — ask what they would guess, or what they would rule out, before explaining.

The failure it prevents: the same question re-asked in different words, which reads to the trainee as being disbelieved.

---

## The size of a teaching turn

Teaching is never refused, and it is never a lecture. Rule 7 and rungs 4-5 of the ladder buy **one** device per turn.

- **One analogy or one toy example, then the question.** Never both in the same turn, and never a second example "to make it concrete". Around 150 words.
- **A concept that needs both is two turns with a check between:** analogy -> check by restatement ("say that back as if I'm the next person to touch this code") -> toy example -> the question. The check is what makes the split worth it; without it this is one long turn delivered in two messages.
- Good content is not a licence for six paragraphs. A trainee who receives five paragraphs and a question answers the last paragraph.

The failure it prevents: the teaching turn that was correctly scoped, correctly unrelated to the task, and still unread past its third paragraph.

---

## Uptake and revoicing

Take the trainee's own words into the next question, upgraded, and hand them back checkably.

| Trainee says | Do not say | Say |
|---|---|---|
| "It kind of does two things at once." | "So you need separation of concerns. Which concerns?" | "Two things at once — so two reasons that module would have to change. What's the second reason? Have I got that right?" |
| "I just loop until it breaks." | "You need a loop invariant." | "Until it breaks — so there's something that stays true right up to the break. What is it?" |
| "The tests pass so it's fine." | "Passing tests don't prove correctness." | "Passing tests are evidence — what would a test have to do to catch the case you're worried about?" |

The rule: **upgrade the vocabulary, keep the framing, and make the handback checkable.** The failure it prevents: the mentor's framing quietly replacing the trainee's, which leaves the trainee able to agree and unable to reproduce.

---

## Elaborative interrogation

"Why is that true?" / "Why did you pick that one?" — **once**, after a factual claim or a design choice.

- Use it when the trainee has a foothold. Without one it is rung 1 with extra pressure.
- Never three times in a row. A third consecutive "why" stops being a question and becomes a stance; the trainee starts defending rather than thinking.
- Rated **moderate** utility, not high, by Dunlosky et al. — worth a turn, not worth a strategy.

---

## Retrieval checks

Retrieval practice is one of the few **strong** effects in this whole file, so spend turns on it.

- "Without scrolling back — what did we settle about the input contract?"
- End each episode with a question about something covered ten turns earlier.
- Prefer a retrieval question over a re-explanation whenever both would fit.

The failure it prevents: a dialogue that built understanding turn by turn and left none of it retrievable an hour later.

---

## Coaching the trainee's own questions

- **Invite them.** "What would you want to ask about this?" — once per episode, ideally after a stage-3 summary.
- **Reward the sharpening, not the asking.** "That started as 'is this right' and ended as 'does the validator see the raw bytes' — the second one is answerable."

Question **quality** correlates with achievement; question **frequency** does not ([Graesser & Person](https://gwern.net/doc/psychology/spaced-repetition/1994-graesser.pdf)). So never praise a trainee for asking a lot, and never count their questions as engagement.

---

## Autonomy support

Every constraint gets a rationale, including the constraint of being asked rather than told.

- **Rationale for the method:** "I'm asking rather than telling because the boundary you pick yourself is the one you'll be able to defend at evaluation."
- **Rationale for a refusal:** one sentence, once — see `## The refusal` in `SKILL.md`.
- **Offer a choice of path:** "Start from the edge cases or from the invariant — either works. Which?"
- **"You could", never "you must":** "You could settle the contract first" beats "you must settle the contract first" at no cost in clarity.
- **Acknowledge frustration explicitly when it appears:** "This is the third pass at the same boundary and that's tiring — worth naming." Then keep going, or teach it. Ignoring stated frustration is the move that ends dialogues ([autonomy support](https://www.sciencedirect.com/science/article/abs/pii/S0361476X23000899)).

---

## Failure modes

| Failure | What it looks like | Guardrail |
|---|---|---|
| Guess-what-I'm-thinking | A question with one acceptable phrasing, re-asked until it arrives | Rule 5 — name two acceptable answers before asking, or label it a check question |
| Pseudo-Socratic advice-as-question | "Don't you think you should split that?" | If it is advice, say it as advice; MI's own warning |
| The leading yes-chain | Four yes-questions cornering the trainee into the mentor's conclusion | State the conclusion as a claim and invite disagreement |
| The converging chain | Three questions, each with one acceptable answer, each building on the last, ending in a design the mentor arrived with — every link passing rule 5 | Rule 11 — stop at the third, say the answer is being steered, hand the choice of direction back |
| Crediting a led answer | "You got there unaided", after the mentor supplied the path | Rule 4 — say who supplied it, in the turn and in the write-up |
| The five-paragraph teaching turn | An analogy *and* a worked toy *and* the next question in one message | Rule 7 — one device per turn, ~150 words; split across two turns with a restatement check |
| Notes written for the mentor | `.coding-mentor/<command-name>.md` holding the next question's expected answers or a private read of the trainee | The notes file holds the trainee's side only — it sits in their project and they can open it |
| Overload | Three open questions in rapid succession, or one paragraph with a question inside it | One question per turn; the trainee answers whatever is nearest the question mark |
| The mentor answering itself | Question, then "probably because…" in the same turn | The turn ends at the question mark |
| Interrogation that exposes ignorance | A question with no rung below it the mentor will descend to | Every question needs its next rung ready before it is sent |
| Withholding from someone with no schema | Rung 1 repeated at a trainee who has never seen the concept | Rule 7 — two failures, then teach; expertise reversal cuts both ways |
| The pleasant unsummarisable dialogue | Twelve warm turns, no statable conclusion | Rule 10 — the trainee states the summary before anything is written |
