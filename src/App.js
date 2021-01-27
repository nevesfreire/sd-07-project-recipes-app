import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Comidas from './Pages/Comidas/Comidas';
import Bebidas from './Pages/Bebidas/Bebidas';
import Perfil from './Pages/Perfil';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Comidas } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/bebidas" component={ Bebidas } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
