/**
 * useAuth Hook
 * Custom hook for authentication with Redux
 */

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
	useLoginMutation,
	useSignupMutation,
	useLogoutMutation,
	useLazyGetCurrentUserQuery,
} from "../services/authApi";
import { setUser, clearUser, setInitialized } from "../store/slices/authSlice";
import { storage } from "../utils/storage";

export const useAuth = () => {
	const dispatch = useAppDispatch();
	const { user, isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

	const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
	const [signupMutation, { isLoading: isSignupLoading }] = useSignupMutation();
	const [logoutMutation] = useLogoutMutation();
	const [getCurrentUser] = useLazyGetCurrentUserQuery();

	// Initialize auth state on mount
	useEffect(() => {
		const initAuth = async () => {
			const token = storage.get<string>("access_token");
			const savedUser = storage.get("user");

			if (token && savedUser) {
				// Has token and user → Verify by fetching current user
				try {
					const { data } = await getCurrentUser();
					if (data) {
						dispatch(setUser(data));
					} else {
						dispatch(clearUser());
					}
				} catch (error) {
					console.error("Failed to get current user:", error);
					dispatch(clearUser());
				}
			} else {
				dispatch(clearUser());
			}

			dispatch(setInitialized(true));
		};

		initAuth();
	}, [dispatch, getCurrentUser]);

	const login = async (credentials: LoginRequest) => {
		try {
			// Login and get access_token
			await loginMutation(credentials).unwrap();

			// Fetch user info
			const { data } = await getCurrentUser();
			if (data) {
				dispatch(setUser(data));
			}
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		}
	};

	const signup = async (credentials: SignupRequest) => {
		try {
			await signupMutation(credentials).unwrap();
			// After signup, need to login
			await login({
				emailOrUsername: credentials.email || credentials.username,
				password: credentials.password,
			});
		} catch (error) {
			console.error("Signup error:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await logoutMutation().unwrap();
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			dispatch(clearUser());
		}
	};

	return {
		user,
		isAuthenticated,
		isLoading: isLoginLoading || isSignupLoading || !isInitialized,
		isInitialized,
		login,
		signup,
		logout,
	};
};
