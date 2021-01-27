import React from 'react';
import PropTypes from 'prop-types';
import { Header, Footer } from '../../components';

export default function ExploreDrinks({ history }) {
  return (
    <div>
      <Header history={ history } title="Explorar Bebidas" />
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape().isRequired,
};
