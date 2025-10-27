import React, { useState } from "react";
import { Box, useTheme, useMediaQuery, IconButton, Tooltip, AppBar, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import AuthenticatedSidebar from "../navigation/AuthenticatedSidebar";
import { COLLAPSED_WIDTH, DRAWER_WIDTH } from "@/constants/AuthenticationConstant";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChat } from "@/contexts/ChatContext";

const AuthenticatedLayout: React.FC = () => {
	const theme = useTheme();
	const { t } = useLanguage();
	const { createNewChat, currentChat } = useChat();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

	const handleToggleSidebar = () => {
		if (isMobile) {
			setSidebarOpen((prev) => !prev);
		} else {
			setSidebarCollapsed((prev) => !prev);
		}
	};

	const handleCloseSidebar = () => {
		if (isMobile) {
			setSidebarOpen(false);
		}
	};

	const handleShareChat = async () => {
		if (currentChat) {
			const chatUrl = `${window.location.origin}/chat/${currentChat.id}`;
			try {
				await navigator.clipboard.writeText(chatUrl);
				// Có thể thêm toast notification ở đây
				console.log("Link copied to clipboard!");
			} catch (error) {
				console.error("Failed to copy link:", error);
			}
		}
	};

	const handleNewChat = () => {
		createNewChat();
	};

	return (
		<Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
			<AuthenticatedSidebar
				collapsed={sidebarCollapsed}
				open={isMobile ? sidebarOpen : true}
				onToggle={handleToggleSidebar}
				onClose={handleCloseSidebar}
				isMobile={isMobile}
			/>

			<Box
				sx={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					ml: isMobile ? 0 : sidebarCollapsed ? `${COLLAPSED_WIDTH}px` : `${DRAWER_WIDTH}px`,
					transition: theme.transitions.create(["margin"], {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.enteringScreen,
					}),
					overflow: "hidden",
				}}
			>
				{/* Mobile Header */}
				{isMobile && (
					<AppBar
						position="fixed"
						sx={{
							bgcolor: "background.default",
							boxShadow: "none",
							borderBottom: 1,
							borderColor: "divider",
						}}
					>
						<Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
							{/* Left: Menu Button */}
							<Tooltip title={t("nav.expandSidebar")}>
								<IconButton onClick={handleToggleSidebar} sx={{ color: "contrast.main" }}>
									<MenuRoundedIcon />
								</IconButton>
							</Tooltip>

							{/* Right: Action Buttons */}
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<Tooltip title={t("nav.newChat")}>
									<IconButton onClick={handleNewChat} sx={{ color: "contrast.main" }}>
										<DrawOutlinedIcon />
									</IconButton>
								</Tooltip>

								<Tooltip title={t("nav.shareChat")}>
									<IconButton
										onClick={handleShareChat}
										sx={{ color: "contrast.main" }}
										disabled={!currentChat}
									>
										<ShareRoundedIcon />
									</IconButton>
								</Tooltip>
							</Box>
						</Toolbar>
					</AppBar>
				)}

				<Box
					component="main"
					sx={{
						flexGrow: 1,
						bgcolor: "background.default",
						position: "relative",
						overflow: "hidden",
						pt: isMobile ? 7 : 0,
					}}
				>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default AuthenticatedLayout;
