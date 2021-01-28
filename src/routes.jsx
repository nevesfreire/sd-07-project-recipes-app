import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ComidaPage from './Pages/ComidaPage';
import LoginPage from './Pages/LoginPage';
import ExplorarPage from './Pages/ExplorarPage/index';
import ExplorarComida from './Pages/ExplorarPage/ExplorarComida';
import ExplorarBebidas from './Pages/ExplorarPage/ExplorarBebidas';
import ExpFoodIngre from './Pages/ExplorarPage/ExpFoodIngre';
import ExpDrinksIngre from './Pages/ExplorarPage/ExpDrinksIngre';
import ExpFoodLocal from './Pages/ExplorarPage/ExpFoodLocal';
import Perfil from './Pages/PerfilPage/Perfil';
import Bebidas from './Pages/Bebidas/Bebidas';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ LoginPage } />
      <Route exact path="/comidas" component={ ComidaPage } />
      <Route exact path="/explorar" component={ ExplorarPage } />
      <Route exact path="/explorar/comidas" component={ ExplorarComida } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/explorar/comidas/ingredientes" component={ ExpFoodIngre } />
      <Route exact path="/explorar/bebidas/ingredientes" component={ ExpDrinksIngre } />
      <Route exact path="/explorar/comidas/area" component={ ExpFoodLocal } />
      <Route exact path="/perfil" component={ Perfil } />
      {/* TODO PAGES */}
      {/* <Route exact path="/comidas" component={  } />
      <Route exact path="/comidas/:id-receita" component={  } />
      <Route exact path="/bebidas/:id-receita" component={  } />
      <Route exact path="/comidas/:id-receita/in-progress" component={  } />
      <Route exact path="/bebidas/:id-receita/in-progress" component={  } />
      <Route exact path="/receitas-feitas" component={  } />
      <Route exact path="/receitas-favoritas" component={  } /> */}
    </Switch>
  </BrowserRouter>
);

export default Routes;
