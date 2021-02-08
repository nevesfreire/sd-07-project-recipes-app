import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SurpriseMe from './SurpriseMe';

function Meals({ path }) {
  return (
    <main className="explore">
      <Link
        className="explore__button"
        data-testid="explore-by-ingredient"
        to="/explorar/comidas/ingredientes"
      >
        Por Ingredientes
      </Link>
      <Link
        className="explore__button"
        data-testid="explore-by-area"
        to="/explorar/comidas/area"
      >
        Por Local de Origem
      </Link>
      <SurpriseMe path={ path } />
    </main>
  );
}

Meals.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Meals;
