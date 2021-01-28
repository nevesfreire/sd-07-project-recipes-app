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
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route path="/comidas/{id-da-receita}" component={ ReceitaComida } />
        <Route path="/bebidas/{id-da-receita}" component={ ReceitaBebida } />
        <Route path="/comidas/{id-da-receita}/in-progress" component={ InProgress } />
        <Route path="/bebidas/{id-da-receita}/in-progress" component={ InProgress } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route exact path="/explorar/comidas/ingredientes" component={ Ingredientes } />
        <Route exact path="/explorar/bebidas/ingredientes" component={ Ingredientes } />
        <Route exact path="/explorar/comidas/area" component={ ExplorarComidasArea } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
      </Switch>
    </div>
  );
}

export default App;
