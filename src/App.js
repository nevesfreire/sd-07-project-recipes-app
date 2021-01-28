import React from 'react';
<<<<<<< HEAD
import { Switch, Route } from 'react-router-dom';
=======
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
>>>>>>> 9377cce30b0885da3044cf40103827911c71c9f6
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBarMeal from './components/SearchBarMeals';
import SearchBarDrinks from './components/SearchBarDrinks';

function App() {
  return (
<<<<<<< HEAD
    <Switch>
      <Route exact path="/comidas" component={ SearchBarMeal } />
      <Route exact path="/drinks" component={ SearchBarDrinks } />
    </Switch>
=======
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
>>>>>>> 9377cce30b0885da3044cf40103827911c71c9f6
  );
}

export default App;
