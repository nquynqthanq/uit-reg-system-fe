/**
 * Auth Slice
 * Redux slice for authentication state management
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage } from "@utils/storage";

interface AuthState {
	user: UserResponse | null;
	isAuthenticated: boolean;
	isInitialized: boolean;
}

const initialState: AuthState = {
	user: storage.get<UserResponse>("user"),
	isAuthenticated: !!storage.get("access_token"),
	isInitialized: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserResponse>) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			storage.set("user", action.payload);
		},
		clearUser: (state) => {
			state.user = null;
			state.isAuthenticated = false;
			storage.remove("user");
			storage.remove("access_token");
		},
		setInitialized: (state, action: PayloadAction<boolean>) => {
			state.isInitialized = action.payload;
		},
	},
});

export const { setUser, clearUser, setInitialized } = authSlice.actions;
export default authSlice.reducer;
