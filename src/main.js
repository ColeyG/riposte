import '../styles/reset.css';
import '../styles/main.scss';
import React from 'react';
import { render } from 'react-dom';
import App from './components/app';

const app = document.querySelector('#app');
render(<App />, app);
