import { isSameDay, toDayKey } from "./dates";
import { MAX_INTAKE_ML, MIN_INTAKE_ML } from "./defaults";
import type { DayKey, IntakeEntry } from "./types";

export function createIntakeId(now = Date.now()): string {
  return `${now}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createIntakeEntry(
  amountMl: number,
  note?: string,
  now = new Date(),
): IntakeEntry {
  return {
    id: createIntakeId(now.getTime()),
    amountMl,
    createdAt: now.toISOString(),
    ...(note ? { note } : {}),
  };
}

export function clampIntakeMl(amountMl: number): number {
  if (!Number.isFinite(amountMl)) {
    return MIN_INTAKE_ML;
  }
  return Math.min(MAX_INTAKE_ML, Math.max(MIN_INTAKE_ML, Math.round(amountMl)));
}

export function entriesForDay(
  entries: IntakeEntry[],
  dayKey: DayKey = toDayKey(),
): IntakeEntry[] {
  return entries
    .filter((entry) => isSameDay(entry.createdAt, dayKey))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function totalMlForDay(
  entries: IntakeEntry[],
  dayKey: DayKey = toDayKey(),
): number {
  return entriesForDay(entries, dayKey).reduce(
    (sum, entry) => sum + entry.amountMl,
    0,
  );
}

export function progressTowardGoal(totalMl: number, goalMl: number): number {
  if (goalMl <= 0) return 0;
  return Math.max(0, Math.min(1, totalMl / goalMl));
}

export function remainingMl(totalMl: number, goalMl: number): number {
  return Math.max(0, goalMl - totalMl);
}

export type GoalStatus = "empty" | "in_progress" | "reached" | "exceeded";

export function goalStatus(totalMl: number, goalMl: number): GoalStatus {
  if (totalMl <= 0) return "empty";
  if (totalMl < goalMl) return "in_progress";
  if (totalMl === goalMl) return "reached";
  return "exceeded";
}

export function parseCustomAmountMl(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const value = Number(trimmed);
  if (!Number.isFinite(value)) return null;
  return clampIntakeMl(value);
}

export function groupEntriesByDay(
  entries: IntakeEntry[],
): Record<DayKey, IntakeEntry[]> {
  return entries.reduce<Record<DayKey, IntakeEntry[]>>((acc, entry) => {
    const key = toDayKey(new Date(entry.createdAt));
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {});
}
