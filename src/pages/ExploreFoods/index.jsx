import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';

export default function ExploreFoods() {
  return (
    <div>
      <Header title="Explorar Comidas" />
      <div>
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/comidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
        >
          Por Local de Origem
        </Link>
        <Link
          data-testid="explore-surprise"
          to="/explorar/comidas"
        >
          Me Surpreenda!
        </Link>

      </div>
      <Footer />
    </div>
  );
}
