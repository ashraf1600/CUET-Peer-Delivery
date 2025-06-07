// "use client";

// import { create } from "zustand";
// import englishTranslations from "@/components/Translations/en.json";
// import banglaTranslations from "@/components/translations/bn.json";

// export type Language = "en" | "bn";

// // Type for the translations object
// export type TranslationsType = Record<string, string>;

// // Local translations map
// const translations = {
//   en: englishTranslations,
//   bn: banglaTranslations,
// };

// interface LanguageState {
//   language: Language;
//   translations: TranslationsType;

//   // Actions
//   setLanguage: (language: Language) => void;
//   t: (key: string) => string;
// }

// export const useLanguageStore = create<LanguageState>((set, get) => ({
//   language: "en",
//   translations: englishTranslations,

//   // Set language directly from local files
//   setLanguage: (language: Language) => {
//     set({
//       language,
//       translations: translations[language],
//     });
//   },

//   // Translation function
//   t: (key: string) => {
//     const { translations } = get();
//     return translations[key] || key;
//   },
// }));
