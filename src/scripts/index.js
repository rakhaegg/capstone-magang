import React from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/extensions
import App from './views/app.jsx';
import '../styles/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
