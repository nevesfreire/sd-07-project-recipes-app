import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';

class Feitas extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Receitas Feitas" searchOn="off" history={ history } />
      </div>
    );
  }
}

Feitas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default Feitas;
