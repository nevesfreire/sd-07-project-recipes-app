import React from 'react';
import { Switch, Route } from 'react-router-dom';
<<<<<<< HEAD
import { Home, Login } from '../pages';
import Explore from '../pages/RecipeExplore';
import RecipeExploreByIngredient from '../pages/RecipeExploreByIngredient';
import ExploreMore from '../pages/RecipeExploreMore';
=======
import { Home, Login, RecipeDetails } from '../pages/index';
>>>>>>> 1c42238425f500421023cd15480ae0a2772af1ca

export default function Routes() {
  return (
    <Switch>
      <Route path="/bebidas/:recipeId" component={ RecipeDetails } />
      <Route path="/comidas/:recipeId" component={ RecipeDetails } />
      <Route exact path="/bebidas" component={ Home } />
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
