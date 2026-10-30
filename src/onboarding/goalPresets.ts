export const ONBOARDING_GOAL_PRESETS_ML = [2000, 2500, 3000, 3500] as const;

export type OnboardingGoalPreset =
  (typeof ONBOARDING_GOAL_PRESETS_ML)[number];
