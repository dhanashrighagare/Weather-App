import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change here
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Note the change here

root.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
