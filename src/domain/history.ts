import { dayKeyFromIso, toDayKey } from "./dates";
import { totalMlForDay } from "./intake";
import type { DayKey, IntakeEntry } from "./types";

export type DayTotal = {
  dayKey: DayKey;
  totalMl: number;
  entryCount: number;
};

export type HistoryRangeDays = 7 | 14;

export function parseDayKey(dayKey: DayKey): Date {
  const [y, m, d] = dayKey.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function shiftDayKey(dayKey: DayKey, deltaDays: number): DayKey {
  const date = parseDayKey(dayKey);
  date.setDate(date.getDate() + deltaDays);
  return toDayKey(date);
}

export function lastNDayKeys(
  count: number,
  endDayKey: DayKey = toDayKey(),
): DayKey[] {
  const keys: DayKey[] = [];
  for (let i = count - 1; i >= 0; i -= 1) {
    keys.push(shiftDayKey(endDayKey, -i));
  }
  return keys;
}

export function buildDayTotals(
  entries: IntakeEntry[],
  dayKeys: DayKey[],
): DayTotal[] {
  return dayKeys.map((dayKey) => {
    const dayEntries = entries.filter(
      (entry) => dayKeyFromIso(entry.createdAt) === dayKey,
    );
    return {
      dayKey,
      totalMl: totalMlForDay(entries, dayKey),
      entryCount: dayEntries.length,
    };
  });
}

export function averageDailyMl(totals: DayTotal[]): number {
  if (totals.length === 0) return 0;
  const sum = totals.reduce((acc, day) => acc + day.totalMl, 0);
  return Math.round(sum / totals.length);
}

export function bestDay(totals: DayTotal[]): DayTotal | null {
  if (totals.length === 0) return null;
  return totals.reduce((best, day) =>
    day.totalMl > best.totalMl ? day : best,
  );
}

export function daysGoalMet(totals: DayTotal[], goalMl: number): number {
  return totals.filter((day) => day.totalMl >= goalMl).length;
}

/** Consecutive days ending today (or end of range) that met the goal. */
export function currentStreak(
  totals: DayTotal[],
  goalMl: number,
): number {
  let streak = 0;
  for (let i = totals.length - 1; i >= 0; i -= 1) {
    if (totals[i].totalMl >= goalMl) {
      streak += 1;
    } else {
      break;
    }
  }
  return streak;
}

export function formatShortWeekday(dayKey: DayKey, locale?: string): string {
  return parseDayKey(dayKey).toLocaleDateString(locale, { weekday: "short" });
}

export function formatDayMonth(dayKey: DayKey, locale?: string): string {
  return parseDayKey(dayKey).toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
  });
}

export function hasAnyIntake(totals: DayTotal[]): boolean {
  return totals.some((day) => day.totalMl > 0);
}
