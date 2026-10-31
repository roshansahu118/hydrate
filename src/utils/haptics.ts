import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

async function safe(run: () => Promise<void>): Promise<void> {
  if (Platform.OS === "web") return;
  try {
    await run();
  } catch {
    // Haptics unavailable on some devices / simulators
  }
}

export function hapticLight(): void {
  void safe(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
}

export function hapticMedium(): void {
  void safe(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium));
}

export function hapticSuccess(): void {
  void safe(() =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  );
}

export function hapticWarning(): void {
  void safe(() =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  );
}
