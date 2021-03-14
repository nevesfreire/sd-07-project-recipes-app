import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Recipes from './pages/recipes';
import Profile from './pages/profile';
import Explore from './pages/explore';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Recipes } />
      <Route path="/bebidas" component={ Recipes } />
      <Route path="/comidas/:id" />
      <Route path="/bebidas/:id" />
      <Route path="/comidas/:id/in-progress" />
      <Route path="/bebidas/:id/in-progress" />
      <Route path="/explorar" component={ Explore }/>
      <Route path="/explorar/comidas" />
      <Route path="/explorar/bebidas" />
      <Route path="/explorar/comidas/ingredientes" />
      <Route path="/explorar/bebidas/ingredientes" />
      <Route path="/explorar/comidas/area" />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" />
      <Route path="/receitas-favoritas" />
    </Switch>
  );
}

export default App;

/*
// malu esteve aqui
*/
