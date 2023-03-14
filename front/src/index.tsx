import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './login';
import MyComponent from './hotels';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Login />
    <MyComponent></MyComponent>
  </React.StrictMode>
);
