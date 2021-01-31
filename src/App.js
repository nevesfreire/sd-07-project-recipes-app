import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import { Header } from './components';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route path="/:category" component={ Header } /> 
          {/* <Route exact path="/" component={ Login } /> */}
          {/* <Redirect to="/404" /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
