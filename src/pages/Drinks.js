import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import '../css/food.css';

class Drinks extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        Bebidas
        <Footer history={ history } />
      </div>
    );
  }
}

export default Drinks;

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
