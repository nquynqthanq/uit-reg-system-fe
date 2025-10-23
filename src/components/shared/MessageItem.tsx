import React from "react";
import { Box, Typography } from "@mui/material";

interface MessageItemProps {
	text: string;
	timestamp: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ text, timestamp }) => {
	return (
		<>
			<Box
				sx={{
					maxWidth: "60%",
					padding: "0.6rem 1.2rem",
					borderRadius: "12px",
					backgroundColor: "#2F6BFF",
					wordWrap: "break-word",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Typography variant="body1">{text}</Typography>
			</Box>
			<Typography
				variant="caption"
				sx={{ alignSelf: "flex-end", marginTop: "0.4rem", color: "#aaa9bc" }}
			>
				{timestamp}
			</Typography>
		</>
	);
};

export default MessageItem;
