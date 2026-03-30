---
name: Slidedoc Expertise
description: This skill should be used when the user asks to "create a slidedoc", "review my slidedoc", "improve this slide", "convert to slidedoc", "glance test", "slidedoc accessibility", "data storytelling in slides", or needs guidance on Slidedoc writing, design, critique, and revision workflows.
version: 0.1.0
---

# Slidedoc Expertise

Use this skill to create, evaluate, and improve Slidedocs: visual documents designed to be read and referenced without a presenter.

## Core Definition

- Treat a Slidedoc as a reading artifact, not a projected presentation.
- Prefer self-sufficient pages with enough context to stand alone.
- Balance scanability with depth: clear hierarchy first, then supporting detail.
- Keep each page focused on one core idea.

## Activation Scenarios

Apply this skill for:

- New Slidedoc generation from a topic, brief, notes, research, or data.
- Review of existing Slidedoc pages against best-practice criteria.
- Improvement passes to tighten messaging, structure, and visual guidance.
- Conversion from cinematic decks, long-form docs, or raw notes.
- Accessibility and delivery checks before sharing.

Do not apply this skill to pure live-talk slide coaching unless the output is a read-first artifact.

## Required Quality Standards

### Message Quality

- Lead each page with a conclusion-style headline.
- Avoid topic labels when a decision or insight can be stated.
- Keep language concise and specific; remove filler.

### Page Construction

- Keep one primary idea per page.
- Target roughly 150-200 words for content-heavy pages.
- Use shorter pages for covers/dividers/impact pages when appropriate.
- Include explicit visual guidance, not only prose.

### Visual Structure

- Maintain hierarchy (headline > subhead > body > captions).
- Preserve whitespace for readability.
- Use consistent structure across sections.
- Keep visual and text elements mutually reinforcing.

### Review Scoring

Use a quick score out of 25:

- Contrast (1-5)
- Whitespace (1-5)
- Hierarchy (1-5)
- Unity (1-5)
- Flow (1-5)

Classify findings as Critical, Major, Minor, or Suggestion.

## Shared Slidedoc Page Contract

Use this schema for generated or revised markdown pages:

```markdown
## Page N: [Conclusion Headline]
Layout: Standard|Impact|Section
Objective: [One sentence objective]
Body: [Primary page text, target 150-200 words when content-heavy]
Visuals: [Chart/diagram/image guidance]
Accessibility: [Alt text guidance + reading order notes]
```

Use this contract in create, convert, improve, and apply workflows to preserve interoperability.

## Workflow: Create

1. Identify audience, decision context, and reading scenario.
2. Build document spine: cover, ToC, executive summary, core sections, recommendations, appendix.
3. Draft pages using the shared page contract.
4. Assign layout type:
   - Standard for balanced content
   - Impact for key moments
   - Section for transitions/dividers
5. Validate one-idea-per-page and headline quality.

## Workflow: Review

1. Run Glance Test first: assess if a reader can infer the page intent quickly.
2. Evaluate message clarity, hierarchy, density, and visual alignment.
3. Check anti-patterns (wall of text, mixed purpose, no navigation cues).
4. Score five dimensions (/25).
5. Report findings by severity and page.

## Workflow: Improve

1. Identify low-signal content to remove or compress.
2. Rewrite weak topic headlines into conclusion headlines.
3. Recommend layout changes per page.
4. Add missing interpretation for charts/data visuals.
5. Improve accessibility annotations and reading order hints.
6. Provide prioritized changes with expected impact.

## Workflow: Apply Approved Changes

1. Gather approved scope (`apply all`, `apply selected pages`, or `preview only`).
2. Edit only approved pages.
3. Keep metadata and section numbering stable unless explicitly requested.
4. Produce a revision log with page-level before/after summaries.
5. Re-run quick checks for one-idea-per-page, headline quality, and accessibility basics.

## Workflow: Convert to Slidedoc

Use layered ingestion paths:

1. Path A (preferred): ingest `.pptx` via available MCP/integration extraction.
2. Path B (fallback): ingest converted artifacts (markdown/text/images/notes).
3. Path C (manual fallback): request exports/screenshots when direct parse is unavailable.

Then:

1. Extract ideas and cluster into coherent sections.
2. Convert presenter-dependent text to reader-sufficient prose.
3. Rebuild structure using the shared page contract.
4. Add navigation elements (ToC, page numbering, section breaks).

## Accessibility Baseline

- Use unique page titles/headlines.
- Include alt text intent for meaningful visuals.
- Preserve reading order from headline to support content.
- Maintain sufficient contrast and avoid encoding meaning by color alone.

## Delivery Checks

- Validate links and navigation targets.
- Confirm file format and channel suitability (markdown, export, screenshots).
- Ensure the artifact is understandable without presenter narration.

## Reference Files

Use these reference files for deep guidance:

- `references/01-slidedoc-definition.md`
- `references/02-when-to-use-slidedocs.md`
- `references/03-five-design-principles.md`
- `references/04-glance-test.md`
- `references/05-writing-slidedocs.md`
- `references/06-designing-slidedocs.md`
- `references/07-review-checklist.md`
- `references/08-data-storytelling.md`
- `references/09-references-and-resources.md`
- `references/10-delivering-slidedocs.md`
- `references/11-accessibility.md`
- `references/12-anti-patterns.md`

Load specific files based on the active task instead of loading all files by default.
