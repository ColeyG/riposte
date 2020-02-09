import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = { signUp: true };
  }

  swapForm = () => {
    this.setState({ signUp: !this.state.signUp });
  }

  render() {
    if (this.state.signUp) {
      return (
        <form action="">
          <h2><span className="active">Login</span> | Register</h2>
          <label htmlFor="username">Username</label>
          <input name="username" id="username" type="text" />
          <label htmlFor="password">Password</label>
          <input name="password" id="password" type="text" />
          <button type="button">Sign In</button>
          <p>Haven't played yet?</p>
          <button type="button" onClick={this.swapForm}>Create an Account</button>
        </form>
      );
    }
    return (
      <form action="">
        <h2>Login | <span className="active">Register</span></h2>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" type="text" />
        <label htmlFor="email">Email</label>
        <input name="email" id="email" type="text" />
        <label htmlFor="password">Password</label>
        <input name="password" id="password" type="text" />
        <label htmlFor="password-confirm">Confirm Password</label>
        <input name="password-confirm" id="password-confirm" type="text" />
        <button type="button">Create an Account</button>
        <p>Already have an account?</p>
        <button type="button" onClick={this.swapForm}>Go to Sign In</button>
      </form>
    );
  }
}

export default Login;
