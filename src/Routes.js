import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/* <Route path="/comidas" component={ Meals } />
        <Route path="/bebidas" component={ Cocktails } />
        <Route path={ `/comidas/${receipeId}` } component={ MealDetails } />
        <Route path={ `/bebidas/${receipeId}` } component={ CocktailDetails } />
        <Route
          path={ `/comidas/${receipeId}/in-progress` }
          component={ MealsInProgress }
        />
        <Route
          path={ `/bebidas/${receipeId}/in-progress` }
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
        <Route path="/receitas-feitas" component={ DoneReceipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } /> */}
    </Switch>
  );
}

export default Routes;
