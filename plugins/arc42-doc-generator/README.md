# Arc42 Doc Generator

A Claude Code plugin that creates, updates, and reviews software architecture documentation following the [arc42 template](https://arc42.org) format. It analyzes codebases to generate arc42 documentation and maintains it as the project evolves.

## Features

- **Structured documentation** following the arc42 12-section template
- **Three documentation profiles**: Essential (5 sections), Lean (9 sections), Thorough (all 12)
- **Smart codebase analysis** mapping 30+ artifact types to arc42 sections
- **Mermaid diagrams** for context, building blocks, deployment, and runtime views
- **Merge-not-overwrite updates** preserving manually-written content
- **Git-aware impact analysis** identifying which docs need updating after code changes
- **Quality review** with completeness, accuracy, and staleness checks

## Components

### Skill: `arc42-documentation`

Core arc42 knowledge that activates when discussing architecture documentation. Includes reference files for section templates, codebase analysis mappings, quality checklists, and Mermaid diagram patterns.

### Commands

| Command | Description |
|---------|-------------|
| `/arc42-init [dir] [profile]` | Initialize arc42 doc structure with smart pre-filling |
| `/arc42-generate [sections\|all]` | Generate or update specific arc42 sections |
| `/arc42-review [path]` | Review documentation completeness and accuracy |
| `/arc42-impact [commit\|branch\|staged]` | Analyze git changes and identify impacted sections |

### Agent: `arc42-documenter`

Autonomous agent triggered by natural language requests like "Create arc42 documentation for this project" or "What's missing from our architecture docs?"

## Usage

```bash
# Initialize arc42 documentation (lean profile, architecture/ directory)
/arc42-init

# Initialize with thorough profile in custom directory
/arc42-init docs/architecture thorough

# Generate specific sections
/arc42-generate 3 5 7

# Generate all sections
/arc42-generate all

# Review existing documentation
/arc42-review

# Check which docs need updating after a feature branch
/arc42-impact branch

# Or ask naturally
"Create arc42 documentation for this project"
"Update the building block view, we added a new auth service"
"What's missing from our architecture docs?"
```

## Output Structure

Documentation is generated as separate markdown files in the target directory (default: `architecture/`):

```
architecture/
├── README.md                        # Index with section links + status
├── 01-introduction-and-goals.md
├── 02-architecture-constraints.md
├── 03-context-and-scope.md
├── 04-solution-strategy.md
├── 05-building-block-view.md
├── 06-runtime-view.md
├── 07-deployment-view.md
├── 08-crosscutting-concepts.md
├── 09-architecture-decisions.md
├── 10-quality-requirements.md
├── 11-risks-and-technical-debt.md
└── 12-glossary.md
```

## Per-Project Settings (Optional)

Create `.claude/arc42-doc-generator.local.md` in your project to set defaults:

```markdown
---
output_directory: architecture/
profile: lean
sections_to_skip: []
auto_diagrams: true
---

# Arc42 Documentation Settings

Project-specific arc42 configuration.
```

After creating or editing settings, restart Claude Code for changes to take effect.

Add to `.gitignore`:

```
.claude/*.local.md
```

## Installation

```bash
# Test locally
cc --plugin-dir /path/to/arc42-doc-generator
```

## Documentation Profiles

| Profile | Sections | Best For |
|---------|----------|----------|
| **Essential** | 1, 3, 5, 9, 12 | Agile teams, small projects |
| **Lean** | 1-5, 8, 9, 11, 12 | Most projects (default) |
| **Thorough** | All 12 | Formal environments, audited systems |

## Based On

- [arc42 template](https://arc42.org) by Dr. Gernot Starke and Dr. Peter Hruschka
- Patterns from [Traceability-FOSS](https://eclipse-tractusx.github.io/traceability-foss/docs/arc42/), [SecureCodeBox](https://www.securecodebox.io/docs/architecture/), and [Matrix G2X](https://gitlab.opencode.de/fitko/matrix-g2x/solution-architecture/)
