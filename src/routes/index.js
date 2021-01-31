import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Home, Login } from '../pages/index';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/bebidas" component={ Home } />
        <Route path="/comidas" component={ Home } />
      </Switch>
    </Router>
  );
}
