---
name: calendar-task-planner
description: Turns a Todoist list into time-blocked events on Remon's calendar, prioritized (highest-priority tasks first) and fitted into actual free time. Use this whenever Remon asks to "plan my tasks", "schedule my Todoist list", "block time for X", "put my to-dos on the calendar", "turn my [project] tasks into calendar time", or otherwise describes wanting a set of tasks turned into scheduled time blocks — even if he doesn't say "calendar" explicitly. Always follows the confirmation and constraint rules in .claude/rules/calendar.md and .claude/rules/todoist.md, asks (in one batched question) for anything it can't derive — task duration, which project, which date range — and always shows the complete proposed schedule for one confirmation before creating anything via the calendar MCP.
---

# Calendar Task Planner

Takes open tasks from a Todoist list, works out how long each will take and how
important each is, then time-blocks them into Remon's actual free time on the
calendar — respecting the standing rules in `.claude/rules/calendar.md` and
`.claude/rules/todoist.md`, which are already loaded as project instructions.
Don't restate or hardcode those rules here — they're the live source of truth
and Remon edits them independently of this skill.

## Step 1: Pin down scope

You need two things before touching any tool: **which Todoist project/list**,
and **what date range** to schedule into.

- If Remon's request already names both (e.g. "plan my Content pipeline tasks
  for this week"), use them directly.
- If either is missing, ask — but ask both missing things in a *single*
  question, not two round trips. Don't default silently; a wrong guess here
  means scheduling the wrong tasks.
- Resolve the project with `find-projects` (searchText) to get its `projectId`
  before querying tasks.

## Step 2: Pull the tasks

Use `find-tasks` with `projectId` set to the resolved project. This only
returns active (incomplete) tasks by default, so no extra filtering needed.
Per `todoist.md`, this is a read of the *specific list Remon asked about* —
not a full state pull, so it doesn't violate the "don't proactively poll my
whole Todoist state" rule.

## Step 3: Work out priority order

Highest-priority tasks get scheduled first (and into the best slots — earlier
in the window, before lower-priority ones eat the free time). Derive priority
in this order, stopping as soon as one gives you a clear signal:

1. **Todoist's own priority field.** If tasks have `p1`/`p2`/`p3` explicitly
   set, that's the ranking. (`p4`/unset means "no explicit priority", not
   "lowest" — don't treat it as a real signal.)
2. **The Goals list.** If priority is mixed or absent, pull Remon's Goals
   project from Todoist (see `todoist.md` → Important lists) and check which
   candidate tasks clearly serve a stated near-term goal vs. which don't.
   Tasks that map to an active goal outrank tasks that don't.
3. **Ask.** If you still can't tell — e.g. everything is unprioritized and
   nothing obviously maps to a goal — ask Remon to rank the tasks rather than
   guessing. Guessing at priority is worse than a quick question, since it
   determines which tasks get the good time slots and which get bumped.

## Step 4: Work out durations

Use each task's Todoist `duration` field if it's set. For any task missing a
duration, batch all of them into **one** question to Remon rather than asking
per-task ("How long do you expect each of these to take: A, B, C?").

## Step 5: Find real free time and build the schedule

1. Read existing events across the relevant window with `calendar_events`
   (action `read`) — check all calendars visible in Calendar.app, the same
   way `calendar.md`'s "am I free" rule does, not just primary. This is what
   makes "do not overwrite existing events" possible: you can only avoid a
   conflict you've actually seen.
2. Apply the constraints currently in `calendar.md` (working-hours window,
   bedtime cutoff, etc.) to the search — read that file's Constraints section
   fresh rather than relying on memory of past values, since Remon can change
   them independently.
3. Greedily place tasks into the remaining free gaps in priority order
   (highest first), each block sized to the task's duration plus a 15-minute
   buffer before the next block. A task never splits across two slots.
4. If a task doesn't fit anywhere in the requested range, don't drop it
   silently — carry it forward as "unscheduled" and say why (e.g. "no free
   slot large enough before Friday").

## Step 6: One batch confirmation

Per `calendar.md`, nothing gets created without Remon confirming first. Show
the *entire* proposed schedule in one message — not one confirmation per
event, that's a wasteful round trip for something this deterministic once
planned. For each proposed block show: task name, day/time, duration,
priority, and which calendar it'll land on (primary unless Remon named
another, per `calendar.md`'s default). List unscheduled tasks separately with
the reason. Wait for an explicit yes before creating anything.

## Step 7: Create the events

Once confirmed, create each block with `calendar_events` (action `create`),
one call per event:

- `title`: the task name (not prefixed).
- `note`: the task's priority (if any) and a link back to the Todoist task
  (`https://todoist.com/showTask?id=<taskId>`).
- `targetCalendar`: primary, or whatever Remon specified.
- `startDate` / `endDate`: the slot decided in Step 5.

Leave Todoist itself untouched — the calendar event is the single source of
truth for the scheduled time, so there's nothing to write back.

## Step 8: Final overview

Always close with a plain overview of what actually landed on the calendar —
task, day/time, duration — plus anything left unscheduled. This is the one
summary this skill should always give, even though `working-style.md`
otherwise says not to summarize by default: this summary is the confirmation
that Remon's actual calendar now matches what was agreed in Step 6.
