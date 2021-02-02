import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Food from './pages/Food';
import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drinks from './pages/Drinks';
import DrinkDetails from './pages/DrinkDetails';
import Explore from './pages/Explore';
import DrinkInProgress from './pages/DrinkInProgress';
import FoodDetails from './pages/FoodDetails';
import FoodInProgress from './pages/FoodInProgress';
import DrinkExplore from './pages/DrinkExplore';
import FoodExplore from './pages/FoodExplore';
import FoodIngredients from './pages/FoodIngredients';
import DrinkIngredients from './pages/DrinkIngredients';
import FoodArea from './pages/FoodArea';
import DoneRecipe from './pages/DoneRecipe';
import FavoriteRecipe from './pages/FavoriteRecipe';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/comidas/:id/in-progress" component={ FoodInProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
      <Route exact path="/comidas/:id" component={ FoodDetails } />
      <Route exact path="/bebidas/:id" component={ DrinkDetails } />
      <Route exact path="/comidas" component={ Food } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/explorar/comidas/ingredientes" component={ FoodIngredients } />
      <Route exact path="/explorar/bebidas/ingredientes" component={ DrinkIngredients } />
      <Route exact path="/explorar/comidas/area" component={ FoodArea } />
      <Route exact path="/explorar/comidas" component={ FoodExplore } />
      <Route exact path="/explorar/bebidas" component={ DrinkExplore } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/receitas-feitas" component={ DoneRecipe } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipe } />
    </Switch>
  );
}

export default App;
