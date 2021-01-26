import React from 'react';
import './App.css';
import Routes from './routes';
import RecipesProvider from './context/RecipesProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipesProvider>
      <Routes />
    </RecipesProvider>
  );
}

export default App;
