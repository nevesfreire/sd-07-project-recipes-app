import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Food, Drink, Explore, Perfil, Login } from './pages';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Food } />
      <Route path="/bedidas" component={ Drink } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/perfil" component={ Perfil } />
    </Switch>
  </Router>
);

export default Routes;
