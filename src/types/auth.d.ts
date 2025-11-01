/**
 * Authentication Types
 */

type LoginRequest = {
	emailOrUsername: string;
	password: string;
};

type SignupRequest = {
	name: string;
	username: string;
	email: string;
	password: string;
};

type LoginResponse = {
	access_token: string;
	token_type: string;
	// refresh_token is automatically stored in httpOnly cookie by server
};

type UserResponse = {
	id: number;
	name: string;
	username: string;
	email: string;
	profile_image_url: string;
	tier_id: number | null;
};
