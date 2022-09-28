import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";

const Logo = () => {
	return (
		<Tilt className="br3 bg-blue shadow-2 ma4 mt0 h-10 w-10 pa2">
			<div>
				<img src={brain} alt="logo"></img>
			</div>
		</Tilt>
	);
};
export default Logo;
