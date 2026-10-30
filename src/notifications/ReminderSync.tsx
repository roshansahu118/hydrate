import { useEffect } from "react";
import { AppState, Platform } from "react-native";
import { useTranslation } from "react-i18next";

import { useHydrate } from "../data";
import { configureNotificationHandler } from "./configure";
import { syncHydrateReminders } from "./schedule";

/**
 * Keeps local reminder notifications aligned with saved prefs.
 * Reschedules when prefs change and when the app returns to foreground.
 */
export function ReminderSync() {
  const { t } = useTranslation();
  const { isReady, notificationPrefs } = useHydrate();

  useEffect(() => {
    configureNotificationHandler();
  }, []);

  useEffect(() => {
    if (!isReady || Platform.OS === "web") return;

    const copy = {
      title: t("reminders.notificationTitle"),
      body: t("reminders.notificationBody"),
    };

    void syncHydrateReminders(notificationPrefs, copy);

    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        void syncHydrateReminders(notificationPrefs, copy);
      }
    });

    return () => sub.remove();
  }, [isReady, notificationPrefs, t]);

  return null;
}
