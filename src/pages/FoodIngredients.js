import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import '../css/recipe.css';

class FoodIngredients extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        Ingredients Comida
        <Footer history={ history } />
      </div>
    );
  }
}

export default FoodIngredients;

FoodIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
