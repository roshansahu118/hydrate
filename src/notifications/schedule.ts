import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

import type { NotificationPrefs } from "../domain";
import { clampReminderIntervalMinutes } from "./intervals";
import { REMINDER_CHANNEL_ID } from "./permissions";
import { isInQuietHours } from "./quietHours";

export const REMINDER_NOTIFICATION_DATA = {
  type: "hydrate-reminder",
} as const;

const MAX_SCHEDULED = 32;

export type ReminderCopy = {
  title: string;
  body: string;
};

function buildFireDates(prefs: NotificationPrefs, now = new Date()): Date[] {
  const intervalMs =
    clampReminderIntervalMinutes(prefs.intervalMinutes) * 60 * 1000;
  const dates: Date[] = [];
  let cursor = new Date(now.getTime() + intervalMs);
  const horizon = now.getTime() + 3 * 24 * 60 * 60 * 1000;
  let guard = 0;

  while (dates.length < MAX_SCHEDULED && cursor.getTime() <= horizon && guard < 500) {
    guard += 1;
    const blockedByQuietHours =
      prefs.quietHoursEnabled &&
      isInQuietHours(cursor, prefs.quietHoursStart, prefs.quietHoursEnd);

    if (!blockedByQuietHours) {
      dates.push(new Date(cursor));
    }
    cursor = new Date(cursor.getTime() + intervalMs);
  }

  return dates;
}

export async function cancelHydrateReminders(): Promise<void> {
  if (Platform.OS === "web") return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function syncHydrateReminders(
  prefs: NotificationPrefs,
  copy: ReminderCopy,
): Promise<{ scheduled: number }> {
  if (Platform.OS === "web") {
    return { scheduled: 0 };
  }

  try {
    await cancelHydrateReminders();

    if (!prefs.enabled) {
      return { scheduled: 0 };
    }

    const dates = buildFireDates(prefs);

    await Promise.all(
      dates.map((date) =>
        Notifications.scheduleNotificationAsync({
          content: {
            title: copy.title,
            body: copy.body,
            sound: "default",
            data: { ...REMINDER_NOTIFICATION_DATA },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date,
            ...(Platform.OS === "android"
              ? { channelId: REMINDER_CHANNEL_ID }
              : {}),
          },
        }),
      ),
    );

    return { scheduled: dates.length };
  } catch (error) {
    console.warn("Failed to sync hydrate reminders", error);
    return { scheduled: 0 };
  }
}

/** Fires one immediate reminder — handy for night-time / device testing. */
export async function sendTestReminder(copy: ReminderCopy): Promise<boolean> {
  if (Platform.OS === "web") {
    return false;
  }

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: copy.title,
        body: copy.body,
        sound: "default",
        data: { ...REMINDER_NOTIFICATION_DATA, test: true },
      },
      trigger:
        Platform.OS === "android"
          ? {
              type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
              seconds: 1,
              channelId: REMINDER_CHANNEL_ID,
            }
          : null,
    });
    return true;
  } catch (error) {
    console.warn("Failed to send test reminder", error);
    return false;
  }
}
