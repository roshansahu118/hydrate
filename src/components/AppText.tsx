import {
  Text,
  type StyleProp,
  type TextProps,
  type TextStyle,
} from "react-native";

import {
  fontFamilyFor,
  typography,
  useFontReady,
  useTheme,
  type TypographyVariant,
} from "../theme";
import type { TextColors } from "../theme/colors";

export type AppTextColor = keyof TextColors;

export type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  color?: AppTextColor;
  style?: StyleProp<TextStyle>;
};

/**
 * App-wide text primitive. Use this instead of raw <Text>
 * so font family / size / color stay centralized.
 */
export function AppText({
  variant = "body",
  color = "primary",
  style,
  children,
  ...rest
}: AppTextProps) {
  const { colors } = useTheme();
  useFontReady(); // re-render when DM Sans finishes loading
  const token = typography[variant];
  const family = fontFamilyFor(token.fontKey);

  return (
    <Text
      {...rest}
      maxFontSizeMultiplier={rest.maxFontSizeMultiplier ?? 1.35}
      style={[
        {
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          // Weight fonts are separate files — avoid double-bolding when loaded.
          ...(family
            ? { fontFamily: family, fontWeight: "400" as const }
            : { fontWeight: token.fontWeight }),
          color: colors.text[color],
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
