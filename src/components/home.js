import React from 'react';
import Icon from './icon';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: [
        {
          name: 'Files',
          image: 'assets/homeIcons/file-folder.png',
          method: () => {
            console.log('asdf');
          },
        },
        {
          name: 'My PC',
          image: 'assets/homeIcons/pc.png',
          method: () => {
            console.log('asdf');
          },
        },
        {
          name: 'Map',
          image: 'assets/homeIcons/map.png',
          method: () => {
            console.log('asdf');
          },
        },
        {
          name: 'Map',
          image: 'assets/homeIcons/map.png',
          method: () => {
            console.log('asdf');
          },
        },
      ],
    };
  }

  render() {
    let icons = [];
    this.state.icons.forEach((icon, index) => {
      icons.push(<Icon key={index} name={icon.name} image={icon.image} method={icon.method} />);
    });
    return (
      <React.Fragment>
        <div className="page">
          <div className="home">
            {icons}
          </div>

        </div>
        <footer className="primary-footer">

        </footer>
      </ React.Fragment >
    );
  }
}

export default Home;
