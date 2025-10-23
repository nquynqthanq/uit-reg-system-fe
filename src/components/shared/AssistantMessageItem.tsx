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
					maxWidth: "60%",
					padding: "0.6rem 1.2rem",
					borderRadius: "12px",
					backgroundColor: "#E2E8F0", // Màu sắc khác để phân biệt
					wordWrap: "break-word",
					display: "flex",
					flexDirection: "column",
					alignSelf: "flex-start", // Căn lề trái cho AssistantItem
				}}
			>
				<Typography variant="body1" color="#000">
					{" "}
					{/* Màu chữ khác */}
					{text}
				</Typography>
			</Box>
			<Typography
				variant="caption"
				sx={{ alignSelf: "flex-start", marginTop: "0.4rem", color: "#aaa9bc" }}
			>
				{timestamp}
			</Typography>
		</>
	);
};

export default AssistantMessageItem;
