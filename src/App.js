import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Bebidas from './pages/Bebidas';
import Comidas from './pages/Comidas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ProcessoComidas from './pages/ProcessoComidas';
import ProcessoBebidas from './pages/ProcessoBebidas';
import ExplorarComidasIngredientes from './pages/ExplorarComidasIngredientes';
import ExplorarBebidasIngredientes from './pages/ExplorarBebidasIngredientes';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import Explorar from './pages/Explorar';
import DetalhesComidas from './pages/DetalhesComidas';
import DetalhesBebidas from './pages/DetalhesBebidas';
import ExplorarComidasArea from './pages/ExplorarComidasArea';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Comidas } />
      <Route path="/bebidas" component={ Bebidas } />
      <Route path="/bebidas/:id" component={ DetalhesBebidas } />
      <Route path="/bebidas/:id/in-progress" component={ ProcessoBebidas } />
      <Route path="/comidas/:id" component={ DetalhesComidas } />
      <Route path="/comidas/:id/in-progress" component={ ProcessoComidas } />
      <Route path="/explorar" component={ Explorar } />
      <Route path="/explorar/comidas" component={ ExplorarComidas } />
      <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExplorarComidasIngredientes }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarBebidasIngredientes }
      />
      <Route path="/explorar/comidas/area" component={ ExplorarComidasArea } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
    </Switch>
  );
}

export default App;
