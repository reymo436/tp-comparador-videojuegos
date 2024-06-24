import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/index.css';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
