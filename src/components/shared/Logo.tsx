import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { UITLogo } from "@assets/svgs";

const Logo = () => {
	return (
		<Box
			sx={{
				display: "flex",
				marginRight: "auto",
				alignItems: "center",
				gap: "8px",
			}}
		>
			<Link
				to={"/"}
				style={{
					textDecoration: "none",
					fontSize: "20px",
					fontWeight: 600,
					display: "flex",
					alignItems: "center",
				}}
			>
				<UITLogo style={{ width: "40px", height: "40px" }} />
			</Link>
		</Box>
	);
};

export default Logo;
