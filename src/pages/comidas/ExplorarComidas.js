import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';

class ExplorarComidas extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Explorar Comidas" searchOn="off" history={ history } />
      </div>
    );
  }
}

ExplorarComidas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default ExplorarComidas;
