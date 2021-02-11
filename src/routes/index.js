import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  TelaPrincipalReceitasBebidas,
  TelaPrincipalReceitasComidas,
  TelaReceitasEmProcesso,
  Explorar,
  ExplorarComidas,
  ExplorarBebidas,
  TelaDetalheBebida,
  TelaDetalheComida,
  ExpComidasIng,
  ExpBebidasIng,
  ExplorarComidasLoc,
  Perfil,
  ReceitasFeitas,
  ReceitasFavoritas,
  ExplorarBebidasArea,
} from '../pages';
import Login from '../pages/TelaDeLogin';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
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
    <Route path="/bebidas/:id/in-progress" component={ TelaReceitasEmProcesso } />
    <Route path="/comidas/:id/in-progress" component={ TelaReceitasEmProcesso } />
    <Route path="/bebidas/:id" component={ TelaDetalheBebida } />
    <Route path="/comidas/:id" component={ TelaDetalheComida } />
    <Route path="/explorar/bebidas/area" component={ ExplorarBebidasArea } />
  </Switch>
);

export default Routes;

// onClick={window.location.href=``}
// to={ `/product/${id}/${categoryID}/${searchInput}` }
