# ci-cd-devops-agent

An expert co-author and reviewer for **GitHub Actions CI/CD workflows**. It scaffolds hardened pipelines, audits existing workflows, and applies security, performance, and maintainability best practices — grounded in current GitHub guidance.

Scope is deliberately focused on **CI/CD automation with GitHub Actions**. No infrastructure-as-code, no cloud provisioning. The structure leaves room to add other CI/CD platforms later.

## Features

- **Knowledge skills** that auto-trigger when you ask about GitHub Actions, so Claude answers with grounded best practices instead of guesses.
- **Commands** to scaffold, review, and harden workflows.
- An **autonomous auditor agent** for deep, prioritized security/quality reviews.

## Components

### Skills

| Skill | Triggers on |
|-------|-------------|
| `github-actions-authoring` | Writing/structuring workflows: triggers, jobs, runners, matrix, caching vs artifacts, reusable workflows vs composite actions, observability. |
| `github-actions-security` | Securing workflows: least-privilege tokens, SHA pinning, OIDC, trust boundaries, secrets/cache hygiene. |

Each skill keeps a lean `SKILL.md` and pushes detail into `references/` (progressive disclosure).

### Commands

| Command | What it does |
|---------|--------------|
| `/scaffold-workflow [stack]` | Detects your stack and generates a hardened starter `ci.yml`. Read + Write only. |
| `/review-workflow [path]` | Read-only audit producing a graded findings report. |
| `/harden-workflow [path]` | Applies concrete fixes in place (permissions, SHA pinning, concurrency, caching, script-injection, timeouts). |

### Agent

| Agent | What it does |
|-------|--------------|
| `workflow-auditor` | Autonomous, read-only deep audit across all workflows; produces a severity-graded report with a remediation plan. |

## Installation

This plugin lives in the `skills-ide-resources` marketplace. Install via the marketplace, or test locally:

```bash
claude --plugin-dir ./plugins/ci-cd-devops-agent
```

## Usage examples

```
/scaffold-workflow node
/review-workflow .github/workflows/ci.yml
/harden-workflow
```

Or just ask: *"Is my pull_request_target workflow safe?"* / *"How do I cache pip dependencies?"* — the skills trigger automatically.

## Best practices it enforces

- Least-privilege `GITHUB_TOKEN` (read-only default, per-job elevation).
- Actions pinned to immutable full-length SHAs.
- OIDC over long-lived cloud secrets; environments for deploy approvals.
- No untrusted code/input in privileged contexts (script injection, `pull_request_target`).
- Concurrency to cancel stale runs; lockfile-keyed caching; bounded matrices; short artifact retention.
- Unique/stable job names; reusable workflows/composite actions over copy-paste; job summaries for observability.

## Safety

- `/scaffold-workflow` and `/review-workflow` never modify your code beyond (scaffold) writing a new workflow file.
- `/harden-workflow` edits files only after showing a plan, and never commits, pushes, or changes branch protection.
- The `workflow-auditor` agent is strictly read-only.
