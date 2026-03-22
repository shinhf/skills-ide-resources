---
name: Arc42 Documentation
description: This skill should be used when the user asks to "create arc42 documentation", "document architecture", "arc42 template", "initialize architecture docs", "update arc42", "architecture documentation template", "building block view", "deployment view", "runtime view", "crosscutting concepts", "architecture decisions", or needs guidance on creating, updating, or reviewing software architecture documentation following the arc42 format.
version: 0.1.0
---

# Arc42 Architecture Documentation

Generate, update, and review software architecture documentation following the arc42 template -- a pragmatic, proven framework for communicating and documenting software architectures.

## Arc42 Overview

Arc42 organizes architecture documentation into 12 sections, each serving a distinct purpose:

| # | Section | Purpose |
|---|---------|---------|
| 1 | Introduction and Goals | Requirements overview, quality goals, stakeholders |
| 2 | Architecture Constraints | Technical, organizational, and political constraints |
| 3 | Context and Scope | Business and technical context with external interfaces |
| 4 | Solution Strategy | Technology decisions, decomposition approach, quality strategies |
| 5 | Building Block View | Static decomposition of the system (most important section) |
| 6 | Runtime View | Key scenarios showing building blocks in action |
| 7 | Deployment View | Infrastructure, environments, and mapping to building blocks |
| 8 | Crosscutting Concepts | Domain models, security, patterns, operational concerns |
| 9 | Architecture Decisions | ADRs or decision log with rationale and consequences |
| 10 | Quality Requirements | Quality tree and concrete quality scenarios |
| 11 | Risks and Technical Debt | Known risks, debt items, and mitigation plans |
| 12 | Glossary | Domain and technical terms with definitions |

Arc42 is pragmatic, not bureaucratic. Not every section is mandatory. Adapt depth and breadth to the project.

### Documentation Profiles

Three profiles control which sections to generate:

- **Essential** -- Sections 1, 3, 5, 9, 12. Minimal viable architecture documentation for agile teams and small projects.
- **Lean** -- Essential plus Sections 2, 4, 8, 11. Suitable for most projects. Default profile.
- **Thorough** -- All 12 sections with deep subsections. For formal environments, audited systems, or complex domains.

## Section Guidance

### Sections that can be omitted

- **Section 2 (Constraints)**: Omit when no external constraints exist and the team sets its own standards.
- **Section 6 (Runtime View)**: Omit in Essential profile. When included, cover only architecturally significant scenarios -- not every API endpoint.
- **Section 7 (Deployment View)**: Omit in Essential profile. Required when deployment topology affects architectural decisions.
- **Section 10 (Quality Requirements)**: Omit in Essential and Lean profiles if quality goals in Section 1.2 are sufficient.

### Critical sections

- **Section 5 (Building Block View)** is the most important section -- it acts as the floor plan of the system. Always required, always generate it.
- **Section 3 (Context and Scope)** defines system boundaries. Always include a business context diagram at minimum.
- **Section 9 (Architecture Decisions)** preserves institutional knowledge. Detect and integrate existing ADR directories (`docs/adr/`, `docs/decisions/`, `doc/architecture/decisions/`).

### Section 8 (Crosscutting Concepts)

This section is broad and varied. Typical subcategories include:

- **Domain concepts** -- Entity models, API models, domain language
- **Security** -- Authentication, authorization, credential management
- **Architecture patterns** -- Layering, module structure, design patterns
- **Development concepts** -- Build/test/deploy pipelines, coding standards, testing strategy
- **Operational concepts** -- Configuration, scaling, logging, monitoring
- **User experience** -- UI patterns, accessibility (if applicable)

## Codebase Analysis Process

To extract architectural information from a codebase, follow this six-step process:

1. **Project discovery** -- Read `README.md`, package manifests (`package.json`, `*.csproj`, `pyproject.toml`, `Cargo.toml`), and project files to identify name, purpose, and tech stack.
2. **Structure analysis** -- Examine the top-level directory layout, module boundaries, entry points (`src/main/`, `src/lib/`, `src/app/`), and public API surfaces to identify building blocks.
3. **Dependency mapping** -- Scan for external services (database connections, API clients, message queues), third-party libraries, and environment variables referencing URLs.
4. **Configuration analysis** -- Review `.env.example`, config objects, feature flags, and CI/CD configs to understand deployment environments and constraints.
5. **Infrastructure analysis** -- Examine `Dockerfile`, `docker-compose.yml`, Kubernetes manifests, Terraform/Pulumi files, and CI/CD pipelines for deployment topology.
6. **Existing documentation scan** -- Check for ADR directories, OpenAPI/Swagger specs, inline JSDoc/docstrings, `CHANGELOG.md`, and architecture-related comments.

Map each discovered artifact to specific arc42 sections using the analysis guide reference.

## Output Format

Generate one markdown file per section, numbered with zero-padded prefixes:

```
architecture/
├── README.md                        # Index with section links and status
├── 01-introduction-and-goals.md
├── 02-architecture-constraints.md
├── 03-context-and-scope.md
├── ...
└── 12-glossary.md
```

Include Mermaid diagrams inline for:
- Business and technical context (Section 3)
- Building block decomposition (Section 5)
- Runtime sequence diagrams (Section 6)
- Deployment infrastructure (Section 7)
- Quality tree (Section 10)

Create a `README.md` index file linking all sections with completion status and last-updated dates.

## Update Strategy

When updating existing arc42 documentation:

1. Read existing content for every targeted section before making changes.
2. Identify content boundaries using HTML comment markers:
   - `<!-- arc42-generated -->` ... `<!-- /arc42-generated -->` -- Content safe to replace with updated generated content.
   - `<!-- arc42-manual -->` ... `<!-- /arc42-manual -->` -- Content written by humans. Preserve entirely. Never modify.
   - Unmarked content -- Preserve and append new findings in a clearly labeled generated block.
3. Merge new findings into existing content without overwriting manual edits.
4. Flag stale content that contradicts the current codebase (e.g., removed modules still listed in the building block view, changed tech stack).
5. Update the README.md index with new status and timestamps.

## Per-Project Settings

Check for `.claude/arc42-doc-generator.local.md` in the project root. If present, parse YAML frontmatter for:

- `output_directory` -- Target directory for arc42 files (default: `architecture/`)
- `profile` -- Documentation depth: `essential`, `lean`, or `thorough` (default: `lean`)
- `sections_to_skip` -- Array of section numbers to omit
- `auto_diagrams` -- Whether to generate Mermaid diagrams (default: `true`)

Command arguments override settings file values, which override defaults.

## Additional Resources

### Reference Files

For detailed templates, analysis methodology, and quality criteria, consult:

- **`references/section-templates.md`** -- Full markdown templates for all 12 arc42 sections with subsections, placeholder tables, and Mermaid diagram blocks
- **`references/analysis-guide.md`** -- Comprehensive mapping of 30+ project artifact types to specific arc42 sections and subsections
- **`references/quality-checklist.md`** -- Per-section completeness criteria across essential/lean/thorough profiles with rating scale
- **`references/diagram-templates.md`** -- Mermaid diagram patterns for context, building block, deployment, runtime, quality tree, and C4 views
