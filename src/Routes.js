import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login, Foods, Drinks } from './pages';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
      </Switch>
    </BrowserRouter>
  );
}
