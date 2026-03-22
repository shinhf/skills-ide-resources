---
description: Initialize arc42 architecture documentation structure for a project, optionally pre-filling sections from codebase analysis
argument-hint: "[target-directory] [profile: essential|lean|thorough]"
allowed-tools: Read, Write, Glob, Grep
---

Initialize arc42 architecture documentation for this project.

Use the **arc42-documentation** skill for section templates, analysis methodology, and quality criteria. Reference `${CLAUDE_PLUGIN_ROOT}/skills/arc42-documentation/references/section-templates.md` for the full markdown templates for all 12 sections.

## Arguments

- `$1` = target directory (default: `architecture/`). Check `.claude/arc42-doc-generator.local.md` for `output_directory` override before using default.
- `$2` = documentation profile: `essential`, `lean`, or `thorough` (default: `lean`). Check `.claude/arc42-doc-generator.local.md` for `profile` override before using default.

## Initialization Process

### Step 1: Check for project settings

Read `.claude/arc42-doc-generator.local.md` if it exists. Parse YAML frontmatter for `output_directory`, `profile`, `sections_to_skip`, and `auto_diagrams`. Command arguments override settings file values.

### Step 2: Detect project characteristics

Scan the project root to identify:

- **Project identity**: Read `README.md`, package manifests (`package.json`, `*.csproj`, `pyproject.toml`, `Cargo.toml`, `pom.xml`) to extract name, description, and purpose.
- **Tech stack**: Scan dependency files to identify languages, frameworks, databases, and libraries.
- **Existing documentation**: Check for ADR directories (`docs/adr/`, `docs/decisions/`), API specs (`openapi.yaml`, `swagger.json`), and architecture docs.
- **Infrastructure**: Look for `Dockerfile`, `docker-compose.yml`, Kubernetes manifests, CI/CD configs.
- **External dependencies**: Parse environment variable files (`.env.example`) and docker-compose for external services.

### Step 3: Determine sections to create

Based on the selected profile:

- **Essential**: Sections 1, 3, 5, 9, 12 (plus README index)
- **Lean**: Essential + Sections 2, 4, 8, 11
- **Thorough**: All 12 sections

Remove any sections listed in `sections_to_skip` from the settings file.

### Step 4: Create directory and section files

Create the target directory. For each section in the profile:

1. Read the corresponding template from `${CLAUDE_PLUGIN_ROOT}/skills/arc42-documentation/references/section-templates.md`
2. Pre-fill with detected information:
   - Project name and description in Section 1
   - Tech stack and framework choices in Section 4
   - Initial business context diagram (Mermaid) from detected external dependencies in Section 3
   - Initial building block view (Mermaid) from top-level directory structure in Section 5
   - Import existing ADRs into Section 9
   - Seed glossary with detected domain terms in Section 12
   - Development conventions from linter configs in Section 2
   - Infrastructure topology from Docker/K8s files in Section 7
3. Mark all generated content with `<!-- arc42-generated -->` / `<!-- /arc42-generated -->` markers
4. Mark sections requiring manual input with `<!-- arc42-manual: [guidance] -->` placeholders

### Step 5: Create README.md index

Create an index file in the target directory linking all section files with:

- Section number and name (linked to file)
- Status indicator (Draft for pre-filled sections, Stub for template-only)
- Current date as "Last Updated"
- Profile indicator

Use the index template from `${CLAUDE_PLUGIN_ROOT}/skills/arc42-documentation/references/section-templates.md` (bottom of file).

### Step 6: Report summary

After initialization, report:

- Total sections created
- Which sections were pre-filled with detected content
- Which sections need manual input (list specific `<!-- arc42-manual -->` placeholders)
- The documentation profile used
- The target directory path
- Suggested next steps (e.g., "Run `/arc42-generate all` for deeper analysis" or "Edit Section 1 to refine quality goals")
