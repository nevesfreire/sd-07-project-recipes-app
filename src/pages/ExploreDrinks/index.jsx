import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';
import './ExploreDrinks.css';

export default function ExploreDrinks() {
  return (
    <div className="explore-drink-container">
      <Header title="Explorar Bebidas" />
      <div className="explore-drink-content">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/bebidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <br />
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
