import React, { useState, useMemo } from "react";
import {
	Dialog,
	DialogContent,
	TextField,
	InputAdornment,
	List,
	Typography,
	Box,
	IconButton,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useChat } from "../../contexts/ChatContext";
import { useLanguage } from "../../contexts/LanguageContext";
import ChatHistoryItem from "./ChatHistoryItem";

interface SearchModalProps {
	open: boolean;
	onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ open, onClose }) => {
	const { currentChat, chatHistory, selectChat, deleteChat } = useChat();
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

	const handleSelectChat = (chatId: string) => {
		selectChat(chatId);
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="sm"
			fullWidth
			PaperProps={{
				sx: {
					borderRadius: 2,
					maxHeight: "80vh",
				},
			}}
		>
			<Box
				sx={{
					p: "16px 16px 8px 16px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Typography variant="h6" fontWeight={600}>
					{t("chat.searchHistory")}
				</Typography>
				<IconButton onClick={onClose} size="small">
					<CloseRoundedIcon />
				</IconButton>
			</Box>

			<DialogContent sx={{ pt: 0 }}>
				<TextField
					fullWidth
					size="small"
					autoFocus
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
						mt: 1,
						mb: 2,
						"& .MuiOutlinedInput-root": {
							borderRadius: 2,
						},
					}}
				/>

				<Box sx={{ maxHeight: "50vh", overflowY: "auto" }}>
					{chatHistory.length === 0 ? (
						<Box sx={{ py: 4, textAlign: "center" }}>
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
										sx={{ px: 2, py: 1, display: "block", fontWeight: 600 }}
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
										sx={{ px: 2, py: 1, display: "block", fontWeight: 600 }}
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
										sx={{ px: 2, py: 1, display: "block", fontWeight: 600 }}
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
										sx={{ px: 2, py: 1, display: "block", fontWeight: 600 }}
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
										sx={{ px: 2, py: 1, display: "block", fontWeight: 600 }}
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
			</DialogContent>
		</Dialog>
	);
};

export default SearchModal;
