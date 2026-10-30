import type { DayKey } from "./types";

/** Local calendar day as YYYY-MM-DD. */
export function toDayKey(date: Date = new Date()): DayKey {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function dayKeyFromIso(iso: string): DayKey {
  return toDayKey(new Date(iso));
}

export function isSameDay(iso: string, dayKey: DayKey = toDayKey()): boolean {
  return dayKeyFromIso(iso) === dayKey;
}

export function formatTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}
