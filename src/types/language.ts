/**
 * Language Types
 */

export type Language = "en" | "vi";

export interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string) => string;
}
