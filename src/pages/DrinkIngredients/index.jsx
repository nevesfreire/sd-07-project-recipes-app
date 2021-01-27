import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../../components';

export default function DrinkIngredients({ history }) {
  return (
    <Header history={ history } title="Explorar Ingredientes" />
  );
}

DrinkIngredients.propTypes = {
  history: PropTypes.shape().isRequired,
};
