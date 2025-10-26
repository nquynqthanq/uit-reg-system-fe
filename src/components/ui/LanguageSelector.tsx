import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip, ListItemText } from "@mui/material";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import CheckIcon from "@mui/icons-material/Check";
import { useLanguage } from "../../contexts/LanguageContext";
import type { Language } from "../../types/language";

const LanguageSelector: React.FC = () => {
	const { language, setLanguage, t } = useLanguage();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLanguageChange = (lang: Language) => {
		setLanguage(lang);
		handleClose();
	};

	return (
		<>
			<Tooltip title={t("settings.language")}>
				<IconButton onClick={handleClick} color="inherit" sx={{ ml: 1 }}>
					<LanguageRoundedIcon />
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
			>
				<MenuItem onClick={() => handleLanguageChange("vi")}>
					<ListItemText>Tiếng Việt</ListItemText>
					{language === "vi" && <CheckIcon fontSize="small" sx={{ ml: 2 }} />}
				</MenuItem>
				<MenuItem onClick={() => handleLanguageChange("en")}>
					<ListItemText>English</ListItemText>
					{language === "en" && <CheckIcon fontSize="small" sx={{ ml: 2 }} />}
				</MenuItem>
			</Menu>
		</>
	);
};

export default LanguageSelector;
