import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  Login,
  Foods,
  Profile,
  Drinks,
  Explore,
  DetailsFood,
  DetailsDrink,
  FoodExplore,
  DrinkExplore,
  AreaExploreFood,
  RecipeFoodInProgress,
  RecipeDrinkInProgress,
  IngredientsExploreDrink,
  IngredientsExploreFood,
} from './pages';
import { NotFound } from './components';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/vip/:name" component={ Foods } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/comidas/:idFood" component={ DetailsFood } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/bebidas/:idDrink" component={ DetailsDrink } />
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
        <Route exact path="/explorar/bebidas/area" component={ NotFound } />
        <Route
          exact
          path="/comidas/:idFood/in-progress"
          component={ RecipeFoodInProgress }
        />
        <Route
          exact
          path="/bebidas/:idDrink/in-progress"
          component={ RecipeDrinkInProgress }
        />
      </Switch>
    </BrowserRouter>
  );
}
