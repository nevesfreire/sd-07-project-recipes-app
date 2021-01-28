import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './scenes/Login';
import Profile from './scenes/Profile';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/perfil" exact component={ Profile } />
      </Switch>
    </BrowserRouter>
  );
}
