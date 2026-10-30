import type { TextStyle } from "react-native";

export type FontWeightKey = "regular" | "medium" | "semibold" | "bold";

/**
 * Swap these values later when custom fonts are loaded via expo-font.
 * Example: regular: "Inter_400Regular"
 */
export const fonts: Record<FontWeightKey, string | undefined> = {
  regular: undefined,
  medium: undefined,
  semibold: undefined,
  bold: undefined,
};

export type TypographyVariant =
  | "display"
  | "title"
  | "subtitle"
  | "body"
  | "bodyEmphasis"
  | "caption"
  | "label";

type TypographyToken = {
  fontSize: number;
  lineHeight: number;
  fontWeight: NonNullable<TextStyle["fontWeight"]>;
  fontKey: FontWeightKey;
};

export const typography: Record<TypographyVariant, TypographyToken> = {
  display: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: "700",
    fontKey: "bold",
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "600",
    fontKey: "semibold",
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    fontKey: "semibold",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    fontKey: "regular",
  },
  bodyEmphasis: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    fontKey: "semibold",
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
    fontKey: "regular",
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    fontKey: "semibold",
  },
};

export function fontFamilyFor(fontKey: FontWeightKey): string | undefined {
  return fonts[fontKey];
}
