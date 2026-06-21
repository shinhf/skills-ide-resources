---
description: Audit existing GitHub Actions workflows against security, performance, and maintainability best practices and produce a findings report
argument-hint: [optional: path to a workflow file or .github/workflows]
allowed-tools: Read, Grep, Glob
---

Audit the repository's GitHub Actions workflows and produce a structured findings report. This command is **read-only** — it reports, it does not modify. To apply fixes, use `/harden-workflow`.

Use the **github-actions-security** skill (especially `references/security-checklist.md`) and the **github-actions-authoring** skill to ground every finding.

## Workflow

### 1. Locate workflows

If `$ARGUMENTS` names a file or directory, audit that. Otherwise audit every `*.yml` / `*.yaml` under `.github/workflows/` (including reusable workflows and composite actions in `.github/actions/`). If none exist, say so and suggest `/scaffold-workflow`.

### 2. Read everything before judging

Read each workflow fully. Note triggers, permissions, jobs, the actions used and how they are pinned, secrets/OIDC usage, caching/artifacts, matrix, concurrency, and any use of untrusted input.

### 3. Evaluate against three dimensions

**Security** (use the graded checklist — Critical / High / Medium / Low):
- `pull_request_target` running untrusted code; untrusted input interpolated into `run:`; secrets in logs/caches.
- Token permissions (least privilege; read-only default).
- Action SHA pinning vs mutable tags.
- OIDC vs long-lived cloud secrets; environments for deploys; secret scoping.

**Performance / cost:**
- Concurrency with `cancel-in-progress`.
- Dependency caching keyed on lockfiles.
- Path/branch filters on large repos.
- Matrix size proportionality.
- Artifact retention; `timeout-minutes`.

**Maintainability:**
- Unique/stable job names for required checks.
- Duplicated logic that should be a reusable workflow or composite action.
- Observability: job summaries, annotations.
- Trigger scoping.

### 4. Produce the report

Output a Markdown report:

1. **Summary** — files audited, counts by severity, overall posture (one line).
2. **Critical findings** — each: `file:line`, the risk in one sentence, and the fix (ideally a diff). Critical first; never bury a Critical under hygiene notes.
3. **High / Medium / Low findings** — grouped by severity, then by dimension.
4. **What's already good** — briefly acknowledge correct practices so the report is balanced.
5. **Recommended next steps** — prioritized; mention `/harden-workflow` to apply fixes.

Ground every finding in the specific file and line. Distinguish confirmed issues from "consider" suggestions. Do not modify any file.
