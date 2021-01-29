import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalProvider from './context/GlobalProvider';
import { Login, Drinks, FoodDetails, DrinkDetails, Explore, FoodsExplore,
  DrinksExplore, IngredientsFood, IngredientsDrink, AreaFoodExplore, Profile,
  MadeRecipes, FavoriteRecipes, Foods, FoodProcess, DrinkProcess } from './pages';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Foods } />
          <Route exact path="/bebidas" component={ Drinks } />
          <Route exact path="/comidas/:id" component={ FoodDetails } />
          <Route exact path="/bebidas/:id" component={ DrinkDetails } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/explorar/comidas" component={ FoodsExplore } />
          <Route exact path="/explorar/bebidas" component={ DrinksExplore } />
          <Route path="/explorar/comidas/ingredientes" component={ IngredientsFood } />
          <Route path="/explorar/bebidas/ingredientes" component={ IngredientsDrink } />
          <Route path="/explorar/comidas/area" component={ AreaFoodExplore } />
          <Route path="/perfil" component={ Profile } />
          <Route path="/receitas-feitas" component={ MadeRecipes } />
          <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
          <Route path="/comidas/:id/in-progress" component={ FoodProcess } />
          <Route path="/bebidas/:id/in-progress" component={ DrinkProcess } />
        </Switch>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
