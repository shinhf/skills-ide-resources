---
name: github-actions-security
description: This skill should be used when the user asks to "secure a GitHub Actions workflow", "harden a workflow", "set GITHUB_TOKEN permissions", "least privilege Actions", "pin actions to a SHA", "set up OIDC for AWS/Azure/GCP in Actions", "manage Actions secrets", "use environments for deployment approval", "is pull_request_target safe", "prevent script injection in workflows", "audit workflow security", or otherwise needs guidance on the security and trust model of GitHub Actions. Use this for permissions, secrets, OIDC, SHA pinning, fork/PR trust boundaries, and supply-chain concerns; for general authoring, caching, matrix, or reusable-workflow structure use the github-actions-authoring skill instead.
---

# GitHub Actions Security

Treat every workflow as code that runs with access to your repository and potentially your cloud. Security in Actions is mostly explicit trust design: minimal token permissions, immutable action pins, federated identity instead of stored secrets, and a hard line between trusted workflow source and attacker-controlled input.

Apply these controls in roughly this priority order.

## 1. Least-privilege `GITHUB_TOKEN`

The `GITHUB_TOKEN` is auto-provisioned per run. Older orgs may default to broad read-write. Set a **read-only default at the workflow level** and elevate only the jobs that genuinely need more.

```yaml
permissions:
  contents: read            # workflow-wide default

jobs:
  release:
    permissions:
      contents: write       # elevate only this job
      pull-requests: write
    runs-on: ubuntu-latest
    steps: ...
```

Grant the narrowest scopes that work (`contents: read`, `pull-requests: write`, `id-token: write` for OIDC, etc.). Never leave the default broad just to make a job "work" — find the specific scope.

## 2. Pin actions to immutable SHAs

Version tags like `@v4` are **mutable** — a compromised or retagged action becomes a supply-chain attack. A full-length commit SHA is the only immutable reference.

```yaml
# Mutable (convenient, riskier)
- uses: actions/checkout@v6

# Immutable (production)
- uses: actions/checkout@<full-40-char-sha>   # v6.0.0
```

Pin **all** third-party actions; treat them as part of your software supply chain. Keep the version in a trailing comment so updates stay legible, and use a tool (Dependabot/Renovate) to bump SHAs deliberately. Details and tradeoffs in `references/trust-boundaries.md`.

## 3. Prefer OIDC over long-lived cloud secrets

For cloud auth, exchange a short-lived OIDC token for cloud access instead of storing static keys as secrets. This removes long-lived credentials from the repo entirely.

```yaml
permissions:
  id-token: write           # required for OIDC
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: aws-actions/configure-aws-credentials@<sha>   # v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/gha-deploy
          aws-region: us-east-1
```

Setup for AWS/Azure/GCP, plus secrets-management guidance, is in `references/oidc-and-secrets.md`.

## 4. Use environments for deployments

Wrap deploy jobs in an `environment` so approvals, branch restrictions, protection rules, and environment-scoped secrets all sit on the same boundary.

```yaml
jobs:
  deploy-production:
    environment:
      name: production
      url: ${{ steps.deploy.outputs.url }}
    runs-on: ubuntu-latest
    steps: ...
```

Store secrets at the narrowest level that makes sense — repository, **environment** (for deploys), or organization.

## 5. Trust boundaries — untrusted code

The classic catastrophic mistake: `pull_request_target` (which runs with base-repo secrets and a write-capable token) checking out and executing a fork's PR code. That hands secrets to attackers.

Safe mental model:
- Validate fork/external PR code in **unprivileged** jobs (plain `pull_request`, read-only token, no secrets).
- Reserve privileged jobs for trusted workflow source, trusted refs, or post-merge/deployment stages.
- Never interpolate untrusted input (PR title, body, branch name) directly into a `run:` shell — that is script injection. Pass it through an `env:` var and reference the variable instead.

```yaml
# UNSAFE: attacker controls github.event.pull_request.title
- run: echo "${{ github.event.pull_request.title }}"

# SAFE: value goes through env, not the shell command text
- env:
    TITLE: ${{ github.event.pull_request.title }}
  run: echo "$TITLE"
```

Full guidance in `references/trust-boundaries.md`.

## 6. Cache and log hygiene

- Never store tokens or credentials in cache paths — cache contents can be exposed to pull-request scenarios.
- Mask sensitive non-secret values with `::add-mask::` before they can appear in logs.
- For elevated-privilege jobs, disable automatic package caching unless it is needed.

## Security review checklist

Run through `references/security-checklist.md` when auditing or hardening. The essentials:

- [ ] Top-level `permissions` default to read-only; elevation is per-job and minimal.
- [ ] All third-party actions pinned to full-length SHAs.
- [ ] Cloud auth uses OIDC; no long-lived cloud keys in secrets.
- [ ] Deploy jobs use `environment` with approvals/branch restrictions.
- [ ] No `pull_request_target` running untrusted fork code.
- [ ] No untrusted input interpolated into `run:` (use `env:` indirection).
- [ ] Secrets scoped to the narrowest level; none in caches or logs.
- [ ] Scheduled OpenSSF Scorecard / CodeQL / dependency scanning where appropriate.
