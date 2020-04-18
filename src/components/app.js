import React from 'react';
import Header from './header';
import LoadingScreen from './loadingScreen';
import LoginRegister from './loginRegister';
import Home from './home';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loggedIn: false,
      userData: {},
    };
  }

  finishLoading = () => {
    this.setState({
      loading: false,
    });
  }

  loginSuccess = (data) => {
    console.log(data);
    this.setState({
      loggedIn: true,
      userData: data,
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
        <Home userData={this.state.userData} />
      </React.Fragment>
    );
  }
}

export default App;
