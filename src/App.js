import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Home from './pages/Home';
import Food from './pages/Food';

function App() {
  return (
    <div>
      <Provider>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/food" component={ Food } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
