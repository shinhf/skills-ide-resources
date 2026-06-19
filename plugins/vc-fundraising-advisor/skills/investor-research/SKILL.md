---
name: Investor Research
description: This skill should be used when the user asks to "research this fund", "investor teardown", "research [investor] before my call", "what does this VC invest in", "prep me for a VC call", "tear down this fund", or needs a pre-call brief on a fund and the specific partner they are meeting before a first investor call.
version: 0.1.0
tools: WebSearch, WebFetch, Read
---

# Investor Research

Use this skill to produce a pre-call brief on a fund and the specific partner the founder is meeting, so they walk into a first call knowing the fund cold. It does in one pass what used to take an hour of digging.

## When To Use

Apply this skill before any first investor call, or whenever the founder asks to research a fund, run an investor teardown, or understand what a VC actually invests in. The goal is preparation, not list-building: one fund and one partner at a time, in depth.

## Inputs

- The fund name and, when known, the specific partner the founder is meeting.
- The founder's own context, read from `raise-brief.md` (stage, round size, sector, geography, traction, ideal investor, and rules). Read this first so the brief is scored against the actual raise, not a generic profile.

This skill uses the built-in `WebSearch` and `WebFetch` tools for live research. Do not rely on memory or on a fund's marketing pages alone. Verify against current, datable sources.

## The Three Columns That Matter

Everything in the brief reduces to three signals. The rest is noise.

- **Recency.** When did this PERSON, not the fund, last lead or co-lead a priced round? Track the partner, not the firm. If their last led round is over roughly 9 months ago, flag it and deprioritize: funds hibernate and GPs go quiet even when the website says otherwise.
- **Fit.** Do the fund's last ~10 deals match the founder's stage, geography, and thesis? Score against actual check history, not the landing page. The gap between "we invest in AI" on a website and what the fund actually funds is the gap between a 2% and an 18% reply rate. Read the deals, not the copy.
- **Reachability.** Is there a usable path to the partner: a LinkedIn DM route, a work email, and at least one warm-intro vector? Note which of these exist. A target without a reachability path is one you cannot act on.

## The Pre-Call Brief Output

Produce a brief with these sections. Keep each tight and evidence-backed; cite the source and date for any datable claim.

1. **Stated thesis vs actual check history.** What the fund says it does, set directly against what its recent deals show it actually does. Name the gap explicitly when one exists.
2. **Stage and check size they actually write.** The stage(s) and check range derived from real recent investments, not from the website's stated mandate.
3. **Most relevant recent investments.** The handful of recent deals closest to this founder's stage, sector, and geography, with dates.
4. **The partner you are meeting and what they have backed.** This specific person's recent led or co-led rounds, their apparent focus, and their personal recency signal.
5. **The two questions they will most likely lead with.** Given this company's stage, traction, and the partner's pattern, the two questions this partner is most likely to open with, each with a short note on how to be ready for it.

One brief, run the night before, and the founder is the most prepared person in the partner's calendar that week.

## Working Notes

- Track the person, not just the fund, for recency and for the "what they have backed" section.
- Treat fund websites as claims to verify, never as ground truth.
- When a signal cannot be confirmed from a current source, say so rather than inventing it.
- Keep the brief scannable: a founder reads it in the minutes before a call.
