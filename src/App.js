import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Provider from './context/Provider';
import { SearchBar } from './components';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <SearchBar />
          {/* <Route exact path="/" component={ Login } /> */}
          {/* <Redirect to="/404" /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
