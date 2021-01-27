import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalProvider from './context/GlobalProvider';
import { Login, Drinks, FoodDetails, DrinkDetails, Explore,
  FoodsExplore, DrinksExplore, IngredientsFood, IngredientsDrink,
  AreaFoodExplore, Profile, MadeRecipes, FavoriteRecipes, Foods } from './pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <GlobalProvider>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ Foods } />
          <Route path="/bebidas" component={ Drinks } />
          <Route path="/comidas/:id" render={ (props) => <FoodDetails { ...props } /> } />
          <Route
            path="/bebidas/:id"
            render={ (props) => <DrinkDetails { ...props } /> }
          />
          <Route exact path="/explorar" component={ Explore } />
          <Route path="/explorar/comidas" component={ FoodsExplore } />
          <Route path="/explorar/bebidas" component={ DrinksExplore } />
          <Route path="/explorar/comidas/ingredientes" component={ IngredientsFood } />
          <Route path="/explorar/bebidas/ingredientes" component={ IngredientsDrink } />
          <Route path="/explorar/comidas/area" component={ AreaFoodExplore } />
          <Route path="/perfil" component={ Profile } />
          <Route path="/receitas-feitas" component={ MadeRecipes } />
          <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        </GlobalProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
