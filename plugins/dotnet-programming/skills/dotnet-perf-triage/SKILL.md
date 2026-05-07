---
name: dotnet-perf-triage
description: Performance triage for .NET. Escalates from quick symptom diagnosis (dotnet-counters) through targeted tracing (dotnet-trace) to reproducible benchmarks (BenchmarkDotNet). Use before optimizing.
---

# .NET performance triage

**Measure before tuning.** This skill enforces a measurement-first escalation. Don't propose code changes based on intuition; propose what to measure first, then act on data.

## Escalation ladder

### Stage 1: Quick symptom — `dotnet-counters`

Use when the user reports "it's slow" or "CPU is high" without specifics. Live counters, no instrumentation needed.

```
dotnet-counters monitor --process-id <PID> System.Runtime Microsoft.AspNetCore.Hosting
```

Look for:

- `cpu-usage` sustained high → CPU-bound work, likely on the request path.
- `working-set` climbing → leak.
- `gc-heap-size` and `% Time in GC` high → allocation pressure.
- `threadpool-thread-count` climbing without bounded concurrency → **thread pool starvation** (sync-over-async smell).
- `Microsoft.AspNetCore.Hosting/requests-per-second` collapsing under load → blocked request thread.

### Stage 2: Targeted trace — `dotnet-trace`

When counters identify *what* but not *where*. Captures call stacks for a window.

```
dotnet-trace collect --process-id <PID> --providers Microsoft-DotNETCore-SampleProfiler
```

Open the resulting `.nettrace` in PerfView or Visual Studio. Focus on:

- Which method is on the hot stack?
- Are there unexpected `Wait`, `Sleep`, `Task.Result` frames?
- Is allocation concentrated in one type (large arrays / strings / async state machines)?

### Stage 3: Benchmark — `BenchmarkDotNet`

Once you have a candidate fix, prove it. Don't ship perf changes without numbers.

```csharp
[MemoryDiagnoser]
public class MyBench
{
    [Benchmark(Baseline = true)] public int Before() => /* ... */;
    [Benchmark]                  public int After()  => /* ... */;
}
```

Run in Release; compare allocations and time. Report ratio + std error.

## Common .NET perf issues to check first

- **Sync-over-async** in request paths — fix is "async all the way," not Task.Run.
- **`HttpClient` per request** — use `IHttpClientFactory`.
- **Multiple LINQ enumeration** (CA1851) — materialize once if used repeatedly.
- **EF Core N+1 / missing `.AsNoTracking()`** — see `dotnet-ef-review` skill.
- **String concatenation in hot loops** — `StringBuilder` or `string.Create`.
- **LOH allocations (≥ 85 KB)** — pool with `ArrayPool<T>`.
- **Boxing in logging** — `LoggerMessage` source generation (CA1848).
- **`HybridCache` instead of custom caching middleware** — stampede protection comes free.

## Output contract

```
Symptoms reported: <what user said>
What to measure first: <counter / trace / benchmark>
Hypothesized cause: <if any, with confidence level>
Decision rule: <what reading would confirm / refute>
Code changes: NONE until measurement confirms
```

Only after measurement should code changes be proposed.
