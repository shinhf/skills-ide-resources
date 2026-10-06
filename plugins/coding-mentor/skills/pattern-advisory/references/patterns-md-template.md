# PATTERNS.md Template

> **MENTOR-SIDE REFERENCE.** This is the shape of the document to emit, not a document to
> hand over. Giving a trainee the empty skeleton invites them to fill the candidate table
> with three patterns they like the sound of, which is the failure this skill exists to stop.

The literal skeleton to emit. Keep the section order and the table headings exactly as written, so every run produces a document the trainee already knows how to read.

Replace everything in `<angle brackets>`. Never delete a section — an empty forces table and an empty candidates table are themselves the verdict, and the trainee must see that the question was asked.

---

## Skeleton

````markdown
# Patterns — <module under review>

**Module:** <module name, as it appears in ARCHITECTURE.md>
**Responsibility:** <one sentence — what this module owes the rest of the program>
**Language:** <the settled stack>

> This is advice about **whether** a pattern belongs here, and which role each part would
> play if it did. It is not the pattern's implementation — the participants are yours to
> write. The default answer to "which pattern?" is "none", and it stays the default until
> a force is named.

## The forces present

| Force | Evidence in this task | Which constraint in ARCHITECTURE.md |
|---|---|---|
| <the pressure, in the trainee's own words> | <what is observably true today, not what may happen> | <the constraint row it traces to, or `none — unforced`> |

<When this table is empty, say so in one line and stop reading further: no force means no
pattern, and the rest of the document is a formality.>

## Candidates evaluated

| Pattern | What it would buy you | Verdict | Why |
|---|---|---|---|
| <pattern name> | <the one change it makes cheap> | <ADOPT NOW / ADOPT LATER (trigger) / NOT NEEDED / ALREADY PRESENT (unnamed) / BUILT INTO THE LANGUAGE / OVERENGINEERING> | <the deciding fact, one sentence> |

<At most three rows. Fewer is better. Most verdicts are negative.>

## The recommendation

<One paragraph. Frequently: no pattern. Name what the module should do instead — usually
"keep the function you already have" — and, if one candidate survived, name the role each
participant plays without writing any of them.>

## What the language gives you instead

- **<pattern that was refused>** — <the language feature that already does it>
- **<pattern that was refused>** — <the language feature that already does it>

## Sources

- [<what this source establishes>](<url>)
- [<what this source establishes>](<url>)

## Questions to answer before applying anything

1. <question>
2. <question>
3. <question>
````

---

## Rules for filling it in

- **The forces table comes first, and it may legitimately be empty.** An empty table is the strongest output this document produces. Never back-fill a force to justify a pattern that was already in mind.
- **The document is written after the conversation, not before it.** Emit it once a session-level stop condition from `socratic-dialogue` fires, or whenever the trainee asks for the write-up — never unrequested before then.
- **An empty section is emitted with an em dash, never dropped.** A section with nothing in it — apart from one this template explicitly says to omit — carries a single `—` where its content would go, because an empty section is itself a finding: the reader must see that the question was asked and came back empty.
- **"Evidence in this task" must be observable today.** `"the exporter already has two near-identical branches"` is evidence; `"we might add more formats"` is a wish, and belongs in a trigger, not in the evidence column.
- **Every candidate row traces to a force row.** A candidate with no force is not a row; it is a deleted line. If the table would have four rows, the shortlist was not done.
- **One verdict per candidate, from the fixed vocabulary only.** No hedges, no "maybe", no two verdicts in one cell. **ADOPT LATER** is invalid without a trigger, and the trigger must be an observable event, never a date and never "when it gets big".
- **"Why" is a deciding fact, not a sentiment.** `"the whole benefit is one dict of functions"` decides it; `"cleaner separation"` decides nothing and is rejected exactly as the architecture skill rejects it for module boundaries.
- **No code anywhere.** No class skeletons, no interfaces, no abstract base classes, no method signatures, no pseudocode, no `def`/`class`/`interface`/`func`. Not in table cells, not in the recommendation, not in the questions.
- **Naming participants is allowed; writing them is not.** `"the caller picks the behaviour, the module applies it"` is advice. Any line that could be pasted into an editor is the solution.
- **"What the language gives you instead" is mandatory whenever a candidate was refused as BUILT INTO THE LANGUAGE.** Refusing a pattern without naming its replacement leaves the trainee with a prohibition instead of a tool.
- **Every non-obvious claim carries a source.** Per-language claims about what a language absorbed are exactly the claims that go stale — cite them as markdown links and prefer primary documentation over blog posts.
- **The closing questions are Socratic** (per `mentor-guidance` §3): answerable by the trainee after thinking, and none of them answered anywhere else in the document. At least one should be capable of overturning the recommendation.
- **Cap the whole file at roughly one screen.** A long document arguing that no pattern is needed has made the opposite point.
