# Hydrate

Water drink reminder app (React Native + Expo). Built module-wise.

## Modules

| Module | Status | Notes |
|--------|--------|-------|
| M0 Foundation | Done | Expo Router tabs shell |
| M1 Theme | Done | Light / dark / system + AppText |
| M2 i18n | Pending | |
| M3 Reusable UI kit | Pending | |
| M4 Storage / domain | Pending | |
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
