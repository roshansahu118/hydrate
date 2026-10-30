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
    subtitle: "M3 UI kit demo — intake logging comes in a later module.",
    todayProgress: "Today's progress",
    progressLabel: "{{current}} / {{goal}} ml",
    quickAdd: "Quick add",
    addWater: "Add water",
    ml250: "250 ml",
    ml500: "500 ml",
    ml750: "750 ml",
  },
  history: {
    title: "History",
    subtitle: "Charts land in M8. Empty state uses the shared UI kit.",
    emptyTitle: "No history yet",
    emptyDescription: "Logged drinks will show up here once intake is live.",
    emptyAction: "Go hydrate",
  },
  settings: {
    title: "Settings",
    subtitle: "Appearance, language, and UI kit building blocks.",
    theme: "Theme",
    preference: "Preference: {{mode}} · Resolved: {{scheme}}",
    language: "Language",
    languagePreference: "Preference: {{locale}} · Resolved: {{language}}",
    kitPreview: "UI kit preview",
    kitPreviewSubtitle: "Primitives for later modules",
    sampleName: "Display name",
    sampleNamePlaceholder: "Your name",
    primaryAction: "Primary",
    secondaryAction: "Secondary",
    notificationsRow: "Notifications",
    notificationsRowSubtitle: "Reminders arrive in M7",
    dailyGoalRow: "Daily goal",
    dailyGoalRowSubtitle: "Set during onboarding",
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
