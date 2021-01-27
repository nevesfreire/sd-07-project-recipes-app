import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, MainFood, MainDrink } from '../pages';

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      component={ Login }
    />
    <Route
      path="/comidas"
      component= { MainFood }
    />
    <Route
      path="/bebidas"
      component={ MainDrink }
    />
  </Switch>
);

export default Routes;
