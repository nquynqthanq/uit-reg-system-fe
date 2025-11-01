/**
 * Tier Types
 */

type TierResponse = {
	id: number;
	name: string;
	created_at: string;
};

type TierCreateRequest = {
	name: string;
};

type TierUpdateRequest = {
	name?: string;
};
