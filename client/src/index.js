import React from 'react';
import ReactDOM from 'react-dom';
import UserProvider from './shared/UserContext';
import App from './App';
import "fontsource-roboto";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

