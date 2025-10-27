import React, { useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	Box,
	Typography,
	Tabs,
	Tab,
	TextField,
	Button,
	RadioGroup,
	FormControlLabel,
	Radio,
	Divider,
	Alert,
	LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../contexts/AuthContext";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useChat } from "../../contexts/ChatContext";
import type { Language } from "../../types/language";
import type { ThemeMode } from "../../types/theme";
import { AppearanceIcon, StorageIcon, UserProfileIcon } from "@/assets/svgs";

interface SettingsModalProps {
	open: boolean;
	onClose: () => void;
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
	return (
		<div role="tabpanel" hidden={value !== index}>
			{value === index && <Box sx={{ py: 3 }}>{children}</Box>}
		</div>
	);
};

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
	const { user, logout } = useAuth();
	const { mode, setTheme } = useThemeContext();
	const { language, setLanguage, t } = useLanguage();
	const { chatHistory, clearAllChats } = useChat();
	const [currentTab, setCurrentTab] = useState(0);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = useState(false);

	// Calculate storage used (mock)
	const storageUsedMB = Math.round((chatHistory.length * 0.5 + Math.random() * 2) * 10) / 10;
	const storagePercentage = Math.min((storageUsedMB / 100) * 100, 100);

	const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
		setCurrentTab(newValue);
	};

	const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTheme(event.target.value as ThemeMode);
	};

	const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLanguage(event.target.value as Language);
	};

	const handleDeleteAllChats = () => {
		clearAllChats();
		setShowDeleteConfirm(false);
	};

	const handleDeleteAccount = () => {
		logout();
		setShowDeleteAccountConfirm(false);
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="md"
			fullWidth
			PaperProps={{
				sx: {
					height: "650px",
				},
			}}
		>
			<DialogTitle
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "16px 24px 12px 24px",
				}}
			>
				<Typography variant="h6" fontWeight={500}>
					{t("settings.title")}
				</Typography>
				<IconButton onClick={onClose} size="small">
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<Box sx={{ display: "flex", height: "calc(100% - 64px)" }}>
				{/* Sidebar Tabs */}
				<Box
					sx={{
						minWidth: 200,
						bgcolor: "background.primary",
						borderRadius: 2,
						paddingLeft: 1,
						paddingRight: 1,
					}}
				>
					<Tabs
						orientation="vertical"
						value={currentTab}
						onChange={handleTabChange}
						sx={{
							"& .MuiTab-root": {
								alignItems: "center",
								justifyContent: "flex-start",
								textAlign: "left",
								fontSize: 14,
								fontWeight: 500,
								color: "text.primary",
								textTransform: "none",
								padding: "8px 12px",
								minHeight: "40px",
								marginBottom: 1,
							},
							"& .MuiTabs-indicator": {
								display: "none",
							},
							"& .Mui-selected": {
								backgroundColor: "hover.main",
								borderRadius: 1,
							},
						}}
					>
						<Tab
							icon={<UserProfileIcon />}
							iconPosition="start"
							label={t("settings.account")}
							sx={{
								justifyContent: "flex-start",
								alignItems: "center",
							}}
						/>
						<Tab
							icon={<AppearanceIcon />}
							iconPosition="start"
							label={t("settings.interface")}
							sx={{ justifyContent: "flex-start", alignItems: "center" }}
						/>
						<Tab
							icon={<StorageIcon />}
							iconPosition="start"
							label={t("settings.dataControl")}
							sx={{ justifyContent: "flex-start", alignItems: "center" }}
						/>
					</Tabs>
				</Box>

				{/* Content Area */}
				<DialogContent
					sx={{
						flex: 1,
						overflow: "auto",
						padding: "0 12px !important",
						"& .MuiBox-root": {
							padding: "0px !important",
						},
					}}
				>
					{/* Account Tab */}
					<TabPanel value={currentTab} index={0}>
						<Typography variant="h6" fontWeight={500} gutterBottom>
							{t("settings.accountInfo")}
						</Typography>
						<Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
							<TextField label={t("auth.name")} defaultValue={user?.name} fullWidth disabled />
							<TextField label={t("auth.email")} defaultValue={user?.email} fullWidth disabled />
							<Box sx={{ display: "flex", gap: 2, mt: 2 }}>
								<Button variant="outlined" fullWidth disabled>
									{t("settings.editProfile")}
								</Button>
								<Button variant="outlined" fullWidth disabled>
									{t("settings.changePassword")}
								</Button>
							</Box>
						</Box>
					</TabPanel>

					{/* Interface Tab */}
					<TabPanel value={currentTab} index={1}>
						<Typography variant="h6" fontWeight={500} gutterBottom>
							{t("settings.themeMode")}
						</Typography>
						<RadioGroup value={mode} onChange={handleThemeChange} sx={{ mt: 2 }}>
							<FormControlLabel value="light" control={<Radio />} label={t("settings.lightMode")} />
							<FormControlLabel value="dark" control={<Radio />} label={t("settings.darkMode")} />
							<FormControlLabel
								value="system"
								control={<Radio />}
								label={t("settings.systemMode")}
								disabled
							/>
						</RadioGroup>

						<Divider sx={{ my: 4 }} />

						<Typography variant="h6" fontWeight={500} gutterBottom>
							{t("settings.languagePreference")}
						</Typography>
						<RadioGroup value={language} onChange={handleLanguageChange} sx={{ mt: 2 }}>
							<FormControlLabel value="vi" control={<Radio />} label={t("settings.vietnamese")} />
							<FormControlLabel value="en" control={<Radio />} label={t("settings.english")} />
						</RadioGroup>
					</TabPanel>

					{/* Data Control Tab */}
					<TabPanel value={currentTab} index={2}>
						<Typography variant="h6" fontWeight={500} gutterBottom>
							{t("settings.storageUsed")}
						</Typography>
						<Box sx={{ mt: 2 }}>
							<Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
								<Typography variant="body2" color="text.secondary">
									{storageUsedMB} MB / 100 MB
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{storagePercentage.toFixed(0)}%
								</Typography>
							</Box>
							<LinearProgress
								variant="determinate"
								value={storagePercentage}
								sx={{ height: 8, borderRadius: 4 }}
							/>
							<Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
								{chatHistory.length} {chatHistory.length === 1 ? "conversation" : "conversations"}
							</Typography>
						</Box>

						<Divider sx={{ my: 4 }} />

						<Typography variant="h6" fontWeight={500} gutterBottom>
							{t("settings.deleteAllChats")}
						</Typography>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
							{t("settings.deleteAllChatsConfirm")}
						</Typography>
						{showDeleteConfirm ? (
							<Alert
								severity="warning"
								action={
									<Box sx={{ display: "flex", gap: 1 }}>
										<Button
											size="small"
											color="inherit"
											onClick={() => setShowDeleteConfirm(false)}
										>
											{t("common.cancel")}
										</Button>
										<Button
											size="small"
											color="error"
											variant="contained"
											onClick={handleDeleteAllChats}
										>
											{t("common.delete")}
										</Button>
									</Box>
								}
							>
								{t("settings.deleteAllChatsConfirm")}
							</Alert>
						) : (
							<Button
								variant="outlined"
								color="error"
								onClick={() => setShowDeleteConfirm(true)}
								disabled={chatHistory.length === 0}
							>
								{t("settings.deleteAllChats")}
							</Button>
						)}

						<Divider sx={{ my: 4 }} />

						<Typography variant="h6" fontWeight={500} gutterBottom color="error">
							{t("settings.deleteAccount")}
						</Typography>
						<Alert severity="error" sx={{ mb: 2 }}>
							{t("settings.deleteAccountWarning")}
						</Alert>
						{showDeleteAccountConfirm ? (
							<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
								<Typography variant="body2" color="text.secondary">
									{t("settings.deleteAccountConfirm")}
								</Typography>
								<Box sx={{ display: "flex", gap: 2 }}>
									<Button
										variant="outlined"
										onClick={() => setShowDeleteAccountConfirm(false)}
										fullWidth
									>
										{t("common.cancel")}
									</Button>
									<Button variant="contained" color="error" onClick={handleDeleteAccount} fullWidth>
										{t("settings.deleteAccount")}
									</Button>
								</Box>
							</Box>
						) : (
							<Button
								variant="outlined"
								color="error"
								onClick={() => setShowDeleteAccountConfirm(true)}
							>
								{t("settings.deleteAccount")}
							</Button>
						)}
					</TabPanel>
				</DialogContent>
			</Box>
		</Dialog>
	);
};

export default SettingsModal;
