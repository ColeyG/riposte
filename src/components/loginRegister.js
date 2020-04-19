import React from 'react';
import { session, ipcRenderer } from 'electron';

import config from '../../config/config.json';

class LoginRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      signUp: true,
      visible: true,
      errors: [],
      success: '',
    };
  }

  componentDidMount() {
    // TODO: Don't show form until cookie is validated
    ipcRenderer.on('cookie-response', (event, arg) => {
      let foundAccountCookieBool = false;
      // Shows cookies:
      // console.log(arg);
      if (arg.name === 'accountCookie') {
        this.foundAccountCookie(arg.value);
        foundAccountCookieBool = true;
      }
      arg.forEach((cookie) => {
        if (cookie.name === 'accountCookie') {
          this.foundAccountCookie(cookie.value);
          foundAccountCookieBool = true;
        }
      });
      if (!foundAccountCookieBool) {
        this.setState({ loading: false });
      }
    });

    ipcRenderer.send('cookie-request');
  }

  foundAccountCookie = (value) => {
    fetch(`${config.server}/account/token/${value}`)
      .catch((err) => {
        this.setState({ loading: false });
        this.setState({
          errors: ['Login Session Expired'],
        });
      })
      .then(
        (resp) => resp.json(),
      ).then((data) => {
        if (data.expired === false) {
          this.props.loginMethod(data);
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false });
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
          setTimeout(() => { this.props.loginMethod(data.userData); }, 1000);
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
          setTimeout(() => { this.props.loginMethod(data.userData); }, 1000);
        }
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="page">
          <div className="login-register-loading">

          </div>
        </div>
      );
    }
    if (this.state.signUp) {
      return (
        <div className="page">
          <form action="" className="login-form">
            <h2><span className="active">Login</span> | <span className="inactive" onClick={this.swapForm}>Register</span></h2>
            <label htmlFor="username">Username</label>
            <br />
            <input name="username" id="username" type="text" />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input name="password" id="password" type="password" />
            <br />
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
          <h2><span className="inactive" onClick={this.swapForm}>Login</span> | <span className="active">Register</span></h2>
          <label htmlFor="username">Username</label>
          <br />
          <input name="username" id="username" type="text" />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input name="email" id="email" type="text" />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input name="password" id="password" type="password" />
          <br />
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <br />
          <input name="passwordConfirm" id="passwordConfirm" type="password" />
          <br />
          <button type="button" onClick={this.createAccountAction}>Create your Account</button>
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
