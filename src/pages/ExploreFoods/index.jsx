import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';
import './ExploreFoods.css';

export default function ExploreFoods() {
  return (
    <div className="explore-food-container">
      <Header title="Explorar Comidas" />
      <div className="explore-food-content">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/comidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <br />
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
        >
          Por Local de Origem
        </Link>
        <br />
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
