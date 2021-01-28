import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Comidas,
  Bebidas,
  ReceitaComida,
  ReceitaBebida,
  InProgress,
  Explorar,
  ExplorarComidas,
  ExplorarBebidas,
  Ingredientes,
  ExplorarComidasArea,
  Perfil,
  ReceitasFeitas,
  ReceitasFavoritas,
} from './pages';

function App() {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route path="/comidas" component={ Comidas } />
        <Route path="/comidas/:id/in-progress" component={ InProgress } />
        <Route path="/comidas/:id" component={ ReceitaComida } />
        <Route path="/bebidas" component={ Bebidas } />
        <Route path="/bebidas/:id/in-progress" component={ InProgress } />
        <Route path="/bebidas/:id" component={ ReceitaBebida } />
        <Route path="/explorar/comidas/ingredientes" component={ Ingredientes } />
        <Route path="/explorar/comidas/area" component={ ExplorarComidasArea } />
        <Route path="/explorar/comidas" component={ ExplorarComidas } />
        <Route path="/explorar/bebidas/ingredientes" component={ Ingredientes } />
        <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route path="/explorar" component={ Explorar } />
      </Switch>
    </div>
  );
}

export default App;
