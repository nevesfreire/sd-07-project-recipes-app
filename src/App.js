import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Login } />
    </BrowserRouter>
  );
}

export default App;
