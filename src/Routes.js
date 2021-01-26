import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from './pages';

function Rotas() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Rotas;
