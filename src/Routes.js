import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import Login from './pages/login';
import RecipesDone from './pages/RecipesDone';
import FoodDetail from './pages/FoodDetail';
import DrinkDetail from './pages/DrinkDetail';
import Favorites from './pages/Favorites';
import Explore from './pages/Explore';
import DrinkExplore from './pages/Explore/DrinkExplore';
import FoodExplore from './pages/Explore/FoodExplore';
import FoodIngredients from './pages/Explore/FoodIngredients';
import DrinkIngredients from './pages/Explore/DrinkIngredients';
import FoodByArea from './pages/Explore/FoodByArea';

const Router = () => (
  <Switch>
    <Route path="/comidas/:id" component={ FoodDetail } />
    <Route path="/bebidas/:id" component={ DrinkDetail } />
    <Route path="/comidas" component={ Foods } />
    <Route path="/bebidas" component={ Drinks } />
    {/* <Route path="/comidas/:id/in-progress" component={ FoodProgress } /> */}
    {/* <Route path="/bebidas/:id/in-progress" component={ DrinkProgress } /> */}
    <Route path="/explorar/comidas/area" component={ FoodByArea } />
    <Route path="/explorar/comidas/ingredientes" component={ FoodIngredients } />
    <Route path="/explorar/bebidas/ingredientes" component={ DrinkIngredients } />
    <Route path="/explorar/comidas" component={ FoodExplore } />
    <Route path="/explorar/bebidas" component={ DrinkExplore } />
    <Route path="/explorar" component={ Explore } />
    <Route path="/perfil" component={ Profile } />
    <Route path="/receitas-feitas" component={ RecipesDone } />
    <Route path="/receitas-favoritas" component={ Favorites } />
    <Route exact path="/" component={ Login } />
  </Switch>
);

export default Router;
