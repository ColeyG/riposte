import React from 'react';
import { remote } from 'electron';

class Header extends React.Component {
  minimize = () => {
    const window = remote.getCurrentWindow();
    window.minimize();
  };

  maximize = () => {
    const window = remote.getCurrentWindow();
    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }
  };

  close = () => {
    const window = remote.getCurrentWindow();
    window.close();
  };

  render() {
    return (
      <header className="primary-header">
        <h2>Riposte OS</h2>
        <nav className="primary-nav">
          <ul>
            <li>
              <a href="#" className="minimize-button" onClick={this.minimize}><img src="../styles/icons/minimize.svg" alt="true" /></a>
            </li>
            <li>
              <a href="#" className="maximize-button" onClick={this.maximize}><img src="../styles/icons/maximize.svg" alt="true" /></a>
            </li>
            <li>
              <a href="#" className="close-button" onClick={this.close}><img src="../styles/icons/close.svg" alt="true" /></a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
