# Thesis-Fit Scoring Rubric

The qualify layer scores every surviving investor 1 to 10 on thesis fit. Scoring is 1 to 10, not pass/fail, because the founder needs to triage outreach order, not just include or exclude.

The rubric lives in `thesis_match.md`. The agent reads `thesis.md` (the five inputs plus industry, stage, check-size range, geography, and differentiators), pulls each investor's last 10 investments, compares themes against the thesis, and writes both the score and a one-sentence reason on every row so any row in the output CSV can be spot-checked.

## What the scale means

- **A 9** means: this GP has *led* a round at your stage, in your sector, within the last 12 months, and the portfolio-company profile is close to yours. Direct, recent, on-thesis evidence.
- **A 3** means: they have invested in adjacent sectors but never at your stage. Tangential at best, no recent stage-matched evidence.

Higher scores require recency plus stage match plus sector match plus a comparable portfolio profile. Lower scores reflect missing or stale evidence, wrong stage, or only adjacent-sector activity.

## Tiers and what to do with each

| Score | Tier | Meaning | Action |
|-------|------|---------|--------|
| 9-10 | Tier 1 | Led a round at your stage and sector within ~12 months; portfolio profile close to yours | Personalized first-touch, pursue a warm-intro path, follow up weekly |
| 7-8 | Tier 2 | Strong stage + sector fit with recent activity, slightly less direct than Tier 1 | Personalized first-touch, no warm intro needed to start, biweekly follow up |
| 5-6 | Tier 3 | Plausible fit; right neighborhood on stage or sector but weaker recency or directness | Templated-but-relevant sequence, monthly follow up |
| 3-4 | Tier 4 | Adjacent-sector or off-stage; little recent stage-matched evidence | Newsletter / low-touch drip only; do not spend active outreach cycles |
| 1-2 | Drop | No meaningful fit, or no verifiable recent investor activity | Remove from the list |

## Reason requirement

Every scored row must carry a **one-sentence reason** for its score (written to `fit_reason` in the output CSV). The reason states the concrete evidence behind the number, for example which recent investment, what stage, and what sector match drove it. A score without a reason is not acceptable, because the reason is what lets the founder audit quality on any row without re-running the pipeline.
