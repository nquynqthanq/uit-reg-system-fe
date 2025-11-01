/**
 * Language Types
 */

type Language = "en" | "vi";

type LanguageContextType = {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string) => string;
};
