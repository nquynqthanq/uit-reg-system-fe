import React from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../shared/Logo";
import SettingsMenu from "../ui/SettingsMenu";
import { useLanguage } from "../../contexts/LanguageContext";

const UnauthenticatedHeader: React.FC = () => {
	const navigate = useNavigate();
	const { t } = useLanguage();

	return (
		<AppBar
			position="fixed"
			sx={{
				bgcolor: "background.default",
				boxShadow: "none",
			}}
		>
			<Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
				{/* Left: Logo */}
				<Logo />

				{/* Right: Actions */}
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<SettingsMenu />

					<Button
						variant="outlined"
						onClick={() => navigate("/login")}
						sx={{
							ml: 1,
							display: { xs: "none", sm: "inline-flex" },
							minWidth: "100px",
						}}
					>
						{t("auth.signIn")}
					</Button>

					<Button
						variant="contained"
						onClick={() => navigate("/signup")}
						sx={{
							ml: 1,
							minWidth: "100px",
						}}
					>
						{t("auth.signUp")}
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default UnauthenticatedHeader;
