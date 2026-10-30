import {
  DEFAULT_QUICK_AMOUNTS_ML,
  MAX_DAILY_GOAL_ML,
  MAX_QUICK_AMOUNTS,
  MIN_DAILY_GOAL_ML,
  MIN_QUICK_AMOUNTS,
} from "./defaults";
import type { ProfileUpdate, UserProfile } from "./types";

export function clampDailyGoalMl(goalMl: number): number {
  if (!Number.isFinite(goalMl)) {
    return MIN_DAILY_GOAL_ML;
  }
  return Math.min(
    MAX_DAILY_GOAL_ML,
    Math.max(MIN_DAILY_GOAL_ML, Math.round(goalMl)),
  );
}

export function normalizeQuickAmounts(amounts: number[]): number[] {
  const cleaned = amounts
    .map((value) => Math.round(value))
    .filter((value) => Number.isFinite(value) && value > 0);

  if (cleaned.length === 0) {
    return [...DEFAULT_QUICK_AMOUNTS_ML];
  }

  const unique = [...new Set(cleaned)].sort((a, b) => a - b);
  if (unique.length < MIN_QUICK_AMOUNTS) {
    return [...DEFAULT_QUICK_AMOUNTS_ML];
  }

  return unique.slice(0, MAX_QUICK_AMOUNTS);
}

export function toggleQuickAmount(
  current: number[],
  amountMl: number,
): number[] {
  const exists = current.includes(amountMl);
  if (exists) {
    if (current.length <= MIN_QUICK_AMOUNTS) {
      return current;
    }
    return normalizeQuickAmounts(current.filter((value) => value !== amountMl));
  }
  if (current.length >= MAX_QUICK_AMOUNTS) {
    return current;
  }
  return normalizeQuickAmounts([...current, amountMl]);
}

export function applyProfileUpdate(
  profile: UserProfile,
  update: ProfileUpdate,
  now = new Date(),
): UserProfile {
  return {
    ...profile,
    ...(update.name !== undefined ? { name: update.name.trim() } : {}),
    ...(update.dailyGoalMl !== undefined
      ? { dailyGoalMl: clampDailyGoalMl(update.dailyGoalMl) }
      : {}),
    ...(update.quickAmountsMl !== undefined
      ? { quickAmountsMl: normalizeQuickAmounts(update.quickAmountsMl) }
      : {}),
    ...(update.onboarded !== undefined ? { onboarded: update.onboarded } : {}),
    updatedAt: now.toISOString(),
  };
}

export function isProfileComplete(profile: UserProfile): boolean {
  return profile.onboarded && profile.name.trim().length > 0;
}
