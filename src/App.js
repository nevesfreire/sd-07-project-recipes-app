import React from 'react';
import Routes from './routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodProvider from './providers/FoodProvider';
import DrinkProvider from './providers/DrinkProvider';

function App() {
  return (
    <FoodProvider>
      <DrinkProvider>
        <Routes />
      </DrinkProvider>
    </FoodProvider>
  );
}

export default App;
