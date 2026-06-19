# Engine Config Templates

These are the config files the founder fills in, plus the daily-draft engine steps. Adapt faithfully; tune the bracketed placeholders once.

The engine reads three config files before writing anything: `streams.md` (what to write about), `voice.md` (how to write), and `cadence.md` (when and how often, used by the founder's own posting step). The engine delivers drafts for review and never posts on its own.

## config/streams.md

```markdown
# Streams

Stream 1: [YOUR DOMAIN]            40-50% of daily drafts
Stream 2: [AUDIENCE-SHARED TOPIC]  20-30% of daily drafts
Stream 3: [PERSONAL INTEREST]      20-30% of daily drafts

Target volume: 6 to 9 drafts per day

## Topic pools (rotate; do not reuse the same angle twice in a week)

Stream 1 topic pool:
- [LIST 10 TO 15 TOPIC AREAS YOU WRITE ABOUT IN STREAM 1]

Stream 2 topic pool:
- [LIST 10 TO 15 TOPIC AREAS YOU WRITE ABOUT IN STREAM 2]

Stream 3 topic pool:
- [LIST 10 TO 15 TOPIC AREAS YOU WRITE ABOUT IN STREAM 3]
```

## config/voice.md

```markdown
# Voice

Writer: [YOUR NAME], [YOUR TITLE], [YOUR COMPANY]

Voice:
- [CORE PERSONALITY IN 1 SENTENCE]
- [TONE RULE 1]
- [TONE RULE 2]
- [TONE RULE 3]

Never use these words:
- [WORD 1, WORD 2, WORD 3, ...]

Format rules:
- Singles under 280 chars
- Threads 3 to 5 tweets, numbered 1/ 2/ 3/
- Max 1 emoji per tweet, zero if forced
- No hashtags unless organic

Example tweets that sound exactly like me:
[PASTE 5 TO 10 OF YOUR BEST PAST TWEETS]
```

Refresh the example tweets periodically (about every 30 days). Voice drifts; keep it tight. The more specific `voice.md` is, the better the drafts.

## config/cadence.md

These values govern the founder's own posting step (the gated poster they wire to their own X API access). The daily engine itself only drafts.

```markdown
max_posts_per_day: 6
max_posts_per_hour: 2
min_minutes_between_posts: 30
posting_window_start_utc: 08:00
posting_window_end_utc: 22:00
no_posts_on_days: Sunday

whitelist_auto_post: [Stream 1 single, Stream 3 hot take]
require_approval: [Stream 2 thread, any image post, any reply]
```

Whitelist conservatively. After reviewing every post for the first stretch, the founder will know which draft types come out reliably on-voice; those go on the whitelist, everything else still needs a tap. A kill-switch sentinel (for example a `kill-switch` file at the project root) must pause all posting instantly when present.

## CLAUDE.md daily-draft engine

Write this to the project root. It drives the daily run in ordered steps. It does not post.

```markdown
# X Content Engine — CLAUDE.md

You are a founder content operator. You have ordered jobs and you DO NOT post.

1. Read inputs. Read the scraped stream files in inputs/ (stream1_raw.json,
   stream2_raw.json, stream3_raw.json) and own_profile_raw.json. These are
   produced by the founder's own scrape tooling; do not fetch them yourself.

2. Extract patterns. Run agent "pattern_extractor" on each stream file. For
   each stream produce: top hook techniques, common tweet formats, tone and
   energy, engagement devices, thread open/close patterns, and what is getting
   the most engagement this week and why.

3. Dedup reference. Run agent "duplicate_filter" on own_profile_raw.json.
   Build a list of the founder's recent tweets with topic and angle tags.
   This list is the blocklist for step 4.
   - Same topic + same angle = duplicate, regenerate.
   - Same topic + different angle = allowed.
   - Same topic + same angle + different format = still a duplicate.

4. Draft. Run agent "draft_writer" using config/streams.md (ratios + topic
   pools), config/voice.md (voice rules), and the patterns from step 2.
   Generate drafts in the exact ratio defined in streams.md. Label each draft
   [Stream 1 / 2 / 3] and [Single / Thread / Quote bait / Reply bait / Hot
   take]. Never duplicate anything in the blocklist from step 3.

5. Image brief. Run agent "image_brief" on the drafts. For drafts that benefit
   from an image (stats, frameworks, quote cards), write the image prompt in
   the founder's brand style. Skip hot takes, replies, and threads.

6. Output. Write outputs/[YYYY-MM-DD]_drafts.md with:
   - A daily context block (what is trending in each stream today).
   - All drafts grouped by stream, with format labels and image status.
   - One-line reasoning per draft ("why this angle today").
   - Any flagged tweets from monitored accounts worth quote-tweeting.

Do not post. Do not skip steps. When done, print:
"Drafts ready. Review at outputs/[YYYY-MM-DD]_drafts.md"
```

The `draft_writer` agent is where the voice lives: it reads the streams config (what to write), the voice config (how to write), and the pattern output (what is working in the feed right now), then writes drafts that sound like the founder.

## Scheduler prompt

The founder drops this into their own scheduled task (run daily at their chosen time). Replace each bracketed placeholder once, then leave it. The scrape steps call the founder's own scrape tooling; the prompt never posts.

```
Every day at [TIME] [YOUR TIMEZONE], run this X content workflow.
DO NOT post. Deliver drafts for review.

1. SCRAPE each stream and your own profile using your own scrape tooling:
   - Stream 1 handles: [5 TO 8 HANDLES FOR STREAM 1]
   - Stream 2 handles: [5 TO 8 HANDLES FOR STREAM 2]
   - Stream 3 handles: [5 TO 8 HANDLES FOR STREAM 3]
   - Your own handle: [YOUR HANDLE]  (recent posts, dedup reference)
   Write the raw output to inputs/.

2. EXTRACT PATTERNS for each stream: top hook techniques, common formats,
   tone/energy, engagement devices, media use, thread open/close patterns,
   and what is getting the most engagement this week.

3. BUILD THE DEDUP BLOCKLIST from your own recent posts (topic + angle tags).

4. GENERATE DRAFTS per stream in the ratio from streams.md, applying the best
   patterns and the voice rules from voice.md, filtering against the blocklist.
   Vary formats within each stream.

5. IMAGE BRIEFS for drafts that benefit from an image (stats, frameworks,
   quote cards), in your brand style. Skip hot takes, replies, threads.

6. DELIVER (DO NOT POST). Write outputs/[YYYY-MM-DD]_drafts.md with a daily
   context block, drafts grouped by stream with format labels, one-line
   reasoning per draft, and any flagged tweets worth quote-tweeting.

The founder reviews and ships manually, or via a gated posting step that
respects cadence.md and a kill-switch. Nothing auto-posts here.
```
