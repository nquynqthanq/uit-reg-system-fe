import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
	useEffect,
} from "react";
import type { User, LoginCredentials, SignupCredentials } from "../types/auth";

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (credentials: LoginCredentials) => Promise<void>;
	signup: (credentials: SignupCredentials) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Load user from localStorage on mount
	useEffect(() => {
		const savedUser = localStorage.getItem("user");
		if (savedUser) {
			try {
				setUser(JSON.parse(savedUser));
			} catch (error) {
				console.error("Error parsing user from localStorage:", error);
				localStorage.removeItem("user");
			}
		}
		setIsLoading(false);
	}, []);

	const login = useCallback(async (credentials: LoginCredentials) => {
		setIsLoading(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Mock user data
			const mockUser: User = {
				id: "1",
				name: "Nguyễn Văn A",
				email: credentials.email,
				avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent("Nguyễn Văn A")}&background=2F6BFF&color=fff`,
			};

			setUser(mockUser);
			localStorage.setItem("user", JSON.stringify(mockUser));
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	}, []);

	const signup = useCallback(async (credentials: SignupCredentials) => {
		setIsLoading(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Mock user data
			const mockUser: User = {
				id: "1",
				name: credentials.name,
				email: credentials.email,
				avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(credentials.name)}&background=2F6BFF&color=fff`,
			};

			setUser(mockUser);
			localStorage.setItem("user", JSON.stringify(mockUser));
		} catch (error) {
			console.error("Signup error:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	}, []);

	const logout = useCallback(() => {
		setUser(null);
		localStorage.removeItem("user");
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				isLoading,
				login,
				signup,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
