import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  TelaPrincipalReceitasBebidas,
  TelaPrincipalReceitasComidas,
  Explorar,
  ExplorarComidas,
  ExplorarBebidas,
  ExpComidasIng,
  ExpBebidasIng,
  ExplorarComidasLoc,
  Perfil,
  ReceitasFeitas,
  ReceitasFavoritas,
} from '../pages';

const Routes = () => (
  <Switch>
    <Route exact path="/bebidas" component={ TelaPrincipalReceitasBebidas } />
    <Route exact path="/comidas" component={ TelaPrincipalReceitasComidas } />
    <Route exact path="/explorar" component={ Explorar } />
    <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
    <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
    <Route exact path="/explorar/comidas/ingredientes" component={ ExpComidasIng } />
    <Route exact path="/explorar/bebidas/ingredientes" component={ ExpBebidasIng } />
    <Route exact path="/explorar/comidas/area" component={ ExplorarComidasLoc } />
    <Route exact path="/perfil" component={ Perfil } />
    <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
    <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
  </Switch>
);

export default Routes;
