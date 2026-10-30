import { View, type StyleProp, type ViewStyle } from "react-native";

import { useTheme } from "../../theme";

export type ProgressBarProps = {
  /** 0–1 */
  progress: number;
  style?: StyleProp<ViewStyle>;
};

export function ProgressBar({ progress, style }: ProgressBarProps) {
  const { colors, radius, spacing } = useTheme();
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 0,
        max: 100,
        now: Math.round(clamped * 100),
      }}
      style={[
        {
          height: spacing.sm,
          borderRadius: radius.full,
          backgroundColor: colors.accentMuted,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <View
        style={{
          width: `${clamped * 100}%`,
          height: "100%",
          backgroundColor: colors.accent,
          borderRadius: radius.full,
        }}
      />
    </View>
  );
}
