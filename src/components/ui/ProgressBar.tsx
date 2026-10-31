import { useEffect, useRef } from "react";
import {
  Animated,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useTheme } from "../../theme";

export type ProgressBarProps = {
  /** 0–1 */
  progress: number;
  style?: StyleProp<ViewStyle>;
};

export function ProgressBar({ progress, style }: ProgressBarProps) {
  const { colors, radius, spacing } = useTheme();
  const clamped = Math.max(0, Math.min(1, progress));
  const width = useRef(new Animated.Value(clamped)).current;

  useEffect(() => {
    Animated.timing(width, {
      toValue: clamped,
      duration: 280,
      useNativeDriver: false,
    }).start();
  }, [clamped, width]);

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
      <Animated.View
        style={{
          width: width.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
          }),
          height: "100%",
          backgroundColor: colors.accent,
          borderRadius: radius.full,
        }}
      />
    </View>
  );
}
