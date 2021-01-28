import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './scenes/Login';
import Test from './scenes/Test';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/test" exact component={ Test } />
      </Switch>
    </BrowserRouter>
  );
}
