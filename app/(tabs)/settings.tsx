import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppText } from "@/components/AppText";
import { LanguagePicker } from "@/components/LanguagePicker";
import { ReminderSettings } from "@/components/ReminderSettings";
import { Screen } from "@/components/Screen";
import { ThemeModePicker } from "@/components/ThemeModePicker";
import { SectionHeader } from "@/components/ui";
import { useLocale } from "@/i18n";
import { AboutCard, DataSettings, ProfileSettings } from "@/settings";
import { useTheme } from "@/theme";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { mode, scheme, spacing } = useTheme();
  const { mode: localeMode, language } = useLocale();

  return (
    <Screen scroll>
      <AppText variant="title">{t("settings.title")}</AppText>
      <AppText variant="body" color="secondary">
        {t("settings.subtitle")}
      </AppText>

      <View style={{ marginTop: spacing.md }}>
        <ProfileSettings />
      </View>

      <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
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

      <View style={{ marginTop: spacing.lg }}>
        <DataSettings />
      </View>

      <View style={{ marginTop: spacing.lg, marginBottom: spacing.md }}>
        <AboutCard />
      </View>
    </Screen>
  );
}
