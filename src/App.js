import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import * as page from './pages';

function App() {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={ page.Login } />
        <Route exact path="/comidas" component={ page.Comidas } />
        <Route exact path="/bebidas" component={ page.Bebidas } />
        <Route path="/comidas/:id" component={ page.ReceitaComida } />
        <Route path="/bebidas/:id" component={ page.ReceitaBebida } />
        <Route
          path="/comidas/{id-da-receita}/in-progress"
          component={ page.InProgress }
        />
        <Route
          path="/bebidas/{id-da-receita}/in-progress"
          component={ page.InProgress }
        />
        <Route exact path="/explorar" component={ page.Explorar } />
        <Route exact path="/explorar/comidas" component={ page.ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ page.ExplorarBebidas } />
        <Route path="/explorar/comidas/ingredientes" component={ page.Ingredientes } />
        <Route path="/explorar/bebidas/ingredientes" component={ page.Ingredientes } />
        <Route path="/explorar/comidas/area" component={ page.ExplorarComidasArea } />
        <Route exact path="/perfil" component={ page.Perfil } />
        <Route exact path="/receitas-feitas" component={ page.ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ page.ReceitasFavoritas } />
      </Switch>
    </div>
  );
}

export default App;
