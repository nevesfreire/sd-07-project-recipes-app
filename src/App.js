import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Provider from './context/Provider';
import DrinkRecipes from './pages/DrinkRecipes';
import Login from './pages/Login';
import FoodRecipes from './pages/FoodRecipes';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import FoodIngredient from './pages/FoodIngredient';
import DrinkIngredient from './pages/DrinkIngredient';
import FoodArea from './pages/FoodArea';
import DrinkInProgress from './pages/DrinkInProgress';
import FoodInProgress from './pages/FoodInProgress';

function App() {
  const stringPath = '/explorar/bebidas/ingredientes';
  return (
    <Provider>
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ FoodRecipes } />
        <Route exact path="/bebidas" component={ DrinkRecipes } />
        <Route exact path="/comidas/:id" component={ FoodDetails } />
        <Route exact path="/bebidas/:id" component={ DrinkDetails } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFood } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
        <Route exact path="/explorar/comidas/ingredientes" component={ FoodIngredient } />
        <Route exact path={ stringPath } component={ DrinkIngredient } />
        <Route exact path="/explorar/comidas/area" component={ FoodArea } />
        <Route path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
        <Route path="/comidas/:id/in-progress" component={ FoodInProgress } />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
