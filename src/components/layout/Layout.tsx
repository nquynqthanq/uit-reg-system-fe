import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import AuthenticatedLayout from "./AuthenticatedLayout";
import UnauthenticatedLayout from "./UnauthenticatedLayout";

const Layout: React.FC = () => {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? <AuthenticatedLayout /> : <UnauthenticatedLayout />;
};

export default Layout;
