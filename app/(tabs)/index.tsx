import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppText } from "@/components/AppText";
import { Screen } from "@/components/Screen";
import { useTheme } from "@/theme";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors, spacing, radius, scheme } = useTheme();

  return (
    <Screen>
      <AppText variant="title">{t("home.title")}</AppText>
      <AppText variant="body" color="secondary">
        {t("home.subtitle")}
      </AppText>

      <View
        style={{
          marginTop: spacing.md,
          padding: spacing.lg,
          borderRadius: radius.lg,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          gap: spacing.sm,
        }}
      >
        <AppText variant="caption" color="muted">
          {t("home.activeScheme")}
        </AppText>
        <AppText variant="display" color="primary">
          {scheme === "dark" ? t("home.dark") : t("home.light")}
        </AppText>
        <AppText variant="body" color="secondary">
          {t("home.changeThemeHint")}
        </AppText>
      </View>
    </Screen>
  );
}
