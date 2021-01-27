import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
