import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../../common/Header';

export default function index() {
  return (
    <main>
      <Header />
      <Link to="/explorar/comidas">
        <Button
          data-testid="explore-food"
          placeholder="Explorar Comidas"
        >
          Explorar Comidas

        </Button>
      </Link>
      <Link to="/explorar/bebidas">
        <Button
          data-testid="explore-drinks"
          placeholder="Bebidas"
        >
          Explorar Bebidas

        </Button>
      </Link>
    </main>
  );
}
