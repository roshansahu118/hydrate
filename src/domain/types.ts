/** Local calendar day key: YYYY-MM-DD */
export type DayKey = string;

export type UserProfile = {
  name: string;
  dailyGoalMl: number;
  quickAmountsMl: number[];
  onboarded: boolean;
  createdAt: string;
  updatedAt: string;
};

export type IntakeEntry = {
  id: string;
  amountMl: number;
  createdAt: string;
  note?: string;
};

export type NotificationPrefs = {
  enabled: boolean;
  /** Minutes between reminders when enabled. */
  intervalMinutes: number;
  /** Local time HH:mm */
  quietHoursStart: string;
  /** Local time HH:mm */
  quietHoursEnd: string;
};

export type ProfileUpdate = Partial<
  Pick<UserProfile, "name" | "dailyGoalMl" | "quickAmountsMl" | "onboarded">
>;
