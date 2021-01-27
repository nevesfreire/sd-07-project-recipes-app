import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';

class IngredientesComidas extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Explorar Ingredientes" searchOn="off" history={ history } />
      </div>
    );
  }
}

IngredientesComidas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default IngredientesComidas;
