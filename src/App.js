import React from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <RecipesProvider>
        <BrowserRouter>
          <Route exact path="/" component={ Login } />
        </BrowserRouter>
      </RecipesProvider>
    </div>
  );
}

export default App;
