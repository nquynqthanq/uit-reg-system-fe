import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import UnauthenticatedHeader from "../navigation/UnauthenticatedHeader";

const UnauthenticatedLayout: React.FC = () => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
			<UnauthenticatedHeader />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					pt: 8,
					bgcolor: "background.default",
				}}
			>
				<Outlet />
			</Box>
		</Box>
	);
};

export default UnauthenticatedLayout;
