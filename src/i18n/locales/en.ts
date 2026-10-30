type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export const en = {
  tabs: {
    home: "Home",
    history: "History",
    settings: "Settings",
  },
  onboarding: {
    stepLabel: "Step {{step}} of {{total}}",
    welcomeBrand: "Hydrate",
    welcomeTitle: "Build a simple water habit",
    welcomeBody:
      "Set a daily goal, log drinks in a tap, and keep your streak on this device.",
    welcomePoint1: "Personal daily goal",
    welcomePoint2: "Quick-add amounts on Home",
    welcomePoint3: "History saved locally",
    getStarted: "Get started",
    nameTitle: "What should we call you?",
    nameBody: "This stays on your device and shows up on Home.",
    nameLabel: "Your name",
    namePlaceholder: "e.g. Roshan",
    nameRequired: "Please enter your name",
    goalTitle: "Pick a daily goal",
    goalBody: "You can change this later in Settings.",
    goalValue: "{{goal}} ml",
    goalChip: "{{goal}} ml",
    goalHint: "Most adults aim for about 2–3 liters a day.",
    back: "Back",
    continue: "Continue",
    finish: "Start hydrating",
  },
  home: {
    title: "Hydrate",
    greeting: "Hi, {{name}}",
    subtitle: "Log drinks anytime — your progress saves automatically.",
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
    profileSubtitle: "Set during onboarding",
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
