# Observability

Use the three layers GitHub already provides instead of forcing people to dig through raw logs.

## 1. Visualization graph

The Actions UI renders the job DAG (built from `needs`). Use it to debug dependency ordering and see which job blocked downstream work. Keep job names unique and descriptive so the graph reads cleanly.

## 2. Logs and debug mode

Each step's stdout/stderr is captured. For deeper diagnosis, enable debug logging by setting repository/organization secrets (or re-running with debug logging):

- `ACTIONS_RUNNER_DEBUG: true` — runner diagnostics
- `ACTIONS_STEP_DEBUG: true` — step-level debug output

Mask sensitive values that could appear in logs:

```yaml
- run: echo "::add-mask::$TOKEN"
```

## 3. Job summaries (highest leverage)

Write human-readable Markdown to `$GITHUB_STEP_SUMMARY`. Surfaces results — failed tests, changed packages, deploy URLs, benchmark deltas — on the run page without log spelunking.

```yaml
- name: Summary
  run: |
    {
      echo "## Test results"
      echo ""
      echo "| Suite | Passed | Failed |"
      echo "|-------|--------|--------|"
      echo "| unit  | 128    | 0      |"
      echo ""
      echo "Deployed to: https://staging.example.com"
    } >> "$GITHUB_STEP_SUMMARY"
```

## 4. Annotations

For precise file/line errors that show inline in the PR and run UI:

```yaml
- run: echo "::error file=src/app.ts,line=42::Type error: expected string"
- run: echo "::warning file=src/util.ts,line=7::Deprecated API"
```

Many linters/test runners emit annotations automatically or via a GitHub Actions reporter — prefer those when available.

## Practical defaults

- Add a job summary to every meaningful pipeline (at minimum the test result and any deploy URL).
- Reserve debug logging for active investigation; it is verbose.
- Use annotations from tools, not hand-rolled echoes, wherever the tool supports it.
