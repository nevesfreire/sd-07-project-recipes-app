import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login, Home } from './pages';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Home } />
      </Switch>
    </BrowserRouter>
  );
}
