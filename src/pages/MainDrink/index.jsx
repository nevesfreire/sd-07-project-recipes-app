import React from 'react';
import PropTypes from 'prop-types';
import { Header, Footer } from '../../components';

export default function MainDrink({ history }) {
  return (
    <div>
      <Header history={ history } title="Bebidas" />
      <Footer />
    </div>
  );
}

MainDrink.propTypes = {
  history: PropTypes.shape().isRequired,
};
