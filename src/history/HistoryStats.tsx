import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppText } from "../components/AppText";
import { Card } from "../components/ui";
import type { DayTotal } from "../domain";
import {
  averageDailyMl,
  bestDay,
  currentStreak,
  daysGoalMet,
  formatDayMonth,
} from "../domain";
import { useTheme } from "../theme";

type HistoryStatsProps = {
  totals: DayTotal[];
  goalMl: number;
  locale?: string;
};

export function HistoryStats({ totals, goalMl, locale }: HistoryStatsProps) {
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const average = averageDailyMl(totals);
  const best = bestDay(totals);
  const met = daysGoalMet(totals, goalMl);
  const streak = currentStreak(totals, goalMl);

  const items = [
    {
      label: t("history.statAverage"),
      value: t("history.statMl", { amount: average }),
    },
    {
      label: t("history.statBest"),
      value: best
        ? t("history.statBestValue", {
            amount: best.totalMl,
            day: formatDayMonth(best.dayKey, locale),
          })
        : t("history.statNone"),
    },
    {
      label: t("history.statGoalDays"),
      value: t("history.statGoalDaysValue", {
        met,
        total: totals.length,
      }),
    },
    {
      label: t("history.statStreak"),
      value: t("history.statStreakValue", { count: streak }),
    },
  ];

  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: spacing.sm,
        }}
      >
        {items.map((item) => (
          <View
            key={item.label}
            style={{ width: "47%", gap: 2, minWidth: 120 }}
          >
            <AppText variant="caption" color="muted">
              {item.label}
            </AppText>
            <AppText variant="bodyEmphasis">{item.value}</AppText>
          </View>
        ))}
      </View>
    </Card>
  );
}
