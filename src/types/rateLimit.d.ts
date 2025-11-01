/**
 * Rate Limit Types
 */

type RateLimitResponse = {
	id: number;
	name: string;
	path: string;
	limit: number;
	period: number;
	tier_id: number;
};

type RateLimitCreateRequest = {
	name: string;
	path: string;
	limit: number;
	period: number;
};

type RateLimitUpdateRequest = {
	name?: string;
	path?: string;
	limit?: number;
	period?: number;
};
