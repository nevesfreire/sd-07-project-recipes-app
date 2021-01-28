import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import Login from './pages/login';
import RecipesDone from './pages/RecipesDone';
import Favourites from './pages/Favourites';

const Router = () => (
  <Switch>
    <Route path="/comidas" component={ Foods } />
    <Route path="/bebidas" component={ Drinks } />
    {/* <Route path="/comidas/:id" component={ FoodDetail } /> */}
    {/* <Route path="/bebidas/:id" component={ DrinkDetail } /> */}
    {/* <Route path="/comidas/:id/in-progress" component={ FoodProgress } /> */}
    {/* <Route path="/bebidas/:id/in-progress" component={ DrinkProgress } /> */}
    {/* <Route path="/explorar" component={ Explore } /> */}
    {/* <Route path="/explorar/comidas" component={ FoodExplore } /> */}
    {/* <Route path="/explorar/bebidas" component={ DrinkExplore } /> */}
    {/* <Route path="/explorar/comidas/ingredientes" component={ FoodIngredients } /> */}
    {/* <Route path="/explorar/bebidas/ingredientes" component={ DrinkIngredients } /> */}
    {/* <Route path="/explorar/comidas/area" component={ FoodByArea } /> */}
    <Route path="/perfil" component={ Profile } />
    <Route path="/receitas-feitas" component={ RecipesDone } />
    <Route path="/receitas-favoritas" component={ Favourites } />
    <Route exact path="/" component={ Login } />
  </Switch>
);

export default Router;
