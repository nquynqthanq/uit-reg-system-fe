import React, { useState } from "react";
import {
	IconButton,
	Menu,
	MenuItem,
	Avatar,
	ListItemIcon,
	ListItemText,
	Divider,
	Box,
	Typography,
} from "@mui/material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const UserMenu: React.FC = () => {
	const { user, logout } = useAuth();
	const { t } = useLanguage();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logout();
		handleClose();
		navigate("/");
	};

	if (!user) return null;

	return (
		<>
			<IconButton onClick={handleClick} sx={{ p: 0.5 }}>
				<Avatar
					src={user.avatar}
					alt={user.name}
					sx={{
						width: 40,
						height: 40,
						border: (theme) => `2px solid ${theme.palette.primary.main}`,
					}}
				/>
			</IconButton>
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
				sx={{ mt: 1 }}
				PaperProps={{
					sx: { minWidth: 220 },
				}}
			>
				<Box sx={{ px: 2, py: 1.5 }}>
					<Typography variant="subtitle2" fontWeight={600}>
						{user.name}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						{user.email}
					</Typography>
				</Box>

				<Divider />

				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<PersonRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>{t("user.profile")}</ListItemText>
				</MenuItem>

				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<SettingsRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>{t("user.settings")}</ListItemText>
				</MenuItem>

				<Divider />

				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<LogoutRoundedIcon fontSize="small" color="error" />
					</ListItemIcon>
					<ListItemText primaryTypographyProps={{ color: "error" }}>
						{t("user.signOut")}
					</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
};

export default UserMenu;
