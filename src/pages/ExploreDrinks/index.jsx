import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';

export default function ExploreDrinks() {
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div>
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/bebidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-surprise"
          to="/explorar/bebidas"
        >
          Me Surpreenda!
        </Link>

      </div>
      <Footer />
    </div>
  );
}
