import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Recipes from './pages/recipes';
import Profile from './pages/profile';
import Explore from './pages/explore';
import ExploreMore from './pages/exploreMore';
import EIngredients from './pages/exploreIngredients';
import ExploreArea from './pages/exploreArea';
import RecipeDetail from './pages/recipeDetail';
import RecipeInProgress from './pages/recipeInProgress';
import NotFound from './pages/notFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Recipes } />
      <Route exact path="/bebidas" component={ Recipes } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas/ingredientes" component={ EIngredients } />
      <Route exact path="/explorar/bebidas/ingredientes" component={ EIngredients } />
      <Route exact path="/comidas/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/explorar/comidas/area" component={ ExploreArea } />
      <Route exact path="/receitas-favoritas" />
      <Route exact path="/explorar/comidas" component={ ExploreMore } />
      <Route exact path="/explorar/bebidas" component={ ExploreMore } />
      <Route exact path="/receitas-feitas" />
      <Route exact path="/comidas/:id" component={ RecipeDetail } />
      <Route exact path="/bebidas/:id" component={ RecipeDetail } />
      <Route exact path="/receitas-feitas" />
      <Route path="/404" component={ NotFound } />
      <Redirect to="/404" />
    </Switch>
  );
}

export default App;

/*
// malu esteve aqui
*/
