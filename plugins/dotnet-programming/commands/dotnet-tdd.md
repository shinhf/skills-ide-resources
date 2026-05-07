---
description: Red-green-refactor TDD loop with xUnit v3 for a feature the user describes.
---

Invoke the `dotnet-test-engineer` agent with the `dotnet-test-xunit` skill.

Drive a strict red-green-refactor loop for whatever the user wants to build:

1. **Red** — write the smallest failing xUnit v3 test that expresses the next behavior. Run `dotnet test` and confirm it fails for the *right reason* (assertion failure, not a compile error or missing type).
2. **Green** — write the minimum production code to make the test pass. No premature abstraction. Run `dotnet test` to confirm green.
3. **Refactor** — clean up duplication and naming with tests still green. Run `dotnet test` again.

Use `WebApplicationFactory<TProgram>` for ASP.NET Core integration tests and Testcontainers for anything that needs a real database. Inject `ITestOutputHelper` for diagnostics — never `Console.WriteLine`.

Stop after each cycle and ask if the user wants to continue to the next behavior.
