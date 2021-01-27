import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RecipeContext from './context/RecipeContext';
import { Comidas,
  Bebidas,
  InitialExplore,
  Explore,
  ExploreIngredients,
  RecipeDetails,
  Profile } from './pages';
import Login from './pages/Login';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const contextValue = { foodsFetched: [] };
  return (
    <div>
      <RecipeContext.Provider value={ contextValue }>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ Comidas } />
            <Route exact path="/bebidas" component={ Bebidas } />
            <Route
              exact
              path="/comidas/:id"
              render={ (props) => <RecipeDetails { ...props } /> }
            />
            <Route
              exact
              path="/bebidas/:id"
              render={ (props) => <RecipeDetails { ...props } /> }
            />
            <Route exact path="/explorar" component={ InitialExplore } />
            <Route exact path="/explorar/comidas" component={ Explore } />
            <Route exact path="/explorar/bebidas" component={ Explore } />
            <Route exact path="/perfil" component={ Profile } />
            <Route
              exact
              path="/explorar/comidas/ingredientes"
              component={ ExploreIngredients }
            />
            <Route
              exact
              path="/explorar/bebidas/ingredientes"
              component={ ExploreIngredients }
            />
          </Switch>
        </BrowserRouter>
      </RecipeContext.Provider>
      <div className="meals">
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
      </div>
    </div>
  );
}

export default App;
