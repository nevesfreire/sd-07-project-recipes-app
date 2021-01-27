import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Foods, Drinks, RecipeDetails } from './pages';

function Rotas() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas/:id" component={ RecipeDetails } />
      <Route path="/bebidas/:id" component={ RecipeDetails } />
      <Route path="/comidas" component={ Foods } />
      <Route path="/bebidas" component={ Drinks } />
    </Switch>
  );
}

export default Rotas;
