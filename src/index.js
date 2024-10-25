// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { YourContextProvider } from './YourContext'; // Make sure this path is correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <YourContextProvider>
      <App />
    </YourContextProvider>
  </React.StrictMode>
);

reportWebVitals();
