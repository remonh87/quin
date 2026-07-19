# Aquinas

A personal AI assistant / second brain built on [Claude Code](https://code.claude.com), named after St. Thomas Aquinas — patron saint of scholars and students.

Aquinas acts as a task manager, knowledge base, and technical collaborator, backed by an [Obsidian](https://obsidian.md) vault for notes and a [Todoist](https://todoist.com) integration for task management.

## Structure

```
.
├── CLAUDE.md              # Entry point — loads rules automatically
├── .claude/
│   └── rules/
│       ├── identity.md        # Who Aquinas is and how it should behave
│       ├── knowledge.md       # How to use the Obsidian vault
│       ├── todoist.md         # Task management conventions
│       └── working-style.md   # General working preferences
└── knowledge/              # Obsidian vault — notes, projects, reference material
```

## Setup

### 1. Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Requires Node 18+. Authenticate with your Claude.ai account when prompted.

### 2. Clone this repo and start a session

```bash
git clone <this-repo-url>
cd aquinas
claude
```

Claude Code will automatically load `CLAUDE.md` and everything under `.claude/rules/`.

### 3. Connect Todoist (MCP)

```bash
claude mcp add --transport http todoist https://mcp.todoist.com
```

Then inside a session, run `/mcp`, select Todoist, and sign in via OAuth. **Start a new session afterward** — MCP servers only load at session start.

### 4. (Optional) Enable a sound notification when Aquinas finishes a task

Add to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "Notification": [
      {
        "hooks": [{ "type": "command", "command": "afplay /System/Library/Sounds/Glass.aiff" }]
      }
    ]
  }
}
```

Swap `Glass.aiff` for any sound in `/System/Library/Sounds/`. Ghostty, Kitty, and iTerm2 also get a desktop notification for free with no extra config.

## Knowledge base

The `knowledge/` folder is a standard Obsidian vault — markdown files with YAML frontmatter and `[[wikilinks]]`. Aquinas treats it as the primary source of truth for ongoing projects and reference notes, and will follow relevant links when reading, but won't pull in the whole vault for simple questions.

### Liturgical calendar

`knowledge/liturgical-calendar/` holds saints' feast days, liturgical seasons, and colors, generated from the [romcal](https://github.com/romcal/romcal) General Roman Calendar as one markdown file per month (`YYYY-MM.md`).

Install dependencies once:

```bash
npm install
```

Regenerate the current year and next year (safe to re-run — overwrites existing month files rather than duplicating them):

```bash
npm run generate:liturgical-calendar
```

Generate specific year(s) instead (e.g. once a year, to add the upcoming year):

```bash
npm run generate:liturgical-calendar -- 2028
```

To automate this yearly, add a cron entry that runs each December and generates the coming year:

```cron
0 3 1 12 * cd /Users/remon/quin && /usr/local/bin/node scripts/generate-liturgical-calendar.js $(($(date +%Y)+1))
```

## Rules

Behavior is split across `.claude/rules/` so `CLAUDE.md` itself stays minimal:

| File | Covers |
|---|---|
| `identity.md` | Name, role, and background context |
| `knowledge.md` | How to read and write to the Obsidian vault |
| `todoist.md` | Batching, confirmation rules, and default project handling |
| `working-style.md` | Token-consciousness, notification behavior, response style |

Run `/context` in a session to confirm all rule files are loading correctly.

## License

Personal project — no license specified.