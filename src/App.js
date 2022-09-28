import React, { Component } from "react";
import "./App.css";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank.js";
import SignIn from "./components/SignIn/SignIn.js";
import SignUp from "./components/SignUp/SignUp.js";
import Particle from "./components/Particle/Particle.js";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const initialState = {
	input: "",
	imageUrl: "",
	box: {},
	route: "SignIn",
	isSignedIn: false,
	user: {
		id: "",
		name: "",
		email: "",
		entries: 0,
		joined: "",
	},
};

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined,
			},
		});
	};

	calculateFaceLocation = (data) => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputimage");
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	displayFaceBox = (box) => {
		this.setState({ box: box });
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = (event) => {
		this.setState({ imageUrl: this.state.input });
		fetch("http://localhost:3000/imageURL", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				input: this.state.input,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				fetch("http://localhost:3000/image", {
					method: "put",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: this.state.user.id,
					}),
				})
					.then((response) => response.json())
					.then((count) => {
						this.setState(Object.assign(this.state.user, { entries: count }));
					})
					.catch(console.log);
				this.displayFaceBox(this.calculateFaceLocation(response));
			})
			.catch((err) => console.log(err));
	};

	onSignIn = () => {
		this.setState({ route: "Home" });
	};

	onSignUpClick = () => {
		this.setState({ route: "SignUp" });
	};

	onSignInClick = () => {
		this.setState({ route: "SignIn" });
	};

	onSignUp = () => {
		this.setState({ route: "Home" });
	};

	onSignOut = () => {
		this.setState(initialState);
	};

	render() {
		const { route } = this.state;
		return (
			<div className="App">
				<Particle />
				{route === "SignIn" ? (
					<SignIn
						loadUser={this.loadUser}
						onSignIn={this.onSignIn}
						onSignUpClick={this.onSignUpClick}
					/>
				) : route === "SignUp" ? (
					<SignUp
						onSignUp={this.onSignUp}
						onSignInClick={this.onSignInClick}
						loadUser={this.loadUser}
					/>
				) : (
					<div>
						<Navigation onSignOut={this.onSignOut} />
						<Logo />
						<Rank
							name={this.state.user.name}
							entries={this.state.user.entries}
						/>
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onButtonSubmit={this.onButtonSubmit}
						/>
						<FaceRecognition
							box={this.state.box}
							imageUrl={this.state.imageUrl}
						/>
					</div>
				)}
			</div>
		);
	}
}
export default App;
