import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SurpriseMe from './SurpriseMe';

function Drinks({ path }) {
  return (
    <main className="explore">
      <Link
        className="explore__button"
        data-testid="explore-by-ingredient"
        to="/explorar/bebidas/ingredientes"
      >
        Por Ingredientes
      </Link>
      <SurpriseMe path={ path } />
    </main>
  );
}

Drinks.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Drinks;
