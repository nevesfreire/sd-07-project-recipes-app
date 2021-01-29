import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './scenes/Login';
import Test from './scenes/Test';
import Comidas from './scenes/Comidas';
import Bebidas from './scenes/Bebidas';
import Perfil from './scenes/Perfil';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/comidas" exact component={ Comidas } />
        <Route path="/bebidas" exact component={ Bebidas } />
        <Route path="/comidas/{id-da-receita}" exact component={ Perfil } />
        <Route path="/bebidas/{id-da-receita}" exact component={ Perfil } />
        <Route path="/comidas/{id-da-receita}/in-progress" exact component={ Perfil } />
        <Route path="/bebidas/{id-da-receita}/in-progress" exact component={ Perfil } />
        <Route path="/explorar" exact component={ Perfil } />
        <Route path="/explorar/comidas" exact component={ Perfil } />
        <Route path="/explorar/bebidas" exact component={ Perfil } />
        <Route path="/explorar/comidas/ingredientes" exact component={ Perfil } />
        <Route path="/explorar/bebidas/ingredientes" exact component={ Perfil } />
        <Route path="/explorar/comidas/area" exact component={ Perfil } />
        <Route path="/perfil" exact component={ Perfil } />
        <Route path="/receitas-feitas" exact component={ Perfil } />
        <Route path="/receitas-favoritas" exact component={ Perfil } />
        <Route path="/test" exact component={ Test } />
      </Switch>
    </BrowserRouter>
  );
}
