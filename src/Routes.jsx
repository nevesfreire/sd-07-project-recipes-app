import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import FoodPage from './pages/FoodPage';
import DrinkPage from './pages/DrinkPage';
import DetailFoodPage from './pages/DetailFoodPage';
import DetailDrinkPage from './pages/DetailDrinkPage';
import ProcessFoodPage from './pages/ProcessFoodPage';
import ProcessDrinkPage from './pages/ProcessDrinkPage';
import ExplorePage from './pages/ExplorePage';
import ExploreFoodPage from './pages/ExploreFoodPage';
import ExploreDrinkPage from './pages/ExploreDrinkPage';
import ExploreFoodByIngredients from './pages/ExploreFoodByIngredients';
import ExploreDrinkByIngredients from './pages/ExploreDrinkByIngredients';
import ExploreFoodByArea from './pages/ExploreFoodByArea';
import ProfilePage from './pages/ProfilePage';
import RecipesMadePage from './pages/RecipesMadePage';
import RecipesFavoritesPage from './pages/RecipesFavoritesPage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Route path="/comidas/:id/in-progress">
        <ProcessFoodPage />
      </Route>
      <Route path="/comidas/:id">
        <DetailFoodPage />
      </Route>
      <Route path="/comidas">
        <FoodPage />
      </Route>
      <Route path="/bebidas/:id/in-progress">
        <ProcessDrinkPage />
      </Route>
      <Route path="/bebidas/:id">
        <DetailDrinkPage />
      </Route>
      <Route path="/bebidas">
        <DrinkPage />
      </Route>
      <Route path="/explorar/comidas/ingredientes">
        <ExploreFoodByIngredients />
      </Route>
      <Route path="/explorar/comidas/area">
        <ExploreFoodByArea />
      </Route>
      <Route path="/explorar/comidas">
        <ExploreFoodPage />
      </Route>
      <Route path="/explorar/bebidas/ingredientes">
        <ExploreDrinkByIngredients />
      </Route>
      <Route path="/explorar/bebidas">
        <ExploreDrinkPage />
      </Route>
      <Route path="/explorar">
        <ExplorePage />
      </Route>
      <Route path="/perfil">
        <ProfilePage />
      </Route>
      <Route path="/receitas-feitas">
        <RecipesMadePage />
      </Route>
      <Route path="/receitas-favoritas">
        <RecipesFavoritesPage />
      </Route>
    </Switch>
  );
}

export default Routes;
