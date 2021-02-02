import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import {
  DetalhesBebidas,
  ExplorarBebidas,
  IngredientsBebidas,
  PrincipalBebidas,
  ProcessoBebidas,
} from './pages/bebidas';
import {
  DetalhesComidas,
  ExplorarComidas,
  IngredientsComidas,
  PrincipalComidas,
  ProcessoComidas,
} from './pages/comidas';
import {
  Explorar,
  Favoritas,
  Feitas,
  Login,
  Origem,
  Perfil,
  NotFound,
} from './pages/geral';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/bebidas/:id"
            component={ DetalhesBebidas }
          />
          <Route
            exact
            path="/explorar/bebidas"
            component={ ExplorarBebidas }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ IngredientsBebidas }
          />
          <Route
            exact
            path="/bebidas"
            component={ PrincipalBebidas }
          />
          <Route
            exact
            path="/bebidas/:id/in-progress"
            component={ ProcessoBebidas }
          />
          <Route
            exact
            path="/comidas/:id"
            component={ DetalhesComidas }
          />
          <Route
            exact
            path="/explorar/comidas"
            component={ ExplorarComidas }
          />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ IngredientsComidas }
          />
          <Route
            exact
            path="/comidas"
            component={ PrincipalComidas }
          />
          <Route
            exact
            path="/comidas/:id/in-progress"
            component={ ProcessoComidas }
          />
          <Route
            exact
            path="/explorar"
            component={ Explorar }
          />
          <Route
            exact
            path="/receitas-favoritas"
            component={ Favoritas }
          />
          <Route
            exact
            path="/receitas-feitas"
            component={ Feitas }
          />
          <Route
            exact
            path="/"
            component={ Login }
          />
          <Route
            exact
            path="/explorar/comidas/area"
            component={ Origem }
          />
          <Route
            exact
            path="/perfil"
            component={ Perfil }
          />
          <Route
            path="/"
            component={ NotFound }
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
