import Constants, { ExecutionEnvironment } from "expo-constants";

/**
 * Custom reminder sound (base filename only).
 *
 * 1. Put a .wav at `assets/sounds/hydrate_drip.wav` (or change this name)
 * 2. List the same path under expo-notifications `sounds` in app.json
 * 3. Rebuild native app (`npx expo run:android` / EAS) — Expo Go cannot play this file
 *
 * Android: channel must use the same sound (see permissions.ts).
 * iOS: content.sound uses this filename.
 */
export const REMINDER_SOUND_FILE = "hydrate_drip.wav";

/**
 * Bump when sound/channel options change — Android caches channel sound forever.
 * Use a separate id for Expo Go (no custom sound bundled).
 */
export const REMINDER_CHANNEL_ID_CUSTOM = "hydrate-reminders-custom-v1";
export const REMINDER_CHANNEL_ID_DEFAULT = "hydrate-reminders-default-v1";

export function isExpoGo(): boolean {
  return (
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient
  );
}

/** True only in a native build that includes `app.json` plugin sounds. */
export function canUseCustomReminderSound(): boolean {
  return !isExpoGo();
}

export function getReminderChannelId(): string {
  return canUseCustomReminderSound()
    ? REMINDER_CHANNEL_ID_CUSTOM
    : REMINDER_CHANNEL_ID_DEFAULT;
}

/**
 * Expo Go: system default sound.
 * Dev/prod build: custom `hydrate_drip.wav`.
 */
export function getReminderSound(): string | boolean {
  return canUseCustomReminderSound() ? REMINDER_SOUND_FILE : "default";
}

/** @deprecated prefer getReminderChannelId() */
export const REMINDER_CHANNEL_ID = REMINDER_CHANNEL_ID_CUSTOM;
