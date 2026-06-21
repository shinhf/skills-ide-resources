---
name: github-actions-authoring
description: This skill should be used when the user asks to "write a GitHub Actions workflow", "create a CI workflow", "add a GitHub Actions job", "set up a build/test pipeline", "use a matrix build", "cache dependencies in Actions", "upload artifacts", "create a reusable workflow", "convert steps to a composite action", "add job outputs", "use needs/concurrency", "trigger on push/pull_request/workflow_dispatch/schedule", or otherwise needs guidance on authoring, structuring, or optimizing GitHub Actions workflow YAML. Use for authoring and performance/maintainability concerns; for permissions, secrets, OIDC, SHA pinning, or fork trust boundaries use the github-actions-security skill instead.
---

# GitHub Actions Authoring

Author GitHub Actions workflows as a small, explicit automation graph: a YAML file in `.github/workflows`, a few well-scoped triggers, a handful of single-purpose jobs, and only the caches, artifacts, and matrix dimensions each job actually needs. Default to one small CI workflow on GitHub-hosted runners triggered by `pull_request` and `push` to the default branch, then add complexity only when the repository justifies it.

## Mental model

Internalize the runtime model before writing YAML — most beginner bugs come from violating it:

- **Jobs run in parallel** unless connected with `needs`. Steps run **sequentially** inside a job.
- **Steps do not share process state.** A variable `export`ed in one step is gone in the next. Pass data with step `outputs`, `$GITHUB_OUTPUT`, and `$GITHUB_ENV`.
- **Jobs do not share a filesystem.** Files written in one job are invisible to another. Move data between jobs with artifacts (or a cache for reusable inputs).
- **Hosted runners start clean** every time — this is why dependency caching has a large payoff.

## Workflow anatomy

Top-level keys, in the order you will use most: `name`, `on`, optional `permissions` and `concurrency`, then `jobs`. Inside a job, `runs-on` picks a runner and `steps` are either `uses:` (an action) or `run:` (shell). See `references/workflow-anatomy.md` for the full breakdown of triggers, filters, `needs`, and outputs.

A solid first workflow stays minimal — runs on PRs and pushes to `main`, read-only permissions, concurrency to cancel stale runs:

```yaml
name: ci

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

concurrency:
  group: ci-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test
```

Learn these triggers first: `push`, `pull_request`, `workflow_dispatch` (manual), `schedule` (cron). Add branch and path filters early on large or monorepo projects so expensive jobs skip irrelevant changes.

> Action references above use major-version tags for readability. For production, pin to full-length commit SHAs — see the **github-actions-security** skill.

## Caching vs artifacts

These solve different problems and are **not** interchangeable:

- **Cache** — reusable *inputs* (dependencies, build caches) to speed future runs. Key on a lockfile hash; add `restore-keys` for partial fallback. Never store credentials in a cache.
- **Artifact** — *outputs* you need to keep or pass between jobs (build bundles, logs, coverage, test reports). Short retention controls cost. Matrix artifacts need unique names (uploads are immutable).

Prefer the built-in caching in setup actions (`setup-node`, `setup-python`) over hand-rolled cache steps where it exists. Full patterns and edge cases are in `references/caching-and-artifacts.md`.

## Matrix, reuse, and modularity

- **Matrix** — validate multiple OSes / runtime versions without duplicating YAML. It is a Cartesian product, so it grows fast — keep dimensions tied to real risk, use `fail-fast: false` when you want all results, and `include`/`exclude` to trim.
- **Reusable workflows** (`on: workflow_call`) — job-level reuse across repos; typed inputs/outputs/secrets; must live directly in `.github/workflows`.
- **Composite actions** — step-level reuse bundled into one action; use when you only need to share a few steps inside one job.

Rule of thumb: reusable workflows orchestrate **jobs**; composite actions bundle **steps**. Examples and templates in `references/matrix-and-reuse.md`.

## Naming and observability

Naming is functional, not cosmetic: required status checks become ambiguous if job names are duplicated across workflows, which can block merges. Use stable workflow names and unique, predictable job names (`test-linux-node22`, `build`, `package`).

Make runs observable from day one using the three layers GitHub provides: the **visualization graph** (DAG debugging), **run logs** (with debug mode when needed), and **job summaries** (`$GITHUB_STEP_SUMMARY`) for human-readable results like failed tests or deploy URLs. Add **annotations** for precise file/line errors. Details in `references/observability.md`.

## Authoring checklist

When producing or revising a workflow, verify:

- [ ] Lives in `.github/workflows/*.yml`, valid YAML.
- [ ] Triggers are scoped (`pull_request` + `push` to default branch; `workflow_dispatch`/`schedule` only when needed).
- [ ] Top-level `permissions` set (defer specifics to the security skill).
- [ ] `concurrency` with `cancel-in-progress: true` to kill superseded runs.
- [ ] Dependency caching with lockfile-based keys.
- [ ] Artifacts (not caches) for outputs, with short retention and unique matrix names.
- [ ] Job names unique and stable for required-check use.
- [ ] Matrix dimensions tied to actual risk, not theoretical combinations.
- [ ] Repeated logic centralized into reusable workflows or composite actions once stable.
- [ ] A job summary surfaces the key result.

## Local validation

Recommend this local stack so users stop trial-and-error pushing: `actionlint` for static validation (syntax, expressions, shell-injection detection), the official GitHub Actions VS Code extension for authoring, and `act` for fast local execution in Docker (treat `act` as a convenience emulator, not an exact replica of hosted runners).
