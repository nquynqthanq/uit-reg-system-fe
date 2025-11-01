/**
 * Users API Endpoints
 * User management related API calls
 */

import { api } from "./api";

export const usersApi = api.injectEndpoints({
	endpoints: (builder) => ({
		// Get list of users (with pagination)
		getUsers: builder.query<PaginatedUsersResponse, PaginationParams>({
			query: ({ page = 1, items_per_page = 10 } = {}) => ({
				url: "/users",
				params: { page, items_per_page },
			}),
			providesTags: (result) =>
				result
					? [
							...result.data.map(({ id }) => ({ type: "User" as const, id })),
							{ type: "User", id: "LIST" },
						]
					: [{ type: "User", id: "LIST" }],
		}),

		// Get single user by username
		getUser: builder.query<UserResponse, string>({
			query: (username) => `/user/${username}`,
			providesTags: (_result, _error, username) => [{ type: "User", id: username }],
		}),

		// Update user
		updateUser: builder.mutation<MessageResponse, { username: string; data: UpdateUserRequest }>({
			query: ({ username, data }) => ({
				url: `/user/${username}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: (_result, _error, { username }) => [
				{ type: "User", id: username },
				{ type: "Auth" },
			],
		}),

		// Delete user (soft delete)
		deleteUser: builder.mutation<MessageResponse, string>({
			query: (username) => ({
				url: `/user/${username}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "User", id: "LIST" }],
		}),

		// Get user's tier info
		getUserTier: builder.query<UserTierResponse | null, string>({
			query: (username) => `/user/${username}/tier`,
			providesTags: (_result, _error, username) => [{ type: "User", id: username }, "Tier"],
		}),

		// Get user's rate limits (superuser only)
		getUserRateLimits: builder.query<UserRateLimitsResponse, string>({
			query: (username) => `/user/${username}/rate_limits`,
			providesTags: (_result, _error, username) => [{ type: "User", id: username }, "RateLimit"],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useGetUserQuery,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useGetUserTierQuery,
	useGetUserRateLimitsQuery,
	useLazyGetUserQuery,
	useLazyGetUserTierQuery,
} = usersApi;
