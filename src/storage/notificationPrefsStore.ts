import {
  DEFAULT_NOTIFICATION_PREFS,
  type NotificationPrefs,
} from "../domain";
import { loadJson, saveJson } from "./json";
import { STORAGE_KEYS } from "./keys";

function normalizePrefs(value: unknown): NotificationPrefs | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<NotificationPrefs>;
  if (
    typeof candidate.enabled !== "boolean" ||
    typeof candidate.intervalMinutes !== "number" ||
    typeof candidate.quietHoursStart !== "string" ||
    typeof candidate.quietHoursEnd !== "string"
  ) {
    return null;
  }

  return {
    enabled: candidate.enabled,
    intervalMinutes: candidate.intervalMinutes,
    quietHoursEnabled:
      typeof candidate.quietHoursEnabled === "boolean"
        ? candidate.quietHoursEnabled
        : DEFAULT_NOTIFICATION_PREFS.quietHoursEnabled,
    quietHoursStart: candidate.quietHoursStart,
    quietHoursEnd: candidate.quietHoursEnd,
  };
}

export async function loadNotificationPrefs(): Promise<NotificationPrefs> {
  try {
    const raw = await loadJson<unknown>(
      STORAGE_KEYS.notificationPrefs,
      DEFAULT_NOTIFICATION_PREFS,
    );
    return normalizePrefs(raw) ?? DEFAULT_NOTIFICATION_PREFS;
  } catch {
    return DEFAULT_NOTIFICATION_PREFS;
  }
}

export async function saveNotificationPrefs(
  prefs: NotificationPrefs,
): Promise<void> {
  await saveJson(STORAGE_KEYS.notificationPrefs, prefs);
}
