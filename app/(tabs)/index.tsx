import { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppText } from "@/components/AppText";
import { Screen } from "@/components/Screen";
import {
  Button,
  Card,
  Chip,
  IconButton,
  ProgressBar,
  SectionHeader,
} from "@/components/ui";
import { useTheme } from "@/theme";

const DEMO_GOAL_ML = 2500;
const QUICK_AMOUNTS = [250, 500, 750] as const;

export default function HomeScreen() {
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const [currentMl, setCurrentMl] = useState(750);
  const [selectedAmount, setSelectedAmount] = useState<(typeof QUICK_AMOUNTS)[number]>(250);

  const progress = currentMl / DEMO_GOAL_ML;

  return (
    <Screen scroll>
      <AppText variant="title">{t("home.title")}</AppText>
      <AppText variant="body" color="secondary">
        {t("home.subtitle")}
      </AppText>

      <Card style={{ marginTop: spacing.md }}>
        <SectionHeader title={t("home.todayProgress")} />
        <AppText variant="display" color="primary">
          {t("home.progressLabel", {
            current: currentMl,
            goal: DEMO_GOAL_ML,
          })}
        </AppText>
        <ProgressBar progress={progress} />
      </Card>

      <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
        <SectionHeader title={t("home.quickAdd")} />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {QUICK_AMOUNTS.map((amount) => (
            <Chip
              key={amount}
              label={t(`home.ml${amount}`)}
              selected={selectedAmount === amount}
              onPress={() => setSelectedAmount(amount)}
            />
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.sm,
            marginTop: spacing.sm,
          }}
        >
          <Button
            label={t("home.addWater")}
            onPress={() => setCurrentMl((value) => value + selectedAmount)}
            style={{ flex: 1 }}
            fullWidth
          />
          <IconButton
            glyph="+"
            label={t("home.addWater")}
            onPress={() => setCurrentMl((value) => value + selectedAmount)}
          />
        </View>
      </View>
    </Screen>
  );
}
