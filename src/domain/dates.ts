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

export function formatDayHeading(dayKey: DayKey, locale?: string): string {
  const today = toDayKey();
  const date = new Date(
    Number(dayKey.slice(0, 4)),
    Number(dayKey.slice(5, 7)) - 1,
    Number(dayKey.slice(8, 10)),
  );
  if (dayKey === today) {
    return date.toLocaleDateString(locale, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  }
  return date.toLocaleDateString(locale, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}
