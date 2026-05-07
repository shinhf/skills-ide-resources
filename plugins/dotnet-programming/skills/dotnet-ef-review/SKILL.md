---
name: dotnet-ef-review
description: Focused EF Core review for query shape, tracking decisions, DbContext lifetime, N+1, deferred execution, and migrations. Use when reviewing data-access changes.
---

# EF Core review

Use this skill for any diff that touches `DbContext`, `IQueryable`, EF migrations, or repository code.

## Tracking

- Read endpoints: `.AsNoTracking()` should be present. Flag its absence as a finding.
- Same row appearing multiple times in the result graph and reference equality matters → `.AsNoTrackingWithIdentityResolution()`.
- Write paths: tracking on (default), `SaveChangesAsync` once per unit of work.

## Query shape

- **N+1**: every nav-property accessed in the result must be `.Include`'d or projected via `.Select`. Walk the diff and trace each `.Foo` → does it lazy-load?
- **Materialization size**: any `ToListAsync` on a query without a `Where` / `Take` is suspect. Ask: does this paginate? Is the collection bounded?
- **Projection**: prefer `.Select(x => new DtoType { ... })` for read endpoints over loading full entities.
- **Cartesian explosion**: multiple `.Include`s producing combinatorial rows → `.AsSplitQuery()`.

## Deferred execution

- Watch for `IQueryable<T>` returned from a method and re-enumerated by callers — the query re-executes each time.
- Watch for `var q = ...; if (q.Any()) foreach (var x in q)` — that's two round-trips.
- Materialize at a clear boundary (e.g. the handler) and pass `IReadOnlyList<T>` from there.

## DbContext lifetime

- Hosted/background services injecting `DbContext` directly is a finding — they live longer than the context's intended scope. Use `IServiceScopeFactory.CreateScope()` per unit of work.
- High-traffic apps: `AddDbContextPool<TContext>` over `AddDbContext<TContext>` for amortized init.
- Pool size tuned based on observed concurrency, not the 1024 default.

## Cancellation

- Every async EF call (`ToListAsync`, `FirstOrDefaultAsync`, `SaveChangesAsync`, etc.) accepts and propagates `CancellationToken`.

## Compiled queries

- `EF.CompileQuery` / `EF.CompileAsyncQuery` only when **benchmarks** show expression-tree compile cost matters. Preemptive use is a finding.

## SQL injection (CA2100)

- `FromSqlRaw` with concatenated user input → reject.
- `FromSqlInterpolated` is safe (parameterized); `FromSqlRaw` with `{0}` placeholders is also safe.
- String concatenation building any SQL fragment is a finding regardless of EF API used.

## Migrations

- One migration per logical change. Verify the generated SQL was reviewed.
- Never edit a migration already applied to a shared environment — additive only.
- Down-migrations: present and tested if the team practices rollbacks.

## Output

Findings sorted by severity. Each finding cites `file:line`, names the issue, explains the runtime cost or correctness risk, and proposes a fix (often a one-liner: `.AsNoTracking()`, `.Include(x => x.Foo)`, or projection to DTO).
