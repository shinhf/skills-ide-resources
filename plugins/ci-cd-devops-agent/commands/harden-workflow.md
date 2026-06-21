---
description: Apply concrete security and performance fixes to existing GitHub Actions workflows in place
argument-hint: [optional: path to a workflow file or .github/workflows]
allowed-tools: Read, Grep, Glob, Edit, Bash, WebFetch
---

Apply concrete hardening fixes to the repository's GitHub Actions workflows. Unlike `/review-workflow` (read-only), this command **edits files** — so confirm scope and show changes clearly.

Use the **github-actions-security** and **github-actions-authoring** skills to ground every change.

## Workflow

### 1. Locate and read

If `$ARGUMENTS` names a file/directory, target that; otherwise target all `*.yml`/`*.yaml` under `.github/workflows/`. Read each fully before editing. If none exist, suggest `/scaffold-workflow` and stop.

### 2. Identify fixable issues

From highest to lowest impact:

1. **Permissions** — add top-level `permissions: contents: read`; add minimal per-job elevation where a job needs write/`id-token`.
2. **SHA pinning** — replace mutable action tags with full 40-char commit SHAs, keeping a `# vX.Y.Z` comment. Resolve the SHA for each action's referenced version (use `gh api` via Bash, e.g. `gh api repos/<owner>/<repo>/git/ref/tags/<tag>`, or WebFetch the GitHub releases/refs). Never invent a SHA — if you cannot resolve one, flag it and leave the tag.
3. **Concurrency** — add a `concurrency` block with `cancel-in-progress: true` if missing.
4. **Caching** — enable built-in setup-action caching or add `actions/cache` keyed on the lockfile.
5. **Script-injection** — move untrusted input out of `run:` into `env:` indirection.
6. **Timeouts** — add `timeout-minutes` to jobs lacking it.
7. **Artifacts** — set short `retention-days`; ensure unique names in matrices.

Do **not** silently change deploy semantics, add OIDC, or introduce environments without asking — these need cloud-side setup. Surface them as recommendations instead.

### 3. Confirm before editing

List the concrete changes you intend to make per file (a short plan). For SHA pinning, list each action and the resolved SHA. Get a quick confirmation, then apply with `Edit`.

### 4. Apply and verify

Make the edits. After editing, re-read the changed regions to confirm validity and report a per-file diff summary. If `actionlint` is available, suggest the user run it (or run it via Bash if present) to validate.

### 5. Report

Summarize: files changed, fixes applied by category, SHAs pinned, and anything deferred (OIDC, environments, branch protection) with a short note on how to do it. Do not commit or push unless the user asks.
