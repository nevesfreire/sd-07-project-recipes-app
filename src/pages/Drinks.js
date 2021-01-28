import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DrinksRecipes from '../components/DrinksRecipes';
import '../css/food.css';

class Drinks extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        Bebidas
        <Header history={ history } />
        <DrinksRecipes endPoint="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" />
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
