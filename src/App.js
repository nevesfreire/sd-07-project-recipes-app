import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainDrinks from './pages/MainDrinks';
import MainRecipes from './pages/MainRecipes';
import Profile from './pages/MainProfile';
import MainExplore from './pages/MainExplore';
import MainDetail from './pages/MainDetail';
import MainExploreItem from './pages/MainExploreItem';
import MainExploreIngredientItem from './pages/MainExploreIngredientItem';
import MainExploreArea from './pages/MainExploreArea';
// import MainDoneRecipes from './pages/MainDoneRecipes';
// import MainFavoriteRecipes from './pages/MainFavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ MainRecipes } />
      <Route exact path="/bebidas" component={ MainDrinks } />
      <Route exact path="/explorar" component={ MainExplore } />
      <Route exact path="/comidas/:id" component={ MainDetail } />
      <Route exact path="/bebidas/:id" component={ MainDetail } />
      <Route exact path="/explorar/comidas" component={ MainExploreItem } />
      <Route exact path="/explorar/bebidas" component={ MainExploreItem } />
      <Route exact path="/explorar/comidas/area" component={ MainExploreArea } />
      {/* <Route exact path="/receitas-feitas" component={ MainDoneRecipes } />
      <Route exact path="/receitas-favoritas" component={ MainFavoriteRecipes } /> */}
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ MainExploreIngredientItem }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ MainExploreIngredientItem }
      />
      <Route path="/perfil" component={ Profile } />
    </Switch>
  );
}

export default App;
