import React from 'react';
import PropTypes from 'prop-types';
import { Header, Footer } from '../../components';

export default function ExploreFoods({ history }) {
  return (
    <div>
      <Header history={ history } title="Explorar Comidas" />
      <Footer />
    </div>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.shape().isRequired,
};
