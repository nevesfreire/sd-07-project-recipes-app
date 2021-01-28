import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Provider from './context/Provider';
import { Footer } from './components';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/comidas" component={ Footer } />
          {/* <Redirect to="/404" /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
