import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Login } from '../pages';
import Explore from '../pages/RecipeExplore';
import RecipeExploreByIngredient from '../pages/RecipeExploreByIngredient';
import ExploreMore from '../pages/RecipeExploreMore';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/receitas" component={ Home } />
      <Route exact path="/comidas" component={ Home } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreMore } />
      <Route exact path="/explorar/bebidas" component={ ExploreMore } />
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
