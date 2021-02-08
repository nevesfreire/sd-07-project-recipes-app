import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from './context/Provider';

import Login from './pages/Login';
import Explore from './pages/Explore';
import Recipes from './pages/Recipes';
import Details from './pages/Details';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoritesRecipes';

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route
          path="/explorar/comidas/area"
          render={ (props) => <Explore { ...props } search /> }
        />
        <Route
          path="/explorar/bebidas/area"
          render={ (props) => <Explore { ...props } search /> }
        />
        <Route path="/explorar/comidas/ingredientes" component={ Explore } />
        <Route path="/explorar/bebidas/ingredientes" component={ Explore } />
        <Route path="/explorar/comidas" component={ Explore } />
        <Route path="/explorar/bebidas" component={ Explore } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/comidas/:id/in-progress" component={ Progress } />
        <Route path="/comidas/:id" component={ Details } />
        <Route path="/comidas" render={ (props) => <Recipes { ...props } search /> } />
        <Route path="/bebidas/:id/in-progress" component={ Progress } />
        <Route path="/bebidas/:id" component={ Details } />
        <Route path="/bebidas" render={ (props) => <Recipes { ...props } search /> } />
        <Route path="/perfil" component={ Profile } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </Provider>
  );
}

/*
Tela de login: /;
Tela principal de receitas de comidas: /comidas;
Tela principal de receitas de bebidas: /bebidas;
Tela de detalhes de uma receita de comida: /comidas/{id-da-receita};
Tela de detalhes de uma receita de bebida: /bebidas/{id-da-receita};
Tela de receita em processo de comida: /comidas/{id-da-receita}/in-progress;
Tela de receita em processo de bebida: /bebidas/{id-da-receita}/in-progress;
Tela de explorar: /explorar;
Tela de explorar comidas: /explorar/comidas;
Tela de explorar bebidas: /explorar/bebidas;
Tela de explorar comidas por ingrediente: /explorar/comidas/ingredientes;
Tela de explorar bebidas por ingrediente: /explorar/bebidas/ingredientes;
Tela de explorar comidas por local de origem: /explorar/comidas/area;
Tela de perfil: /perfil;
Tela de receitas feitas: /receitas-feitas;
Tela de receitas favoritas: /receitas-favoritas.
*/

export default App;
