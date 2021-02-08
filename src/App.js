import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from './context/RecipeContext';
import { Comidas,
  FavoriteRecipes,
  DoneRecipes,
  Header,
  Bebidas,
  InitialExplore,
  Explore,
  ExploreIngredients,
  ExploreArea,
  RecipeDetails,
  Profile } from './pages';
import Login from './pages/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider>
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/comidas/:id/in-progress"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route exact path="/explorar" component={ InitialExplore } />
        <Route exact path="/explorar/comidas" component={ Explore } />
        <Route exact path="/explorar/bebidas" component={ Explore } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route exact path="/perfil" component={ Profile } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreIngredients }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ ExploreArea }
        />
        <Route
          exact
          path="/explorar/bebidas/area"
          component={ ExploreArea }
        />
      </Switch>
    </Provider>
  );
}

export default App;
