import { Stack } from "expo-router";

import { OnboardingDraftProvider } from "@/onboarding";
import { useTheme } from "@/theme";

export default function OnboardingLayout() {
  const { colors } = useTheme();

  return (
    <OnboardingDraftProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="name" />
        <Stack.Screen name="goal" />
      </Stack>
    </OnboardingDraftProvider>
  );
}
