import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useTheme } from "../../theme";
import { AppText } from "../AppText";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = Omit<PressableProps, "children" | "style"> & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  fullWidth = false,
  style,
  ...rest
}: ButtonProps) {
  const { colors, spacing, radius } = useTheme();
  const isDisabled = disabled || loading;

  const paddingVertical =
    size === "sm" ? spacing.sm : size === "lg" ? spacing.md + 2 : spacing.sm + 4;
  const paddingHorizontal =
    size === "sm" ? spacing.md : size === "lg" ? spacing.lg : spacing.md + 4;

  const backgrounds: Record<ButtonVariant, string> = {
    primary: colors.accent,
    secondary: colors.accentMuted,
    ghost: "transparent",
    danger: colors.text.danger,
  };

  const labelColors: Record<
    ButtonVariant,
    "inverse" | "primary" | "secondary"
  > = {
    primary: "inverse",
    secondary: "primary",
    ghost: "primary",
    danger: "inverse",
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          paddingVertical,
          paddingHorizontal,
          borderRadius: radius.md,
          backgroundColor: backgrounds[variant],
          borderWidth: variant === "ghost" ? 1 : 0,
          borderColor: colors.border,
          opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
          alignSelf: fullWidth ? "stretch" : "flex-start",
        },
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "secondary" || variant === "ghost"
              ? colors.accent
              : colors.text.inverse
          }
        />
      ) : (
        <AppText variant="label" color={labelColors[variant]}>
          {label}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
  },
});
