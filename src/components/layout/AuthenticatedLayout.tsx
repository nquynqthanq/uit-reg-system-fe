import React, { useState } from "react";
import { Box, AppBar, Toolbar, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
// import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AuthenticatedSidebar, { DRAWER_WIDTH } from "../navigation/AuthenticatedSidebar";
import Logo from "../shared/Logo";
// import { useChat } from "../../contexts/ChatContext";

const AuthenticatedLayout: React.FC = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
	// const { createNewChat } = useChat();

	const handleDrawerToggle = () => {
		setSidebarOpen(!sidebarOpen);
	};

	// const handleNewChat = () => {
	// 	createNewChat();
	// };

	return (
		<Box sx={{ display: "flex", minHeight: "100vh" }}>
			<AuthenticatedSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

			<Box
				sx={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					ml: !isMobile && sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
					transition: theme.transitions.create(["margin"], {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.leavingScreen,
					}),
				}}
			>
				{/* Top AppBar */}
				<AppBar
					position="fixed"
					sx={{
						bgcolor: "background.paper",
						boxShadow: 1,
						ml: !isMobile && sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
						width: !isMobile && sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
						transition: theme.transitions.create(["width", "margin"], {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.leavingScreen,
						}),
					}}
				>
					<Toolbar sx={{ justifyContent: "space-between" }}>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<IconButton color="primary" edge="start" onClick={handleDrawerToggle}>
								<MenuRoundedIcon />
							</IconButton>
						</Box>

						<Logo />

						{/* <Box sx={{ display: "flex", alignItems: "center" }}>
							<IconButton color="primary" onClick={handleNewChat}>
								<AddCircleOutlineRoundedIcon />
							</IconButton>
						</Box> */}
					</Toolbar>
				</AppBar>

				{/* Main Content */}
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						pt: 8,
						bgcolor: "background.default",
						minHeight: "100vh",
					}}
				>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default AuthenticatedLayout;
