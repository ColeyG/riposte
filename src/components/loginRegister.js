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
        // session.defaultSession.cookies.set(data);
        console.log(data);
        ipcRenderer.send('cookie-save', data);
      });
  }

  createAccountAction = () => {
    const data = new URLSearchParams();
    // eslint-disable-next-line no-restricted-syntax
    for (const pair of new FormData(document.querySelector('.register-form'))) {
      data.append(pair[0], pair[1]);
    }

    fetch(`${config.server}/account/register`, {
      method: 'POST',
      body: data,
    }).then(
      (resp) => resp.text(),
    )
      .then((data) => {
        // session.defaultSession.cookies.set(data);
        console.log(data);
        // ipcRenderer.send('cookie-save', data);
      });
  }

  render() {
    if (this.state.signUp) {
      return (
        <form action="" className="login-form">
          <h2><span className="active">Login</span> | Register</h2>
          <label htmlFor="username">Username</label>
          <input name="username" id="username" type="text" />
          <label htmlFor="password">Password</label>
          <input name="password" id="password" type="password" />
          <button type="button" onClick={this.signInAction}>Sign In</button>
          <p>Haven't played yet?</p>
          <button type="button" onClick={this.swapForm}>Create an Account</button>
        </form>
      );
    }
    return (
      <form action="" className="register-form">
        <h2>Login | <span className="active">Register</span></h2>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" type="text" />
        <label htmlFor="email">Email</label>
        <input name="email" id="email" type="text" />
        <label htmlFor="password">Password</label>
        <input name="password" id="password" type="password" />
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input name="passwordConfirm" id="passwordConfirm" type="password" />
        <button type="button" onClick={this.createAccountAction}>Create an Account</button>
        <p>Already have an account?</p>
        <button type="button" onClick={this.swapForm}>Go to Sign In</button>
      </form>
    );
  }
}

export default LoginRegister;
