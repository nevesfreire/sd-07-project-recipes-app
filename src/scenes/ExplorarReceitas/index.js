import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../../common/Header';

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
          <Link to="/explorar/comidas/ingredientes">
            <Button data-testid="explore-by-ingredient">Por Ingredientes</Button>
          </Link>
          <Link to="/explorar/comidas/area">
            <Button data-testid="explore-by-area">Por Local de Origem</Button>
          </Link>
          <Button data-testid="explore-surprise">Me Surpreenda!</Button>
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
          <Link to="/explorar/bebidas/ingredientes">
            <Button data-testid="explore-by-ingredient">Por Ingredientes</Button>
          </Link>
          <Button data-testid="explore-surprise">Me Surpreenda!</Button>
        </main>
      </div>
    );

  default:
    break;
  }
}
