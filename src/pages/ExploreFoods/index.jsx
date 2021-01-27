import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../../components';

export default function ExploreFoods({ history }) {
  return (
    <Header history={ history } title="Explorar Comidas" />
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.shape().isRequired,
};
