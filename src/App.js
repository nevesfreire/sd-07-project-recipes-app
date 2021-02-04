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
  Explorar,
  Ingredientes,
  ExplorarComidasArea,
  Perfil,
  ReceitasFeitas,
  ReceitasFavoritas,
  ExplorarBebidasOuComidas,
  InProgressDrinks,
  InProgressMeals,
} from './pages';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/comidas/:id/in-progress" component={ InProgressMeals } />
        <Route exact path="/comidas/:id" component={ ReceitaComida } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/bebidas/:id/in-progress" component={ InProgressDrinks } />
        <Route exact path="/bebidas/:id" component={ ReceitaBebida } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarBebidasOuComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidasOuComidas } />
        <Route exact path="/explorar/comidas/ingredientes" component={ Ingredientes } />
        <Route exact path="/explorar/bebidas/ingredientes" component={ Ingredientes } />
        <Route exact path="/explorar/comidas/area" component={ ExplorarComidasArea } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route exact path="/explorar/bebidas/area" component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
