import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import { Login, MainPage, Profile } from './pages';
// import { BottomMenu, Header } from './components';
// import { Footer } from './components';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ MainPage } />
          <Route path="/perfil" component={ Profile } />
          {/* <Redirect to="/404" /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
