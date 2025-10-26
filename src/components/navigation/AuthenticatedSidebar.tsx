import React, { useState, useMemo } from "react";
import {
	Drawer,
	Box,
	List,
	TextField,
	IconButton,
	Typography,
	Divider,
	InputAdornment,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useChat } from "../../contexts/ChatContext";
import { useLanguage } from "../../contexts/LanguageContext";
import ChatHistoryItem from "../ui/ChatHistoryItem";
import UserMenu from "../ui/UserMenu";
import SettingsMenu from "../ui/SettingsMenu";

interface AuthenticatedSidebarProps {
	open: boolean;
	onClose: () => void;
}

const DRAWER_WIDTH = 280;

const AuthenticatedSidebar: React.FC<AuthenticatedSidebarProps> = ({ open, onClose }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const { currentChat, chatHistory, createNewChat, selectChat, deleteChat } = useChat();
	const { t } = useLanguage();
	const [searchQuery, setSearchQuery] = useState("");

	// Group chats by date
	const groupedChats = useMemo(() => {
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);
		const last7Days = new Date(today);
		last7Days.setDate(last7Days.getDate() - 7);
		const last30Days = new Date(today);
		last30Days.setDate(last30Days.getDate() - 30);

		const groups = {
			today: [] as typeof chatHistory,
			yesterday: [] as typeof chatHistory,
			last7Days: [] as typeof chatHistory,
			last30Days: [] as typeof chatHistory,
			older: [] as typeof chatHistory,
		};

		const filtered = searchQuery
			? chatHistory.filter(
					(chat) =>
						chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
						chat.messages.some((msg) => msg.text.toLowerCase().includes(searchQuery.toLowerCase()))
				)
			: chatHistory;

		filtered.forEach((chat) => {
			const chatDate = new Date(chat.updatedAt);
			if (chatDate >= today) {
				groups.today.push(chat);
			} else if (chatDate >= yesterday) {
				groups.yesterday.push(chat);
			} else if (chatDate >= last7Days) {
				groups.last7Days.push(chat);
			} else if (chatDate >= last30Days) {
				groups.last30Days.push(chat);
			} else {
				groups.older.push(chat);
			}
		});

		return groups;
	}, [chatHistory, searchQuery]);

	const handleNewChat = () => {
		createNewChat();
		if (isMobile) {
			onClose();
		}
	};

	const handleSelectChat = (chatId: string) => {
		selectChat(chatId);
		if (isMobile) {
			onClose();
		}
	};

	const drawerContent = (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100%", pt: 8 }}>
			{/* Header */}
			<Box sx={{ px: 2, py: 2 }}>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
					<IconButton
						onClick={handleNewChat}
						color="primary"
						sx={{
							width: "100%",
							borderRadius: 2,
							border: 1,
							borderColor: "divider",
							py: 1.5,
							"&:hover": {
								bgcolor: "action.hover",
							},
						}}
					>
						<AddCircleOutlineRoundedIcon sx={{ mr: 1 }} />
						<Typography variant="body2" fontWeight={600}>
							{t("nav.newChat")}
						</Typography>
					</IconButton>
					{isMobile && (
						<IconButton onClick={onClose} sx={{ ml: 1 }}>
							<CloseRoundedIcon />
						</IconButton>
					)}
				</Box>

				{/* Search */}
				<TextField
					fullWidth
					size="small"
					placeholder={t("chat.searchHistory")}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchRoundedIcon fontSize="small" />
							</InputAdornment>
						),
					}}
					sx={{
						"& .MuiOutlinedInput-root": {
							borderRadius: 2,
						},
					}}
				/>
			</Box>

			<Divider />

			{/* Chat History */}
			<Box sx={{ flexGrow: 1, overflowY: "auto", py: 1 }}>
				{chatHistory.length === 0 ? (
					<Box sx={{ px: 3, py: 4, textAlign: "center" }}>
						<Typography variant="body2" color="text.secondary">
							{t("chat.noHistory")}
						</Typography>
					</Box>
				) : (
					<>
						{groupedChats.today.length > 0 && (
							<>
								<Typography
									variant="caption"
									sx={{ px: 3, py: 1, display: "block", fontWeight: 600 }}
								>
									{t("chat.today")}
								</Typography>
								<List dense sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
									{groupedChats.today.map((chat) => (
										<ChatHistoryItem
											key={chat.id}
											chat={chat}
											isActive={currentChat?.id === chat.id}
											onSelect={handleSelectChat}
											onDelete={deleteChat}
										/>
									))}
								</List>
							</>
						)}

						{groupedChats.yesterday.length > 0 && (
							<>
								<Typography
									variant="caption"
									sx={{ px: 3, py: 1, display: "block", fontWeight: 600 }}
								>
									{t("chat.yesterday")}
								</Typography>
								<List dense sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
									{groupedChats.yesterday.map((chat) => (
										<ChatHistoryItem
											key={chat.id}
											chat={chat}
											isActive={currentChat?.id === chat.id}
											onSelect={handleSelectChat}
											onDelete={deleteChat}
										/>
									))}
								</List>
							</>
						)}

						{groupedChats.last7Days.length > 0 && (
							<>
								<Typography
									variant="caption"
									sx={{ px: 3, py: 1, display: "block", fontWeight: 600 }}
								>
									{t("chat.last7Days")}
								</Typography>
								<List dense sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
									{groupedChats.last7Days.map((chat) => (
										<ChatHistoryItem
											key={chat.id}
											chat={chat}
											isActive={currentChat?.id === chat.id}
											onSelect={handleSelectChat}
											onDelete={deleteChat}
										/>
									))}
								</List>
							</>
						)}

						{groupedChats.last30Days.length > 0 && (
							<>
								<Typography
									variant="caption"
									sx={{ px: 3, py: 1, display: "block", fontWeight: 600 }}
								>
									{t("chat.last30Days")}
								</Typography>
								<List dense sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
									{groupedChats.last30Days.map((chat) => (
										<ChatHistoryItem
											key={chat.id}
											chat={chat}
											isActive={currentChat?.id === chat.id}
											onSelect={handleSelectChat}
											onDelete={deleteChat}
										/>
									))}
								</List>
							</>
						)}

						{groupedChats.older.length > 0 && (
							<>
								<Typography
									variant="caption"
									sx={{ px: 3, py: 1, display: "block", fontWeight: 600 }}
								>
									{t("chat.older")}
								</Typography>
								<List dense sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
									{groupedChats.older.map((chat) => (
										<ChatHistoryItem
											key={chat.id}
											chat={chat}
											isActive={currentChat?.id === chat.id}
											onSelect={handleSelectChat}
											onDelete={deleteChat}
										/>
									))}
								</List>
							</>
						)}
					</>
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
				<SettingsMenu />
			</Box>
		</Box>
	);

	return (
		<>
			<Drawer
				variant={isMobile ? "temporary" : "persistent"}
				open={open}
				onClose={onClose}
				sx={{
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: DRAWER_WIDTH,
						boxSizing: "border-box",
						borderRight: 1,
						borderColor: "divider",
					},
				}}
			>
				{drawerContent}
			</Drawer>
		</>
	);
};

export default AuthenticatedSidebar;
// eslint-disable-next-line react-refresh/only-export-components
export { DRAWER_WIDTH };
