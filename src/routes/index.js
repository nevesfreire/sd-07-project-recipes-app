import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Login,
  TelaPrincipalReceitasBebidas,
  TelaPrincipalReceitasComidas,
  TelaDetalheBebida,
  TelaDetalheComida,
} from '../pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route path="/bebidas" component={ TelaPrincipalReceitasBebidas } />
    <Route path="/comidas" component={ TelaPrincipalReceitasComidas } />
    <Route path="/bebidas/:id" component={ TelaDetalheBebida } />
    <Route path="/comidas/:id" component={ TelaDetalheComida } />
  </Switch>
);

export default Routes;
