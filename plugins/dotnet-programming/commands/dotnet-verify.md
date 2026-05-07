---
description: Run the full 7-phase .NET verification pipeline locally.
---

Execute the 7-phase verification pipeline against the current repo. Stop and report on the first failing phase; don't proceed past a hard failure.

1. **Build** — `dotnet build -c Debug` (warnings-as-errors honored if configured).
2. **Analyzers** — confirm SDK analyzers ran; surface any `CA*` warnings introduced by the diff.
3. **Anti-pattern scan** — invoke the `dotnet-review` skill on changed files for sync-over-async, multiple enumeration, blanket exception handlers, etc.
4. **Tests** — `dotnet test -c Debug --no-build`. If the repo has integration test projects, run them too.
5. **Security** — `dotnet list package --vulnerable --include-transitive`; flag any hits.
6. **Format** — `dotnet format --verify-no-changes`. If it fails, run `dotnet format` and re-stage.
7. **Diff review** — show the user what changed and what's about to be committed.

Report each phase as PASS / FAIL with the relevant output, and a final summary.
