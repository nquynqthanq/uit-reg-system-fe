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

const Signup: React.FC = () => {
	const navigate = useNavigate();
	const { signup } = useAuth();
	const { t } = useLanguage();

	const [credentials, setCredentials] = useState<SignupRequest>({
		name: "",
		username: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState<string>("");

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

		// Validation
		if (!credentials.name || !credentials.email || !credentials.password || !credentials.username) {
			setError(t("validation.required"));
			return;
		}

		if (credentials.password.length < 8) {
			setError(t("validation.passwordTooShort"));
			return;
		}

		if (credentials.password !== confirmPassword) {
			setError(t("validation.passwordMismatch"));
			return;
		}

		setLoading(true);

		try {
			await signup(credentials);
			navigate("/");
		} catch {
			setError(t("error.generic"));
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
							{t("auth.createAccount")}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{t("auth.alreadyHaveAccount")}{" "}
							<MuiLink component={Link} to="/login" underline="hover" fontWeight={600}>
								{t("auth.signIn")}
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
							label={t("auth.name")}
							name="name"
							value={credentials.name}
							onChange={handleChange}
							placeholder={t("placeholder.name")}
							sx={{ mb: 2.5 }}
							autoComplete="name"
						/>

						<TextField
							fullWidth
							label={t("auth.username")}
							name="username"
							type="text"
							value={credentials.username}
							onChange={handleChange}
							placeholder={t("placeholder.username")}
							sx={{ mb: 2.5 }}
							autoComplete="username"
						/>

						<TextField
							fullWidth
							label={t("auth.email")}
							name="email"
							type="email"
							value={credentials.email}
							onChange={handleChange}
							placeholder={t("placeholder.email")}
							sx={{ mb: 2.5 }}
							autoComplete="email"
						/>

						<TextField
							fullWidth
							label={t("auth.password")}
							name="password"
							type={showPassword ? "text" : "password"}
							value={credentials.password}
							onChange={handleChange}
							placeholder="••••••••"
							sx={{ mb: 2.5 }}
							autoComplete="new-password"
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

						<TextField
							fullWidth
							label={t("auth.confirmPassword")}
							name="confirmPassword"
							type={showConfirmPassword ? "text" : "password"}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="••••••••"
							sx={{ mb: 3 }}
							autoComplete="new-password"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => setShowConfirmPassword(!showConfirmPassword)}
											edge="end"
											size="small"
										>
											{showConfirmPassword ? (
												<VisibilityOffRoundedIcon />
											) : (
												<VisibilityRoundedIcon />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

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
							{loading ? t("common.loading") : t("auth.signUp")}
						</Button>
					</form>
				</Paper>
			</Container>
		</Box>
	);
};

export default Signup;
