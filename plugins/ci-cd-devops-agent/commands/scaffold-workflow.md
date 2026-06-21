---
description: Detect the project's stack and generate a hardened starter GitHub Actions CI workflow
argument-hint: [optional: stack/language or path, e.g. "node", "python", "."]
allowed-tools: Read, Grep, Glob, Write
---

Generate a new, hardened GitHub Actions CI workflow for this repository. Use the **github-actions-authoring** and **github-actions-security** skills to ground every decision in best practices.

`$ARGUMENTS` may name a stack (e.g. `node`, `python`, `dotnet`, `go`) or a path. If empty, detect the stack automatically.

## Workflow

### 1. Detect the stack

Unless the user named one in `$ARGUMENTS`, inspect the repo to identify the language, package manager, and test command. Look for marker files:

- Node: `package.json`, `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml`
- Python: `pyproject.toml`, `requirements.txt`, `poetry.lock`
- .NET: `*.csproj`, `*.sln`
- Go: `go.mod`
- Rust: `Cargo.toml`
- Java: `pom.xml`, `build.gradle`

Read the relevant manifest to find the real build/test/lint scripts — do not assume. If you cannot determine a command, ask the user rather than guessing.

### 2. Confirm scope

Briefly state the detected stack, package manager, lockfile, and the commands you will run (install / lint / test / build). If anything is ambiguous (multiple stacks, monorepo, no lockfile), ask one focused question before writing.

### 3. Generate the workflow

Write `.github/workflows/ci.yml` applying these defaults:

- Triggers: `pull_request` and `push` to the default branch. Add `workflow_dispatch` for manual reruns.
- Top-level `permissions: contents: read` (least privilege).
- `concurrency` with `cancel-in-progress: true` keyed on workflow + ref.
- `timeout-minutes` on each job.
- Built-in dependency caching via the setup action (or `actions/cache` keyed on the lockfile hash).
- Unique, stable job names suitable for required status checks.
- A job summary (`$GITHUB_STEP_SUMMARY`) surfacing the test result.
- Action references with a SHA-pinning note: use major-version tags inline but add a comment block at the top instructing the user to pin to full SHAs for production, and offer to do the pinning.

Only add a matrix if the project clearly needs multiple OS/runtime versions — keep it minimal and risk-driven. Do not add deploy jobs, cloud auth, or environments unless the user explicitly asks.

### 4. Explain and offer next steps

After writing, summarize what the workflow does and why (tie back to the checklists). Then offer:
- Pinning all actions to full commit SHAs.
- Adding a matrix build.
- Running `/harden-workflow` for a full security pass.

Do not push, commit, or modify branch protection. Just create the file and report.
