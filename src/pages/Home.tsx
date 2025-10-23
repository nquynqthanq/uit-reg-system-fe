import React, { useEffect, useRef } from "react";
import ChatInput from "../components/ChatInput";
import MessageItem from "../components/shared/MessageItem";
import { Stack } from "@mui/material";
import AssistantMessageItem from "../components/shared/AssistantMessageItem";

interface Message {
	text: string;
	timestamp: Date;
	sender: "user" | "assistant"; // Thêm loại sender để phân biệt người gửi
}

const Home = () => {
	const [messages, setMessages] = React.useState<Message[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);
	const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSend = (message: string) => {
		const newMessage: Message = {
			text: message,
			timestamp: new Date(),
			sender: "user",
		};
		setMessages((prevMessages) => [...prevMessages, newMessage]);
		setLoading(true);
		setTimeout(() => {
			const autoReply: Message = {
				text: "Đây là tin nhắn trả lời tự động từ trợ lý.",
				timestamp: new Date(),
				sender: "assistant",
			};
			setMessages((prevMessages) => [...prevMessages, autoReply]);
			setLoading(false);
		}, 5000);
	};

	const formatTimestamp = (timestamp: Date) => {
		return timestamp.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});
	};

	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				flexDirection: "row",
			}}
		>
			<Stack
				spacing={1}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-end",
					maxWidth: "60%",
					overflowY: "auto",
					padding: "6rem",
					flex: 1,
				}}
			>
				{messages.map((msg, index) =>
					msg.sender === "user" ? (
						<MessageItem key={index} text={msg.text} timestamp={formatTimestamp(msg.timestamp)} />
					) : (
						<AssistantMessageItem
							key={index}
							text={msg.text}
							timestamp={formatTimestamp(msg.timestamp)}
						/>
					)
				)}
				<div ref={endOfMessagesRef} />
			</Stack>
			<ChatInput onSend={handleSend} onLoading={loading} />
		</div>
	);
};

export default Home;
