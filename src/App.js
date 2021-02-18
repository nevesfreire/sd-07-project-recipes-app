import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Recipes from './pages/recipes';
import Profile from './pages/profile';
import Explore from './pages/explore';
// import RecipeDetail from './components/RecipeDetail';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeDetail from './pages/recipeDetail';
import RecipeInProgress from './pages/recipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Recipes } />
      <Route exact path="/bebidas" component={ Recipes } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/explorar/comidas/ingredientes" />
      <Route path="/explorar/bebidas/ingredientes" />
      <Route path="/comidas/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/explorar/comidas/area" />
      <Route path="/receitas-favoritas" />
      <Route path="/explorar/comidas" />
      <Route path="/explorar/bebidas" />
      <Route path="/receitas-feitas" />
      <Route exact path="/comidas/:id" component={ RecipeDetail } />
      <Route exact path="/bebidas/:id" component={ RecipeDetail } />
      <Route path="/receitas-feitas" />
    </Switch>
  );
}

export default App;

/*
// malu esteve aqui
*/
