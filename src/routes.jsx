import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DrinkPage from './Pages/DrinkPage';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import ExplorarPage from './Pages/ExplorarPage';
import PerfilPage from './Pages/PerfilPage';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ LoginPage } />
      <Route exact path="/comidas" component={ HomePage } />
      <Route exact path="/bebidas" component={ DrinkPage } />
      <Route exact path="/explorar" component={ ExplorarPage } />
      <Route exact path="/perfil" component={ PerfilPage } />
      {/* TODO PAGES */}
      {
      /*
      <Route exact path="/comidas/:id-receita" component={  } />
      <Route exact path="/bebidas/:id-receita" component={  } />
      <Route exact path="/comidas/:id-receita/in-progress" component={  } />
      <Route exact path="/bebidas/:id-receita/in-progress" component={  } />
      <Route exact path="/explorar/comidas" component={  } />
      <Route exact path="/explorar/bebidas" component={  } />
      <Route exact path="/explorar/comidas/ingredientes" component={  } />
      <Route exact path="/explorar/bebidas/ingredientes" component={  } />
      <Route exact path=" /explorar/comidas/area" component={  } />
      <Route exact path="/receitas-feitas" component={  } />
      <Route exact path="/receitas-favoritas" component={  } /> */}
    </Switch>
  </BrowserRouter>
);

export default Routes;
