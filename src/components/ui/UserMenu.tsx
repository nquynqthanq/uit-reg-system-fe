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
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import SettingsModal from "./SettingsModal";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import { HelpIcon } from "@/assets/svgs";

const UserMenu: React.FC = () => {
	const { user, logout } = useAuth();
	const { t } = useLanguage();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [helpAnchorEl, setHelpAnchorEl] = useState<null | HTMLElement>(null);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const helpCloseTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
	const open = Boolean(anchorEl);
	const helpOpen = Boolean(helpAnchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setHelpAnchorEl(null);
		if (helpCloseTimeoutRef.current) {
			clearTimeout(helpCloseTimeoutRef.current);
		}
	};

	const handleHelpMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
		// Clear any pending close timeout
		if (helpCloseTimeoutRef.current) {
			clearTimeout(helpCloseTimeoutRef.current);
		}
		setHelpAnchorEl(event.currentTarget);
	};

	const handleHelpMouseLeave = () => {
		// Delay closing to allow mouse movement to submenu
		helpCloseTimeoutRef.current = setTimeout(() => {
			setHelpAnchorEl(null);
		}, 200);
	};

	const handleHelpSubmenuEnter = () => {
		// Cancel close timeout when entering submenu
		if (helpCloseTimeoutRef.current) {
			clearTimeout(helpCloseTimeoutRef.current);
		}
	};

	const handleHelpSubmenuLeave = () => {
		// Close submenu when leaving it
		setHelpAnchorEl(null);
	};

	const handleOpenSettings = () => {
		setSettingsOpen(true);
		handleClose();
	};

	const handleCloseSettings = () => {
		setSettingsOpen(false);
	};

	const handleLogout = () => {
		logout();
		handleClose();
		navigate("/");
	};

	const handleHelpAction = (action: string) => {
		// Handle different help actions
		console.log(`Help action: ${action}`);
		handleClose();
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
					vertical: "bottom",
					horizontal: "right",
				}}
				sx={{
					mt: 1,
					"& .MuiListItemIcon-root": {
						minWidth: 0,
					},
				}}
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

				<Divider sx={{ my: 1 }} />

				<MenuItem onMouseEnter={handleHelpMouseEnter} onMouseLeave={handleHelpMouseLeave}>
					<ListItemIcon>
						<HelpIcon width={20} height={20} style={{ strokeWidth: 2.5 }} />
					</ListItemIcon>
					<ListItemText sx={{ ml: 2 }}>{t("user.help")}</ListItemText>
					<ListItemIcon>
						<ArrowForwardIosRoundedIcon sx={{ fontSize: 12 }} />
					</ListItemIcon>
				</MenuItem>

				<MenuItem onClick={handleOpenSettings}>
					<ListItemIcon>
						<SettingsRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText sx={{ ml: 2 }}>{t("user.settings")}</ListItemText>
				</MenuItem>

				<Divider sx={{ my: 1 }} />

				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<LogoutRoundedIcon fontSize="small" color="error" />
					</ListItemIcon>
					<ListItemText primaryTypographyProps={{ color: "error" }} sx={{ ml: 2 }}>
						{t("user.signOut")}
					</ListItemText>
				</MenuItem>
			</Menu>

			{/* Help Submenu */}
			<Menu
				anchorEl={helpAnchorEl}
				open={helpOpen}
				onClose={handleHelpSubmenuLeave}
				disableAutoFocusItem
				disableScrollLock
				hideBackdrop
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				sx={{
					ml: 0.5,
					"& .MuiListItemIcon-root": {
						minWidth: 0,
					},
					pointerEvents: "none",
				}}
				PaperProps={{
					sx: {
						minWidth: 200,
						pointerEvents: "auto",
					},
					onMouseEnter: handleHelpSubmenuEnter,
					onMouseLeave: handleHelpSubmenuLeave,
				}}
				MenuListProps={{
					onMouseEnter: handleHelpSubmenuEnter,
					onMouseLeave: handleHelpSubmenuLeave,
				}}
			>
				<MenuItem onClick={() => handleHelpAction("reportIssue")}>
					<ListItemIcon>
						<BugReportRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText sx={{ ml: 2 }}>{t("user.reportIssue")}</ListItemText>
				</MenuItem>

				<MenuItem onClick={() => handleHelpAction("faq")}>
					<ListItemIcon>
						<QuizRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText sx={{ ml: 2 }}>{t("user.faq")}</ListItemText>
				</MenuItem>

				<MenuItem onClick={() => handleHelpAction("changelog")}>
					<ListItemIcon>
						<HistoryRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText sx={{ ml: 2 }}>{t("user.changelog")}</ListItemText>
				</MenuItem>

				<MenuItem onClick={() => handleHelpAction("community")}>
					<ListItemIcon>
						<GroupsRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText sx={{ ml: 2 }}>{t("user.community")}</ListItemText>
				</MenuItem>

				<MenuItem onClick={() => handleHelpAction("shareLinks")}>
					<ListItemIcon>
						<ShareRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText sx={{ ml: 2 }}>{t("user.shareLinks")}</ListItemText>
				</MenuItem>
			</Menu>

			{/* Settings Modal */}
			<SettingsModal open={settingsOpen} onClose={handleCloseSettings} />
		</>
	);
};

export default UserMenu;
