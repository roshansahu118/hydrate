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
    subtitle: "Intake is saved on device. Onboarding polish comes next.",
    todayProgress: "Today's progress",
    progressLabel: "{{current}} / {{goal}} ml",
    quickAdd: "Quick add",
    addWater: "Add water",
    mlAmount: "{{amount}} ml",
  },
  history: {
    title: "History",
    subtitle: "Today's logs from storage. Charts land in M8.",
    emptyTitle: "No drinks logged today",
    emptyDescription: "Add water from Home — entries persist on this device.",
    emptyAction: "Go hydrate",
    todayTitle: "Today",
    todayTotal: "{{total}} ml logged",
    entryAmount: "{{amount}} ml",
    remove: "Undo",
  },
  settings: {
    title: "Settings",
    subtitle: "Appearance, language, and stored profile.",
    theme: "Theme",
    preference: "Preference: {{mode}} · Resolved: {{scheme}}",
    language: "Language",
    languagePreference: "Preference: {{locale}} · Resolved: {{language}}",
    profile: "Profile",
    profileSubtitle: "Saved via AsyncStorage (M4)",
    sampleName: "Display name",
    sampleNamePlaceholder: "Your name",
    notificationsRow: "Notifications",
    notificationsOff: "Off — reminders arrive in M7",
    notificationsOn: "Every {{minutes}} min",
    dailyGoalRow: "Daily goal",
    dailyGoalValue: "{{goal}} ml",
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
