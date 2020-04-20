import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interaction: 'dropped',
    };
  }

  isHeld = () => {
    if (this.state.interaction === 'dropped') {
      return false;
    }
    return true;
  };

  drag = (event) => {
    if (this.state.interaction === 'grabbed') {
      if (this.props.controls.mouse === 'up') {
        this.returnToHand(event);
      } else {
        let x = parseFloat(event.target.getAttribute('data-x')) || 0;
        let y = parseFloat(event.target.getAttribute('data-y')) || 0;
        const gameSizeCoefficient = document.querySelector('#game').getAttribute('game-size-coefficient');

        x += event.movementX / gameSizeCoefficient;
        y += event.movementY / gameSizeCoefficient;

        event.target.setAttribute('data-x', x);
        event.target.setAttribute('data-y', y);

        event.target.style.transform = `translate(${x}px, ${y}px)`;
      }
    }
  };

  pickup = () => {
    this.setState({ interaction: 'grabbed' });
  };

  drop = (event) => {
    this.setState({ interaction: 'dropped' });

    if (event.target.getAttribute('data-y') < -180) {
      this.playCard(event, event.target.getAttribute('data-x'), event.target.getAttribute('data-y'));
    }

    event.target.setAttribute('data-x', 0);
    event.target.setAttribute('data-y', 0);

    event.target.style.transform = 'translate(0px, 0px)';
  };

  playCard = (event, x, y) => {
    this.props.playCardMethod(this.props.cardInfo.effect, x, y);
  };

  returnToHand = (event) => {
    this.setState({ interaction: 'dropped' });

    event.target.setAttribute('data-x', 0);
    event.target.setAttribute('data-y', 0);

    event.target.style.transform = 'translate(0px, 0px)';
  };

  render() {
    return (
      <div className={this.isHeld() ? 'card' : 'card card-hand'} onMouseDown={this.pickup} onMouseUp={this.drop} onMouseMove={this.drag}>
        <img src={`../compiled/${require(`../../../../assets/game/resources/${this.props.cardInfo.image}`)}`} alt="Card Art" />
      </div>
    );
  }
}

export default Card;
