import React from 'react';
import { session, ipcRenderer } from 'electron';

import config from '../../config/config.json';

class LoginRegister extends React.Component {
  constructor() {
    super();
    this.state = { signUp: true, visible: true };
  }

  componentDidMount() {
    ipcRenderer.on('cookie-response', (event, arg) => {
      console.log(arg);
    });

    ipcRenderer.send('cookie-request');
  }

  toggleHideForm = () => {
    this.setState({ visible: !this.state.visible });
  }

  swapForm = () => {
    this.setState({ signUp: !this.state.signUp });
  }

  signInAction = () => {
    fetch(`${config.server}/account/signIn`).then(
      (resp) => resp.json(),
    )
      .then((data) => {
        console.log(data);
        // Need to use electron cookie: https://www.electronjs.org/docs/api/cookies
        // session.defaultSession.cookies.set(data);
        ipcRenderer.send('cookie-save', data);
      });
  }

  createAccountAction = () => {
    console.log('create account action');
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
          <button type="button" onClick={this.signInAction}>Sign In</button>
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
        <button type="button" onClick={this.createAccountAction}>Create an Account</button>
        <p>Already have an account?</p>
        <button type="button" onClick={this.swapForm}>Go to Sign In</button>
      </form>
    );
  }
}

export default LoginRegister;
