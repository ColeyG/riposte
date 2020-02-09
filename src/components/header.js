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
      <header class="primary-header">
        <h2>Riposte OS</h2>
        <nav class="primary-nav">
          <ul>
            <li>
              <a href="#" class="minimize-button" onClick={this.minimize}><img src="../styles/icons/minimize.svg" alt /></a>
            </li>
            <li>
              <a href="#" class="maximize-button" onClick={this.maximize}><img src="../styles/icons/maximize.svg" alt /></a>
            </li>
            <li>
              <a href="#" class="close-button" onClick={this.close}><img src="../styles/icons/close.svg" alt /></a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
