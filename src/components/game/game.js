// This is the game component which will implement all other game components
import React from 'react';
import Hand from './gameComponents/hand';
import Deck from './gameComponents/deck';
import Effects from './gameComponents/effects';
import Controls from './gameComponents/controls';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsInHand: [],
      playerDeck: require('./gameComponents/resources/playerDeck.json'),
      cardsDrawn: [],
      controls: {
        mouse: 'up',
      },
    };
    this.Controls = new Controls(this);
    // TODO: Bind more stuff this way
  }

  componentDidMount = () => {
    document.body.addEventListener('mousedown', () => {
      this.Controls.mouseControls('down');
    });
    document.body.addEventListener('mouseup', () => {
      this.Controls.mouseControls('up');
    });
    document.body.addEventListener('keydown', this.Controls.keyboardControls);
  };

  componentWillUnmount = () => {
    document.body.addEventListener('mousedown', () => {
      this.mouseControls('down');
    });
    document.body.addEventListener('mouseup', () => {
      this.mouseControls('up');
    });
    document.body.addEventListener('keydown', this.keyboardControls);
  };

  getRandomCardFromDeck = () => {
    const keys = Object.keys(this.state.playerDeck);
    const randKey = keys[(keys.length * Math.random()) << 0];

    if (this.state.playerDeck[randKey] >= 1) {
      return randKey;
    }
    console.log('Something went wrong, that card has 0 copies');
    return 'error';
  };

  removeCardFromDeck = (card) => {
    const deck = this.state.playerDeck;
    delete deck[card];
    this.setState({ playerDeck: deck });
  };

  drawCardMethod = () => {
    const currentCards = this.state.cardsInHand;
    const newCard = this.getRandomCardFromDeck();

    this.removeCardFromDeck(newCard);
    currentCards.push(newCard);

    this.setState({ cardsInHand: currentCards });
  };

  playCardMethod = (effect, x, y) => {
    this.setState({ effects: effect, x, y });
  };

  removeEffectMethod = () => {
    this.setState({ effects: '' });
  };

  render() {
    return (
      <React.Fragment>
        <Effects effect={this.state.effects} coords={{ x: this.state.x, y: this.state.y }} removeEffectMethod={this.removeEffectMethod} />
        <Deck drawCardMethod={this.drawCardMethod} />
        <Hand cards={this.state.cardsInHand} playCardMethod={this.playCardMethod} controls={this.state.controls} />
      </React.Fragment>
    );
  }
}

export default Game;
