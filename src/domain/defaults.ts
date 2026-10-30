import type { NotificationPrefs, UserProfile } from "./types";

export const DEFAULT_DAILY_GOAL_ML = 2500;
export const DEFAULT_QUICK_AMOUNTS_ML = [250, 500, 750] as const;
export const QUICK_AMOUNT_OPTIONS_ML = [
  100, 150, 200, 250, 300, 350, 500, 750, 1000,
] as const;
export const MIN_QUICK_AMOUNTS = 2;
export const MAX_QUICK_AMOUNTS = 4;
export const MIN_DAILY_GOAL_ML = 500;
export const MAX_DAILY_GOAL_ML = 6000;
export const MIN_INTAKE_ML = 50;
export const MAX_INTAKE_ML = 2000;

export const DEFAULT_NOTIFICATION_PREFS: NotificationPrefs = {
  enabled: false,
  intervalMinutes: 60,
  quietHoursEnabled: true,
  quietHoursStart: "22:00",
  quietHoursEnd: "07:00",
};

export function createDefaultProfile(now = new Date()): UserProfile {
  const iso = now.toISOString();
  return {
    name: "",
    dailyGoalMl: DEFAULT_DAILY_GOAL_ML,
    quickAmountsMl: [...DEFAULT_QUICK_AMOUNTS_ML],
    onboarded: false,
    createdAt: iso,
    updatedAt: iso,
  };
}
