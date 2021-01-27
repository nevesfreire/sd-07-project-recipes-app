import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';

class PrincipalBebidas extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Bebidas" searchOn="on" history={ history } />
      </div>
    );
  }
}

PrincipalBebidas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default PrincipalBebidas;
