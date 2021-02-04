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
  RecipeDetails,
} from '../pages';

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      component={ Login }
    />
    <Route
      exact
      path="/comidas"
      component={ MainFood }
    />
    <Route
      exact
      path="/bebidas"
      component={ MainDrink }
    />
    <Route
      exact
      path="/explorar"
      component={ Explore }
    />
    <Route
      exact
      path="/explorar/comidas"
      component={ ExploreFoods }
    />
    <Route
      exact
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
    <Route
      path="/comidas/:id"
      component={ RecipeDetails }
    />
    <Route
      path="/bebidas/:id"
      component={ RecipeDetails }
    />
  </Switch>
);

export default Routes;
