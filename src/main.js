import '../styles/reset.css';
import '../styles/main.scss';
import React from 'react';
import { render } from 'react-dom';
import App from './components/app';

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

const e = React.createElement;

const app = document.querySelector('#app');
render(<App />, app);
