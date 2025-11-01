import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

// Context Providers
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";
import { ChatProvider } from "./contexts/ChatContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary>
			<Provider store={store}>
				<BrowserRouter>
					<LanguageProvider>
						<ThemeProvider>
							<CssBaseline />
							<ChatProvider>
								<App />
							</ChatProvider>
						</ThemeProvider>
					</LanguageProvider>
				</BrowserRouter>
			</Provider>
		</ErrorBoundary>
	</StrictMode>
);
