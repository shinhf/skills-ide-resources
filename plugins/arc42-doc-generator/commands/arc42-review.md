---
description: Review existing arc42 documentation for completeness, quality, accuracy, and staleness against the current codebase
argument-hint: "[arc42-docs-path] [--profile essential|lean|thorough]"
allowed-tools: Read, Glob, Grep, AskUserQuestion
---

Review existing arc42 documentation and produce a quality assessment report.

Use the **arc42-documentation** skill for quality criteria and section expectations. Reference `${CLAUDE_PLUGIN_ROOT}/skills/arc42-documentation/references/quality-checklist.md` for evaluation criteria.

## Arguments

- `$1` = path to arc42 documentation directory (default: auto-detect `architecture/`)
- `--profile essential|lean|thorough` = profile to evaluate against (default: detect from existing structure)

Check `.claude/arc42-doc-generator.local.md` for default settings.

## Review Process

### Step 0: Clarify missing information

Before reviewing, confirm the required inputs are present and unambiguous. If any required input is missing, ambiguous, or contradictory -- for example, no docs path was given and several candidate documentation directories exist, or the evaluation profile cannot be detected from the existing structure -- use the **AskUserQuestion** tool to ask focused, structured questions (e.g. which directory to review, which profile to evaluate against) and wait for the answers before continuing. Do not guess a required input or silently apply a default when the choice materially changes the output; when you apply a documented default (auto-detect `architecture/`), state the assumption. Skip this step when all required information is already clear.

### Step 1: Locate and read documentation

1. Find the arc42 documentation directory:
   - Use `$1` if provided
   - Check `.claude/arc42-doc-generator.local.md` for `output_directory`
   - Look for `architecture/` directory
   - Search for numbered section files (`**/0*-*.md`)
2. If no documentation found, report that no arc42 docs exist and suggest running `/arc42-init`
3. Read all section files and the README index

### Step 2: Determine evaluation profile

- Use `--profile` argument if provided
- Otherwise detect from existing structure:
  - Only Sections 1, 3, 5, 9, 12 present -> Essential
  - 8-9 sections present -> Lean
  - All 12 sections present -> Thorough
- Report the detected/selected profile

### Step 3: Evaluate each section

Read the quality checklist from `${CLAUDE_PLUGIN_ROOT}/skills/arc42-documentation/references/quality-checklist.md` and evaluate each section on four dimensions:

**Completeness** (0-100%):

- Are required subsections present for the profile?
- Are tables filled (not just headers)?
- Are diagrams included where expected?
- Are required cross-references present?

**Quality** (Good / Fair / Poor):

- Good: Content is concrete, specific, and useful. Diagrams are accurate. Tables have meaningful data.
- Fair: Content is present but vague, generic, or uses buzzwords without specifics.
- Poor: Content is mostly placeholder, copy-pasted template text, or missing substance.

**Accuracy** (Current / Stale / Inaccurate):

Compare documented claims against the actual codebase:

- Section 4 tech stack vs actual dependency files
- Section 5 building blocks vs actual directory structure (look for new modules not in docs, or documented modules that no longer exist)
- Section 3 context diagram vs current docker-compose services and environment variables
- Section 2 constraints vs actual linter/CI configs
- Section 7 deployment vs current Dockerfile/K8s manifests
- Section 9 ADRs vs files in ADR directories

**Rating**: Assign per the scale in the quality checklist (Empty / Stub / Draft / Adequate / Thorough / Exemplary).

### Step 4: Cross-section consistency checks

Perform the cross-section checks from the quality checklist:

- Quality goals (1.2) <-> quality scenarios (10)
- Building blocks (5) <-> deployment mapping (7)
- Tech decisions (4) <-> actual dependencies
- Context diagram (3) <-> docker-compose services
- Decision traceability (4) <-> ADRs (9)
- Constraint accuracy (2) <-> actual configs
- Glossary coverage (12) <-> building block and domain terms (5, 8)

### Step 5: Produce review report

Generate a structured report following the template in the quality checklist reference:

```
## Arc42 Documentation Review Report

### Overall Score: X/100

### Profile Evaluated: [Essential | Lean | Thorough]

### Section Ratings

| # | Section | Completeness | Quality | Accuracy | Rating |
|---|---------|-------------|---------|----------|--------|
| 1 | Introduction and Goals | X% | Good/Fair/Poor | Current/Stale | Rating |
| ... | ... | ... | ... | ... | ... |

### Top Issues (ordered by priority)

1. [STALE] ...
2. [INCOMPLETE] ...
3. [INACCURATE] ...
4. [MISSING] ...

### Cross-Section Issues

1. ...

### Recommendations

1. ...
2. ...

### Quick Fix Commands

- Run `/arc42-generate X Y Z` to update stale sections
- Run `/arc42-impact branch` to check for recent changes
```

**Scoring weights**: Section 5 counts double, Sections 1 and 3 count 1.5x, all others count 1x.

Do NOT modify any documentation files. This command is read-only -- it only produces a report.
