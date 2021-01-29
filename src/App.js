import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Home from './pages/Home';
import Comidas from './pages/Comidas';
import Perfil from './pages/Perfil';

function App() {
  return (
    <div>
      <Provider>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/perfil" component={ Perfil } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
