import { Component, ErrorInfo, ReactNode } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error): Partial<State> {
		// Update state so the next render will show the fallback UI
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		// Log error to console or error reporting service
		console.error("ErrorBoundary caught an error:", error, errorInfo);

		// Call custom error handler if provided
		this.props.onError?.(error, errorInfo);

		// Update state with error details
		this.setState({
			error,
			errorInfo,
		});
	}

	handleReset = (): void => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
	};

	render(): ReactNode {
		if (this.state.hasError) {
			// Custom fallback UI
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Default fallback UI
			return (
				<Container maxWidth="md">
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							minHeight: "100vh",
							textAlign: "center",
							gap: 3,
						}}
					>
						<ErrorOutline sx={{ fontSize: 80, color: "error.main" }} />
						<Typography variant="h4" component="h1" fontWeight="bold">
							Oops! Something went wrong
						</Typography>
						<Typography variant="body1" color="text.secondary" maxWidth="sm">
							We're sorry for the inconvenience. An unexpected error has occurred. Please try
							refreshing the page or contact support if the problem persists.
						</Typography>

						{import.meta.env.DEV && this.state.error && (
							<Box
								sx={{
									mt: 2,
									p: 2,
									bgcolor: "grey.100",
									borderRadius: 1,
									textAlign: "left",
									maxWidth: "100%",
									overflow: "auto",
								}}
							>
								<Typography variant="subtitle2" color="error" fontWeight="bold">
									Error Details (Development Only):
								</Typography>
								<Typography
									variant="body2"
									component="pre"
									sx={{ mt: 1, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
								>
									{this.state.error.toString()}
								</Typography>
								{this.state.errorInfo && (
									<Typography
										variant="caption"
										component="pre"
										sx={{ mt: 1, whiteSpace: "pre-wrap", fontSize: "0.7rem" }}
									>
										{this.state.errorInfo.componentStack}
									</Typography>
								)}
							</Box>
						)}

						<Box sx={{ display: "flex", gap: 2, mt: 2 }}>
							<Button variant="contained" onClick={this.handleReset} size="large">
								Try Again
							</Button>
							<Button variant="outlined" onClick={() => (window.location.href = "/")} size="large">
								Go to Home
							</Button>
						</Box>
					</Box>
				</Container>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
