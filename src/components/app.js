import React from 'react';
import Header from './header';
import LoadingScreen from './loadingScreen';
import LoginRegister from './loginRegister';

class App extends React.Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  finishLoading = () => {
    this.setState({
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingScreen finishLoadingMethod={this.finishLoading} />
      );
    }
    return (
      <React.Fragment>
        <Header />
        <LoginRegister />
      </React.Fragment>
    );
  }
}

export default App;
