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
					maxWidth: { xs: "85%", sm: "75%", md: "60%" },
					padding: "0.8rem 1.4rem",
					borderRadius: "16px",
					backgroundColor: "primary.main",
					wordWrap: "break-word",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Typography variant="body1" sx={{ color: "white" }}>
					{text}
				</Typography>
			</Box>
			<Typography
				variant="caption"
				sx={{ alignSelf: "flex-end", marginTop: "0.4rem", color: "text.secondary" }}
			>
				{timestamp}
			</Typography>
		</>
	);
};

export default MessageItem;
