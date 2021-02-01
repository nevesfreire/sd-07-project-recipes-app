import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Foods,
  Drinks,
  RecipeDetails,
  DrinksIngredients,
  FoodsIngredients,
  ExploreDrinks,
  ExploreFoods,
  Explore,
  FoodsOrigin,
  Profile,
  FavoriteRecipes,
} from './pages';
import DrinksDetails from './pages/DrinksDetails';
import FoodsDetails from './pages/FoodsDetails';

function Rotas() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route path="/comidas/:id" component={ RecipeDetails } />
      <Route path="/bebidas/:id" component={ RecipeDetails } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route exact path="/explorar/comidas/ingredientes" component={ FoodsIngredients } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ DrinksIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ FoodsOrigin } />
      <Route exact path="/perfil" component={ Profile } />
<<<<<<< HEAD
      <Route path="/comidas/:id" component={ FoodsDetails } />
      <Route path="/bebidas/:id" component={ DrinksDetails } />

=======
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
>>>>>>> c00c8ebf7a7a94d601a4ee465fd33af4e3f69143
      {/* <Route path="/comidas/id:/in-progress" component={  } />
      <Route path="/bebidas/:id/in-progress" component={  } />
      <Route path="/receitas-feitas" component={  } />
      */}
    </Switch>
  );
}

export default Rotas;
