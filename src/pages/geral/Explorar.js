import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';

class Explorar extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Explorar" searchOn="off" history={ history } />
      </div>
    );
  }
}

Explorar.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default Explorar;
