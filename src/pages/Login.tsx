import React, { useState } from "react";
import {
	Box,
	Container,
	TextField,
	Button,
	Typography,
	Paper,
	Alert,
	Link as MuiLink,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { useAuth } from "@hooks/useAuth";
import { useLanguage } from "@contexts/LanguageContext";

const Login: React.FC = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const { t } = useLanguage();

	const [credentials, setCredentials] = useState<LoginRequest>({
		emailOrUsername: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
		setError("");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		// Basic validation
		if (!credentials.emailOrUsername || !credentials.password) {
			setError(t("validation.required"));
			return;
		}

		setLoading(true);

		try {
			await login(credentials);
			navigate("/");
		} catch {
			setError(t("validation.invalidCredentials"));
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			sx={{
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				bgcolor: "background.default",
				py: 4,
				overflow: "auto",
			}}
		>
			<Container maxWidth="sm">
				<Paper
					elevation={0}
					sx={{
						p: { xs: 3, md: 5 },
						borderRadius: 3,
						border: 1,
						borderColor: "divider",
					}}
				>
					<Box sx={{ textAlign: "center", mb: 4 }}>
						<Typography variant="h4" fontWeight={700} gutterBottom>
							{t("auth.welcomeBack")}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{t("auth.dontHaveAccount")}{" "}
							<MuiLink component={Link} to="/signup" underline="hover" fontWeight={600}>
								{t("auth.signUp")}
							</MuiLink>
						</Typography>
					</Box>

					{error && (
						<Alert severity="error" sx={{ mb: 3 }}>
							{error}
						</Alert>
					)}

					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth
							label={t("auth.emailOrUsername")}
							name="emailOrUsername"
							type="text"
							value={credentials.emailOrUsername}
							onChange={handleChange}
							placeholder={t("placeholder.emailOrUsername")}
							sx={{ mb: 2.5 }}
							autoComplete="username or email"
						/>

						<TextField
							fullWidth
							label={t("auth.password")}
							name="password"
							type={showPassword ? "text" : "password"}
							value={credentials.password}
							onChange={handleChange}
							placeholder="••••••••"
							sx={{ mb: 1 }}
							autoComplete="current-password"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => setShowPassword(!showPassword)}
											edge="end"
											size="small"
										>
											{showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

						<Box sx={{ textAlign: "right", mb: 3 }}>
							<MuiLink component={Link} to="/reset-password" underline="hover" variant="body2">
								{t("auth.forgotPassword")}
							</MuiLink>
						</Box>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							size="large"
							disabled={loading}
							sx={{
								py: 1.5,
								fontSize: "1rem",
								fontWeight: 600,
								mb: 2,
							}}
						>
							{loading ? t("common.loading") : t("auth.signIn")}
						</Button>
					</form>
				</Paper>
			</Container>
		</Box>
	);
};

export default Login;
