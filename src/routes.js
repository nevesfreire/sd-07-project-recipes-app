import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Food, FoodDetails, Drink, DrinkDetails, Explore, Perfil, Login } from './pages';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas/52771" component={ FoodDetails } />
      <Route exact path="/comidas" component={ Food } />
      <Route path="/bebidas/178319" component={ DrinkDetails } />
      <Route exact path="/bebidas" component={ Drink } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/perfil" component={ Perfil } />
    </Switch>
  </Router>
);

export default Routes;
