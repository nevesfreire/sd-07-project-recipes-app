import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Comidas from '../pages/Comidas';
import Bebidas from '../pages/Bebidas';
import ComidasID from '../pages/ComidasID';
import Login from '../pages/Login';
import Explorar from '../pages/Explorar';
import ExplorarBebidas from '../pages/Explorar/ExplorarBebidas';
import ExplorarComidas from '../pages/Explorar/ExplorarComidas';
import ExplorarComidasIngredientes from '../pages/Explorar/ExplorarComidas/Ingredientes';
import ExplorarAreaComidas from '../pages/Explorar/ExplorarComidas/Area';
import ExplorarBebidasIngredientes from '../pages/Explorar/ExplorarBebidas/Ingredientes';
import Notfound from '../components/Notfound';
import Perfil from '../pages/Perfil';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasIngredientes }
        />
        <Route exact path="/explorar/comidas/area" component={ ExplorarAreaComidas } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIngredientes }
        />
        <Route exact path="/:route/:id" component={ ComidasID } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route component={ Notfound } />
        {/*
        <Route exact path="/bebidas/:id-da-receita" component={ BebidasID } />
        <Route
          exact
          path="/comidas/:id-da-receita/in-progress"
          component={ ComidasIDProgress }
        />
        <Route
          exact
          path="/bebidas/:id-da-receita/in-progress"
          component={ BebidasIDProgress }
        />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
