import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
}

export default App;
