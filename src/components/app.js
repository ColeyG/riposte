import React from 'react';
import Header from './header';
import LoadingScreen from './loadingScreen';
import LoginRegister from './loginRegister';
import Main from './main';

class App extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, loggedIn: false };
  }

  finishLoading = () => {
    this.setState({
      loading: false,
    });
  }

  loginSuccess = () => {
    this.setState({
      loggedIn: true,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingScreen finishLoadingMethod={this.finishLoading} />
      );
    }
    if (!this.state.loggedIn) {
      return (
        <React.Fragment>
          <Header />
          <LoginRegister loginMethod={this.loginSuccess} />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Header />
        <Main />
      </React.Fragment>
    );
  }
}

export default App;
