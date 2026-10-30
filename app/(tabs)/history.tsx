import { useRouter } from "expo-router";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppText } from "@/components/AppText";
import { Screen } from "@/components/Screen";
import { Button, Card, EmptyState, ListRow, SectionHeader } from "@/components/ui";
import { useHydrate } from "@/data";
import { formatTime } from "@/domain";
import { useTheme } from "@/theme";

export default function HistoryScreen() {
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const router = useRouter();
  const { todayEntries, todayTotalMl, removeIntake } = useHydrate();

  return (
    <Screen scroll>
      <AppText variant="title">{t("history.title")}</AppText>
      <AppText variant="body" color="secondary">
        {t("history.subtitle")}
      </AppText>

      <Card style={{ marginTop: spacing.md }}>
        {todayEntries.length === 0 ? (
          <EmptyState
            title={t("history.emptyTitle")}
            description={t("history.emptyDescription")}
            actionLabel={t("history.emptyAction")}
            onAction={() => router.push("/")}
          />
        ) : (
          <View style={{ gap: spacing.sm }}>
            <SectionHeader
              title={t("history.todayTitle")}
              subtitle={t("history.todayTotal", { total: todayTotalMl })}
            />
            {todayEntries.map((entry) => (
              <ListRow
                key={entry.id}
                title={t("history.entryAmount", { amount: entry.amountMl })}
                subtitle={formatTime(entry.createdAt)}
                trailing={
                  <Button
                    label={t("history.remove")}
                    variant="ghost"
                    size="sm"
                    onPress={() => {
                      void removeIntake(entry.id);
                    }}
                  />
                }
              />
            ))}
          </View>
        )}
      </Card>
    </Screen>
  );
}
