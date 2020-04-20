import React from 'react';
import Header from './header';
import LoadingScreen from './loadingScreen';
import LoginRegister from './loginRegister';
import Home from './home';
import Game from './game/game';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loggedIn: false,
      userData: {},
      singlePlayerGame: false,
      multiplayerGame: false,
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

  singlePlayerMethod = () => {
    this.setState({
      singlePlayerGame: true,
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
    if (this.state.singlePlayerGame) {
      return (
        <React.Fragment>
          <Header />
          <Game />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Header />
        <Home userData={this.state.userData} singlePlayerMethod={this.singlePlayerMethod} />
      </React.Fragment>
    );
  }
}

export default App;
