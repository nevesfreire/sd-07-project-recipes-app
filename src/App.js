import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import MainRecipes from './pages/MainRecipes';
import Bebidas from './pages/Bebidas';
import ReceitaComida from './pages/ReceitaComida';
import ReceitaBebida from './pages/ReceitaBebida';
import InProgress from './pages/InProgress';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import Ingredientes from './pages/Ingredientes';
import ExplorarComidasArea from './pages/ExplorarComidasArea';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';

function App() {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ MainRecipes } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/comidas/{id-da-receita}" component={ ReceitaComida } />
        <Route exact path="/bebidas/{id-da-receita}" component={ ReceitaBebida } />
        <Route
          exact
          path="/comidas/{id-da-receita}/in-progress"
          component={ InProgress }
        />
        <Route
          exact
          path="/bebidas/{id-da-receita}/in-progress"
          component={ InProgress }
        />
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
