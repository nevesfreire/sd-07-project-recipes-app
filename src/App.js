import React from 'react';
import Routes from './routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalProvider from './providers/AllProviders';

function App() {
  return (
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  );
}

export default App;
