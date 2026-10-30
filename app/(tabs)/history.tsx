import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { AppText } from "@/components/AppText";
import { Screen } from "@/components/Screen";
import { Card, EmptyState } from "@/components/ui";
import { useTheme } from "@/theme";

export default function HistoryScreen() {
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const router = useRouter();

  return (
    <Screen>
      <AppText variant="title">{t("history.title")}</AppText>
      <AppText variant="body" color="secondary">
        {t("history.subtitle")}
      </AppText>

      <Card style={{ marginTop: spacing.md }}>
        <EmptyState
          title={t("history.emptyTitle")}
          description={t("history.emptyDescription")}
          actionLabel={t("history.emptyAction")}
          onAction={() => router.push("/")}
        />
      </Card>
    </Screen>
  );
}
