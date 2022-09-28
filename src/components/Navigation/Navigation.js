import React from "react";

const Navigation = ({ onSignOut }) => {
	return (
		<nav style={{ display: "flex", justifyContent: "flex-end" }}>
			<p
				className="f4 link dim white underline pa3 mt0 pointer"
				onClick={onSignOut}
			>
				Sign out
			</p>
		</nav>
	);
};

export default Navigation;
