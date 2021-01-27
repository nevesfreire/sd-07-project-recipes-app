import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import MainRecipes from './pages/MainRecipes';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ MainRecipes } />
        <Route path="/perfil" component={ Profile } />
      </Switch>
    </div>
  );
}

export default App;
