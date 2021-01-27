import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';

class Perfil extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Perfil" searchOn="off" history={ history } />
      </div>
    );
  }
}

Perfil.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default Perfil;
