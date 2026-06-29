---
name: aspnetcore
description: ASP.NET Core 10 best practices — Minimal APIs, ProblemDetails, HybridCache, FluentValidation, options pattern, hosted services, and DI lifetimes. Use when building web APIs.
---

# ASP.NET Core 10 best practices

Use this skill when scaffolding or modifying ASP.NET Core APIs.

## Bootstrap shape

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();
builder.Services.AddHybridCache();
builder.Services.AddRateLimiter(/* ... */);
builder.Services.AddAuthentication(/* explicit scheme */);
builder.Services.AddAuthorization(opt => { /* policies */ });

var app = builder.Build();

app.UseExceptionHandler();
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

app.MapGroup("/api/widgets").MapWidgetEndpoints().RequireAuthorization();
app.Run();
```

## Endpoints

- **Minimal APIs with `IEndpointGroup`** for new code; controllers only if the repo already uses MVC.
- **Feature-first folders**: endpoint, request/response DTOs, validator, handler, and tests in one folder per feature.
- Every endpoint has explicit OpenAPI metadata: `.WithName`, `.WithSummary`, `.Produces<T>(200)`, `.ProducesProblem(400)`, `.ProducesProblem(404)`.
- Every endpoint accepts `CancellationToken` and propagates it to all async work.
- Default to `RequireAuthorization()` on every group; opt out per-endpoint with `.AllowAnonymous()` only when public is the deliberate choice.

## Errors

- **`ProblemDetails`** (`application/problem+json`) for all error responses.
- Global exception handling via `app.UseExceptionHandler()` plus `IExceptionHandler` implementations. Don't scatter try/catch across handlers.
- Never leak stack traces or internal type names in production responses.
- Distinguish expected errors (validation → 400) from unexpected (bug → 500 + alert).

## Validation

- **FluentValidation** validators registered in DI; validate at the endpoint boundary.
- Handlers assume input is already valid.

## Caching

- **`HybridCache`** over `IMemoryCache` / `IDistributedCache` directly — gives stampede protection and unified API across in-process and distributed.
- For HTTP-level caching, use `[OutputCache]` / `MapGet(...).CacheOutput(...)`.
- Response Compression middleware with Brotli/Gzip; antiforgery tokens deployed to mitigate CRIME/BREACH.

## Streaming

- `IAsyncEnumerable<T>` for large result sets — System.Text.Json streams them.
- For long-running work, push to a background service via `Channel<T>` or message broker; never block the request thread.

## Configuration & secrets

- Strongly-typed options via `IOptions<T>` / `IOptionsSnapshot<T>` (latter for hot-reload).
- Validate at startup with `ValidateDataAnnotations().ValidateOnStart()` — fail fast.
- Secrets: User Secrets in dev, Azure Key Vault / environment variables in prod. Never `appsettings.json`.

### Enum binding — missing keys

`ConfigurationBinder` uses the **C# declared constructor-parameter default**, not `default(T)`, when a key is absent. If no C# default exists it throws `InvalidOperationException`.

- Assigning `= 0` to a safe enum member is **not** what protects the missing-key case — the constructor default is.
- Keep `= 0` as defence-in-depth for explicit numeric config (`"0"` in appsettings), JSON deserialisation paths, and future enum reordering.

## DI lifetimes

- **Transient** by default. Scoped only for per-request state (`DbContext`, repositories, unit-of-work). Singleton only when stateless or rigorously thread-safe.
- Enable `ValidateScopes` and `ValidateOnBuild` in development to catch lifetime mismatches.

## Hosted / background services

- Implement `BackgroundService` and override `ExecuteAsync(CancellationToken)`.
- Don't perform long blocking work synchronously in `ExecuteAsync` — `await Task.Yield()` or first `await` to let host startup proceed.
- Respect the cancellation token; otherwise the host force-kills after the 30s shutdown timeout.
- Hosted services don't get a scoped DI container — inject `IServiceScopeFactory` and `CreateScope()` per unit of work.

## Health checks & telemetry

- `AddHealthChecks()` with separate `/healthz/live` and `/healthz/ready` endpoints.
- OpenTelemetry tracing + metrics; structured logging with `LoggerMessage` source generation on hot paths (CA1848).

## What to avoid

- `services.BuildServiceProvider()` inside `ConfigureServices` — fragments the container.
- Service Locator (`IServiceProvider` injected into business logic).
- Async work in DI factories — the container resolves synchronously.
- Long-running work in HTTP request paths (move to hosted service / queue).
- `AllowAnyOrigin` in production CORS.
