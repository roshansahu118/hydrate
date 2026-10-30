import { useTranslation } from "react-i18next";

import { useLocale, type LocaleMode } from "../i18n";
import { SegmentedControl } from "./ui/SegmentedControl";

const OPTIONS: LocaleMode[] = ["en", "hi", "system"];

export function LanguagePicker() {
  const { t } = useTranslation();
  const { mode, setMode } = useLocale();

  return (
    <SegmentedControl
      value={mode}
      onChange={setMode}
      options={OPTIONS.map((option) => ({
        value: option,
        label: t(`language.${option}`),
      }))}
    />
  );
}
