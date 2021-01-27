import React from 'react';
import PropTypes from 'prop-types';
import { Header, Footer } from '../../components';

export default function MainFood({ history }) {
  return (
    <div>
      <Header history={ history } title="Comidas" />
      <Footer />
    </div>
  );
}

MainFood.propTypes = {
  history: PropTypes.shape().isRequired,
};
