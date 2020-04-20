class Controls {
  constructor(parent) {
    this.parent = parent;
  }

  mouseControls = (type) => {
    if (type === 'down') {
      this.parent.setState({ controls: { mouse: 'down' } });
    }
    if (type === 'up') {
      this.parent.setState({ controls: { mouse: 'up' } });
    }
  };

  keyboardControls = () => {
    // TODO: Add enable disable flow here. Currently working only on down
    // console.log(event.key);
  };
}

export default Controls;
