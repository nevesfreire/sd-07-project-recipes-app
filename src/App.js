import React from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import MainRecipes from './pages/MainRecipes';

function App() {
  return (
    <div>
      <RecipesProvider>
        <BrowserRouter>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ MainRecipes } />
          <Route exact path="/bebidas" />
          <Route exact path="/comidas/{id-da-receita}" />
          <Route exact path="/bebidas/{id-da-receita}" />
          <Route exact path="/comidas/{id-da-receita}/in-progress" />
          <Route exact path="/bebidas/{id-da-receita}/in-progress" />
          <Route exact path="/explorar" />
          <Route exact path="/explorar/comidas" />
          <Route exact path="/explorar/bebidas" />
          <Route exact path="/explorar/comidas/ingredientes" />
          <Route exact path="/explorar/bebidas/ingredientes" />
          <Route exact path="/explorar/comidas/area" />
          <Route exact path="/perfil" />
          <Route exact path="/receitas-feitas" />
          <Route exact path="/receitas-favoritas" />
        </BrowserRouter>
      </RecipesProvider>
    </div>
  );
}

export default App;
