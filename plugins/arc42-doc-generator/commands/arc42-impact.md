---
description: Analyze git changes (current commit, branch diff, or staged files) and identify which arc42 documentation sections are impacted and should be updated
argument-hint: "[commit|branch|staged] [--base main]"
allowed-tools: Read, Glob, Grep, Bash(git:*)
---

Analyze git changes and identify which arc42 documentation sections need updating.

Use the **arc42-documentation** skill for artifact-to-section mappings. Reference `${CLAUDE_PLUGIN_ROOT}/skills/arc42-documentation/references/analysis-guide.md` for file-type-to-section mapping rules.

## Arguments

Parse `$ARGUMENTS` for:

- **Change scope** (first positional argument, default: `commit`):
  - `commit` -- Analyze the most recent commit
  - `branch` -- Analyze all commits on the current branch vs base
  - `staged` -- Analyze currently staged changes
- **`--base <branch>`** -- Override the comparison base branch (default: `main`)

## Impact Analysis Process

### Step 1: Determine the change set

Based on the scope argument, run the appropriate git command:

- **`commit`**: `git diff HEAD~1..HEAD --name-status` and `git diff HEAD~1..HEAD --stat`
- **`branch`**: `git diff main...HEAD --name-status` and `git diff main...HEAD --stat` (replace `main` with `--base` value). Also run `git log main...HEAD --oneline` to get commit count.
- **`staged`**: `git diff --cached --name-status` and `git diff --cached --stat`

Capture the list of changed files with their change type (Added/Modified/Deleted/Renamed) and the change magnitude per file.

### Step 2: Map changed files to arc42 sections

Read the analysis guide from `${CLAUDE_PLUGIN_ROOT}/skills/arc42-documentation/references/analysis-guide.md`. For each changed file, determine which arc42 sections it maps to. Key mappings:

| Changed File Pattern | Impacted Section(s) |
|---------------------|---------------------|
| `Dockerfile*`, K8s manifests, Helm charts | 7 (Deployment View) |
| New top-level module directory | 5 (Building Block View), 12 (Glossary) |
| `openapi.yaml`, `swagger.json`, `*.proto`, `*.graphql` | 3 (Context and Scope), 6 (Runtime View) |
| `docker-compose.yml` (new service) | 3 (Context), 5 (Building Blocks), 7 (Deployment) |
| Auth/security files | 8 (Crosscutting Concepts - Security) |
| ADR files added/modified | 9 (Architecture Decisions) |
| `package.json`, `requirements.txt` (major version bumps) | 4 (Solution Strategy), 2 (Constraints) |
| Test config changes, new test types | 10 (Quality Requirements) |
| New `TODO`/`FIXME` comments | 11 (Risks and Technical Debt) |
| New domain model classes | 12 (Glossary), 8 (Domain Concepts) |
| CI/CD pipeline changes | 2 (Constraints), 7 (Deployment), 8 (Development Concepts) |
| `.env.example` changes (new external URLs) | 3 (Context and Scope) |
| Controller/handler files added | 6 (Runtime View) |
| README.md major changes | 1 (Introduction and Goals) |

For files that don't clearly map, read a sample of the diff content to determine relevance.

### Step 3: Classify by urgency

Group each impacted section into one of three urgency levels:

- **Critical** -- Structural changes that make existing docs incorrect: new modules, removed components, changed APIs, new external dependencies. Documentation is now factually wrong.
- **Recommended** -- Significant changes that existing docs should reflect: config changes, new deployment targets, updated tech decisions. Documentation is incomplete but not wrong.
- **Optional** -- Minor changes that could enrich docs but aren't essential: new tests, refactoring, minor dependency updates, internal restructuring.

### Step 4: Cross-reference with existing docs

If existing arc42 documentation is found (check `architecture/` or settings file):

1. Read the impacted section files
2. Provide specific guidance by comparing current content with changes. For example:
   - "Section 5 lists modules A, B, C but you added module D in this branch"
   - "Section 3 context diagram shows PostgreSQL but you added Redis in docker-compose.yml"
   - "Section 9 has 3 ADRs but you added docs/adr/004-payment-provider.md"

If no existing docs are found, note this and suggest running `/arc42-init` first.

### Step 5: Produce impact report

Generate a structured report:

```
## Arc42 Documentation Impact Report

**Change scope**: [commit/branch/staged] description (N commits, M files changed)

### Critical -- Documentation is now inaccurate

| Section | Impact | Changed Files | Action Needed |
|---------|--------|---------------|---------------|
| ... | ... | ... | ... |

### Recommended -- Documentation should be updated

| Section | Impact | Changed Files | Action Needed |
|---------|--------|---------------|---------------|
| ... | ... | ... | ... |

### Optional -- Consider updating

| Section | Impact | Changed Files | Action Needed |
|---------|--------|---------------|---------------|
| ... | ... | ... | ... |

### Quick Update Commands

- Run `/arc42-generate X Y Z` to auto-update critical sections
- Run `/arc42-generate A` to import new ADR
```

If no sections are impacted (e.g., only documentation or test changes), report that no arc42 updates are needed.
