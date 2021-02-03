import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Provider from './provider';
import Login from './pages/login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Provider>
        <Route exact path="/" component={ Login } />
      </Provider>
    </Switch>
  );
}

export default App;
