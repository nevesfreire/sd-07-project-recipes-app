import React from 'react';
import PropTypes from 'prop-types';
import { Header, Footer } from '../../components';

export default function Profile({ history }) {
  return (
    <div>
      <Header history={ history } title="Perfil" />
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
};
