import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './scenes/Login';
import Test from './scenes/Test';
import Comidas from './scenes/Comidas';
import ComidaDetails from './scenes/ComidaDetails';
import BebidaDetails from './scenes/BebidaDetails';
import Bebidas from './scenes/Bebidas';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/comidas/:id" exact component={ ComidaDetails } />
        <Route path="/bebidas/:id" exact component={ BebidaDetails } />
        <Route path="/comidas" exact component={ Comidas } />
        <Route path="/bebidas" exact component={ Bebidas } />
        <Route path="/test" exact component={ Test } />
      </Switch>
    </BrowserRouter>
  );
}
