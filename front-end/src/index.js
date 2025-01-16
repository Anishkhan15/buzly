// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client' instead of 'react-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root element using `createRoot`
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: For measuring performance
reportWebVitals();
