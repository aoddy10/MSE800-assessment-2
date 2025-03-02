import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import translationEN from "../locales/en.json";
import translationMI from "../locales/mi.json";

const resources = {
    en: { translation: translationEN },
    mi: { translation: translationMI },
};

i18n.use(initReactI18next)
    .use(LanguageDetector) // Detect user language
    .init({
        resources,
        fallbackLng: "en", // Default to English
        interpolation: { escapeValue: false },
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"], // Store selected language in localStorage
        },
    });

export default i18n;
