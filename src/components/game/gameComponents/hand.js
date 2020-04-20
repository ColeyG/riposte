import React from 'react';
import Card from './card';

class Hand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: require('./resources/cards.json'),
    };
  }

  render() {
    const cardsInHand = [];

    this.props.cards.forEach((element, index) => {
      const cardInfo = this.state.cards[element];
      cardsInHand.push(<Card key={index} name={element} cardInfo={cardInfo} playCardMethod={this.props.playCardMethod} controls={this.props.controls} />);
    });

    return <div className="hand">{cardsInHand}</div>;
  }
}

export default Hand;
