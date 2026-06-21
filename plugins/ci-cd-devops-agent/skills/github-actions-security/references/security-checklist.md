# GitHub Actions Security Checklist

A graded audit checklist. Findings map to severity: **Critical** (exploitable now), **High** (significant risk), **Medium** (hardening), **Low** (hygiene).

## Critical

- [ ] **No `pull_request_target` that checks out + runs fork code.** This exposes base-repo secrets and a write token to attacker-controlled code. If `pull_request_target` is used, it must not run untrusted code (no build, no install scripts, no fork checkout that executes).
- [ ] **No untrusted input in `run:` shell.** PR title/body/branch, issue text, commit messages, etc. must not be interpolated directly into `run:` (script injection). Pass through `env:` and reference the variable.
- [ ] **No secrets in logs or caches.** No credentials echoed; no tokens written to cached paths.

## High

- [ ] **Least-privilege `GITHUB_TOKEN`.** Top-level `permissions` default to read-only; jobs elevate only the scopes they need.
- [ ] **Third-party actions pinned to full-length SHA.** Mutable tags (`@v4`, `@main`) on third-party actions are a supply-chain risk.
- [ ] **OIDC instead of long-lived cloud secrets** wherever the provider supports it (`id-token: write` + provider login action).
- [ ] **Deploy jobs gated by `environment`** with required reviewers and/or branch restrictions.

## Medium

- [ ] **Secrets scoped narrowly** — environment-level for deploys, not repo-wide, not org-wide unless truly shared.
- [ ] **`secrets: inherit` used sparingly** in reusable-workflow calls; prefer explicit secret passing.
- [ ] **`timeout-minutes` on jobs** to bound runaway/abusive runs.
- [ ] **Forked PRs cannot reach secrets** in the normal `pull_request` flow (they can't by default — verify nothing re-introduces them).
- [ ] **Branch protection / rulesets** require the CI checks and mandate security workflows (CodeQL, dependency scanning) before merge.

## Low / hygiene

- [ ] Sensitive non-secret values masked with `::add-mask::`.
- [ ] Automatic package caching disabled on elevated-privilege jobs unless required.
- [ ] Scheduled OpenSSF Scorecard scan for overall posture.
- [ ] Dependabot/Renovate configured to bump pinned action SHAs.
- [ ] First-time-contributor workflow approval enabled at the repo/org level.

## How to report findings

For each finding give: severity, file:line, the risk in one sentence, and the concrete fix (ideally a diff). Group by severity, Critical first. Do not bury a Critical under a pile of Low hygiene notes.
