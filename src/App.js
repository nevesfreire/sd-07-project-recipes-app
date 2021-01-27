import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import RecipeProvider from './Context/Provider';
import DrinksRecipes from './Pages/DrinksRecipes';
import FoodRecipes from './Pages/FoodRecipes';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <RecipeProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ FoodRecipes } />
          <Route path="/perfil" component={ Profile } />
          <Route path="/bebidas" component={ DrinksRecipes } />
        </Switch>
      </RecipeProvider>
    </BrowserRouter>
  );
}

export default App;
