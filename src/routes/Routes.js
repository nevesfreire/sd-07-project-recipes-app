import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Login,
  Food,
  Drinks,
  Explore,
  ExploreFoods,
  ExploreDrinks,
  ExploreByIngredients,
  ExploreByArea,
  Profile,
  DoneRecipes,
  FavoriteRecipes,
} from '../pages';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          exact
          path="/comidas"
          component={ Food }
        />
        <Route
          exact
          path="/bebidas"
          component={ Drinks }
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
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreByIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreByIngredients }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ ExploreByArea }
        />
        <Route
          exact
          path="/perfil"
          component={ Profile }
        />
        <Route
          exact
          path="/receitas-feitas"
          component={ DoneRecipes }
        />
        <Route
          exact
          path="/receitas-favoritas"
          component={ FavoriteRecipes }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
