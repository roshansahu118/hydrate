import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { AppText } from "@/components/AppText";
import { Screen } from "@/components/Screen";
import { Button, Card } from "@/components/ui";
import { StepIndicator } from "@/onboarding";
import { useTheme } from "@/theme";

export default function OnboardingWelcomeScreen() {
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const router = useRouter();

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ gap: spacing.md }}>
          <StepIndicator
            step={1}
            total={3}
            label={t("onboarding.stepLabel", { step: 1, total: 3 })}
          />
          <AppText
            variant="display"
            color="primary"
            style={{ marginTop: spacing.lg }}
          >
            {t("onboarding.welcomeBrand")}
          </AppText>
          <AppText variant="title">{t("onboarding.welcomeTitle")}</AppText>
          <AppText variant="body" color="secondary">
            {t("onboarding.welcomeBody")}
          </AppText>
        </View>

        <View style={{ gap: spacing.md, marginBottom: spacing.md }}>
          <Card>
            <AppText variant="bodyEmphasis">
              {t("onboarding.welcomePoint1")}
            </AppText>
            <AppText variant="body" color="secondary">
              {t("onboarding.welcomePoint2")}
            </AppText>
            <AppText variant="body" color="secondary">
              {t("onboarding.welcomePoint3")}
            </AppText>
          </Card>
          <Button
            label={t("onboarding.getStarted")}
            size="lg"
            fullWidth
            onPress={() => router.push("/onboarding/name")}
          />
        </View>
      </View>
    </Screen>
  );
}
