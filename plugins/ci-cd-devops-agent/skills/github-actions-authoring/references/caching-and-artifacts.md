# Caching and Artifacts

Caches and artifacts are **not interchangeable**. Use the right one.

| | Cache | Artifact |
|--|-------|----------|
| Purpose | Reusable **inputs** (deps, build caches) | **Outputs** to keep or pass between jobs |
| Goal | Speed up future runs | Retain evidence / move data downstream |
| Lifetime | Evicted by GitHub (LRU, ~7d unused) | Explicit `retention-days` |
| Sensitive data | **Never** store credentials | Never store secrets |

## Caching

Key on a lockfile hash so the cache changes when dependencies change; `restore-keys` gives partial fallback.

```yaml
- uses: actions/cache@v5
  with:
    path: ~/.npm
    key: npm-${{ runner.os }}-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      npm-${{ runner.os }}-
```

`actions/cache` exposes `cache-hit` so you can skip expensive setup on an exact hit:

```yaml
- uses: actions/cache@v5
  id: cache
  with:
    path: ~/.cache/build
    key: build-${{ hashFiles('**/lockfile') }}
- if: steps.cache.outputs.cache-hit != 'true'
  run: ./expensive-setup.sh
```

### Prefer built-in setup caching

For common ecosystems, let the setup action manage the cache — simpler than hand-rolled steps:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: npm           # or yarn / pnpm
- uses: actions/setup-python@v5
  with:
    python-version: '3.12'
    cache: pip
```

Security note: for jobs with **elevated privileges**, consider disabling automatic package caching unless it is required — cache contents can be exposed to pull-request scenarios.

## Artifacts

Use for build outputs, coverage, logs, or test reports — especially when separating build and deploy jobs.

```yaml
- uses: actions/upload-artifact@v7
  with:
    name: build-${{ github.sha }}
    path: dist/
    retention-days: 7
    if-no-files-found: error
```

Download in a later job:

```yaml
- uses: actions/download-artifact@v5
  with:
    name: build-${{ github.sha }}
    path: dist/
```

### Pitfalls

- **Unique names in matrices.** Modern uploads are immutable; same-name uploads across matrix legs collide and fail. Include `${{ matrix.os }}` / `${{ matrix.node }}` in the name.
- **Short retention.** Long-lived artifacts cost storage on private repos. Default to 1–7 days unless there is a compliance reason.
- **Not a dependency cache.** Do not abuse artifacts to ferry dependencies between runs — that is what caches are for.
