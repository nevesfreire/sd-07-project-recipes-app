import React from 'react';
import { Switch, Route } from 'react-router-dom';
// eslint-disable-next-line max-len
import { TelaDeLogin, TelaPrincipalReceitasBebidas, TelaPrincipalReceitasComidas } from '../pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ TelaDeLogin } />
    <Route path="/bebida" component={ TelaPrincipalReceitasBebidas } />
    <Route path="/comida" component={ TelaPrincipalReceitasComidas } />
  </Switch>
);

export default Routes;
