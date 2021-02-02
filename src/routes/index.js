import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Home,
  Login,
  RecipeDetails,
  RecipeExplore,
  RecipeExploreMore,
  RecipeExploreByIngredient } from '../pages';

export default function Routes() {
  return (
    <Switch>
      <Route path="/bebidas/:recipeId" component={ RecipeDetails } />
      <Route path="/comidas/:recipeId" component={ RecipeDetails } />
      <Route exact path="/bebidas" component={ Home } />
      <Route exact path="/comidas" component={ Home } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/explorar" component={ RecipeExplore } />
      <Route exact path="/explorar/comidas" component={ RecipeExploreMore } />
      <Route exact path="/explorar/bebidas" component={ RecipeExploreMore } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ RecipeExploreByIngredient }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ RecipeExploreByIngredient }
      />
    </Switch>
  );
}
