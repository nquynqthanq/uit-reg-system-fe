import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { useLanguage } from "../contexts/LanguageContext";

const NotFound: React.FC = () => {
	const navigate = useNavigate();
	const { t } = useLanguage();

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				bgcolor: "background.default",
			}}
		>
			<Container maxWidth="sm">
				<Box sx={{ textAlign: "center" }}>
					<ErrorOutlineRoundedIcon
						sx={{
							fontSize: 120,
							color: "primary.main",
							mb: 3,
						}}
					/>
					<Typography variant="h1" fontWeight={700} gutterBottom>
						404
					</Typography>
					<Typography variant="h5" fontWeight={600} gutterBottom>
						{t("error.notFound")}
					</Typography>
					<Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
						{t("error.generic")}
					</Typography>
					<Button variant="contained" size="large" onClick={() => navigate("/")}>
						{t("nav.home")}
					</Button>
				</Box>
			</Container>
		</Box>
	);
};

export default NotFound;
