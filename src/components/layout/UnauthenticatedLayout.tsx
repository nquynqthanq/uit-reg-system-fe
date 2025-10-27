import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import UnauthenticatedHeader from "../navigation/UnauthenticatedHeader";

const UnauthenticatedLayout: React.FC = () => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
			<UnauthenticatedHeader />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					bgcolor: "background.default",
					position: "relative",
					overflow: "hidden",
					pt: 7,
				}}
			>
				<Outlet />
			</Box>
		</Box>
	);
};

export default UnauthenticatedLayout;
