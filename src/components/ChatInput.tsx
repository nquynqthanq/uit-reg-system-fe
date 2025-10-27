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
			sx={{
				width: "100%",
			}}
		>
			<TextField
				multiline
				maxRows={10}
				sx={{
					"& .MuiOutlinedInput-root": {
						borderRadius: "30px",
						padding: "0.5rem 0.5rem 0.5rem 2rem",
						width: "100%",
						backgroundColor: (theme) =>
							theme.palette.mode === "dark" ? "rgba(30, 30, 30, 0.6)" : "rgba(255, 255, 255, 0.6)",
						backdropFilter: "blur(10px)",
						border: (theme) =>
							theme.palette.mode === "dark"
								? "1px solid rgba(255, 255, 255, 0.1)"
								: "1px solid rgba(0, 0, 0, 0.1)",
						"& fieldset": {
							borderColor: "transparent",
						},
						"&:hover fieldset": {
							borderColor: "transparent",
						},
						"&.Mui-focused fieldset": {
							borderColor: "primary.main",
							borderWidth: "1px",
						},
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
					if (e.key === "Enter" && !e.shiftKey && onLoading === false) {
						e.preventDefault();
						handleSend();
					}
				}}
				InputProps={{
					endAdornment: (
						<IconButton
							sx={{
								bgcolor: "primary.main",
								color: "white",
								"&:hover": {
									bgcolor: "primary.dark",
								},
								"&:focus": {
									bgcolor: "primary.light",
								},
								alignSelf: "flex-end",
								"&.Mui-disabled": {
									bgcolor: "action.disabledBackground",
								},
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
	);
};

export default ChatInput;
