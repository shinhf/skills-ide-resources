---
name: dotnet-pattern
description: Picks the right design pattern for a problem and shows the modern .NET 10 idiom for it. Maps GoF patterns to current C# 14 features (delegates, records, IOptions, source generators) instead of textbook OOP.
---

# .NET design pattern picker

When the user asks "which pattern fits here?" or proposes one, push toward the **modern .NET idiom** rather than the textbook GoF implementation. C# 14 / .NET 10 features collapse most classic patterns to fewer types and less ceremony.

## Pattern → modern idiom mapping

### Creational

- **Factory Method / Abstract Factory** — usually a `Func<T>` or keyed DI registration (`IServiceCollection.AddKeyedTransient<T>`). Full factory class only when construction logic is genuinely non-trivial.
- **Builder** — record with `with` expressions, or a fluent builder if the construction has many optional params and validation.
- **Singleton** — DI registration with `AddSingleton<T>`. Hand-rolled `Lazy<T>` singleton is almost always wrong in modern .NET.
- **Prototype** — record `with` expressions for value semantics; `ICloneable` is a smell.

### Structural

- **Adapter** — small wrapper class is fine; for one-method adapters, a `Func<>` is enough.
- **Decorator** — DI-registered decorator chain (`IServiceCollection.Decorate<T, TDecorator>` via Scrutor) for cross-cutting concerns.
- **Facade** — service class with a focused interface; don't over-abstract.
- **Proxy** — `DispatchProxy` for dynamic proxies; source generators for compile-time.
- **Composite** — fine as classic; `IEnumerable<T>` traversal works well.
- **Bridge / Flyweight** — rarely needed in app code; appropriate in library hot paths.

### Behavioral

- **Strategy** — a `Func<TIn, TOut>` or keyed DI lookup. Strategy *class* hierarchies are rarely justified for app code.
- **Command** — MediatR-style `IRequest<T>` + handler if the team uses MediatR; otherwise a plain handler class.
- **Observer** — `IObservable<T>` (System.Reactive) for streams; events for fire-and-forget; `Channel<T>` for back-pressured producer/consumer.
- **State** — switch expression on an enum or DU-like sealed hierarchy. Full state-pattern class hierarchy is overkill unless transitions have rich behavior.
- **Template Method** — abstract base class is fine, but consider whether composition + delegate works.
- **Chain of Responsibility** — middleware in ASP.NET Core; `Func<TContext, Task, Task>` chain pattern.
- **Visitor** — pattern matching with switch expressions on a closed type hierarchy. Classic Visitor is rarely needed.
- **Iterator** — `IEnumerable<T>` / `IAsyncEnumerable<T>` with `yield return`.
- **Mediator** — MediatR or a hand-rolled `ISender` if the team prefers no dependency.
- **Memento** — record snapshots; serialization for persistence.
- **Interpreter** — DSL via expression trees or Roslyn scripting; rarely hand-rolled.

## Modern .NET-specific patterns

These don't have GoF equivalents but are common enough to recognize:

- **Options pattern** — strongly-typed config via `IOptions<T>` / `IOptionsSnapshot<T>` / `IOptionsMonitor<T>`. Replaces ad-hoc factory + config.
- **Result pattern** — `Result<T, TError>` (or `OneOf`) for handler returns instead of thrown exceptions for control flow.
- **Specification pattern** — encapsulate query predicates as `ISpecification<T>` for reuse + testability. Useful with EF Core.
- **Outbox pattern** — for reliable message dispatch from a transactional DB.
- **CQRS** — separate read and write models; adopt only when read/write asymmetry justifies the split.

## Decision rules

When recommending a pattern:

1. **Start from the problem**, not the pattern catalog. What's the actual variation point?
2. **One variation point = simple solution.** A `Func<>` or strategy delegate beats a class hierarchy.
3. **Three or more variation points or complex collaboration → full pattern is justified.**
4. **Don't reach for DDD / CQRS / Mediator on simple CRUD.** Microsoft's microservices guidance explicitly says some services don't need it.
5. **Match the repo's existing style** — don't introduce MediatR into a codebase that uses plain handlers.

## Output contract

When asked for a pattern recommendation:

```
Problem: <restated in 1 line>
Variation points: <list>
Recommendation: <pattern + modern idiom>
Why this over alternatives: <1-2 sentences>
Skeleton: <minimal code sketch>
When to revisit: <if it grows past N variations, escalate to ...>
```
