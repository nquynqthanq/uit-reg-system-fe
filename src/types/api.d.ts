/**
 * API Types
 */

type MessageResponse = {
	message: string;
};

type ErrorResponse = {
	detail: string;
};

type PaginationParams = {
	page?: number;
	items_per_page?: number;
};
