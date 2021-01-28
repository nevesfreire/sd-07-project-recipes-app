import React from 'react';
import { Router, Switch } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Switch>
      <Router path="/" exact component={ Home } />
    </Switch>
  );
}

export default App;
