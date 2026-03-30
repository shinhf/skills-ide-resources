# Scrum Master Plugin

A Claude Code plugin that acts as a Scrum Master -- facilitating sprint events, tracking metrics, coaching agile best practices, and identifying process anti-patterns.

## Features

- **Sprint Planning** -- Facilitate planning sessions with backlog analysis, estimation support, and goal setting
- **Daily Standup** -- Generate standup summaries with blocker tracking and Sprint health assessment
- **Sprint Retrospective** -- Run retros in multiple formats (Start/Stop/Continue, 4Ls, Mad/Sad/Glad, Sailboat, Timeline, Starfish)
- **Sprint Reporting** -- Generate metrics reports with velocity, throughput, cycle time, and trend analysis
- **Backlog Refinement** -- Review stories for quality, suggest acceptance criteria, identify dependencies
- **Agile Coaching** -- Autonomous agent that diagnoses anti-patterns and recommends process improvements

## Tool-Independent Design

This plugin does not assume Jira, Azure DevOps, GitHub Issues, or any specific project management tool. All commands work from data the user provides -- inline text, pasted tables, markdown files, CSV snippets, or referenced local files.

## Installation

```bash
cc --plugin-dir /path/to/scrum-master
```

Or copy the `scrum-master/` directory into your project's `.claude-plugin/` location.

## Commands

| Command | Description | Arguments |
|---------|-------------|-----------|
| `/sprint-plan` | Facilitate Sprint Planning | `[sprint-number] [team-size] [data-source]` |
| `/standup` | Generate daily standup summary | `[date] [data-source]` |
| `/retro` | Run Sprint Retrospective | `[format] [data-source]` |
| `/sprint-report` | Generate Sprint metrics report | `[sprint-number] [data-source]` |
| `/backlog-groom` | Backlog refinement session | `[data-source]` |

### Retro Formats

The `/retro` command supports these formats:
- `start-stop-continue` -- General-purpose (default)
- `4ls` -- Liked, Learned, Lacked, Longed For
- `mad-sad-glad` -- Emotional check-in
- `sailboat` -- Forward-looking planning
- `timeline` -- Incident/event analysis
- `starfish` -- Nuanced feedback (More/Less/Keep/Start/Stop)

## Agent

The **scrum-coach** agent activates when you ask about:
- Agile process improvement
- Scrum anti-patterns
- Team velocity or Sprint health problems
- Setting up Scrum for a new team
- Coaching on Scrum practices

The agent performs structured assessments, diagnoses root causes, and provides prioritized recommendations.

## Skills

Three skills provide domain knowledge that commands and the agent draw on:

| Skill | Triggers on |
|-------|-------------|
| **Scrum Fundamentals** | Scrum roles, artifacts, events, anti-patterns, best practices |
| **Sprint Events** | Event facilitation, formats, templates |
| **Scrum Metrics** | Velocity, burndown, cycle time, reporting |

## Plugin Structure

```
scrum-master/
├── .claude-plugin/
│   └── plugin.json
├── commands/
│   ├── sprint-plan.md
│   ├── standup.md
│   ├── retro.md
│   ├── sprint-report.md
│   └── backlog-groom.md
├── agents/
│   └── scrum-coach.md
├── skills/
│   ├── scrum-fundamentals/
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── anti-patterns.md
│   │       └── best-practices.md
│   ├── sprint-events/
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── planning-guide.md
│   │       ├── standup-guide.md
│   │       └── retro-formats.md
│   └── scrum-metrics/
│       ├── SKILL.md
│       └── references/
│           └── metrics-guide.md
└── README.md
```

## Usage Examples

### Sprint Planning

```
/sprint-plan 12 5 "Our backlog is in the file backlog.md in this directory"
```

### Generate a Retro

```
/retro sailboat "Sprint 11 was rough -- we had a production incident on day 3"
```

### Sprint Report

```
/sprint-report 11 "Here are the sprint items: [paste data]"
```

### Agile Coaching

Ask naturally:
> "Our team keeps carrying over stories every Sprint. What are we doing wrong?"

The scrum-coach agent will activate and guide you through diagnosis and recommendations.
