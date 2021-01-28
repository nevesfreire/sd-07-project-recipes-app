import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
// import LoginPage from './Pages/LoginPage';
import Routes from './Routes';
import RecipesContextProvider from './context/RecipesContextProvider';

function App() {
  return (
    <BrowserRouter>
      <RecipesContextProvider>
        <Routes />
      </RecipesContextProvider>
    </BrowserRouter>
  );
}

export default App;
