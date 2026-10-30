export type AppLanguage = "en" | "hi";

/** User preference: follow device, or lock to a language. */
export type LocaleMode = AppLanguage | "system";

export const APP_LANGUAGES: AppLanguage[] = ["en", "hi"];
export const LOCALE_MODES: LocaleMode[] = ["en", "hi", "system"];
