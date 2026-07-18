# Task Management (Todoist MCP)

- When I ask you to add tasks, batch them into a single MCP call rather than one
  call per task (up to 25 tasks per call supported).
- Don't proactively poll or list my full Todoist state unless I ask — pulling my
  whole task list costs tokens I don't need burned on every session.
- Before completing, deleting, or bulk-editing tasks, show me what you're about
  to change and wait for confirmation. Creating new tasks doesn't need confirmation.
- When parsing meeting notes or a brain dump into tasks, extract action items only
  — skip context/rationale unless it changes the due date or priority.
- Default project for new tasks: ask me once per session if ambiguous, then reuse
  that answer for the rest of the session instead of asking again.
  