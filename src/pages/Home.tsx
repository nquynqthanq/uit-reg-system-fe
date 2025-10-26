import React, { useEffect, useRef } from "react";
import { Box, Stack, Typography, Container } from "@mui/material";
import ChatInput from "../components/ChatInput";
import MessageItem from "../components/shared/MessageItem";
import AssistantMessageItem from "../components/shared/AssistantMessageItem";
import { useChat } from "../contexts/ChatContext";
import { useLanguage } from "../contexts/LanguageContext";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

const Home: React.FC = () => {
	const { currentChat, sendMessage, isLoading } = useChat();
	const { t } = useLanguage();
	const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [currentChat?.messages]);

	const handleSend = async (message: string) => {
		await sendMessage(message);
	};

	const formatTimestamp = (timestamp: Date) => {
		return timestamp.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				position: "relative",
				height: "calc(100vh - 120px)",
			}}
		>
			<Container maxWidth="md" sx={{ flexGrow: 1 }}>
				{!currentChat || currentChat.messages.length === 0 ? (
					// Empty State
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							minHeight: "60vh",
							textAlign: "center",
							px: 2,
						}}
					>
						<Box
							sx={{
								width: 80,
								height: 80,
								borderRadius: "50%",
								bgcolor: "primary.main",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								mb: 3,
							}}
						>
							<SchoolRoundedIcon sx={{ fontSize: 48, color: "white" }} />
						</Box>
						<Typography variant="h4" fontWeight={700} gutterBottom>
							{t("chat.emptyChat")}
						</Typography>
						<Typography variant="body1" color="text.secondary" maxWidth="sm">
							{t("chat.emptyState")}
						</Typography>
					</Box>
				) : (
					// Messages
					<Stack spacing={2} sx={{ py: 3 }}>
						{currentChat.messages.map((msg, index) =>
							msg.sender === "user" ? (
								<Box
									key={index}
									sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
								>
									<MessageItem text={msg.text} timestamp={formatTimestamp(msg.timestamp)} />
								</Box>
							) : (
								<Box
									key={index}
									sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
								>
									<AssistantMessageItem
										text={msg.text}
										timestamp={formatTimestamp(msg.timestamp)}
									/>
								</Box>
							)
						)}
						<div ref={endOfMessagesRef} />
					</Stack>
				)}
			</Container>
			{/* Chat Input */}
			<Container maxWidth="md">
				<ChatInput onSend={handleSend} onLoading={isLoading} />
			</Container>
		</Box>
	);
};

export default Home;
