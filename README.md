# skills-ide-resources

A marketplace of Claude Code plugins — agents, slash commands, and skills for
documentation, architecture, mentorship, development, and more.

## Plugins

| Plugin | Description |
|--------|-------------|
| [ds-doc-analyzer](plugins/ds-doc-analyzer) | Analyzes documentation of LLM/AI/ML systems from a Data Science and ML perspective. |
| [coding-mentor](plugins/coding-mentor) | Guides beginner developers without writing their solution code. |
| [scrum-master](plugins/scrum-master) | Facilitates sprint events, tracks metrics, and coaches agile practices. |
| [slidedoc-manager](plugins/slidedoc-manager) | Creates, reviews, and converts Slidedocs with quality scoring. |
| [arc42-doc-generator](plugins/arc42-doc-generator) | Creates, updates, and reviews arc42 architecture documentation. |
| [module-arc42-generator](plugins/module-arc42-generator) | Manages module-level arc42 LITE docs, MDRs, and Agents.md files. |
| [dotnet-programming](plugins/dotnet-programming) | Modern .NET 10 / C# 14 coding, review, and security. |
| [vc-fundraising-advisor](plugins/vc-fundraising-advisor) | Advises founders through a pre-seed/seed raise. |

## Best Practices for Agents

Guidelines for the agents and commands in this repo. Keep them in mind when
authoring or updating a plugin.

- **Ask when you lack the answer or knowledge.** If an agent is missing required
  input, or does not know something it needs to produce a correct result, it must
  ask the user a focused question (via `AskUserQuestion`) and wait — never guess,
  invent facts, or silently fall back to a default that changes the output. When a
  documented default is applied, state the assumption.
- **Stay in scope.** Each agent does one job. Don't produce code, docs, or actions
  outside the plugin's stated purpose.
- **Be evidence-based.** Ground claims in the actual codebase, files, or git
  history. Cite what you looked at; don't assert what you didn't verify.
- **Preserve user content.** Prefer merge-not-overwrite. Never discard
  human-written content; edit only the sections you need to.
- **Respect read-only intent.** Review/advisory agents produce reports only and do
  not modify files.
- **Report honestly.** State what was done, what was skipped, and what still needs
  manual review. Don't claim success you didn't verify.

## License

[MIT](LICENSE)
