import React from 'react';
import EffectLibrary from './resources/effectLibrary';

class Effects extends EffectLibrary {
  constructor(props) {
    super(props);
    this.state = {
      effects: [],
      currentEffect: '',
      effectStyle: { opacity: 0 },
    };
  }

  componentDidUpdate = () => {
    if (this.props.effect !== undefined && this.props.effect !== '') {
      this.setState((prevState) => ({
        effects: [...prevState.effects, this.props.effect],
      }));
      this.triggerEffect(this.props.effect);
    }
  };

  triggerEffect = (effect) => {
    // TODO: Force effect stacking. IE: Make multiple triggers wait
    if (Object.getOwnPropertyNames(this).includes(effect)) {
      // console.log(`triggered: ${effect}, X: ${this.props.coords.x} Y: ${this.props.coords.y}`);
      eval(`this.${effect}();`);
    } else if (effect !== undefined) {
      console.log(`didn't trigger ${effect} effect, couldn't find a method`);
    }
    // TODO: Fix state management for the effect loop
    console.log(`effects: ${this.state.effects}`);
    this.props.removeEffectMethod();
  };

  render() {
    return (
      <React.Fragment>
        <div className="effect">
          <div className="effect-area" style={this.state.effectStyle}>
            {this.state.currentEffect}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Effects;
