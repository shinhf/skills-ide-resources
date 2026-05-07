---
name: dotnet-cross-platform
description: Cross-platform .NET development — multi-OS build/publish, runtime identifiers, single-file and self-contained deployment, Native AOT, container publish, and platform-conditional code.
---

# .NET cross-platform

Use this skill when targeting multiple OSes (Windows, Linux, macOS) or multiple architectures (x64, arm64) from a single .NET 10 codebase.

## Targeting

- `<TargetFramework>net10.0</TargetFramework>` is cross-platform by default. Add `net10.0-windows` only if the project uses Windows-only APIs (WPF, Windows Forms, COM).
- `<TargetFrameworks>net10.0;net10.0-windows</TargetFrameworks>` for libraries that have a Windows-specialized path plus a portable fallback.

## Runtime identifiers (RIDs)

- Common RIDs: `win-x64`, `win-arm64`, `linux-x64`, `linux-arm64`, `linux-musl-x64` (Alpine), `osx-x64`, `osx-arm64`.
- Specify with `dotnet publish -r <RID>` — required for self-contained or AOT builds.
- Don't pin a RID for "framework-dependent" builds; the target machine's runtime resolves it.

## Publish modes

| Mode | Flags | Use when |
|---|---|---|
| Framework-dependent | (default) | Target machines have the .NET runtime installed |
| Self-contained | `--self-contained -r <RID>` | Distribute to machines without .NET installed; larger output |
| Single file | `-p:PublishSingleFile=true -r <RID>` | One executable instead of a folder; reduces deployment friction |
| Trimmed | `-p:PublishTrimmed=true -r <RID>` | Smaller output; **requires trim-warning-clean code** (no unbounded reflection) |
| Native AOT | `-p:PublishAot=true -r <RID>` | Fastest startup, smallest size, no JIT; **strongest restrictions** (no reflection emit, limited dynamic code) |

Native AOT and trimming are aggressive — code that uses reflection, `Activator.CreateInstance`, or expression trees needs `[DynamicallyAccessedMembers]` annotations or it'll silently break at runtime. Run trim/AOT analyzers (`<IsTrimmable>true</IsTrimmable>`) and treat warnings as errors.

## Container publish

.NET can publish directly to a container image without a Dockerfile:

```
dotnet publish --os linux --arch x64 /t:PublishContainer
```

- Microsoft maintains optimized base images: `mcr.microsoft.com/dotnet/aspnet:10.0`, `mcr.microsoft.com/dotnet/runtime-deps:10.0` (for AOT), `chiseled` variants for minimal attack surface.
- Multi-arch images: build separately for `linux-x64` and `linux-arm64`, then push both under one tag.

## Platform-conditional code

```csharp
if (OperatingSystem.IsWindows())
    UseWindowsPath();
else if (OperatingSystem.IsLinux())
    UseLinuxPath();
```

- `OperatingSystem.IsXxx()` is supported by the trimmer/AOT analyzer — branches for non-target OSes get trimmed.
- `[SupportedOSPlatform("windows")]` / `[UnsupportedOSPlatform("ios")]` annotations make platform requirements compile-checked.
- Don't `#if WINDOWS` in cross-platform projects; runtime checks are clearer and trimmer-aware.

## Filesystem and paths

- `Path.Combine` always — never string-concat with `\` or `/`.
- `Path.DirectorySeparatorChar` if you must reason about the separator.
- Case-sensitivity differs (Linux ext4 case-sensitive; default macOS case-insensitive; Windows NTFS case-insensitive). Don't rely on case folding.
- Line endings: `Environment.NewLine` for files written for the host; `"\n"` explicitly for protocols (HTTP, JSON).

## CI matrix

- GitHub Actions / Azure Pipelines: matrix on `runs-on: [ubuntu-latest, windows-latest, macos-latest]` and run `dotnet build` + `dotnet test` on each.
- Cache NuGet on `packages.lock.json` hash for deterministic restores.
- Run `dotnet list package --vulnerable --include-transitive` as a separate job (security gate).

## What to verify before shipping cross-platform

- File paths use `Path.Combine` everywhere.
- No P/Invoke to platform-specific native libraries without OS guards.
- No assumption of CRLF / LF.
- Trimming/AOT warnings clean if those modes are used.
- Container builds for both `linux-x64` and `linux-arm64` if the deployment target is mixed.
- `dotnet test` passes on every target OS in CI, not just the dev machine.
