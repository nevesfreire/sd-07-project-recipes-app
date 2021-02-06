import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Routes from './routes/Routes';

import './App.css';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
