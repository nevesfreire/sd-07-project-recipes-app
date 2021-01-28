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
    <Route path="/bebidas/id-da-receita" component={ TelaDetalheBebida } />
    <Route path="/comidas/id-da-receita" component={ TelaDetalheComida } />
  </Switch>
);

export default Routes;
