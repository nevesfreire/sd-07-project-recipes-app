import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import '../css/food.css';

class Explore extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        Explorar
        <Footer history={ history } />
      </div>
    );
  }
}

export default Explore;

Explore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
