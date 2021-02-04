import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../common/Header';
import ExplorarComidas from './components/ExplorarComidas';
import ExplorarBebidas from './components/ExplorarBebidas';

export default function ExplorarReceitas() {
  const { pathname } = useHistory().location;

  switch (pathname) {
  case '/explorar/comidas':
    return (
      <div>
        <header>
          <Header />
        </header>
        <main>
          <ExplorarComidas />
        </main>
      </div>
    );

  case '/explorar/bebidas':
    return (
      <div>
        <header>
          <Header />
        </header>
        <main>
          <ExplorarBebidas />
        </main>
      </div>
    );

  default:
    break;
  }
}
