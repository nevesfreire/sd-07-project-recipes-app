import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import '../css/food.css';

class FoodExplore extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        Explorar Comida
        <Footer history={ history } />
      </div>
    );
  }
}

export default FoodExplore;

FoodExplore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
