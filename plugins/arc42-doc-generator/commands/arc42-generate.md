---
description: Generate or update specific arc42 documentation sections by analyzing the current codebase
argument-hint: "[section-numbers|all] [--source path] [--profile essential|lean|thorough]"
allowed-tools: Read, Write, Glob, Grep
---

Generate or update arc42 documentation sections by analyzing the current codebase.

Use the **arc42-documentation** skill for analysis methodology and section guidance. Reference `${CLAUDE_PLUGIN_ROOT}/skills/arc42-documentation/references/analysis-guide.md` for artifact-to-section mappings.

## Arguments

Parse `$ARGUMENTS` for:

- **Section numbers**: Space-separated (e.g., `3 5 7`), range (e.g., `1-5`), or `all`
- **`--source path`**: Optional source directory to analyze (default: project root)
- **`--profile essential|lean|thorough`**: Optional profile override

If no arguments provided, default to generating all sections for the current profile.

Check `.claude/arc42-doc-generator.local.md` for default settings before falling back to built-in defaults.

## Generation Process

### Step 1: Locate existing arc42 docs

Search for existing documentation:

1. Check `.claude/arc42-doc-generator.local.md` for `output_directory`
2. Look for `architecture/` directory
3. Search for numbered section files matching `**/0*-*.md` pattern
4. If no existing docs found, suggest running `/arc42-init` first

### Step 2: For each requested section

Read the analysis guide from `${CLAUDE_PLUGIN_ROOT}/skills/arc42-documentation/references/analysis-guide.md` and for each section:

**a. Read existing content**

Read the current section file if it exists. Identify content boundaries:

- `<!-- arc42-generated -->` ... `<!-- /arc42-generated -->` blocks: Safe to replace
- `<!-- arc42-manual -->` ... `<!-- /arc42-manual -->` blocks: Must preserve entirely
- Unmarked content: Preserve and append new findings

**b. Scan codebase artifacts**

Apply the artifact-to-section mappings from the analysis guide. Use Glob to find relevant files and Grep to extract information. For example:

- Section 3: Scan `docker-compose*.yml`, `.env.example`, `openapi.yaml` for external interfaces
- Section 5: Analyze `src/*/` directory structure, exported modules, import graphs
- Section 7: Read `Dockerfile`, K8s manifests, CI/CD configs
- Section 9: Read files from `docs/adr/`, `docs/decisions/`
- Section 11: Grep for `TODO`, `FIXME`, `HACK`, `XXX`, `@deprecated`
- Section 12: Extract class names from `models/`, `entities/`, `domain/` directories

**c. Generate updated content**

Produce new content based on findings. Follow the section templates from `${CLAUDE_PLUGIN_ROOT}/skills/arc42-documentation/references/section-templates.md`.

Check `auto_diagrams` setting (default: `true`). When enabled, generate Mermaid diagrams for:

- Section 3: Business and technical context diagrams
- Section 5: Building block decomposition diagrams
- Section 6: Sequence diagrams for runtime scenarios
- Section 7: Deployment infrastructure diagrams
- Section 10: Quality tree mindmap

Use diagram patterns from `${CLAUDE_PLUGIN_ROOT}/skills/arc42-documentation/references/diagram-templates.md`.

**d. Apply merge strategy**

- Content inside `<!-- arc42-generated -->` blocks: Replace with new generated content
- Content inside `<!-- arc42-manual -->` blocks: Preserve entirely, do not modify
- Content with no markers: Preserve existing text. Append new findings in a new `<!-- arc42-generated -->` block at the end
- If a section file does not exist: Create it from the template with all content in `<!-- arc42-generated -->` blocks

### Step 3: Cross-reference consistency

After generating all requested sections, verify consistency:

- Quality goals (Section 1.2) should match quality scenarios (Section 10.2)
- Building blocks (Section 5) should appear in deployment mapping (Section 7)
- Technology decisions (Section 4) should match actual dependency files
- External systems in context diagram (Section 3) should match docker-compose services
- Glossary terms (Section 12) should cover building block names from Section 5

Flag any inconsistencies found.

### Step 4: Update README index

Update the `README.md` index in the arc42 directory:

- Update status for regenerated sections (Draft -> Adequate if substantially filled)
- Update "Last Updated" dates
- Add any newly created section files

### Step 5: Report changes

Summarize what was done:

- Sections updated (with change summary per section)
- New content generated (approximate scope)
- Manual content preserved
- Cross-reference issues found
- Suggested manual review areas
