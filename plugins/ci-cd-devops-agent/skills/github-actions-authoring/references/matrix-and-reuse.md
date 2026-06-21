# Matrix, Reusable Workflows, and Composite Actions

How to avoid duplicated YAML: matrices for fan-out, reusable workflows for job-level reuse, composite actions for step-level reuse.

## Matrix builds

Validate multiple OSes / runtime versions without copy-pasting jobs. The matrix is a **Cartesian product**, so size grows fast — keep dimensions tied to real risk.

```yaml
jobs:
  test:
    strategy:
      fail-fast: false        # let all legs finish for full signal
      matrix:
        os: [ubuntu-latest, windows-latest]
        node: [20, 22]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: npm ci
      - run: npm test
```

Trim and extend with `include` / `exclude`:

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node: [20, 22]
    exclude:
      - os: windows-latest
        node: 20
    include:
      - os: ubuntu-latest
        node: 22
        coverage: true        # extra var only on this leg
```

Guidance:
- Use `fail-fast: false` when you want every combination's result; default `true` cancels siblings on first failure (saves minutes).
- Avoid giant unbounded matrices — they multiply cost and queue time.

## Reusable workflows (job-level)

For sharing an entire job graph across repos/teams. Must live directly in `.github/workflows`, use `on: workflow_call`, and can declare typed inputs/outputs/secrets.

```yaml
# .github/workflows/reusable-node-ci.yml
name: reusable-node-ci
on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string
    secrets:
      NPM_TOKEN:
        required: false

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm ci
      - run: npm test
```

```yaml
# caller workflow
jobs:
  ci:
    uses: ./.github/workflows/reusable-node-ci.yml
    with:
      node-version: "22"
    secrets: inherit          # convenient, but keeps secret boundaries implicit
```

Note: secrets pass only to **directly** called workflows, explicitly or via `secrets: inherit`. Prefer explicit secret passing when you want boundaries to stay obvious.

## Composite actions (step-level)

When you only need to reuse a few steps inside one job, a composite action is the smaller abstraction.

```yaml
# .github/actions/setup-app/action.yml
name: setup-app
description: Checkout + install deps
runs:
  using: composite
  steps:
    - uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: npm
    - run: npm ci
      shell: bash
```

```yaml
# consuming workflow
steps:
  - uses: actions/checkout@v6
  - uses: ./.github/actions/setup-app
  - run: npm test
```

## Choosing

| Need | Use |
|------|-----|
| Reuse a multi-job pipeline across repos | Reusable workflow |
| Environment protection / approvals on reused stages | Reusable workflow |
| Bundle a few sequential steps inside one job | Composite action |
| Org-wide standardized starting point | Starter workflow in the org `.github` repo's `workflow-templates/` |
