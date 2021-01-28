import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/TelaDeLogin/index';
import FoodRecipe from './pages/TelaPrincipalReceitasComidas/index';
import DrinkRecipe from './pages/TelaPrincipalReceitasBebidas/index';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ FoodRecipe } />
        <Route path="/bebidas" component={ DrinkRecipe } />
      </Switch>
    </div>
  );
}

export default App;
