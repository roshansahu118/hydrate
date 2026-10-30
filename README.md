# Hydrate

Water drink reminder app (React Native + Expo). Built module-wise.

## Modules

| Module | Status | Notes |
|--------|--------|-------|
| M0 Foundation | Done | Expo Router tabs shell |
| M1 Theme | Done | Light / dark / system + AppText |
| M2 i18n | Done | English / Hindi / system + LanguagePicker |
| M3 Reusable UI kit | Done | Button, Card, Chip, TextField, etc. |
| M4 Storage / domain | Done | Profile, intake, prefs + HydrateProvider |
| M5 Onboarding | Done | Welcome → name → goal; gated until done |
| M6 Home intake | Done | One-tap add, custom ml, undo, goal status |
| M7 Notifications | Done | Interval reminders + sound + quiet hours |
| M8 History + charts | Done | 7/14-day bars, stats, day drill-down |
| M9 Settings | Done | Goal, quick amounts, data reset, about |
| M10 Polish | Pending | |

## Run

```bash
cd hydrate
npm install
npm start
```

## M1 notes

- Theme tokens live in `src/theme/`
- Preference persisted via AsyncStorage (`light` \| `dark` \| `system`)
- Use `AppText` instead of raw `Text` so font family can be swapped later in `src/theme/typography.ts`

## M2 notes

- Strings live in `src/i18n/locales/` (`en`, `hi`)
- Preference persisted via AsyncStorage (`en` \| `hi` \| `system`)
- Use `useTranslation()` / `t('…')` for UI copy; add keys to both locale files when introducing new text

## M3 notes

- Shared primitives live in `src/components/ui/`
- Prefer kit components (`Button`, `Card`, `Chip`, `TextField`, `ListRow`, …) over one-off styled `View`/`Pressable`
- ThemeModePicker / LanguagePicker use `SegmentedControl`

## M4 notes

- Domain types/helpers live in `src/domain/` (`UserProfile`, `IntakeEntry`, day keys, totals)
- Persistence in `src/storage/` via AsyncStorage JSON (`profile`, `intakeEntries`, `notificationPrefs`)
- App state: `useHydrate()` from `src/data/HydrateProvider` — prefer this over ad-hoc storage reads in screens

## M5 notes

- Flow lives under `app/onboarding/` (welcome → name → goal)
- Root stack uses `Stack.Protected` on `profile.onboarded`
- Draft state: `OnboardingDraftProvider` in `src/onboarding/`; finish sets `onboarded: true` via `updateProfile`

## M6 notes

- Home intake UX: one-tap quick amounts, custom ml field, remaining/goal status, undo banner
- Helpers: `goalStatus`, `remainingMl`, `parseCustomAmountMl` in `src/domain/intake.ts`
- Home-only UI pieces in `src/home/`; use `useHydrate().addIntake` / `removeIntake`

## M7 notes

- Local reminders via `expo-notifications` (`src/notifications/`)
- Settings → Drink reminders: enable, interval presets (10–120 min) or custom minutes
- Quiet hours toggle (default `22:00`–`07:00`); turn off to test overnight
- **Send test reminder now** button for instant check; sound on; `ReminderSync` keeps schedule fresh
- **Not supported in browser** — use a phone; grant notification permission when enabling
- Custom sound: drop `.wav` in `assets/sounds/`, list it in `app.json` → `expo-notifications.sounds`, set filename in `src/notifications/sound.ts`, then **rebuild native** (`eas build` / `npx expo prebuild`). Expo Go cannot load your custom file.

## M8 notes

- History helpers in `src/domain/history.ts` (day totals, average, streak, goal days)
- UI in `src/history/` — View-based bar chart (no chart library), stats cards, selected-day entry list
- Range chips: 7 or 14 days; tap a bar to inspect that day

## M9 notes

- Settings sections in `src/settings/`: profile/goal/quick amounts, data actions, about
- `useHydrate()` also exposes `clearTodayIntake`, `clearAllIntake`, `resetOnboarding`
- Destructive actions use confirm alerts; replay onboarding flips `profile.onboarded`
