import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppText } from "@/components/AppText";
import { Screen } from "@/components/Screen";
import { useTheme } from "@/theme";

export default function HistoryScreen() {
  const { t } = useTranslation();
  const { colors, spacing, radius } = useTheme();

  return (
    <Screen>
      <AppText variant="title">{t("history.title")}</AppText>
      <AppText variant="body" color="secondary">
        {t("history.subtitle")}
      </AppText>

      <View
        style={{
          marginTop: spacing.md,
          height: 140,
          borderRadius: radius.lg,
          backgroundColor: colors.accentMuted,
          borderWidth: 1,
          borderColor: colors.border,
          alignItems: "center",
          justifyContent: "center",
          padding: spacing.md,
        }}
      >
        <AppText variant="label" color="secondary">
          {t("history.chartPlaceholder")}
        </AppText>
      </View>
    </Screen>
  );
}
