/**
 * Environment Variables Helper
 * Provides type-safe access to environment variables
 */

export const env = {
	// API Configuration
	apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
	apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,

	// Application Configuration
	appName: import.meta.env.VITE_APP_NAME || "UITRegSystem",
	appVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",

	// Environment
	env: import.meta.env.VITE_ENV || "development",
	isDev: import.meta.env.DEV,
	isProd: import.meta.env.PROD,

	// Feature Flags
	enableDebug: import.meta.env.VITE_ENABLE_DEBUG === "true",
	enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
} as const;

export type Env = typeof env;
