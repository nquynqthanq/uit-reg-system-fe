import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

/**
 * Custom hook to manage theme with localStorage persistence
 */
export function useTheme(defaultTheme: Theme = "system"): [Theme, (theme: Theme) => void] {
	const [theme, setThemeState] = useState<Theme>(() => {
		const stored = localStorage.getItem("theme") as Theme;
		return stored || defaultTheme;
	});

	useEffect(() => {
		const root = window.document.documentElement;
		const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";

		const effectiveTheme = theme === "system" ? systemTheme : theme;

		root.classList.remove("light", "dark");
		root.classList.add(effectiveTheme);
	}, [theme]);

	const setTheme = (newTheme: Theme) => {
		localStorage.setItem("theme", newTheme);
		setThemeState(newTheme);
	};

	return [theme, setTheme];
}
