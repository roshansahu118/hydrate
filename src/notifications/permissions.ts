import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

export const REMINDER_CHANNEL_ID = "hydrate-reminders";

async function ensureAndroidChannel(): Promise<void> {
  if (Platform.OS !== "android") return;

  try {
    // Keep this minimal — extra enum fields have caused NPEs in Expo Go.
    await Notifications.setNotificationChannelAsync(REMINDER_CHANNEL_ID, {
      name: "Water reminders",
      importance: Notifications.AndroidImportance.HIGH,
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
