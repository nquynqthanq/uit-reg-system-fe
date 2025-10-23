import React, { useState } from "react";
import { TextField, IconButton, Box } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

interface ChatInputProps {
	onSend: (message: string) => void;
	onLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, onLoading }) => {
	const [message, setMessage] = useState<string>("");

	const handleSend = () => {
		if (message.trim()) {
			onSend(message);
			setMessage("");
		}
	};

	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="center"
			sx={{
				position: "fixed",
				bottom: "0rem",
				width: "100%",
				background: "#f7fafc",
				padding: "1rem 1rem",
			}}
		>
			<Box
				sx={{
					width: "60%",
				}}
			>
				<TextField
					multiline
					maxRows={10}
					sx={{
						"& .MuiOutlinedInput-root": {
							borderRadius: "30px",
							background: "#FFFFFF",
							padding: "0.5rem 0.5rem 0.5rem 2rem",
							width: "100%",
							"& textarea": {
								"&::-webkit-scrollbar": {
									display: "none",
								},
								scrollbarWidth: "none",
								msOverflowStyle: "none",
							},
						},
					}}
					fullWidth
					placeholder="Nhập câu hỏi của bạn..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && onLoading === false) {
							e.preventDefault();
							handleSend();
						}
					}}
					InputProps={{
						endAdornment: (
							<IconButton
								sx={{
									bgcolor: "#2F6BFF",
									color: "white",
									"&:hover": {
										bgcolor: "#1E5BFF",
									},
									"&:focus": {
										bgcolor: "#3A7BFF",
									},
									alignSelf: "flex-end",
								}}
								onClick={handleSend}
								disabled={!message.trim() || onLoading}
							>
								<ArrowUpwardRoundedIcon />
							</IconButton>
						),
					}}
				/>
			</Box>
		</Box>
	);
};

export default ChatInput;
