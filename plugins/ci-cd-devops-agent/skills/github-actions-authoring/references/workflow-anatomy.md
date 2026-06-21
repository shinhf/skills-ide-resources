# Workflow Anatomy

Reference for the structure of a GitHub Actions workflow file: triggers, filters, jobs, steps, runners, dependencies, and passing data.

## Top-level keys

```yaml
name: ci                 # display name; keep stable (affects required checks)
on: ...                  # events that trigger the workflow
permissions: ...         # GITHUB_TOKEN scopes (see github-actions-security)
concurrency: ...         # group + cancel-in-progress to dedupe runs
env: ...                 # workflow-wide environment variables
defaults: ...            # e.g. default shell or working-directory
jobs: ...                # the actual work
```

## Triggers (`on`)

Most-used events:

| Event | When | Notes |
|-------|------|-------|
| `push` | Commits pushed | Filter with `branches`, `tags`, `paths`. |
| `pull_request` | PR opened/updated | Runs with the **base** repo's read-only token for forks. Safe default. |
| `workflow_dispatch` | Manual UI/API run | Supports typed `inputs`. Use for reruns and manual deploys. |
| `schedule` | Cron | Use only for real maintenance (dep updates, scans, reports). |
| `workflow_call` | Called by another workflow | Makes the file a reusable workflow. |
| `pull_request_target` | PR, but with base context + secrets | **Dangerous** — see github-actions-security. Avoid for untrusted code. |

### Branch and path filters

```yaml
on:
  push:
    branches: [main, 'release/**']
    paths:
      - 'src/**'
      - 'package-lock.json'
    paths-ignore:
      - 'docs/**'
  pull_request:
    branches: [main]
```

Filters are the cheapest way to avoid running expensive jobs on irrelevant changes — apply them early on large/monorepo projects.

### Manual inputs

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: Target environment
        required: true
        type: choice
        options: [staging, production]
```

## Jobs

```yaml
jobs:
  build:
    runs-on: ubuntu-latest        # GitHub-hosted runner
    timeout-minutes: 15           # always bound runtime
    steps: ...
  deploy:
    needs: build                  # runs only after build succeeds
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps: ...
```

- `needs` creates the dependency DAG. Without it, jobs run in parallel.
- `if` conditions gate jobs/steps on context (ref, event, previous outcome).
- `timeout-minutes` prevents runaway billing.

## Steps

```yaml
steps:
  - uses: actions/checkout@v6      # an action
  - name: Install
    run: npm ci                    # shell command
  - name: Build
    run: npm run build
    working-directory: ./app
    env:
      NODE_ENV: production
```

Steps execute sequentially in separate processes. State does **not** carry over implicitly.

## Passing data between steps and jobs

### Step outputs (within a job)

```yaml
- id: meta
  run: echo "version=$(cat VERSION)" >> "$GITHUB_OUTPUT"
- run: echo "Building ${{ steps.meta.outputs.version }}"
```

### Job outputs (between jobs)

```yaml
jobs:
  setup:
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.meta.outputs.version }}
    steps:
      - id: meta
        run: echo "version=1.2.3" >> "$GITHUB_OUTPUT"
  build:
    needs: setup
    runs-on: ubuntu-latest
    steps:
      - run: echo "Version is ${{ needs.setup.outputs.version }}"
```

### Environment for later steps

```yaml
- run: echo "BUILD_ID=$(date +%s)" >> "$GITHUB_ENV"
- run: echo "Build $BUILD_ID"   # available because written to $GITHUB_ENV
```

### Files between jobs

Use artifacts (`actions/upload-artifact` / `actions/download-artifact`) — the filesystem is not shared across jobs.

## Runners

- **GitHub-hosted** (`ubuntu-latest`, `windows-latest`, `macos-latest`): fresh VM each run, low maintenance. The default choice.
- **Self-hosted** (`runs-on: [self-hosted, linux, x64]`): custom hardware / private network, but you own patching, isolation, and scaling. Use by exception — and never on public repos. See "Self-hosted runner security" in the **github-actions-security** skill's `references/trust-boundaries.md`.
