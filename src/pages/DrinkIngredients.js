import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import '../css/recipe.css';

class DrinkIngredients extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        Ingredients Bebidas
        <Footer history={ history } />
      </div>
    );
  }
}

export default DrinkIngredients;

DrinkIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
