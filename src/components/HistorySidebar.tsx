import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import Typography from "@mui/material/Typography";

interface HistorySidebarProps {
	open: boolean;
	onClose: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ open, onClose }) => {
	const DrawerList = (
		<Box sx={{ width: 250 }} role="presentation">
			<List>
				<ListItem>
					<ListItemText
						primary={
							<Typography variant="caption" style={{ color: "black", fontWeight: "500" }}>
								Hôm nay
							</Typography>
						}
					/>
				</ListItem>
				{[
					"Bao nhiêu tín chỉ thì ra trường",
					"Tiếng anh đầu ra",
					"Học phí chương trình tài năng",
					"Drafts",
				].map((text) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemText
								primary={
									<Typography variant="body2" style={{ color: "black" }}>
										{text}
									</Typography>
								}
							/>
							<ListItemIcon>
								<MoreVertRoundedIcon />
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				<ListItem>
					<ListItemText
						primary={
							<Typography variant="caption" style={{ color: "black", fontWeight: "500" }}>
								7 ngày trước
							</Typography>
						}
					/>
				</ListItem>
				{[
					"Bao nhiêu tín chỉ thì ra trường",
					"Tiếng anh đầu ra",
					"Học phí chương trình tài năng",
					"Drafts",
				].map((text) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemText
								primary={
									<Typography variant="body2" style={{ color: "black" }}>
										{text}
									</Typography>
								}
							/>
							<ListItemIcon>
								<MoreVertRoundedIcon />
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<Drawer
			open={open}
			onClose={onClose}
			sx={{
				width: 250,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: 250,
					boxSizing: "border-box",
				},
			}}
		>
			{DrawerList}
		</Drawer>
	);
};

export default HistorySidebar;
