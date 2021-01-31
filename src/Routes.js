import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  Login,
  Foods,
  Profile,
  Drinks,
  Explore,
  FoodExplore,
  DrinkExplore,
  AreaExploreFood,
  IngredientsExploreDrink,
  IngredientsExploreFood,
} from './pages';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ FoodExplore } />
        <Route exact path="/explorar/bebidas" component={ DrinkExplore } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ IngredientsExploreFood }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ IngredientsExploreDrink }
        />
        <Route exact path="/explorar/comidas/area" component={ AreaExploreFood } />
        <Route exact path="/perfil" component={ Profile } />
      </Switch>
    </BrowserRouter>
  );
}
