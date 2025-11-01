import React, { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material";

declare module "@mui/material/styles" {
	interface Palette {
		contrast: Palette["primary"];
		hover: Palette["primary"];
	}
	interface PaletteOptions {
		contrast?: PaletteOptions["primary"];
		hover?: PaletteOptions["primary"];
	}
}

interface ThemeContextType {
	mode: ThemeMode;
	toggleTheme: () => void;
	setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [mode, setMode] = useState<ThemeMode>(() => {
		const saved = localStorage.getItem("themeMode") as ThemeMode;
		return saved && (saved === "light" || saved === "dark") ? saved : "light";
	});

	const setTheme = useCallback((newMode: ThemeMode) => {
		setMode(newMode);
		localStorage.setItem("themeMode", newMode);
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme(mode === "light" ? "dark" : "light");
	}, [mode, setTheme]);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					primary: {
						main: "#2F6BFF",
						light: "#5A8FFF",
						dark: "#1E4ED8",
					},
					secondary: {
						main: "#38B2AC",
						light: "#4FD1C5",
						dark: "#319795",
					},
					background: {
						default: mode === "light" ? "#F7F7F7" : "#1A1A1A",
					},
					text: {
						primary: mode === "light" ? "#1A202C" : "#F7FAFC",
						secondary: mode === "light" ? "#4A5568" : "#A0AEC0",
					},
					contrast: {
						main: mode === "light" ? "#333333" : "#FFFFFF",
						light: mode === "light" ? "#666666" : "#FFFFFF",
						dark: mode === "light" ? "#000000" : "#FFFFFF",
					},
					hover: {
						main: mode === "light" ? "#E5E5E5" : "#2C2C2C",
					},
				},
				typography: {
					fontFamily: "Roboto, sans-serif",
					allVariants: {
						color: mode === "light" ? "#1A202C" : "#F7FAFC",
					},
				},
				shape: {
					borderRadius: 12,
				},
				components: {
					MuiButton: {
						styleOverrides: {
							root: {
								textTransform: "none",
								fontWeight: 600,
								borderRadius: "10px",
							},
						},
					},
					MuiTextField: {
						styleOverrides: {
							root: {
								"& .MuiOutlinedInput-root": {
									borderRadius: "10px",
								},
							},
						},
					},
				},
			}),
		[mode]
	);

	return (
		<ThemeContext.Provider value={{ mode, toggleTheme, setTheme }}>
			<MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
		</ThemeContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useThemeContext must be used within a ThemeProvider");
	}
	return context;
};
