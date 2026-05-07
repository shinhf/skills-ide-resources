---
description: OWASP Top 10 (2025) security audit of the current .NET changes.
---

Invoke the `dotnet-security-auditor` agent with the `dotnet-security` skill.

Audit the current diff (or specified files) against OWASP Top 10 2025, with special attention to:

- **A01 Broken Access Control** — every endpoint has explicit `[Authorize]` / policy attributes; IDOR mitigated by ownership checks
- **A02 Security Misconfiguration** — no `AllowAnyOrigin`, no leaked stack traces, dev defaults overridden in prod
- **A03 Software Supply Chain Failures** — every NuGet package referenced actually exists (no LLM-hallucinated names); `dotnet list package --vulnerable --include-transitive` clean
- **A10 Mishandling Exceptional Conditions** — no blanket `catch (Exception)` that swallows errors; ProblemDetails responses don't leak internals

Output: severity-ranked findings with file:line, the attack vector, and a fix.
