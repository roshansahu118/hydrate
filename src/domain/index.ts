export type {
  DayKey,
  UserProfile,
  IntakeEntry,
  NotificationPrefs,
  ProfileUpdate,
} from "./types";

export {
  DEFAULT_DAILY_GOAL_ML,
  DEFAULT_QUICK_AMOUNTS_ML,
  DEFAULT_NOTIFICATION_PREFS,
  MIN_DAILY_GOAL_ML,
  MAX_DAILY_GOAL_ML,
  MIN_INTAKE_ML,
  MAX_INTAKE_ML,
  createDefaultProfile,
} from "./defaults";

export {
  toDayKey,
  dayKeyFromIso,
  isSameDay,
  formatTime,
  formatDayHeading,
} from "./dates";

export {
  parseDayKey,
  shiftDayKey,
  lastNDayKeys,
  buildDayTotals,
  averageDailyMl,
  bestDay,
  daysGoalMet,
  currentStreak,
  formatShortWeekday,
  formatDayMonth,
  hasAnyIntake,
} from "./history";
export type { DayTotal, HistoryRangeDays } from "./history";

export {
  createIntakeId,
  createIntakeEntry,
  clampIntakeMl,
  entriesForDay,
  totalMlForDay,
  progressTowardGoal,
  remainingMl,
  goalStatus,
  parseCustomAmountMl,
  groupEntriesByDay,
} from "./intake";
export type { GoalStatus } from "./intake";

export {
  clampDailyGoalMl,
  normalizeQuickAmounts,
  applyProfileUpdate,
  isProfileComplete,
} from "./profile";
