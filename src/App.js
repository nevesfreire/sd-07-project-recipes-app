import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Comidas from './pages/comidas/index';
import Perfil from './pages/perfil/index';
// import Login from './pages/Login/index';

function App() {
  return (
    <div>
      {/* <Login /> */}
      <BrowserRouter>
        <Switch>
          <Route path="/comidas" component={ Comidas } />
          <Route path="/perfil" component={ Perfil } />
          {/* <Route path="/login" component={ Login } /> */}
        </Switch>
      </BrowserRouter>

    </div>

  );
}

export default App;
