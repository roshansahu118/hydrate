import { type ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import { useTheme } from "../../theme";

export type CardProps = {
  children: ReactNode;
  padded?: boolean;
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Card({
  children,
  padded = true,
  elevated = false,
  style,
}: CardProps) {
  const { colors, spacing, radius } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: elevated ? colors.surfaceElevated : colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: radius.lg,
          padding: padded ? spacing.md : 0,
          gap: spacing.sm,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
