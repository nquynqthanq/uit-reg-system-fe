/**
 * Theme Types
 */

type ThemeMode = "light" | "dark";

type ThemeContextType = {
	mode: ThemeMode;
	toggleTheme: () => void;
	setTheme: (mode: ThemeMode) => void;
};
