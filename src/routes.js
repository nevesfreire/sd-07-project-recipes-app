import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './scenes/Login';
import Test from './scenes/Test';
import Comidas from './scenes/Comidas';
import ComidaDetails from './scenes/ComidaDetails';
import BebidaDetails from './scenes/BebidaDetails';
import Bebidas from './scenes/Bebidas';
import Perfil from './scenes/Perfil';
import Explorar from './scenes/Explorar';
import ReceitasFeitas from './scenes/ReceitasFeitas';
import FavoriteRecipe from './scenes/FavoriteRecipe';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/comidas/:id" exact component={ ComidaDetails } />
        <Route path="/bebidas/:id" exact component={ BebidaDetails } />
        <Route path="/comidas" exact component={ Comidas } />
        <Route path="/bebidas" exact component={ Bebidas } />
        <Route path="/comidas/{id-da-receita}" exact component={ Perfil } />
        <Route path="/bebidas/{id-da-receita}" exact component={ Perfil } />
        <Route path="/comidas/{id-da-receita}/in-progress" exact component={ Perfil } />
        <Route path="/bebidas/{id-da-receita}/in-progress" exact component={ Perfil } />
        <Route path="/explorar" exact component={ Explorar } />
        <Route path="/explorar/comidas" exact component={ Perfil } />
        <Route path="/explorar/bebidas" exact component={ Perfil } />
        <Route path="/explorar/comidas/ingredientes" exact component={ Perfil } />
        <Route path="/explorar/bebidas/ingredientes" exact component={ Perfil } />
        <Route path="/explorar/comidas/area" exact component={ Perfil } />
        <Route path="/perfil" exact component={ Perfil } />
        <Route path="/receitas-feitas" exact component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" exact component={ FavoriteRecipe } />
        <Route path="/test" exact component={ Test } />
      </Switch>
    </BrowserRouter>
  );
}
