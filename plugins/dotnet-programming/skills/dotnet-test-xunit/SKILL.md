---
name: dotnet-test-xunit
description: xUnit v3 testing patterns for .NET 10 — unit tests, integration tests with WebApplicationFactory, Testcontainers for real infrastructure, and TDD red-green-refactor.
---

# xUnit v3 testing

Use this skill when writing or reviewing xUnit tests in a .NET 10 codebase.

## Package baseline

```xml
<PackageReference Include="xunit.v3" />
<PackageReference Include="xunit.analyzers" />
<PackageReference Include="xunit.runner.visualstudio" />
<PackageReference Include="Microsoft.AspNetCore.Mvc.Testing" />          <!-- API integration -->
<PackageReference Include="Testcontainers.PostgreSql" />                  <!-- or Redis, etc. -->
<PackageReference Include="NSubstitute" />                                <!-- or Moq -->
<PackageReference Include="FluentAssertions" />                           <!-- optional but common -->
```

For new projects, prefer `Microsoft.Testing.Platform` over the legacy VSTest runner. Don't mix the two in one solution.

## Test structure

- **AAA**: Arrange / Act / Assert with blank-line separators.
- One logical behavior per test. Multiple `Assert` lines are fine if they verify *one* behavior.
- Names: `MethodName_StateUnderTest_ExpectedBehavior`, or natural-language `[Fact(DisplayName = "...")]`.
- **`ITestOutputHelper`** for test diagnostics — never `Console.WriteLine`. xunit.analyzers flags this as `xUnit1000+`.

## Parameterized tests

```csharp
[Theory]
[InlineData(0, false)]
[InlineData(1, true)]
[InlineData(100, true)]
public void IsPositive_ReturnsExpected(int input, bool expected)
    => Assert.Equal(expected, Calculator.IsPositive(input));
```

Use `[MemberData]` or `TheoryData<...>` for complex cases. `[ClassData]` for cases shared across multiple test classes.

## Fixtures and lifetime

- `IClassFixture<T>` for setup shared across tests in one class.
- `ICollectionFixture<T>` for setup shared across multiple classes.
- `IAsyncLifetime` for async setup/teardown — required for Testcontainers.

## ASP.NET Core integration tests

```csharp
public class WidgetEndpointTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public WidgetEndpointTests(WebApplicationFactory<Program> factory)
        => _factory = factory.WithWebHostBuilder(b => b.ConfigureServices(s =>
        {
            // swap in test doubles here
        }));

    [Fact]
    public async Task GetWidget_ReturnsOk()
    {
        var client = _factory.CreateClient();
        var response = await client.GetAsync("/widgets/1");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}
```

- Override services for the test (auth bypass, fake clock, etc.) in `WithWebHostBuilder`.
- Don't replace the entire DB context with an in-memory provider — its semantics differ from a real DB. Use Testcontainers instead.

## Testcontainers for real infrastructure

```csharp
public class DbFixture : IAsyncLifetime
{
    private readonly PostgreSqlContainer _db = new PostgreSqlBuilder().Build();
    public string ConnectionString => _db.GetConnectionString();
    public Task InitializeAsync() => _db.StartAsync();
    public Task DisposeAsync()    => _db.DisposeAsync().AsTask();
}
```

Use this for any test that exercises EF migrations, raw SQL, or DB-specific behavior (JSONB, full-text search, etc.).

## TDD loop

1. **Red** — write the smallest failing test for the next behavior. Run `dotnet test`. Confirm failure is *the right one* (assertion, not compile error).
2. **Green** — minimum code to pass.
3. **Refactor** — clean duplication, tests still green.

Stop after each cycle. Don't run ahead silently.

## Anti-patterns

- Mocking your own DTOs / records.
- Tests that share mutable static state across `[Fact]`s.
- Asserting on log message text without `[Skip]` reason — brittle.
- Using `[Fact]` when `[Theory]` would dedupe 5 copy-pasted tests.
- Catching exceptions in tests just to assert their type — use `Assert.Throws<T>` / `await Assert.ThrowsAsync<T>`.
