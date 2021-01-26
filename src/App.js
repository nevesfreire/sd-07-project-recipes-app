import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';

function App() {
  return (
    <div>
      <RecipesProvider>
        Teste
      </RecipesProvider>
    </div>
  );
}

export default App;
