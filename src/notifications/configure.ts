import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

let configured = false;

/** Show alerts + play sound even while the app is open. */
export function configureNotificationHandler(): void {
  if (configured || Platform.OS === "web") return;
  configured = true;

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}
