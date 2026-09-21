# Pattern Catalogue by Stack

> **MENTOR-SIDE REFERENCE.** This catalogue is here so *you* can tell a pattern from a
> language feature before saying anything. Do not hand it to a trainee — a menu invites
> ordering, and a pattern picked off a menu has no force behind it, which is the one thing
> this skill will not accept.

How to answer "which pattern should I use?" in a way a trainee learns from. Used in Step 2 of the six-step loop.

The failure mode this file exists to prevent: a trainee adds a factory, a strategy and a singleton because a tutorial did, in a language where two of the three are a keyword and the third is a module-level variable.

---

## Why half the classic catalogue is a workaround

The *Design Patterns* book (Gamma, Helm, Johnson, Vlissides — "GoF", 1994) was written against C++ and Smalltalk as they were then: no first-class functions in the mainstream case, no closures, no generators, no modules-as-namespaces, no destructors you could rely on in every language.

Peter Norvig's survey of the same 23 patterns in a dynamic language found **16 of them either invisible or much simpler** once the language supplies first-class functions, first-class types, macros and modules — Strategy, Command, Template Method and Visitor collapse into "a variable whose value is a function" ([Norvig, *Design Patterns in Dynamic Languages*](https://norvig.com/design-patterns/)).

The practical consequence for a trainee: **a large fraction of the catalogue is a workaround for a feature their language may already have.** Before a pattern is recommended by name, check this file for the feature that replaced it. Recommending Strategy to someone who can pass a function is teaching them ceremony.

What survives the translation, in every language, is the small set of patterns that answer a *real* force — an unstable dependency, a resource that must be closed, a second variant of a format. Those are catalogued per force in `force-to-pattern.md`.

---

## Per-stack shortlists

Each section: what genuinely earns its place at beginner-to-intermediate level, what the language absorbed, and the case — usually the common one — for no pattern at all.

### Python

**Earns its place**

| Pattern | The force it answers |
|---|---|
| Adapter / wrapper module | A third-party API whose surface does not match what the program needs |
| Global Object | One configured thing the whole program reads — a module-level value, **not** a Singleton class ([python-patterns.guide](https://python-patterns.guide/python/module-globals/)) |
| Dependency injection *as a plain parameter* | A collaborator that must be swapped in tests. Passing it in **is** the pattern; no container is involved |

**Absorbed into the language**

| Classic pattern | The feature that replaced it |
|---|---|
| Strategy, Command, Template Method | First-class functions — the strategy is a variable holding a function ([Norvig](https://norvig.com/design-patterns/)) |
| Decorator | `@decorator` syntax: a function that takes a function and returns a new one ([Python glossary](https://docs.python.org/3/glossary.html#term-decorator)) |
| Iterator | Generators and the iterator protocol — `yield` is the whole pattern ([Python tutorial](https://docs.python.org/3/tutorial/classes.html#generators)) |
| RAII / resource guard | `with` and `contextlib` — setup and teardown guaranteed even on error ([`contextlib`](https://docs.python.org/3/library/contextlib.html)) |
| Builder | `@dataclass` with keyword and default fields ([`dataclasses`](https://docs.python.org/3/library/dataclasses.html)) |
| Singleton | Module import caching plus the Global Object pattern ([python-patterns.guide](https://python-patterns.guide/gang-of-four/singleton/)) |
| Flyweight / memoized factory | `@functools.lru_cache` / `@functools.cache` ([`functools`](https://docs.python.org/3/library/functools.html)) |

**The no-pattern case.** A script that reads a file, applies rules and prints a result needs a module of functions and a `dict`. The most common correct verdict for a Python school task is `NOT NEEDED` across the board.

### C

**Earns its place**

| Pattern | The force it answers |
|---|---|
| Opaque pointer / handle | Callers must not depend on a struct's layout; the header forward-declares, the `.c` defines ([Wikipedia](https://en.wikipedia.org/wiki/Opaque_pointer), [Interrupt](https://interrupt.memfault.com/blog/opaque-pointers)) |
| Function-pointer table ("hand-rolled vtable") | Several interchangeable behaviours chosen at runtime, where C offers no dispatch of its own |
| Callback parameter | A traversal whose per-element action varies — the C spelling of Strategy |

**Absorbed into the language — almost nothing**

C has no classes, no closures, no destructors and no generics. Nothing in the GoF catalogue is a keyword here, which is exactly why C code shows the *mechanics* of a pattern: encapsulation is a forward declaration, polymorphism is a struct of function pointers, cleanup is a single exit path. There is no RAII; the idiom is one `goto cleanup` label or one `free` at one exit.

**The no-pattern case.** In school C — a fixed subject, a restricted allowed-functions list, a grader — the correct answer is **no pattern, and usually no `struct` of function pointers either.** One well-named function with a clear contract is the exercise. A trainee who introduces a vtable into a string exercise has invented a problem.

### C# / .NET

**Earns its place**

| Pattern | The force it answers |
|---|---|
| Constructor injection | A collaborator swapped in tests or supplied by the host; the framework registers it for you ([DI guidelines](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/guidelines)) |
| Adapter over an external client | An API you do not control, behind one interface of your own |
| Options / configuration object | Many optional settings, bound once at start-up |

**Absorbed into the language or the BCL**

| Classic pattern | The feature that replaced it |
|---|---|
| Iterator | `yield return`; the compiler generates the whole state machine ([Iterators — C#](https://learn.microsoft.com/en-us/dotnet/csharp/iterators)) |
| Strategy, Command | `Func<>` / `Action<>` delegates — a single-method interface is a delegate ([Delegates](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/delegates/)) |
| RAII / resource guard | `using` over `IDisposable` ([Dispose pattern](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose)) |
| Builder (simple cases) | `record` types plus object and `with` initializers ([`record`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record)) |
| Observer | `event` / `IObservable<T>` ([Observer design pattern](https://learn.microsoft.com/en-us/dotnet/standard/events/observer-design-pattern)) |
| Service Locator / hand-rolled factory registry | `IServiceProvider` and the built-in container |

**The no-pattern case.** A console app with one job needs one class and `Program.cs`. Registering three interfaces in a container so that one of them can be mocked, in a project with no tests, is the textbook `OVERENGINEERING` verdict.

### JavaScript / TypeScript

**Earns its place**

| Pattern | The force it answers |
|---|---|
| Adapter / wrapper module | A third-party or platform API whose shape leaks into too many call sites |
| Dependency as a parameter | A `fetch`, a clock or a filesystem that must be faked in tests |
| Facade over a module cluster | One entry point for a group of related modules a caller should not know individually |

**Absorbed into the language**

| Classic pattern | The feature that replaced it |
|---|---|
| Strategy, Command, Decorator | Closures and first-class functions — a function that wraps a function is the whole Decorator |
| Singleton | Module instantiation is cached, so an ES or CommonJS module's exports are already a single shared instance ([MDN Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), [Node module caching](https://nodejs.org/api/modules.html#caching)) |
| Iterator | The iteration protocols and generator functions ([MDN Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)) |
| Proxy | The `Proxy` object, which is the pattern as a built-in ([MDN `Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)) |
| Observer (in the DOM) | `addEventListener` and `EventTarget` |

**The no-pattern case.** A Node CLI that parses arguments and writes a file needs two or three modules of exported functions. Class hierarchies in JavaScript are usually imported from another language's habits, not required by this one.

### Go

**Earns its place**

| Pattern | The force it answers |
|---|---|
| Functional options | A constructor with many optional settings, kept extensible and immutable after construction ([Dave Cheney](https://dave.cheney.net/2014/10/17/functional-options-for-friendly-apis)) |
| Small interface at the consumer | A dependency swapped in tests; interfaces are satisfied implicitly, so the interface belongs where it is *used* ([Go proverbs](https://go-proverbs.github.io/)) |
| Wrapping `io.Reader` / `io.Writer` | Layered stream behaviour — Decorator, spelled as one stdlib interface ([`io`](https://pkg.go.dev/io)) |

**Absorbed into the language or the stdlib**

| Classic pattern | The feature that replaced it |
|---|---|
| Strategy, Command | Functions are values; a struct field of function type is the strategy |
| Singleton / lazy once-only init | `sync.Once`, or a package-level variable initialized in `init` ([`sync.Once`](https://pkg.go.dev/sync#Once)) |
| Abstract Factory / class hierarchies | Implicit interface satisfaction and struct embedding ([Effective Go](https://go.dev/doc/effective_go#embedding)) |
| Adapter over an interface | Often a one-method function type that satisfies the interface, as `http.HandlerFunc` does ([`net/http`](https://pkg.go.dev/net/http#HandlerFunc)) |

**The no-pattern case.** Go's own style guidance pushes toward the plain version: a package of functions, a concrete struct returned, an interface added only when a second implementation actually exists. Defining an interface with one implementation is the most common beginner over-build in Go.

### Rust

**Earns its place**

| Pattern | The force it answers |
|---|---|
| Builder | A type with many optional fields, where a half-built value must not be constructible ([Rust Design Patterns](https://rust-unofficial.github.io/patterns/patterns/creational/builder.html)) |
| Newtype | A domain meaning that must not be confused with the primitive underneath ([Rust Design Patterns](https://rust-unofficial.github.io/patterns/patterns/behavioural/newtype.html)) |
| RAII guard | A resource whose release must be mediated by the type system, not remembered ([RAII Guards](https://rust-unofficial.github.io/patterns/patterns/behavioural/RAII.html)) |

**Absorbed into the language**

| Classic pattern | The feature that replaced it |
|---|---|
| Strategy | Traits with generics, or `dyn Trait` when the choice is made at runtime ([Book, ch. 17](https://doc.rust-lang.org/book/ch17-02-trait-objects.html)) |
| RAII / dispose | `Drop` — destructors run deterministically at end of scope ([`Drop`](https://doc.rust-lang.org/std/ops/trait.Drop.html)) |
| Iterator | The `Iterator` trait and its adapters ([`Iterator`](https://doc.rust-lang.org/std/iter/trait.Iterator.html)) |
| Null Object | `Option<T>` — the absence is in the type ([`Option`](https://doc.rust-lang.org/std/option/)) |
| Shared-mutable coordination | Ownership and borrowing; the compiler refuses two mutable owners outright |

**The no-pattern case.** Ownership already answers several forces that are patterns elsewhere. A beginner Rust exercise wants functions, `enum`s, `Result` and `match` — not trait objects added in advance of a second implementation.

---

## The strongest answer is often "none"

For a school task with a fixed subject, one caller per module and a grader, **no pattern is frequently the correct design.** Say so plainly when it is true. A trainee who learns that "no pattern" is a legitimate, defensible answer has learned more than one who learns six pattern names.

Check before recommending anything:
- Does the language already provide it as a feature? Then it is not a pattern here — name the feature.
- Does the module have more than one caller, or more than one behaviour, **today**?
- Would the pattern's participants outnumber the lines of logic they wrap?
- Does the subject restrict what may be used at all?

---

## Using this with a trainee

Do not read the catalogue at them. Ask for the language first, then for the force:

> *"Before we name anything — what does your language already do for you here?"*

If they can name the feature, they have their answer and they never needed the pattern. If they cannot, the feature is the lesson, and it is a cheaper lesson than the pattern.

**Keep this file current.** Per-language claims about what a language has absorbed are exactly the claims that go stale — verify the live documentation with **WebSearch** / **WebFetch** before repeating a row, and cite what was actually read.
