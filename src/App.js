import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import Explorer from './pages/Explorer';
import IngredientsFoods from './pages/IngredientsFoods';
import IngredientsDrinks from './pages/IngredientsDrinks';
import OriginFoods from './pages/OriginFoods';
import Profile from './pages/Profile';
import RecipesDone from './pages/RecipesDone';
import RecipesFavorites from './pages/RecipesFavorites';
import ExplorerFoods from './pages/ExplorerFoods';
import ExplorerDrinks from './pages/ExplorerDrinks';
import FoodDetails from './pages/FoodDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Provider>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Foods } />
          {/* <Route exact path="/comidas/:{id}" component={} /> */}
          <Route exact path="/bebidas" component={ Drinks } />
          {/* <Route exact path="/bebidas/:{id}" component={  } /> */}
          <Route exact path="/explorar" component={ Explorer } />
          <Route exact path="/explorar/comidas" component={ ExplorerFoods } />
          <Route exact path="/explorar/bebidas" component={ ExplorerDrinks } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ IngredientsFoods }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ IngredientsDrinks }
          />
          <Route exact path="/explorar/comidas/area" component={ OriginFoods } />
          <Route exact path="/explorar/bebidas/area" component={ NotFound } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/receitas-feitas" component={ RecipesDone } />
          <Route exact path="/receitas-favoritas" component={ RecipesFavorites } />
          <Route exact path="/detalhes-receita/:id" component={ FoodDetails } />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
