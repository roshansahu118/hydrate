import Constants from "expo-constants";
import { useTranslation } from "react-i18next";

import { AppText } from "../components/AppText";
import { Card, SectionHeader } from "../components/ui";

export function AboutCard() {
  const { t } = useTranslation();
  const version =
    Constants.expoConfig?.version ??
    Constants.nativeAppVersion ??
    "1.0.0";

  return (
    <Card>
      <SectionHeader
        title={t("settings.aboutTitle")}
        subtitle={t("settings.aboutSubtitle")}
      />
      <AppText variant="bodyEmphasis">
        {t("settings.aboutVersion", { version })}
      </AppText>
      <AppText variant="caption" color="muted">
        {t("settings.aboutLocal")}
      </AppText>
    </Card>
  );
}
