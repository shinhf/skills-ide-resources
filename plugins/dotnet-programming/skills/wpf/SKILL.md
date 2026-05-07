---
name: wpf
description: WPF on .NET 10 — generic host bootstrap, CommunityToolkit.Mvvm source-generated MVVM, async commands, dispatcher rules, navigation, and resource organization.
---

# WPF on .NET 10

Use this skill for desktop UI work. **Modern WPF only** — generic host, source-generated MVVM, async commands.

## Bootstrap

```csharp
public partial class App : Application
{
    private readonly IHost _host;

    public App()
    {
        _host = Host.CreateDefaultBuilder()
            .ConfigureServices((_, services) =>
            {
                services.AddSingleton<MainWindow>();
                services.AddTransient<MainViewModel>();
                services.AddSingleton<INavigationService, NavigationService>();
                // domain services...
            })
            .Build();
    }

    protected override async void OnStartup(StartupEventArgs e)
    {
        await _host.StartAsync();
        _host.Services.GetRequiredService<MainWindow>().Show();
    }

    protected override async void OnExit(ExitEventArgs e)
    {
        await _host.StopAsync(TimeSpan.FromSeconds(5));
        _host.Dispose();
    }
}
```

- `MainWindow` resolved from DI; never `new MainWindow()`.
- View models registered as **transient** (one per window/view).

## MVVM with CommunityToolkit.Mvvm

```csharp
public partial class WidgetViewModel : ObservableObject
{
    [ObservableProperty]
    private string _name = string.Empty;

    [ObservableProperty]
    [NotifyCanExecuteChangedFor(nameof(SaveCommand))]
    private bool _isDirty;

    [RelayCommand(CanExecute = nameof(CanSave))]
    private async Task Save(CancellationToken ct)
    {
        // ...
        IsDirty = false;
    }

    private bool CanSave() => IsDirty;
}
```

- `[ObservableProperty]` source-generates the public property + `INotifyPropertyChanged` raise.
- `[RelayCommand]` source-generates an `IRelayCommand` / `IAsyncRelayCommand` and wires `CanExecute`.
- `[NotifyCanExecuteChangedFor]` on the property keeps the command's `CanExecute` fresh.
- View models are POCOs — testable without UI.

## Threading

- Async continuations return to the dispatcher automatically (captured `SynchronizationContext`). **Don't `ConfigureAwait(false)`** in view-model code.
- Long-running work goes on background tasks via `await`. UI stays responsive.
- **Never** `.Result` or `.Wait()` on the UI thread — instant deadlock.
- `Dispatcher.InvokeAsync` only when you genuinely need to marshal from a non-UI thread (rare in MVVM with async commands).

## Bindings

- Default to `OneWay`. `TwoWay` only on inputs.
- `UpdateSourceTrigger=PropertyChanged` for inputs that need live validation (default is `LostFocus`).
- `IValueConverter` for view-only transforms (bool → Visibility, enum → string). Don't push presentation logic into view models.
- Validation: `INotifyDataErrorInfo` on view models, paired with FluentValidation if the team uses it.

## Navigation

- A small `INavigationService` mapping view-model types to views, resolved from DI:

```csharp
public interface INavigationService
{
    void NavigateTo<TViewModel>() where TViewModel : ObservableObject;
}
```

Avoid heavyweight navigation frameworks (Prism, etc.) unless the app already uses one.

## Resources

- `MergedDictionaries` for theming. Keep styles in resource dictionaries, not inline.
- `DynamicResource` for theme switching at runtime; `StaticResource` otherwise (faster).

## Testing

- View models are testable like any other class with xUnit (`dotnet-test-xunit` skill).
- Don't test the View; test the ViewModel.
- For navigation tests, fake the `INavigationService`.

## What to avoid

- `code-behind.cs` doing anything more than wiring `DataContext` or wiring trivial UI events that can't be expressed in XAML.
- Calling DI from inside `.xaml` resources — keeps everything in the host.
- `Task.Run` to "make UI responsive" — async commands already give you that.
- Synchronous `MessageBox.Show` blocking inside an async command — use a dialog service abstraction instead.
