import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Provider from './Context/Provider';
import Router from './Routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="main-container">
      <Provider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
