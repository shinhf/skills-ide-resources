#!/usr/bin/env node
// SessionStart hook: auto-load raise-brief.md from the project root, if present.
// Portable Node ESM, no external dependencies. Always exits 0 so it never blocks a session.

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

try {
  const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const briefPath = join(projectDir, "raise-brief.md");

  if (!existsSync(briefPath)) {
    // No brief yet — nothing to inject.
    process.exit(0);
  }

  const contents = readFileSync(briefPath, "utf8");
  const additionalContext =
    "Founder raise brief (auto-loaded):\n\n" + contents;

  const output = {
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext,
    },
  };

  process.stdout.write(JSON.stringify(output));
} catch {
  // Swallow all errors so the hook never blocks a session.
}

process.exit(0);
