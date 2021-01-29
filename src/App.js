import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
