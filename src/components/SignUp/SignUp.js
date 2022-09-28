import React from "react";

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signUpName: "",
			signUpEmail: "",
			signUpPassword: "",
		};
	}

	onNameChange = (event) => {
		this.setState({ signUpName: event.target.value });
	};

	onEmailChange = (event) => {
		this.setState({ signUpEmail: event.target.value });
	};

	onPasswordChange = (event) => {
		this.setState({ signUpPassword: event.target.value });
	};

	onSignUpSubmit = (event) => {
		fetch("http://localhost:3000/signup", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: this.state.signUpEmail,
				password: this.state.signUpPassword,
				name: this.state.signUpName,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.id) {
					this.props.loadUser(data);
					this.props.onSignUp();
				}
			});
	};

	render() {
		return (
			<article className="br2 ba b--black-50 mv6 w-100 w-50-m w-25-l mw5 center shadow-2 bg-navy o-60">
				<div className="measure">
					<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
						<legend className="f4 fw6 ph0 mh0 white center mt5">Sign Up</legend>
						<div className="mt2">
							<label className="db fw6 lh-copy f6 white" htmlFor="name">
								Name
							</label>
							<input
								className="pa2 input-reset ba bw1 b--white-50 w-100"
								type="text"
								name="name"
								id="name"
								onChange={this.onNameChange}
							/>
						</div>
						<div className="mt3">
							<label
								className="db fw6 lh-copy f6 white"
								htmlFor="email-address"
							>
								Email
							</label>
							<input
								className="pa2 input-reset ba bw1 b--white-50 w-100"
								type="email"
								name="email-address"
								id="email-address"
								onChange={this.onEmailChange}
							/>
						</div>
						<div className="mv3">
							<label className="db fw6 lh-copy f6 white" htmlFor="password">
								Password
							</label>
							<input
								className="pa2 input-reset ba bw1 b--white-50 w-100"
								type="password"
								name="password"
								id="password"
								onChange={this.onPasswordChange}
							/>
						</div>
					</fieldset>
					<div className="center">
						<input
							className="b ph3 pv2 input-reset ba b--white-50 bg-transparent grow pointer f6 dib white"
							type="submit"
							value="Sign Up"
							onClick={this.onSignUpSubmit}
						/>
					</div>
					<div className="lh-copy mt1 center">
						<p
							className="f5 link dim black db pointer white"
							onClick={this.props.onSignInClick}
						>
							Sign In
						</p>
					</div>
				</div>
			</article>
		);
	}
}

export default SignUp;
