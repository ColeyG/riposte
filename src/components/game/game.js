// This is the game component which will implement all other game components
import React from 'react';
import Hand from './gameComponents/hand';
import Deck from './gameComponents/deck';
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

    const gameCanvas = document.querySelector('#game');

    function resize() {
      if (window.innerHeight * 1.7778 > window.innerWidth) {
        const gameSizeCoefficent = window.innerWidth / 1920;
        gameCanvas.style.transform = `scale(${gameSizeCoefficent})`;
        gameCanvas.style.marginTop = `${(window.innerHeight - gameCanvas.offsetHeight * gameSizeCoefficent) / 2}px`;
        gameCanvas.style.marginLeft = '0px';
        gameCanvas.setAttribute('game-size-coefficient', gameSizeCoefficent);
      } else {
        const gameSizeCoefficent = window.innerHeight / 1080;
        gameCanvas.style.transform = `scale(${gameSizeCoefficent})`;
        gameCanvas.style.marginLeft = `${(window.innerWidth - gameCanvas.offsetWidth * gameSizeCoefficent) / 2}px`;
        gameCanvas.style.marginTop = '0px';
        gameCanvas.setAttribute('game-size-coefficient', gameSizeCoefficent);
      }
    }

    window.addEventListener('resize', resize);

    resize();
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
    // this.setState({ effects: effect, x, y });
  };

  removeEffectMethod = () => {
    this.setState({ effects: '' });
  };

  render() {
    return (
      <div id="game">
        <Deck drawCardMethod={this.drawCardMethod} />
        <Hand cards={this.state.cardsInHand} playCardMethod={this.playCardMethod} controls={this.state.controls} />
      </div>
    );
  }
}

export default Game;
