import React from "react";

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: "",
			signInPassword: "",
		};
	}

	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value });
	};

	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value });
	};

	onSignInSubmit = (event) => {
		fetch("http://localhost:3000/signin", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.id) {
					this.props.loadUser(data);
					this.props.onSignIn();
				} else {
					this.props.onSignUpClick();
				}
			});
	};

	render() {
		const { /*onSignIn,*/ onSignUpClick } = this.props;
		return (
			<article className="br2 ba b--black-50 mv6 w-100 w-50-m w-25-l mw5 center shadow-2 bg-navy o-60">
				<div className="measure">
					<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
						<legend className="f4 fw6 ph0 mh0 white center mt5">Sign In</legend>
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
							value="Sign in"
							onClick={this.onSignInSubmit}
						/>
					</div>
					<div className="lh-copy mt1 center">
						<p
							className="f5 link dim black db pointer white"
							onClick={onSignUpClick}
						>
							Sign up
						</p>
					</div>
				</div>
			</article>
		);
	}
}

export default SignIn;
