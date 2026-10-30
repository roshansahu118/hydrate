import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppText } from "@/components/AppText";
import { LanguagePicker } from "@/components/LanguagePicker";
import { ReminderSettings } from "@/components/ReminderSettings";
import { Screen } from "@/components/Screen";
import { ThemeModePicker } from "@/components/ThemeModePicker";
import {
  Card,
  Divider,
  ListRow,
  SectionHeader,
  TextField,
} from "@/components/ui";
import { useHydrate } from "@/data";
import { useLocale } from "@/i18n";
import { useTheme } from "@/theme";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { mode, scheme, spacing } = useTheme();
  const { mode: localeMode, language } = useLocale();
  const { profile, updateProfile } = useHydrate();

  return (
    <Screen scroll>
      <AppText variant="title">{t("settings.title")}</AppText>
      <AppText variant="body" color="secondary">
        {t("settings.subtitle")}
      </AppText>

      <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
        <SectionHeader
          title={t("settings.theme")}
          subtitle={t("settings.preference", { mode, scheme })}
        />
        <ThemeModePicker />
      </View>

      <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
        <SectionHeader
          title={t("settings.language")}
          subtitle={t("settings.languagePreference", {
            locale: localeMode,
            language,
          })}
        />
        <LanguagePicker />
      </View>

      <View style={{ marginTop: spacing.lg }}>
        <ReminderSettings />
      </View>

      <Card style={{ marginTop: spacing.lg }}>
        <SectionHeader
          title={t("settings.profile")}
          subtitle={t("settings.profileSubtitle")}
        />
        <TextField
          label={t("settings.sampleName")}
          placeholder={t("settings.sampleNamePlaceholder")}
          value={profile.name}
          onChangeText={(name) => {
            void updateProfile({ name });
          }}
        />
        <Divider />
        <ListRow
          title={t("settings.dailyGoalRow")}
          subtitle={t("settings.dailyGoalValue", {
            goal: profile.dailyGoalMl,
          })}
        />
      </Card>
    </Screen>
  );
}
