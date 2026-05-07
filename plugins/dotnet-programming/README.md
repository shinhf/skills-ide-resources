# dotnet-programming

A Claude Code plugin for modern .NET 10 / C# 14 development. Ships agents, skills, and slash commands that enforce current Microsoft guidance for ASP.NET Core, WPF, EF Core, cross-platform publishing, xUnit testing, and OWASP 2025 security review.

## What's inside

### Slash commands

| Command | What it does |
|---|---|
| `/dotnet-review` | Rigorous code review across async, disposal, LINQ/EF, logging, globalization, security, tests |
| `/dotnet-security` | OWASP 2025 audit (Broken Access Control, Misconfig, Supply Chain, Exception mishandling, etc.) |
| `/dotnet-verify` | 7-phase verification: build → analyzers → anti-patterns → tests → security → format → diff |
| `/dotnet-tdd` | Red-green-refactor loop with xUnit v3 |
| `/scaffold-endpoint` | New ASP.NET Core Minimal API endpoint with the 9-point checklist |
| `/de-sloppify` | Cleanup: remove dead code, seal non-inherited classes, apply formatters |

### Agents

`csharp-pro`, `aspnet-api-designer`, `ef-core-specialist`, `wpf-developer`, `dotnet-security-auditor`, `dotnet-test-engineer`, `build-error-resolver`.

### Skills (loaded on demand)

`dotnet-review`, `dotnet-security`, `dotnet-perf-triage`, `dotnet-ef-review`, `dotnet-pattern`, `dotnet-test-xunit`, `aspnetcore`, `wpf`, `dotnet-cross-platform`.

## Baseline assumptions

- **.NET 10** and **C# 14** (modern WPF on .NET 10, not legacy .NET Framework)
- **xUnit v3** as the test framework
- `AnalysisMode=Recommended`, `EnforceCodeStyleInBuild=true`, nullable enabled
- Modern WPF stack: `Microsoft.Extensions.Hosting` for DI, `CommunityToolkit.Mvvm` for source-generated MVVM

## Install

Add the plugin's directory to a Claude Code marketplace, then enable `dotnet-programming` from `/plugin`.
