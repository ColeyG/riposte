import React from 'react';

class EffectLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.defaultEffectStyle = { opacity: 0 };
    this.effectLib = {
      diamond: {
        length: 2000,
      },
    };
  }

  diamond = () => {
    const rules = this.effectLib.diamond;
    // TODO: Make the timeout actually elegant
    this.state.effectStyle = { opacity: 1, transition: '1s' };
    this.state.currentEffect = <img src={`compiled/${require('../../../../../assets/game/resources/effects/polished-diamond.png')}`} alt="" />;
    setTimeout(() => {
      this.state.effectStyle = { opacity: 0, transition: '1s' };
      this.forceUpdate();
      setTimeout(() => {
        this.state.effectStyle = this.defaultEffectStyle;
        this.forceUpdate();
      }, rules.length / 2);
    }, rules.length / 2);
  };
}

export default EffectLibrary;
