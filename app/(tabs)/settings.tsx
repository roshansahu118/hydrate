import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppText } from "@/components/AppText";
import { LanguagePicker } from "@/components/LanguagePicker";
import { Screen } from "@/components/Screen";
import { ThemeModePicker } from "@/components/ThemeModePicker";
import { useLocale } from "@/i18n";
import { useTheme } from "@/theme";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { mode, scheme, colors, spacing, radius } = useTheme();
  const { mode: localeMode, language } = useLocale();

  return (
    <Screen scroll>
      <AppText variant="title">{t("settings.title")}</AppText>
      <AppText variant="body" color="secondary">
        {t("settings.subtitle")}
      </AppText>

      <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
        <AppText variant="subtitle">{t("settings.theme")}</AppText>
        <AppText variant="caption" color="muted">
          {t("settings.preference", { mode, scheme })}
        </AppText>
        <ThemeModePicker />
      </View>

      <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
        <AppText variant="subtitle">{t("settings.language")}</AppText>
        <AppText variant="caption" color="muted">
          {t("settings.languagePreference", {
            locale: localeMode,
            language,
          })}
        </AppText>
        <LanguagePicker />
      </View>

      <View
        style={{
          marginTop: spacing.lg,
          padding: spacing.md,
          borderRadius: radius.md,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          gap: spacing.xs,
        }}
      >
        <AppText variant="label">{t("settings.typographyCheck")}</AppText>
        <AppText variant="display">{t("settings.display")}</AppText>
        <AppText variant="title">{t("settings.titleSample")}</AppText>
        <AppText variant="subtitle">{t("settings.subtitleSample")}</AppText>
        <AppText variant="body">{t("settings.bodySample")}</AppText>
        <AppText variant="bodyEmphasis">
          {t("settings.bodyEmphasisSample")}
        </AppText>
        <AppText variant="caption" color="muted">
          {t("settings.captionSample")}
        </AppText>
      </View>
    </Screen>
  );
}
