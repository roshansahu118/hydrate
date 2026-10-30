/** Parse HH:mm into minutes from midnight. */
export function parseTimeToMinutes(value: string): number {
  const [hoursRaw, minutesRaw] = value.split(":");
  const hours = Number(hoursRaw);
  const minutes = Number(minutesRaw);
  if (
    !Number.isFinite(hours) ||
    !Number.isFinite(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return 0;
  }
  return hours * 60 + minutes;
}

/**
 * Quiet hours may wrap overnight (e.g. 22:00 → 07:00).
 */
export function isInQuietHours(
  date: Date,
  quietHoursStart: string,
  quietHoursEnd: string,
): boolean {
  const minutes = date.getHours() * 60 + date.getMinutes();
  const start = parseTimeToMinutes(quietHoursStart);
  const end = parseTimeToMinutes(quietHoursEnd);

  if (start === end) {
    return false;
  }

  if (start < end) {
    return minutes >= start && minutes < end;
  }

  return minutes >= start || minutes < end;
}
