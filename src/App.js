import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Comidas from './pages/comidas/Comidas';
import ComidaDetalhes from './pages/comidas/ComidaDetalhes';
import Bebidas from './pages/bebidas/Bebidas';
import ReceitasFavoritas from './pages/receitas/ReceitasFavoritas';
import ReceitasFeitas from './pages/receitas/ReceitasFeitas';
import Perfil from './pages/Perfil';
import store from './redux/store';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route path="/comidas/:id" component={ ComidaDetalhes } />
          <Route path="/comidas" component={ Comidas } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/bebidas" component={ Bebidas } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
