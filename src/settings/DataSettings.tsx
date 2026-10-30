import { Alert, View } from "react-native";
import { useTranslation } from "react-i18next";

import { Button, Card, SectionHeader } from "../components/ui";
import { useHydrate } from "../data";
import { useTheme } from "../theme";

export function DataSettings() {
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const {
    todayEntries,
    entries,
    clearTodayIntake,
    clearAllIntake,
    resetOnboarding,
  } = useHydrate();

  function confirmClearToday() {
    Alert.alert(
      t("settings.clearTodayTitle"),
      t("settings.clearTodayBody", { count: todayEntries.length }),
      [
        { text: t("settings.cancel"), style: "cancel" },
        {
          text: t("settings.clearTodayAction"),
          style: "destructive",
          onPress: () => {
            void clearTodayIntake();
          },
        },
      ],
    );
  }

  function confirmClearAll() {
    Alert.alert(
      t("settings.clearAllTitle"),
      t("settings.clearAllBody", { count: entries.length }),
      [
        { text: t("settings.cancel"), style: "cancel" },
        {
          text: t("settings.clearAllAction"),
          style: "destructive",
          onPress: () => {
            void clearAllIntake();
          },
        },
      ],
    );
  }

  function confirmResetOnboarding() {
    Alert.alert(
      t("settings.resetOnboardingTitle"),
      t("settings.resetOnboardingBody"),
      [
        { text: t("settings.cancel"), style: "cancel" },
        {
          text: t("settings.resetOnboardingAction"),
          style: "destructive",
          onPress: () => {
            void resetOnboarding();
          },
        },
      ],
    );
  }

  return (
    <Card>
      <SectionHeader
        title={t("settings.dataTitle")}
        subtitle={t("settings.dataSubtitle")}
      />
      <View style={{ gap: spacing.sm }}>
        <Button
          label={t("settings.clearTodayAction")}
          variant="secondary"
          fullWidth
          disabled={todayEntries.length === 0}
          onPress={confirmClearToday}
        />
        <Button
          label={t("settings.clearAllAction")}
          variant="danger"
          fullWidth
          disabled={entries.length === 0}
          onPress={confirmClearAll}
        />
        <Button
          label={t("settings.resetOnboardingAction")}
          variant="ghost"
          fullWidth
          onPress={confirmResetOnboarding}
        />
      </View>
    </Card>
  );
}
