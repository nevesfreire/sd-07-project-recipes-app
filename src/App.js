import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import MainRecipes from './pages/MainRecipes';
import MainDrinks from './pages/MainDrinks';
import Explorer from './pages/Explorer';
import ExplorerFood from './pages/ExplorerFood';
import ExplorerDrinks from './pages/ExplorerDrinks';
import ExplorerFoodIngredients from './pages/ExplorerFoodIngredients';
import ExplorerDrinksIngredients from './pages/ExplorerDrinksIngredients';
import ExplorerFoodArea from './pages/ExplorerFoodArea';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipesDetails from './pages/RecipesDetails';
import DrinksDetails from './pages/DrinksDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app">
      <RecipesProvider>
        <BrowserRouter>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ MainRecipes } />
          <Route exact path="/bebidas" component={ MainDrinks } />
          <Route
            exact
            path="/comidas/:id"
            render={ (props) => <RecipesDetails { ...props } /> }
          />
          <Route
            exact
            path="/bebidas/:id"
            render={ (props) => <DrinksDetails { ...props } /> }
          />
          <Route exact path="/comidas/{id-da-receita}/in-progress" />
          <Route exact path="/bebidas/{id-da-receita}/in-progress" />
          <Route exact path="/explorar" component={ Explorer } />
          <Route exact path="/explorar/comidas" component={ ExplorerFood } />
          <Route exact path="/explorar/bebidas" component={ ExplorerDrinks } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExplorerFoodIngredients }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExplorerDrinksIngredients }
          />
          <Route exact path="/explorar/comidas/area" component={ ExplorerFoodArea } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/explorar/bebidas/area" component={ NotFound } />
          <Route exact path="/receitas-feitas" component={ DoneRecipes } />
          <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        </BrowserRouter>
      </RecipesProvider>
    </div>
  );
}

export default App;
