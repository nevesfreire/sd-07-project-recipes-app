import React from 'react';
import PropTypes from 'prop-types';
import { Header, Footer } from '../../components';

export default function DrinkIngredients({ history }) {
  return (
    <div>
      <Header history={ history } title="Explorar Ingredientes" />
      <Footer />
    </div>
  );
}

DrinkIngredients.propTypes = {
  history: PropTypes.shape().isRequired,
};
