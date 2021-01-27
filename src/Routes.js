import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Login,
  Meals,
  Cocktails,
  MealDetails,
  CocktailDetails,
  MealsInProgress,
  CocktailsInProgress,
  Explore,
  ExploreMeals,
  ExploreCocktails,
  ExploreMealsIngredients,
  ExploreCocktailsIngredients,
  ExploreMealsOrigin,
  ExploreCocktailsOrigin,
  Profile,
  DoneRecipes,
  FavoriteRecipes,
} from './import';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Meals } />
      <Route path="/bebidas" component={ Cocktails } />
      <Route path={ `/comidas/${''}` } component={ MealDetails } />
      <Route path={ `/bebidas/${''}` } component={ CocktailDetails } />
      <Route
        path={ `/comidas/${''}/in-progress` }
        component={ MealsInProgress }
      />
      <Route
        path={ `/bebidas/${''}/in-progress` }
        component={ CocktailsInProgress }
      />
      <Route path="/explorar" component={ Explore } />
      <Route path="/explorar/comidas" component={ ExploreMeals } />
      <Route path="/explorar/bebidas" component={ ExploreCocktails } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExploreMealsIngredients }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExploreCocktailsIngredients }
      />
      <Route path="/explorar/comidas/area" component={ ExploreMealsOrigin } />
      <Route path="/explorar/bebidas/area" component={ ExploreCocktailsOrigin } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;
