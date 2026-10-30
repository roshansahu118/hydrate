import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useTheme } from "../../theme";
import { AppText } from "../AppText";

export type IconButtonProps = Omit<PressableProps, "children" | "style"> & {
  glyph: string;
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "ghost";
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  glyph,
  label,
  size = "md",
  variant = "filled",
  disabled,
  style,
  ...rest
}: IconButtonProps) {
  const { colors, spacing, radius } = useTheme();
  const dimension = size === "sm" ? 36 : size === "lg" ? 56 : 44;
  const fontSize = size === "sm" ? 16 : size === "lg" ? 24 : 20;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      style={({ pressed }) => [
        {
          width: dimension,
          height: dimension,
          borderRadius: radius.full,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            variant === "filled" ? colors.accent : colors.accentMuted,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          padding: spacing.xs,
        },
        style,
      ]}
      {...rest}
    >
      <AppText
        variant="body"
        color={variant === "filled" ? "inverse" : "primary"}
        style={{ fontSize, lineHeight: fontSize + 4 }}
      >
        {glyph}
      </AppText>
    </Pressable>
  );
}
