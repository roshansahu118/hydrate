import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { AppText } from "@/components/AppText";
import { Screen } from "@/components/Screen";
import { Button, Chip } from "@/components/ui";
import {
  ONBOARDING_GOAL_PRESETS_ML,
  StepIndicator,
  useOnboardingDraft,
} from "@/onboarding";
import { useTheme } from "@/theme";

export default function OnboardingGoalScreen() {
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const router = useRouter();
  const { dailyGoalMl, setDailyGoalMl, complete, completing } =
    useOnboardingDraft();

  return (
    <Screen scroll>
      <StepIndicator
        step={3}
        total={3}
        label={t("onboarding.stepLabel", { step: 3, total: 3 })}
      />

      <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
        <AppText variant="title">{t("onboarding.goalTitle")}</AppText>
        <AppText variant="body" color="secondary">
          {t("onboarding.goalBody")}
        </AppText>
      </View>

      <AppText variant="display" color="primary">
        {t("onboarding.goalValue", { goal: dailyGoalMl })}
      </AppText>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
        {ONBOARDING_GOAL_PRESETS_ML.map((goal) => (
          <Chip
            key={goal}
            label={t("onboarding.goalChip", { goal })}
            selected={dailyGoalMl === goal}
            onPress={() => setDailyGoalMl(goal)}
          />
        ))}
      </View>

      <AppText variant="caption" color="muted">
        {t("onboarding.goalHint")}
      </AppText>

      <View
        style={{
          flexDirection: "row",
          gap: spacing.sm,
          marginTop: spacing.lg,
        }}
      >
        <Button
          label={t("onboarding.back")}
          variant="secondary"
          disabled={completing}
          onPress={() => router.back()}
          style={{ flex: 1 }}
          fullWidth
        />
        <Button
          label={t("onboarding.finish")}
          loading={completing}
          onPress={() => {
            void complete();
          }}
          style={{ flex: 1 }}
          fullWidth
        />
      </View>
    </Screen>
  );
}
