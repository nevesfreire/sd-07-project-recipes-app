import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import FoodPage from './Pages/FoodPage';
import DrinkPage from './Pages/DrinkPage';
import DetailFoodPage from './Pages/DetailFoodPage';
import DetailDrinkPage from './Pages/DetailDrinkPage';
import ProcessFoodPage from './Pages/ProcessFoodPage';
import ProcessDrinkPage from './Pages/ProcessDrinkPage';
import ExplorePage from './Pages/ExplorePage';
import ExploreFoodPage from './Pages/ExploreFoodPage';
import ExploreDrinkPage from './Pages/ExploreDrinkPage';
import ExploreFoodByIngredients from './Pages/ExploreFoodByIngredients';
import ExploreDrinkByIngredients from './Pages/ExploreDrinkByIngredients';
import ExploreFoodByRegion from './Pages/ExploreFoodByRegion';
import ProfilePage from './Pages/ProfilePage';
import RecipesFavPage from './Pages/RecipesFavPage';
import RecipesMadePage from './Pages/RecipesMadePage';

function Routes() {
  return (
    <Switch>
      <Route path="/perfil">
        <ProfilePage />
      </Route>
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
        <ExploreFoodByRegion />
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
      <Route path="/receitas-feitas">
        <RecipesMadePage />
      </Route>
      <Route path="/receitas-favoritas">
        <RecipesFavPage />
      </Route>
    </Switch>
  );
}

export default Routes;
