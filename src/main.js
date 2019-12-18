import '../styles/reset.css';
import '../styles/main.scss';

const { remote } = require('electron');

document.querySelector('.close-button').addEventListener('click', (e) => {
  const window = remote.getCurrentWindow();
  window.close();
});

document.querySelector('.maximize-button').addEventListener('click', (e) => {
  const window = remote.getCurrentWindow();
  if (window.isMaximized()) {
    window.unmaximize();
  } else {
    window.maximize();
  }
});

document.querySelector('.minimize-button').addEventListener('click', (e) => {
  const window = remote.getCurrentWindow();
  window.minimize();
});
