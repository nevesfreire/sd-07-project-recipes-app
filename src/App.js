import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import { Provider } from './contexts';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
