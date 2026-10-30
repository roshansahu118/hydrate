import { useState } from "react";
import { Platform, Switch, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useHydrate } from "../data";
import {
  REMINDER_INTERVAL_PRESETS_MIN,
  canUseCustomReminderSound,
  clampReminderIntervalMinutes,
  ensureReminderPermissions,
  sendTestReminder,
} from "../notifications";
import { useTheme } from "../theme";
import { AppText } from "./AppText";
import { Button, Card, Chip, SectionHeader, TextField } from "./ui";

export function ReminderSettings() {
  const { t } = useTranslation();
  const { colors, spacing } = useTheme();
  const { notificationPrefs, updateNotificationPrefs } = useHydrate();
  const [busy, setBusy] = useState(false);
  const [testing, setTesting] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  const [webBlocked, setWebBlocked] = useState(Platform.OS === "web");
  const [customMinutes, setCustomMinutes] = useState(
    String(notificationPrefs.intervalMinutes),
  );

  async function setEnabled(enabled: boolean) {
    setBusy(true);
    setPermissionError(false);
    setWebBlocked(false);
    try {
      if (enabled) {
        if (Platform.OS === "web") {
          setWebBlocked(true);
          return;
        }
        const granted = await ensureReminderPermissions();
        if (!granted) {
          setPermissionError(true);
          return;
        }
      }
      await updateNotificationPrefs({ enabled });
    } finally {
      setBusy(false);
    }
  }

  async function setIntervalMinutes(minutes: number) {
    const next = clampReminderIntervalMinutes(minutes);
    setCustomMinutes(String(next));
    await updateNotificationPrefs({ intervalMinutes: next });
  }

  async function handleTestReminder() {
    setTesting(true);
    setPermissionError(false);
    setWebBlocked(false);
    try {
      if (Platform.OS === "web") {
        setWebBlocked(true);
        return;
      }
      const granted = await ensureReminderPermissions();
      if (!granted) {
        setPermissionError(true);
        return;
      }
      await sendTestReminder({
        title: t("reminders.notificationTitle"),
        body: t("reminders.testNotificationBody"),
      });
    } finally {
      setTesting(false);
    }
  }

  return (
    <Card>
      <SectionHeader
        title={t("reminders.title")}
        subtitle={t("reminders.subtitle")}
      />

      {Platform.OS === "web" || webBlocked ? (
        <AppText variant="caption" color="danger">
          {t("reminders.webUnsupported")}
        </AppText>
      ) : null}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.md,
        }}
      >
        <View style={{ flex: 1, gap: spacing.xs }}>
          <AppText variant="bodyEmphasis">{t("reminders.toggleLabel")}</AppText>
          <AppText variant="caption" color="muted">
            {notificationPrefs.enabled
              ? t("reminders.enabledHint", {
                  minutes: notificationPrefs.intervalMinutes,
                })
              : t("reminders.disabledHint")}
          </AppText>
        </View>
        <Switch
          value={notificationPrefs.enabled}
          disabled={busy || Platform.OS === "web"}
          onValueChange={(value) => {
            void setEnabled(value);
          }}
          trackColor={{ false: colors.border, true: colors.accentMuted }}
          thumbColor={
            notificationPrefs.enabled ? colors.accent : colors.surfaceElevated
          }
        />
      </View>

      {permissionError ? (
        <AppText variant="caption" color="danger">
          {t("reminders.permissionDenied")}
        </AppText>
      ) : null}

      <View style={{ gap: spacing.sm }}>
        <AppText variant="label" color="secondary">
          {t("reminders.intervalLabel")}
        </AppText>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}
        >
          {REMINDER_INTERVAL_PRESETS_MIN.map((minutes) => (
            <Chip
              key={minutes}
              label={t("reminders.intervalChip", { minutes })}
              selected={notificationPrefs.intervalMinutes === minutes}
              onPress={() => {
                void setIntervalMinutes(minutes);
              }}
            />
          ))}
        </View>
      </View>

      <TextField
        label={t("reminders.customIntervalLabel")}
        placeholder={t("reminders.customIntervalPlaceholder")}
        value={customMinutes}
        onChangeText={setCustomMinutes}
        keyboardType="number-pad"
        returnKeyType="done"
        onSubmitEditing={() => {
          const parsed = Number(customMinutes);
          if (Number.isFinite(parsed)) {
            void setIntervalMinutes(parsed);
          }
        }}
      />
      <Button
        label={t("reminders.applyCustomInterval")}
        variant="secondary"
        onPress={() => {
          const parsed = Number(customMinutes);
          if (Number.isFinite(parsed)) {
            void setIntervalMinutes(parsed);
          }
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.md,
        }}
      >
        <View style={{ flex: 1, gap: spacing.xs }}>
          <AppText variant="bodyEmphasis">
            {t("reminders.quietHoursToggle")}
          </AppText>
          <AppText variant="caption" color="muted">
            {notificationPrefs.quietHoursEnabled
              ? t("reminders.quietHoursHint", {
                  start: notificationPrefs.quietHoursStart,
                  end: notificationPrefs.quietHoursEnd,
                })
              : t("reminders.quietHoursOffHint")}
          </AppText>
        </View>
        <Switch
          value={notificationPrefs.quietHoursEnabled}
          onValueChange={(value) => {
            void updateNotificationPrefs({ quietHoursEnabled: value });
          }}
          trackColor={{ false: colors.border, true: colors.accentMuted }}
          thumbColor={
            notificationPrefs.quietHoursEnabled
              ? colors.accent
              : colors.surfaceElevated
          }
        />
      </View>

      <Button
        label={t("reminders.testNow")}
        variant="primary"
        loading={testing}
        fullWidth
        onPress={() => {
          void handleTestReminder();
        }}
      />
      <AppText variant="caption" color="muted">
        {canUseCustomReminderSound()
          ? t("reminders.soundCustomActive")
          : t("reminders.soundHint")}
      </AppText>
    </Card>
  );
}
