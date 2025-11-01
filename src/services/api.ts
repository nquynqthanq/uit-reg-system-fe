/**
 * Base API Configuration
 * RTK Query base API with automatic token refresh
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { env } from "../utils/env";
import { storage } from "../utils/storage";

// Mutex to ensure only one refresh request at a time
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
	baseUrl: `${env.apiBaseUrl}/api/v1`,
	credentials: "include", // Important: Send cookies (refresh_token)
	prepareHeaders: (headers) => {
		// Get access_token from localStorage
		const token = storage.get<string>("access_token");
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

// Base query with automatic token refresh
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions
) => {
	// Wait if there's already a refresh in progress
	await mutex.waitForUnlock();

	let result = await baseQuery(args, api, extraOptions);

	// If 401 (Unauthorized) → Token expired
	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();

			try {
				// Call refresh endpoint (automatically sends refresh_token cookie)
				const refreshResult = await baseQuery(
					{ url: "/refresh", method: "POST" },
					api,
					extraOptions
				);

				if (refreshResult.data) {
					// Save new access_token
					const { access_token } = refreshResult.data as {
						access_token: string;
						token_type: string;
					};
					storage.set("access_token", access_token);

					// Retry original request with new token
					result = await baseQuery(args, api, extraOptions);
				} else {
					// Refresh failed → Logout
					storage.remove("access_token");
					storage.remove("user");
					window.location.href = "/login";
				}
			} finally {
				release();
			}
		} else {
			// Wait for refresh to complete, then retry
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}

	return result;
};

// Base API
export const api = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["User", "Auth", "Post", "Tier", "RateLimit"],
	endpoints: () => ({}),
});
