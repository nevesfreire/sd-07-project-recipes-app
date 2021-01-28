import React from 'react';
import Routes from './routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodProvider from './providers/FoodProvider';

function App() {
  return (
    <FoodProvider>
      <Routes />
    </FoodProvider>
  );
}

export default App;
