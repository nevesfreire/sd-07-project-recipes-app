import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  MainFood,
  MainDrink,
  Explore,
  ExploreFoods,
  ExploreDrinks,
  FoodIngredients,
  DrinkIngredients,
  FoodArea,
  Profile,
  DoneRecipes,
  FavoritesRecipes,
} from '../pages';

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      component={ Login }
    />
    <Route
      path="/comidas"
      component={ MainFood }
    />
    <Route
      path="/bebidas"
      component={ MainDrink }
    />
    <Route
      exact
      path="/explorar"
      component={ Explore }
    />
    <Route
      path="/explorar/comidas"
      component={ ExploreFoods }
    />
    <Route
      path="/explorar/bebidas"
      component={ ExploreDrinks }
    />
    <Route
      path="/explorar/comidas/ingredientes"
      component={ FoodIngredients }
    />
    <Route
      path="/explorar/bebidas/ingredientes"
      component={ DrinkIngredients }
    />
    <Route
      path="/explorar/comidas/area"
      component={ FoodArea }
    />
    <Route
      path="/perfil"
      component={ Profile }
    />
    <Route
      path="/receitas-feitas"
      component={ DoneRecipes }
    />
    <Route
      path="/receitas-favoritas"
      component={ FavoritesRecipes }
    />
  </Switch>
);

export default Routes;
