import React from 'react';

const image = require('../../../../assets/game/resources/Plebes/V2_4x/PixelPlebes_V2_4x__53.png');

class Deck extends React.Component {
  constructor(props) {
    super(props);
    const deck = require('./resources/playerDeck.json');
    const deckSize = Object.keys(deck).length;

    this.state = {
      cardsInDeck: deckSize,
      fauxCards: [],
    };
  }

  componentDidMount() {
    const fauxCards = [];
    for (let i = 0; i < this.state.cardsInDeck; i++) {
      fauxCards.push(
        <div key={i} className="deck-card">
          <img src={`../compiled/${image}`} alt="Deck Back Art" />
        </div>,
      );
    }
    this.setState({ fauxCards });
  }

  drawCard = () => {
    // TODO: Don't let an empty deck draw
    const newDeck = this.state.fauxCards;
    newDeck.shift();
    this.setState({ fauxCards: newDeck });
    this.props.drawCardMethod();
  };

  render() {
    return (
      <div className="deck" onClick={this.drawCard}>
        {this.state.fauxCards}
      </div>
    );
  }
}

export default Deck;
