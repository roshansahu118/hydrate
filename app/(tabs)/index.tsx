import { useEffect, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppText } from "@/components/AppText";
import { Screen } from "@/components/Screen";
import {
  Button,
  Card,
  Chip,
  ProgressBar,
  SectionHeader,
  TextField,
} from "@/components/ui";
import { useHydrate } from "@/data";
import {
  goalStatus,
  MAX_INTAKE_ML,
  MIN_INTAKE_ML,
  parseCustomAmountMl,
  remainingMl,
} from "@/domain";
import {
  IntakeFeedbackBanner,
  TodayRecentList,
  type IntakeFeedback,
} from "@/home";
import { useTheme } from "@/theme";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const {
    profile,
    todayTotalMl,
    progress,
    todayEntries,
    addIntake,
    removeIntake,
  } = useHydrate();

  const [customAmount, setCustomAmount] = useState("");
  const [customError, setCustomError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState<IntakeFeedback | null>(null);

  const status = goalStatus(todayTotalMl, profile.dailyGoalMl);
  const remaining = remainingMl(todayTotalMl, profile.dailyGoalMl);

  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 5000);
    return () => clearTimeout(timer);
  }, [feedback]);

  async function logIntake(amountMl: number) {
    setAdding(true);
    try {
      const entry = await addIntake(amountMl);
      setFeedback({ amountMl: entry.amountMl, entryId: entry.id });
      setCustomAmount("");
      setCustomError(null);
    } finally {
      setAdding(false);
    }
  }

  function submitCustom() {
    const parsed = parseCustomAmountMl(customAmount);
    if (parsed == null) {
      setCustomError("invalid");
      return;
    }
    void logIntake(parsed);
  }

  const statusMessage =
    status === "empty"
      ? t("home.statusEmpty", { remaining })
      : status === "in_progress"
        ? t("home.statusRemaining", { remaining })
        : status === "reached"
          ? t("home.statusReached")
          : t("home.statusExceeded", {
              extra: todayTotalMl - profile.dailyGoalMl,
            });

  return (
    <Screen scroll>
      <AppText variant="title">
        {profile.name
          ? t("home.greeting", { name: profile.name })
          : t("home.title")}
      </AppText>
      <AppText variant="body" color="secondary">
        {t("home.subtitle")}
      </AppText>

      {feedback ? (
        <IntakeFeedbackBanner
          feedback={feedback}
          onUndo={() => {
            void removeIntake(feedback.entryId).then(() => setFeedback(null));
          }}
          onDismiss={() => setFeedback(null)}
        />
      ) : null}

      <Card style={{ marginTop: spacing.sm }}>
        <SectionHeader title={t("home.todayProgress")} />
        <AppText variant="display" color="primary">
          {t("home.progressLabel", {
            current: todayTotalMl,
            goal: profile.dailyGoalMl,
          })}
        </AppText>
        <ProgressBar progress={progress} />
        <AppText
          variant="bodyEmphasis"
          color={
            status === "reached" || status === "exceeded"
              ? "primary"
              : "secondary"
          }
        >
          {statusMessage}
        </AppText>
        <AppText variant="caption" color="muted">
          {t("home.progressPercent", {
            percent: Math.round(progress * 100),
          })}
        </AppText>
      </Card>

      <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
        <SectionHeader
          title={t("home.quickAdd")}
          subtitle={t("home.quickAddHint")}
        />
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}
        >
          {profile.quickAmountsMl.map((amount) => (
            <Chip
              key={amount}
              label={t("home.mlAmount", { amount })}
              disabled={adding}
              onPress={() => {
                void logIntake(amount);
              }}
            />
          ))}
        </View>
      </View>

      <Card style={{ marginTop: spacing.md }}>
        <SectionHeader title={t("home.customTitle")} />
        <TextField
          label={t("home.customLabel")}
          placeholder={t("home.customPlaceholder", {
            min: MIN_INTAKE_ML,
            max: MAX_INTAKE_ML,
          })}
          value={customAmount}
          onChangeText={(value) => {
            setCustomAmount(value);
            setCustomError(null);
          }}
          keyboardType="number-pad"
          returnKeyType="done"
          error={
            customError ? t("home.customInvalid", {
              min: MIN_INTAKE_ML,
              max: MAX_INTAKE_ML,
            }) : undefined
          }
          onSubmitEditing={submitCustom}
        />
        <Button
          label={t("home.addCustom")}
          loading={adding}
          fullWidth
          onPress={submitCustom}
        />
      </Card>

      <View style={{ marginTop: spacing.lg }}>
        <TodayRecentList
          entries={todayEntries}
          onRemove={(id) => {
            void removeIntake(id);
            setFeedback((current) =>
              current?.entryId === id ? null : current,
            );
          }}
        />
      </View>
    </Screen>
  );
}
