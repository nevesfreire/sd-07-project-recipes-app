import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './provider';
import {
  DoneRecipes,
  Explore,
  ExploreBy,
  ExploreByArea,
  ExploreByIngredient,
  FavoriteRecipes,
  Login,
  MainPage,
  Profile,
  RecipeDetails,
  RecipesInProgress,
} from './pages';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/receitas-favoritas"
            render={ (props) => (<FavoriteRecipes { ...props } />) }
          />
          <Route
            exact
            path="/receitas-feitas"
            render={ (props) => (<DoneRecipes { ...props } />) }
          />
          <Route
            exact
            path="/perfil"
            render={ (props) => (<Profile { ...props } />) }
          />
          <Route
            exact
            path="/explorar/comidas/area"
            render={ (props) => (<ExploreByArea { ...props } />) }
          />
          <Route
            exact
            path="/explorar/:recipes/ingredientes"
            render={ (props) => (<ExploreByIngredient { ...props } />) }
          />
          <Route
            exact
            path="/explorar/:recipes"
            render={ (props) => (<ExploreBy { ...props } />) }
          />
          <Route
            exact
            path="/explorar"
            render={ (props) => (<Explore { ...props } />) }
          />
          <Route
            exact
            path="/:recipes/:id/in-progress"
            render={ (props) => (<RecipesInProgress { ...props } />) }
          />
          <Route
            exact
            path="/:recipes/:id"
            render={ (props) => (<RecipeDetails { ...props } />) }
          />
          <Route
            exact
            path="/:recipes"
            render={ (props) => (<MainPage { ...props } />) }
          />
          <Route path="/perfil" component={ Profile } />
          <Route exact path="/" component={ Login } />
          {/* <Redirect to="/404" /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
