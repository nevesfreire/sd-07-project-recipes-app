import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import ProviderContext from './context/ProviderContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <ProviderContext>
          <Routes />
        </ProviderContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
