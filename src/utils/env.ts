/**
 * Environment Variables Helper
 * Provides type-safe access to environment variables
 */

export const env = {
	// API Configuration
	apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
	apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT),

	// Application Configuration
	appName: import.meta.env.VITE_APP_NAME,
	appVersion: import.meta.env.VITE_APP_VERSION,

	// Environment
	env: import.meta.env.VITE_ENV,
	isDev: import.meta.env.DEV,
	isProd: import.meta.env.PROD,

	// Feature Flags
	enableDebug: import.meta.env.VITE_ENABLE_DEBUG === "true",
	enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
} as const;

export type Env = typeof env;
