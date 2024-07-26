// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import { AuthProvider } from './Context/AuthContext';
import { Provider } from 'react-redux';
import store from './store';

const root = createRoot(document.getElementById('root'));
root.render( 
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);