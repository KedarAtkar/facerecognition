import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div className="center">
			<div className="pa4 br3 shadow-5 pattern">
				<input
					type="text"
					placeholder="Enter the image URL"
					className="f4 pa2 w-70"
					onChange={onInputChange}
				/>
				<button
					className="grow f4 link ph2 pv2 dib white bg-light-purple"
					onClick={onButtonSubmit}
				>
					Detect
				</button>
			</div>
		</div>
	);
};

export default ImageLinkForm;
