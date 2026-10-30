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
| M5 Onboarding | Pending | |
| M6 Home intake | Pending | |
| M7 Notifications | Pending | |
| M8 History + charts | Pending | |
| M9 Settings | Pending | |
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
