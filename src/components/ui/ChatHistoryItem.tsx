import React, { useState } from "react";
import {
	ListItem,
	ListItemButton,
	ListItemText,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	Box,
} from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useLanguage } from "../../contexts/LanguageContext";
import type { ChatSession } from "../../types/chat";

interface ChatHistoryItemProps {
	chat: ChatSession;
	isActive: boolean;
	onSelect: (chatId: string) => void;
	onDelete: (chatId: string) => void;
}

const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({
	chat,
	isActive,
	onSelect,
	onDelete,
}) => {
	const { t } = useLanguage();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = (event: React.MouseEvent) => {
		event.stopPropagation();
		onDelete(chat.id);
		handleClose();
	};

	return (
		<ListItem
			disablePadding
			secondaryAction={
				<IconButton edge="end" onClick={handleMenuClick} size="small">
					<MoreVertRoundedIcon fontSize="small" />
				</IconButton>
			}
		>
			<ListItemButton
				selected={isActive}
				onClick={() => onSelect(chat.id)}
				sx={{
					borderRadius: 2,
					mx: 1,
					"&.Mui-selected": {
						bgcolor: "action.selected",
					},
				}}
			>
				<ListItemText
					primary={
						<Typography variant="body2" noWrap>
							{chat.title}
						</Typography>
					}
					secondary={
						<Typography variant="caption" color="text.secondary">
							{chat.messages.length} {chat.messages.length === 1 ? "message" : "messages"}
						</Typography>
					}
				/>
			</ListItemButton>

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
				<MenuItem onClick={handleDelete}>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "error.main" }}>
						<DeleteRoundedIcon fontSize="small" />
						<Typography variant="body2">{t("chat.deleteChat")}</Typography>
					</Box>
				</MenuItem>
			</Menu>
		</ListItem>
	);
};

export default ChatHistoryItem;
