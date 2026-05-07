---
description: Scaffold a new ASP.NET Core Minimal API endpoint with the 9-point checklist.
---

Invoke the `aspnet-api-designer` agent with the `aspnetcore` skill.

Scaffold the endpoint the user describes. Verify *all 9* before reporting done:

1. **Minimal API** with `IEndpointGroup` (not MVC controller) unless the existing repo uses controllers.
2. **Result pattern** for the handler return — no thrown exceptions for control flow.
3. **FluentValidation** validator for the request DTO, registered in DI.
4. **OpenAPI metadata** — `.WithName`, `.WithSummary`, `.Produces<T>(200)`, `.ProducesProblem(400)`.
5. **Pagination** if the response is a collection (`page`, `pageSize`, total count in payload).
6. **CancellationToken** accepted on the handler and propagated to every async call (EF, HttpClient, etc.).
7. **Authorization** — explicit `[Authorize]` or policy; no implicit anonymous unless the endpoint genuinely is public.
8. **ProblemDetails** for error responses (`application/problem+json`).
9. **Test** — at least one `WebApplicationFactory` integration test exercising the success path.
