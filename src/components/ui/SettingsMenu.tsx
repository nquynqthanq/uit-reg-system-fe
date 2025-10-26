import React, { useState } from "react";
import {
	IconButton,
	Menu,
	MenuItem,
	Divider,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import CheckIcon from "@mui/icons-material/Check";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import type { Language } from "../../types/language";

const SettingsMenu: React.FC = () => {
	const { mode, setTheme } = useThemeContext();
	const { language, setLanguage, t } = useLanguage();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleThemeChange = (newMode: "light" | "dark") => {
		setTheme(newMode);
	};

	const handleLanguageChange = (lang: Language) => {
		setLanguage(lang);
	};

	return (
		<>
			<Tooltip title={t("settings.title")}>
				<IconButton
					onClick={handleClick}
					sx={{
						ml: 1,
						color: "text.primary",
					}}
				>
					<SettingsOutlinedIcon color="primary" />
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				sx={{
					mt: 1,
					"& .MuiPaper-root": {
						width: "200px !important",
					},
				}}
			>
				<MenuItem disabled>
					<ListItemText primaryTypographyProps={{ fontWeight: 600 }}>
						{t("settings.theme")}
					</ListItemText>
				</MenuItem>
				<MenuItem onClick={() => handleThemeChange("light")}>
					<ListItemIcon>
						<LightModeRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>{t("settings.lightMode")}</ListItemText>
					{mode === "light" && <CheckIcon fontSize="small" />}
				</MenuItem>
				<MenuItem onClick={() => handleThemeChange("dark")}>
					<ListItemIcon>
						<DarkModeRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>{t("settings.darkMode")}</ListItemText>
					{mode === "dark" && <CheckIcon fontSize="small" />}
				</MenuItem>

				<Divider sx={{ my: 1 }} />

				<MenuItem disabled>
					<ListItemText primaryTypographyProps={{ fontWeight: 600 }}>
						{t("settings.language")}
					</ListItemText>
				</MenuItem>
				<MenuItem onClick={() => handleLanguageChange("vi")}>
					<ListItemIcon>
						<LanguageRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Tiếng Việt</ListItemText>
					{language === "vi" && <CheckIcon fontSize="small" />}
				</MenuItem>
				<MenuItem onClick={() => handleLanguageChange("en")}>
					<ListItemIcon>
						<LanguageRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>English</ListItemText>
					{language === "en" && <CheckIcon fontSize="small" />}
				</MenuItem>
			</Menu>
		</>
	);
};

export default SettingsMenu;
