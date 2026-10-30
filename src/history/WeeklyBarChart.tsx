import { Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppText } from "../components/AppText";
import type { DayTotal } from "../domain";
import { formatShortWeekday } from "../domain";
import { useTheme } from "../theme";

type WeeklyBarChartProps = {
  totals: DayTotal[];
  goalMl: number;
  selectedDayKey: string;
  onSelectDay: (dayKey: string) => void;
  locale?: string;
};

const CHART_HEIGHT = 140;

export function WeeklyBarChart({
  totals,
  goalMl,
  selectedDayKey,
  onSelectDay,
  locale,
}: WeeklyBarChartProps) {
  const { t } = useTranslation();
  const { colors, spacing, radius } = useTheme();
  const maxMl = Math.max(goalMl, ...totals.map((day) => day.totalMl), 1);
  const goalRatio = Math.min(1, goalMl / maxMl);

  return (
    <View style={{ gap: spacing.sm }}>
      <View style={{ height: CHART_HEIGHT, justifyContent: "flex-end" }}>
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: goalRatio * CHART_HEIGHT,
            borderTopWidth: 1,
            borderStyle: "dashed",
            borderColor: colors.warning,
            opacity: 0.85,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            gap: spacing.xs,
            height: "100%",
          }}
        >
          {totals.map((day) => {
            const selected = day.dayKey === selectedDayKey;
            const height = Math.max(
              day.totalMl > 0 ? 6 : 2,
              (day.totalMl / maxMl) * CHART_HEIGHT,
            );
            const metGoal = day.totalMl >= goalMl;

            return (
              <Pressable
                key={day.dayKey}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => onSelectDay(day.dayKey)}
                style={{ flex: 1, alignItems: "center", gap: 4 }}
              >
                <View
                  style={{
                    width: "100%",
                    maxWidth: 28,
                    height,
                    borderRadius: radius.sm,
                    backgroundColor: selected
                      ? colors.accent
                      : metGoal
                        ? colors.success
                        : colors.accentMuted,
                    borderWidth: selected ? 0 : 1,
                    borderColor: colors.border,
                  }}
                />
                <AppText
                  variant="caption"
                  color={selected ? "primary" : "muted"}
                  style={{ fontSize: 11 }}
                >
                  {formatShortWeekday(day.dayKey, locale)}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </View>
      <AppText variant="caption" color="muted">
        {t("history.goalLine", { goal: goalMl })}
      </AppText>
    </View>
  );
}
