import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';

class PrincipalComidas extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Comidas" searchOn="on" history={ history } />
      </div>
    );
  }
}

PrincipalComidas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default PrincipalComidas;
