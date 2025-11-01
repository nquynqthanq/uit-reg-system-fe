import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import { useAuth } from "./hooks/useAuth";

// Protected Route wrapper
// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
// 	const { isAuthenticated, isLoading } = useAuth();

// 	if (isLoading) {
// 		return null; // Or a loading spinner
// 	}

// 	return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
// };

// Public Only Route (redirect to home if already authenticated)
const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return null;
	}

	return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<Home />} />
			</Route>

			<Route
				path="/login"
				element={
					<PublicOnlyRoute>
						<Login />
					</PublicOnlyRoute>
				}
			/>

			<Route
				path="/signup"
				element={
					<PublicOnlyRoute>
						<Signup />
					</PublicOnlyRoute>
				}
			/>

			<Route
				path="/reset-password"
				element={
					<PublicOnlyRoute>
						<ResetPassword />
					</PublicOnlyRoute>
				}
			/>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
