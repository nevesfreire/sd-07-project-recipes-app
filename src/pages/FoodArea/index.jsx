import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components';

export default function FoodArea({ history }) {
  return (
    <Header history={ history } title="Explorar Origem" />
  );
}

FoodArea.propTypes = {
  history: PropTypes.shape().isRequired,
};
