import React, { useState, useMemo } from "react";
import {
	Drawer,
	Box,
	List,
	IconButton,
	Typography,
	Divider,
	useTheme,
	Tooltip,
	Menu,
	MenuItem,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import { useChat } from "../../contexts/ChatContext";
import { useLanguage } from "../../contexts/LanguageContext";
import ChatHistoryItem from "../ui/ChatHistoryItem";
import UserMenu from "../ui/UserMenu";
import SearchModal from "../ui/SearchModal";
import Logo from "../shared/Logo";
import { COLLAPSED_WIDTH, DRAWER_WIDTH } from "@/constants/AuthenticationConstant";

interface AuthenticatedSidebarProps {
	collapsed: boolean;
	open: boolean;
	onToggle: () => void;
	onClose: () => void;
	isMobile: boolean;
}

const AuthenticatedSidebar: React.FC<AuthenticatedSidebarProps> = ({
	collapsed,
	open,
	onToggle,
	onClose,
	isMobile,
}) => {
	const theme = useTheme();
	const { currentChat, chatHistory, createNewChat, selectChat, deleteChat } = useChat();
	const { t } = useLanguage();
	const [searchModalOpen, setSearchModalOpen] = useState(false);
	const [historyMenuAnchor, setHistoryMenuAnchor] = useState<null | HTMLElement>(null);

	const handleNewChat = () => {
		createNewChat();
		if (isMobile) onClose();
	};

	const handleOpenSearchModal = () => {
		setSearchModalOpen(true);
	};

	const handleCloseSearchModal = () => {
		setSearchModalOpen(false);
	};

	const handleHistoryMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setHistoryMenuAnchor(event.currentTarget);
	};

	const handleHistoryMenuClose = () => {
		setHistoryMenuAnchor(null);
	};

	const handleSelectChatFromMenu = (chatId: string) => {
		selectChat(chatId);
		handleHistoryMenuClose();
		if (isMobile) onClose();
	};

	const handleSelectChat = (chatId: string) => {
		selectChat(chatId);
		if (isMobile) onClose();
	};

	// Recent chats for collapsed view
	const recentChats = useMemo(() => {
		return chatHistory.slice(0, 10);
	}, [chatHistory]);

	// Collapsed view content
	const collapsedContent = (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				alignItems: "center",
				py: 2,
			}}
		>
			{/* Logo icon */}
			<Box sx={{ mb: 2 }}>
				<Logo />
			</Box>

			<Divider sx={{ width: "100%" }} />

			{/* Search button */}
			<Tooltip title={t("common.search")} placement="right">
				<IconButton onClick={handleOpenSearchModal} sx={{ my: 1, color: "text.primary" }}>
					<SearchRoundedIcon />
				</IconButton>
			</Tooltip>

			{/* New Chat button */}
			<Tooltip title={t("nav.newChat")} placement="right">
				<IconButton onClick={handleNewChat} sx={{ my: 1, color: "text.primary" }}>
					<DrawOutlinedIcon />
				</IconButton>
			</Tooltip>

			{/* History button with popup */}
			<Tooltip title={t("nav.history")} placement="right">
				<IconButton onClick={handleHistoryMenuOpen} sx={{ my: 1, color: "text.primary" }}>
					<RestoreOutlinedIcon />
				</IconButton>
			</Tooltip>

			<Box sx={{ flexGrow: 1 }} />

			<Divider sx={{ width: "100%", mb: 2 }} />

			{/* User Menu */}
			<Box sx={{ mb: 1 }}>
				<UserMenu />
			</Box>

			{/* Toggle button */}
			<Tooltip title={t("nav.expandSidebar")} placement="right">
				<IconButton onClick={onToggle} sx={{ color: "text.primary" }}>
					<KeyboardDoubleArrowRightOutlinedIcon />
				</IconButton>
			</Tooltip>
		</Box>
	);

	// Expanded view content
	const expandedContent = (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
			{/* Header */}
			<Box sx={{ px: 2, py: 2 }}>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
					<Logo />
					<Tooltip title={t("nav.collapseSidebar")}>
						<IconButton onClick={onToggle} size="small">
							<KeyboardDoubleArrowLeftOutlinedIcon />
						</IconButton>
					</Tooltip>
				</Box>

				{/* Search button */}
				<IconButton
					onClick={handleOpenSearchModal}
					color="inherit"
					sx={{
						width: "100%",
						borderRadius: 2,
						py: 1,
						mb: 1,
						"&:hover": {
							bgcolor: "action.hover",
						},
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-start",
					}}
				>
					<SearchRoundedIcon sx={{ mr: 1 }} />
					<Typography variant="body2" fontWeight={400}>
						{t("common.search")}
					</Typography>
				</IconButton>

				{/* New Chat button */}
				<IconButton
					onClick={handleNewChat}
					color="inherit"
					sx={{
						width: "100%",
						borderRadius: 2,
						py: 1,
						"&:hover": {
							bgcolor: "action.hover",
						},
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-start",
					}}
				>
					<DrawOutlinedIcon sx={{ mr: 1 }} />
					<Typography variant="body2" fontWeight={400}>
						{t("nav.newChat")}
					</Typography>
				</IconButton>
			</Box>

			<Divider />

			{/* Chat History - Always visible in expanded view */}
			<Box sx={{ flexGrow: 1, overflowY: "auto", py: 1 }}>
				{chatHistory.length === 0 ? (
					<Box sx={{ px: 3, py: 4, textAlign: "center" }}>
						<Typography variant="body2" color="text.secondary">
							{t("chat.noHistory")}
						</Typography>
					</Box>
				) : (
					<List dense sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
						{recentChats.map((chat) => (
							<ChatHistoryItem
								key={chat.id}
								chat={chat}
								isActive={currentChat?.id === chat.id}
								onSelect={handleSelectChat}
								onDelete={deleteChat}
							/>
						))}
					</List>
				)}
			</Box>

			<Divider />

			{/* User Section */}
			<Box
				sx={{
					p: 2,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<UserMenu />
				<Tooltip title={t("nav.collapseSidebar")}>
					<IconButton onClick={onToggle} size="small" sx={{ color: "text.primary" }}>
						<KeyboardDoubleArrowLeftOutlinedIcon />
					</IconButton>
				</Tooltip>
			</Box>
		</Box>
	);

	return (
		<>
			<Drawer
				variant={isMobile ? "temporary" : "permanent"}
				open={open}
				onClose={onClose}
				ModalProps={{
					keepMounted: true, // Better mobile performance
				}}
				sx={{
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: isMobile ? DRAWER_WIDTH : collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
						boxSizing: "border-box",
						borderRight: 1,
						borderColor: "divider",
						transition: theme.transitions.create("width", {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.enteringScreen,
						}),
						overflowX: "hidden",
					},
				}}
			>
				{isMobile || !collapsed ? expandedContent : collapsedContent}
			</Drawer>

			{/* Search Modal */}
			<SearchModal open={searchModalOpen} onClose={handleCloseSearchModal} />

			{/* History Menu for collapsed view */}
			<Menu
				anchorEl={historyMenuAnchor}
				open={Boolean(historyMenuAnchor)}
				onClose={handleHistoryMenuClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				PaperProps={{
					sx: {
						width: 280,
						maxHeight: 400,
					},
				}}
				MenuListProps={{
					sx: {
						py: 0,
					},
				}}
			>
				{/* Fixed Header */}
				<Box
					sx={{
						position: "sticky",
						top: 0,
						bgcolor: "background.paper",
						zIndex: 1,
						px: 2,
						py: 1,
						borderBottom: 1,
						borderColor: "divider",
					}}
				>
					<Typography variant="subtitle2" fontWeight={600}>
						{t("nav.history")}
					</Typography>
				</Box>

				{/* Scrollable Content */}
				<Box
					sx={{
						maxHeight: 340,
						overflowY: "auto",
						"&::-webkit-scrollbar": {
							display: "none",
						},
						scrollbarWidth: "none",
						msOverflowStyle: "none",
					}}
				>
					{recentChats.length === 0 ? (
						<MenuItem disabled>
							<Typography variant="body2" color="text.secondary">
								{t("chat.noHistory")}
							</Typography>
						</MenuItem>
					) : (
						recentChats.map((chat) => (
							<MenuItem
								key={chat.id}
								onClick={() => handleSelectChatFromMenu(chat.id)}
								selected={currentChat?.id === chat.id}
							>
								<Box sx={{ overflow: "hidden" }}>
									<Typography variant="body2" noWrap>
										{chat.title}
									</Typography>
									<Typography variant="caption" color="text.secondary">
										{chat.messages.length} {chat.messages.length === 1 ? "message" : "messages"}
									</Typography>
								</Box>
							</MenuItem>
						))
					)}
				</Box>
			</Menu>
		</>
	);
};

export default AuthenticatedSidebar;
