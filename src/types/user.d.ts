/**
 * User Types
 */

type PaginatedUsersResponse = {
	data: UserResponse[];
	total_count: number;
	page: number;
	items_per_page: number;
	has_more: boolean;
};

type UpdateUserRequest = {
	name?: string;
	username?: string;
	email?: string;
	profile_image_url?: string;
};

type UserTierResponse = UserResponse & {
	tier_id: number;
	tier_name: string;
	tier_created_at: string;
};

type UserRateLimitsResponse = UserResponse & {
	tier_rate_limits: RateLimitResponse[];
};
