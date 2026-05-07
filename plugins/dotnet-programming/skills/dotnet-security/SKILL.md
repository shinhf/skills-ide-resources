---
name: dotnet-security
description: OWASP Top 10 (2025) security audit for .NET code. Covers Broken Access Control, Misconfiguration, Supply Chain Failures, Crypto, Auth, Logging, and the new A10 Mishandling Exceptional Conditions.
---

# .NET security audit (OWASP Top 10 2025)

Use this skill when auditing .NET code for security risk. Pair with the `dotnet-security-auditor` agent for the full review persona.

## Threat model

OWASP 2025 elevates **Software Supply Chain Failures** (A03) and adds **Mishandling Exceptional Conditions** (A10). Both are particularly relevant to AI-generated code.

## Audit checklist

### A01 Broken Access Control (most prevalent)
- Every endpoint has explicit `[Authorize]` or policy attribute. Default-deny — anonymous endpoints are explicit.
- IDOR mitigation: any route accepting a resource ID checks the caller owns it.
- No client-controlled tenant / user IDs trusted from the request body.

### A02 Security Misconfiguration
- No `AllowAnyOrigin` / `AllowAnyHeader` / `AllowAnyMethod` in production CORS.
- No `UseDeveloperExceptionPage` outside Development.
- No detailed errors leaked via `ProblemDetails.Detail` in production.
- Headers: HSTS, X-Content-Type-Options, frame ancestors locked down.

### A03 Software Supply Chain Failures
- Every NuGet package referenced **actually exists on nuget.org**. LLM hallucination of package names is an active attack vector — verify every `<PackageReference>` introduced in the diff.
- `dotnet list package --vulnerable --include-transitive` clean (or vulnerabilities are tracked with an exception).
- `packages.lock.json` checked in for reproducible restores.
- Central Package Management (`Directory.Packages.props`) used to pin versions repo-wide.

### A04 Insecure Design
- Public endpoints rate-limited (`AddRateLimiter`).
- State-changing endpoints have antiforgery tokens (cookie-auth web apps).

### A05 Cryptographic Failures
- `RandomNumberGenerator.GetBytes` for secrets, never `System.Random` (CA5394 = error).
- No MD5 / SHA1 in security contexts (CA5351 = error).
- Symmetric crypto uses `Aes` with explicit IVs; never ECB.
- `IDataProtectionProvider` for short-lived tokens; configured with key persistence in multi-instance deployments.

### A06 Vulnerable & Outdated Components
- Same audit command as A03; surface high/critical severity hits.

### A07 Identification & Authentication Failures
- Auth scheme explicitly chosen (`AddAuthentication(...)` is unambiguous).
- Cookies: `HttpOnly`, `Secure`, `SameSite=Lax` or `Strict`.
- JWT validation parameters set (`ValidateIssuer`, `ValidateAudience`, `ValidateLifetime`).

### A08 Software & Data Integrity Failures
- Deserialization of untrusted input uses safe defaults (`JsonSerializerOptions` with bounded `MaxDepth`).
- No `BinaryFormatter` (deprecated and dangerous).

### A09 Security Logging & Monitoring Failures
- Auth failures, access denials, admin actions are logged with correlation IDs.
- **No PII or secrets in log templates** — review every `Log...(...)` call in the diff.

### A10 Mishandling Exceptional Conditions (NEW in 2025)
- No blanket `catch (Exception ex)` that swallows errors silently.
- ProblemDetails responses don't leak internal type names, stack traces, or DB schema.
- Errors classified as expected (validation) vs unexpected (bug); only the latter alert oncall.

## Output

For each finding, emit:

- **Severity**: Critical / High / Medium / Low
- **OWASP category**: A01-A10
- **Location**: `path:LINE`
- **Attack vector**: how this is exploited (1-2 sentences)
- **Fix**: concrete remediation

Sort by severity. End with a one-line summary of overall posture.
