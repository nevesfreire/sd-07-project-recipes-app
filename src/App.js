import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Comidas from './pages/comidas/Comidas';
import ComidaDetalhes from './pages/comidas/ComidaDetalhes';
import ComidasArea from './pages/comidas/ComidasArea';
import Bebidas from './pages/bebidas/Bebidas';
import BebidasDetalhes from './pages/bebidas/BebidasDetalhes';
import ReceitasFavoritas from './pages/receitas/ReceitasFavoritas';
import ReceitasFeitas from './pages/receitas/ReceitasFeitas';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import store from './redux/store';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressoComida from './pages/comidas/ProgressoComida';
import ProgressoBebidas from './pages/bebidas/ProgressoBebidas';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route path="/comidas/:id" component={ ComidaDetalhes } />
          <Route path="/bebidas/:id" component={ BebidasDetalhes } />
          <Route path="/comidas/:id/in-progress" component={ ProgressoComida } />
          <Route path="/bebidas/:id/in-progress" component={ ProgressoBebidas } />
          <Route path="/comidas" component={ Comidas } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/bebidas" component={ Bebidas } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/explorar" component={ Explorar } />
          <Route path="/explorar/comidas/area" component={ ComidasArea } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
