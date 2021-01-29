import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Provider from './context/Provider';
import DrinkRecipes from './pages/DrinkRecipes';
import Login from './pages/Login';
import FoodRecipes from './pages/FoodRecipes';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import Profile from './pages/Profile';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ FoodRecipes } />
        <Route path="/bebidas" component={ DrinkRecipes } />
        <Route path="/comidas/:id" component={ FoodDetails } />
        <Route path="/bebidas/:id" component={ DrinkDetails } />
        <Route exact path="/perfil" component={ Profile } />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
