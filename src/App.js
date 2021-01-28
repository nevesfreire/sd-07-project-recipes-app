import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Provider from './context/Provider';
import { Login } from './pages';
import { BottomMenu, Header } from './components';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          {/* <Redirect to="/404" /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
