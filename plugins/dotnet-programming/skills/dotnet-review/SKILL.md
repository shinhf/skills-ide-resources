---
name: dotnet-review
description: Rigorous senior-engineer code review for .NET changes covering async correctness, disposal, LINQ/EF query shape, logging, globalization, security, and test coverage. Use when reviewing C# diffs or full files.
---

# .NET code review

Use this skill when reviewing C# changes. Output severity-ranked findings with `file:line` citations and the *mechanism* (why it matters), not just the syntax fix.

## Review checklist

1. **Identify the project type** — ASP.NET Core API, WPF, library, worker, console. Some checks (ConfigureAwait, IAsyncEnumerable) only apply in specific contexts.
2. **Async correctness**
   - No `.Result`, `Task.Wait()`, `GetAwaiter().GetResult()` (sync-over-async → thread pool starvation).
   - No `Task.Run` to fake async over a sync API.
   - `CancellationToken` accepted and propagated through every async public method.
   - `ConfigureAwait(false)` only in **library** code; flag if added in ASP.NET Core app code.
3. **Disposal and ownership**
   - `using` / `await using` for every `IDisposable` / `IAsyncDisposable` you allocate.
   - `HttpClient` reused via `IHttpClientFactory`, not `new HttpClient()` per call.
   - Streams, timers, crypto objects, DB connections — everything has a clear owner.
4. **LINQ and deferred execution** (CA1851)
   - No multiple enumeration of `IEnumerable<T>` (especially with `Count`, `Any`, then `foreach`).
   - No accidental cross-method passing of `IQueryable` that re-executes the query.
5. **EF Core query shape**
   - Read paths use `.AsNoTracking()`.
   - No N+1 (every nav-property access is `.Include`'d or projected).
   - Large materializations questioned — does this need to be `ToList`?
   - Compiled queries justified by benchmarks, not preemptive optimization.
6. **Logging** (CA2254, CA1848)
   - Structured templates only. No `$"User {userId} did {action}"` interpolation.
   - `LoggerMessage` source-generated logging on hot paths.
   - No PII / secrets in log templates.
7. **Globalization** (CA1305, CA1309)
   - `IFormatProvider` specified for culture-sensitive `ToString` / `Format`.
   - `StringComparison.Ordinal` / `OrdinalIgnoreCase` for non-linguistic comparisons.
8. **Security** (see also `dotnet-security` skill)
   - SQL parameterized (CA2100); no string concat into queries.
   - `RandomNumberGenerator` for security-sensitive randomness (CA5394 = error).
   - No MD5 / SHA1 in security contexts (CA5351 = error).
   - Auth / authz boundaries explicit on every endpoint.
9. **Test coverage**
   - Unit tests for new isolated logic.
   - Integration tests for new infra seams.
   - Failure paths covered, not just happy path.

## Severity reference (the floor)

The review enforces this severity baseline. Code that violates these rules without a justified suppression is a finding:

| Severity | Rules |
|---|---|
| **Error** | CA5394 (insecure randomness), CA5351 (broken crypto) |
| **Warning** | CA2000 (Dispose), CA1851 (multiple enumeration), CA2254 (logging templates), CA1305 (IFormatProvider), CA1309 (ordinal StringComparison), CA2100 (SQL injection) |
| **Suggestion** | CA1848 (LoggerMessage), CA2007 (ConfigureAwait — libraries only), CA1501/1502/1505/1506 (maintainability metrics) |

## Output contract

```
Summary: <2-3 sentences>

Critical (security / correctness):
- file.cs:LINE — <issue>. Mechanism: <why>. Fix: <what>.

High:
- ...

Medium:
- ...

Low:
- ...

Missing tests:
- <test class>: <behavior>

Strong patterns observed:
- <1-2 things the developer got right>
```

Do not invent findings to fill a quota. If a category has nothing, say "none."
