---
description: Systematic codebase cleanup — dead code, formatting, sealed classes, duplicates.
---

Run a careful cleanup pass on the current repo (or the directory the user specifies):

1. Run `dotnet format` to apply `.editorconfig` rules.
2. Find and remove **provably dead code**: private methods/types with zero references, unreachable branches, commented-out blocks. Show each before deleting; do not delete reflection targets, DI-resolved types, or anything `[ModuleInitializer]` / `[DynamicDependency]` references.
3. **Seal non-inherited classes** — any `public class` with no derived types in the solution and no library consumers should be `sealed`. Skip if the project ships as a library.
4. Convert `public` members to `internal` where they have no external callers.
5. De-duplicate near-identical helpers only when the duplication is *real*; don't manufacture abstractions over three lines.
6. Run `dotnet build` and `dotnet test` after each batch — never accumulate untested cleanups.

Show a summary of what was changed and *what was deliberately left alone*.
