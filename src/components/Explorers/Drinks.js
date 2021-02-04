import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SurpriseMe from './SurpriseMe';

function Drinks({ path }) {
  return (
    <main>
      <Link
        data-testid="explore-by-ingredient"
        to="/explorar/bebidas/ingredientes"
      >
        Por Ingredientes
      </Link>
      <br />
      <SurpriseMe path={ path } />
    </main>
  );
}

Drinks.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Drinks;
