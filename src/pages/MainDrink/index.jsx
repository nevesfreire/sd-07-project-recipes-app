import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components';

export default function MainDrink({ history }) {
  return (
    <Header history={ history } title="Bebidas" />
  );
}

MainDrink.propTypes = {
  history: PropTypes.shape().isRequired,
};
