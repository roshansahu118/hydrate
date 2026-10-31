export const REMINDER_INTERVAL_PRESETS_MIN = [
  1, 10, 15, 30, 45, 60, 90, 120,
] as const;

export type ReminderIntervalPreset =
  (typeof REMINDER_INTERVAL_PRESETS_MIN)[number];

export const MIN_REMINDER_INTERVAL_MIN = 1;
export const MAX_REMINDER_INTERVAL_MIN = 240;

export function clampReminderIntervalMinutes(minutes: number): number {
  if (!Number.isFinite(minutes)) {
    return 60;
  }
  return Math.min(
    MAX_REMINDER_INTERVAL_MIN,
    Math.max(MIN_REMINDER_INTERVAL_MIN, Math.round(minutes)),
  );
}
