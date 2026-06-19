---
name: Pre-Seed Deck Teardown
description: This skill should be used when the user asks to "review my deck", "tear down my pitch deck", "deck teardown", "score my pitch deck", or wants a blunt pre-seed/seed pitch-deck critique against an investor's lens.
version: 0.1.0
---

# Pre-Seed Deck Teardown

Use this skill to run a blunt, investor-grade teardown of a pre-seed (or early seed) pitch deck. The goal is to manufacture the kind of critique a pre-seed partner would give in the room, then score the deck and tell the founder exactly where it is merely confident rather than inevitable.

## Inputs

- Accepts a deck as an attached PDF or PPTX, or as pasted slide text.
- If a `raise-brief.md` file exists in the project root, read it for context (stage, round size, team background, prior signal) before running the teardown. If it is absent, proceed with the deck alone.
- The teardown is meant to be re-run on every revision. The value compounds: track which weak points got fixed, which did not, and watch the score move.

## The lens: how a pre-seed investor actually reads a deck

The most expensive mistake in fundraising is using a deck built for the wrong stage. At Series A the bet is on metrics: retention, growth rate, unit economics, a repeatable go-to-market motion. At pre-seed almost none of that exists yet, so a pre-seed investor is buying four things instead:

1. **The team** — do these specific founders have a real, earned reason to win this specific problem (domain expertise, distribution, technical edge, or scar tissue from having tried before).
2. **The insight** — what do they understand about the market or customer that isn't obvious, and is it actually true.
3. **The wedge** — is the first thing they're building narrow enough to actually ship in ~12 months, rather than a boil-the-ocean platform vision.
4. **Early signal** — anything, however small, suggesting the insight is correct in the real world (a waitlist, a pilot, a design partner, a founder who pre-paid, unprompted inbound).

A pre-seed deck should be tight, specific, and a little emotional. The reader is trying to manufacture **conviction** — the "this founder knows something I don't" feeling — and conviction comes from specific knowledge and a non-rehearsed answer to "why you, why now," not from decoration.

## The canonical ~10-slide anatomy (and where decks are usually thin)

Check the deck against this and flag anything missing or underdeveloped:

1. **Team** — founder-market fit spelled out explicitly and *early* (by slide 4 at the latest), not just titles and logos. Why these specific people.
2. **Problem** — specific and painful, illustrated with one real, concrete example rather than a category description.
3. **The insight** — the non-obvious thing the founders believe that, if true, makes this big.
4. **Why now** — what changed recently that makes this newly possible or newly urgent.
5. **Solution / wedge** — as simple as it can be stated, and narrow enough to ship soon; a real screenshot or prototype beats a feature list.
6. **Market** — bottoms-up sizing logic (realistic price × realistic customer count) shown *alongside* any top-down number, never a TAM/SAM/SOM pyramid standing on its own.
7. **Early signal** — whatever exists, even if thin; absence of this slide is itself worth flagging.
8. **Business model** — how money gets made eventually, even roughly.
9. **Competition** — a real, named landscape with honest differentiation; "no competitors" is a red flag, not a strength.
10. **The ask** — round size mapped to what it buys: the milestones the next 18–24 months of runway will hit, and who's already committed.

## The show-don't-tell test

This is usually the single biggest upgrade a deck needs — not more slides, more evidence. Every claim should carry its proof in the body, not a footnote. As you read the deck, flag every instance of *telling* where *showing* is possible:

- "large market" → a specific data point from a primary source, not an analyst forecast.
- "strong team" → a named prior exit, a specific operator, a hire that signals judgment.
- "founder-market fit" → the specific pain the founder lived, and anyone already paying for the fix.
- "early traction" → the actual number, with a date on it.
- "investor interest" → named soft commits, not "conversations with top-tier funds."

Telling sounds confident. Showing sounds inevitable.

## The teardown output

When run against a deck, structure the response in exactly these six parts:

**1. Missing or thin slides** — list what's absent or underdeveloped against the ten elements above, in the deck's actual order.

**2. The weakest slide** — name one specific slide and explain precisely why it would lose a pre-seed investor: a vague claim with no backing, a market number with no logic, generic language that could apply to any startup, a team slide that doesn't answer "why these people."

**3. Red-flag audit** — check the deck against the list below and report every hit as an action item. At pre-seed the deadly ones are:
   - No clear wedge (reader can't restate what you do in one sentence).
   - Team slide buried past slide 4.
   - A TAM/SAM/SOM pyramid with a trillion-dollar claim.
   - "We have no competition."
   - An early-signal/traction claim with no dates.
   - An ask with no milestones attached.
   - A roadmap of more than six items or written in marketing language.
   - Design inconsistency (mixed fonts, mismatched charts) that signals a panicked Sunday-night assembly.
   - A closing slide that ends on "thank you" instead of a next step.

**4. The ten hardest questions** this *specific* deck will draw from a pre-seed partner, each with a tight, honest answer the founder could actually give in the room. Pull them from what's literally on the slides, not generic pitch questions.

**5. Data-room checklist** — what to have ready before diligence: cap table, incorporation docs, any signed LOIs or pilot agreements, a simple financial model and runway plan, IP assignment docs if relevant, a product walkthrough or demo link.

**6. Score** — run the scorecard below and give the number plus one verdict line.

## Pre-seed scorecard (0–100)

Calibrated for pre-seed — metrics-heavy categories that don't apply this early are deliberately left out. Most decks that eventually close score 75+ on a first honest pass; most that don't score under 60.

```
Clarity                              /25
  Wedge restatable in one sentence      /10
  Problem stated concretely             /5
  Ask specific, mapped to milestones    /5
  Next step on the closing slide        /5

Team & insight                       /25
  Founder-market fit shown, not stated  /10
  Team slide by slide 4                 /5
  Non-obvious insight, plausibly true   /10

Evidence                             /25
  Early signal present, with dates      /10
  Specific proof for each claim         /10
  Bottoms-up market logic shown         /5

Craft                                /25
  Right anatomy for pre-seed            /5
  Competition framed honestly           /5
  Consistent typography & color         /5
  Readable charts, no artifacts/errors  /10
```

Verdict thresholds:

- **Under 60:** rebuild.
- **60–75:** targeted edits to the weakest sections.
- **75+:** ship it and track response rates.

## Two stress tests to run before sending

- **The 90-second test.** Hand the deck to someone who doesn't know the company. Ninety seconds, then they write one paragraph on what it does, the market, the signal, and the ask. If the paragraph is wrong, slides 1–4 aren't clear enough.
- **The mute test.** Click through the deck on silent at natural reading pace. Any slide that needs narration to make sense gets rewritten or cut.

## Tone

Be blunt, not encouraging. Skip the "overall this is strong" framing. A founder gets more value from one honest flaw than from ten polite observations. Investors back the inevitable version, so the teardown's job is to find everywhere the deck is merely confident.

## Stage calibration

This skill is calibrated for **pre-seed specifically.** Most founders fail not on substance but on stage mismatch — building a Series A deck for a pre-seed round (faking traction that isn't there yet) or a pre-seed deck for a later round (no math to back the ask). Adjust the lens by stage:

- **Pre-seed (default):** weight team, insight, wedge, and any early signal. Metrics are not expected.
- **Seed:** weight early traction more heavily — pilots, LOIs, first revenue, retention signal.
- **Series A and beyond:** unit economics, cohort retention, and use-of-funds math carry most of the argument; shift the scorecard toward them.
