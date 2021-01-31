import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './provider';
import {
  MainPage,
  RecipeDetails,
  Explore,
  ExploreBy,
  ExploreByIngredient,
  ExploreByArea,
} from './pages';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/explorar/comidas/area"
            render={ (props) => (<ExploreByArea { ...props } />) }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            render={ (props) => (<ExploreByIngredient { ...props } />) }
          />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            render={ (props) => (<ExploreByIngredient { ...props } />) }
          />
          <Route
            exact
            path="/explorar/bebidas"
            render={ (props) => (<ExploreBy { ...props } />) }
          />
          <Route
            exact
            path="/explorar/comidas"
            render={ (props) => (<ExploreBy { ...props } />) }
          />
          <Route
            exact
            path="/explorar"
            render={ (props) => (<Explore { ...props } />) }
          />
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
