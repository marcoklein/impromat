import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { TRANSLATIONS } from "../src/translations";

localStorage.setItem("debug", "impromat:*");

i18n.use(initReactI18next).init({
  resources: TRANSLATIONS,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  saveMissing: true,
  missingKeyHandler: (lng, ns, key, fallbackValue) => {
    console.warn("Missing translation", { lng, ns, key, fallbackValue });
    if (process.env.NODE_ENV === "development") {
      throw new Error(`Missing translation: ${key}`);
    }
  },
});
