#!/usr/bin/env node
// Generates knowledge/liturgical-calendar/YYYY-MM.md files from romcal's
// General Roman Calendar (saints, feast ranks, seasons, colors).
//
// Usage:
//   node scripts/generate-liturgical-calendar.js            # current + next year
//   node scripts/generate-liturgical-calendar.js 2027       # a single year
//   node scripts/generate-liturgical-calendar.js 2027 2028  # multiple years
//
// Re-running for a year overwrites that year's month files in place, so it's
// safe to run repeatedly without producing duplicates.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Romcal } from 'romcal';
import { GeneralRoman_En } from '@romcal/calendar.general-roman';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'knowledge', 'liturgical-calendar');

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function describeDay(entries) {
  const [primary, ...rest] = entries;
  const celebration = primary.name;
  const optional = rest.filter((e) => e.isOptional).map((e) => e.name);
  const celebrationCell = optional.length
    ? `${celebration} *(opt: ${optional.join('; ')})*`
    : celebration;

  const rank = capitalize(primary.rankName);
  const season = primary.seasonNames.join(', ');
  const color = primary.colorNames.map(capitalize).join(', ');

  return { celebrationCell, rank, season, color };
}

async function generateYear(year) {
  const romcal = new Romcal({ localizedCalendar: GeneralRoman_En });
  const calendar = await romcal.generateCalendar(year);

  const byMonth = new Map();
  for (const [dateStr, entries] of Object.entries(calendar)) {
    const month = Number(dateStr.slice(5, 7));
    if (!byMonth.has(month)) byMonth.set(month, []);
    byMonth.get(month).push([dateStr, entries]);
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const [month, days] of byMonth) {
    days.sort(([a], [b]) => a.localeCompare(b));

    const rows = days.map(([dateStr, entries]) => {
      const weekday = WEEKDAY_NAMES[new Date(`${dateStr}T00:00:00Z`).getUTCDay()];
      const { celebrationCell, rank, season, color } = describeDay(entries);
      return `| ${dateStr} (${weekday}) | ${celebrationCell} | ${rank} | ${season} | ${color} |`;
    });

    const monthStr = String(month).padStart(2, '0');
    const content = `---
type: liturgical-calendar
year: ${year}
month: ${month}
---

# ${MONTH_NAMES[month - 1]} ${year} — Liturgical Calendar

| Date | Celebration | Rank | Season | Color |
|---|---|---|---|---|
${rows.join('\n')}
`;

    const filePath = join(OUTPUT_DIR, `${year}-${monthStr}.md`);
    writeFileSync(filePath, content);
    console.log(`wrote ${filePath}`);
  }
}

const yearArgs = process.argv.slice(2).map(Number).filter(Number.isInteger);
const currentYear = new Date().getFullYear();
const years = yearArgs.length ? yearArgs : [currentYear, currentYear + 1];

for (const year of years) {
  await generateYear(year);
}
