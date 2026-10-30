import { type ReactNode } from "react";
import {
  Pressable,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useTheme } from "../../theme";
import { AppText } from "../AppText";

export type ListRowProps = Omit<PressableProps, "children" | "style"> & {
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  showChevron?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ListRow({
  title,
  subtitle,
  trailing,
  showChevron = false,
  disabled,
  style,
  onPress,
  ...rest
}: ListRowProps) {
  const { colors, spacing, radius } = useTheme();
  const interactive = !!onPress;

  const content = (
    <>
      <View style={{ flex: 1, gap: 2 }}>
        <AppText variant="bodyEmphasis">{title}</AppText>
        {subtitle ? (
          <AppText variant="caption" color="muted">
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {trailing}
      {showChevron ? (
        <AppText variant="body" color="muted">
          ›
        </AppText>
      ) : null}
    </>
  );

  const baseStyle = [
    {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: spacing.sm,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    style,
  ];

  if (!interactive) {
    return <View style={baseStyle}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        ...baseStyle,
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
      ]}
      {...rest}
    >
      {content}
    </Pressable>
  );
}
