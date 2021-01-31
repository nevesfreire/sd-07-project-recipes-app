import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Home, Login, RecipeDetails } from '../pages/index';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/bebidas/:recipeId" component={ RecipeDetails } />
        <Route path="/comidas/:recipeId" component={ RecipeDetails } />
        <Route exact path="/bebidas" component={ Home } />
        <Route exact path="/comidas" component={ Home } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </Router>
  );
}
