import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useTheme } from "../../theme";
import { AppText } from "../AppText";

export type ChipProps = Omit<PressableProps, "children" | "style"> & {
  label: string;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Chip({
  label,
  selected = false,
  disabled,
  style,
  ...rest
}: ChipProps) {
  const { colors, spacing, radius } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: !!disabled }}
      disabled={disabled}
      style={({ pressed }) => [
        {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          borderRadius: radius.full,
          borderWidth: 1,
          borderColor: selected ? colors.accent : colors.border,
          backgroundColor: selected ? colors.accent : colors.surface,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
      {...rest}
    >
      <AppText variant="label" color={selected ? "inverse" : "secondary"}>
        {label}
      </AppText>
    </Pressable>
  );
}
