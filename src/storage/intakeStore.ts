import type { IntakeEntry } from "../domain";
import { loadJson, saveJson } from "./json";
import { STORAGE_KEYS } from "./keys";

function isIntakeEntry(value: unknown): value is IntakeEntry {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<IntakeEntry>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.amountMl === "number" &&
    typeof candidate.createdAt === "string"
  );
}

function isIntakeEntryList(value: unknown): value is IntakeEntry[] {
  return Array.isArray(value) && value.every(isIntakeEntry);
}

export async function loadIntakeEntries(): Promise<IntakeEntry[]> {
  return loadJson(STORAGE_KEYS.intakeEntries, [], isIntakeEntryList);
}

export async function saveIntakeEntries(entries: IntakeEntry[]): Promise<void> {
  await saveJson(STORAGE_KEYS.intakeEntries, entries);
}

export async function appendIntakeEntry(
  entry: IntakeEntry,
): Promise<IntakeEntry[]> {
  const entries = await loadIntakeEntries();
  const next = [entry, ...entries];
  await saveIntakeEntries(next);
  return next;
}

export async function removeIntakeEntry(id: string): Promise<IntakeEntry[]> {
  const entries = await loadIntakeEntries();
  const next = entries.filter((entry) => entry.id !== id);
  await saveIntakeEntries(next);
  return next;
}

export async function clearAllIntakeEntries(): Promise<void> {
  await saveIntakeEntries([]);
}
