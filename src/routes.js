import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Food, Drink, Explore, Perfil, Login, DrinkDetails, FoodDetails } from './pages';


const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Food } />
      <Route path="/comidas/:id" component={ FoodDetails } />
      <Route exact path="/bebidas" component={ Drink } />
      <Route path="/bebidas/:id" component={ DrinkDetails } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/perfil" component={ Perfil } />
    </Switch>
  </Router>
);

export default Routes;
