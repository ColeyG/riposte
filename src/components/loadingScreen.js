import React from 'react';

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slashStates: ['/', '-', '\\', '|'],
      slash: '/',
      count: 0,
    };
  }

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    this.state.count++;
    const slashState = this.state.count % this.state.slashStates.length;
    // TODO: Actually Make this Load
    if (this.state.count > 100) {
      this.props.finishLoadingMethod();
    }
    this.setState({
      slash: this.state.slashStates[slashState],
    });
    setTimeout(() => {
      requestAnimationFrame(this.animate);
    }, 100);
  }

  render() {
    return (
      <div id="loading-screen">
        <h2>Loading...{this.state.slash}</h2>
      </div>
    );
  }
}

export default LoadingScreen;
