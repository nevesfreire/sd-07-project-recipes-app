import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Food from './pages/Food';
import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Food } />
      <Route path="/perfil" component={ Profile } />
    </Switch>
  );
}

export default App;
