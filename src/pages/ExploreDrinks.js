import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Explore.css';

function ExploreDrinks() {
  return (
    <>
      <Header title="Explorar Bebidas" isSearchable={ false } />
      <div className="content">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/bebidas/ingredientes"
          className="explore-btn"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-surprise"
          to="/"
          className="explore-btn"
        >
          Me Surpreenda!
        </Link>
      </div>
    </>
  );
}
export default ExploreDrinks;
