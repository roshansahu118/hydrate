import { View } from "react-native";

import { useTheme } from "../theme";
import { AppText } from "../components/AppText";

type StepIndicatorProps = {
  step: number;
  total: number;
  label: string;
};

export function StepIndicator({ step, total, label }: StepIndicatorProps) {
  const { colors, spacing, radius } = useTheme();

  return (
    <View style={{ gap: spacing.sm }}>
      <AppText variant="caption" color="muted">
        {label}
      </AppText>
      <View style={{ flexDirection: "row", gap: spacing.xs }}>
        {Array.from({ length: total }, (_, index) => {
          const active = index < step;
          return (
            <View
              key={index}
              style={{
                flex: 1,
                height: 4,
                borderRadius: radius.full,
                backgroundColor: active ? colors.accent : colors.accentMuted,
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
