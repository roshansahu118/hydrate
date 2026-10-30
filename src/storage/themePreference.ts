import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_KEYS } from "./keys";
import type { ThemeMode } from "../theme/types";

const VALID_MODES: ThemeMode[] = ["light", "dark", "system"];

export async function loadThemeMode(): Promise<ThemeMode> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.themeMode);
    if (value && VALID_MODES.includes(value as ThemeMode)) {
      return value as ThemeMode;
    }
  } catch {
    // Fall through to default
  }
  return "system";
}

export async function saveThemeMode(mode: ThemeMode): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.themeMode, mode);
  } catch {
    // Persistence failure should not crash the app
  }
}
