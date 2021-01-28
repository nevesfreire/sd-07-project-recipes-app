import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBarMeal from './components/SearchBarMeals';
import SearchBarDrinks from './components/SearchBarDrinks';

function App() {
  return (
    <Switch>
      <Route exact path="/comidas" component={ SearchBarMeal } />
      <Route exact path="/drinks" component={ SearchBarDrinks } />
    </Switch>
  );
}

export default App;
