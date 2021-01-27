import React from 'react';
import PropTypes from 'prop-types';
import { Header, Footer } from '../../components';

export default function Explore({ history }) {
  return (
    <div>
      <Header history={ history } title="Explorar" />
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.shape().isRequired,
};
