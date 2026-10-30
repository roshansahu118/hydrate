import {
  applyProfileUpdate,
  createDefaultProfile,
  type ProfileUpdate,
  type UserProfile,
} from "../domain";
import { loadJson, saveJson } from "./json";
import { STORAGE_KEYS } from "./keys";

function isUserProfile(value: unknown): value is UserProfile {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<UserProfile>;
  return (
    typeof candidate.name === "string" &&
    typeof candidate.dailyGoalMl === "number" &&
    Array.isArray(candidate.quickAmountsMl) &&
    typeof candidate.onboarded === "boolean" &&
    typeof candidate.createdAt === "string" &&
    typeof candidate.updatedAt === "string"
  );
}

export async function loadProfile(): Promise<UserProfile> {
  return loadJson(STORAGE_KEYS.profile, createDefaultProfile(), isUserProfile);
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  await saveJson(STORAGE_KEYS.profile, profile);
}

export async function updateStoredProfile(
  update: ProfileUpdate,
): Promise<UserProfile> {
  const current = await loadProfile();
  const next = applyProfileUpdate(current, update);
  await saveProfile(next);
  return next;
}
