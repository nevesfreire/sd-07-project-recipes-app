import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Recipes from './pages/recipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Recipes } />
      <Route path="/bebidas" component={ Recipes } />
    </Switch>
  );
}

export default App;
