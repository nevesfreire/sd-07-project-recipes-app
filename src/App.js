import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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
  NotFound,
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
            path="/:category/:idReceita/in-progress"
            render={ (props) => (<RecipesInProgress { ...props } />) }
          />
          <Route
            exact
            path="/:category/:idReceita"
            render={ (props) => (<RecipeDetails { ...props } />) }
          />
          <Route
            exact
            path="/comidas"
            render={ (props) => (<MainPage { ...props } />) }
          />
          <Route
            exact
            path="/bebidas"
            render={ (props) => (<MainPage { ...props } />) }
          />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/" component={ Login } />
          <Route path="/*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
