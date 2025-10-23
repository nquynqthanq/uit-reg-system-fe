import { AppBar, Toolbar, IconButton } from "@mui/material";
import AutoAwesomeMosaicRoundedIcon from "@mui/icons-material/AutoAwesomeMosaicRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Logo from "./shared/Logo";

interface HeaderProps {
	onToggleDrawer: () => void;
	onCreateChat: () => void;
	isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleDrawer, onCreateChat, isSidebarOpen }) => {
	return (
		<AppBar
			sx={{
				bgcolor: "#FFFFFF",
				boxShadow: "none",
				width: isSidebarOpen ? `calc(100% - 250px)` : "100%",
				ml: isSidebarOpen ? "250px" : 0,
				position: "fixed",
				transition: "width 0.3s, margin-left 0.3s",
			}}
		>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					padding: "0 2rem",
				}}
			>
				<IconButton color="primary" edge="start" sx={{ mr: 2 }} onClick={onToggleDrawer}>
					<AutoAwesomeMosaicRoundedIcon />
				</IconButton>
				<IconButton color="primary" edge="start" sx={{ mr: 2 }} onClick={onCreateChat}>
					<AddCircleOutlineRoundedIcon />
				</IconButton>
				<Logo />
			</Toolbar>
		</AppBar>
	);
};

export default Header;
