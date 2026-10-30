import { useEffect, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppText } from "../components/AppText";
import { Button, Card, Chip, SectionHeader, TextField } from "../components/ui";
import { useHydrate } from "../data";
import {
  MAX_DAILY_GOAL_ML,
  MIN_DAILY_GOAL_ML,
  QUICK_AMOUNT_OPTIONS_ML,
  clampDailyGoalMl,
  toggleQuickAmount,
} from "../domain";
import { ONBOARDING_GOAL_PRESETS_ML } from "../onboarding";
import { useTheme } from "../theme";

export function ProfileSettings() {
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const { profile, updateProfile } = useHydrate();
  const [name, setName] = useState(profile.name);
  const [goalText, setGoalText] = useState(String(profile.dailyGoalMl));
  const [goalError, setGoalError] = useState<string | null>(null);

  useEffect(() => {
    setName(profile.name);
    setGoalText(String(profile.dailyGoalMl));
  }, [profile.name, profile.dailyGoalMl]);

  function saveName() {
    const trimmed = name.trim();
    if (trimmed !== profile.name) {
      void updateProfile({ name: trimmed });
    }
  }

  function saveGoal(raw: string | number) {
    const value = typeof raw === "number" ? raw : Number(raw);
    if (!Number.isFinite(value)) {
      setGoalError("invalid");
      return;
    }
    const next = clampDailyGoalMl(value);
    setGoalText(String(next));
    setGoalError(null);
    void updateProfile({ dailyGoalMl: next });
  }

  return (
    <Card>
      <SectionHeader
        title={t("settings.profile")}
        subtitle={t("settings.profileSubtitle")}
      />

      <TextField
        label={t("settings.sampleName")}
        placeholder={t("settings.sampleNamePlaceholder")}
        value={name}
        onChangeText={setName}
        onBlur={saveName}
        autoCapitalize="words"
        returnKeyType="done"
        onSubmitEditing={saveName}
      />

      <View style={{ gap: spacing.sm }}>
        <AppText variant="label" color="secondary">
          {t("settings.goalLabel")}
        </AppText>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}
        >
          {ONBOARDING_GOAL_PRESETS_ML.map((goal) => (
            <Chip
              key={goal}
              label={t("settings.goalChip", { goal })}
              selected={profile.dailyGoalMl === goal}
              onPress={() => saveGoal(goal)}
            />
          ))}
        </View>
        <TextField
          label={t("settings.customGoalLabel")}
          placeholder={t("settings.customGoalPlaceholder", {
            min: MIN_DAILY_GOAL_ML,
            max: MAX_DAILY_GOAL_ML,
          })}
          value={goalText}
          onChangeText={(value) => {
            setGoalText(value);
            setGoalError(null);
          }}
          keyboardType="number-pad"
          returnKeyType="done"
          error={
            goalError
              ? t("settings.customGoalInvalid", {
                  min: MIN_DAILY_GOAL_ML,
                  max: MAX_DAILY_GOAL_ML,
                })
              : undefined
          }
          onSubmitEditing={() => saveGoal(goalText)}
        />
        <Button
          label={t("settings.saveGoal")}
          variant="secondary"
          onPress={() => saveGoal(goalText)}
        />
      </View>

      <View style={{ gap: spacing.sm }}>
        <AppText variant="label" color="secondary">
          {t("settings.quickAmountsLabel")}
        </AppText>
        <AppText variant="caption" color="muted">
          {t("settings.quickAmountsHint")}
        </AppText>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}
        >
          {QUICK_AMOUNT_OPTIONS_ML.map((amount) => (
            <Chip
              key={amount}
              label={t("settings.mlAmount", { amount })}
              selected={profile.quickAmountsMl.includes(amount)}
              onPress={() => {
                void updateProfile({
                  quickAmountsMl: toggleQuickAmount(
                    profile.quickAmountsMl,
                    amount,
                  ),
                });
              }}
            />
          ))}
        </View>
      </View>
    </Card>
  );
}
