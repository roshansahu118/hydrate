import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppText } from "../components/AppText";
import { Button, ListRow, SectionHeader } from "../components/ui";
import { formatTime, type IntakeEntry } from "../domain";
import { useTheme } from "../theme";

type TodayRecentListProps = {
  entries: IntakeEntry[];
  onRemove: (id: string) => void;
};

export function TodayRecentList({ entries, onRemove }: TodayRecentListProps) {
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const recent = entries.slice(0, 5);

  if (recent.length === 0) {
    return (
      <View style={{ gap: spacing.xs }}>
        <SectionHeader title={t("home.recentTitle")} />
        <AppText variant="body" color="secondary">
          {t("home.recentEmpty")}
        </AppText>
      </View>
    );
  }

  return (
    <View style={{ gap: spacing.sm }}>
      <SectionHeader
        title={t("home.recentTitle")}
        subtitle={t("home.recentSubtitle", { count: entries.length })}
      />
      {recent.map((entry) => (
        <ListRow
          key={entry.id}
          title={t("home.mlAmount", { amount: entry.amountMl })}
          subtitle={formatTime(entry.createdAt)}
          trailing={
            <Button
              label={t("home.undo")}
              variant="ghost"
              size="sm"
              onPress={() => onRemove(entry.id)}
            />
          }
        />
      ))}
    </View>
  );
}
