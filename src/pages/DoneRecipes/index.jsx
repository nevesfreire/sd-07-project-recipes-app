import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components';

export default function DoneRecipes({ history }) {
  return (
    <Header history={ history } title="Receitas Feitas" />
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};
