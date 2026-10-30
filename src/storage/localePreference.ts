import AsyncStorage from "@react-native-async-storage/async-storage";

import { LOCALE_MODES, type LocaleMode } from "../i18n/types";
import { STORAGE_KEYS } from "./keys";

export async function loadLocaleMode(): Promise<LocaleMode> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.localeMode);
    if (value && LOCALE_MODES.includes(value as LocaleMode)) {
      return value as LocaleMode;
    }
  } catch {
    // Fall through to default
  }
  return "system";
}

export async function saveLocaleMode(mode: LocaleMode): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.localeMode, mode);
  } catch {
    // Persistence failure should not crash the app
  }
}
