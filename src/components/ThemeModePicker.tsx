import { useTranslation } from "react-i18next";

import { useTheme, type ThemeMode } from "../theme";
import { SegmentedControl } from "./ui/SegmentedControl";

const OPTIONS: ThemeMode[] = ["light", "dark", "system"];

export function ThemeModePicker() {
  const { t } = useTranslation();
  const { mode, setMode } = useTheme();

  return (
    <SegmentedControl
      value={mode}
      onChange={setMode}
      options={OPTIONS.map((option) => ({
        value: option,
        label: t(`theme.${option}`),
      }))}
    />
  );
}
