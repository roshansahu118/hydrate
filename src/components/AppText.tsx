import {
  Text,
  type StyleProp,
  type TextProps,
  type TextStyle,
} from "react-native";

import {
  fontFamilyFor,
  typography,
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
  const token = typography[variant];

  return (
    <Text
      {...rest}
      style={[
        {
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          fontWeight: token.fontWeight,
          fontFamily: fontFamilyFor(token.fontKey),
          color: colors.text[color],
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
