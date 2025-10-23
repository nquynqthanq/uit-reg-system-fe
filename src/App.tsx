import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { useState } from "react";
import HistorySidebar from "./components/HistorySidebar";

function App() {
	const [open, setOpen] = useState(false);

	const handleDrawerToggle = () => {
		setOpen(!open);
	};

	const handleCreateChat = () => {
		console.log("Create a new chat");
	};

	return (
		<Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
			<HistorySidebar open={open} onClose={() => setOpen(false)} />

			<Box
				sx={{
					flexGrow: 1,
					transition: "margin 0.3s",
					paddingTop: "64px",
					paddingLeft: "2rem",
					paddingRight: "2rem",
					overflowY: "auto",
				}}
			>
				<Header
					onToggleDrawer={handleDrawerToggle}
					onCreateChat={handleCreateChat}
					isSidebarOpen={open}
				/>

				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</main>
			</Box>
		</Box>
	);
}

export default App;
