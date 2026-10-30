import {
  DEFAULT_NOTIFICATION_PREFS,
  type NotificationPrefs,
} from "../domain";
import { loadJson, saveJson } from "./json";
import { STORAGE_KEYS } from "./keys";

function isNotificationPrefs(value: unknown): value is NotificationPrefs {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<NotificationPrefs>;
  return (
    typeof candidate.enabled === "boolean" &&
    typeof candidate.intervalMinutes === "number" &&
    typeof candidate.quietHoursStart === "string" &&
    typeof candidate.quietHoursEnd === "string"
  );
}

export async function loadNotificationPrefs(): Promise<NotificationPrefs> {
  return loadJson(
    STORAGE_KEYS.notificationPrefs,
    DEFAULT_NOTIFICATION_PREFS,
    isNotificationPrefs,
  );
}

export async function saveNotificationPrefs(
  prefs: NotificationPrefs,
): Promise<void> {
  await saveJson(STORAGE_KEYS.notificationPrefs, prefs);
}
