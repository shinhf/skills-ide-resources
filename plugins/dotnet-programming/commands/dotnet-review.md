---
description: Rigorous .NET code review across async, disposal, LINQ/EF, logging, globalization, security, and tests.
---

Run the `dotnet-review` skill against the changes in the current branch (or the files the user specifies).

Follow the skill's 9-step checklist. Output findings grouped by severity (Critical / High / Medium / Low) with `file:line` citations. For each finding give the *mechanism* (why it matters), not just the syntax fix. Suggest a test for every non-trivial fix. Acknowledge 1-2 strong patterns the developer used to avoid demoralizing feedback.

Do not invent problems to fill a quota.
