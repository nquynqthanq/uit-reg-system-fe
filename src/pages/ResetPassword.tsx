import React, { useState, useEffect } from "react";
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
	Stepper,
	Step,
	StepLabel,
	CircularProgress,
} from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { useLanguage } from "@contexts/LanguageContext";

interface ResetPasswordForm {
	email: string;
	otp: string;
	newPassword: string;
	confirmPassword: string;
}

const ResetPassword: React.FC = () => {
	const navigate = useNavigate();
	const { t } = useLanguage();
	const [searchParams] = useSearchParams();

	const [activeStep, setActiveStep] = useState(0);
	const [formData, setFormData] = useState<ResetPasswordForm>({
		email: "",
		otp: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// Get email from query params if provided
	useEffect(() => {
		const emailParam = searchParams.get("email");
		if (emailParam) {
			setFormData((prev) => ({ ...prev, email: decodeURIComponent(emailParam) }));
		}
	}, [searchParams]);

	const steps = [
		t("resetPassword.stepEmail"),
		t("resetPassword.stepOTP"),
		t("resetPassword.stepNewPassword"),
		t("resetPassword.stepComplete"),
	];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		setError("");
	};

	const handleSendOTP = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!formData.email) {
			setError(t("validation.required"));
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			setError(t("validation.invalidEmail"));
			return;
		}

		setLoading(true);

		try {
			// TODO: Call API to send OTP
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setActiveStep(1);
		} catch {
			setError(t("error.generic"));
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyOTP = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!formData.otp) {
			setError(t("validation.required"));
			return;
		}

		if (formData.otp.length !== 6) {
			setError(t("validation.invalidOTP"));
			return;
		}

		setLoading(true);

		try {
			// TODO: Call API to verify OTP
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setActiveStep(2);
		} catch {
			setError(t("validation.invalidOTP"));
		} finally {
			setLoading(false);
		}
	};

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!formData.newPassword || !formData.confirmPassword) {
			setError(t("validation.required"));
			return;
		}

		if (formData.newPassword.length < 8) {
			setError(t("validation.passwordTooShort"));
			return;
		}

		if (formData.newPassword !== formData.confirmPassword) {
			setError(t("validation.passwordMismatch"));
			return;
		}

		setLoading(true);

		try {
			// TODO: Call API to reset password
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setActiveStep(3);
		} catch {
			setError(t("error.generic"));
		} finally {
			setLoading(false);
		}
	};

	const handleBackToLogin = () => {
		navigate("/login");
	};

	const handleResendOTP = async () => {
		setError("");
		setLoading(true);

		try {
			// TODO: Call API to resend OTP
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// Show success message or notification
		} catch {
			setError(t("error.generic"));
		} finally {
			setLoading(false);
		}
	};

	const renderStepContent = () => {
		switch (activeStep) {
			case 0:
				return (
					<form onSubmit={handleSendOTP}>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
							{t("resetPassword.emailInstruction")}
						</Typography>

						<TextField
							fullWidth
							label={t("auth.email")}
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							placeholder={t("placeholder.email")}
							sx={{ mb: 3 }}
							autoComplete="email"
							autoFocus
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
							{loading ? <CircularProgress size={24} /> : t("resetPassword.sendOTP")}
						</Button>

						<Box sx={{ textAlign: "center" }}>
							<MuiLink component={Link} to="/login" underline="hover" variant="body2">
								{t("resetPassword.backToLogin")}
							</MuiLink>
						</Box>
					</form>
				);

			case 1:
				return (
					<form onSubmit={handleVerifyOTP}>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
							{t("resetPassword.otpInstruction")}
						</Typography>
						<Typography variant="body2" fontWeight={600} sx={{ mb: 3 }}>
							{formData.email}
						</Typography>

						<TextField
							fullWidth
							label={t("resetPassword.otpCode")}
							name="otp"
							value={formData.otp}
							onChange={handleChange}
							placeholder="000000"
							sx={{ mb: 2 }}
							inputProps={{
								maxLength: 6,
								style: { letterSpacing: "0.5rem", fontSize: "1.5rem", textAlign: "center" },
							}}
							autoFocus
						/>

						<Box sx={{ textAlign: "center", mb: 3 }}>
							<Typography variant="body2" color="text.secondary" display="inline">
								{t("resetPassword.didntReceiveCode")}{" "}
							</Typography>
							<MuiLink
								component="button"
								type="button"
								onClick={handleResendOTP}
								underline="hover"
								variant="body2"
								disabled={loading}
							>
								{t("resetPassword.resendOTP")}
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
							{loading ? <CircularProgress size={24} /> : t("resetPassword.verifyOTP")}
						</Button>

						<Box sx={{ textAlign: "center" }}>
							<Button
								onClick={() => setActiveStep(0)}
								variant="text"
								disabled={loading}
								sx={{ textTransform: "none" }}
							>
								{t("common.back")}
							</Button>
						</Box>
					</form>
				);

			case 2:
				return (
					<form onSubmit={handleResetPassword}>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
							{t("resetPassword.newPasswordInstruction")}
						</Typography>

						<TextField
							fullWidth
							label={t("resetPassword.newPassword")}
							name="newPassword"
							type={showNewPassword ? "text" : "password"}
							value={formData.newPassword}
							onChange={handleChange}
							placeholder="••••••••"
							sx={{ mb: 2.5 }}
							autoComplete="new-password"
							autoFocus
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => setShowNewPassword(!showNewPassword)}
											edge="end"
											size="small"
										>
											{showNewPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
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
							value={formData.confirmPassword}
							onChange={handleChange}
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
							{loading ? <CircularProgress size={24} /> : t("resetPassword.resetPassword")}
						</Button>

						<Box sx={{ textAlign: "center" }}>
							<Button
								onClick={() => setActiveStep(1)}
								variant="text"
								disabled={loading}
								sx={{ textTransform: "none" }}
							>
								{t("common.back")}
							</Button>
						</Box>
					</form>
				);

			case 3:
				return (
					<Box sx={{ textAlign: "center" }}>
						<Box
							sx={{
								display: "inline-flex",
								alignItems: "center",
								justifyContent: "center",
								width: 80,
								height: 80,
								borderRadius: "50%",
								bgcolor: "success.light",
								mb: 3,
							}}
						>
							<CheckCircleOutlineRoundedIcon sx={{ fontSize: 48, color: "success.main" }} />
						</Box>

						<Typography variant="h5" fontWeight={700} gutterBottom>
							{t("resetPassword.successTitle")}
						</Typography>

						<Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
							{t("resetPassword.successMessage")}
						</Typography>

						<Button
							onClick={handleBackToLogin}
							fullWidth
							variant="contained"
							size="large"
							sx={{
								py: 1.5,
								fontSize: "1rem",
								fontWeight: 600,
							}}
						>
							{t("resetPassword.backToLogin")}
						</Button>
					</Box>
				);

			default:
				return null;
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
							{t("resetPassword.title")}
						</Typography>
						{activeStep < 3 && (
							<Typography variant="body2" color="text.secondary">
								{t("resetPassword.subtitle")}
							</Typography>
						)}
					</Box>

					{activeStep < 3 && (
						<Stepper activeStep={activeStep} sx={{ mb: 4 }}>
							{steps.slice(0, 3).map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
					)}

					{error && (
						<Alert severity="error" sx={{ mb: 3 }}>
							{error}
						</Alert>
					)}

					{renderStepContent()}
				</Paper>
			</Container>
		</Box>
	);
};

export default ResetPassword;
