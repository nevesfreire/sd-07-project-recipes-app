import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  Food,
  Drink,
  Explore,
  Perfil,
  Login,
  DrinkDetails,
  FoodDetails,
  DoneRecipes,
  FoodProgress,
  DrinkProgress,
  FavoriteRecipes,
  DrinkExplore,
  FoodExplore,
  DrinkExploreIngredient,
  FoodExploreIngredient,
  FoodExploreArea,
} from './pages';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Food } />
      <Route exact path="/bebidas" component={ Drink } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/comidas/:id" component={ FoodDetails } />
      <Route exact path="/bebidas/:id" component={ DrinkDetails } />
      <Route exact path="/explorar/comidas" component={ FoodExplore } />
      <Route exact path="/explorar/bebidas" component={ DrinkExplore } />
      <Route path="/explorar/bebidas/ingredientes" component={ DrinkExploreIngredient } />
      <Route path="/explorar/comidas/ingredientes" component={ FoodExploreIngredient } />
      <Route path="/explorar/comidas/area" component={ FoodExploreArea } />
      <Route path="/comidas/:id/in-progress" component={ FoodProgress } />
      <Route path="/bebidas/:id/in-progress" component={ DrinkProgress } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="*" component={ () => <h1>Not Found</h1> } />
    </Switch>
  </Router>
);

export default Routes;
