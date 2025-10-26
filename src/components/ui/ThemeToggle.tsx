import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";

const ThemeToggle: React.FC = () => {
	const { mode, toggleTheme } = useThemeContext();
	const { t } = useLanguage();

	return (
		<Tooltip title={mode === "light" ? t("settings.darkMode") : t("settings.lightMode")}>
			<IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 1 }}>
				{mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
			</IconButton>
		</Tooltip>
	);
};

export default ThemeToggle;
