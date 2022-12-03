import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import { AppContainer } from './views/app.jsx';
import '../styles/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
      <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
);
