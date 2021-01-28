import React from 'react';
import Routes from './routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderProvider from './providers/HeaderProvider';

function App() {
  return (
    <HeaderProvider>
      <Routes />
    </HeaderProvider>
  );
}

export default App;
