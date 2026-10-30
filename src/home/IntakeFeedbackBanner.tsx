import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppText } from "../components/AppText";
import { Button } from "../components/ui";
import { useTheme } from "../theme";

export type IntakeFeedback = {
  amountMl: number;
  entryId: string;
};

type IntakeFeedbackBannerProps = {
  feedback: IntakeFeedback;
  onUndo: () => void;
  onDismiss: () => void;
};

export function IntakeFeedbackBanner({
  feedback,
  onUndo,
  onDismiss,
}: IntakeFeedbackBannerProps) {
  const { t } = useTranslation();
  const { colors, spacing, radius } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        padding: spacing.md,
        borderRadius: radius.md,
        backgroundColor: colors.accentMuted,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <AppText variant="bodyEmphasis" style={{ flex: 1 }}>
        {t("home.addedFeedback", { amount: feedback.amountMl })}
      </AppText>
      <Button label={t("home.undo")} variant="ghost" size="sm" onPress={onUndo} />
      <Button
        label={t("home.dismiss")}
        variant="secondary"
        size="sm"
        onPress={onDismiss}
      />
    </View>
  );
}
