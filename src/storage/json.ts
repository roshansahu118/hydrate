import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadJson<T>(
  key: string,
  fallback: T,
  validate?: (value: unknown) => value is T,
): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (validate && !validate(parsed)) return fallback;
    return parsed as T;
  } catch {
    return fallback;
  }
}

export async function saveJson<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Persistence failure should not crash the app
  }
}
