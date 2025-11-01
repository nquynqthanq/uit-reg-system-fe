/**
 * English Translations
 */

import { TranslationKeys } from "./vi";

export const en: TranslationKeys = {
	// Common
	common: {
		appName: "UIT-Regulations",
		search: "Search",
		cancel: "Cancel",
		save: "Save",
		delete: "Delete",
		edit: "Edit",
		close: "Close",
		submit: "Submit",
		loading: "Loading...",
		back: "Back",
	},

	// Navigation
	nav: {
		home: "Home",
		history: "History",
		settings: "Settings",
		newChat: "Chat",
		expandSidebar: "Expand sidebar",
		collapseSidebar: "Collapse sidebar",
		shareChat: "Share chat",
	},

	// Auth
	auth: {
		signIn: "Sign In",
		signUp: "Sign Up",
		signOut: "Sign Out",
		emailOrUsername: "Email or Username",
		username: "Username",
		email: "Email",
		password: "Password",
		confirmPassword: "Confirm Password",
		name: "Full Name",
		forgotPassword: "Forgot password?",
		dontHaveAccount: "Don't have an account?",
		alreadyHaveAccount: "Already have an account?",
		signInWithGoogle: "Sign in with Google",
		signUpWithGoogle: "Sign up with Google",
		welcomeBack: "Welcome back!",
		createAccount: "Create Account",
		loginSuccess: "Login successful!",
		signupSuccess: "Signup successful!",
		logoutSuccess: "Logout successful!",
	},

	// Validation
	validation: {
		required: "This field is required",
		invalidEmail: "Invalid email address",
		passwordTooShort: "Password must be at least 8 characters",
		passwordMismatch: "Passwords do not match",
		invalidCredentials: "Invalid email or password",
		invalidOTP: "Invalid OTP code",
	},

	// Chat
	chat: {
		inputPlaceholder: "Enter your question",
		newChat: "New Chat",
		searchHistory: "Search history",
		noHistory: "No chat history",
		today: "Today",
		yesterday: "Yesterday",
		last7Days: "Last 7 days",
		last30Days: "Last 30 days",
		older: "Older",
		deleteChat: "Delete chat",
		deleteChatConfirm: "Are you sure you want to delete this chat?",
		emptyChat: "Start a new conversation",
		emptyState: "Ask me anything about UIT regulations!",
	},

	// Settings
	settings: {
		title: "Settings",
		theme: "Theme",
		language: "Language",
		lightMode: "Light",
		darkMode: "Dark",
		systemMode: "System",
		vietnamese: "Tiếng Việt",
		english: "English",
		account: "Account",
		profile: "Profile",
		preferences: "Preferences",
		interface: "Appearance",
		dataControl: "Data Control",
		accountInfo: "Account Information",
		editProfile: "Edit Profile",
		changePassword: "Change Password",
		storageUsed: "Storage Used",
		deleteAllChats: "Delete All Conversations",
		deleteAllChatsConfirm: "Are you sure you want to delete all conversations?",
		deleteAccount: "Delete Account",
		deleteAccountConfirm:
			"Are you sure you want to delete your account? This action cannot be undone.",
		deleteAccountWarning: "Warning: Deleting your account will permanently remove all your data.",
		themeMode: "Theme Mode",
		languagePreference: "Language",
	},

	// User Menu
	user: {
		profile: "Profile",
		settings: "Settings",
		signOut: "Sign Out",
		help: "Help",
		reportIssue: "Report Issue",
		faq: "FAQ",
		changelog: "Changelog",
		community: "Community",
		shareLinks: "Share Links",
	},

	// Errors
	error: {
		generic: "An error occurred. Please try again.",
		network: "Network error. Please check your internet connection.",
		notFound: "Page not found",
		unauthorized: "You don't have permission to access this",
		serverError: "Server error. Please try again later.",
	},

	// Placeholders
	placeholder: {
		email: "Please enter your email",
		emailOrUsername: "Please enter your email or username",
		name: "Please enter your full name",
		search: "Please enter your search query",
		username: "Please enter your username",
	},

	// Reset Password
	resetPassword: {
		title: "Reset Password",
		subtitle: "Follow the steps below to reset your password",
		stepEmail: "Email",
		stepOTP: "Verify OTP",
		stepNewPassword: "New Password",
		stepComplete: "Complete",
		emailInstruction: "Enter your email address to receive the OTP code",
		otpInstruction: "We've sent a 6-digit verification code to",
		newPasswordInstruction: "Create a strong password for your account",
		sendOTP: "Send OTP",
		verifyOTP: "Verify OTP",
		resetPassword: "Reset Password",
		backToLogin: "Back to Login",
		otpCode: "OTP Code",
		newPassword: "New Password",
		didntReceiveCode: "Didn't receive the code?",
		resendOTP: "Resend OTP",
		successTitle: "Password Reset Successful!",
		successMessage:
			"Your password has been reset successfully. You can now login with your new password.",
	},
};
