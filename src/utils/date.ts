/**
 * Date and Time Utilities
 */

/**
 * Format date to readable string
 */
export const formatDate = (
	date: Date | string | number,
	options?: Intl.DateTimeFormatOptions
): string => {
	const dateObj = typeof date === "string" || typeof date === "number" ? new Date(date) : date;

	return dateObj.toLocaleDateString("vi-VN", options);
};

/**
 * Format date to ISO string
 */
export const toISOString = (date: Date | string | number): string => {
	const dateObj = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
	return dateObj.toISOString();
};

/**
 * Get relative time string (e.g., "2 hours ago")
 */
export const getRelativeTime = (date: Date | string | number): string => {
	const dateObj = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

	if (diffInSeconds < 60) return "vừa xong";
	if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
	if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
	if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
	if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} tuần trước`;
	if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} tháng trước`;
	return `${Math.floor(diffInSeconds / 31536000)} năm trước`;
};

/**
 * Check if date is today
 */
export const isToday = (date: Date | string | number): boolean => {
	const dateObj = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
	const today = new Date();
	return (
		dateObj.getDate() === today.getDate() &&
		dateObj.getMonth() === today.getMonth() &&
		dateObj.getFullYear() === today.getFullYear()
	);
};
