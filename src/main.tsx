import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

// Context Providers
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ChatProvider } from "./contexts/ChatContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary>
			<BrowserRouter>
				<LanguageProvider>
					<ThemeProvider>
						<CssBaseline />
						<AuthProvider>
							<ChatProvider>
								<App />
							</ChatProvider>
						</AuthProvider>
					</ThemeProvider>
				</LanguageProvider>
			</BrowserRouter>
		</ErrorBoundary>
	</StrictMode>
);
