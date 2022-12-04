import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import { AppContainer } from './views/app.jsx';
import '../styles/styles.css';
// eslint-disable-next-line import/extensions
import swRegister from './utility/SwRegister.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
window.addEventListener('load', () => {
  swRegister();
});

root.render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
);
