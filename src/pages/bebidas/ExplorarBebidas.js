import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';

class ExplorarBebidas extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Explorar Bebidas" searchOn="off" history={ history } />
      </div>
    );
  }
}

ExplorarBebidas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default ExplorarBebidas;
