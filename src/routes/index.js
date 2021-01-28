import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Comidas from '../pages/Comidas';
import Bebidas from '../pages/Bebidas';
import Login from '../pages/Login';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        {/*
        <Route exact path="/comidas/:id-da-receita" component={ ComidasID } />
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
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasIngredientes }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIngredientes }
        />
        <Route exact path="/explorar/comidas/area" component={ ExplorarArea } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
