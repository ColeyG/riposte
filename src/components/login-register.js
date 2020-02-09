import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div className="login-register">
        <h2>Login | Register</h2>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" type="text" />
        <label htmlFor="password">Password</label>
        <input name="password" id="password" type="text" />
      </div>
    );
  }
}

export default Login;
