import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './provider';
import { MainPage, RecipeDetails } from './pages';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/bebidas/:id"
            render={ (props) => (<RecipeDetails { ...props } />) }
          />
          <Route
            exact
            path="/comidas/:id"
            render={ (props) => (<RecipeDetails { ...props } />) }
          />
          <Route
            exact
            path="/bebidas"
            render={ (props) => (<MainPage { ...props } />) }
          />
          <Route
            exact
            path="/comidas"
            render={ (props) => (<MainPage { ...props } />) }
          />
          {/* <Redirect to="/404" /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
