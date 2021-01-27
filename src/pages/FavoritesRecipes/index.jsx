import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../../components';

export default function FavoritesRecipes({ history }) {
  return (
    <Header history={ history } title="Receitas Favoritas" />
  );
}

FavoritesRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};
