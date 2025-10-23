/**
 * Storage Utilities
 * Wrapper around localStorage with JSON serialization
 */

export const storage = {
	/**
	 * Get item from localStorage
	 */
	get: <T>(key: string, defaultValue?: T): T | null => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : (defaultValue ?? null);
		} catch (error) {
			console.error(`Error getting item ${key} from localStorage:`, error);
			return defaultValue ?? null;
		}
	},

	/**
	 * Set item to localStorage
	 */
	set: <T>(key: string, value: T): void => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error(`Error setting item ${key} to localStorage:`, error);
		}
	},

	/**
	 * Remove item from localStorage
	 */
	remove: (key: string): void => {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error(`Error removing item ${key} from localStorage:`, error);
		}
	},

	/**
	 * Clear all items from localStorage
	 */
	clear: (): void => {
		try {
			localStorage.clear();
		} catch (error) {
			console.error("Error clearing localStorage:", error);
		}
	},

	/**
	 * Check if key exists in localStorage
	 */
	has: (key: string): boolean => {
		return localStorage.getItem(key) !== null;
	},
};

export const sessionStorage = {
	get: <T>(key: string, defaultValue?: T): T | null => {
		try {
			const item = window.sessionStorage.getItem(key);
			return item ? JSON.parse(item) : (defaultValue ?? null);
		} catch (error) {
			console.error(`Error getting item ${key} from sessionStorage:`, error);
			return defaultValue ?? null;
		}
	},

	set: <T>(key: string, value: T): void => {
		try {
			window.sessionStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error(`Error setting item ${key} to sessionStorage:`, error);
		}
	},

	remove: (key: string): void => {
		try {
			window.sessionStorage.removeItem(key);
		} catch (error) {
			console.error(`Error removing item ${key} from sessionStorage:`, error);
		}
	},

	clear: (): void => {
		try {
			window.sessionStorage.clear();
		} catch (error) {
			console.error("Error clearing sessionStorage:", error);
		}
	},

	has: (key: string): boolean => {
		return window.sessionStorage.getItem(key) !== null;
	},
};
