import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components';

export default function Profile({ history }) {
  return (
    <Header history={ history } title="Perfil" />
  );
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
};
