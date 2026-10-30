import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { AppText } from "@/components/AppText";
import { Screen } from "@/components/Screen";
import { Button, TextField } from "@/components/ui";
import { StepIndicator, useOnboardingDraft } from "@/onboarding";
import { useTheme } from "@/theme";

export default function OnboardingNameScreen() {
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const router = useRouter();
  const { name, setName, nameError, validateName } = useOnboardingDraft();

  return (
    <Screen scroll>
      <StepIndicator
        step={2}
        total={3}
        label={t("onboarding.stepLabel", { step: 2, total: 3 })}
      />

      <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
        <AppText variant="title">{t("onboarding.nameTitle")}</AppText>
        <AppText variant="body" color="secondary">
          {t("onboarding.nameBody")}
        </AppText>
      </View>

      <TextField
        label={t("onboarding.nameLabel")}
        placeholder={t("onboarding.namePlaceholder")}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoCorrect={false}
        returnKeyType="next"
        error={nameError ? t("onboarding.nameRequired") : undefined}
        onSubmitEditing={() => {
          if (validateName()) {
            router.push("/onboarding/goal");
          }
        }}
      />

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
          onPress={() => router.back()}
          style={{ flex: 1 }}
          fullWidth
        />
        <Button
          label={t("onboarding.continue")}
          onPress={() => {
            if (validateName()) {
              router.push("/onboarding/goal");
            }
          }}
          style={{ flex: 1 }}
          fullWidth
        />
      </View>
    </Screen>
  );
}
