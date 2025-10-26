import React from "react";
import { Box, Typography } from "@mui/material";

interface AssistantItemProps {
	text: string;
	timestamp: string;
}

const AssistantMessageItem: React.FC<AssistantItemProps> = ({ text, timestamp }) => {
	return (
		<>
			<Box
				sx={{
					maxWidth: { xs: "85%", sm: "75%", md: "60%" },
					padding: "0.8rem 1.4rem",
					borderRadius: "16px",
					backgroundColor: "action.hover",
					border: 1,
					borderColor: "divider",
					wordWrap: "break-word",
					display: "flex",
					flexDirection: "column",
					alignSelf: "flex-start",
					boxShadow: 1,
				}}
			>
				<Typography variant="body1" color="text.primary">
					{text}
				</Typography>
			</Box>
			<Typography
				variant="caption"
				sx={{ alignSelf: "flex-start", marginTop: "0.4rem", color: "text.secondary" }}
			>
				{timestamp}
			</Typography>
		</>
	);
};

export default AssistantMessageItem;
