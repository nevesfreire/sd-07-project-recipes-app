import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';

class Favoritas extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Receitas Favoritas" searchOn="off" history={ history } />
      </div>
    );
  }
}

Favoritas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default Favoritas;
