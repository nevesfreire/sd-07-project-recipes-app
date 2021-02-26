import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Recipes from './pages/recipes';
import Profile from './pages/profile';
import Explore from './pages/explore';
import ExploreMore from './pages/exploreMore';
import MainRecipeDetail from './pages/MainRecipeDetail';
import RecipeInProgress from './pages/recipeInProgress';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Recipes } />
      <Route exact path="/bebidas" component={ Recipes } />
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/explorar" component={ Explore } />
      <Route path="/explorar/comidas/ingredientes" />
      <Route path="/explorar/bebidas/ingredientes" />
      <Route path="/comidas/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/explorar/comidas/area" />
      <Route path="/receitas-favoritas" />
      <Route path="/explorar/comidas" component={ ExploreMore } />
      <Route path="/explorar/bebidas" component={ ExploreMore } />
      <Route path="/receitas-feitas" />
      <Route exact path="/comidas/:id" component={ MainRecipeDetail } />
      <Route exact path="/bebidas/:id" component={ MainRecipeDetail } />

      {/* <Route exact path="/comidas/:id" component={ MainDetails } />
      <Route exact path="/bebidas/:id" component={ MainDetails } /> */}

      <Route path="/receitas-feitas" />
    </Switch>
  );
}

export default App;

/*
// malu esteve aqui
*/
