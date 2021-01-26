import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Provider from './context/RecipesProvider';
import Login from './pages/Login';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
