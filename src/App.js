import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './context';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
