import React from 'react';
import PropTypes from 'prop-types';
import { Header, Footer } from '../../components';

export default function FoodArea({ history }) {
  return (
    <div>
      <Header history={ history } title="Explorar Origem" />
      <Footer />
    </div>
  );
}

FoodArea.propTypes = {
  history: PropTypes.shape().isRequired,
};
