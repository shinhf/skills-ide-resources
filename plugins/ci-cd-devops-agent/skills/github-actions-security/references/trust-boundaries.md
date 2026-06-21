# Trust Boundaries and Supply-Chain Hardening

The core principle: **never combine elevated trust with attacker-controlled code or input.**

## The `pull_request` vs `pull_request_target` distinction

| Trigger | Runs in context of | Token | Secrets | Safe for fork code? |
|---------|--------------------|-------|---------|---------------------|
| `pull_request` | The PR head (fork code) | Read-only | Not available to forks | Yes — this is the safe default |
| `pull_request_target` | The **base** repo | Read-write capable | **Available** | No — dangerous if it runs fork code |

`pull_request_target` exists for tasks that need base-repo context (e.g. labeling a PR). It becomes a vulnerability the moment it checks out and **executes** the fork's code (build, `npm ci`, test scripts, arbitrary `run:`), because that code then runs with secrets and a write token.

### Safe pattern

- Untrusted validation (build/test of a fork PR) → `pull_request`, read-only, no secrets.
- Privileged work → trusted refs only, or post-merge (`push` to `main`), or a `workflow_run` that consumes artifacts without re-executing untrusted code.

If you must use `pull_request_target`, do not check out the PR head, or if you do, do not run any code from it.

## Script injection

Workflow expressions are substituted into the shell **before** execution. Any attacker-influenced field interpolated into `run:` can break out and run commands.

Hostile-by-default inputs: `github.event.pull_request.title`, `.body`, `head_ref`, `github.event.issue.title`, `.comment.body`, commit messages, branch/tag names.

```yaml
# UNSAFE
- run: |
    echo "Title: ${{ github.event.pull_request.title }}"

# SAFE — value enters as an env var, never as shell source text
- env:
    TITLE: ${{ github.event.pull_request.title }}
  run: |
    echo "Title: $TITLE"
```

The same applies to `actions/github-script` and any `with:` input forwarded into a shell.

## Supply-chain: pinning and review

- **Pin to full-length SHAs.** Tags and branches are mutable; a SHA is the only immutable reference. Apply to all third-party actions.
- **Review what you pin.** A pinned SHA still runs that action's code with your job's permissions — read it (or trust the publisher) before adopting.
- **Minimize transitive trust.** Fewer third-party actions = smaller attack surface. Prefer first-party (`actions/*`) and well-known publishers.
- **Automate bumps deliberately.** Dependabot/Renovate can update pinned SHAs with PRs so you review each change rather than silently tracking a moving tag.
- **Keep a version comment** next to each SHA so humans can read the intended version:

```yaml
# SHA + version below are illustrative — resolve the real SHA for the version you adopt
- uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11  # v4.1.1
```

## Self-hosted runner security

Self-hosted runners are a deliberate trust decision, not a default. On **public** repositories they are dangerous: a fork PR can run attacker code on your runner, and because self-hosted runners are not guaranteed to be reset between jobs, that code can persist (poison the toolcache, drop a backdoor) and compromise later runs — a real RCE/persistence risk. GitHub itself recommends **never** using self-hosted runners with public repositories for this reason.

If you must self-host:

- Restrict to **private/internal** repos, or gate fork-PR workflows so they cannot reach the runner.
- Prefer **ephemeral** runners (fresh, single-job, then destroyed) over persistent ones — GitHub explicitly recommends ephemeral for autoscaling and advises against persistent autoscaled runners. For Kubernetes, Actions Runner Controller (ARC) is the official pattern.
- Isolate runners on a dedicated network segment; assume a compromised job can reach anything the runner can.
- Keep the OS, runner agent, and toolchain patched — that burden is yours, not GitHub's.
- Scope which workflows/repos a runner group serves; do not share one runner pool across trust levels.

Use GitHub-hosted runners by default and move to self-hosted only for a concrete need (custom hardware, private-network access, a compliance boundary) — accepting that you then own patching, isolation, and incident response.

## Governance at scale

- **Repository rulesets** can mandate that security workflows (CodeQL, dependency review) pass before merge.
- **Org-level read-only token default** so new repos start least-privilege.
- **Restrict which actions can run** (allowlist first-party + verified creators) at the org/repo level.
- **OpenSSF Scorecard** on a schedule to track token permissions, pinning, and branch protection over time.
