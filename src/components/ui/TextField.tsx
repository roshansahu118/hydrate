import { useState } from "react";
import {
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";

import { useTheme } from "../../theme";
import { AppText } from "../AppText";

export type TextFieldProps = Omit<TextInputProps, "style"> & {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function TextField({
  label,
  error,
  containerStyle,
  editable = true,
  ...rest
}: TextFieldProps) {
  const { colors, spacing, radius } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View style={[{ gap: spacing.xs }, containerStyle]}>
      {label ? (
        <AppText variant="label" color="secondary">
          {label}
        </AppText>
      ) : null}
      <TextInput
        {...rest}
        editable={editable}
        placeholderTextColor={colors.text.muted}
        onFocus={(event) => {
          setFocused(true);
          rest.onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          rest.onBlur?.(event);
        }}
        style={{
          borderWidth: 1,
          borderColor: error
            ? colors.text.danger
            : focused
              ? colors.accent
              : colors.border,
          backgroundColor: colors.surface,
          borderRadius: radius.md,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm + 4,
          color: colors.text.primary,
          fontSize: 16,
          opacity: editable ? 1 : 0.6,
        }}
      />
      {error ? (
        <AppText variant="caption" color="danger">
          {error}
        </AppText>
      ) : null}
    </View>
  );
}
