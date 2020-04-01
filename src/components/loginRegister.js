import React from 'react';
import { session, ipcRenderer } from 'electron';

import config from '../../config/config.json';

class LoginRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp: true, visible: true, errors: [], success: '',
    };
  }

  componentDidMount() {
    // TODO: Don't show form until cookie is validated
    ipcRenderer.on('cookie-response', (event, arg) => {
      console.log(arg);
      if (arg.name === 'accountCookie') {
        this.foundAccountCookie(arg.value);
      } else {
        arg.forEach((cookie) => {
          if (cookie.name === 'accountCookie') {
            this.foundAccountCookie(cookie.value);
          }
        });
      }
    });

    ipcRenderer.send('cookie-request');
  }

  foundAccountCookie = (value) => {
    fetch(`${config.server}/account/token/${value}`).then(
      (resp) => resp.json(),
    ).then((data) => {
      if (data.expired === false) {
        this.props.loginMethod();
      } else {
        this.setState({
          errors: ['Login Session Expired'],
        });
      }
    });
  }

  toggleHideForm = () => {
    this.setState({ visible: !this.state.visible });
  }

  swapForm = () => {
    this.setState({ signUp: !this.state.signUp });
  }

  signInAction = () => {
    const data = new URLSearchParams();
    // eslint-disable-next-line no-restricted-syntax
    for (const pair of new FormData(document.querySelector('.login-form'))) {
      data.append(pair[0], pair[1]);
    }

    fetch(`${config.server}/account/signIn`, {
      method: 'POST',
      body: data,
    }).then(
      (resp) => resp.json(),
    )
      .then((data) => {
        if (data.errors) {
          this.setState({
            errors: data.errors,
          });
        } else {
          ipcRenderer.send('cookie-clear');
          ipcRenderer.send('cookie-save', data);
          this.setState({
            success: 'Successful Login!',
          });
          setTimeout(() => { this.props.loginMethod(); }, 1000);
        }
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
      (resp) => resp.json(),
    )
      .then((data) => {
        if (data.errors) {
          this.setState({
            errors: data.errors,
          });
        } else {
          ipcRenderer.send('cookie-clear');
          ipcRenderer.send('cookie-save', data);
          this.setState({
            success: 'Successful Account Creation!',
          });
          setTimeout(() => { this.props.loginMethod(); }, 1000);
        }
      });
  }

  render() {
    if (this.state.signUp) {
      return (
        <div className="page">
          <form action="" className="login-form">
            <h2><span className="active">Login</span> | Register</h2>
            <label htmlFor="username">Username</label>
            <input name="username" id="username" type="text" />
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type="password" />
            <button type="button" onClick={this.signInAction}>Sign In</button>
            <div className="error-field">
              {this.state.errors.map((error, i) => (<p className="error" key={i}>{error}</p>))}
            </div>
            <div className="success-field">
              <p className="success">
                {this.state.success}
              </p>
            </div>
            <p>Haven't played yet?</p>
            <button type="button" onClick={this.swapForm}>Create an Account</button>
          </form>
        </div>
      );
    }
    return (
      <div className="page">
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
          <div className="error-field">
            {this.state.errors.map((error, i) => (<p className="error" key={i}>{error}</p>))}
          </div>
          <div className="success-field">
            <p className="success">
              {this.state.success}
            </p>
          </div>
          <p>Already have an account?</p>
          <button type="button" onClick={this.swapForm}>Go to Sign In</button>
        </form>
      </div>
    );
  }
}

export default LoginRegister;
