import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Food from './pages/food';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Food } />
    </Switch>
  );
}

export default App;
