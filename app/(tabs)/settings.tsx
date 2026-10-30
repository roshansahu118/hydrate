import { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppText } from "@/components/AppText";
import { LanguagePicker } from "@/components/LanguagePicker";
import { Screen } from "@/components/Screen";
import { ThemeModePicker } from "@/components/ThemeModePicker";
import {
  Button,
  Card,
  Divider,
  ListRow,
  SectionHeader,
  TextField,
} from "@/components/ui";
import { useLocale } from "@/i18n";
import { useTheme } from "@/theme";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { mode, scheme, spacing } = useTheme();
  const { mode: localeMode, language } = useLocale();
  const [name, setName] = useState("");

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

      <Card style={{ marginTop: spacing.lg }}>
        <SectionHeader
          title={t("settings.kitPreview")}
          subtitle={t("settings.kitPreviewSubtitle")}
        />
        <TextField
          label={t("settings.sampleName")}
          placeholder={t("settings.sampleNamePlaceholder")}
          value={name}
          onChangeText={setName}
        />
        <View style={{ flexDirection: "row", gap: spacing.sm }}>
          <Button label={t("settings.primaryAction")} />
          <Button
            label={t("settings.secondaryAction")}
            variant="secondary"
          />
        </View>
        <Divider />
        <ListRow
          title={t("settings.notificationsRow")}
          subtitle={t("settings.notificationsRowSubtitle")}
          showChevron
          onPress={() => undefined}
        />
        <ListRow
          title={t("settings.dailyGoalRow")}
          subtitle={t("settings.dailyGoalRowSubtitle")}
        />
      </Card>
    </Screen>
  );
}
