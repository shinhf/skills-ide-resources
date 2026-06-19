# Investor Pipeline Playbook

This is the runnable detail the generator writes into the scaffolded project. Adapt these templates faithfully; tune the bracketed placeholders to the founder's round.

The qualify layer (the part Claude runs) has five ordered jobs: **dedup → role-verify → recency filter → thesis-match → output**. One job per agent keeps the run debuggable.

## CLAUDE.md template

Write this to the project root. It is the analyst's standing instruction.

```markdown
# Investor List Builder — CLAUDE.md

You are an investor-research analyst. You have five jobs in strict order:

1. Dedup. Run agent "dedup" on the input CSVs in inputs/. Collapse GPs listed
   under multiple funds into one record with a fund-history array. Run this
   first, always — deduping after scoring wastes compute.
2. Role verify. Run agent "role_verify". Drop anyone whose current title is
   not a real investor role (Partner, Principal, Investor, Venture Partner,
   General Partner, Angel). Kill coaches, agents, consultants, and gurus who
   list "Investor" as a vanity title.
3. Recency filter. Run agent "recency". Drop any investor whose last
   priced-round investment was more than 18 months ago.
4. Thesis match. Run agent "thesis_match" against thesis.md. Score each
   investor on fit (1 to 10) and write a one-sentence reason.
5. Output. Write outputs/qualified_list.csv with columns:
   name, fund, title, linkedin, email, fit_score, fit_reason,
   last_investment_date, last_investment_company, last_investment_amount.

Do not skip steps. Do not invent data. If a field is missing, write "null".
When done, print a summary: rows in, rows out per layer.
```

## Per-agent prompt specs

Each agent file in `agents/` does exactly one job.

### dedup.md
- Input: all CSVs in `inputs/`.
- Job: collapse duplicate person-records into one canonical record, building a `fund_history` array for GPs that appear under multiple funds.
- Resolution logic (see GP-resolution section below).
- Output: a single deduplicated table passed to the next stage. Never score here.

### role_verify.md
- Input: deduplicated rows.
- Job: keep only rows whose *current* title is a real investor role (Partner, General Partner, Principal, Venture Partner, Investor, Angel).
- Drop coaches, agents, consultants, and "guru" profiles that carry "Investor" as a vanity title.
- Output: filtered rows with a `role_verified: true` flag.

### recency.md
- Input: role-verified rows.
- Job: drop any investor whose last priced-round investment is older than the recency threshold (default 18 months). Recency is measured on the *person's* last lead/co-lead, not the fund's last activity.
- Use the founder's recency/fund-close signal (for example SEC Form D for US funds) where available to confirm fresh dry powder.
- Output: rows that pass the recency gate, with `last_investment_date` populated.

### thesis_match.md
- Input: recency-passed rows + `thesis.md`.
- Job: pull each investor's last ~10 investments, compare themes against the thesis (stage, sector, geography, differentiators), and score fit 1 to 10 per the scoring rubric.
- Write the score to `fit_score` and a one-sentence justification to `fit_reason` on every row.
- Output: scored rows ready for the output writer. (See `references/scoring-rubric.md` for tiers and what a 9 vs a 3 means.)

### outreach_writer.md
- Input: scored rows (typically the top tiers).
- Job: write a short, specific, personalized first-touch message per investor, plus a fallback variant for when the first name cannot be resolved.
- Rules: 6 to 10 lines, one idea per message, proof early (a number, a logo, traction), one clear call to action, no unsupported claims.
- Output: per-investor copy attached to the row or written to a separate drafts file. This agent drafts only; it never sends.

## Dedup and GP-to-fund resolution

The single hardest part. One GP can appear several ways across sources:

- "Jane Doe, Partner at Fund A" (current, with fund)
- "Jane Doe, Investor" (no fund listed)
- "Jane Doe, Venture Partner at Fund B" (side role)
- "J. Doe" (signed on a public filing)

Resolution rules:

- Match on a combination of normalized name, email domain, profile URL, and last-3-investments overlap.
- If two records share a profile URL, they are the same person — always.
- If two records share 2+ recent investments and a normalized name, treat them as the same person.
- Collapse matches into one record and append every distinct fund affiliation to a `fund_history` array.

Run dedup first, before any scoring, so the expensive thesis-match step never runs on duplicates.

## Output CSV columns

`outputs/qualified_list.csv` columns:

`name, fund, title, linkedin, email, fit_score, fit_reason, last_investment_date, last_investment_company, last_investment_amount`

Missing fields are written as `null`. Rows are typically delivered ranked by `fit_score` descending so the founder can hand the top rows straight to outreach.
