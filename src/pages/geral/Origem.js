import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Footer from '../../components/footer';

class Origem extends Component {
  render() {
    const { history, match } = this.props;
    return (
      <div>
        <Header
          title="Explorar Origem"
          searchOn="on"
          history={ history }
          match={ match }
        />
        <Footer history={ history } />
      </div>
    );
  }
}

Origem.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
  match: PropTypes.objectOf().isRequired,
};

export default Origem;
