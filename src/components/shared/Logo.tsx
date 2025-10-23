import { Link } from "react-router-dom";

const Logo = () => {
	return (
		<div
			style={{
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
				}}
			>
				<span style={{ color: "#4299E1" }}>UIT</span>
				<span style={{ color: "#B2F5EA" }}>-</span>
				<span style={{ color: "#38B2AC" }}>Regulations</span>
			</Link>
		</div>
	);
};

export default Logo;
