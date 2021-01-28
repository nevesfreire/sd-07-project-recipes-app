import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MealRecipeDetails from './pages/MealRecipeDetails';
import CocktailRecipeDetails from './pages/CocktailRecipeDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/profile" component={ Profile } />
      <Route path="/comidas/52771" component={ MealRecipeDetails } />
      <Route path="/bebidas/178319" component={ CocktailRecipeDetails } />
    </Switch>
  );
}

export default App;
