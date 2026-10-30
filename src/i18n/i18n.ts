import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./locales/en";
import { hi } from "./locales/hi";
import type { AppLanguage } from "./types";

export const resources = {
  en: { translation: en },
  hi: { translation: hi },
} as const;

export function getDeviceLanguage(): AppLanguage {
  const tag = Localization.getLocales()[0]?.languageCode ?? "en";
  return tag === "hi" ? "hi" : "en";
}

void i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: "en",
  compatibilityJSON: "v4",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
