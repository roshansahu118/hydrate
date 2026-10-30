# Reminder sounds

- Prefer **`.wav`** (short, mono, ~22kHz is fine).
- Android `res/raw` name rules: lowercase letters, numbers, underscores only  
  (e.g. `hydrate_drip.wav` ✅, `Hydrate Drip.wav` ❌).
- Wire the path in `app.json` under `expo-notifications` → `sounds`.
- Use **only the base filename** in code (`hydrate_drip.wav`) — see `src/notifications/sound.ts`.
- Custom sounds require a **dev client / EAS / prebuild** install. Expo Go will fall back / ignore your file.
