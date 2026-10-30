import type { TranslationResources } from "./en";

export const hi: TranslationResources = {
  tabs: {
    home: "होम",
    history: "इतिहास",
    settings: "सेटिंग्स",
  },
  home: {
    title: "Hydrate",
    subtitle:
      "M2 i18n डेमो — होम शेल। पानी लॉग करना बाद के मॉड्यूल में आएगा।",
    activeScheme: "सक्रिय थीम",
    dark: "डार्क",
    light: "लाइट",
    changeThemeHint:
      "सेटिंग्स टैब से थीम बदलें। पसंद डिवाइस पर सेव रहती है।",
  },
  history: {
    title: "इतिहास",
    subtitle:
      "चार्ट M8 में आएंगे। अभी यह स्क्रीन थीम + भाषा दिखाती है।",
    chartPlaceholder: "चार्ट प्लेसहोल्डर",
  },
  settings: {
    title: "सेटिंग्स",
    subtitle: "दिखावट और भाषा। लक्ष्य बाद के मॉड्यूल में आएंगे।",
    theme: "थीम",
    preference: "पसंद: {{mode}} · लागू: {{scheme}}",
    language: "भाषा",
    languagePreference: "पसंद: {{locale}} · लागू: {{language}}",
    typographyCheck: "टाइपोग्राफी जाँच",
    display: "डिस्प्ले",
    titleSample: "टाइटल",
    subtitleSample: "सबटाइटल",
    bodySample: "बॉडी टेक्स्ट AppText इस्तेमाल करता है।",
    bodyEmphasisSample: "बॉडी एम्फेसिस",
    captionSample: "कैप्शन / म्यूटेड",
  },
  theme: {
    light: "लाइट",
    dark: "डार्क",
    system: "सिस्टम",
  },
  language: {
    en: "अंग्रेज़ी",
    hi: "हिन्दी",
    system: "सिस्टम",
  },
};
