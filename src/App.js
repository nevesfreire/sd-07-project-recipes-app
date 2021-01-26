import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import FoodRecipes from './pages/FoodRecipes';


function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ FoodRecipes } />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
