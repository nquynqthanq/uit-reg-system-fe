/**
 * Auth API Endpoints
 * Authentication related API calls
 */

import { api } from "./api";
import { storage } from "../utils/storage";

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		// Login
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: (credentials) => ({
				url: "/login",
				method: "POST",
				body: new URLSearchParams({
					username: credentials.emailOrUsername,
					password: credentials.password,
				}),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}),
			async onQueryStarted(_args, { queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					// Save access_token to localStorage
					storage.set("access_token", data.access_token);
					// refresh_token is automatically saved in cookie by server
				} catch (error) {
					console.error("Login failed:", error);
				}
			},
		}),

		// Signup
		signup: builder.mutation<UserResponse, SignupRequest>({
			query: (credentials) => ({
				url: "/user",
				method: "POST",
				body: credentials,
			}),
			invalidatesTags: ["User"],
		}),

		// Logout
		logout: builder.mutation<MessageResponse, void>({
			query: () => ({
				url: "/logout",
				method: "POST",
			}),
			async onQueryStarted(_args, { queryFulfilled }) {
				try {
					await queryFulfilled;
					// Clear tokens
					storage.remove("access_token");
					storage.remove("user");
					// Cookie will be deleted by server
				} catch (error) {
					console.error("Logout failed:", error);
				}
			},
		}),

		// Get current user
		getCurrentUser: builder.query<UserResponse, void>({
			query: () => "/user/me/",
			providesTags: ["Auth"],
			async onQueryStarted(_args, { queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					// Save user info to localStorage
					storage.set("user", data);
				} catch (error) {
					console.error("Get current user failed:", error);
				}
			},
		}),

		// Refresh token (called automatically by baseQueryWithReauth)
		refreshToken: builder.mutation<LoginResponse, void>({
			query: () => ({
				url: "/refresh",
				method: "POST",
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useSignupMutation,
	useLogoutMutation,
	useGetCurrentUserQuery,
	useLazyGetCurrentUserQuery,
} = authApi;
