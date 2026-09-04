<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Worktrees

Agents that change files in this repo work in a git worktree, never on the default branch. Keep the worktrees inside the repo so the human's project folder stays exactly as it was handed over.

- Create worktrees at `.worktrees/<task>` inside this repo, never as a sibling folder. `.worktrees/` is gitignored.
- Name the folder after the task, in a few words, e.g. `.worktrees/hero-copy`. One worktree per branch.
- Continuing recent work? Reuse the existing worktree instead of creating another.
- When a branch is merged, remove its worktree and delete the branch in the same turn: `git worktree remove .worktrees/<task> && git branch -d <branch>`.
- Do not run `npm install` inside a worktree unless the task has to build or run tests. Editing and reviewing never need it.
- Never nest a clone or another repo inside a worktree.
