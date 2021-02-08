import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Comidas from './pages/comidas/Comidas';
import ComidaDetalhes from './pages/comidas/ComidaDetalhes';
import Bebidas from './pages/bebidas/Bebidas';
import BebidasDetalhes from './pages/bebidas/BebidasDetalhes';
import ReceitasFavoritas from './pages/receitas/ReceitasFavoritas';
import ReceitasFeitas from './pages/receitas/ReceitasFeitas';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressoComida from './pages/comidas/ProgressoComida';
import ProgressoBebidas from './pages/bebidas/ProgressoBebidas';
import ExplorarComidasIngredientes from './pages/comidas/ExplorarComidasIngredientes';
import ExplorarBebidasIngredientes from './pages/bebidas/ExplorarBebidasIngredientes';
import ExplorarComidas from './pages/comidas/ExplorarComidas';
import BebidasExplorar from './pages/bebidas/BebidasExplorar';
import ExplorarComidasOrigem from './pages/comidas/ExplorarComidasOrigem';
import NotFound from './pages/bebidas/NotFound';
import './App.css';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route
            path="/comidas/:id/in-progress"
            component={ ProgressoComida }
          />
          <Route
            path="/bebidas/:id/in-progress"
            component={ ProgressoBebidas }
          />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExplorarComidasIngredientes }
          />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExplorarBebidasIngredientes }
          />
          <Route path="/explorar/comidas/area" component={ ExplorarComidasOrigem } />
          <Route path="/explorar/bebidas/area" component={ NotFound } />
          <Route path="/comidas/:id" component={ ComidaDetalhes } />
          <Route path="/bebidas/:id" component={ BebidasDetalhes } />
          <Route path="/explorar/comidas" component={ ExplorarComidas } />
          <Route path="/explorar/bebidas" component={ BebidasExplorar } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/explorar" component={ Explorar } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
