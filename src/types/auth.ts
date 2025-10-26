/**
 * Authentication Types
 */

export interface User {
	id: string;
	name: string;
	email: string;
	avatar?: string;
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface SignupCredentials {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface AuthContextType extends AuthState {
	login: (credentials: LoginCredentials) => Promise<void>;
	signup: (credentials: SignupCredentials) => Promise<void>;
	logout: () => void;
}
