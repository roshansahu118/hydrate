import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

import {
  canUseCustomReminderSound,
  getReminderChannelId,
  REMINDER_SOUND_FILE,
} from "./sound";

export { REMINDER_SOUND_FILE, getReminderChannelId };

async function ensureAndroidChannel(): Promise<void> {
  if (Platform.OS !== "android") return;

  const channelId = getReminderChannelId();
  const useCustom = canUseCustomReminderSound();

  try {
    await Notifications.setNotificationChannelAsync(channelId, {
      name: "Water reminders",
      importance: Notifications.AndroidImportance.HIGH,
      // Custom filename only exists after a native rebuild — not in Expo Go.
      ...(useCustom ? { sound: REMINDER_SOUND_FILE } : {}),
      vibrationPattern: [0, 250, 250, 250],
      enableVibrate: true,
      showBadge: true,
    });
  } catch (error) {
    console.warn("Failed to create reminder notification channel", error);
  }
}

export async function ensureReminderPermissions(): Promise<boolean> {
  if (Platform.OS === "web") {
    return false;
  }

  await ensureAndroidChannel();

  try {
    const current = await Notifications.getPermissionsAsync();
    if (
      current.granted ||
      current.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    ) {
      return true;
    }

    const requested = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });

    return (
      requested.granted ||
      requested.ios?.status ===
        Notifications.IosAuthorizationStatus.PROVISIONAL
    );
  } catch (error) {
    console.warn("Failed to request notification permissions", error);
    return false;
  }
}
