import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/login';
import Food from '../pages/food';
import Profile from '../pages/profile';
import Drink from '../pages/drink';
import Explorer from '../pages/explorer';
import ExploreFood from '../pages/exploreFood';
import ExploreDrinks from '../pages/exploreDrinks';
import FavoriteRecipes from '../pages/favoriteRecipes';
import DoneRecipes from '../pages/doneRecipes';
import FoodIngredients from '../pages/foodIngredients';
import DrinkIngredients from '../pages/drinkIngredients';
import AreaFood from '../pages/areaFood';
import DetailsFood from '../pages/detailsFood';
import DetailsDrink from '../pages/detailsDrink';
import FoodProgress from '../pages/foodProgress';
import DrinkPress from '../pages/drinkProgress';
import DrinkProgress from '../pages/drinkProgress';

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Food } />
        <Route exact path="/comidas/:id" component={ DetailsFood } />
        <Route exact path="/bebidas/:id" component={ DetailsDrink } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/bebidas" component={ Drink } />
        <Route exact path="/explorar" component={ Explorer } />
        <Route exact path="/explorar/comidas" component={ ExploreFood } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/explorar/comidas/area" component={ AreaFood } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ FoodIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ DrinkIngredients }
        />
        <Route exact path="/comidas/:id/in-progress" component={ FoodProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ DrinkProgress } />
      </Switch>
    </div>
  );
}

export default Routes;
