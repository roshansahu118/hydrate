import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
  useFonts,
} from "@expo-google-fonts/dm-sans";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { setLoadedFonts } from "./typography";

const FontReadyContext = createContext(false);

export function FontProvider({ children }: { children: ReactNode }) {
  const [loaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    setLoadedFonts({
      regular: "DMSans_400Regular",
      medium: "DMSans_500Medium",
      semibold: "DMSans_600SemiBold",
      bold: "DMSans_700Bold",
    });
    setReady(true);
  }, [loaded]);

  const value = useMemo(() => ready, [ready]);

  return (
    <FontReadyContext.Provider value={value}>{children}</FontReadyContext.Provider>
  );
}

export function useFontReady(): boolean {
  return useContext(FontReadyContext);
}
