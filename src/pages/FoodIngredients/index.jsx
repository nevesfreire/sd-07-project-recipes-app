import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components';

export default function FoodIngredients({ history }) {
  return (
    <Header history={ history } title="Explorar Ingredientes" />
  );
}

FoodIngredients.propTypes = {
  history: PropTypes.shape().isRequired,
};
