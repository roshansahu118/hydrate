import { useMemo, useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { AppText } from "@/components/AppText";
import { Screen } from "@/components/Screen";
import {
  Button,
  Card,
  Chip,
  EmptyState,
  ListRow,
  SectionHeader,
} from "@/components/ui";
import { useHydrate } from "@/data";
import {
  buildDayTotals,
  entriesForDay,
  formatDayHeading,
  formatDayMonth,
  formatTime,
  hasAnyIntake,
  lastNDayKeys,
  toDayKey,
  type HistoryRangeDays,
} from "@/domain";
import { HistoryStats, WeeklyBarChart } from "@/history";
import { useLocale } from "@/i18n";
import { useTheme } from "@/theme";

export default function HistoryScreen() {
  const { t, i18n } = useTranslation();
  const { spacing } = useTheme();
  const { language } = useLocale();
  const router = useRouter();
  const { entries, profile, removeIntake } = useHydrate();

  const locale = language === "hi" ? "hi-IN" : i18n.language;
  const todayKey = toDayKey();
  const [rangeDays, setRangeDays] = useState<HistoryRangeDays>(7);
  const [selectedDayKey, setSelectedDayKey] = useState(todayKey);

  const dayKeys = useMemo(
    () => lastNDayKeys(rangeDays, todayKey),
    [rangeDays, todayKey],
  );

  const totals = useMemo(
    () => buildDayTotals(entries, dayKeys),
    [entries, dayKeys],
  );

  const selectedEntries = useMemo(
    () => entriesForDay(entries, selectedDayKey),
    [entries, selectedDayKey],
  );

  const selectedTotal = useMemo(
    () => selectedEntries.reduce((sum, entry) => sum + entry.amountMl, 0),
    [selectedEntries],
  );

  const emptyHistory = !hasAnyIntake(totals);

  return (
    <Screen scroll>
      <AppText variant="title">{t("history.title")}</AppText>
      <AppText variant="body" color="secondary">
        {t("history.subtitle")}
      </AppText>

      <View
        style={{
          marginTop: spacing.md,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: spacing.sm,
        }}
      >
        <Chip
          label={t("history.range7")}
          selected={rangeDays === 7}
          onPress={() => setRangeDays(7)}
        />
        <Chip
          label={t("history.range14")}
          selected={rangeDays === 14}
          onPress={() => setRangeDays(14)}
        />
      </View>

      {emptyHistory ? (
        <Card style={{ marginTop: spacing.md }}>
          <EmptyState
            title={t("history.emptyTitle")}
            description={t("history.emptyDescription")}
            actionLabel={t("history.emptyAction")}
            onAction={() => router.push("/")}
          />
        </Card>
      ) : (
        <>
          <Card style={{ marginTop: spacing.md }}>
            <SectionHeader
              title={t("history.chartTitle")}
              subtitle={t("history.chartSubtitle", { days: rangeDays })}
            />
            <WeeklyBarChart
              totals={totals}
              goalMl={profile.dailyGoalMl}
              selectedDayKey={selectedDayKey}
              onSelectDay={setSelectedDayKey}
              locale={locale}
            />
          </Card>

          <View style={{ marginTop: spacing.md }}>
            <HistoryStats
              totals={totals}
              goalMl={profile.dailyGoalMl}
              locale={locale}
            />
          </View>

          <Card style={{ marginTop: spacing.md }}>
            <SectionHeader
              title={
                selectedDayKey === todayKey
                  ? t("history.todayTitle")
                  : formatDayHeading(selectedDayKey, locale)
              }
              subtitle={t("history.dayTotal", {
                total: selectedTotal,
                day: formatDayMonth(selectedDayKey, locale),
              })}
            />

            {selectedEntries.length === 0 ? (
              <AppText variant="body" color="secondary">
                {t("history.dayEmpty")}
              </AppText>
            ) : (
              <View style={{ gap: spacing.sm }}>
                {selectedEntries.map((entry) => (
                  <ListRow
                    key={entry.id}
                    title={t("history.entryAmount", {
                      amount: entry.amountMl,
                    })}
                    subtitle={formatTime(entry.createdAt)}
                    trailing={
                      selectedDayKey === todayKey ? (
                        <Button
                          label={t("history.remove")}
                          variant="ghost"
                          size="sm"
                          onPress={() => {
                            void removeIntake(entry.id);
                          }}
                        />
                      ) : undefined
                    }
                  />
                ))}
              </View>
            )}
          </Card>
        </>
      )}
    </Screen>
  );
}
