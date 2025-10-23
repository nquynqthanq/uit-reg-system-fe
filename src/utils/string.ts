/**
 * String Utilities
 */

/**
 * Capitalize the first letter of a string
 */
export const capitalize = (str: string): string => {
	if (!str) return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate a string to a maximum length
 */
export const truncate = (str: string, maxLength: number, suffix = "..."): string => {
	if (!str || str.length <= maxLength) return str;
	return str.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Convert string to kebab-case
 */
export const kebabCase = (str: string): string => {
	return str
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/[\s_]+/g, "-")
		.toLowerCase();
};

/**
 * Convert string to camelCase
 */
export const camelCase = (str: string): string => {
	return str
		.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
		.replace(/^(.)/, (c) => c.toLowerCase());
};

/**
 * Check if string is empty or whitespace
 */
export const isBlank = (str: string | null | undefined): boolean => {
	return !str || str.trim().length === 0;
};
