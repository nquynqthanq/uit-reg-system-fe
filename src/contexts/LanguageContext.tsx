import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { translations } from "@locales/index";

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [language, setLanguageState] = useState<Language>(() => {
		const saved = localStorage.getItem("language") as Language;
		return saved && (saved === "en" || saved === "vi") ? saved : "vi";
	});

	const setLanguage = useCallback((lang: Language) => {
		setLanguageState(lang);
		localStorage.setItem("language", lang);
	}, []);

	// Translation function with nested key support (e.g., "auth.signIn")
	const t = useCallback(
		(key: string): string => {
			const keys = key.split(".");
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let value: any = translations[language];

			for (const k of keys) {
				if (value && typeof value === "object" && k in value) {
					value = value[k];
				} else {
					return key; // Return key if translation not found
				}
			}

			return typeof value === "string" ? value : key;
		},
		[language]
	);

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = (): LanguageContextType => {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
};
