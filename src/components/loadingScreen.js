import React from 'react';

const config = require('../../config/config.json');

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slashStates: ['/', '-', '\\', '|'],
      slash: '/',
      count: 0,
      complete: false,
    };
  }

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    this.state.count++;
    const slashState = this.state.count % this.state.slashStates.length;
    // TODO: Actually Make this Load
    this.setState({
      slash: this.state.slashStates[slashState],
    });
    if (this.state.count > config.minLoad) {
      // Complete load state actions below, trigger these on load end
      this.setState({ complete: true });
      this.props.finishLoadingMethod();
    }
    setTimeout(() => {
      if (!this.state.complete) {
        requestAnimationFrame(this.animate);
      }
    }, 100);
  }

  render() {
    return (
      <div className="loading-screen">
        <h2>Loading...{this.state.slash}</h2>
      </div>
    );
  }
}

export default LoadingScreen;
