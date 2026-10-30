type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export const en = {
  tabs: {
    home: "Home",
    history: "History",
    settings: "Settings",
  },
  home: {
    title: "Hydrate",
    subtitle: "M2 i18n demo — Home shell. Intake logging comes in a later module.",
    activeScheme: "Active scheme",
    dark: "Dark",
    light: "Light",
    changeThemeHint:
      "Change theme from the Settings tab. Preference is saved on device.",
  },
  history: {
    title: "History",
    subtitle:
      "Charts land in M8. This screen only proves theme + language for now.",
    chartPlaceholder: "Chart placeholder",
  },
  settings: {
    title: "Settings",
    subtitle: "Appearance and language. Goals come in later modules.",
    theme: "Theme",
    preference: "Preference: {{mode}} · Resolved: {{scheme}}",
    language: "Language",
    languagePreference: "Preference: {{locale}} · Resolved: {{language}}",
    typographyCheck: "Typography check",
    display: "Display",
    titleSample: "Title",
    subtitleSample: "Subtitle",
    bodySample: "Body text uses AppText.",
    bodyEmphasisSample: "Body emphasis",
    captionSample: "Caption / muted",
  },
  theme: {
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  language: {
    en: "English",
    hi: "Hindi",
    system: "System",
  },
} as const;

/** Shared shape for all locale files — values are strings, keys match `en`. */
export type TranslationResources = DeepStringify<typeof en>;
